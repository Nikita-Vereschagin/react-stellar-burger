import { useContext, useState, createContext } from 'react';
import { loginRequest, getUserRequest, logoutRequest, registerRequest, forgotPasswordRequest, resetPasswordRequest } from './api';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()

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
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken)
      setUser(data.user)
      navigate({to: '/', replace: true})
    }
    setTimeout(localStorage.removeItem('accessToken'), 1200000)
  };

  const register = async form => {
    const data = await registerRequest(form)
      .then(res => res.json())
      .then(data => data);
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      setUser(data.user);
      navigate({to: '/', replace: true})
    }
    setTimeout(localStorage.removeItem('accessToken'), 1200000)
  };

  const signOut = async () => {
    const data = await logoutRequest()
    if (data.success) {
      setUser(null)
      navigate({to: '/register', replace: true})
    }
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