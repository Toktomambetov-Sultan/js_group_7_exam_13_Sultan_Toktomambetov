import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React from "react";
import FileInput from "../../UI/Form/FileInput";
 
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
 
const PhotoForm = ({ onSubmit, onChange, errors,onClose }) => {
  const classes = useStyles();
  return (
    <Modal
      open={true}
      onClose={onClose}
      className={classes.modal}
    >
      <Box bgcolor="white" padding="20px">
        <Container>
          <Box mb="40px">
            <Typography variant="h5">
              Share photo
            </Typography>
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
    </Modal>
  );
};

export default PhotoForm;
