# 📘 Vue & Django REST Framework 연동 TIL

> Vue(Frontend) ↔ DRF(Backend) API 연결 기본기 정리

## 🧩 1. 프로젝트 연결을 위해 필요한 핵심 개념

Vue는 **웹 프론트엔드(브라우저)**
Django REST Framework(DRF)는 **백엔드 API 서버**

둘이 다른 도메인에서 실행되기 때문에 데이터를 주고받으려면

**➡️ CORS 설정**

**➡️ axios 요청**

**➡️ REST API URL 구성**

이 필수로 들어간다.

---

## 🎯 2. Django(DRF)에서 필요한 설치 & 설정
### 📦 2-1. 필요한 모듈 설치

```bash
pip install djangorestframework
pip install django-cors-headers
```

### ⚙️ 2-2. settings.py 설정
#### ➕ INSTALLED_APPS 추가

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
]
```
#### 🔧 MIDDLEWARE 설정

**순서 매우 중요!**

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # ← 꼭 위쪽에!
    'django.middleware.common.CommonMiddleware',
    ...
]
```

#### 🌐 CORS 허용 설정

Vue가 5173 포트에서 돌기 때문에 반드시 허용해야 함.

```python
CORS_ALLOW_ALL_ORIGINS = True
```

➡️ 모든 외부 요청을 허용
➡️ 학습 / 테스트 단계에서는 이게 가장 간단함

---

### 🛣️ 2-3. DRF URL 샘플 구조

#### config/urls.py
```python
urlpatterns = [
    path('api/v1/', include('articles.urls')),
]
```

#### articles/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list),
]
```

---

### 📝 2-4. DRF 기본 View 함수 (GET 예시)

```python
@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostListSerializer(posts, many=True)
    return Response(serializer.data)
```
---

## 🌐 3. Vue에서 필요한 준비
### 📦 3-1. axios 설치

```bash
npm install axios
```

또는
``` bash
npm i axios
```

---

### 💾 3-2. Pinia store에서 axios 스켈레톤 코드

#### 아래는 GET 요청 기본 구조 ⬇️

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])

  const BASE_URL = 'http://127.0.0.1:8000/api/v1'

  const getPosts = function () {
    axios({
      method: 'get',
      url: `${BASE_URL}/posts/`,
    })
      .then(res => {
        console.log(res.data)
        posts.value = res.data
      })
      .catch(err => {
        console.error(err)
      })
  }

  return { posts, getPosts }
})
```
---

### 📝 3-3. POST 요청 스켈레톤 (데이터 작성 시)

```js
const createPost = function (payload) {
  axios({
    method: 'post',
    url: `${BASE_URL}/posts/`,
    data: payload,
  })
    .then(res => {
      console.log('생성 완료:', res.data)
      posts.value.push(res.data)
    })
    .catch(err => {
      console.error(err)
    })
}
```
---

## 🧪 4. Vue 컴포넌트에서 사용하기

```html
<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/posts'

const store = usePostStore()

onMounted(() => {
  store.getPosts()
})
</script>

<template>
  <div>
    <h1>게시글 목록</h1>

    <div v-for="post in store.posts" :key="post.pk || post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
```

---

## 🧯 5. 자주 발생하는 문제 & 해결

### ❌ 1) CORS 에러

`Access-Control-Allow-Origin` 오류

> 👉 백엔드 CORS 설정이 빠짐

> ➡️ CORS_ALLOW_ALL_ORIGINS = True 넣고 서버 재시작

### ❌ 2) axios 요청 404 / 500

> 👉 URL 끝에 / 빠짐

> DRF의 기본 라우팅은 반드시 / 필요:

> /posts/  ← 정답
 /posts   ← ❌ 에러

### ❌ 3) Vue에서 값이 안 보임

> 👉 DRF가 id가 아니라 pk로 보냄
> ➡️ article.pk || article.id 로 대응 가능

---

## 🎉 마무리

이걸 이해하면:

- Vue에서 axios로 DRF API를 호출하고
- Django에서 JSON 응답을 보내고
- CORS를 통과해서
- Vue 화면에 렌더링되는 전체 흐름을 완전히 이해한 거야!