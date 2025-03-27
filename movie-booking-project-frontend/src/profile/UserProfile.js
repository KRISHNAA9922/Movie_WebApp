import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Box width={"100%"} display="flex" flexDirection="column" alignItems="center" padding={4}>
      {user && (
        <Card sx={{ maxWidth: 400, textAlign: "center", padding: 2, borderRadius: 4, boxShadow: 3 }}>
          <AccountCircleIcon sx={{ fontSize: "6rem", color: "#0077ff" }} />
          <CardContent>
            <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
            <Typography variant="body1" color="textSecondary">{user.email}</Typography>
          </CardContent>
        </Card>
      )}
      {bookings && (
        <Box width={"80%"} marginTop={4}>
          <Typography variant="h4" fontFamily="Verdana" textAlign="center" padding={2} fontWeight="bold">
            Your Bookings
          </Typography>
          <List>
            {bookings.map((booking, index) => (
              <Card key={index} sx={{ marginBottom: 2, borderRadius: 4, boxShadow: 2, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/800x400/?cinema,movie"
                  alt="Movie Poster"
                />
                <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight="bold">Movie: {booking.movie.title}</Typography>
                  <Typography variant="body1">Seat: {booking.seatNumber}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(booking.date).toDateString()}
                  </Typography>
                  <IconButton onClick={() => handleDelete(booking._id)} color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
            <Card sx={{ marginBottom: 2, borderRadius: 4, boxShadow: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="140"
                image="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
                alt="Inception Poster"
              />
              <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" fontWeight="bold">Movie: Inception</Typography>
                <Typography variant="body1">Seat: A12</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date().toDateString()}
                </Typography>
              </CardContent>
            </Card>
          </List>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
