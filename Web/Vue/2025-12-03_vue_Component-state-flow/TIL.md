# 2025-12-03 TIL – Vue Props & Emit 지옥 탈출기 😇🔥

오늘 한 줄 요약  
> **부모 → 자식은 props, 자식 → 부모는 emit**  
> 이 흐름을 `쇼핑 장바구니`, `명함 관리` 예제로 연습했다.

---

## 1. 부모 → 자식 : `props` 정리 🧒➡️👨

### 1-1. 기본 패턴

```vue
<!-- Parent.vue -->
<ChildComponent
  :my-msg="msg"
  :products="products"
  :card="card"
/>
```
```js
// ChildComponent.vue
const props = defineProps({
  myMsg: String,
  products: Array,
  card: Object,
})
```
- template 쪽: `my-msg`, `new-card` 같은 **kebab-case**
- script 쪽: `myMsg`, `newCard` 같은 **camelCase**
- props는 Vue가 자동으로 매핑해 줘서 둘 다 가능
→ 그래서 템플릿에서 케밥, 스크립트에서 카멜을 많이 사용함 👍
---
## 2. 자식 → 부모 : emit 정리 👨‍👧‍👦⬅️👶
### 2-1. emit 기본 흐름
1. 자식에서 `defineEmits`로 이벤트 이름 선언
2. 자식에서 `emit('이벤트이름', 데이터)`로 신호 쏨
3. 부모 템플릿에서 `@이벤트이름="핸들러"`로 받음
4. 부모에서 핸들러 함수 실행
```js
<!-- Child.vue -->
<template>
  <button @click="clicked">+1</button>
</template>

<script setup>
const emit = defineEmits(['add-count'])

const clicked = () => {
  emit('add-count')          // 부모에게 "add-count" 이벤트 발생
}
</script>
```
```js
<!-- Parent.vue -->
<template>
  <div>
    <p>count: {{ count }}</p>
    <Child @add-count="increase" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
const increase = () => {
  count.value++
}
</script>
```
## 2-2. emit 이름 관련해서 오늘 기억할 것 🧠
- 이벤트 이름은 문자열 그대로 일치해야 한다
    - `defineEmits(['add-count'])`
    - `emit('add-count', data)`
    - `<Child @add-count="handler" />`
- props와 달리, 이벤트 이름은 **자동 케밥/카멜 변환을 기대하지 않는 쪽이 안전**
→ 오늘은 연습할 때 한 이름을 정하면 세 군데 모두 똑같이 쓰는 습관 연습함

---
## 3. 쇼핑 장바구니 예제 🛒
### 3-1. 구조
- `App.vue`
    - products 배열 관리
    - cart 배열 관리
    - totalPrice(computed)로 총 금액 계산
- `ProductList.vue`
    - products를 props로 받고 `v-for`로 ProductListItem 렌더링
- `ProductListItem.vue`
    - 상품 1개 표시 + "장바구니에 추가" 버튼
    - 버튼 클릭 시 `emit('add-cart', product)`
- `Cart.vue`
    - cart 배열을 props로 받고, 장바구니 목록 렌더링
    - "삭제" 버튼 클릭 시 `emit('remove-item', item)`

### 3-2. 핵심 코드

#### App.vue
```js
<template>
  <div>
    <h1>쇼핑 애플리케이션</h1>
    <ProductList
      :products="products"
      @add-cart="addCart"
    />
    <p>총 가격 : {{ totalPrice }}원</p>

    <Cart
      :cart="cart"
      @remove-item="removeItem"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductList from '@/components/ProductList.vue'
import Cart from './components/Cart.vue'

let id = 0
const products = ref([
  { id: id++, name: '사과',   price: 1000 },
  { id: id++, name: '바나나', price: 1500 },
  { id: id++, name: '딸기',   price: 2000 },
  { id: id++, name: '포도',   price: 3000 },
  { id: id++, name: '복숭아', price: 2000 },
  { id: id++, name: '수박',   price: 5000 },
])

const cart = ref([])

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0)
)

const addCart = (product) => {
  cart.value.push(product)
}

const removeItem = (item) => {
  const idx = cart.value.findIndex(p => p.id === item.id)
  if (idx !== -1) cart.value.splice(idx, 1)
}
</script>
```
#### ProductList.vue
```js
<template>
  <ul>
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-cart="addCart"
    />
  </ul>
</template>

<script setup>
import ProductListItem from '@/components/ProductListItem.vue'

const props = defineProps({
  products: Array,
})

const emit = defineEmits(['add-cart'])

const addCart = (product) => {
  emit('add-cart', product)
}
</script>
```
#### ProductListItem.vue
```js
<template>
  <li>
    {{ product.name }} - {{ product.price }}원
    <button @click="addCart">장바구니에 추가</button>
  </li>
</template>

<script setup>
const props = defineProps({
  product: Object,
})

const emit = defineEmits(['add-cart'])

const addCart = () => {
  emit('add-cart', props.product)
}
</script>
```
👉 이 예제로 자식 → 부모 → 상위 상태(cart) 업데이트 흐름을 연습했다.
---
## 4. 명함 관리 예제 ① – 삭제 기능 🪪❌
### 4-1. 구조
- `BusinessCard.vue`
    - businessCards 배열 관리
    - 삭제 함수 deleteCard 보유
- `BusinessCardDetail.vue`
    - 명함 1개 정보 표시
    - "명함 삭제" 버튼 클릭 시 `emit('delete-card-event', card)`

### 4-2. 핵심 코드
#### BusinessCard.vue
```js
<template>
  <div class="card-container">
    <h2>보유 명함 목록</h2>
    <template v-if="hasCard">
      <p>현재 보유중인 명함 수 : {{ cardCount }}</p>
      <BusinessCardDetail
        v-for="card in businessCards"
        :key="card.name"
        :card="card"
        @delete-card-event="deleteCard"
      />
    </template>
    <p v-else>명함이 없습니다. 새로운 명함을 추가해주세요.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BusinessCardDetail from './BusinessCardDetail.vue'

const businessCards = ref([
  {name : '일론 머스크',  title:'테슬라 테크노킹'},
  {name : '래리 엘리슨',  title:'오라클 창업주'},
  {name : '빌 게이츠',    title:'마이크로소프트 공동창업주'},
  {name : '래리 페이지',   title:'구글 공동창업주'},
  {name : '세르게이 브린', title:'구글 공동창업주'},
])

const cardCount = computed(() => businessCards.value.length)
const hasCard   = computed(() => cardCount.value > 0)

const deleteCard = (targetCard) => {
  const idx = businessCards.value.findIndex(c =>
    c.name === targetCard.name && c.title === targetCard.title
  )
  if (idx !== -1) {
    businessCards.value.splice(idx, 1)
  }
}
</script>
```
#### BusinessCardDetail.vue
```js
<template>
  <article class="card">
    <h3>이름 : {{ card.name }}</h3>
    <p>직함 : {{ card.title }}</p>
    <button @click="deleteCardFunc(card)">명함 삭제</button>
  </article>
</template>

<script setup>
const props = defineProps({
  card: Object,
})

const emit = defineEmits(['delete-card-event'])

const deleteCardFunc = (card) => {
  emit('delete-card-event', card)
}
</script>
```
👉 여기서 이벤트 이름을 세 군데 모두 동일하게 맞추는 것이 중요했다.
(오타나 deleteCardEvent vs delete-card-event 때문에 많이 헷갈렸음 😭)

---
## 5. 명함 관리 예제 ② – 추가 기능 (CreateCardForm + watch) 📝➕
### 5-1. 전체 흐름
1. `CreateCardForm`
    - 이름, 직함 입력 후 submit → `emit('create-card-event', cardInfo)`
2. `App.vue`
    - `@create-card-event="updateCard"`
    - updateCard(cardInfo)에서 `newCard.value = cardInfo`
    - `<BusinessCard :new-card="newCard" />`
3. `BusinessCard`
    - `props.newCard`를 `watch`
    - 값이 들어오면 `businessCards.value.push(newCard)`

### 5-2. CreateCardForm.vue
```js
<template>
  <div>
    <form @submit.prevent="createCardFunc">
      <p>이름 :</p>
      <input type="text" v-model="name">

      <p>직함 :</p>
      <input type="text" v-model="title">

      <button type="submit">명함 추가</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name  = ref('')
const title = ref('')

const emit = defineEmits(['create-card-event'])

const createCardFunc = () => {
  const cardInfo = {
    name: name.value,
    title: title.value,
  }

  emit('create-card-event', cardInfo)

  name.value  = ''
  title.value = ''
}
</script>
```
### 5-3. App.vue (newCard 관리)
```js
<template>
  <div class="page">
    <header class="header">
      <h1>명함 관리 페이지</h1>
    </header>

    <main class="main">
      <article class="description">
        <p>명함을 관리하는 페이지입니다. 여기에 명함 목록이 표시됩니다.</p>

        <CreateCardForm @create-card-event="updateCard" />
        <BusinessCard :new-card="newCard" />
      </article>
    </main>

    <footer class="footer">
      © 2023 My Business Cards
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BusinessCard from './components/BusinessCard.vue'
import CreateCardForm from './components/CreateCardForm.vue'

const newCard = ref(null)

const updateCard = (cardInfo) => {
  newCard.value = cardInfo
}
</script>
```
### 5-4. BusinessCard.vue – watch로 배열에 push
```js
<script setup>
import { ref, computed, watch } from 'vue'
import BusinessCardDetail from './BusinessCardDetail.vue'

const props = defineProps({
  newCard: Object,
})

const businessCards = ref([
  // 초기 명함 목록...
])

const cardCount = computed(() => businessCards.value.length)
const hasCard   = computed(() => cardCount.value > 0)

watch(
  () => props.newCard,
  (card) => {
    if (card) {
      businessCards.value.push(card)
    }
  }
)
</script>
```
---
## 6. 오늘 emit에서 헷갈렸던 포인트들 😵‍💫
1. **이벤트 이름 통일 문제**
    - `deleteCardEvent` vs `delete-card-event`
    - `createCardEvent` vs `create-card-event`
    - 결론: **한 이름 정하면 세 군데 모두 그대로 쓰기**

2. **props vs emit 이름 차이**
    - props: template 케밥 / script 카멜 → Vue가 매핑
    - emit: 자동 변환 기대하지 말고 그냥 **문자열 그대로 맞추는 습관 들이기**
    - **v-for 안에서 인자 넘기기**
    - 잘못된 예: `@click="updateBalance"`
    - 올바른 예: `@click="updateBalance(child)"`

3. **타입 지정**
    - `card: Array` ❌
    - 실제 데이터는 `{ name, title }` → `card: Object` ✅

---
## 7. 내일/다음에 다시 볼 때 체크할 것 ✅

- 자식 → 부모 흐름을 **짧게 말로 설명해 보기**
    - “자식에서 버튼 클릭 → emit → 부모에서 @로 받음 → 함수 실행해서 state 변경”
- 이벤트 하나 정해서,
    - `defineEmits`, `emit`, `@이벤트` 세 군데에 **같은 이름 쓰는 연습**
- 명함/장바구니 예제를 한 번 더 혼자 손으로 쳐보기
    - 특히 `CreateCardForm + watch` 부분 다시 써보기

emit은 오늘처럼 몇 번만 더 만져보면
👿 지옥에서 😇 익숙함으로 바뀔 거라 믿는다…

수고 많았다! 🧠💪