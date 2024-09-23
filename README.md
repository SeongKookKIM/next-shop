# Shop - 쇼핑몰 프로젝트

이 프로젝트는 사업자 거래를 간편하게 할 수 있는 플랫폼을 제공하고자 시작되었습니다. 사업자를 구매하거나 판매할 수 있는 기능을 중심으로, 사용자들이 서로 자유롭게 소통할 수 있는 다양한 커뮤니티 기능도 함께 제공하여 비즈니스 관련 네트워킹과 정보 공유가 원활하게 이루어질 수 있도록 설계되었습니다.

서비스 링크: <a href="https://next-shop-yubs.vercel.app/" target="_blank">https://next-shop-yubs.vercel.app/</a>

### [`Test Account`]

```bash
ID: test123

PW: Test123!@#
```

## 주요 기능

### 1. 사업자 거래 기능

<p align="center">
     <img src="https://github.com/user-attachments/assets/774422fe-48e7-41f3-95b3-bd6b8ccc336a" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/aa237383-0215-4b54-af19-052daa7b0c14" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/652e73d2-b309-4aba-b622-fec10bc44ad0" alt="회원관리 설명" width="30%" />
</p>

- 사용자는 자신이 소유한 사업자를 판매하거나, 다른 사용자가 등록한 사업자를 구매할 수 있습니다. 이를 통해 사업을 확장하거나 새로운 사업 기회를 찾는 데 도움을 주는 플랫폼을 제공합니다.

### 2. 커뮤니티 기능

<p align="center">
  <img src="https://github.com/user-attachments/assets/cbb1bbfb-e86c-4ed8-95c0-9be736646a92
  " alt="회원관리 설명" width="45%" />
  <img src="https://github.com/user-attachments/assets/6b4cc431-1771-4efe-8c31-0403cc2331bc" alt="회원관리 설명" width="45%" />
</p>

- 다양한 주제로 자유롭게 소통할 수 있는 커뮤니티 공간을 제공하여 사업 관련 정보 교환, 조언 요청, 경험 공유 등이 가능하도록 했습니다.
- 사용자들은 사업 운영에 필요한 다양한 팁과 전략을 공유하거나, 문제 해결을 위한 조언을 받을 수 있습니다. 또한, 사업직거래 후기 등의 다양한 주제를 논의할 수 있는 커뮤니티가 활성화되어 있습니다.

### 3. 소셜 로그인 및 간편한 회원가입

<p align="center">
  <img src="https://github.com/user-attachments/assets/db2e4a66-027f-41f9-96fc-8f1ebe28b88a" alt="회원관리 설명" width="45%" />
  <img src="https://github.com/user-attachments/assets/c795bd77-ea6e-4ffe-b673-340e60ee031a" alt="회원관리 설명" width="45%" />
</p>

- 사용자는 구글, 깃헙, 네이버, 카카오로 다양한 소셜 로그인을 통해 간편하게 회원가입하고 로그인할 수 있습니다. 복잡한 절차 없이 몇 번의 클릭만으로 계정을 생성할 수 있으며, 비즈니스 환경에 맞춘 사용자 경험을 제공하는 것이 목표입니다.

### 4. 마이페이지 통합 관리

<p align="center">
  <img src="https://github.com/user-attachments/assets/97700631-95a3-4944-9a9b-65cd25aaae41" alt="이미지1 설명" width="90%" />
</p>

- 사용자는 마이페이지에서 자신이 작성한 글과 등록한 게시물을 한눈에 확인하고 관리할 수 있습니다. 내가 작성한 글이나 게시글 목록을 통합적으로 관리할 수 있어, 사업 관련 글이나 거래 내역을 손쉽게 추적할 수 있습니다.

이 프로젝트는 사업자 거래뿐만 아니라 커뮤니티를 통한 정보 교류와 소셜 로그인으로 간편한 사용자 경험을 제공하는 것을 목표로 하고 있습니다. 또한, 사용자들이 자신이 올린 게시글을 쉽게 관리할 수 있는 직관적인 인터페이스를 통해 편리함과 효율성을 높였습니다.

<br/>

## 개발도구 및 스텍

### 개발 환경

- **Node.js**: 20.10.0
- **Yarn**: 1.22.22

### 기술 스택

- **Server**: Next.js API Routes
- **Database**: MongoDB

### Dependencies

- **Node.js**
  - TypeScript: 5
  - Express: 4.19.2
  - React: 18.2.0
  - Next: 14.0.4

### 서버 설정 및 배포

- **서버 설치**: yarn install
- **서버 실행**: yarn start
- **배포 환경**: Vercel

<br/>

## 주요 기능 소개

1. 다크 모드와 라이트 모드 기능 구현

<p align="center">
  <img src="https://github.com/user-attachments/assets/3e5817c7-dd80-4033-b5bd-07c0d0efe269" alt="이미지1 설명" width="300" />
</p>

- 사용자 환경에 따라 다크 모드와 라이트 모드로 전환할 수 있는 기능을 구현했습니다. 쿠키에 저장된 값을 기반으로 모드를 자동으로 설정하며, 사용자가 선택한 모드는 페이지를 새로고침하거나 다시 방문해도 유지됩니다. 이를 통해 사용자에게 보다 개인화된 경험을 제공합니다.

2. EmailJS를 활용한 문의 기능

<p align="center">
  <img src="https://github.com/user-attachments/assets/89f3b7a7-f668-410e-9ba1-8197ec39fe00" alt="회원관리 설명" width="45%" />
  <img src="https://github.com/user-attachments/assets/55afc158-9eb6-4a6c-b8b9-ef4e8cb758cc" alt="회원관리 설명" width="45%" />
</p>

- EmailJS 라이브러리를 사용하여 웹 페이지 내에서 손쉽게 문의할 수 있는 기능을 구현했습니다. 사용자가 입력한 정보(이름, 이메일, 메시지 등)를 쉽게 수집하고, 이메일로 전송하여 관리자에게 전달되도록 했습니다. 별도의 백엔드 설정 없이 프론트엔드에서 이메일 전송을 처리할 수 있어 개발 시간을 단축하고 사용자 편의를 극대화했습니다.

3. 스크롤 값에 따른 애니메이션 추가

<p align="center">
  <img src="https://github.com/user-attachments/assets/5d50a4ad-0f24-415f-818c-1a9af4e07d07" alt="이미지1 설명" width="300" />
</p>

- 사용자 경험을 향상시키기 위해 스크롤 값을 기반으로 상단 네비게이션과 푸터에 애니메이션 효과를 추가했습니다. 사용자가 스크롤을 내리거나 올릴 때 네비게이션 바와 푸터가 부드럽게 나타나거나 사라지도록 하여, 사이트의 시각적 요소와 인터랙션을 개선했습니다.

4. 판매자 정보 복사 기능 추가

<p align="center">
  <img src="https://github.com/user-attachments/assets/db084120-5ee8-4d63-9d2f-63dee2c5ce89" alt="이미지1 설명" width="300" />
</p>

- 사업자 구입 페이지에서는 판매자의 연락처와 이메일을 쉽게 복사할 수 있는 기능을 구현했습니다. 사용자는 한 번의 클릭만으로 판매자의 정보를 클립보드에 복사할 수 있어, 연락처나 이메일을 직접 입력하는 번거로움을 줄이고 사용자 편의성을 높였습니다.

5. 자신이 작성한 글만 삭제 가능

<p align="center">
  <img src="https://github.com/user-attachments/assets/3fe27a1e-58c5-4a2a-83e1-15dc7f36a353" alt="이미지1 설명" width="300" />
</p>

- 게시글 관리의 일환으로, 사용자는 자신이 작성한 글만 삭제할 수 있는 기능을 구현했습니다. 이를 통해 보안과 관리의 일관성을 유지하며, 다른 사용자가 본인 글이 아닌 글을 삭제할 수 없도록 보호했습니다.

6. 미들웨어를 통한 로그인 통제

<p align="center">
  <img src="https://github.com/user-attachments/assets/b5ec5e7a-edd8-497a-b280-8766d58a3de6" alt="이미지1 설명" width="300" />
</p>

- 미들웨어를 활용하여 로그인 상태를 효과적으로 통제하는 기능을 구현했습니다. 사용자가 로그인이 필요한 페이지에 접근하려고 할 때, 로그인 여부를 확인하고 미로그인 상태라면 로그인 페이지로 리다이렉트합니다. 이를 통해 인증이 필요한 페이지에 대한 보안을 강화했습니다.

<br/>

## 트러블 슈팅

1. MongoDB 연결 문제

- 문제: Next.js의 서버리스 아키텍처에서는 각 요청마다 새로운 MongoDB 연결이 생성되는 문제가 발생했습니다. 특히 개발 환경에서 Next.js의 핫 리로드(Hot Reload) 기능이 작동할 때마다 코드가 수정될 때마다 MongoDB 연결이 계속 새로 생성되어, 연결 누수가 발생하고 서버 자원이 불필요하게 소모되었습니다. 이로 인해 성능 저하가 우려되었습니다.

- 해결 방법:  
  `MongoClient` 객체를 전역적으로 관리하여 **연결을 재사용**하기 위해, `globalThis` 객체를 사용하여 MongoDB 클라이언트를 **전역 변수**로 선언했습니다.
  아래 방식으로 MongoDB 연결을 관리하여, 연결 누수 문제를 해결하고 성능을 최적화할 수 있었습니다. 개발 환경에서도 핫 리로드로 인한 불필요한 연결 생성 문제를 방지하고, 전역적으로 MongoDB 클라이언트를 재사용할 수 있게 되었습니다.

```ts
import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }
}
```

2. @toast-ui/react-editor React 버전 지원 문제

- 문제:  
  `@toast-ui/react-editor`는 **React 17까지만 지원**하고, **React 18**에서는 호환성 문제가 발생했습니다. 따라서 Toast UI Editor를 사용할 수 없게 되어, 에디터 기능이 필요한 부분에서 장애가 발생했습니다. 이로 인해 프로젝트에서 사용자가 글을 작성할 수 있는 **텍스트 입력 영역**을 구현하는 데 어려움이 있었습니다.

- 해결 방법:  
  Toast UI Editor를 직접 사용할 수 없기 때문에, 대신 textarea를 대체하여 변경하였습니다.(React-quill 써드파티 라이브러리로 대체하여 리펙토링 예정)

3. 다크모드 문제

- 문제: 초기에는 다크 모드 설정을 로컬 스토리지에 저장하여 사용자 환경을 유지하려고 했으나, 일부 브라우저 환경 및 기기 간 설정 동기화 문제가 발생

- 해결 방법: 다크 모드 설정을 쿠키로 전환하여 기기 간 일관성과 동기화 문제를 해결했습니다.

4. 소셜 로그인 CallBack URL 문제

- 문제:  
  NextAuth를 사용하여 소셜 로그인을 구현하였으나, 최근 서비스 재배포 과정에서 CallBack URL을 변경한 후, **네이버 로그인을 제외한 구글, 깃허브, 카카오 로그인**에서 문제가 발생하였습니다. 특히 구글 로그인의 경우, GCP(구글 클라우드 플랫폼) 무료 계정이 종료되면서 인증 서비스 사용이 불가능해졌습니다.

- 해결 계획:

  - 구글 로그인:  
    GCP 무료 계정이 만료되어 인증 서비스를 사용할 수 없기 때문에, **새로운 GCP 계정을 생성**한 후 인증 서비스를 다시 설정할 예정입니다. 새로운 계정으로 인증 설정을 재구성하여 구글 로그인 문제를 해결할 계획입니다.

  - 깃허브 및 카카오 로그인:  
    CallBack URL이 변경되었기 때문에, **깃허브와 카카오 개발자 콘솔**에서 서비스 URL을 올바르게 **재설정**하여 로그인 문제를 해결할 예정입니다. 올바른 URL을 설정한 후, 인증이 정상적으로 작동하도록 할 계획입니다.
