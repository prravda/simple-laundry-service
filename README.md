# 시작하면서
안녕하세요 지원자 여러분! 세특 nodejs 과제 테스트에 참여 해주셔서 감사 드립니다. 해당 과제는 세특 앱에서 활용 하고 있는 "문제 의류 접수" 화면의 API를 작성 하는 프로젝트 입니다. 각 컴포넌트들을 잘 구조화 활 수 있는지, OOP 기반의 프로그래밍을 하실 수 있는지 또 지금은 작은 프로젝트라도 확장성이 고려된 프로젝트를 완성 시킬 수 있는지? 를 파악하는 것에 목적으로 두고 있습니다. 프로젝트 구조화에 신경 써주셨으면 좋겠습니다.

**해당 프로젝트 clone 후 새롭게 작성 해주세요.**
기타 자세한 프로젝트 설명과 과제에 대한 내용은 [노션페이지](https://washswat.notion.site/NodeJS-a16cd2078a3c4b38a7e8df6de875e890 "노션페이지")를 참고 해주세요.


------------

# 세탁특공대 의류 접수앱
세특 고객들이 의류를 선택 해서 주문을 만들 수 있는 앱 입니다.

---

# Basic authentication

> 현재 프로젝트에서는 전화번호 인증 후 `Bearer token` 발급 후 고객의 `UUID`를 `request`에 저장하고 API 통신 시 활용하는 인증 체계가 세팅되어 있습니다.  - 세특 NodeJS 과제
>

방향 자체는 이와 크게 다르지 않을 거 같다. 다만, 전화번호 인증(아마 문자 인증일텐데)과 관련된 service logic 은 휴대폰 인증 API 등을 구현할 수는 없는 노릇이기에 과제에서 구현할 수 있는 부분은 아니라고 생각하였고, 그러한 이유로 `authentication` 이 아닌 `authorization` 을 집중해보기로 결정했다.

## 전체적인 전략

### 기존 authorization 방식의 확인

```jsx
// middlewares/auth.js
import InvalidAuthorizedTokenError from '../exceptions/invalidAuthorizedTokenException';
import { verify, sign } from '../libs/jwt.js';
const bypassPathList = ['/login', '/'];
export const verifyJWT = (req, res, next) => {
  const bearerToken = req.headers['x-access-token'];
  try {
    if (bearerToken) {
      const token = bearerToken.replace(/^Bearer /, '');
      const user = verify(token);
      if (!user) {
        throw new Error();
      }
      req.user = user;
    } else {
      const { path } = req;
      const found = bypassPathList.find((p) => p === path);
      if (!found) {
        throw new Error();
      }
    }
    next();
  } catch (err) {
    next(
      new InvalidAuthorizedTokenError(err.message || 'Invalid Bearer Token'),
    );
  }
};
export const signing = (UUID) => sign({ UUID });
```

일단 `middleware/auth.js` 에서 authentication 을 담당하는 기존 코드는

- `/login` 과 `/` endpoint 는 무시하고
- `header` 의 `x-access-token` 이라는 proeprty 에 Bearer token 을 담아
- 해당 property 로부터 bearer token 을 추출하고, verification 을 하고
- 그 verification 결과에 따라서
    - 인가받은 사용자가 맞다는 게 확인이 되었다면 Express 의 `Request` object 에 있는 `user` property 에 인증/인가 결과를 할당한다
    - 인가받은 사용자가 아니라는 게 확인이 되었다면, valid 하지 않은 token 으로 authorization 을 시도했다는 상황을 정의한 custom error 인 `InvalidAuthorizedTokenError` 를 throw 한다.

---

### 해당 방식을 기반으로 한 나의 authorization 방식

좋은 방법으로 authorization 처리를 해 주고 있어서 크게 수정할 것은 없는 것 같다. 다만 몇 가지는 수정하면 좀 더 나을 거 같다는 생각이 들었다.

### No custom header

> Custom proprietary headers have historically been used with an `X-` prefix, but this convention was deprecated in June 2012 because of the inconveniences it caused when nonstandard fields became standard in [RFC 6648](https://datatracker.ietf.org/doc/html/rfc6648); others are listed in an [IANA registry](https://www.iana.org/assignments/message-headers/perm-headers.html), whose original content was defined in [RFC 4229](https://datatracker.ietf.org/doc/html/rfc4229). IANA also maintains a [registry of proposed new HTTP headers](https://www.iana.org/assignments/message-headers/prov-headers.html). - [MDN, HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
>

먼저 `X-` prefix 가 붙는 custom header 의 사용을 지양하기로 하였다. MDN 의 문서에도 나와있듯, custom header 를 사용할 땐 이런 convention 을 사용하였으나, 2012 년에 규격을 벗어나게 한다는 이유로 IANA 나 RFC 등에 의해 지양되고 있다.  그래서 [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 이라는 header 에 JWT 를 담아 보내기로 하였다.

### Simplify the authorization process with passport

두 번째로는 인증/인가 라이브러리인 `[passport](http://www.passportjs.org/packages/passport-jwt/)` 사용이다. 그 중에서도 `jsonwebtoken` 을 사용하는 만큼, `passport-jwt` 를 사용하고자 한다. 그 이유는 코드베이스의 간략함 때문이다. authentication 과정에서 다양한 경우를 처리하지 않는다는 가정 하에, 별 다른 처리 없이 사용자의 authentication 만을 진행할 거라면 코드의 양을 일단은 줄여보자는 생각이 들었다. 코드가 적어질 수록, 버그도 적어지기에, 꼭 필요한 게 아니라면 신뢰도가 높은 라이브러리 등으로 코드를 줄이자는 주의이기에 passport 를 사용하기로 했다.

## Token strategy and design for authorization

그 다음에는 authorization 에 사용할 token 에 대해서 전략을 세워보려고 한다.

### **refresh token and access token**

먼저 token 을 access token 과 refresh token 두 개로 나누어 발급하기로 하였다. 그렇게 하기로 한 이유는 두 개이다. 사용자의 편의성과 보안.

**Better user experience**

refresh token 은 access token 을 갱신할 수 있게 해주는, access token 에 비해 만료일이 조금 더 긴 token 을 의미한다. 이렇게 되면 access token 의 주기가 짧아져도, refresh token 으로 token 을 갱신하면 되기에 사용자가 계속해서 로그인 등을 처리할 필요가 없어진다.

**Better security**

주기가 약간 긴 하나의 token 만으로 길게 하여 사용하는 방식 또한 좋은 방법은 아니라고 생각했다. 이유는 간단하다. 해당 token 이 유출되었을 때 주기가 길면, 그 token 으로 사용자인 척 위장할 수 있는 여지가 길어지기 때문이다.

---

# API token
## Token Design

![jwt-web-debugger.png](./daily-development-logs/2022-01-05/assets/jwt-web-debugger.png)

###Algorithm

먼저 암호화 알고리즘이다. github repository 의 코드에서 `HS256` 알고리즘을 이용하는 건 계속해서 이용하기로 했다. 왜냐하면, 나머지 알고리즘들도 있긴 하지만, 일단은 가장 무난하기도 하고, 더 좋은 알고리즘이 있지만, 해당 알고리즘은 client 와도 협력이 필요한 부분이 있기 때문이다.

###Properties

`audience` 와 `issuer` property 를 추가하였다. `audience` 는 누가 해당 token 을 사용하는지, `issuer` 는 누가 이 token 을 발급했는지에 대한 정보를 담는 property 이다.

###ExpiresAt

그 다음으로는 만료 주기이다. 일단은 access token 은 1일, refresh token 은 3일을 주었다. 이렇게 설정한 경우, 사용자는 만료된 refresh token 을 갱신하기 위해서 3일마다 재 로그인을 해야한다. 물론 이는 회사의 사용자 정책에 따라서 달라질 수 있는 부분이고, 나도 아직 경험이 부족한 탓에 어느정도의 주기가 사용자의 경험을 최대한 해치지 않는 선에서 사용자의 보안을 지켜낼 수 있는 지점인지는 잘 모르겠다. 그러나, 만료일은 가급적 짧으면 짧을수록 좋다는 생각에 일단은 이런 식으로 setup 을 하였다.


---

# Request format, API Specifications
전체적으로는 `data transfer object` 를 통한 request body formatting 을 진행하였습니다. 원래대로라면 API Documentation 을 `Swagger` 나 `postman platform` 을 통해 문서화를 주로 하는 편이었습니다만, 이번엔 시간상의 이유, 그리고 과제라는 특성상 외부 노출이 어려운 점을 고려하여 API call testing 을 하는 데 주로 사용하는 `POSTMAN` 의 request configuration file 을 전달드립니다. 해당 파일을 postman 에 import 하여 request example 들을 확인하실 수 있고, API call 을 진행하실 수 있습니다.


파일 이름은 [washswot-assignment-inseob-postmanconfig.postman_collection.json](./washswot-assignment-inseob-postmanconfig.postman_collection.json) 입니다.

# Response format
## Case of Success
```tsx
interface CreateSuccessResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;
}
```
해당 interface 를 기반으로 api response 를 설계하였습니다. `data` property 의 경우엔 `generic` 을 이용해 동적으로 type assigning 이 됩니다.

```json
{
    "message": "success signing up",
    "statusCode": 201,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiY2t5Njl3cjQ4MDAwMHZoaDk3YWQ0YTc3eCIsInRva2VuVHlwZSI6ImFjY2VzcyIsImlhdCI6MTY0MTY3MzMyMywiZXhwIjoxNjQxNzU5NzIzLCJhdWQiOiJ3YUBTaCFzdypvVF91U2VyIiwiaXNzIjoidzFhc19oc0BXbyZ0X2xhI0JzIn0._CglQroz5QqG12aM-aX93aAv5NauEBISFU-NXvAQrQc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiY2t5Njl3cjQ4MDAwMHZoaDk3YWQ0YTc3eCIsImlhdCI6MTY0MTY3MzMyMywiZXhwIjoxNjQxOTMyNTIzLCJhdWQiOiJ3YUBTaCFzdypvVF91U2VyIiwiaXNzIjoidzFhc19oc0BXbyZ0X2xhI0JzIn0.ekmGZJ1WnBum1y_6EYMYA0sQOBAi61yN7PB3TkumTpQ"
    }
}
```
`POST /api/user` 를 통해 사용자를 생성하고 나서 받은 결과값 입니다. 

## Case of Failure
```tsx
interface CreateCustomError {
  name: string;
  message: string;
  statusCode: number;
  action: string;
  solution: string;
}

abstract class AbstractCustomError extends Error {
  abstract get name(): string;
  abstract get message(): string;
  abstract get statusCode(): number;
  abstract get action(): string;
  abstract get solution(): string;
}
```
위와 같은 `CreateCustomError` 라는 interface 와 node 의 기본 `Error` 를 기반으로 만든 `AbstractError` 를 통해 전체적인 error 의 format 을 먼저 잡았습니다. 
디버깅의 용이성을 위해 error response 로 전달하는 값들은 
- name: custom concrete error class 의 이름입니다.
- message: 해당 에러가 발생한 상황에 대한 설명입니다.
- statusCode: status code 입니다. MDN 에 기재된 HTTP Status code table 을 기반으로 최대한 `semantic` 한 code 를 사용하였습니다.
- action: 해당 에러를 발생시킨 대표적인 이유입니다.
- solution: 해당 에러를 해결하기 위한 대표적인 해결책입니다.

물론, 에러에 대해서 너무 많은 정보를 노출하는 것은 보안상으로는 좋지 않으나, 그걸 고려하지 않았을 때 일단 디버깅을 용이하게 하기 위해서 이런 식으로 custom error object 를 구성하지 않을까 합니다.


```tsx
export class CanNotFindATaskWithThisTaskIdError extends AbstractCustomError {
  private readonly _message: string;
  private readonly _name: string;
  private readonly _statusCode: number;
  private readonly _action: string;
  private readonly _solution: string;
  constructor({
    message,
    name,
    statusCode,
    action,
    solution,
  }: CreateCustomError) {
    super();
    this._name = name;
    this._message = message;
    this._statusCode = statusCode;
    this._action = action;
    this._solution = solution;
  }
  get name(): string {
    return this._name;
  }
  get message(): string {
    return this._message;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get action(): string {
    return this._action;
  }

  get solution(): string {
    return this._solution;
  }
}

```

해당 `AbstractCustomError` 를 기반으로 존재하지 않는 task id 를 통해 `GET /api/order:taskId` 를 실행할 경우 반환되는 `CanNotFindATaskWithThisTaskIdError` 입니다.

```tsx
export function exceptionFilter(
  err: AbstractCustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  const errorProps = {
    errorName: err.name,
    timeStamp: new Date(),
    statusCode: err.statusCode,
    message: err.message,
    action: err.action,
    solution: err.solution,
  };
  res.status(err.statusCode).send(errorProps);
}
```
error -> respone 처리과정은 해당 exception filter middleware 에 의해서 처리되고 있으며 


```json
{
    "errorName": "CanNotFindATaskWithThisTaskIdError",
    "timeStamp": "2022-01-08T20:23:58.733Z",
    "statusCode": 404,
    "message": "There is no task with this task id",
    "action": "Find a task with invalid task id",
    "solution": "Check your task id's validity before retry to find a task again"
}
```
error response 의 예시는 다음과 같습니다. 


---

# DB Structure
## Current database schema
![current-database-schema.png](./daily-development-logs/2022-01-08/assets/current-database-schema.png)
현재의 데이터베이스 스키마입니다. 아래는 데이터베이스 스키마를 설계하기까지 중점적으로 고려한 사항들 입니다. 

## 정규화
  - 정규화단계는 3.5 NF (Boyce-Codd NF) 까지 진행하였다. 이유는 데이터베이스에 담길 데이터들의 integrity 와 consistency 를 최대한 유지하기 위해서이다. 특히 transitive functional relation 관계가 있는 subset 들을 묶어서 별도의 table 로 분리하는 과정에 집중했었다.
    - 해당 과정의 대표적인 결과물은 주소(address)를 별도의 table 로 분리한 것이다. 분리한 이유는 [API Sample data](https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json) 를 보았을 때, `address_01` 과 `address_02` 부분이 transitive functional relation 이 있다고 판단하였기 때문이다. `address_01`, 그러니까 흔히 우리가 일컫는 도로명 주소가 바뀌는 경우, `address_02`, 흔히 말 하는 동/호수를 적는 상세주소가 바뀔 확률은 매우 높다. 다른 위치에 같은 동/호수가 있는 경우가 아니라면 말이다. 그래서 `information` 이라는 data 를 구성하는 `address_01` 과 `address_02` 라는 두 개의 column을 별도의 `address` 로 분리하였다.
  - 이런 분리를 하게 된 이유가 또 하나 있는데, 바로 UX 관점이다. `user` 라는 table 과 `a user has many address` 라는 relation 을 만들어 주어야겠다는 생각을 하여서 자연스럽게 분리가 되었다.
    - 사용자의 입장에서는 이전에 주문을 했던 주소로 세탁 주문을 맡기고 싶을 때, 그 주소지를 주소지를 새로 입력해야 한다면 썩 유쾌한 경험은 아닐 것이라는 생각이 들었다. 그것보다는, 내가 이전에 주문했던 주소지 목록들 중에 하나를 선택해서 그 주소를 입력할 수 있다면, 수정하더라도, 그 주소를 불러와서 수정할 부분만 수정할 수 있다면, 더 이상 쓰지 않는다면, 내 주소지 목록에서 삭제할 수 있다면, 좀 더 편하지 않을까? 라는 생각으로 분리를 하게 된 이유도 있다.

## Credential Table
  - 그 다음으로는 `credentials` 라는 table 을 만든 것이다. 이는 access - refresh token pair 를 통해 인증을 진행하기 위해서 만든 table 이다. 해당 table 은 access token 이 만료가 되었을 경우, refresh token 을 통해 access - refresh token pair 를 갱신하고, 그 갱신된 결과를 담는 역할을 한다.
    - 부수적으로는, 사용자 별 마지막 로그인 날짜를 파악할 수 있는 역할도 한다. refresh token 은 ‘자동 로그인 주기’ 라는 UX 와 관련된 부분과 연관이 있다. 왜냐면, access token 을 통한 자동 로그인 주기가 끝났을 때, 다시 로그인을 하기 위해서는 refresh token 을 통해 새로 갱신을 해야 하기 때문이다. 그래서 refresh token 의 갱신일이 현 시점 - refresh token 만료일 보다 이전이라면, 이 사람은 최근에 애플리케이션을 잘 사용하지 않았고, 왜 잘 사용하지 않았는지에 대해 나머지 데이터를 통해 분석하면서 어떤 식으로 retention 을 진행해야 가장 효율적으로 진행할 수 있을 지에 대해 논의할 때 데이터를 기반으로 한 논의 (data driven decision) 가 가능해진다.
    

---

