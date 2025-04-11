export class Api {
  constructor(options) {
    // constructor body

    this._options = options;
  }

  getUserData() {
    return Promise.all([this.renderUserInfo(), this.getInitialCards()]);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  renderUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // other methods for working with the API

  // Pass the data as an argument. In this example, we are using destructuring,
  // so we would need to pass the function an object with properties called
  // name and about.
  editUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  postCard(name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  removeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        cardId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  addLike(cardId, method) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._options.headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        cardId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  changeProfilePicture(pictureUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar: pictureUrl,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
