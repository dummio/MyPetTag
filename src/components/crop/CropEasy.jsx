import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
// import { useAuth } from "../../context/AuthContext";
import getCroppedImg from "./utils/cropImage";
import "./CropEasy.css";

const CropEasy = ({
  photoURL,
  openCrop,
  setOpenCrop,
  setPhotoURL,
  setImage,
}) => {
  //   const { setAlert, setLoading } = useAuth();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    // setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setImage(file);
      setOpenCrop(false);
    } catch (error) {
      //   setAlert({
      //     isAlert: true,
      //     severity: "error",
      //     message: error.message,
      //     timeout: 5000,
      //     location: "modal",
      //   });
      console.log(error);
    }

    // setLoading(false);
  };
  return (
    <>
      {openCrop ? (
        <div className="overlay-container">
          <div className="crop-container">
            <DialogContent className="crop-container-options">
              <Cropper
                image={photoURL}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
              />
            </DialogContent>
            <DialogActions className="crop-container-settings">
              <Box className="crop-container-buttons">
                <Box>
                  <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                  <Slider
                    style={{
                      color: "#0f5738",
                    }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={zoomPercent}
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </Box>
                <Box>
                  <Typography>Rotation: {rotation + "°"}</Typography>
                  <Slider
                    style={{
                      color: "#0f5738",
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                <Button
                  style={{ backgroundColor: "#0f5738", borderRadius: "12px" }}
                  variant="contained"
                  startIcon={<Cancel />}
                  onClick={() => setOpenCrop(false)}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#0f5738", borderRadius: "12px" }}
                  variant="contained"
                  startIcon={<CropIcon />}
                  onClick={cropImage}
                >
                  Crop
                </Button>
              </Box>
            </DialogActions>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
