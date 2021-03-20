import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../../components/Review/ReviewForm/ReviewForm";
import ReviewItem from "../../components/Review/ReviewItem/ReviewItem";
import {
  clearCurrentReview,
  getReviews,
  postReview,
  setCurrentReview,
} from "../../store/review/reviewAction";

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
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setCurrentReview({ ...currentReview, [name]: value })
    );
  };
  const onRateChange = (rates) => {
    dispatch(setCurrentReview({ ...currentReview, rates }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview({ id, data: currentReview }));
    dispatch(clearCurrentReview());
  };
  return (
    <div className={classes.inner}>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
      <ReviewForm
        review={currentReview}
        onChange={onChange}
        onSubmit={onSubmit}
        onRateChange={onRateChange}
      />
    </div>
  );
};

export default Reviews;
