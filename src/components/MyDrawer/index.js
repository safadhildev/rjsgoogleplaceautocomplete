import React from "react";
import {
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import {
  ArrowBack,
  ArrowBackIos,
  ChevronLeft,
  Close,
  Menu,
} from "@material-ui/icons";

const drawerWidth = 380;
const mobileWidth = 280;
const radius = 20;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: "#FFF",
    margin: "0 10px",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderRadius: 10,
    borderBottomLeftRadius: 30,
    [theme.breakpoints.down("xs")]: {
      width: mobileWidth,
      flexShrink: 0,
    },
  },
  drawerWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  drawerSubtitle: {
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    padding: "0px 10px",
    margin: "10px 0",
    borderRadius: 5,
  },

  itemText: {
    fontSize: 14,
    color: "#607D8B",
    cursor: "pointer",
    textOverflow: "ellipsis",
  },
  clearButton: {
    color: "#F44336",
    fontSize: 12,
    textTransform: "capitalize",
    borderColor: "#F44336",
    "&:hover": {
      backgroundColor: "#F44336",
      color: "#FFF",
    },
  },
  emptyWrapper: {
    display: "flex",
    backgroundColor: "#ECEFF1",
    borderRadius: radius,
    padding: 5,
    marginTop: 20,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyText: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  locationButton: {
    margin: "20px 0 0 0",
    background: "#212121",
    color: "#FFF",
    borderRadius: radius,
    textTransform: "capitalize",
    "&:hover": {
      background: "#212121",
      color: "#FFF",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    color: "#B0BEC5",
  },
}));

const MyDrawer = ({
  open,
  onClose,
  data,
  onClearHistory,
  onRemoveItem,
  onSelectItem,
  onGetCurrentLocation,
}) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className={classes.drawerWrapper}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>

        <Card
          style={{
            margin: "10px 0",
            padding: "15px",
            borderRadius: radius,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="p" className={classes.title}>
                Places Autocomplete
              </Typography>
              <Typography variant="p" className={classes.description}>
                Created by Syed Ahmad Fadhil Bin Syed Hassan
              </Typography>
            </div>
            <IconButton
              onClick={onClose}
              style={{ width: 35, height: 35, margin: "-5px -10 0 0" }}
            >
              <ArrowBackIos />
            </IconButton>
          </div>

          <Button
            variant="contained"
            fullWidth
            className={classes.locationButton}
            onClick={onGetCurrentLocation}
          >
            Get My Current Location
          </Button>
        </Card>

        <Card
          style={{
            margin: "20px 0",
            padding: "15px",
            borderRadius: radius,
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="p" className={classes.drawerSubtitle}>
              Recent
            </Typography>
            <Button
              variant="outlined"
              size="small"
              className={classes.clearButton}
              onClick={onClearHistory}
              disabled={data?.length === 0}
            >
              Clear All
            </Button>
          </div>

          <List
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "scroll",
            }}
          >
            {data?.length > 0 ? (
              data?.map((item, index) => (
                <ListItem className={classes.item}>
                  <div
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      noWrap
                      className={classes.itemText}
                      onClick={() => {
                        onSelectItem(item);
                      }}
                    >
                      {item?.description}
                    </Typography>
                  </div>
                  <IconButton
                    onClick={() => {
                      onRemoveItem(index);
                    }}
                  >
                    <Close />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <div className={classes.emptyWrapper}>
                <Typography variant="p" className={classes.emptyText}>
                  No Item
                </Typography>
              </div>
            )}
          </List>
        </Card>
      </div>
      {/* <div
        style={{
          height: "100%",
          backgroundColor: "transparent",
          width: "100%",
        }}
        onClick={onClose}
      ></div> */}
    </SwipeableDrawer>
  );
};

export default MyDrawer;
