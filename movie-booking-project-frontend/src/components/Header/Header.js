import { AppBar, Toolbar, Box, Tabs, Tab, Autocomplete, TextField } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";

const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#d3d3d3", color: "black" }}>
      <Toolbar>
        <Box width="15%">
          <Link to="/" style={{ color: "black", textDecoration: "none", display: "flex", alignItems: "center" }}>
            <MovieCreationIcon sx={{ marginRight: 1 }} />
            Home
          </Link>
        </Box>
        <Box width="50%" marginRight="auto" marginLeft="auto">
          <Autocomplete
            onChange={handleChange}
            sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "black" },
                  bgcolor: "#ffffff",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Movies"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >
            <Tab to="/" LinkComponent={NavLink} label="Home" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab to="/auth" LinkComponent={NavLink} label="Auth" />
                <Tab to="/admin" LinkComponent={NavLink} label="Admin" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="User" />
                <Tab
                  onClick={() => dispatch(userActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/profile" label="Profile" />
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab
                  onClick={() => dispatch(adminActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;