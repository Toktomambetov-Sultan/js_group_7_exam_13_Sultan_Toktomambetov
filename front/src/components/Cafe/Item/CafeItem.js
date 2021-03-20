import {
  Box,
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
    maxWidth: "350px",
    height: "auto",
    cursor: "pointer",
  },
}));
const CafeItem = ({
  cafe,
  user,
  onRateChange,
  onImageClick,
  single = "",
}) => {
  const classes = useStyles();
  return (
    <Grid item container justify="space-between">
      <Paper
        elevation={3}
        className={`${classes.inner} ${single && "single"}`}
      >
        <Typography variant="h5">{cafe.title}</Typography>
        <Typography variant="caption">
          created by: {cafe.user?.displayName}
        </Typography>

        {cafe.image && (
          <div>
            <img
              onClick={onImageClick}
              className={classes.image}
              src={config.ImageUrl + cafe.image}
              alt={cafe.title}
            />
          </div>
        )}
        <Rating
          readonly={!user?.token}
          initialRating={cafe.totalRate * 5}
          emptySymbol={<StarOutlineIcon />}
          fullSymbol={<StarIcon />}
          onChange={(num) => onRateChange(num, cafe._id)}
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
      <Grid item>
        <Box fontSize="20px" pt="10px">
          {cafe.description}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CafeItem;
