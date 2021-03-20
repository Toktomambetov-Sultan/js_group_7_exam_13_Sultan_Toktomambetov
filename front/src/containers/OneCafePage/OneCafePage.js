import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeItem from "../../components/Cafe/Item/CafeItem";
import {
  getOneCafe,
  clearCurrentCafe,
} from "../../store/cafe/cafeActions";

const OneCafePage = ({ match }) => {
  const dispatch = useDispatch();
  const { id: cafeId } = match.params;
  useEffect(() => {
    dispatch(getOneCafe(cafeId));
    return () => {
      dispatch(clearCurrentCafe());
    };
  }, [dispatch, cafeId]);
  const cafe = useSelector(
    (state) => state.cafe.currentCafe
  );
  console.log(cafe);
  return (
    <div>
      <CafeItem cafe={cafe} single />
    </div>
  );
};

export default OneCafePage;
