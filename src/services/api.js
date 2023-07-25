const domain = 'https://norma.nomoreparties.space/api/';
const isOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const loginRequest = async form => {
  return await fetch(`${domain}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  }).then(isOk)
};

export const registerRequest = async form => {
    return await fetch(`${domain}auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(isOk)
  };

  export const refreshToken = async () => {
    return await fetch(`${domain}auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    }).then(isOk)
  };

  export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await isOk(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); 
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
  

export const getUserRequest = async () =>
  await fetch(`${domain}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }).then(isOk)

export const patchUserRequest = async () =>
  await fetch(`${domain}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    }
  }).then(isOk)

export const logoutRequest = async () => {
  return await fetch(`${domain}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    })
  }).then(isOk)
};

export const resetPasswordRequest= async form => {
    return await fetch(`${domain}password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(isOk)
  };

  export const forgotPasswordRequest = async form => {
    return await fetch(`${domain}forgot-password`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    }).then(isOk)
  };