export const URL = "https://norma.nomoreparties.space/api";

 
export const checkResponse = (res) => {
  if (res && res.ok) {
     return res.json()
 }
 return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
};

export const getIngredientsRequest = () => {
  return fetch(`${URL}/ingredients`)
     .then(checkResponse)
}

export const createOrder = (arr) => {
  return fetch(`${URL}/orders`, {
     method: 'POST',
     headers: { "Content-Type": "application/json",},
     body: JSON.stringify({
        ingredients: arr,
     }),
  })
     .then(checkResponse)
}

export const refreshToken = () => {
   return fetch(`${URL}/auth/token`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json;charset=utf-8",
     },
     body: JSON.stringify({
       token: localStorage.getItem("refreshToken"),
     }),
   }).then(checkResponse);
 };
 
 export const fetchWithRefresh = async (url, options) => {
   try {
     const res = await fetch(url, options);
     return await checkResponse(res);
   } catch (err) {
     if (err.message === "jwt expired") {
       const refreshData = await refreshToken(); //обновляем токен
       if (!refreshData.success) {
         return Promise.reject(refreshData);
       }
       localStorage.setItem("refreshToken", refreshData.refreshToken);
       localStorage.setItem("accessToken", refreshData.accessToken);
       options.headers.authorization = refreshData.accessToken;
       const res = await fetch(url, options); //повторяем запрос
       return await checkResponse(res);
     } else {
       return Promise.reject(err);
     }
   }
 };
export const ingredients = 'ingredients'        
export const orders = 'orders'                
export const login = 'auth/login'              
export const user = 'auth/user'               
export const register = 'auth/register'       
export const logout = 'auth/logout'             
export const token = 'auth/token'              
export const reset = 'password-reset'           
export const password = 'password-reset/reset'  
