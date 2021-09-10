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
  Directions,
  Menu,
} from "@material-ui/icons";

const drawerWidth = 380;
const mobileWidth = 280;
const radius = 20;

const useStyles = makeStyles((theme) => ({
  backWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#212121",
    padding: "10px",
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
  },
  buttonWrapper: {
    padding: 10,
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
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
  description: {
    fontSize: 12,
    color: "#B0BEC5",
  },
  disabledButton: {
    color: "#FFF",
  },
  drawerPaper: {
    display: "flex",
    flex: 1,
    flexDirections: "column",
    backgroundColor: "transparent",
    width: mobileWidth,
    boxShadow: "none",
    flexShrink: 0,
    margin: "60px 5px 5px 5px",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 1,
      flex: 1,
      margin: "90px 10px 10px 10px",
    },
  },
  drawerWrapper: { overflow: "hidden" },
  drawerSubtitle: {
    fontWeight: "bold",
  },
  emptyWrapper: {
    display: "flex",
    backgroundColor: "#ECEFF1",
    borderRadius: radius,
    padding: 5,
    margin: "20px 0 40px 0",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyText: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    padding: "0px 10px",
    margin: "5px 0",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    color: "#607D8B",
    cursor: "pointer",
    textOverflow: "ellipsis",
  },
  listWrapper: {
    maxHeight: 300,
    overflowY: "auto",
    margin: "0",
    padding: "10px",
    backgroundColor: "#FFF",
    [theme.breakpoints.up("sm")]: {
      maxHeight: 400,
      padding: "20px",
    },
  },
  locationButton: {
    margin: "20px 0 0 0",
    background: "#212121",
    color: "#FFF",
    borderRadius: 10,
    textTransform: "capitalize",
    "&:hover": {
      background: "#424242",
      color: "#FFF",
    },
  },
  recentHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#212121",
    padding: "10px",
    color: "#FFF",
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "10px 15px",
    [theme.breakpoints.up("sm")]: {
      padding: "10px 20px",
    },
  },
  topWrapper: {
    backgroundColor: "#FFF",
    boxShadow: "none",
    borderRadius: 10,
    overflow: "hidden",
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
      hideBackdrop={true}
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
        <div className={classes.topWrapper}>
          <div className={classes.recentHeaderWrapper}>
            <Typography className={classes.title}>
              Places Autocomplete
            </Typography>
            <IconButton
              onClick={onClose}
              style={{
                color: "#FFF",
                width: 30,
                height: 30,
                margin: "-5px -10 0 0",
              }}
            >
              <ArrowBackIos />
            </IconButton>
          </div>
          <div className={classes.titleWrapper}>
            <Typography className={classes.description}>Created by</Typography>
            <Typography className={classes.description}>
              Syed Ahmad Fadhil Bin Syed Hassan
            </Typography>
          </div>

          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              fullWidth
              className={classes.locationButton}
              onClick={onGetCurrentLocation}
            >
              Get My Current Location
            </Button>
          </div>
        </div>

        <div
          style={{
            margin: "20px 0 0 0",
            backgroundColor: "#FFF",
            boxShadow: "none",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div className={classes.recentHeaderWrapper}>
            <Typography className={classes.drawerSubtitle}>Recent</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={onClearHistory}
              disabled={data?.length === 0}
              classes={{
                root: classes.clearButton,
              }}
            >
              Clear All
            </Button>
          </div>

          <List className={classes.listWrapper}>
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
                <Typography className={classes.emptyText}>No Item</Typography>
              </div>
            )}
          </List>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default MyDrawer;
