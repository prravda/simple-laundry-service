# 시작 하면서
안녕하세요 지원자 여러분! 세특 nodejs 과제 테스트에 참여 해주셔서 감사 드립니다. 해당 과제는 세특 앱에서 활용 하고 있는 "문제 의류 접수" 화면의 API를 작성 하는 프로젝트 입니다. 각 컴포넌트들을 잘 구조화 활 수 있는지, OOP 기반의 프로그래밍을 하실 수 있는지 또 지금은 작은 프로젝트라도 확장성이 고려된 프로젝트를 완성 시킬 수 있는지? 를 파악하는 것에 목적으로 두고 있습니다. 프로젝트 구조화에 신경 써주셨으면 좋겠습니다.

해당 프로젝트 clone 후 새롭게 작성 해주세요.

# 필수 개발 환경
아래 리스트업한 항목들은 반드시 셋팅 되어야 하는 항목들 입니다. 나열되지 않은 라이브러리는 자유롭게 사용 해주세요.
- Javascript ES6
- NodeJS v14, Express
- 데이터베이스 : sqlite3, better-sqlite3


# 개발 요소 설명
#### 1. API 셋팅
아래 화면과 샘플 데이터를 확인 해주세요. 
화면은 총 한 페이지 입니다. 고객이 앱에서 직접 아이템을 선택해서 주문 접수 하는 것을 가정합니다.
- 샘플 데이터 : https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
- 가이드 화면 : https://www.figma.com/file/TrORrNvLo5SdtSEArh2SDO/sample_myorders-detail?node-id=2%3A715



better-sqlite3 라이브러리를 활용해 SQL 기반의 데이터베이스를 셋팅하고 리스트에 나열된 API를 작성 해주시면 됩니다.
- `GET /api/order` 주문 리스트 가져오기
- `GET /api/order/:taskId` taskId에 해당하는 1개 주문 가져오기
- `POST /api/order/` 주문 등록하기

#### 2. 응답 포맷 셋팅
해당 프로젝트는 성공, 실패에 따른 처리가 가능한 wrapper class가 명시 되어 있습니다. 각 위치는 아래와 같습니다.
- `src/libs/suceess.js` 응답 성공
- `src/middlewares/exceptions.js` 응답 실패

성공과 실패 상황에 맞춰 가장 이상적인 형태의 응답 포맷을 완성해주세요. 현재는 기본 프로젝트 셋팅을 위한 샘플 코드가 작성되어 있습니다.

#### 3. 인증 체계 셋팅
현재 프로젝트는 전화번호 인증 후 Bearer token 급 후 고객의 UUID를 request에 저장하고 API 통신 시 활용하는 인증 체계가 셋팅 되어 있습니다. 생각 하는 이상적인 인증 체계를 완성 시켜주세요.

# 참고 하기
해당 프로젝트의 시작은 `src/server.js` 입니다. `src/server.js` 에서 각 도메인 별 component를 initializing 후 `service.js`, `dao.js` 를 통해 데이터 베이스를 핸들링 하고 API 로직을 완성하고 있습니다. 이미 작성된 `src/user` 디렉토리를 확인 해주세요.

# 라이브러리 참고
- express : https://github.com/expressjs/express
- better-sqlite3 : https://github.com/JoshuaWise/better-sqlite3
