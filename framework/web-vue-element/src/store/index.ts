import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    userName: '',
  }),
  actions: {
    setUser(user: UserInfo) {
      this.userId = user.id
      this.userName = user.name + '-store'
    },
  },
})
