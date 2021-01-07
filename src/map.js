import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return <GoogleMap
        defaultZoom={2}
        defaultCenter={{lat: 49.320, lng: 44.71}}
        onClick={(e) => {
            // console.log(e.latLng.lat())
            // console.log(e.latLng.lng())
            props.setLatLng({
                lat: e.latLng.lat(),
                lon: e.latLng.lng()
            })
        }}
    >
        { props.latLng && <Marker position={{lat: props.latLng.lat, lng: props.latLng.lon}}/>}
    </GoogleMap>
}))

export default MyMapComponent