import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore(
  "user",
  () => {
    const BASE_URL = "http://localhost:8000/accounts";
    const token = ref("");

    const isLogin = computed(() => {
      if (token.value) {
        return true;
      } else {
        return false;
      }
    });

    const signUp = (payload) => {
      axios({
        url: `${BASE_URL}/signup/`,
        method: "POST",
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const logIn = (payload) => {
      axios({
        url: `${BASE_URL}/login/`,
        method: "POST",
        data: {
          username: payload.username,
          password: payload.password,
        },
      })
        .then((response) => {
          console.log(response);
          token.value = response.data.key;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const logOut = function () {
      axios({
        method: "post",
        url: `${BASE_URL}/logout/`,
      }).then((response) => {
        window.alert("로그아웃 되었습니다!");
        // 사용자 인증 정보 제거
        token.value = null;
        router.push({ name: "LogInView" });
      });
    };

    return {
      BASE_URL,
      token,
      isLogin,
      signUp,
      logIn,
      logOut,
    };
  },
  { persist: true }
);
