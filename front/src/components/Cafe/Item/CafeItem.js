import {
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Rating from "react-rating";
import React from "react";
import config from "../../../config";
const useStyles = makeStyles((theme) => ({
  inner: {
    margin: "10px",
    padding: "10px",
    width: "300px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    cursor: "pointer"
  },
}));
const CafeItem = ({ cafe, user }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Paper elevation={3} className={classes.inner}>
        <Typography variant="h5">{cafe.title}</Typography>
        <img
          onClick={(e) => console.log("Image")}
          className={classes.image}
          src={config.ImageUrl + cafe.image}
          alt={cafe.title}
        />
        <Rating
          readonly={!user?.token}
          initialRating={cafe.rate * 5}
          emptySymbol={<StarOutlineIcon />}
          fullSymbol={<StarIcon />}
          placeholderSymbol={<StarHalfIcon />}
        />
        <Typography variant="subtitle1">
          ({+cafe.reviews} reviews)
        </Typography>
        <Typography variant="subtitle2">
          <Grid
            container
            alignItems="center"
            justify="center"
          >
            <PhotoCameraIcon fontSize="small" />
            <>{+cafe.totalPhoto} photos</>
          </Grid>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default CafeItem;
