'use client';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { MeasurementApi } from '@/libs/meaurementApi';
interface MapCenter {
  lat: number;
  lng: number;
}

const MapPage: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<MapCenter>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placeId, setPlaceId] = useState<String>('');
  const [address, setAddress] = useState<String>('');
  const [selection, setSelection] = useState<Boolean>(false);
  const [saved, setSaved] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  interface ApiData {
    mapCenter: MapCenter
    placeId: String
    address: String
  }

  interface MeaurementData {
    address: String
  }



  const postData = async (body: ApiData) => {
    const data = await MeasurementApi.addMeaurements(body)
    return data
  };

  const getMeaurements = async (body: MeaurementData) => {
    const data = await MeasurementApi.getMeaurements(body)
    return data
  };



  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });


  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.setMapTypeId('satellite');
    mapInstance.setOptions({
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setSaved(false)
    setError(false)
    setSelection(true)
    setValue(address, false);
    clearSuggestions();
    const result = await getMeaurements({ address: address })
    console.log(result)
    const { lat, lng ,placeId }  = result
    setPlaceId(placeId)
    setAddress(address)
    setMapCenter({ lat, lng });
    // postData(
    //   {
    //     mapCenter:mapCenter,
    //     placeId: placeId,
    //     address: address
    //   }
    // )


  };
  const handleSave = async () => {
    try {
      const result = await postData({
        mapCenter: mapCenter,
        placeId: placeId,
        address: address
      });
      console.log(result);
      setSaved(true)
    } catch (error) {
      setSaved(true)
      setError(true)
      console.log(error, 'err')
    }
  };
  
  return isLoaded ? (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Please Search Property Here</h1>
      <div >
        <PlacesAutocomplete
          value={value}
          onChange={setValue}
          onSelect={handleSelect}
          disabled={!ready}
          suggestions={data}
          status={status}
        />
      </div>
      {selection ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={100}
          onLoad={onLoad}
          heading={90}
          onUnmount={onUnmount}
        >
          {mapCenter.lat !== 0 && <Marker position={mapCenter} />}
        </GoogleMap>
      ) : (
        <></>
        
      )}
      <button onClick={handleSave} className="bg-blue-500 text-white font-semibold mt-4 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
        Save
      </button>

      {saved && (
        <p>{error ? 'Data Duplicated' : 'Saved Successfully'}</p>
      )}
    
    </div>
  ) : (
    <div>Loading...</div>
  );
};

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: string) => void;
  disabled: boolean;
  suggestions: { description: string }[];
  status: string;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  disabled,
  suggestions,
  status,
}) => (
  <div className="relative">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      placeholder="Enter an address"
      className="border p-2 rounded w-full"
      disabled={disabled}
    />
    {status === 'OK' && (
      <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md mt-1 max-h-60 overflow-auto">
        {suggestions.map(({ description }, index) => (
          <li
            key={index}
            onClick={() => onSelect(description)}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {description}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default MapPage;
