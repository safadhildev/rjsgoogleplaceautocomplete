import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoBox,
} from "@react-google-maps/api";

import { Grid } from "@material-ui/core";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MyMap = ({ center, markerPosition, onChangeMarkerPosition }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <Grid
      container
      xs={12}
      style={{ display: "flex", flexDirection: "row", backgroundColor: "#000" }}
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          clickableIcons
          onClick={({ latLng }) => {
            onChangeMarkerPosition(latLng);
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            <Marker position={markerPosition} />
          </>
        </GoogleMap>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default MyMap;
