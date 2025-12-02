# 🌱 2025-12-02 TIL – Vue3 프로젝트 생성 & 컴포넌트 맛보기

---

## 1. Vite + Vue3 프로젝트 생성하기 ⚙️

### 1) 프로젝트 생성 명령어

```bash
npm create vue@latest
```
- 프로젝트 이름 입력
- TypeScript / Router / Pinia 등은 필요에 따라 선택
- 생성 후 폴더로 이동:
```bash
cd 프로젝트이름
npm install
npm run dev
```
- npm run dev 실행 후 브라우저에서 로컬 주소 접속하면 기본 Vue 화면 확인 👀
---
## 2. Vue Single File Component(SFC) 기본 구조 📦

Vue 파일(`.vue`)은 기본적으로 3부분으로 구성된다.
```vue
<template>
  <!-- 화면에 보이는 HTML 구조 -->
</template>

<script setup>
// 로직 (데이터, 함수, import 등)
</script>

<style scoped>
/* 이 컴포넌트에만 적용되는 스타일 */
</style>
```
#### ✅ 중요 포인트

최소한 `<template>` 또는 `<script>` 중 하나는 반드시 있어야 함

그렇지 않으면 아래처럼 에러 발생:

`[plugin:vite:vue] At least one <template> or <script> is required`

`<script setup>`을 사용하면 Composition API 문법을 더 간단하게 쓸 수 있음
---
## 3. App.vue와 자식 컴포넌트 연결 🧩
오늘 한 핵심: 컴포넌트를 만들어서 App.vue에서 불러와 사용하기
### 1) 컴포넌트 파일 예시 (`ColorChanger.vue` 등)
```vue
<!-- src/components/ColorChanger.vue -->
<template>
  <div>
    <input type="text" v-model="colorClass" />
    <p :class="colorClass">
      입력창에 올바른 색상 명을 입력하면 글자색이 바뀌어요.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colorClass = ref('')
</script>

<style scoped>
.red {
  color: red;
}
.blue {
  color: blue;
}
.green {
  color: green;
}
</style>
```
### 2) App.vue에서 컴포넌트 등록 & 사용
```vue
<!-- src/App.vue -->
<template>
  <ColorChanger />
</template>

<script setup>
import ColorChanger from './components/ColorChanger.vue'
</script>
```
- 이렇게 import 후 `<ColorChanger />` 태그로 사용하면 App.vue가 ColorChanger 컴포넌트를 “상속받는 느낌으로” 포함하게 된다.
---
## 4. Bootstrap CDN 연결 및 레이아웃 🎨
### 1) index.html에 CDN 추가
```html
<!-- index.html -->
<head>
  ...
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
```
### 2) Bootstrap 이용한 헤더 & 카드 레이아웃
```vue
<header
  class="sticky-top p-3 d-flex justify-content-center align-items-center bg-success-subtle"
>
  <h1>My Gallery</h1>
</header>

<main class="container p-3">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    <div class="col" v-for="n in numberOfItems" :key="n">
      <div class="card h-100">
        <img :src="sampleImg" class="card-img-top" alt="sample" />
        <div class="card-body">
          <h5 class="card-title">앨범 제목</h5>
          <p class="card-text">설명 텍스트</p>
        </div>
      </div>
    </div>
  </div>
</main>
```
- row-cols-1 → 기본 1개
- row-cols-sm-2 → 가로 길이 ≥ 576px 일 때 2개
- row-cols-md-3 → 가로 길이 ≥ 768px 일 때 3개
→ 화면 크기에 따라 카드 개수가 달라지는 반응형 레이아웃 구현 💡
---
## 5. 간단한 CSS 카드(앨범 박스) 디자인 🎵
Bootstrap 말고 직접 CSS로 카드 스타일링도 연습함.
```vue
<template>
  <div class="album-wrapper">
    <div class="album-box">
      <h2 class="album-title">앨범 제목</h2>
      <p class="song-item">노래 목록 1</p>
      <p class="song-item">노래 목록 2</p>
      <p class="song-item">노래 목록 3</p>
    </div>

    <div class="album-box">
      <h2 class="album-title">앨범 제목</h2>
      <p class="song-item">노래 목록 1</p>
      <p class="song-item">노래 목록 2</p>
      <p class="song-item">노래 목록 3</p>
    </div>
  </div>
</template>

<style scoped>
.album-wrapper {
  text-align: center;
}

.album-box {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  width: 160px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  text-align: left;
}

.album-title {
  font-weight: 700;
  margin-bottom: 12px;
  color: #000;
}

.song-item {
  margin: 4px 0;
  color: orangered;
}
</style>
```
- 두 개의 앨범 카드가 나란히 서 있고, 제목은 검정, 곡 리스트는 주황색으로 표시되는 UI 완성 ✨
---
## 6. 오늘 만난 에러 & 해결 방법 🧯
### 1) SCSS import 에러
에러 메시지
```text
Failed to resolve import "../scss/styles.scss" from "src/main.js".
Does the file exist?
```
**원인**
- `main.js`에서 `../scss/styles.scss`를 import하고 있었지만,
실제로 해당 경로에 파일이 없었음.

**해결**
- 과제에서는 Bootstrap CDN만 사용했으므로,
`main.js`에서 SCSS import 줄을 삭제:
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
### 2) `<template>` or `<script>` required 에러

**에러 메시지**
- .vue 파일 안에 `<template>` 없이 그냥 `<div>...</div>`만 작성했을 때 발생.

**해결**
```vue
<template>
  <div>
    <!-- 내용 -->
  </div>
</template>

<script setup>
</script>
```
처럼 반드시 `<template>` 블록 안에 HTML을 넣도록 수정.
---
7. 정리 & 내일 할 일 📝
#### 오늘 배운 핵심 🔑
- `npm create vue@latest` 로 Vue3 + Vite 프로젝트 생성하는 법
- Vue Single File Component 기본 구조 (`template / script setup / style`)
- App.vue에서 다른 컴포넌트 import 후 태그로 사용하기
- Bootstrap CDN을 index.html에 연결해 레이아웃/디자인 적용하기
- `v-model`과 `:class`를 이용한 양방향/단방향 바인딩 연습 (ColorChanger)
- 기본 CSS로 카드/앨범 형태 박스 디자인하기
- 자주 나오는 Vite/Vue 에러 메시지와 해결 패턴 익히기

#### 내일 하면 좋은 것들 👣
- 컴포넌트 여러 개 만들어서 App.vue에서 배치해 보기
- `props`로 부모 → 자식 데이터 전달 연습
- `v-for` + 배열/객체 데이터로 카드 목록 동적으로 만들기
- 간단한 “앨범 리스트”나 “갤러리 페이지” 하나 완성해 보기