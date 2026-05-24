'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Battery,
  Bolt,
  Clock3,
  Cpu,
  MapPin,
  Search,
  TriangleAlert,
  Trash2
} from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Map, MapMarker, MarkerContent, MapControls, useMap, type MapRef } from '@/components/ui/map';
import { useThemeMode } from '@/app/theme/ThemeProvider';
import './mapa-page.css';

type Material = {
  label: string;
  icon: 'battery' | 'bolt' | 'cpu';
};

type Point = {
  name: string;
  neighborhood: string;
  status: 'aberto' | 'fechado';
  hours?: string;
  materials?: Material[];
  lng: number;
  lat: number;
};

// TODO: Extrair para uma camada de Service (ex: points.service.ts) quando a API Spring Boot estiver pronta
const points: Point[] = [
  {
    name: 'Praça Dr. Augusto Silva',
    neighborhood: 'Centro, Lavras - MG',
    status: 'aberto',
    hours: '08h às 18h',
    lng: -44.9981,
    lat: -21.2464,
    materials: [
      { label: 'Pilhas', icon: 'battery' },
      { label: 'Baterias', icon: 'bolt' },
      { label: 'Eletrônicos', icon: 'cpu' },
    ],
  },
  {
    name: 'UFLA - DCC',
    neighborhood: 'Campus Universitário',
    status: 'aberto',
    lng: -44.9796,
    lat: -21.2263,
  },
  {
    name: 'UFLA - Cantina Central',
    neighborhood: 'Campus Universitário',
    status: 'fechado',
    lng: -44.9774,
    lat: -21.2285,
  },
];

function MaterialIcon({ type }: { type: Material['icon'] }) {
  if (type === 'battery') return <Battery className="mapv2-tag__icon" aria-hidden="true" />;
  if (type === 'bolt') return <Bolt className="mapv2-tag__icon" aria-hidden="true" />;
  return <Cpu className="mapv2-tag__icon" aria-hidden="true" />;
}

// Injeta as variáveis de cor nativas do CSS root diretamente nas camadas (layers) base do MapLibre
function MapThemeCustomizer({ themeMode }: { themeMode: string }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !map) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const surfacePrimary = rootStyles.getPropertyValue('--app-surface-primary').trim();
    const surfaceSecondary = rootStyles.getPropertyValue('--app-surface-secondary').trim();

    if (themeMode === 'dark') {
      try {
        if (map.getLayer('background')) {
          map.setPaintProperty('background', 'background-color', surfacePrimary);
        }
        if (map.getLayer('water')) {
          map.setPaintProperty('water', 'fill-color', surfaceSecondary);
        }
      } catch (err) {
        console.warn('Map layers not fully loaded yet', err);
      }
    }
  }, [map, isLoaded, themeMode]);

  return null;
}

export function MapaPage() {
  const { themeMode } = useThemeMode();
  
  const [selectedPointName, setSelectedPointName] = useState<string>(points[0].name);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const mapRef = useRef<MapRef>(null);

  // Busca a localização inicial do usuário para fornecer ponto de partida no mapa
  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Usuário negou ou falhou em pegar a localização:', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSelectPoint = (point: Point) => {
    setSelectedPointName(point.name);
    mapRef.current?.flyTo({
      center: [point.lng, point.lat],
      zoom: 15,
      duration: 1200, // Animação suave para não causar desorientação espacial
    });
  };

  return (
    <main className="mapv2">
      <AppHeader />

      <section className="mapv2-shell">
        <aside className="mapv2-sidebar">
          <div className="mapv2-intro">
            <h1>Pontos de Coleta</h1>
            <p>Encontre o local mais próximo para descarte responsável.</p>
          </div>

          <div className="mapv2-list">
            {points.map((point) => {
              const isOpen = point.status === 'aberto';
              const isSelected = selectedPointName === point.name;

              return (
                <article
                  key={point.name}
                  onClick={() => handleSelectPoint(point)}
                  style={{ cursor: 'pointer' }}
                  className={`mapv2-card${isSelected ? ' mapv2-card--featured' : ''}`}
                >
                  <div className="mapv2-card__header">
                    <div>
                      <h2>{point.name}</h2>
                      <p className="mapv2-location">
                        <MapPin className="mapv2-location__icon" aria-hidden="true" />
                        {point.neighborhood}
                      </p>
                    </div>

                    <span className={`mapv2-status mapv2-status--${point.status}`}>
                      <span className="mapv2-status__dot" aria-hidden="true" />
                      {isOpen ? 'ABERTO' : 'FECHADO'}
                    </span>
                  </div>

                  {isSelected ? (
                    <>
                      {point.hours && (
                        <section className="mapv2-meta-block">
                          <h3>HORÁRIO</h3>
                          <p className="mapv2-hours">
                            <Clock3 className="mapv2-hours__icon" aria-hidden="true" />
                            {point.hours}
                          </p>
                        </section>
                      )}

                      {point.materials && (
                        <section className="mapv2-meta-block">
                          <h3>MATERIAIS ACEITOS</h3>
                          <div className="mapv2-tags">
                            {point.materials.map((material) => (
                              <span key={material.label} className="mapv2-tag">
                                <MaterialIcon type={material.icon} />
                                {material.label}
                              </span>
                            ))}
                          </div>
                        </section>
                      )}

                      <div className="mapv2-actions">
                        <button type="button" className="mapv2-btn mapv2-btn--outline">
                          <Trash2 className="mapv2-btn__icon" aria-hidden="true" />
                          AVISAR LIXEIRA CHEIA
                        </button>
                        <button type="button" className="mapv2-btn mapv2-btn--danger">
                          <TriangleAlert className="mapv2-btn__icon" aria-hidden="true" />
                          RELATAR PROBLEMA
                        </button>
                      </div>
                    </>
                  ) : null}
                </article>
              );
            })}
          </div>
        </aside>

        <section className="mapv2-canvas" aria-label="Mapa de pontos de coleta">
          <div className="mapv2-search">
            <Search className="mapv2-search__icon" aria-hidden="true" />
            <span>Buscar ponto de coleta no mapa...</span>
          </div>
          
          <div className="absolute inset-0 z-0">
            <Map 
              ref={mapRef}
              theme={themeMode} 
              center={[-44.9981, -21.2464]} 
              zoom={13}
            >
              <MapThemeCustomizer themeMode={themeMode} />
              
              <MapControls 
                position="bottom-right" 
                showZoom={true} 
                showLocate={true}
              />

              {/* Indicador de posição atual do usuário */}
              {userLocation && (
                <MapMarker
                  longitude={userLocation.lng}
                  latitude={userLocation.lat}
                >
                  <MarkerContent>
                    <div className="relative flex items-center justify-center pointer-events-none">
                      <div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-40 animate-ping" />
                      <div className="relative w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              )}

              {/* Renderização dos pins de coleta */}
              {points.map((point) => {
                const isSelected = selectedPointName === point.name;
                const isOpen = point.status === 'aberto';
                
                const baseColor = !isSelected 
                  ? 'var(--app-text-muted)' 
                  : isOpen ? 'var(--success)' : 'var(--danger)';

                return (
                  <MapMarker
                    key={`marker-${point.name}`}
                    longitude={point.lng}
                    latitude={point.lat}
                    onClick={() => handleSelectPoint(point)}
                  >
                    <MarkerContent>
                      <div 
                        style={{
                          transform: isSelected ? 'scale(1.18) translateY(-4.5px)' : 'scale(1)',
                          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          zIndex: isSelected ? 10 : 1,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <MapPin 
                          size={30} 
                          fill={`color-mix(in srgb, ${baseColor} 20%, transparent)`} 
                          color={baseColor}
                          strokeWidth={2}
                          style={{
                            filter: `drop-shadow(0 0 ${isSelected ? '8px' : '4px'} color-mix(in srgb, ${baseColor} 60%, transparent))`
                          }}
                        />
                        <div 
                          className="absolute rounded-full" 
                          style={{ 
                            width: '7px', 
                            height: '7px', 
                            top: '8.5px',   
                            backgroundColor: baseColor,
                            boxShadow: `0 0 6px color-mix(in srgb, ${baseColor} 80%, transparent)`
                          }} 
                        />
                      </div>
                    </MarkerContent>
                  </MapMarker>
                );
              })}
            </Map>
          </div>
        </section>
      </section>
    </main>
  );
}