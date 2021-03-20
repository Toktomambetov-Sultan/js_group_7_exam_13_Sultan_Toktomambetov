import React from "react"; import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import Rating from "react-rating";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inner: {
    borderBottom: "1px solid lightgreen",
    marginBottom: "5px",
    paddingLeft: "15px",
    "&.active": { borderLeft: "5px solid red" },
  },
}));
const ReviewAssessment = ({
  rates,
  rateKey,
  readonly,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      className={`${classes.inner} ${
        rateKey === "total" && "active"
      }`}
      alignItems="center"
    >
      <span>{rateKey}:</span>
      <Rating
        readonly={readonly}
        initialRating={rates[rateKey] * 5}
        emptySymbol={<StarOutlineIcon />}
        fullSymbol={<StarIcon />}
        onChange={onChange}
        placeholderSymbol={<StarHalfIcon />}
      />
    </Grid>
  );
};

export default ReviewAssessment;
