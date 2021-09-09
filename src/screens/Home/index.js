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

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: { height: 80, justifyContent: "center", backgroundColor: "#212121" },
  menuButton: {},
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#F5F5F5",
  },
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
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  drawerSubtitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 14,
    color: "#01579B",
    flex: 1,
  },
}));

const MyDrawer = ({ open, onClose, data }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <ListItem>
        <Typography variant="p" className={classes.drawerSubtitle}>
          Places Autocomplete
        </Typography>
      </ListItem>
      <Divider />
      <div style={{ minHeight: 300 }}>
        <ListItem>
          <Typography variant="p" className={classes.drawerSubtitle}>
            Recent Places
          </Typography>
        </ListItem>
        <List>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <ListItem
                onClick={() => {
                  console.log("Hello");
                }}
                className={classes.item}
              >
                <Grid
                  container
                  xs={12}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography noWrap className={classes.itemText}>
                    {item?.description}
                  </Typography>
                  <Launch />
                </Grid>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="p">No Item</Typography>
            </ListItem>
          )}
        </List>
      </div>
      <Divider />
    </Drawer>
  );
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [history, setHistory] = useState([]);

  const { predictions } = useSelector((state) => ({
    predictions: state.placeReducer.data,
  }));

  const onSearch = async () => {
    try {
      dispatch(placeRequest(search));
    } catch (err) {
      console.log("Home - onSearch - error :: ", err);
    }
  };

  useEffect(() => {
    if (search.length > 0) onSearch();
  }, [search]);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleAutocompleteChange = (event, value) => {
    try {
      console.log(value);
      if (value) setHistory([value, ...history]);
    } catch (err) {
      console.log("Home - handleAutocompleteChange - error ", err);
    }
  };

  return (
    <Grid container xs={12}>
      <MyDrawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        data={history}
      />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
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
                />
              )}
              onInputChange={(e, value) => {
                setSearch(value);
              }}
              onChange={handleAutocompleteChange}
            />
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Home;
