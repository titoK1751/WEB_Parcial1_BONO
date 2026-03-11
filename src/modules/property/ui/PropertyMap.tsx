'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '../services/propertyService';
import 'leaflet/dist/leaflet.css';

// Fijar el icono por defecto de Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface PropertyMapProps {
  properties: Property[];
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function PropertyMap({ 
  properties, 
  initialCenter, 
  initialZoom = 4 
}: PropertyMapProps) {
  if (!properties || properties.length === 0) {
    return <div className="alert alert-info">No hay propiedades para mostrar en el mapa</div>;
  }

  // Calcular el centro del mapa basado en todas las propiedades
  const center: [number, number] = initialCenter || [
    properties.reduce((sum, p) => sum + p.latitute, 0) / properties.length,
    properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length,
  ];

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      style={{ height: '600px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {properties.map((property, index) => (
        <Marker
          key={index}
          position={[property.latitute, property.longitude]}
        >   
          <Popup>
            <div style={{ width: '250px' }}>
              <h5 style={{ marginBottom: '8px' }}>{property.propertyName}</h5>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <p><strong>Ciudad:</strong> {property.city}</p>
                <p><strong>Precio:</strong> {property.price}</p>
                <p><strong>Habitaciones:</strong> {property.rooms} | <strong>Baños:</strong> {property.baths}</p>
                <p><strong>Piso:</strong> {property.floor}</p>
                <p><strong>Dirección:</strong> {property.address}</p>
                <p><strong>Propietario:</strong> {property.fullName}</p>
                <p><strong>Teléfono:</strong> {property.phone}</p>
                <p>
                  <strong>Email:</strong> <a href={`mailto:${property.email}`} target="_blank" rel="noopener noreferrer">
                    {property.email}
                  </a>
                </p>
                <p><strong>Garaje:</strong> {property.garage ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
