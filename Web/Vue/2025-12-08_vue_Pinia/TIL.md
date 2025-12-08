# 📌 TIL – Pinia 기초 학습 (상태관리, getters, actions, persist)
## 1. Pinia란 무엇인가?

Pinia는 Vue 3 공식 상태관리 라이브러리로, 컴포넌트 간 데이터를 공유하고 관리하는 역할을 한다.
기존 Vuex보다 문법이 단순하고, TypeScript 친화적이며, Composition API와도 잘 어울린다.

Pinia가 해결하는 문제는 다음과 같다:

- 여러 컴포넌트에서 같은 데이터를 사용할 때 상태 중복을 방지
- 데이터 변경 로직을 한 곳에서 관리하여 예측 가능한 구조 유지
- 컴포넌트 간의 복잡한 props 전달/emit 구조를 단순화

요약하면:

> **Pinia = Vue 앱의 전역 데이터 저장소(Global Store)** 
-  “데이터는 한 곳에서 관리하고, 필요한 컴포넌트들이 가져다 쓴다.”

## 2. Pinia 기본 구조

Pinia 스토어는 크게 3가지로 구성된다.

### 🔹 1) state

- 실제 데이터가 담기는 공간
- 배열, 객체 등 모든 전역 데이터가 포함됨

### 🔹 2) getters

- state를 가공하거나 계산된 값을 리턴하는 역할
- Vue의 computed와 유사
- “읽기 전용” 성격을 가짐

### 🔹 3) actions
- state를 변경하는 함수
- 비즈니스 로직을 수행하는 공간
- API 호출 등의 비동기 로직도 가능

📌 **원칙:**
> “직접 state를 변경하는 행위는 actions에서만 수행한다.”

## 3. 옵션 스타일(Store Option Syntax) 스켈레톤 코드

```js
// stores/example.js
import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', {
  // 🔸 state: 전역 데이터
  state: () => ({
    items: [],
    count: 0,
  }),

  // 🔸 getters: 계산된 값 반환
  getters: {
    itemCount: (state) => state.items.length,
  },

  // 🔸 actions: state 변경 로직
  actions: {
    addItem(item) {
      this.items.push(item)
    },
    increment() {
      this.count++
    },
  },

  // 🔸 (선택) persistedstate 사용 시
  persist: true,
})
```
## 4. Setup 스타일 스켈레톤 코드
```js
// stores/example.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  const items = ref([])
  const count = ref(0)

  const itemCount = computed(() => items.value.length)

  const addItem = (item) => items.value.push(item)
  const increment = () => { count.value++ }

  return { items, count, itemCount, addItem, increment }
})
```

📌 두 방식 모두 기능은 동일하지만

- 옵션 스타일은 역할이 명확하게 드러나고
- setup 스타일은 Composition API 문법과 자연스럽게 연결됨

## 5. Pinia에서 getters에 인자 넘기는 패턴


Pinia getters는 computed 성격이라 **함수를 반환하는 형태**로 작성한다.

```js
getUserByName: (state) => {
  return (name) => state.users.find(user => user.name === name)
}
```

호출할 때:

`store.getUserByName('김하나')`


이 패턴은 “조건에 따라 특정 데이터를 찾는 로직”이 여러 컴포넌트에서 반복될 때 유용하다.

## 6. Actions에서 Getters 사용하기


actions에서 getter를 재사용할 수 있다:
```js
actions: {
  increaseBalance(name) {
    const target = this.getUserByName(name)
    if (target) target.balance += 1000
  }
}
```
## 7. Persisted State (pinia-plugin-persistedstate)

이 플러그인을 사용하면 **store의 state를 localStorage**에 자동 저장해서, 새로고침해도 데이터가 유지된다.

### 사용 설정

- main.js:

```js
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

- store에서 활성화:

`persist: true`


- 또는 특정 필드만 저장:

```js
persist: {
  enabled: true,
  strategies: [
    { key: 'example', storage: localStorage, paths: ['items'] }
  ]
}
```
## 8. 오늘 배운 핵심 흐름 요약

Pinia는 전역 상태 관리 도구로 Vue 3에서 필수적이다.

- `state` / `getters` / `actions` 역할 분리를 통해 큰 앱에서도 구조가 깨지지 않는다.

- `getters`에 인자를 넘기는 패턴은 처음엔 낯설지만 “조건별 데이터 조회”에 매우 유용하다.

- 찜 기능(favorite), 삭제, 수정 같은 로직은 `actions`에서만 변경 작업을 처리해야 한다.

- `persistedstate`를 사용하면 서비스가 훨씬 현실적(=상태 유지)으로 변한다.

## 9. 오늘 느낀 점 ✍️

처음에는 `getters`와 `actions`의 구분이 복잡하게 느껴졌지만,
읽기 전용(getters)과 변경(actions)의 분리가 유지보수에 중요하다는 것을 이해하게 됨.

`setup` 스타일이 더 직관적이지만, 옵션 스타일이 개념을 구조적으로 이해하는 데 도움을 준다는 점도 배웠음.

`persistedstate` 덕분에 "상태 유지" 기능이 간단하게 구현되는 것이 인상적이었음.

전체적으로 Pinia는 Vue 앱에서 데이터를 체계적으로 다루기 위한 핵심 도구임을 체감함.