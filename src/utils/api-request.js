const URL = "https://norma.nomoreparties.space/api";


const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
}

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
