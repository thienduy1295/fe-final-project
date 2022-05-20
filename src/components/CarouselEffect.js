import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ImageOne from "../images/newCollections/hero_image.jpg";
import ImageTwo from "../images/newCollections/house-1.png";
import ImageThree from "../images/newCollections/house-2.png";
import ImageFour from "../images/newCollections/house-3.png";
import ImageFive from "../images/newCollections/house-4.png";
import { CardMedia } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 1,
    imgPath: ImageOne,
  },
  {
    label: 2,
    imgPath: ImageTwo,
  },
  {
    label: 3,
    imgPath: ImageThree,
  },
  {
    label: 4,
    imgPath: ImageFour,
  },
];

function CarouselEffect() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <AutoPlaySwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {images.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) <= 2 ? (
            <CardMedia
              component="img"
              height="300"
              src={step.imgPath}
              alt={step.label}
            />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
  );
}

export default CarouselEffect;
