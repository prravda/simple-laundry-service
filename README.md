# 시작하면서
안녕하세요 지원자 여러분! 세특 nodejs 과제 테스트에 참여 해주셔서 감사 드립니다. 해당 과제는 세특 앱에서 활용 하고 있는 "문제 의류 접수" 화면의 API를 작성 하는 프로젝트 입니다. 각 컴포넌트들을 잘 구조화 활 수 있는지, OOP 기반의 프로그래밍을 하실 수 있는지 또 지금은 작은 프로젝트라도 확장성이 고려된 프로젝트를 완성 시킬 수 있는지? 를 파악하는 것에 목적으로 두고 있습니다. 프로젝트 구조화에 신경 써주셨으면 좋겠습니다.

**해당 프로젝트 clone 후 새롭게 작성 해주세요.**
기타 자세한 프로젝트 설명과 과제에 대한 내용은 [노션페이지](https://washswat.notion.site/NodeJS-a16cd2078a3c4b38a7e8df6de875e890) 를 참고 해주세요.


------------

# 세탁특공대 의류 접수앱
세특 고객들이 의류를 선택 해서 주문을 만들 수 있는 앱 입니다.

---

# 프로젝트에 대한 설명

## 프로젝트 구조와 설계 전반
### 프로젝트 구조
```text
├── components
│   ├── address
│   │   ├── abstracts
│   │   ├── dto
│   │   ├── repositories
│   │   └── tests
│   ├── auth
│   │   ├── abstracts
│   │   ├── dto
│   │   ├── errors
│   │   ├── interface
│   │   ├── services
│   │   ├── strategies
│   │   ├── tests
│   │   └── types
│   ├── credential
│   │   ├── abstracts
│   │   ├── dto
│   │   ├── repositories
│   │   ├── services
│   │   └── tests
│   ├── image
│   │   └── abstracts
│   ├── information
│   │   └── abstracts
│   ├── item
│   │   └── abstracts
│   ├── mission
│   │   └── abstracts
│   ├── tag
│   │   └── abstracts
│   ├── task
│   │   ├── abstracts
│   │   ├── dto
│   │   └── errors
│   ├── time
│   │   ├── abstracts
│   │   ├── mocks
│   │   └── tests
│   └── user
│       ├── abstracts
│       ├── dto
│       ├── errors
│       ├── repositories
│       ├── services
│       ├── tests
│       └── types
├── constants
│   ├── abstracts
│   ├── mocks
│   └── types
├── database
│   └── entities
└── middlewares
    └── response-wrappers

```
`src` directory 구조입니다. 

## How to start
```shell
# node version configuration via nvm
nvm install 14.18.2 && nvm use 14.18.2
# install dependencies
npm i
# start application
npm start
```

## 작업 환경
### programming language
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "types": ["node", "jest"],
    "strict": true,
    "esModuleInterop": true,
    "inlineSourceMap": true,
    "noImplicitAny": false,
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true
  }
}
```
- TypeScript: `4.5.4`
  - TypeScript 를 사용한 이유는 크게 두 가지입니다. 
    1. 비록 transpile 이 되어 JavaScript 로 바뀐다고 하지만, 적어도 작업을 할 땐 type-safe 한 프로그래밍이 가능합니다.
       - 특히, 타입 추론이나 Utility Type, 그리고 class 생성 시 constructor 에 accessor 와 property 를 입력하면 property 를 하나하나 setup 해 줄 필요 없는 등의 편의성 등 또한 매력적으로 느껴졌습니다.
    2. prototypal language 인 JavaScript 에 비해 좀 더 OO-Like 한 코드를 작성하기 쉬웠습니다.
       - 특히, `abstract class` 나 `interface` 를 통해서 추상화(`abstraction`)를 진행하기가 특히 더욱 쉬웠습니다.  
### node
```json
  {
      "engines": {
      "node": ">=14.0.0 <15"
    }
  ``` 

- 개발환경 항목에서 말씀해주신 nodejs 의 14 버전 중 가장 최신의 버전인 14.18.2 버전을 기반으로 작업하였습니다.
  - 원래대로라면 현재의 `lts` 버전인 16 버전을 사용하곤 했지만, 15버전 이상부터는 `better-sqlite3` 에서의 호환성 문제가 발생하였기에 사용할 수 없었습니다.
- 추가로, `package.json` 에서 사용 가능한 버전을 명시해놓기도 하였습니다.

### database
- `sqlit3`, `better-sqlite3`, 그리고 `TypeORM` 을 사용하였습니다.

---

# Basic authentication

> 현재 프로젝트에서는 전화번호 인증 후 `Bearer token` 발급 후 고객의 `UUID`를 `request`에 저장하고 API 통신 시 활용하는 인증 체계가 세팅되어 있습니다.  - 세특 NodeJS 과제
>

방향 자체는 이와 크게 다르지 않을 거 같다고 생각이 들었습니다. 다만, 전화번호 인증(아마 문자 인증일텐데)과 관련된 service logic 은 휴대폰 인증 API 등을 구현할 수는 없는 노릇이기에 과제에서 구현할 수 있는 부분은 아니라고 생각하였고, 그러한 이유로 `authentication` 이 아닌 `authorization` 을 집중해보기로 결정했습니다..

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

라는 방식으로 작동하고 있다는 걸 확인하였습니다.

---

### 해당 방식을 기반으로 한 나의 authorization 방식

이는 충분히 좋은 방법으로 크게 수정할 것은 없는 것 같다는 생각이 들었습니다. 다만 몇 가지는 수정하면 좀 더 나을 거 같다는 생각이 들었습니다. 더 개선하면 좋을 것들의 목록은 아래에 적어보았습니다.

### No custom header

> Custom proprietary headers have historically been used with an `X-` prefix, but this convention was deprecated in June 2012 because of the inconveniences it caused when nonstandard fields became standard in [RFC 6648](https://datatracker.ietf.org/doc/html/rfc6648); others are listed in an [IANA registry](https://www.iana.org/assignments/message-headers/perm-headers.html), whose original content was defined in [RFC 4229](https://datatracker.ietf.org/doc/html/rfc4229). IANA also maintains a [registry of proposed new HTTP headers](https://www.iana.org/assignments/message-headers/prov-headers.html). - [MDN, HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
>

먼저 `X-` prefix 가 붙는 custom header 의 사용을 지양하기로 하였습니다. MDN 의 문서에도 나와있듯, custom header 를 사용할 땐 이런 convention 을 사용하였으나, 2012 년에 규격을 벗어나게 한다는 이유로 IANA 나 RFC 등에 의해 해당 prefix 를 사용하는 관행은 지양되고 있다고 합니다. 그래서 [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 이라는 header 에 JWT 를 담아 보내기로 하였습니다.

### Simplify the authorization process with passport
**Custom Strategy of passport-jwt**
```tsx
const userServiceForValidation = new UserService(new UserRepository());
export const WashSwotStrategy = new Strategy(
  {
    secretOrKey: getConfig().jwtSecret,
    issuer: getConfig().jwtIssuer,
    audience: getConfig().jwtAudience,
    algorithms: [getConfig().jwtAlgorithm],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload: WashswotJwtInterface, done) => {
    const { uuid } = jwtPayload;
    const user = await userServiceForValidation.findUserByUUID({ uuid });
    // case: find a user with a valid credential
    if (user) {
      return done(null, { uuid });
    }
    // case: else (invalid credential, valid credential but cannot find user with it)
    return done(unauthorizedErrorInstance, false, {
      ...unauthorizedErrorProps,
    });
  },
);
```
custom passport strategy 를 정의한 코드.

두 번째로는 인증/인가 라이브러리인 [passport](http://www.passportjs.org/packages/passport-jwt/) 사용입니다. 그 중에서도 `jsonwebtoken` 을 사용하는 만큼, `passport-jwt` 를 사용하고자 한다. 그 이유는 코드베이스가 좀 더 간략해지기 때문입니다.
authentication 과정에서 다양한 경우를 처리하지 않는다는 가정 하에, 별 다른 처리 없이 사용자의 authentication 만을 진행할 거라면 코드의 양을 일단은 줄여보자는 생각이 들었고, 코드가 적어질 수록, 버그도 적어지기에, 꼭 필요한 게 아니라면 신뢰도가 높은 라이브러리 등으로 코드를 줄이자는 주의이기에 passport 를 사용하기로 했습니다.



## Token strategy and design for authorization

그 다음에는 authorization 에 사용할 token 에 대해서 전략을 세워보았습니다.

### refresh token and access token

먼저 token 을 access token 과 refresh token 두 개로 나누어 발급하기로 하였습니다. 그렇게 하기로 한 이유는 두 개입니다. 첫 번째는 사용자의 편의성이고, 두 번째는 보안입니다.

**Better user experience**

refresh token 은 access token 을 갱신할 수 있게 해주는, access token 에 비해 만료일이 조금 더 긴 token 을 의미합니다. 이렇게 되면 access token 의 주기가 짧아져도, refresh token 으로 token 을 갱신하면 되기에 사용자가 계속해서 로그인 등을 처리할 필요가 줄어들게 되는 셈입니다.

**Better security**

주기가 약간 긴 하나의 token 만으로 길게 하여 사용하는 방식도 가능하겠지만, 이 또한 좋은 방법은 아니라고 생각합니다. 해당 token 이 유출되었을 때 주기가 길면, 그 token 으로 사용자인 척 위장할 수 있는 여지가 길어지기 때문입니다. 그래서 주기가 짧은 토큰과 주기가 긴 토큰을 같이 사용하면서, 주기가 짧은 토큰은 주기가 짧은 만큼 여러 번 사용하고, 주기가 긴 토큰은 주기가 짧은 토큰이 만료가 되었을 때 재발급을 위해 가끔 사용하는 방식으로 혹시 모를 위험에 대한 risk taking 을 할 수 있다고 생각하여 보안적으로 좀 더 나은 방법이라는 생각을 하였습니다.

---

# API token
## Token Design

![jwt-web-debugger.png](./daily-development-logs/2022-01-05/assets/jwt-web-debugger.png)

### Algorithm

먼저 암호화 알고리즘입니다. github repository 의 코드에서 이용하고 있던 `HS256` 알고리즘을 계속 이용하기로 하였습니다. 왜냐하면, 나머지 알고리즘들도 있긴 하지만, HS256 이 일단은 가장 무난하기도 하고, 보안적인 측면으로 보았을 때는 더 좋은 알고리즘들도 있지만, 해당 알고리즘들은 client 와도 협력이 필요한 부분이 있기에 가장 무난한 선택지인 `HS256` 을 계속해서 사용하기로 하였습니다.

### Properties

`audience` 와 `issuer` property 를 추가하였습니다. `audience` 는 누가 해당 token 을 사용하는지, `issuer` 는 누가 이 token 을 발급했는지에 대한 정보를 담는 property 입니다. 이를 통해서 좀 더 valid 한 token 을 만들기 위해 필요한 값들이 많아졌습니다.

### ExpiresAt

그 다음으로는 만료 주기입니다. 일단은 access token 은 1일, refresh token 은 3일을 주었습니다. 그리고 이렇게 설정한 경우, 사용자는 만료된 refresh token 을 갱신하기 위해서 3일마다 재 로그인을 해야합니다.
물론 이는 회사의 사용자 정책에 따라서 달라질 수 있는 부분이고, 저 또한 아직 경험이 부족한 탓에 어느정도의 주기가 사용자의 경험을 최대한 해치지 않는 선에서 사용자의 보안을 지켜낼 수 있는 지점인지는 잘 모르겠습니다. 그러나, 만료일은 가급적 짧으면 짧을수록 좋다는 생각에 일단은 이런 식으로 setup 을 하게 되었습니다.


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
        "accessToken": "eyJhbGc...Av5NauEBISFU-NXvAQrQc",
        "refreshToken": "eyJhbGc...3TkumTpQ"
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

물론, 에러에 대해서 너무 많은 정보를 노출하는 것은 보안상으로는 좋지 않으나, 그걸 고려하지 않고 구현한 log 이며, 일단 개발자 입장에서 디버깅을 용이하게 하기 위해서는 이런 식으로 custom error object 를 구성하지 않을까 합니다.


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
error response 의 예시는 다음과 같고

```shell
CanNotFindATaskWithThisTaskIdError: There is no task with this task id
    at FacadeTaskService.<anonymous> (/Users/pravda/Development/nodejs-test/dist/components/task/facade.task.service.js:160:27)
    at Generator.throw (<anonymous>)
    at rejected (/Users/pravda/Development/nodejs-test/dist/components/task/facade.task.service.js:6:65)
    at processTicksAndRejections (internal/process/task_queues.js:95:5) {
  _name: 'CanNotFindATaskWithThisTaskIdError',
  _message: 'There is no task with this task id',
  _statusCode: 404,
  _action: 'Find a task with invalid task id',
  _solution: "Check your task id's validity before retry to find a task again"
}
```
error logging 은 debugging 을 할 때 드는 시간을 줄이기 위하여, `console.error(err.stack)` 을 이용하여 어느 부분에서 에러가 발생하고, 전파되었는지를 로그로 남겼습니다.


---

# DB Structure
## Current database schema
![current-database-schema.png](./daily-development-logs/2022-01-08/assets/current-database-schema.png)
현재의 데이터베이스 스키마입니다. 아래는 데이터베이스 스키마를 설계하기까지 중점적으로 고려한 사항들 입니다.

## 정규화
- 정규화단계는 3.5 NF (Boyce-Codd NF) 까지 진행하였습니다. 이유는 데이터베이스에 담길 데이터들의 integrity 와 consistency 를 최대한 유지하기 위해서입니다. 특히 transitive functional relation 관계가 있는 subset 들을 묶어서 별도의 table 로 분리하는 과정에 가장 많은 시간 투자를 하였습니다.
    - 해당 과정의 대표적인 결과물은 주소(`address`)를 별도의 table 로 분리한 것입니다. 분리한 이유는 [API Sample data](https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json) 를 보았을 때, `address_01` 과 `address_02` 부분이 transitive functional relation 이 있다고 판단하였기 때문입니다.
        - `address_01`, 그러니까 흔히 우리가 일컫는 도로명 주소가 바뀌는 경우, `address_02`, 흔히 말 하는 동/호수를 적는 상세주소가 바뀔 확률은 매우 높다고 생각합니다. 물론 다른 위치에 같은 동/호수가 있는 경우가 있을 수 있지만, 이는 매우 드문 경우가 아닐까 생각이 들었습니다.
        - 그래서 `information` 이라는 data 를 구성하는 `address_01` 과 `address_02` 라는 두 개의 column을 별도의 `address` 로 분리하게 되었습니다.
- 이런 분리를 하게 된 이유가 또 하나 있는데, 바로 UX 관점입니다. '사용자는 여러 개의 주소지를 가질 수 있다' 라는 생각으로 별도의 `address` table 을 만들고, `user` 와 one to many 관계를 만들어 주어야겠다는 생각을 하여서 분리하게 된 것도 있습니다.    
  - 사용자의 입장에서는 이전에 주문을 했던 주소로 세탁 주문을 맡기고 싶을 때, 그 주소지를 주소지를 새로 입력해야 한다면 썩 유쾌한 경험은 아닐 것이라는 생각이 들었습니다.
  - 그것보다는, 내가 이전에 주문했던 주소지 목록들 중에 하나를 선택해서 그 주소를 입력할 수 있다면, 주소를 수정하더라도, 그 주소를 불러와서 수정할 부분만 수정할 수 있다면, 더 이상 쓰지 않는다면, 내 주소지 목록에서 삭제할 수 있다면, 사용자 입장에서는 좀 더 편하지 않을까? 라는 생각으로 분리를 하게 된 이유도 있습니다.
  - 물론 이렇게 하는 경우 데이터의 중복을 최대한 줄이기 위해서 사용자를 식별할 수 있는 credential 과 함께 `GET /address` 로 사용자의 주소지 목록을 받아오는 API 를 만들고, 만약 주소지를 그 목록중에 선택한다면 그 목록중에서 선택하고, 없으면 새로 만들어서 등록하는 방식의 API 를 만들어야 할 필요가 있다고 생각이 들었습니다.

## Credential Table
- 그 다음으로는 `credentials` 라는 table 을 만들었습니다. 이는 access - refresh token pair 를 통해 인증을 진행하면서 필요하겠다고 생각이 들어 만든 table 입니다. 해당 table 은 access token 이 만료가 되었을 경우, refresh token 을 통해 access - refresh token pair 를 갱신하고, 그 갱신된 refresh token 을 담는 역할을 합니다. valid 한 token 이어도 해당 uuid 로 credential table 을 조회하였을 때 나오는 refresh token 이 Authorization header 에 담긴 refresh token 과 다를 수 있는 malicious 한 공격의 여지를 차단할 수 있습니다.
    - 부수적으로는, 사용자 별 마지막 로그인 날짜를 파악할 수 있는 역할도 할 수 있습니다. 먼저 refresh token 은 ‘자동 로그인 주기’ 라는 UX 와 관련된 부분과 연관이 있습니다. 왜냐면, access token 을 통한 자동 로그인 주기가 끝났을 때, 다시 로그인을 하기 위해서는 refresh token 을 통해 새로 갱신을 해야 하기 때문입니다.
        - 그래서 refresh token 의 갱신일이 (현 시점 - refresh token 만료일) 보다 이전이라면, 이 사람은 최근에 애플리케이션을 잘 사용하지 않았고, 이런 유형의 사용자들을 모아서 "왜 이 사람들이 요즘 애플리케이션을 잘 사용하지 않을까" 대해 해당 데이터와 나머지 데이터를 통해 분석하고, "어떤 식으로 retention 을 진행해야 가장 효율적으로 진행할 수 있을까" 등에 대해 논의할 때 데이터를 기반으로 한 논의 (data driven decision) 가 가능해지는 밑바닥이 된다고 생각합니다.


---

