export default defineNuxtRouteMiddleware((to) => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
        return '/';
    }
});
