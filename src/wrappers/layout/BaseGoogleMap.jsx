import { GoogleMap, Marker } from "react-google-maps"

const BaseGoogleMap = (props) => {

    return (
        <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.showMarker && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
    );
}

export default BaseGoogleMap;
  
