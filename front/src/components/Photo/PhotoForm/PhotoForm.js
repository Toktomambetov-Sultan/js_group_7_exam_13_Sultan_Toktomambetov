import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import FileInput from "../../UI/Form/FileInput";

const PhotoForm = ({ onSubmit, onChange, errors }) => {
  return (
    <Box bgcolor="white" padding="20px">
      <Container>
        <Box mb="40px">
          <Typography variant="h5">Share photo</Typography>
        </Box>
        <form noValidate onSubmit={onSubmit}>
          <Grid direction="column" spacing={2} container>
            <Box pb={3}>
              <FileInput
                error={errors?.image}
                onChange={onChange}
                name="image"
              />
            </Box>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default PhotoForm;
