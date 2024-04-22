"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {


    //VALIDA SE O EXISTE UM USUÁRIO LOGADO!
    //NÃO NECESSARIAMENTE PRECISA CHAMAR O BACK-END (TOKENS)
    console.log('VALIDANDO USUÁRIO LOGADO');
    const res = axios({
      method: 'GET',
      url: 'http://localhost:5000/whostalking/',
      withCredentials: true
    });

    res.then(response => {
      const data = response.data
      console.log(data, 'USUÁRIO LOGADO!');

      setName(data.name)
      setEmail(data.email)
      setToken(data.token)
      setLogged(data.logged)
      setLoading(false);
    })
      .catch(error => {
        console.log(error, 'USUÁRIO NÃO LOGADO!');
        RedirectToLogin();
      })
  }, []);


  //INICIA O PROCESSO DE LOGIN VIA SSO!
  const RedirectToLogin = () => {
    console.log('REDIRECIONOU PARA LOGIN SSO!');
    window.location.replace('http://localhost:5000/login');
  }

  if (loading) {
    return (
      <div>
        <h2>Loading Credentials...</h2>
      </div>
    )
  }

  return (
    <div>
      <p>Hello, my name is <strong>{name}</strong> and you can connect with by sending an Email on <strong>{email}</strong>!</p>
      <p>Take a look at my credentials: <strong>{token}</strong></p>
    </div>
  );
}

export default Application;