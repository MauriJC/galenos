import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../apis';

const ListadoSecretarios = () => {
    const [listaSecretarios, setListaSecretarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSecretarios, setFilteredSecretarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10); // Tamaño de página fijo
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSecretarios();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, listaSecretarios]);

    useEffect(() => {
        paginateSecretarios();
    }, [currentPage, filteredSecretarios]);

    const getSecretarios = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            setLoading(true);
            const response = await api.get('/altasecretario', { headers });
            const secretarios = response.data.secretarios || [];
            
            setListaSecretarios(secretarios);
            setFilteredSecretarios(secretarios);
            setTotalPages(Math.ceil(secretarios.length / pageSize));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching secretarios:", error);
            setError("Error fetching secretarios");
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filtered = listaSecretarios.filter(secretario =>
            secretario.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSecretarios(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1); // Reset to first page after search
    };

    const paginateSecretarios = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredSecretarios.slice(startIndex, endIndex);
    };

    const renderAdminFunctions = (secretario) => {
        return (
            <div className="right floated content">
                <Link to={`/secretarios/modificarsecretario/${secretario.legajo}`} className="ui button primary">
                    <i className="edit icon"></i>
                </Link>
                <Link to={`/secretarios/bajasecretario/${secretario.legajo}`} className="ui button negative">
                    <i className="trash icon"></i>
                </Link>
            </div>
        );
    };

    const renderCrear = () => {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to="/secretarios/altasecretario" className="ui button primary">
                    Alta secretario
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
                <h1 className='header'>Listado de secretarios</h1>
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
                    {paginateSecretarios().map(secretario => {
                        return (
                            <div className="item" key={secretario.legajo}>
                                {renderAdminFunctions(secretario)}
                                <i className="large middle aligned icon doctor" />
                                <div className="content">
                                    Nombre del secretario: {secretario.nombre} {secretario.apellido}
                                    <div className="description"> Legajo N°: {secretario.legajo}</div>
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
                    Volver al menu
                </Link>
            </div>
        </div>
    );
}

export default ListadoSecretarios;
