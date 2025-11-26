# 2025-11-26 Vue 3 기초 정리 🧩

## 1. 오늘 한 작업

- Vue 3 CDN 환경에서 기본 앱 생성 연습
- `ref`를 사용한 반응형 데이터 정의
- 버튼 클릭 이벤트(`@click`)로 state 변경
- 배열/객체를 `ref`로 다루는 방법
- `prompt`로 입력받은 값으로 state 수정
- lodash(`_.shuffle`)를 사용해 배열 무작위 섞기

---

## 2. Vue 3 기본 패턴 정리

### 1) 앱 생성 & 마운트

```js
const { createApp, ref } = Vue

const app = createApp({
  setup () {
    const title = ref('첫 번째 앱')
    return { title }
  }
})

app.mount('#app')
```

- createApp({ ... }) 로 앱 인스턴스 생성
- setup() 안에서 ref로 반응형 상태 정의
- 마지막에 app.mount('#app') 로 DOM에 연결

### 2) ref 사용 규칙

- 선언 :
```js
const count = ref(0)
const scores = ref([10, 20, 30])
const user = ref({ name: 'Alice', age: 30 })
```
- 템플릿에서는
```html
<p>{{ count }}</p>
<p>{{ scores }}</p>
<p>{{ user.name }}</p>
```
- JS 로직 안에서는 (setup 내부)
```js
count.value++
scores.value[0]
user.value.name = 'Bob'
```

**핵심**
- 템플릿: .value 생략 가능
- JS 코드: .value 필수

---

### 3) 버튼 클릭으로 값 변경 (counter 예제)

```html
<button @click="increment">+</button>
<button @click="decrement">-</button>
```
```js
const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

return {
  count,
  increment,
  decrement,
}
```
- `@click="함수이름"` 으로 이벤트 핸들러 연결
- ref 값을 변경할 때는 항상 xxx.value 사용

---
### 4) 배열 평균 계산 예제

```js
const avgScore = ref(null)
const scores = ref([10, 20, 30, 40, 50])

const cal_average = () => {
  let total = 0

  for (let i = 0; i < scores.value.length; i++) {
    total += scores.value[i]
  }

  avgScore.value = total / scores.value.length
}
```
```html
<p>평균 점수 : {{ avgScore }}</p>
<button @click="cal_average">평균 점수 계산</button>
<p>전체 점수 목록 : {{ scores }}</p>
```
- scores는 배열이지만, ref이기 때문에 JS에서 사용할 때는 scores.value
- 결과는 avgScore.value에 담아서 템플릿에 렌더링

---
### 5) 객체 + prompt 로 값 수정 (User Profile 예제)

```js
const user = ref({
  name: 'Alice',
  age: 30,
})

const changeName = () => {
  const inputValue = prompt('Enter new name:', user.value.name)
  if (inputValue !== null && inputValue !== '') {
    user.value.name = inputValue
  }
}

const changeAge = () => {
  const inputValue = prompt('Enter new age:', user.value.age)
  if (inputValue !== null && inputValue !== '') {
    const parsed = Number(inputValue)
    if (!Number.isNaN(parsed)) {
      user.value.age = parsed
    }
  }
}
```
```html
<p>Name: {{ user.name }}</p>
<p>Age: {{ user.age }}</p>
<button @click="changeName">Change Name</button>
<button @click="changeAge">Change Age</button>
```
- 객체도 ref({ ... })로 감싸서 사용
- 템플릿에서는 user.name, JS에서는 user.value.name
- prompt로 받은 값은 반응형 상태에 다시 대입해야 화면이 변경됨

### 6) lodash로 배열 섞기 (발표 순서 예제)
```js
const students = ref(['홍길동', '이춘향', '금나래', '장보고', '임꺽정', '강감찬'])

const shuffle = () => {
  students.value = _.shuffle(students.value)
}
```
```html
<p>전체 학생 목록 : {{ students }}</p>
<button @click="shuffle">섞기</button>
<p>1st : {{ students[0] }}</p>
<p>2nd : {{ students[1] }}</p>
<p>3th : {{ students[2] }}</p>
<p>last : {{ students[students.length - 1] }}</p>
```
- `_.shuffle(배열)` → 섞인 새 배열을 반환
- 그 값을 다시 `students.value`에 할당해야 반응형으로 동작

---
## 3. 오늘 헷갈렸던 부분 & 정리 포인트

- ref로 만든 값은 JS에서 **무조건 `.value**`로 접근해야 한다.
- 함수 매개변수 이름을 `scores`, `count`처럼 ref 이름이랑 똑같이 쓰면 헷갈리므로 지양.
- 템플릿에서는 `{{ user.name }}`, `{{ scores[0] }}` 처럼 사용해도 Vue가 자동으로 .value를 풀어준다.
- 에러 포인트:
  - ret 오타 (ref가 아니라 ret로 써서 앱이 아예 안 돌아갔던 부분)

---
## 4. 내일(또는 다음에) 보완할 것
- computed로 평균 점수 자동 계산 버전 만들어 보기
- `v-for`를 사용해서 학생 목록을 <ul><li>로 렌더링해 보기
- ref vs reactive 차이 정리