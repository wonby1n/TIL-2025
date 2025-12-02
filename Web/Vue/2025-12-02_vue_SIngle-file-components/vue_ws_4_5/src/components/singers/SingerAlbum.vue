<template>
    <div class="album-wrapper">
        <div class="album-box">
            <h1 class="album-title">앨범 제목</h1>
            <p>노래 목록 1</p>
            <p>노래 목록 2</p>
            <p>노래 목록 3</p>
        </div>

        <div class="album-box">
            <h1 class="album-title">앨범 제목</h1>
            <p>노래 목록 1</p>
            <p>노래 목록 2</p>
            <p>노래 목록 3</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.album-wrapper {
  text-align: center;
}
.album-box {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;          
  display: inline-block;    
  width: 130px;           
  margin: 10px;            
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  color:orange;
  
}
.album-title {
    color: #000;
}                      
</style>