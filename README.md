# Todo App (w.apollo graphql & vue)

## 구경하기

* [Todo App](https://todo.why.auoi.net/)

## 프로젝트 구성

* Vue.js를 이용한 클라이언트
* Apollo GraphQL을 이용한 서버 구성
* MongoDB를 활용한 데이터 관리
* JWT 토큰을 활용한 로그인 
* TypeScript을 이용한 서버 구현

## 프로젝트 과정 및 배운점

> 처음으로 백엔드를 공부하여 프로젝트를 진행해 보았다.

> 백엔드는 어떻게 구성을 해야하고 어떻게 동작하는지에 대해 이해가 전혀 없었는데, 이렇게 작은 토이 프로젝트라도 진행해보니 이전 보다는 웹 서비스를 보는 시야가 많이 확대되고 전반적인 흐름을 이해할 수 있게 됐다.

> 시작할때는 성능 및 구조등을 전혀 신경 쓰지 않고 동작 하게 만드는것에 초점을 맞추어 프로젝트를 진행했었다.
> 그러다보니 하나의 endpoint에서 모든 api호출을 진행했고 resolver에서 데이터 베이스 접근 및 데이터 가공 등 모든 비즈니스 로직을 처리했다.

> 이후 개선이 필요한 부분에 대해서 고민해 보고 하나씩 구조화를 진행하며 endpoint 나누기, DAO 추가하기, Services, Middleware등을 적용하며 프로젝트를 개선했다.
> 하나 하나씩 기능들을 붙혀 나가다보니 각각의 부분이 왜 그리고 언제 필요한지에 대해서 이해 할 수 있었다.

> 처음 생각했던 기능들을 마무리 하고 실제 배포 과정까지 경험해 보고 싶어서 추가적인 공부를 진행했고, docker를 이용해 프로젝트를 컨테이너화 하고 이를 ec2서버에 생성 후 nginx를 추가해 https까지 적용 후 마무리 했다.

### 언어
* HTML, CSS
* JavaScript
* TypeScript
* MongoDb

### 기술 스택
* Apollo Server
* GraphQl
* Apollo Vue

### 배포
* EC2
* NginX
* Docker