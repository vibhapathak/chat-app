//all the utility functions will be inside this -the constants like urls
//process.env if create react app

export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
console.log("HOST:", HOST);
console.log("GET_USER_INFO:", GET_USER_INFO);