import { setCookie } from "../services/cookie";

export const URL = "https://norma.nomoreparties.space/api";
export const WSURL = "wss://norma.nomoreparties.space/orders"

 type TServerResponse<T> ={
   success: boolean
 } & T;

 type TRefreshResponse = TServerResponse<{
refreshToken: string;
accessToken: string,
 }>

export const checkResponse = <T>(res: Response):Promise<T> => {
  if (res && res.ok) {
     return res.json()
 }
 return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
};

export const getIngredientsRequest = () => {
  return fetch(`${URL}/ingredients`)
     .then(checkResponse)
}

export const refreshToken = (): Promise<TRefreshResponse> => {
   return fetch(`${URL}/auth/token`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json;charset=utf-8",
     },
     body: JSON.stringify({
       token: localStorage.getItem("refreshToken"),
     }),
   }).then((res) => checkResponse<TRefreshResponse>(res));
 };

export const fetchWithRefresh = async <T>(
  url: RequestInfo, 
  options: any
  ) => {
   try {
     const res = await fetch(url, options);
     return await checkResponse<T>(res);
   } catch (err: any) {
     if (err.message === "jwt expired") {
       const refreshData = await refreshToken(); //обновляем токен
       if (!refreshData.success) {
         return Promise.reject(refreshData);
       }
       localStorage.setItem("refreshToken", refreshData.refreshToken);
       setCookie("accessToken", refreshData.accessToken);
       if(options.headers){
        (options.headers as {[key: string]: string}).authorization = refreshData.accessToken;}
       const res = await fetch(url, options); //повторяем запрос
       return await checkResponse(res);
     } else {
       return Promise.reject(err);
     }
   }
 };


 
