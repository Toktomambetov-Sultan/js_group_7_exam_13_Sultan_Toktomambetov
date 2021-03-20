import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CafeItem from "../../components/Cafe/Item/CafeItem";
import {
  getOneCafe,
  clearCurrentCafe,
} from "../../store/cafe/cafeActions";
import {
  getPhotos,
  postPhoto,
  setCurrentPhoto,
} from "../../store/photo/photoActions";
import "react-image-gallery/styles/css/image-gallery.css";
import PhotoGallery from "../../components/Photo/PhotoGallery/PhotoGallery";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PhotoForm from "../../components/Photo/PhotoForm/PhotoForm";
import Reviews from "../Reviews/Reviews";

const OneCafePage = ({ match }) => {
  const dispatch = useDispatch();
  const { id: cafeId } = match.params;
  useEffect(() => {
    dispatch(getOneCafe(cafeId));
    return () => {
      dispatch(clearCurrentCafe());
    };
  }, [dispatch, cafeId]);
  useEffect(() => {
    dispatch(getPhotos(cafeId));
  }, [dispatch, cafeId]);

  const cafe = useSelector(
    (state) => state.cafe.currentCafe
  );
  const { photos, currentPhoto } = useSelector(
    (state) => state.photo
  );
  const { errors } = useSelector((state) => state.main);
  const user = useSelector((state) => state.user.user);
  const onAddPhoto = () => {
    dispatch(push(`/cafe-list/${cafeId}/add-photo`));
  };
  const onPhotoChange = (event) => {
    let { value, name, files } = event.target;
    if (files[0]) {
      value = files[0];
      dispatch(
        setCurrentPhoto({ ...currentPhoto, [name]: value })
      );
    }
  };
  const onPhotoShare = (event) => {
    event.preventDefault();
    dispatch(postPhoto({ data: currentPhoto, id: cafeId }));
  };
  return (
    <div>
      <CafeItem cafe={cafe} single />
      <PhotoGallery
        onAdd={onAddPhoto}
        photos={photos}
        user={user}
      />
      <Route path="/cafe-list/:id/add-photo" exact>
        <PhotoForm
          photo={currentPhoto}
          onChange={onPhotoChange}
          errors={errors}
          onSubmit={onPhotoShare}
          onClose={() =>
            dispatch(push(`/cafe-list/${cafeId}`))
          }
        />
      </Route>
      <Reviews id={cafeId} />
    </div>
  );
};

export default OneCafePage;
