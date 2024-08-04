import React from 'react';
import { Container, Header, Message } from 'semantic-ui-react';

const Unauthorized = () => {
  return (
    <Container textAlign='center' style={{ marginTop: '5em' }}>
      <Header as='h1' color='black'>
        Acceso no autorizado
      </Header>
      <Message negative>
        <Message.Header>No tienes permisos para acceder a esta página.</Message.Header>
      </Message>
    </Container>
  );
};

export default Unauthorized;
