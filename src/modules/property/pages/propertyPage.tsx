'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button } from 'react-bootstrap';
import { getProperties, Property } from '../services/propertyService';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('[PropertyPage] Fetching properties...');
        const result = await getProperties();
        console.log('[PropertyPage] Got properties:', result?.length);
        setProperties(result || []);
        setError(null);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Error desconocido';
        console.error('[PropertyPage] Error:', err);
        setError(`Error al cargar propiedades: ${errMsg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Container className="mt-5">
        <div className="alert alert-info" role="alert">
          No hay propiedades disponibles.
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Propiedades Disponibles ({properties.length})</h1>
      <Row className="g-4">
        {properties.map((property, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm hover-card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
              <Card.Body>
                <Card.Title className="text-custom">{property.propertyName.substring(0, 30)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{property.city}</Card.Subtitle>

                <div className="mb-2">
                  <Badge bg="success" className="me-2">{property.price}</Badge>
                  {property.garage && <Badge bg="info">Garage</Badge>}
                </div>

                <Card.Text className="small">
                  <div className="mb-1">
                    <strong>🏠 Habitaciones:</strong> {property.rooms}
                  </div>
                  <div className="mb-1">
                    <strong>🚿 Baños:</strong> {property.baths}
                  </div>
                  <div className="mb-1">
                    <strong>📍 Piso:</strong> {property.floor}
                  </div>
                  <div className="mb-2">
                    <strong>👤 Propietario:</strong> {property.fullName}
                  </div>
                  <div className="mb-1 text-truncate">
                    <strong>📮 Dirección:</strong> {property.address}
                  </div>
                  <div className="mb-1">
                    <strong>📞 Teléfono:</strong> {property.phone}
                  </div>
                  <div>
                    <strong>📧 Email:</strong> <a href={`mailto:${property.email}`}>{property.email}</a>
                  </div>
                </Card.Text>
                <Button variant="secondary">Ver en Mapa</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

