import { defineStore } from 'pinia'

interface User {
  userId: number
  userName: string
}

export const useUseStore = defineStore('user', {
  state: () => ({
    userId: 0,
    userName: '',
  }),
  actions: {
    setUser(user: User) {
      this.userId = user.userId
      this.userName = user.userName + '-store'
    },
  },
})
