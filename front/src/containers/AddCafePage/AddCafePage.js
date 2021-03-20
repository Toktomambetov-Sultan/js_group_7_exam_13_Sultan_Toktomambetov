import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeForm from "../../components/Cafe/Form/CafeForm";
import {
  postCurrentCafe,
  setCurrentCafe,
} from "../../store/cafe/cafeActions";
import { clearErrors } from "../../store/main/mainActions";

const AddCafePage = () => {
  const dispatch = useDispatch();
  const cafe = useSelector(
    (state) => state.cafe.currentCafe
  );
  const errors = useSelector((state) => state.main.errors);
  const onChange = (event) => {
    let { value, name, files } = event.target;

    if (name === "image") {
      value = files[0];
    }
    dispatch(clearErrors());
    dispatch(setCurrentCafe({ ...cafe, [name]: value }));
  };
  useEffect(() => {
    return () => dispatch(clearErrors());
  }, [dispatch]);

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
        errors={errors}
      />
    </div>
  );
};

export default AddCafePage;
