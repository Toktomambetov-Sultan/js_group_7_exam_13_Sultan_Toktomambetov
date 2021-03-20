import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeForm from "../../components/Cafe/Form/CafeForm";
import {
  postCurrentCafe,
  setCurrentCafe,
} from "../../store/cafe/cafeActions";

const AddCafePage = () => {
  const dispatch = useDispatch();
  const cafe = useSelector(
    (state) => state.cafe.currentCafe
  );
  const onChange = (event) => {
    let { value, name, files } = event.target;
    if (name === "image") {
      value = files[0];
    }

    dispatch(setCurrentCafe({ ...cafe, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(postCurrentCafe(cafe));
  };
  return (
    <div>
      <CafeForm
        title="Register new cafe"
        onChange={onChange}
        onSubmit={onSubmit}
        cafe={cafe}
      />
    </div>
  );
};

export default AddCafePage;
