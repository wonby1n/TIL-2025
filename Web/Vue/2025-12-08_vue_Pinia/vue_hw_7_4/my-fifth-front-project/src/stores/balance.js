import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    balances: [
      { name: '김하나', balance: 100000 },
      { name: '김두리', balance: 100000 },
      { name: '김서이', balance: 100000 },
    ],
  }),

  getters: {
    getBalanceByName: (state) => {
      return (name) => state.balances.find((item) => item.name === name)
    },
  },

  actions: {
    increaseBalance(name) {
      const target = this.getBalanceByName(name)
      if (!target) return
      target.balance += 1000
    }
  }
})
