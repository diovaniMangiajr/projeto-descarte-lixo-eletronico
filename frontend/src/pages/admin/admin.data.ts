import type { AdminPointRecord, WasteTypeOption } from './admin.types';

export const acceptedWasteTypeOptions: WasteTypeOption[] = [
  { value: 'pilhas', label: 'Pilhas' },
  { value: 'baterias', label: 'Baterias' },
  { value: 'celulares', label: 'Celulares' },
  { value: 'computadores', label: 'Computadores' },
  { value: 'monitores', label: 'Monitores' },
  { value: 'cabos', label: 'Cabos' },
];

export const initialAdminPoints: AdminPointRecord[] = [
  {
    id: 1,
    name: 'UFLA - Cantina Central',
    address: 'Campus Universitário, Lavras - MG',
    description: 'Ponto fixo interno com fluxo intenso de descarte.',
    acceptedWasteTypes: ['Computadores', 'Cabos', 'Monitores'],
    latitude: '-21.2399',
    longitude: '-44.9990',
    status: 'operational',
  },
  {
    id: 2,
    name: 'Prefeitura Municipal',
    address: 'Praça Dr. Augusto Silva, Centro',
    description: 'Atendimento ao público com horários estendidos em dias úteis.',
    acceptedWasteTypes: ['Pilhas', 'Baterias', 'Celulares'],
    latitude: '-21.2440',
    longitude: '-44.9982',
    status: 'operational',
  },
  {
    id: 3,
    name: 'Supermercado Rex',
    address: 'Av. Pedro Sales, 150',
    description: 'Coleta assistida para itens de pequeno e médio porte.',
    acceptedWasteTypes: ['Pilhas', 'Baterias', 'Cabos'],
    latitude: '-21.2336',
    longitude: '-44.9925',
    status: 'operational',
  },
  {
    id: 4,
    name: 'UFLA - DCC',
    address: 'Campus Universitário, Lavras - MG',
    description: 'Ponto sujeito a manutenção programada.',
    acceptedWasteTypes: ['Computadores', 'Monitores'],
    latitude: '-21.2414',
    longitude: '-44.9971',
    status: 'maintenance',
  },
];
