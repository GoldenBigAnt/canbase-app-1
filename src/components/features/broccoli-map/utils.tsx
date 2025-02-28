import { Ban, Blocks, Cannabis, LandPlot, LucideIcon, School, Shield, ShoppingCart, TreePine } from 'lucide-react-native';
import { isWithinInterval, set } from 'date-fns';
import { LayerType } from './layer-selection';

export type BroccoliMapNearestLayer = {
  latitude: number;
  longitude: number;
  distance: number;
  name?: string;
}

export type BroccoliMapNearestLayers = {
  [layer: string]: BroccoliMapNearestLayer
}

export type BroccoliMapLayer = {
  name: string;
  label: string;
  nearest?: BroccoliMapNearestLayer;
}

export type BroccoliMapLayerForLegend = BroccoliMapLayer & {
  color: string;
  icon: LucideIcon;
}

export function isWithinTimeRange(from: number, to: number): boolean {
  const now = new Date();
  const start = set(now, { hours: from, minutes: 0, seconds: 0 });
  const end = set(now, { hours: to, minutes: 0, seconds: 0 });

  return isWithinInterval(now, { start, end });
}


export function getLayersByType(layerType: LayerType, isBetween7And20: boolean, nearestLayers: BroccoliMapNearestLayers = {}) {
  return layerType === 'consume' ? [{
    name: 'schools',
    label: 'Schulen',
    icon: School,
    nearest: nearestLayers['schools'],
    color: '#9747FF'
  },{
    name: 'playgrounds',
    label: 'Kinderspielplätze',
    icon: TreePine,
    nearest: nearestLayers['playgrounds'],
    color: '#4781FF'
  },{
    name: 'kids_and_youth_facilities',
    label: 'Kinder- & Jugendeinrichtungen',
    icon: Blocks,
    nearest: nearestLayers['kids_and_youth_facilities'],
    color: '#F0CB36'
  },{
    name: 'sports',
    label: 'Öffentliche Sportstätten',
    icon: LandPlot,
    nearest: nearestLayers['sports'],
    color: '#26AC35'
  },{
    name: 'social_clubs',
    label: 'Anbauvereinigungen',
    icon: Cannabis,
    nearest: nearestLayers['social_clubs'],
    color: '#686868'
  },{
    name: 'military',
    label: 'Militärische Bereiche',
    icon: Shield,
    nearest: nearestLayers['military'],
    color: '#9D7900'
  }, ...(isBetween7And20 ? [{
    icon: ShoppingCart,
    color: '#41ADCE',
    nearest: nearestLayers['pedestrian'],
    name: 'pedestrian',
    label: 'Fußgängerzonen'
  }, {
    icon: Ban,
    color: '#EF4444',
    name: 'consume_with_pedestrian_zones',
    label: 'Konsumverbotszonen'
  }] : [{
    icon: Ban,
    color: '#EF4444',
    name: 'consume',
    label: 'Konsumverbotszonen'
  }])] : [{
    name: 'schools',
    label: 'Schulen',
    icon: School,
    nearest: nearestLayers['schools'],
    color: '#9747FF'
  },{
    name: 'playgrounds',
    label: 'Kinderspielplätze',
    icon: TreePine,
    nearest: nearestLayers['playgrounds'],
    color: '#4781FF'
  },{
    name: 'kids_and_youth_facilities',
    label: 'Kinder- & Jugendeinrichtungen',
    icon: Blocks,
    nearest: nearestLayers['kids_and_youth_facilities'],
    color: '#F0CB36'
  },{
    name: 'military',
    label: 'Militärische Bereiche',
    icon: Shield,
    nearest: nearestLayers['military'],
    color: '#9D7900'
  },{
    icon: ShoppingCart,
    color: '#41ADCE',
    nearest: nearestLayers['pedestrian'],
    name: 'pedestrian',
    label: 'Fußgängerzonen'
  }, {
    icon: Ban,
    color: '#EF4444',
    name: 'cultivation',
    label: 'Anbau- & Abgabeverbotszonen'
  }];
}