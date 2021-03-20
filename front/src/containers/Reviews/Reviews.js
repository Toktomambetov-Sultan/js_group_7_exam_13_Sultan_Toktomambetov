import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewItem from "../../components/Review/ReviewItem/ReviewItem";
import { getReviews } from "../../store/review/reviewAction";

const useStyles = makeStyles((theme) => ({
  inner: {
    borderTop: "2px solid grey",
    paddingTop: "20px",
  },
}));

const Reviews = ({ id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  const { reviews, currentReview } = useSelector(
    (state) => state.review
  );

  return (
    <div className={classes.inner}>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
