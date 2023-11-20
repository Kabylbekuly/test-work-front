import {defineStore} from "pinia";
import {useStorage} from '@vueuse/core'


export const authStore = defineStore("auth", {
    state: () => ({
        token: useStorage('token', ''),
        user: useStorage('user', ''),
        role: useStorage('role', ''),

    }),
    getters: {
        getCount: (state) => state.count,
    },
    actions: {
        async setToken(data: string) {
            this.token = data
            localStorage.setItem('token', data);
        },
        async setUser(data: any) {
            this.user = JSON.stringify(data.user)
            this.role = data.role
            localStorage.setItem('user', data.user);
            localStorage.setItem('role', data.role);
        },
        async logout(data: any) {
            localStorage.clear();
            this.token = '';
            this.user = '';
            this.role = '';
        }

    },
});
