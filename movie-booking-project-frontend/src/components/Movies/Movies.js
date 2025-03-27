import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4} textAlign="center" bgcolor="#f5f5f5" color="black" minHeight="100vh" paddingBottom={5}>
      <Card sx={{ maxWidth: 600, margin: "auto", borderRadius: 4, boxShadow: 3, bgcolor: "#ffffff" }}>
        <CardContent>
          <Typography variant="h4" color="black" fontWeight="bold">
            All Movies
          </Typography>
        </CardContent>
      </Card>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display="flex"
        justifyContent="center"
        flexWrap={"wrap"}
        gap={3}
      >
        {movies &&
          movies.map((movie, index) => (
            <Card 
              key={index} 
              sx={{ 
                maxWidth: 250, 
                borderRadius: 4, 
                boxShadow: 3, 
                bgcolor: "#ffffff", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease", 
                '&:hover': { transform: "scale(1.05)", boxShadow: 6, cursor: "pointer" } 
              }}
            >
              <CardMedia
                component="img"
                height="350"
                image={movie.posterUrl || "https://source.unsplash.com/250x350/?movie,cinema"}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="black">{movie.title}</Typography>
                <Typography variant="body2" color="gray">
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        {["The Dark Knight", "Avatar", "Interstellar", "Titanic", "The Matrix", "Gladiator", "The Godfather", "Jurassic Park"].map((title, index) => (
          <Card 
            key={index + 100} 
            sx={{ 
              maxWidth: 250, 
              borderRadius: 4, 
              boxShadow: 3, 
              bgcolor: "#ffffff", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease", 
              '&:hover': { transform: "scale(1.05)", boxShadow: 6, cursor: "pointer" } 
            }}
          >
            <CardMedia
              component="img"
              height="350"
              image={`https://source.unsplash.com/250x350/?${title.replace(/ /g, "")},movie`}
              alt={`${title} Poster`}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="black">{title}</Typography>
              <Typography variant="body2" color="gray">
                Release Date: {new Date("2000-01-01").toDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Movies;
