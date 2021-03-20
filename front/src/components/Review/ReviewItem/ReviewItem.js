import {
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import ReviewAssessment from "./ReviewAssessment/ReviewAssessment";
const useStyles = makeStyles((theme) => ({
  inner: {
    padding: "10px",
  },
  name: {
    fontSize: "18px",
    paddingRight: "15px",
  },
}));
const ReviewItem = ({ review }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.inner} elevation={3}>
      <div>
        <span className={classes.name}>Autor:</span>
        <Typography variant="h6" component="span">
          {review.user.displayName}
        </Typography>
      </div>
      <div>
        <span className={classes.name}>time:</span>
        <Moment format="DD.MM.YYYY HH.mm">
          <Typography variant="subtitle2">
            {review.date}
          </Typography>
        </Moment>
      </div>
      <p>{review.text}</p>
      {Object.keys(review.rates)?.map((rateKey) => (
        <ReviewAssessment
          key={rateKey}
          rateKey={rateKey}
          rates={review.rates}
        />
      ))}
    </Paper>
  );
};

export default ReviewItem;
