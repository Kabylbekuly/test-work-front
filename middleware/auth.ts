export default defineNuxtRouteMiddleware((to) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return '/auth/login';
    }
});
