import './App.css';
import {React} from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import { SzallasCerate } from './szallasCreate';
import { SzallasList } from './szallasList';
import { SzallasDel } from './szallasDel';
import { SzallasSingle } from './szallasSingle';
import { SzallasMod } from './szallasMod';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Szállás
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-szallas">
                Új szállás felvétele
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/szallas/:szallasId' element={<SzallasSingle />} />
        <Route path="/create-szallas" element={<SzallasCerate />} />
        <Route path="/" element={<SzallasList />} />
        <Route path='/del-szallas/:szallasId' element={<SzallasDel />} />
        <Route path='/mod-szallas/:szallasId' element={<SzallasMod />} />
      </Routes>
    </Router>
  );
};
