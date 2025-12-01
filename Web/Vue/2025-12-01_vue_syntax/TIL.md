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
