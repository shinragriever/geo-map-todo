import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class Map extends Component {

  render() {
    const {currentLocation, zoom} = this.props;

    if(!currentLocation){
      return false;
    }

 
                      return (
                <div>
                    <GoogleMap
                    defaultZoom={zoom}
                    center={currentLocation}
                    >
                      <Marker position={currentLocation}/>
                    </GoogleMap>
                </div>
                );
    }
}


export default withScriptjs(withGoogleMap(Map));
