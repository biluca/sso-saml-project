"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    console.log('Initiating SAML check.', 'START SAML');

    const res = axios({
      method: 'GET',
      url: 'http://localhost:5000/whostalking/',
      withCredentials: true
    });

    res.then(response => {
      const data = response.data
      console.log(data, 'SUCCESS SAML');

      setName(data.name)
      setEmail(data.email)
      setToken(data.token)
      setLoading(false);
    })
      .catch(error => {
        console.log(error, 'ERROR SAML');
        RedirectToLogin();
      })
  }, []);

  const RedirectToLogin = () => {
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