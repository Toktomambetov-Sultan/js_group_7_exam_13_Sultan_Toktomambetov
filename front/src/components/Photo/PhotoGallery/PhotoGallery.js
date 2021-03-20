import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import config from "../../../config";
import ImageGallery from "react-image-gallery";

const PhotoGallery = ({
  photos,
  user,
  onAdd,
  onDelete,
}) => {
  const items = [
    ...photos.map((item) => ({
      original: config.ImageUrl + item.image,
      thumbnail: config.ImageUrl + item.image,
    })),
  ];
  const [currentPhotoId, setCurrentPhotoId] = useState(0);
  return (
    <div>
      {user?.token && (
        <Box pb="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={onAdd}
            fullWidth
          >
            Add new photo
          </Button>
        </Box>
      )}
      {photos.length ? (
        <ImageGallery
          items={[...items]}
          onSlide={setCurrentPhotoId}
        />
      ) : null}
      {user?.token && user.role === "admin" && !!photos.length && (
        <Box pb="10px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              onDelete(photos[currentPhotoId]._id)
            }
            fullWidth
          >
            remove this photo
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PhotoGallery;
