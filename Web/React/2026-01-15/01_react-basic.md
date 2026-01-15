## 1️⃣ React 화면은 어떻게 만들어지냐?
### 핵심 개념

React에서는
👉 “컴포넌트(Component)” = 화면 조각 하나

버튼 하나, 카드 하나, 페이지 하나
→ 전부 컴포넌트

가장 기본적인 React 컴포넌트
```jsx
function App() {
  return <h1>안녕 React</h1>;
}
```

이걸 말로 풀면:

- App이라는 함수가 있음
- 이 함수는 화면(h1) 을 반환(return)함

**📌 React 컴포넌트 = 화면을 return하는 함수**

## 2️⃣ JSX? 이게 제일 헷갈리는데 쉽게 말하면

```jsx
return <h1>안녕</h1>;
```

이거 HTML처럼 보이지만 HTML 아님
👉 JS 안에서 쓰는 문법(JSX)

#### 그래서 규칙이 있음

| HTML | React(JSX) |
| --- | --- |
| class | className |
| onclick | onClick |
| style="color:red" | `style={{ color: "red" }}` |

---

## 3️⃣ “변수”를 화면에 보여주고 싶다

```jsx
function App() {
  const name = "대장님";
  return <h1>안녕 {name}</h1>;
}
```

📌 {} 안에는 자바스크립트 코드가 들어감

📌 문자열 연결이 아니라 JS 실행 결과

---

## 4️⃣ 버튼 누르면 화면이 바뀌게 하고 싶다

👉 여기서 state(상태) 가 등장

### ❌ 이렇게 하면 안 됨

```jsx
let count = 0;
count = count + 1; // ❌ 화면 안 바뀜
```

React는
👉 “일반 변수” 바뀐 거 감지 못 함

### ✅ React가 감지하는 변수 = state

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

#### 이 줄이 제일 중요함
```js
const [count, setCount] = useState(0);
```

뜻을 풀면:

- count → 현재 값
- setCount → 값을 바꾸는 전용 함수
- 0 → 초기값

**📌 state가 바뀌면 React가 자동으로 화면 다시 그림**

---

## 5️⃣ input에 글자 치면 화면에 나오게 하기

```jsx
function App() {
  const [text, setText] = useState("");

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>{text}</p>
    </>
  );
}
```

#### 이 구조는 공식처럼 외워도 됨

```jsx
value={state}
onChange={(e) => setState(e.target.value)}
```

📌 React는 input도 state로 관리함

📌 그래서 “제어 컴포넌트”라고 부름 (용어는 몰라도 됨)

---

## 6️⃣ if 문 쓰고 싶다 (조건에 따라 화면 다르게)
### ❌ JSX 안에서 if 바로 못 씀

```jsx
return (
  if (login) { ... } // ❌
)
```

### ✅ 이렇게 씀
#### 방법 1: 삼항 연산자

```jsx
{login ? <Home /> : <Login />}
```

#### 방법 2: && 연산자
```jsx
{login && <Home />}
```

---

## 7️⃣ 여러 개 반복해서 보여주기 (리스트)

```jsx
const items = ["사과", "바나나", "딸기"];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```

📌 `map()` = 배열 하나씩 꺼내서 화면 만들기

📌 key는 React가 구분하려고 필요

---

## 8️⃣ 컴포넌트 쪼개기 (진짜 중요)

```jsx
function Button() {
  return <button>클릭</button>;
}

function App() {
  return <Button />;
}
```

📌 컴포넌트는 태그처럼 사용
📌 대문자로 시작해야 함

---

## 9️⃣ React 초보자들이 100% 헷갈리는 포인트 정리
### 1️⃣ state는 직접 바꾸면 안 됨

```jsx
count++; ❌
setCount(count + 1); ✅
```

### 2️⃣ 화면 바꾸고 싶으면 무조건 state

- 일반 변수 ❌
- state ✅

### 3️⃣ JSX는 JS다
- 반복 → map
- 조건 → 삼항 / &&


---

## 📌 오늘 기준으로 이해해야 하는 최소 목표

✔ 컴포넌트 = 함수

✔ 화면 바꾸려면 state

✔ JSX는 JS

✔ 버튼 / input / map / 조건 렌더링