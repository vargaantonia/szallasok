import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export const SzallasDel = () => {
    const params = useParams();
    const id = params.szallasId;
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState(null);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://szallasjwt.sulla.hu/${id}`);
                const data = await res.json();
                setSzallas(data);
            } catch (error) {
                console.log("Hiba: ", error);
            }
        })();
    }, [id]);
    return (
        <div className="container mt-5">
            <div className="row row-cols-2 justify-content-center align-items-center">
                <div className="col">
                    <div className="card h-250">
                        <h3 className="text-dark text-center">Szállás neve: {szallas.name}</h3>
                        <h4 className="text-dark text-center">Elhelyezkedés: {szallas.location}</h4>
                        <h4 className="text-dark text-center">Ár: {szallas.price} Ft/éj</h4>
                        <h4 className="text-dark text-center">Minimum éjszakák: {szallas.minimum_nights}</h4>
                    </div>
                    <form 
                        onSubmit={(event) => {
                            event.preventDefault();
                            fetch(`https://szallasjwt.sulla.hu/${id}`, { method: "DELETE" })
                                .then(() => {
                                    console.log("Sikeres törlés!");
                                    navigate("/");
                                })
                                .catch(console.log);
                        }}
                    >
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <Link to="/" className="btn btn-warning fs-6"><i className="bi bi-backspace-fill"></i> Vissza</Link>&nbsp;&nbsp;
                            <button className="bi bi-trash3 fs-6 btn btn-danger" type="submit">Törlés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
