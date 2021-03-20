import {
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeItem from "../../components/Cafe/Item/CafeItem";
import {
  deleteOneCafe,
  getCafeList,
} from "../../store/cafe/cafeActions";

const CafeList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cafe);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getCafeList());
  }, [dispatch]);
  const onImageClick = (id) => {
    dispatch(push(`/cafe-list/${id}`));
  };
  const deleteCafe = (id) => {
    dispatch(deleteOneCafe(id));
  };
  return (
    <Container>
      <Typography variant="h5">List of cafes</Typography>
      {state.cafeList.length ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
        >
          {state.cafeList.map((cafe) => (
            <CafeItem
              cafe={cafe}
              key={cafe._id}
              user={user}
              onImageClick={() => onImageClick(cafe._id)}
              onDelete={() => deleteCafe(cafe._id)}
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
