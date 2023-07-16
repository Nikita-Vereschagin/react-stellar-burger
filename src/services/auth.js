import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest, registerRequest, forgotPasswordRequest, resetPasswordRequest } from './api';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    return await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        return data.success;
      });
  };

  const signIn = async form => {
    const data = await loginRequest(form)
      .then(res => res.json())
      .then(data => data);
/*     let authToken;
    authToken = data.accessToken.split('Bearer ')[1];
    authToken ? setCookie('token', authToken) : null */
    if (data.success) {
      setUser(data.user);
    }
  };

  const register = async form => {
    const data = await registerRequest(form)
      .then(res => res.json())
      .then(data => data);
/*     let authToken;
    authToken = data.accessToken.split('Bearer ')[1];
    authToken ? setCookie('token', authToken) : null */
    if (data.success) {
      setUser(data.user);
    }
  };

  const signOut = async () => {
    await logoutRequest()
    setUser(null)
    deleteCookie('token')
  };

  const forgotPassword = async () => {
    return await forgotPasswordRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        return data.success;
      });
  };

  const resetPassword = async () => {
    return await resetPasswordRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        return data.success;
      });
  };


  return {
    user,
    getUser,
    signIn,
    signOut, 
    register    
  };
}