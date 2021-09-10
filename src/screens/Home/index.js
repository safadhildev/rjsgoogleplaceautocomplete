/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  Card,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { predictionsRequest } from "../../providers/actions/Predictions";
import { MyAppBar, MyDrawer, MyMap, MySnackbar } from "../../components";
import { geocodeRequest } from "../../providers/actions/Geocode";

const appBarHeight = 60;
const drawerWidth = 380;
const mobileWidth = 300;

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
  const [error, setError] = useState(false);

  const { predictions, location } = useSelector((state) => ({
    predictions: state.predictionsReducer.data,
    location: state.geocodeReducer.data,
  }));

  const _onSearch = async () => {
    try {
      setLoading(true);
      dispatch(predictionsRequest(search));
    } catch (err) {
      setLoading(false);
      setError({ err });
      console.log("Home - onSearch - error :: ", err);
    } finally {
      setLoading(false);
    }
  };

  const _onSearchGeocode = async (item) => {
    try {
      setLoading(true);
      if (item) dispatch(geocodeRequest(item.place_id));
    } catch (err) {
      setError({ err });
      console.log("Home - onSearchGeocode - error :: ", err);
    } finally {
      setLoading(false);
    }
  };

  const _onPredictAndSelectPlace = async (value) => {
    try {
      setLoading(true);
      const service = new google.maps.places.AutocompleteService();
      const response = await service.getPlacePredictions({ input: value });
      const { predictions: results } = response;
      if (response) {
        dispatch(geocodeRequest(results[0].place_id));
      }
    } catch (err) {
      setError({ err });
      console.log("Home - _onPredictAndSelect - error :: ", { err });
    } finally {
      setLoading(false);
    }
  };

  const _onChange = async (event, item) => {
    try {
      setLoading(true);
      if (typeof item === "object") {
        setHistory([item, ...history]);
        _onSearchGeocode(item);
      } else {
        // it is a search value
        _onPredictAndSelectPlace(item);
      }
    } catch (err) {
      setError({ err });
      console.log("Home - handleAutocompleteChange - error ", err);
    } finally {
      setLoading(false);
    }
  };

  const _onGetCurrentLocation = async () => {
    try {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(_handleGetCurrentLocation);
    } catch (err) {
      setLoading(false);
      setError({ err });
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
      <MySnackbar
        isOpen={error}
        severity="error"
        onClose={() => {
          setError(null);
        }}
        message={`Error : ${error}`}
      />
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
        loading={loading}
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
      <div
        style={{
          position: "fixed",
          display: "flex",
          bottom: -10,
          left: 0,
          right: 0,
          justifyContent: "center",
        }}
      >
        <Grid container xs={8} md={3}>
          <Card style={{ height: 20, padding: "5px 30px" }}>
            <Typography>History</Typography>
          </Card>
        </Grid>
      </div>
    </Grid>
  );
};

export default Home;
