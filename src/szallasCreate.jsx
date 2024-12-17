import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SzallasCerate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [hostname, setHostname] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [minimumNights, setMinimumNights] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      location,
      hostname,
      price,
      minimum_nights: minimumNights,
    };

    try {
      await axios.post('https://szallasjwt.sulla.hu/data', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/');
    } catch (error) {
      console.error('Hiba történt a szállás hozzáadása során:', error);
    }
  };

  return (
    <div className="container">
      <h1>Új Szállás Felvétele</h1>
      <form onSubmit={handleSubmit} className="szallas-form-container">
        <div className="form-group">
          <label htmlFor="name">Szállás neve:</label>
          <input
            type="text"
            id="name"
            placeholder="Szállás neve"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Elhelyezkedés:</label>
          <input
            type="text"
            id="location"
            placeholder="Elhelyezkedés"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostname">Hostname:</label>
          <input
            type="text"
            id="hostname"
            placeholder="Hostname"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Ár:</label>
          <input
            type="number"
            id="price"
            placeholder="Ár"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minimum_nights">Minimum éjszakák:</label>
          <input
            type="number"
            id="minimum_nights"
            placeholder="Minimum éjszakák"
            value={minimumNights}
            onChange={(e) => setMinimumNights(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Szállás hozzáadása
        </button>
      </form>
    </div>
  );
};
