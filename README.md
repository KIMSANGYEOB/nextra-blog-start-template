# Nextra Start Template

이 프로젝트는 [nextra](https://nextra.site/) Docs Theme로 만들어졌습니다.

시작하기 전 [Nextra Docs](https://nextra.site/docs) 문서 가이드를 확인해주세요.

## 실행 방법

- [Node.js](https://nodejs.org/en) 18 버전 이상을 요구합니다.

```bash
npm i
npm dev
```

### MDX 문서

MDX 문서를 작성할 때 항상 상단에 아래 Front Matter 형식을 지켜주세요.

```mdx
---
title: Blog Home // 필수
description: 블로그의 홈 화면입니다. // 필수
keywords:
  - home
  - nextra
  - post
date: 2024-01-01 // 필수
thumbnail: /img/sample.jpg // 필수
---

... 내용
```

### 빌드 시점 데이터 생성

이 프로젝트는 빌드 시점에 `scripts\build-data.ts` 경로에서 데이터를 생성합니다.

필요한 경우 해당 부분을 수정해주세요.

## 라이센스

이 라이센스는 [nextra license](https://nextra.site/about#license) 기반으로 작성되었고 MIT 라이센스를 가지고 있습니다.

따라서 수정 배포에 제한이 없습니다.