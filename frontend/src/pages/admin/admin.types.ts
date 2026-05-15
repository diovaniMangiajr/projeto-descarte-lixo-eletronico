export type PointStatus = 'operational' | 'maintenance';

export type WasteTypeOption = {
  value: string;
  label: string;
};

export type AdminPointRecord = {
  id: number;
  name: string;
  address: string;
  description: string;
  acceptedWasteTypes: string[];
  latitude: string;
  longitude: string;
  status: PointStatus;
};

export type AdminPointFormState = {
  name: string;
  address: string;
  description: string;
  acceptedWasteTypes: string[];
  latitude: string;
  longitude: string;
};

export type AdminPointFormErrors = Partial<Record<keyof AdminPointFormState, string>>;

export type AdminPointModalMode = 'create' | 'edit';
