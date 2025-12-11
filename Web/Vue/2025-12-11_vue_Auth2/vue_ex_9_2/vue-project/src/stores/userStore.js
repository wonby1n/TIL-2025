import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('user', () => {
  const BASE_URL = 'http://localhost:8000/accounts'
  // 토큰을 보고 사용자가 누구인지 식별
  const token = ref('')

  const logIn = (userdata) => {
    axios({
        url: `${BASE_URL}/login/`,
        method: 'POST',
        data: {
            username: userdata.username,
            password: userdata.password
        }
    }).then(response => {
        console.log(response);
        token.value = response.data.key;
    }).catch(error => {
        console.log(error);
    });
    }

    const signUp = (userdata) => {
        axios({
            url: `${BASE_URL}/signup/`,
            method: 'POST',
            data: {
                username: userdata.username,
                password1: userdata.password1,
                password2: userdata.password2,
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        }

  return { logIn, signUp, token, BASE_URL
  }
}, { persist: true })
