import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2} bgcolor="#eceff4">
      <Box margin={"auto"} width="100%" height={"60vh"} padding={2} borderRadius={2} overflow="hidden" boxShadow={2}>
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"} fontWeight="bold" color="#2b2d42">
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        {movies &&
          movies
            .slice(0, 10)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="contained"
          sx={{ margin: "auto", bgcolor: "#3a3d5c", color: "white", "&:hover": { bgcolor: "#292b44" } }}
        >
          View All Movies
        </Button>
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h5" textAlign={"center"} fontWeight="bold" color="#2b2d42">
          More Movies You Might Like
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        {movies &&
          movies
            .slice(10, 16)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
    </Box>
  );
};

export default HomePage;
