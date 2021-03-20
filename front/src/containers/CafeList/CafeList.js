import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCafeList } from "../../store/cafe/cafeActions";

const CafeList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cafe);
  useEffect(() => {
    dispatch(getCafeList());
  }, [dispatch]);
  console.log(state.cafeList);
  return <div>I am here</div>;
};

export default CafeList;
