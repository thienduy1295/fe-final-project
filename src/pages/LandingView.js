import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import GlobalStyle from "./globalStyles";

import InfoSection from "../components/InfoSection";
import Hero from "../components/Hero";
import { SliderData } from "../data/SliderData";
import { InfoData, InfoDataTwo } from "../data/InfoData";
import Dropdown from "../components/Dropdown";

function LandingView() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Hero slides={SliderData} />
      <InfoSection {...InfoData} />
    </>
  );
}

export default LandingView;
