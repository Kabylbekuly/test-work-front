export default defineNuxtRouteMiddleware((to) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
        if (role === 'admin') {
            return '/admin';
        } else if (role === 'partner') {
            return '/cabinet'
        } else if (role === 'user') {
            return '/personal-cabinet'
        }
        return '/'
    }
});
