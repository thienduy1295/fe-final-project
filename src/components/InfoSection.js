import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Fade from "react-reveal/Fade";
import { Card, Container, Grid, Link, Typography } from "@mui/material";
import {
  InfoData,
  InfoDataFour,
  InfoDataThree,
  InfoDataTwo,
} from "../data/InfoData";

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: 1.4;
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "2" : "1")};

  h1 {
    margin-bottom: 1rem;
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ColumnRight = styled.div`
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "1" : "2")};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    order: ${({ reverse }) => (reverse ? "2" : "1")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen and (max-width: 768px) {
      width: 90%;
      height: 90%;
    }
  }
`;

const InfoSection = ({
  heading,
  paragraphOne,
  paragraphTwo,
  buttonLabel,
  reverse,
  image,
}) => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <Fade bottom>
            <ColumnRight reverse={reverse}>
              <img src={InfoData.image} alt="home" />
            </ColumnRight>
            <ColumnLeft>
              <h1>{InfoData.heading}</h1>
              <p>{InfoData.paragraphOne.slice(0, 100) + "..."}</p>
              <Link href="#" color="primary.light">
                Read more
              </Link>
            </ColumnLeft>
          </Fade>

          <Fade bottom>
            <ColumnRight reverse={reverse}>
              <img src={InfoDataThree.image} alt="home" />
            </ColumnRight>
            <ColumnLeft>
              <h1>{InfoDataThree.heading}</h1>
              <p>{InfoDataThree.paragraphOne.slice(0, 100) + "..."}</p>
              <Link href="#" color="primary.light">
                Read more
              </Link>
            </ColumnLeft>
          </Fade>

          <Fade bottom>
            <ColumnLeft>
              <Typography variant="h4" sx={{ color: "#FFCB05" }}>
                2022 saw the mh architects find new ways of connecting and
                working. Take a lool now...
              </Typography>
            </ColumnLeft>
          </Fade>
        </Grid>
        <Grid item md={6}>
          <Fade bottom>
            <ColumnRight reverse={reverse}>
              <img src={InfoDataTwo.image} alt="home" />
            </ColumnRight>
            <ColumnLeft>
              <h1>{InfoDataTwo.heading}</h1>
              <p>{InfoDataTwo.paragraphOne.slice(0, 100) + "..."}</p>
              <Link href="#" color="primary.light">
                Read more
              </Link>
            </ColumnLeft>
          </Fade>

          <Fade bottom>
            <ColumnRight reverse={reverse}>
              <img src={InfoDataFour.image} alt="home" />
            </ColumnRight>
            <ColumnLeft>
              <h1>{InfoDataFour.heading}</h1>
              <p>{InfoDataFour.paragraphOne.slice(0, 100) + "..."}</p>
              <Link href="#" color="primary.light">
                Read more
              </Link>
            </ColumnLeft>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoSection;
