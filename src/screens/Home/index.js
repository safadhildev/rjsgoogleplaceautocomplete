import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Close,
  Explore,
  Inbox,
  Launch,
  LocalAtmOutlined,
  LocationCity,
  Mail,
  Map,
  Menu as MenuIcon,
  Room,
} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { placeRequest } from "../../providers/actions/Place";
import MyDrawer from "../../components/MyDrawer";
import MyMap from "../../components/MyMap";

const drawerWidth = 280;
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  autocompleteInput: {
    width: "100%",
  },
  input: {
    backgroundColor: "#FFF",
    border: "none",
    borderRadius: 5,
    width: "100%",
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

  const { predictions } = useSelector((state) => ({
    predictions: state.placeReducer.data,
  }));

  const _onSearch = async () => {
    try {
      dispatch(placeRequest(search));
    } catch (err) {
      console.log("Home - onSearch - error :: ", err);
    }
  };

  const _onSearchGeocode = async (item) => {
    try {
      const res = await DataService.getPlaceLocation(item.place_id);
      console.log({ res });
      if (res.status === 200) {
        const { geometry } = res?.data?.results[0];
        console.log(geometry);
        setCenterMap(geometry.location);
        setMarkerPosition(geometry.location);
      }
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

  const _onSelectItem = (index) => {
    const item = history[index];
    _onSearchGeocode(item);
    _handleDrawerToggle();
  };

  const _onRemoveItem = (index) => {
    const newArr = history.filter((item, i) => i !== index);
    setHistory(newArr);
  };

  useEffect(() => {
    if (search.length > 0) _onSearch();
  }, [search]);

  const _getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setMarkerPosition(currentPos);
          setCenterMap(currentPos);
        },
        (err) => {
          console.log({ err });
        }
      );
    } catch (err) {
      console.log({ err });
    }
  };

  const _onChangeMarkerPosition = (latLng) => {
    setMarkerPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  };

  useEffect(() => {
    _getCurrentLocation();
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
      />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={_handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container xs={12}>
            <Autocomplete
              options={predictions}
              getOptionLabel={(option) => option.description}
              className={classes.autocompleteInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Places"
                  variant="outlined"
                  className={classes.input}
                  size="small"
                />
              )}
              onInputChange={_onInputChange}
              onChange={_onChange}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        xs={12}
        style={{ backgroundColor: "#000", paddingTop: appBarHeight }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            textAlign: "center",
            zIndex: 1,
            left: 0,
            right: 0,
            top: appBarHeight + 10,
          }}
        >
          <Grid xs={12} style={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                _getCurrentLocation();
              }}
            >
              Pan to current location
            </Button>
          </Grid>
        </div>
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
