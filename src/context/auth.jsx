import { message } from 'antd';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AuthContext } from '../hooks/useAuth';
import request from '../services/reauest';
import { TOKEN, USER } from '../utils/constants';

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(
      JSON.parse(localStorage.getItem(USER)) || null
   );
   const [loading, setLoading] = useState(false);

   const login = async (values, navigate) => {
      try {
         setLoading(true);
         const {
            data: { token },
         } = await request.post('auth/login', values);

         Cookies.set(TOKEN, token);

         request.defaults.headers.common.Authorization = `Bearer ${token}`;

         const { data: user } = await request.get('auth/me');

         localStorage.setItem(USER, JSON.stringify(user));

         setUser(user);

         const { role } = user;

         message.success('Siz tizimga kirdingiz');

         if (role === 'admin') {
            navigate('/dashboard');
         } else if (role === 'user') {
            navigate('/my-post');
         }
      } finally {
         setLoading(false);
      }
   };

   const state = { user, loading, login };
   return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
AuthProvider.protoType = { children: PropTypes.node };

export default AuthProvider;
