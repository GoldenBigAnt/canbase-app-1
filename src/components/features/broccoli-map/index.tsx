import { StyleSheet, View, Text, Pressable, GestureResponderEvent } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN, TILESERVER } from '@/config/env';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BroccoliMapLayer, BroccoliMapLayerForLegend, BroccoliMapNearestLayer, BroccoliMapNearestLayers, getLayersByType, isWithinTimeRange, LayerType } from './utils';
import { findNearestLayers } from '@/actions/osm';
import * as Location from 'expo-location';
import Marker from '@/assets/images/marker.svg';
import MarkerInitial from '@/assets/images/marker_initial.svg';
import MarkerInvalid from '@/assets/images/marker_invalid.svg';
import { BroccoliMapSearch, BroccoliMapSearchItem } from './search';
import { BroccoliMapControlButton, CollapsibleBroccoliMapControlButton } from './control-button';
import { Info, Minus, Plus, Send } from 'lucide-react-native';
import { ButtonIcon } from '@ui/button';
import { BroccoliMapLayerSelection } from './layer-selection';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const initialCamera: Mapbox.CameraStop = {
  centerCoordinate: [13.405, 52.52], // Berlin coordinates
  zoomLevel: 10, // Initial zoom level
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    position: 'absolute',
    padding: 10,
    top: 60,
    left: 0,
    right: 0,
    elevation: 3,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  overlayBottomLeft: {
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
  },
  overlayBottomRight: {
    position: 'absolute',
    padding: 10,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }
});

const TileLayer = ({
  name
}: {
  name: string
}) => {
  return (
    <Mapbox.RasterSource
      id={name}
      tileSize={256}
      tileUrlTemplates={[
        `${TILESERVER}/${name}/{z}/{x}/{y}.png"`
      ]}
    >
      <Mapbox.RasterLayer
        id={name}
        sourceID={name}
        style={{
          visibility: 'visible'
        }}
      />
    </Mapbox.RasterSource>
  );
};


export const BroccoliMap = () => {
  const cameraRef = useRef<Mapbox.Camera | null>(null);

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(16);
  const [layerType, setLayerType] = useState<LayerType>('consume');
  const [isInitial, setIsInitial] = useState(true);
  const [isBetween7And20, setIsBetween7And20] = useState(isWithinTimeRange(7, 20));
  const [nearestLayers, setNearestLayers] = useState<BroccoliMapNearestLayers>({});
  const layers = useMemo<Array<BroccoliMapLayer | BroccoliMapLayerForLegend>>(() => getLayersByType(layerType, isBetween7And20, nearestLayers), [layerType, isBetween7And20, nearestLayers]);
  const legendLayers = useMemo(() => layers.filter(l => Object.hasOwn(l, 'icon')) as Array<BroccoliMapLayerForLegend>, [layers]);
  const legendNearestLayers = useMemo(() => layers.filter(l => !!l.nearest && Object.hasOwn(l, 'color')) as Array<BroccoliMapLayer & { nearest: BroccoliMapNearestLayer; color: string }>, [layers]);
  const isLegit = useMemo(() => !!position && !legendNearestLayers?.length && !nearestLayers?.['miscellanous'], [position, legendNearestLayers, nearestLayers]);
  const lineSources = useMemo(() => {
    if (!position || !legendNearestLayers?.length) {
      return undefined;
    }

    return legendNearestLayers.map((layer) => ({
      ...layer,
      key: `${layer.name}-${position.join(',')}`,
      shape: {
        type: 'LineString' as const,
        coordinates: [
          [position[0], position[1]],
          [layer.nearest.longitude, layer.nearest.latitude]
        ]
      }
    }));
  }, [position, legendNearestLayers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBetween7And20(isWithinTimeRange(7, 20));
    }, 60000);

    handleLocate();
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    async function updateLayers() {
      if (!position) {
        return;
      }

      const layers = getLayersByType(layerType, isBetween7And20);
      try {
        await findNearestLayers(
          [position[1], position[0]],
          layers.map(l => l.name),
          layerType === 'consume' ? 100 : 200
        ).then(setNearestLayers);
      } catch (err) {
        console.error(`[BroccoliMap]: Error fetching nearest layers`, err);
      }
      setIsInitial(false);
    }

    updateLayers();
  }, [position, layerType]);

  const updatePosition = (position: [number, number], zoom?: number) => {
    setNearestLayers({});
    setIsInitial(true);
    setPosition(position);
    console.log('set position', position);

    if (zoom) {
      setZoom(zoom);
      cameraRef.current?.setCamera({
        centerCoordinate: position,
        zoomLevel: zoom
      });
    } else {
      cameraRef.current?.flyTo(position, 100);
    }
  }

  const updateLayerType = (type: string) => {
    setIsInitial(true);
    setLayerType(type as LayerType);
  }

  const handleSearch = ({ x, y, zoom }: BroccoliMapSearchItem) => {
    updatePosition([y, x], zoom);
  };

  const handleMapPress = (event: GeoJSON.Feature) => {
    if (!(event as GeoJSON.Feature<GeoJSON.Point>).geometry?.coordinates) {
      return;

    }
    const [longitude, latitude] = (event as GeoJSON.Feature<GeoJSON.Point>).geometry.coordinates;

    updatePosition([longitude, latitude]);
  };

  const handleLocate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      updatePosition(initialCamera.centerCoordinate as [number, number], initialCamera.zoomLevel);
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: 3
    });
    updatePosition([location.coords.longitude, location.coords.latitude], 14);
  }

  const prevent = (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  const maxZoom = 16;
  const minZoom = 0;
  const zoomIn = useCallback(() => {
    if (zoom > maxZoom - 1) {
      return;
    }

    cameraRef.current?.zoomTo(zoom + 1, 100);
    setZoom(zoom + 1);
  }, [zoom]);

  const zoomOut = useCallback(() => {
    if (zoom < minZoom + 1) {
      return;
    }

    cameraRef.current?.zoomTo(zoom - 1, 100);
    setZoom(zoom - 1);
  }, [zoom]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        onPress={handleMapPress}
        onCameraChanged={(state) => {
          if (state.properties.zoom !== zoom) {
            setZoom(state.properties.zoom);
          }
        }}
        style={styles.map}>
        <Mapbox.Camera
          ref={cameraRef}
          animationMode='easeTo'
          animationDuration={1000}
          maxZoomLevel={maxZoom} />

        {layers.map(({ name }) => (
          <TileLayer
            key={name}
            name={name}
          />
        ))}

        {lineSources?.map(({ name, key, color, shape }) => (
          <Mapbox.ShapeSource
            key={`polyline-source-${key}`}
            id={`polyline-source-${key}`}
            shape={shape}
          >
            <Mapbox.LineLayer
              key={`polyline-layer-${key}`}
              id={`polyline-layer-${key}`}
              sourceID={`polyline-source-${key}`}
              style={{
                lineColor: color,
                lineWidth: 2,
                lineDasharray: [2, 2]
              }}
            />
          </Mapbox.ShapeSource>
        ))}

        {position?.length === 2 && <Mapbox.MarkerView
          id="marker"
          coordinate={[position[0], position[1]]}
        >
          {isInitial ? <MarkerInitial /> : (isLegit ? <Marker /> : <MarkerInvalid />)}
        </Mapbox.MarkerView>}
      </Mapbox.MapView>
      <Pressable onPress={prevent} style={styles.overlayTop}>
        <BroccoliMapSearch onSelect={handleSearch} />
        <BroccoliMapLayerSelection value={layerType} onChange={updateLayerType} />
      </Pressable>
      <Pressable onPress={prevent} style={styles.overlayBottomLeft}>
        <CollapsibleBroccoliMapControlButton collapsedIcon={Info}>
          <View className="flex flex-col gap-3 py-3 text-zinc-900">
            {legendLayers.map(({ label, icon: LayerIcon, color, nearest }: BroccoliMapLayerForLegend) => (
              <View
                key={label}
                className="flex flex-row gap-3 font-normal text-sm">
                <LayerIcon className="opacity-80" size={18} color={color} />
                <View className="flex flex-col text-left">
                  <Text className="font-medium">{label}</Text>
                  {nearest?.name && <Text className="text-xs">{nearest.name}</Text>}
                </View>
                {!!nearest && <Text className="text-zinc-400">{parseInt(nearest.distance.toString())}m</Text>}
              </View>
            ))}
          </View>
        </CollapsibleBroccoliMapControlButton>
      </Pressable>
      <Pressable onPress={prevent} style={styles.overlayBottomRight}>
        <BroccoliMapControlButton
          onPress={() => handleLocate()}
          className="h-10 w-10">
          <ButtonIcon as={Send}></ButtonIcon>
        </BroccoliMapControlButton>
        <BroccoliMapControlButton
          onPress={() => zoomIn()}
          className="h-10 w-10">
          <ButtonIcon as={Plus}></ButtonIcon>
        </BroccoliMapControlButton>
        <BroccoliMapControlButton
          onPress={() => zoomOut()}
          className="h-10 w-10">
          <ButtonIcon as={Minus}></ButtonIcon>
        </BroccoliMapControlButton>
      </Pressable>
    </View>
  )
}