import { IBurgerIngredient } from "../components/burger-constructor/burger-constructor";

const authDomain = "https://norma.nomoreparties.space/api/auth/";
const domain = "https://norma.nomoreparties.space/api/";

type IAuf = HeadersInit & {
  authorization?: string | null | undefined
}

interface IOptions {
  method: string,
  headers: IAuf,
  body?: BodyInit | null | undefined,
}

const isOk = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const tokenRequest = async () => {
  return await fetch(`${authDomain}token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => isOk(res));
};

const fetchWithRefresh = async (url: string, options: IOptions) => {
  try {
    const res = await fetch(url, options);
    return await isOk(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
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
  return await fetchWithRefresh(`${authDomain}user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `${localStorage.getItem("accessToken")}`,
    },
  });
};

const patchUserRequest = async (form:{[key: string]: string,}) => {
  return await fetchWithRefresh(`${authDomain}user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(form),
  });
};

const loginRequest = async (form: {[key: string]: string,}) => {
  return await fetch(`${authDomain}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => isOk(res));
};

const registerRequest = async (form: {[key: string]: string,}) => {
  return await fetch(`${authDomain}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => isOk(res));
};

const resetPasswordRequest = async (form:{[key: string]: string,}) => {
  return await fetch(`${domain}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => isOk(res));
};

const forgotPasswordRequest = async (form:{[key: string]: string,}) => {
  return await fetch(`${domain}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => isOk(res));
};

const logoutRequest = async () => {
  return await fetch(`${authDomain}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => isOk(res));
};

const orderRequest = async (burgerList: readonly IBurgerIngredient[]) => {
  return await fetchWithRefresh(`${domain}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients: burgerList.map((el) => el._id),
    }),
  }).then((res) => isOk(res));
};

const getOrderRequest = async (number: string) => {
  return await fetch(`${domain}orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }).then((res) => isOk(res));
};

const getIngredientsRequest = async () => {
  return await fetch(`${domain}ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => isOk(res));
};

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
  orderRequest,
  getOrderRequest
};
