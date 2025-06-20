import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function GoogleMap() {
    const center = { lat: 43.66844, lng: -79.39863 };

    return (
        <APIProvider apiKey="AIzaSyC8hL6VQgbf4o-DEoj01S8Ss0or9dbDP-Q">
            <div style={{
                padding: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',      
                flexDirection: 'column'
            }}>
                <Map
                    style={{ width: '70vw', height: '50vh' }}
                    defaultCenter={center}
                    defaultZoom={15}
                    minZoom={10}
                    maxZoom={18}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
                <Marker position={center} title="Our Office" />
            </div>

        </APIProvider>
    );
}
