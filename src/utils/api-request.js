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


 
