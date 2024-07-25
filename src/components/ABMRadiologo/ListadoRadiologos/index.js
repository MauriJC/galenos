import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../apis';

const ListadoRadiologos = () => {
    const [listaRadiologos, setListaRadiologos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRadiologos, setFilteredRadiologos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10); // Tamaño de página fijo
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRadiologos();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, listaRadiologos]);

    useEffect(() => {
        paginateRadiologos();
    }, [currentPage, filteredRadiologos]);

    const getRadiologos = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            setLoading(true);
            const response = await api.get('/radiologos', { headers });
            const radiologos = response.data || [];
            setListaRadiologos(radiologos);
            setFilteredRadiologos(radiologos);
            setTotalPages(Math.ceil(radiologos.length / pageSize));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching radiologos:", error);
            setError("Error fetching radiologos");
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filtered = listaRadiologos.filter(radiologo =>
            radiologo.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRadiologos(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1); // Reset to first page after search
    };

    const paginateRadiologos = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredRadiologos.slice(startIndex, endIndex);
    };

    const renderAdminFunctions = (radiologo) => {
        return (
            <div className="right floated content">
                <Link to={`/radiologos/modificarradiologo/${radiologo.numero_matricula}`} className="ui button primary">
                    <i className="edit icon"></i>
                </Link>
                <Link to={`/radiologos/bajaradiologo/${radiologo.numero_matricula}`} className="ui button negative">
                    <i className="trash icon"></i>
                </Link>
            </div>
        );
    };

    const renderCrear = () => {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to="/radiologos/altaradiologo" className="ui button primary">
                    Alta radiologo
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
                <h1 className='header'>Listado de Radiologos</h1>
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
                    {paginateRadiologos().map(radiologo => {
                        return (
                            <div className="item" key={radiologo.numero_matricula}>
                                {renderAdminFunctions(radiologo)}
                                <i className="large middle aligned icon doctor" />
                                <div className="content">
                                    Nombre del radiologo: {radiologo.nombre} {radiologo.apellido}
                                    <div className="description"> Matricula N°: {radiologo.numero_matricula}</div>
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

export default ListadoRadiologos;
