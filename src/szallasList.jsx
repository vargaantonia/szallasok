import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SzallasList = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || ""); 
  const [data, setData] = useState('');


  const loginKezelo = async () => {
    try {
      const response = await axios.post('https://szallasjwt.sulla.hu/login', {
        username,
        password,
      });
      setToken(response.data.token); 
      console.log('Token:', response.data.token);
    } catch (error) {
      console.log('Nem sikerült a bejelentkezés', error);
    }
  };

  const adaLekeres = async () => {
    try {
      const response = await axios.get('https://szallasjwt.sulla.hu/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log('Nem sikerült a lekérés', error);
    }
  };

  return (
    <div className="container">
      <h1>Bejelentkezés</h1>
      <div className="form-group">
        <label htmlFor="username">Felhasználónév:</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Jelszó:</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={loginKezelo} className="login-button">
        Bejelentkezés
      </button>

      {token && (
        <div>
          <h2>Védett végpontok:</h2>
          <button onClick={adaLekeres} className="fetch-button">
            Adat lekérés
          </button>
          <div className="card-container">
            {data && data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="card">
                  <h3>{item.name}</h3>
                  <p>Hostname: {item.hostname}</p>
                  <p>Elhelyezkedés: {item.location}</p>
                  <p>Ár: {item.price}</p>
                  <p>Minimum éjszakák: {item.minimum_nights}</p>
                  <div className="d-flex justify-content-center mt-3">
                    <Link to={`/szallasdel/${item.id}`}>
                      <i className="bi bi-trash3 fs-7 btn btn-danger btn-sm"></i>
                    </Link> &nbsp; &nbsp; &nbsp;
                    <Link to={`/create-szallas`}>
                        <i className="bi bi-pencil-square fs-7 btn btn-warning btn-sm"></i>
                    </Link>&nbsp; &nbsp; &nbsp;
                    <Link to={`/mod-szallas/`}>
                            <i className="bi bi-text-paragraph fs-7 btn btn-primary btn-sm"></i>
                        </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Nincs megjeleníthető adat.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
