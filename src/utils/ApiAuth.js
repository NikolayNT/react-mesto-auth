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

  registration(){
    return fetch(`${this._baseUrl}/signup`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password: "12345",
        email: "koly201020@yandex.ru"})
    })
    /*
    email: "koly201020@yandex.ru"
    _id: "6293b94f6390a4001468fbca"
    */
    .then(this._checkResponse)
  }

  authorization(){
    return fetch(`${this._baseUrl}/signin`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password: "12345",
        email: "koly201020@yandex.ru"})
    })
    /*
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzYjk0ZjYzOTBhNDAwMTQ2OGZiY2EiLCJpYXQiOjE2NTM4NDk4NjJ9.rik_j3w1eJqwgy03ngAhG0ChQ4a07lOvbXVRPBzjiU8"
    */
    .then(this._checkResponse)
  }

  identification(){
    return fetch(`${this._baseUrl}/users/me`, {headers: 
      {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkzYjk0ZjYzOTBhNDAwMTQ2OGZiY2EiLCJpYXQiOjE2NTM4NDk4NjJ9.rik_j3w1eJqwgy03ngAhG0ChQ4a07lOvbXVRPBzjiU8'}`
      }
      ,
      method: 'GET'
    })
    /*
    email: "koly201020@yandex.ru"
    _id: "6293b94f6390a4001468fbca"
    */
    .then(this._checkResponse)
  }
}

const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    /*authorization: '61c26732-c0b1-4455-b980-e65336351013',*/
    'Content-Type': 'application/json'
  }
});

export {apiAuth}