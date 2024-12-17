import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasMod = () => {
    const params = useParams();
    const id = params.szallasId;
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState({
        name: '',
        location: '',
        hostname: '',
        price: 0,
        minimum_nights: 0,
        image_url: ''
    });

    useEffect(() => {
        const fetchSzallasData = async () => {
            try {
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`);
                setSzallas(response.data);
            } catch (error) {
                console.log('Error fetching szallas data:', error);
            }
        };

        fetchSzallasData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSzallas(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://szallasjwt.sulla.hu/data/${id}`, szallas)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Hiba a modosítás során:', error);
        });
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Szállás módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Szállás neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={szallas.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Elhelyezkedés:</label>
                    <div className="col-sm-9">
                        <input type="text" name="location" className="form-control" defaultValue={szallas.location} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input type="number" name="price" className="form-control" value={szallas.price} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Minimum éjszakák:</label>
                    <div className="col-sm-9">
                        <input type="number" name="minimum_nights" className="form-control" value={szallas.minimum_nights} onChange={handleInputChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Módosítás</button>
            </form>
        </div>
    );
};
