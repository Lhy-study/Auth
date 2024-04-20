/** 公共的路由，不需要身份验证 */
export const publicRoutes = [
    '/',
]

/** 用于身份验证的路由 这些路由将会被重定向*/
export const authRoutes = [
    '/auth/login',
    '/auth/register',
]   

/** 带有这些前缀的都是api路由,且与身份验证相关 */
export const apiAuthPrefix = '/api/auth';

/** 用于用户登录后默认的重定向路由 */
export const DEFAULT_LOGIN_REDIRECT = '/default'