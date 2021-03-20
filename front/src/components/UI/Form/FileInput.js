import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
});

const FileInput = ({
  onChange,
  name,
  label,
  id,
  error,
}) => {
  const classes = useStyles();
  const inputRef = useRef();
  const [filename, setFilename] = useState("");

  const activateInput = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        id={id}
        name={name}
        ref={inputRef}
        className={classes.input}
        onChange={onFileChange}
      />
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Grid item xs>
          <TextField
            variant="outlined"
            fullWidth
            label={label}
            value={filename}
            error={!!error}
            disabled={!error && true}
            helperText={error}
            onClick={activateInput}
          />
        </Grid>
        <Button variant="contained" onClick={activateInput}>
          Browse
        </Button>
      </Grid>
    </>
  );
};

export default FileInput;
