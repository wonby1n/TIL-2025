# Axios 비동기 요청 + Django 연동

## 오늘 배운 것

- JavaScript에서 Django 서버로 HTTP 요청을 보낼 때 **axios** 사용
- 기존 동기적인 흐름처럼 보이지만, 실제로는 `async/await`로 비동기 처리
- 화면이 멈추지 않고, 요청이 끝난 뒤에만 결과를 표시할 수 있다

## 코드 포인트

- `btn.addEventListener('click', async function () { ... })`
- `await axios({ method: 'get', url: 'http://localhost:8000/api/test/' })`
- 응답 데이터는 `response.data`로 접근

## 느낀 점

- 비동기 코드를 `async/await`로 쓰면 동기 코드처럼 읽혀서 덜 헷갈린다.
- 나중에 Django REST API랑도 연결해서 더 복잡한 데이터도 받아보고 싶다.