import { 
  BatteryCharging, 
  Monitor, 
  Tv, 
  Lightbulb, 
  Cpu, 
  Plug, 
  Smartphone, 
  Package 
} from 'lucide-react';

export function getIconForMaterial(nome: string, className?: string) {
  const n = nome.toLowerCase();

  if (n.includes('pilha') || n.includes('bateria')) {
    return <BatteryCharging className={className} aria-hidden="true" />;
  }
  if (n.includes('celular') || n.includes('smartphone') || n.includes('tablet')) {
    return <Smartphone className={className} aria-hidden="true" />;
  }
  if (n.includes('monitor') || n.includes('computador') || n.includes('informática') || n.includes('notebook')) {
    return <Monitor className={className} aria-hidden="true" />;
  }
  if (n.includes('cabo') || n.includes('fio') || n.includes('carregador')) {
    return <Plug className={className} aria-hidden="true" />;
  }
  if (n.includes('lâmpada') || n.includes('lampada')) {
    return <Lightbulb className={className} aria-hidden="true" />;
  }
  if (n.includes('eletrodoméstico') || n.includes('tv') || n.includes('televisão')) {
    return <Tv className={className} aria-hidden="true" />;
  }
  if (n.includes('placa') || n.includes('circuito') || n.includes('hardware')) {
    return <Cpu className={className} aria-hidden="true" />;
  }

  return <Package className={className} aria-hidden="true" />;
}