import {
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeItem from "../../components/Cafe/Item/CafeItem";
import { getCafeList } from "../../store/cafe/cafeActions";

const CafeList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cafe);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getCafeList());
  }, [dispatch]);
  return (
    <Container>
      <Typography variant="h5">List of cafes</Typography>
      {state.cafeList.length ? (
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          {state.cafeList.map((cafe) => (
            <CafeItem
              cafe={cafe}
              key={cafe._id}
              user={user}
            />
          ))}
        </Grid>
      ) : (
        "There is no any cafe"
      )}
    </Container>
  );
};

export default CafeList;
