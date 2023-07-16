import { getCookie } from './utils';

const domain = 'https://norma.nomoreparties.space/api/';
const isOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const deserializeQuery = (query, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};

export const serializeQuery = queryParams =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === 'undefined') {
      return acc;
    }
    const postfix = index === array.length - 1 ? '' : '&';
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
  }, '?');

/* export const getIngredients = async () =>
  await fetch(`${domain}ingredients`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(res => res.json())
    .then(({ countries }) => countries); */

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
  });
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
    });
  };

export const getUserRequest = async () =>
  await fetch(`${domain}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

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
    referrerPolicy: 'no-referrer'
  });
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
    });
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
    });
  };