'use client';

import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { getProperties, Property } from '../services/propertyService';
import PropertyMap from '../ui/PropertyMap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MapPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('[MapPage] Fetching properties...');
        const result = await getProperties();
        console.log('[MapPage] Got properties:', result?.length);
        setProperties(result || []);
        setError(null);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Error desconocido';
        console.error('[MapPage] Error:', err);
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

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Mapa de Propiedades</h1>
      <div className="card">
        <div className="card-body p-0">
          <PropertyMap properties={properties} />
        </div>
      </div>
      <p className="text-muted mt-3 small">
        Total de propiedades: <strong>{properties.length}</strong> | 
        Haz click en los marcadores para ver los detalles
      </p>
    </Container>
  );
}
