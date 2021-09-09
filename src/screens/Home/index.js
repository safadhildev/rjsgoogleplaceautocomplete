import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { placeRequest } from "../../providers/actions/Place";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

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

  return (
    <Grid container xs={12} justifyContent="center" style={{ padding: 20 }}>
      <Grid>
        <Autocomplete
          id="combo-box-demo"
          options={predictions}
          getOptionLabel={(option) => option.description}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
          onInputChange={(e, value) => {
            setSearch(value);
          }}
          onChange={(e, val) => {
            console.log(val);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
