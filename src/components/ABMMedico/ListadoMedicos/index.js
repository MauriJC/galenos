import api from '../../../apis';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListadoMedicos = () => {
    const [listaMedicos, setListaMedicos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMedicos, setFilteredMedicos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10); // Tamaño de página fijo
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getListadoMedicos();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, listaMedicos]);

    useEffect(() => {
        paginateMedicos();
    }, [currentPage, filteredMedicos]);

    const getListadoMedicos = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            setLoading(true);
            const response = await api.get(`/altamedico`, { headers });
            const medicos = response.data.medicos || [];
            setListaMedicos(medicos);
            setFilteredMedicos(medicos);
            setTotalPages(Math.ceil(medicos.length / pageSize));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching medicos:", error);
            setError("Error fetching medicos");
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filtered = listaMedicos.filter(medico =>
            medico.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMedicos(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1); // Reset to first page after search
    };

    const paginateMedicos = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredMedicos.slice(startIndex, endIndex);
    };

    const renderAdminFunctions = (medico) => {
        return (
            <div className="right floated content">
                <Link to={`/medicos/modificarMedico/${medico.numero_matricula}`} className="ui button primary">
                    <i className="edit icon"></i>
                </Link>
                <Link to={`/medicos/bajamedico/${medico.numero_matricula}`} className="ui button negative">
                    <i className="trash icon"></i>
                </Link>
            </div>
        );
    };

    const renderCrear = () => {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to="/medicos/altamedico" className="ui button primary">
                    Alta medico
                </Link>
            </div>
        );
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`ui button ${i === currentPage ? 'blue' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="ui buttons">
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="ui button">
                        Anterior
                    </button>
                )}
                {pages}
                {currentPage < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="ui button">
                        Siguiente
                    </button>
                )}
            </div>
        );
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1 className='ui centered dividing header'>Listado de Médicos</h1>
            </div>

            <div className="ui segment">
                <div className="ui action input" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Buscar por apellido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="ui button" onClick={handleSearch}>Buscar</button>
                </div>

                <div className="ui celled list">
                    {paginateMedicos().map(medico => {
                        return (
                            <div className="item" key={medico.numero_matricula}>
                                {renderAdminFunctions(medico)}
                                <i className="large middle aligned icon doctor" />
                                <div className="content">
                                    Nombre del médico: {medico.nombre} {medico.apellido}
                                    <div className="description"> Matricula N°: {medico.numero_matricula}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {renderCrear()}
            </div>

            <div className="ui center aligned segment">
                {renderPagination()}
            </div>

            <div style={{ textAlign: 'right' }}>
                <Link to="/" className="ui button positive">
                    Volver al menú
                </Link>
            </div>
        </div>
    );
};

export default ListadoMedicos;
