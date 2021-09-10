import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { predictionsRequest } from "../../providers/actions/Predictions";
import { MyAppBar, MyDrawer, MyMap } from "../../components";
import { geocodeRequest } from "../../providers/actions/Geocode";

const appBarHeight = 60;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    height: appBarHeight,
    justifyContent: "center",
    backgroundColor: "#212121",
  },
  menuButton: {},
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  autocompleteInput: {
    width: "100%",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    border: "none",
    borderRadius: 5,
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  locationButton: {
    backgroundColor: "#FFF",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [history, setHistory] = useState([]);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [centerMap, setCenterMap] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);

  const { predictions, location } = useSelector((state) => ({
    predictions: state.predictionsReducer.data,
    location: state.geocodeReducer.data,
  }));

  const _onSearch = async () => {
    try {
      dispatch(predictionsRequest(search));
    } catch (err) {
      console.log("Home - onSearch - error :: ", err);
    }
  };

  const _onSearchGeocode = async (item) => {
    try {
      dispatch(geocodeRequest(item.place_id));
    } catch (error) {
      console.log("Home - onSearchGeocode - error :: ", error);
    }
  };

  const _onChange = async (event, item) => {
    try {
      if (item) {
        setHistory([item, ...history]);
        _onSearchGeocode(item);
      }
    } catch (err) {
      console.log("Home - handleAutocompleteChange - error ", err);
    }
  };

  const _onInputChange = (e, value) => {
    setSearch(value);
  };

  const _handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const _onClearHistory = () => {
    setHistory([]);
  };

  const _onSelectItem = (item) => {
    setSearch(item.description);
    _onSearchGeocode(item);
    _handleDrawerToggle();
  };

  const _onRemoveItem = (index) => {
    const newArr = history.filter((item, i) => i !== index);
    setHistory(newArr);
  };
  const _handleGetCurrentLocation = (event) => {
    const currentPosition = {
      lat: event.coords.latitude,
      lng: event.coords.longitude,
    };
    setMarkerPosition(currentPosition);
    setCenterMap(currentPosition);

    setLoading(false);
  };

  const _onGetCurrentLocation = async () => {
    try {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(_handleGetCurrentLocation);
    } catch (err) {
      setLoading(false);
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const _onChangeMarkerPosition = (latLng) => {
    setMarkerPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  };

  useEffect(() => {
    setMarkerPosition(location);
    setCenterMap(location);
  }, [location]);

  useEffect(() => {
    if (search.length > 0) _onSearch();
  }, [search]);

  useEffect(() => {
    _onGetCurrentLocation();
  }, []);

  return (
    <Grid container xs={12} style={{ height: "100vh" }}>
      <MyDrawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        data={history}
        onClearHistory={_onClearHistory}
        onRemoveItem={_onRemoveItem}
        onSelectItem={_onSelectItem}
        onGetCurrentLocation={() => {
          _onGetCurrentLocation();
          _handleDrawerToggle();
        }}
      />
      <MyAppBar
        onInputChange={_onInputChange}
        onChange={_onChange}
        predictions={predictions}
        onClickIcon={_handleDrawerToggle}
        value={search}
      />
      <Grid container xs={12} style={{ paddingTop: 0 }}>
        {loading && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: appBarHeight,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(250, 250, 250,0.5)",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        )}
        <MyMap
          center={centerMap}
          markerPosition={markerPosition}
          onChangeMarkerPosition={_onChangeMarkerPosition}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
