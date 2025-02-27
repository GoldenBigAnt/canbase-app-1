import React, { useEffect, useState } from "react";
import { ExpoLeaflet, MapLayer } from "expo-leaflet";
import { ActivityIndicator } from "react-native";

const SearchMap: React.FC<{
  latLng: any;
  mapMarkers: any;
}> = ({ latLng, mapMarkers }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [latLng, mapMarkers]);

  const mapLayers: MapLayer[] = [
    {
      baseLayerName: "OpenStreetMap",
      baseLayer: true,
      baseLayerIsChecked: true,
      layerType: "TileLayer",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ];

  const mapOptions = {
    attributionControl: false,
    zoomControl: false,
  };

  return (
    <ExpoLeaflet
      key={key}
      mapCenterPosition={[52.52, 13.405]}
      mapLayers={mapLayers}
      mapOptions={mapOptions}
      mapMarkers={mapMarkers}
      loadingIndicator={() => <ActivityIndicator />}
      zoom={12}
      onMessage={(message) => {
        switch (message.tag) {
          case "onMapMarkerClicked":
            console.log("onMapMarkerClicked");
            break;
          default:
            return;
        }
      }}
    />
  );
};

export default SearchMap;
