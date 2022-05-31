class ApiAuth {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registration({email, password}){
    return fetch(`${this._baseUrl}/signup`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password: password,
        email: email})
    })
    .then(this._checkResponse)
  }

  authorization(auth){
    return fetch(`${this._baseUrl}/signin`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password: auth.password,
        email: auth.email})
    })
    .then(this._checkResponse)
  }

  identification(jwt){
    return fetch(`${this._baseUrl}/users/me`, {headers: 
      {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
      ,
      method: 'GET'
    })
    .then(this._checkResponse)
  }
}

const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export {apiAuth}