# 🌱 Vue3 TIL – 조건 렌더링 & 반응형 고급 개념 정리

> 오늘 배운 내용: `v-if`, `v-show`, `v-for`, `v-model`, `:class`, `computed`, `watch` 🧠  
> 예제 주제: **전시 정보 리스트**, **Todo 앱**, **글꼴 테스트기** 등

---

## 1. Vue3 기본 패턴 복습 ✅

### 1-1. CDN + 기본 구조

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  {{ message }}
</div>

<script>
  const { createApp, ref } = Vue

  const app = createApp({
    setup () {
      const message = ref('Hello Vue 3 👋')

      return { message }
    }
  })

  app.mount('#app')
</script>
```
- `createApp({ setup() { ... } })` 안에서 `ref()`로 반응형 상태 생성
- return 한 값들이 템플릿(`{{ }}`, `v-model`, `v-if` 등)에서 사용 가능

---
## 2. 조건부 렌더링 – v-if, v-else-if, v-else 🔍
### 2-1. 개념
- `v-if`: 조건이 true일 때만 DOM 자체를 생성
- `v-else-if`, `v-else`: `if-else` 문과 동일한 흐름으로 사용
- 조건이 false면 DOM이 아예 존재하지 않음
### 2-2. 예시 – 로그인 여부에 따라 정보 보이기
```html
<div id="app">
  <h1>조건문 연습하기</h1>

  <button @click="toggleLogin">
    {{ isLogin ? 'Logout' : 'Login' }}
  </button>

  <ul v-if="isLogin">
    <li v-for="user in users" :key="user.userName">
      <p>유저네임 : {{ user.userName }}</p>
      <p>관리자여부 : {{ user.isAdmin }}</p>
      <p>비밀번호 : {{ user.passWord }}</p>
    </li>
  </ul>

  <p v-else>로그인이 필요합니다.</p>
</div>

<script>
const { createApp, ref } = Vue

const app = createApp({
  setup () {
    const isLogin = ref(false)
    const users = ref([
      { userName: 'admin', isAdmin: true, passWord: '1q2w3e4r' }
    ])

    const toggleLogin = () => {
      isLogin.value = !isLogin.value
    }

    return { isLogin, users, toggleLogin }
  }
})

app.mount('#app')
</script>
```
---
## 3. v-show vs v-if 비교 👀

### 3-1. 공통점

- 둘 다 “보여줄지 말지”를 제어하는 디렉티브
- 템플릿 문법: `v-if="조건"`, `v-show="조건"`

### 3-2. 차이점
| 항목     | `v-if`                 | `v-show`                    |
| ------ | ---------------------- | --------------------------- |
| 렌더 방식  | DOM 생성/제거              | DOM은 유지, `display: none` 처리 |
| 초기 비용  | 조건에 따라 DOM 생성 안 할 수 있음 | 항상 DOM 생성함                  |
| 토글 비용  | 무거움(생성/제거 반복)          | 가벼움(스타일만 토글)                |
| 언제 사용? | 가끔 보였다/안 보였다 할 때       | 자주 토글할 때                    |

### 3-3. 예시 – 선택된 전시 요약 정보
```html
<div v-show="selectedInfos.length >= 1">
  <h3>관람 예정인 전시 : {{ selectedInfos.join(', ') }}</h3>
  <p>예상 총 금액 : {{ totalPrice }}</p>
</div>

<h3 v-show="selectedInfos.length === 0">
  관람 예정인 전시가 없습니다.
</h3>
```
---
## 4. 리스트 & 양방향 바인딩 – `v-for` + `v-model` 📝
### 4-1. 리스트 렌더링 – `v-for`
```html
<ul>
  <li v-for="show in shows" :key="show.title">
    <h3>{{ show.title }}</h3>
    <p>{{ show.at }}</p>
    <p>가격 : {{ show.price }}</p>
  </li>
</ul>
```
- `v-for="item in items"` 형태로 사용
- 반드시 :key 지정하는 습관 들이기 (title, id 등)
## 4-2. `v-model` – 양방향 바인딩
### 글꼴 테스트기 예제 요약 🎨

```html
<li v-for="font in fonts" :key="font.style">
  <label :for="font.style">{{ font.style }} 테스트</label>
  <input type="text" :id="font.style" v-model="font.text">

  <div v-if="font.text" :style="{ fontFamily: font.style }">
    {{ font.text }}
  </div>
</li>
```
```js
const fonts = ref([
  { style: '바탕',      text: null },
  { style: '휴먼엽서체', text: null },
  { style: '궁서체',    text: null },
])
```
- 각 객체의 text가 input과 v-model로 연결 → 입력값이 바로 반영됨
- `v-if="font.text"` : 입력이 있을 때만 미리보기 텍스트 노출
---
## 5. 조건부 클래스 바인딩 – `:class` 🎨
### 5-1. 가격에 따라 배경색 바꾸기
```html
<li
  v-for="show in shows"
  :key="show.title"
  :class="{
    cheap: show.price <= 5000,
    expensive: show.price >= 20000
  }"
>
  <h3>{{ show.title }}</h3>
  <p>{{ show.at }}</p>
  <p>가격 : {{ show.price }}</p>
  <p v-if="show.price === 0">무료 전시입니다.</p>
</li>
```
```cs
.cheap {
  background-color: #e1f7e1;
}
.expensive {
  background-color: #f7e1e1;
}
```
- 객체 문법: `:class="{ 클래스이름: 조건 }"`
- 조건이 true인 클래스만 실제로 적용됨
---
## 6. computed – 계산된 값 🧮
### 6-1. 개념
- 기존 상태를 이용해서 “파생 값”을 만들 때 사용하는 속성
- 종속된 값이 바뀔 때만 자동으로 다시 계산
- 여러 번 사용해도 캐싱되어 불필요한 재계산 방지
### 6-2. 예시 – Todo 필터링
```html
<select v-model="status">
  <option value="all">전체</option>
  <option value="completed">완료</option>
  <option value="incompleted">미완료</option>
</select>

<ul>
  <li v-for="todo in filteredTodos" :key="todo.id">
    <input type="checkbox" v-model="todo.isCompleted">
    <span :class="{ 'is-completed': todo.isCompleted }">{{ todo.text }}</span>
  </li>
</ul>
```
```js
const { createApp, ref, computed } = Vue

const app = createApp({
  setup () {
    const todos = ref([])
    const status = ref('all')

    const filteredTodos = computed(() => {
      if (status.value === 'all') {
        return todos.value
      } else if (status.value === 'completed') {
        return todos.value.filter(todo => todo.isCompleted)
      } else if (status.value === 'incompleted') {
        return todos.value.filter(todo => !todo.isCompleted)
      }
    })

    return { todos, status, filteredTodos }
  }
})
```
## 7. watch – 값 변화 감시 👁️
### 7-1. 개념

- 특정 반응형 상태(ref, reactive 등) 의 변화를 “지켜보다가”
- 값이 바뀔 때마다 콜백 함수 실행
- “파생 값” 계산에도 쓸 수 있지만,
부수효과(로그, API 호출, 통계 업데이트 등) 에 쓰는 것이 일반적

### 7-2. 예시 – Todo 완료 개수 세기
```js
const todos = ref([])
const completedCount = ref(0)

watch(
  todos,
  (newTodos) => {
    const newCompTodos = newTodos.filter(todo => todo.isCompleted)
    completedCount.value = newCompTodos.length
  },
  { deep: true }   // 내부 속성(todo.isCompleted) 변경까지 감지
)
```
### 7-3. 예시 – 선택한 전시 제목 & 총 금액 계산 💸
```js
const shows = ref([
  // { title, at, price, isActive, isSelected }
])

const selectedInfos = ref([])   // 선택된 전시 제목 리스트
const totalPrice = ref(0)       // 선택된 전시 가격 합

watch(
  shows,
  (newShows) => {
    const filteredInfos = newShows.filter(show => show.isSelected)

    selectedInfos.value = filteredInfos.map(show => show.title)

    totalPrice.value = filteredInfos.reduce(
      (sum, show) => sum + show.price,
      0
    )
  },
  { deep: true }
)
```
템플릿:
```html
<div v-show="selectedInfos.length >= 1">
  <h3>관람 예정인 전시 : {{ selectedInfos.join(', ') }}</h3>
  <p>예상 총 금액 : {{ totalPrice }}</p>
</div>
<h3 v-show="selectedInfos.length === 0">
  관람 예정인 전시가 없습니다.
</h3>
```
---
## 8. 오늘 헷갈렸던 포인트 & 정리 메모 🧷

- v-if + v-for 같이 쓸 때는 → v-for는 `<template>` 에, v-if는 내부 요소에 쓰는 패턴도 존재

- :class에서 . 찍지 않기
    - `'.expensive'` ❌ → `'expensive'` ✅

- ref 값 접근: 항상 `.value`
    - `isLogin = !isLogin` ❌ → `isLogin.value = !isLogin.value` ✅

- `watch` 옵션 `deep: true` 는
    - 배열/객체의 내부 속성 변경도 감시할 때 필수

- `computed` vs `watch`
    - 화면에 보여줄 파생 데이터 → `computed`
    - 콘솔로그, 통계, API 콜, 외부 영향 → `watch`

---
## 9. 마무리 ✨

오늘 정리 키워드:
- 조건 렌더링: v-if, v-else-if, v-else, v-show
- 리스트 & 입력: v-for, v-model, :key
- 스타일: :class 객체 문법
- 반응형 계산: computed
- 값 변화 감시: watch + deep: true