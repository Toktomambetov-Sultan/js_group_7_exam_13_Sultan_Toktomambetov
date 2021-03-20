import { Box, Button } from "@material-ui/core";
import React from "react";
import config from "../../../config";
import ImageGallery from "react-image-gallery";

const PhotoGallery = ({ photos, user, onAdd }) => {
  const items = [
    ...photos.map((item) => ({
      original: config.ImageUrl + item.image,
      thumbnail: config.ImageUrl + item.image,
    })),
  ];
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
      <ImageGallery items={[...items]} />
    </div>
  );
};

export default PhotoGallery;
