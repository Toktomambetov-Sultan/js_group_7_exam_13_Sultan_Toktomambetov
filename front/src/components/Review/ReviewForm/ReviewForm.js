import {
  Box,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import FormElement from "../../UI/Form/FormElement";
import ReviewAssessment from "../ReviewItem/ReviewAssessment/ReviewAssessment";

const ReviewForm = ({
  review,
  onChange,
  onRateChange,
  onSubmit,
  errors,
}) => {
  const onRateChangeLocal = (num, name) => {
    onRateChange &&
      onRateChange({ ...review.rates, [name]: +num / 5 });
  };
  return (
    <div>
      <Typography variant="h4">Share review</Typography>
      <form noValidate onSubmit={onSubmit}>
        <Grid container>
          <FormElement
            multiline
            rows={3}
            label="Text"
            name="text"
            value={review.text}
            onChange={onChange}
            error={errors?.text}
          />
          {Object.keys(review.rates)?.map((rateKey) => (
            <ReviewAssessment
              key={rateKey}
              rateKey={rateKey}
              rates={review.rates}
              onChange={(num) =>
                onRateChangeLocal(num, rateKey)
              }
            />
          ))}
          <Box textAlign="center" pt={2} width="100%">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default ReviewForm;
