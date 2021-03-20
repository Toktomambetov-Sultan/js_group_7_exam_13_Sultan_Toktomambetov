import {
  Box,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import FileInput from "../../UI/Form/FileInput";
import FormElement from "../../UI/Form/FormElement";

const CafeForm = ({ cafe, onChange, title, onSubmit }) => {
  return (
    <div>
      <Box mb="40px">
        <Typography variant="h5">{title}</Typography>
      </Box>
      <form noValidate onSubmit={onSubmit}>
        <Grid direction="column" spacing={2} container>
          <FormElement
            label="Title"
            value={cafe.title}
            name="title"
            required
            onChange={onChange}
          />
          <FormElement
            label="Description"
            value={cafe.description}
            name="description"
            multiline
            rows={3}
            required
            onChange={onChange}
          />
          <FileInput onChange={onChange} name="image" />
          <div>
            <p>Do you agree to Privacy Policy:</p>
            <Grid
              item
              container
              alignItems="center"
              wrap="nowrap"
            >
              <FormElement
                value={cafe.checkbox}
                name="checkbox"
                checkbox
                required
                onChange={onChange}
              />
              <Typography variant="subtitle1">
                I agree
              </Typography>
            </Grid>
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default CafeForm;
