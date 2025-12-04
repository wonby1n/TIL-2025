# 📝 2025-12-03 TIL – Vue Router & Quiz 앱 만들기

## 1. Routing & SPA 기본 개념 🔀

- **Routing**  
  - URL(주소)에 따라 **어떤 화면(컴포넌트)** 을 보여줄지 결정하는 기능.
- **SSR vs CSR**
  - SSR : 서버에서 완성된 HTML을 주고, 페이지마다 새로고침.
  - CSR / SPA : HTML 파일은 1개, JS로 안에서 화면만 갈아 끼움.
- **SPA에서 Router가 없으면**
  - URL이 항상 하나 → 뒤로 가기 / 새로고침 / 링크 공유가 불편함.
  - 그래서 **페이지는 1개지만, URL에 따라 다른 컴포넌트를 보여주는 구조**가 필요 → Vue Router 사용.

---

## 2. Vue Router 기본 구조 🧩

### 2-1. 프로젝트 구조

- `src/router/index.js` : **URL ↔ 컴포넌트 매핑표**
- `src/views` : 라우트와 연결되는 **페이지 단위 컴포넌트**
- `src/components` : 페이지 안에서 재사용되는 **작은 조각 컴포넌트**
- `src/main.js` : `app.use(router)`로 라우터를 앱에 연결.
- `src/App.vue` : 상단 메뉴(`RouterLink`), 화면 출력 자리(`RouterView`).

### 2-2. 기본 라우터 설정 예시

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SomeView from '@/views/SomeView.vue'
import OtherView from '@/views/OtherView.vue'
import StudentView from '@/views/StudentView.vue'
import StudentDetailView from '@/views/StudentDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',              name: 'some',          component: SomeView },
    { path: '/other',         name: 'other',         component: OtherView },
    { path: '/students',      name: 'students',      component: StudentView },
    { path: '/students/:name',name: 'studentDetail', component: StudentDetailView },
  ],
})

export default router
```
### 2-3. App.vue에서 Router 사용
```js
<template>
  <div class="quiz-app">
    <!-- 상단 헤더 + 설명 -->
    <header class="app-header">
      <p class="app-title">Quiz 퀴즈</p>
    </header>
    <section class="app-description">
      <p>여기는 퀴즈의 나라! 놀라운 퀴즈들이 기다리고 있어요. 지금 바로 도전해보세요!</p>
    </section>

    <!-- 네비게이션 -->
    <nav class="app-nav">
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="{ name: 'quiz' }" class="nav-link">Quiz</RouterLink>
    </nav>
  </div>

  <!-- 현재 라우트의 컴포넌트가 렌더링되는 자리 -->
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
```
---
## 3. Named Route & Dynamic Route & params 🎯
### 3-1. Named Route

- path 문자열 그대로 쓰는 대신 name 기반으로 이동하면 path가 바뀌어도 관리가 편함.
```vue
<!-- 템플릿에서 -->
<RouterLink :to="{ name: 'students' }">학생 목록</RouterLink>
```
```js
// JS에서
router.push({ name: 'students' })
```
### 3-2. Dynamic Route (/students/:name)
- URL 일부를 변수처럼 쓰는 패턴.
```js
{
  path: '/students/:name',
  name: 'studentDetail',
  component: StudentDetailView,
}
```
- 예시
    - `/students/김하나 `→ `params = { name: '김하나' }`
    - `/students/김두리` → `params = { name: '김두리' }`
### 3-3. params 읽어오기 (useRoute)
```js
<!-- StudentDetailView.vue -->
<template>
  <div>
    <h3>학생 상세 정보 페이지입니다</h3>
    <p>학생 이름 : {{ studentName }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const studentName = route.params.name
</script>
```
---
## 4. useRoute vs useRouter 차이 ⚙️
- `useRoute()` : 현재 경로 정보 읽기 (어디에 있는지)
    - `route.params`, `route.query`, `route.path` 등.
- `useRouter()` : 페이지 이동 조종하기 (어디로 갈지)
    - `router.push()`, `router.replace()`, `router.back()` 등.
---
## 5. Programmatic Navigation – router.push / router.replace 🚗
### 5-1. 기본 사용
```js
const router = useRouter()

// path로 이동
router.push('/about')

// name으로 이동
router.push({ name: 'students' })

// 동적 라우트 + params
router.push({
  name: 'studentDetail',
  params: { name: '김하나' },
})
```
### 5-2. push vs replace

- `router.push()`
    - 히스토리에 새 기록 추가
    - 뒤로 가기 하면 방금 페이지로 돌아올 수 있음.

- `router.replace()`
    - 현재 기록을 덮어씀
    - 뒤로 가기 하면 그 전전 페이지로 이동.
    - 로그인/회원가입 완료 후 다시 못 돌아오게 할 때 사용.

---
## 6. Navigation Guard 정리 🔐
### 6-1. 전역 가드 – beforeEach

- 모든 라우트 이동 전에 항상 실행되는 문지기.
```js
router.beforeEach((to, from, next) => {
  const isLoggedIn = false // 예시

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })   // 로그인 필요 페이지 -> login으로
  } else {
    next() // 그냥 통과
  }
})
```
- to : 가려는 라우트
- from : 현재 라우트
- next() : 이동 허용 / 취소 / 다른 곳으로 보내기

### 6-2. Per-route Guard – beforeEnter
- 특정 라우트에서만 쓰는 문지기.
```js
{
  path: '/admin',
  name: 'admin',
  component: AdminView,
  beforeEnter: (to, from, next) => {
    const isAdmin = false // 예시
    if (!isAdmin) {
      alert('관리자만 접근 가능합니다.')
      next(false) // 이동 취소
    } else {
      next()
    }
  },
}
```
### 6-3. In-component Guard – `onBeforeRouteLeave`
- 특정 컴포넌트를 떠나기 직전에 실행되는 가드.
- 주로 “저장 안 된 변경사항이 있을 때 나가도 되는지” 확인 용도.
```js
<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const isDirty = ref(false)

onBeforeRouteLeave((to, from) => {
  if (!isDirty.value) return true

  const answer = window.confirm('저장 안 된 내용이 있어요. 정말 나갈까요?')
  if (!answer) return false   // 기존 페이지에 머무름

  return true                 // 이동 허용
})
</script>
```
---
## 7. Props & Emit – QuizDetail / QuizCreate 예제 📦
### 7-1. 부모 → 자식 : props (QuizDetail)
```js
<!-- QuizView.vue -->
<template>
  <QuizDetail
    v-for="quiz in sortedQuizzes"
    :key="quiz.pk"
    :quiz="quiz"
  />
</template>
```
```js
<!-- QuizDetail.vue -->
<template>
  <div class="quiz-card">
    <h4 class="quiz-question">
      {{ quiz.pk }}번 문제. {{ quiz.question }}
    </h4>
    <p class="quiz-label">정답 입력</p>
    <input
      type="text"
      :id="'quiz-' + quiz.pk"
      class="quiz-input"
    >
  </div>
</template>

<script setup>
const { quiz } = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})
</script>
```
❗ 실수 포인트
- :quiz="quiz"를 안 넘기면 자식에서 quiz가 undefined.
- defineProps는 배열이 아니라 객체로 작성해야 함.
---
### 7-2. 자식 → 부모 : emit (QuizCreate)
```js
<!-- QuizCreate.vue -->
<template>
  <div class="quiz-create-card">
    <h3 class="quiz-create-title">퀴즈 생성</h3>

    <form class="quiz-create-form" @submit.prevent="createQuiz">
      <label class="field-label">문제</label>
      <textarea v-model="question" class="field-textarea"></textarea>

      <label class="field-label">답안</label>
      <input v-model="answer" type="text" class="field-input">

      <button type="submit" class="submit-btn">퀴즈 생성</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const question = ref('')
const answer = ref('')

const emit = defineEmits(['create-quiz'])

const createQuiz = () => {
  const newQuiz = {
    question: question.value,
    answer: answer.value,
  }

  emit('create-quiz', newQuiz) // 부모에게 이벤트 + 데이터 전달

  question.value = ''
  answer.value = ''
}
</script>
```
```js
<!-- QuizView.vue -->
<template>
  <div>
    <QuizCreate @create-quiz="updateQuiz" />
    <QuizDetail
      v-for="quiz in sortedQuizzes"
      :key="quiz.pk"
      :quiz="quiz"
    />
  </div>
</template>
```
---
## 8. computed + 정렬 + pk 관리 🧮
과제 요구:
- 새 퀴즈 추가 시
    - pk = 현재 quizList 마지막 객체의 pk + 1
- 화면에는 pk 내림차순으로 렌더링.

### 8-1. 원본 배열 + computed 정렬

```js
const quizzes = ref([
  { pk: 1, question: '...', answer: '...' },
  { pk: 2, question: '...', answer: '...' },
  // ...
])

// 새 퀴즈 추가 로직
const updateQuiz = (newQuiz) => {
  const lastPk = quizzes.value.length
    ? quizzes.value[quizzes.value.length - 1].pk
    : 0

  const quizWithPk = {
    pk: lastPk + 1,
    ...newQuiz,
  }

  quizzes.value.push(quizWithPk)
}

// 화면에 보여줄 정렬된 리스트 (내림차순)
const sortedQuizzes = computed(() => {
  return [...quizzes.value].sort((a, b) => b.pk - a.pk)
})
```
- quizzes : pk 계산용 원본 데이터
- sortedQuizzes : 화면 표시용 정렬된 복사본
- 이렇게 하면
    - pk 증가 로직은 항상 마지막 요소 기준으로 안전하게 동작
    - 화면은 내림차순으로 깔끔하게 보여짐.

---
## 9. 오늘 헷갈렸던 부분 & 정리 🙇‍♀️
- ❗ `router.push`를 쓰려면 반드시 `useRouter()`로 router 인스턴스 가져와야 한다.
- ❗ `useRoute()`는 현재 위치 정보 읽기, `useRouter()`는 이동.
- ❗ 자식 컴포넌트에서 props 쓸 때:
    - 부모에서 `:quiz="quiz"`처럼 실제 데이터 전달 필수.
    - `defineProps({ quiz: Object })` 처럼 객체 형식으로 정의.
- ❗ `@submit="create-quiz"` ❌ → 함수 이름은 JS 변수명(createQuiz)으로 써야 함.
그리고 새로고침 막을 땐 `@submit.prevent="createQuiz"`.

---
## 10. 한 줄 회고 ✨
- 오늘은 **Vue Router 전체 흐름(views vs components, params, push/replace, 가드)** +
실제 props/emit/컴포넌트 구조를 가진 Quiz 앱까지 만들어 봄.
- 특히 `useRoute` / `useRouter`, `beforeEach` / `beforeEnter` / `onBeforeRouteLeave` 같이
역할이 비슷해서 헷갈리는 애들을 개념 + 코드로 한 번에 정리한 날 💪