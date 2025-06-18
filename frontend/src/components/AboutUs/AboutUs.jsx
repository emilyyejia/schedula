import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Toronto City Hall for example:
const location = {
  lat: 43.668889,
  lng: -79.397222
};

export default function AboutUsMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyC8hL6VQgbf4o-DEoj01S8Ss0or9dbDP-Q">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}