'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Map, MapMarker, MarkerContent, MapControls, useMap, type MapRef } from '@/components/ui/map';
import { useThemeMode } from '@/app/theme/ThemeProvider';
import { pontoColetaService, type PontoColetaResponse } from '@/services/pontoColeta.service';
import { PointCard } from '@/components/points/PointCard';
import { formatDistance } from '@/utils/distance';
import { ReportModal } from '@/components/points/ReportModal';
import './mapa-page.css';

function MapThemeCustomizer({ themeMode }: { themeMode: string }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !map) return;
    const rootStyles = getComputedStyle(document.documentElement);
    const surfacePrimary = rootStyles.getPropertyValue('--app-surface-primary').trim();
    const surfaceSecondary = rootStyles.getPropertyValue('--app-surface-secondary').trim();

    if (themeMode === 'dark') {
      try {
        if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', surfacePrimary);
        if (map.getLayer('water')) map.setPaintProperty('water', 'fill-color', surfaceSecondary);
      } catch (err) {
        console.warn('Map layers not fully loaded yet', err);
      }
    }
  }, [map, isLoaded, themeMode]);
  return null;
}

export function MapaPage() {
  const { themeMode } = useThemeMode();
  const mapRef = useRef<MapRef>(null);

  const [points, setPoints] = useState<PontoColetaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [pointToReport, setPointToReport] = useState<PontoColetaResponse | null>(null);

  const searchResults = points.filter((p) => {
    const query = searchQuery.toLowerCase();
    return p.nome.toLowerCase().includes(query) || p.endereco.toLowerCase().includes(query);
  });

  useEffect(() => {
    async function fetchPoints() {
      try {
        const data = await pontoColetaService.findAll();
        setPoints(data);
        if (data.length > 0) {
          setSelectedPointId(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPoints();
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn('Localização negada', err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSelectPoint = (point: PontoColetaResponse) => {
    setSelectedPointId(point.id);
    mapRef.current?.flyTo({
      center: [point.longitude, point.latitude],
      zoom: 15,
      duration: 1200,
    });
  };

  const handleOpenReportModal = (point: PontoColetaResponse) => {
    setPointToReport(point);
    setIsReportModalOpen(true);
  };

  const handleNotifyFull = async (id: string) => {
    try {
      await pontoColetaService.notifyFull(id);
      alert('Obrigado! A prefeitura foi notificada sobre a lixeira cheia.');
    } catch (error) {
      alert('Erro ao enviar notificação.');
    }
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando mapa...</div>;
  }

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
              const dist = userLocation 
                ? formatDistance(userLocation.lat, userLocation.lng, Number(point.latitude), Number(point.longitude))
                : undefined;

              return (
                <PointCard 
                  key={point.id}
                  point={point}
                  distance={dist}
                  isSelected={selectedPointId === point.id}
                  onSelect={() => handleSelectPoint(point)}
                  onNotifyFull={handleNotifyFull}
                  onReportProblem={handleOpenReportModal}
                />
              );
            })}
            
            {points.length === 0 && (
              <p className="text-sm text-gray-500">Nenhum ponto de coleta cadastrado ainda.</p>
            )}
          </div>
        </aside>

        <section className="mapv2-canvas" aria-label="Mapa de pontos de coleta">
          <div className="mapv2-search-wrapper">
            <div className={`mapv2-search ${isSearchFocused ? 'mapv2-search--active' : ''}`}>
              <Search className="mapv2-search__icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar por nome ou endereço..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setTimeout(() => setIsSearchFocused(false), 200);
                }}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="mapv2-search__clear" 
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {isSearchFocused && searchQuery && (
              <div className="mapv2-search-dropdown">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={`search-${result.id}`}
                      type="button"
                      className="mapv2-search-item"
                      onClick={() => {
                        handleSelectPoint(result);
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                    >
                      <MapPin size={16} className="mapv2-search-item__icon" />
                      <div className="mapv2-search-item__text">
                        <strong>{result.nome}</strong>
                        <span>{result.endereco}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="mapv2-search-empty">
                    Nenhum ponto encontrado para "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
      
          
          <div className="absolute inset-0 z-0">
            <Map 
              ref={mapRef}
              theme={themeMode} 
              center={[-44.9981, -21.2464]} 
              zoom={13}
            >
              <MapThemeCustomizer themeMode={themeMode} />
              <MapControls position="bottom-right" showZoom={true} showLocate={true} />

              {userLocation && (
                <MapMarker longitude={userLocation.lng} latitude={userLocation.lat}>
                  <MarkerContent>
                    <div className="pointer-events-none relative flex items-center justify-center">
                      <div className="absolute h-8 w-8 animate-ping rounded-full bg-blue-500 opacity-40" />
                      <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-md" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              )}

    
              {points.map((point) => {
                const isSelected = selectedPointId === point.id;
                
                const baseColor = !isSelected 
                  ? 'var(--app-text-muted)' 
                  : point.aberto ? 'var(--success)' : 'var(--danger)';

                return (
                  <MapMarker
                    key={`marker-${point.id}`}
                    longitude={point.longitude}
                    latitude={point.latitude}
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
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        point={pointToReport} 
      />
    </main>
  );
}