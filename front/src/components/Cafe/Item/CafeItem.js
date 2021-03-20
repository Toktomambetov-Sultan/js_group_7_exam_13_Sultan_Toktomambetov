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
const CafeItem = ({ cafe, onImageClick, single = "" }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Grid
        container
        justify={single ? "space-between" : "flex-start"}
      >
        <Paper elevation={3} className={classes.inner}>
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
            readonly={true}
            initialRating={cafe?.rates?.total * 5}
            emptySymbol={<StarOutlineIcon />}
            fullSymbol={<StarIcon />}
            placeholderSymbol={<StarHalfIcon />}
          />
          <Typography variant="subtitle1">
            ({+cafe.totalReviews} reviews)
          </Typography>
          <Typography variant="subtitle2">
            <Grid
              container
              alignItems="center"
              justify="center"
            >
              <PhotoCameraIcon fontSize="small" />
              <>{+cafe.totalPhotos} photos</>
            </Grid>
          </Typography>
        </Paper>
        {single && (
          <Grid item>
            <Box fontSize="20px" pt="10px">
              {cafe.description}
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CafeItem;
