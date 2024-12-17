import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const SzallasSingle = () => {
  const { szallasId } = useParams();
  const [szallas, setSzallas] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const response = await axios.get(`https://szallasjwt.sulla.hu/data/${szallasId}`);
        setSzallas(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [szallasId]);

  if (isPending || !szallas) {
    return <div className="spinner-border"></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Szállás</h2>
      <div className="card">
        <h3 className="text-center">Név: {szallas.name}</h3>
        <p className="text-center">Elhelyezkedés: {szallas.location}</p>
        <p className="text-center">Ár: {szallas.price} Ft</p>
        <p className="text-center">Minimum éjszakák: {szallas.minimum_nights}</p>
        <div className="d-flex justify-content-center mt-3">
          <div className="card-body d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center text-center mt-3">
              <Link to={`/mod-szallas/${szallas.id}`}>
                <i className="bi bi-text-paragraph fs-3 btn btn-primary btn-sm"></i>
              </Link>&nbsp; &nbsp; &nbsp;
              <Link to={`/szallas/${szallas.id}`}>
                <i className="bi bi-pencil-square fs-3 btn btn-warning btn-sm"></i>
              </Link>&nbsp; &nbsp; &nbsp;
              <Link to={`/del-szallas/${szallas.id}`}>
                <i className="bi bi-trash3 fs-3 btn btn-danger btn-sm"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
