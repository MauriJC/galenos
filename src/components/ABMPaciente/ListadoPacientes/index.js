import React, { useState, useEffect } from 'react';
import api from '../../../apis';
import { Link } from 'react-router-dom';

const ListadoPacientes = () => {
    const [listaPacientes, setListaPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getListaPacientes();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, listaPacientes]);

    useEffect(() => {
        paginatePacientes();
    }, [currentPage, filteredPacientes]);

    const getListaPacientes = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            setLoading(true);
            const response = await api.get(`/altapaciente`, { headers });
            const pacientes = response.data.message || [];
            setListaPacientes(pacientes);
            setFilteredPacientes(pacientes);
            setTotalPages(Math.ceil(pacientes.length / pageSize));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pacientes:", error);
            setError("Error fetching pacientes");
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filtered = listaPacientes.filter(paciente =>
            paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPacientes(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
        setCurrentPage(1); 
    };

    const paginatePacientes = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredPacientes.slice(startIndex, endIndex);
    };

    const renderAdminFunctions = (paciente) => {
        return (
            <div className="right floated content">
                <Link to={`/pacientes/modificarpaciente/${paciente.numero_afiliado}`} className="ui button primary">
                    <i className="edit icon"></i>
                </Link>
                <Link to={`/pacientes/bajapaciente/${paciente.numero_afiliado}`} className="ui button negative">
                    <i className="trash icon"></i>
                </Link>
            </div>
        );
    };

    const renderCrear = () => {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to="/pacientes/altapaciente" className="ui button primary">
                    Alta paciente
                </Link>
            </div>
        );
    };

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5; // Número máximo de páginas a mostrar
        const halfMaxPages = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            // Si hay menos páginas que el número máximo a mostrar, mostrar todas
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
        } else {
            // Mostrar las páginas circundantes al número actual
            if (currentPage > halfMaxPages) {
                pages.push(
                    <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className={`ui button ${1 === currentPage ? 'blue' : ''}`}
                    >
                        1
                    </button>
                );
                pages.push(<span key="ellipsis-start">...</span>);
            }

            for (let i = Math.max(1, currentPage - halfMaxPages); i <= Math.min(totalPages, currentPage + halfMaxPages); i++) {
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

            if (currentPage < totalPages - halfMaxPages) {
                pages.push(<span key="ellipsis-end">...</span>);
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className={`ui button ${totalPages === currentPage ? 'blue' : ''}`}
                    >
                        {totalPages}
                    </button>
                );
            }
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
                <h1 className='header'>Listado de Pacientes</h1>
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
                    {paginatePacientes().map(paciente => {
                        return (
                            <div className="item" key={paciente.numero_afiliado}>
                                {renderAdminFunctions(paciente)}
                                <i className="large middle aligned icon doctor" />
                                <div className="content">
                                    Nombre del paciente: {paciente.nombre} {paciente.apellido}
                                    <div className="description"> Numero de afiliado:  {paciente.numero_afiliado}</div>
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

export default ListadoPacientes;
