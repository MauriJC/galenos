// src/components/ChangePassword.js
import React, { useState } from 'react';
import api from '../../apis';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Message, Container } from 'semantic-ui-react';
import './ChangePassword.css'; // Asegúrate de tener este archivo CSS

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const token = localStorage.getItem('Authorization');
      await api.post('/change-password', { oldPassword, newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Contraseña cambiada con éxito');
      setError(null);
      navigate('/');
    } catch (err) {
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <Container textAlign='center' style={{ marginTop: '2rem' }}>
      <h2>Cambiar Contraseña</h2>
      {success && <Message positive>{success}</Message>}
      {error && <Message negative>{error}</Message>}
      <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Field>
          <label className="custom-label">Contraseña Actual</label>
          <Form.Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label className="custom-label">Nueva Contraseña</label>
          <Form.Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label className="custom-label">Confirmar Nueva Contraseña</label>
          <Form.Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" primary>Cambiar Contraseña</Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
