import {
  Button,
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
    marginBottom: "10px",
    borderBottom: "3px solid blue",
  },
  name: {
    fontSize: "18px",
    paddingRight: "15px",
  },
}));
const ReviewItem = ({ review, onDelete, user }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.inner} elevation={3}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <div>
          <div>
            <span className={classes.name}>Autor:</span>
            <Typography variant="h6" component="span">
              {review.user.displayName}
            </Typography>
          </div>
          <div>
            <span className={classes.name}>time:</span>
            <Moment format="DD.MM.YYYY  HH:mm">
              {review.date}
            </Moment>
          </div>
        </div>
        {user?.role === "admin" && (
          <Button
            color="secondary"
            variant="contained"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </Grid>

      <p>{review.text}</p>
      {Object.keys(review.rates)?.map((rateKey) => (
        <ReviewAssessment
          readonly
          key={rateKey}
          rateKey={rateKey}
          rates={review.rates}
        />
      ))}
    </Paper>
  );
};

export default ReviewItem;
