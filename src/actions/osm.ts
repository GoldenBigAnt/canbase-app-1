import axios from 'axios';
import { axiosPrivateInstance } from '../lib/axios';

const findNearestLayers = async (position: [number, number], layers: string[], limit: number) => {
  try {
    // return Promise.resolve({
    //   schools: {
    //     latitude: 9.473360416319423,
    //     longitude: 51.28885388197031,
    //     name: 'test',
    //     distance: 200
    //   }
    // });
    const result = await axiosPrivateInstance
      .get(`/osm/nearest?position=${encodeURIComponent(JSON.stringify(position))}&layers=${encodeURIComponent(JSON.stringify(layers))}&limit=${limit}`)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const geocode = async (query: string) => {
  try {
    return await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query + ", Deutschland",
          format: "json",
        },
        headers: {
          "User-Agent": "canbase-app",
        },
      }
    )
    .then((res) => res.data);;
  } catch (error) {
    console.error(error);
  }
}

export { findNearestLayers, geocode };