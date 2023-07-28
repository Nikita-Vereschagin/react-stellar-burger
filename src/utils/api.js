const authDomain = 'https://norma.nomoreparties.space/api/auth/';
const domain = 'https://norma.nomoreparties.space/api/';
const isOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const tokenRequest = async () => {
  return await
    fetch(`${authDomain}token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }).then(res => isOk(res))
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await isOk(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await tokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await isOk(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUserRequest = async () => {
  return await
    fetchWithRefresh(`${authDomain}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
}

const patchUserRequest = async (form) => {
  return await
    fetchWithRefresh(`${authDomain}user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify(form)
    }).then(res => isOk(res))
}

const loginRequest = async (form) => {
  return await
    fetch(`${authDomain}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => isOk(res))
}

const registerRequest = async (form) => {
  return await
    fetch(`${authDomain}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => isOk(res))
}

const resetPasswordRequest = async (form) => {
  return await
    fetch(`${domain}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => isOk(res))
}

const forgotPasswordRequest = async (form) => {
  return await
    fetch(`${domain}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => isOk(res))
}

const logoutRequest = async () => {
  return await
    fetch(`${authDomain}logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }).then(res => isOk(res))
}

const orderRequest = async (burgerList) => {
  return await
    fetch(`${domain}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        ingredients: burgerList.map(el => el._id)
      })
    }).then(res => isOk(res))
}

const getIngredientsRequest = async () => {
  return await
    fetch(`${domain}ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => isOk(res))
}


export const api = {
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  tokenRequest,
  patchUserRequest,
  resetPasswordRequest,
  forgotPasswordRequest,
  getIngredientsRequest,
  orderRequest
};
