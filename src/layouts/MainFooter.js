import { Stack, Typography, Box, Link } from "@mui/material";
import React from "react";
import LogoLandingView from "../components/LogoLandingView";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { styled } from "@mui/material/styles";

const FooterWrapStyle = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "#404040",
  color: "white",
  padding: 15,
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",

    alignItems: "center",
  },
}));

function MainFooter() {
  return (
    <Box>
      <FooterWrapStyle>
        {/* <Stack
          direction="row"
          sx={{
            color: "white",
            backgroundColor: "primary.main",
          }}
          justifyContent="space-between"
          p={3}
          mt={3}
        > */}
        <Stack>
          <Stack direction="row" spacing={5}>
            <Stack>
              <Typography>Studio</Typography>
              <Typography>Portfolio</Typography>
              <Typography>Team</Typography>
              <Typography>Culture</Typography>
              <Typography>Media</Typography>
              <Typography>Contact</Typography>
            </Stack>
            <Stack spacing={2}>
              <Stack>
                <Typography variant="body2">Ho Chi Minh</Typography>
                <Typography variant="body2" color="primary.lighter">
                  +84 2839103199
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-end">
          <Stack>
            <LogoLandingView sx={{ width: "200px" }} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography alignSelf="center">Follow us on:</Typography>
            <Stack direction="row" spacing={1}>
              <Link href="#" sx={{ color: "#FFCB05", fontSize: "30px" }}>
                <TwitterIcon />
              </Link>
              <Link href="#" sx={{ color: "#FFCB05", fontSize: "30px" }}>
                <LinkedInIcon />
              </Link>
              <Link href="#" sx={{ color: "#FFCB05", fontSize: "30px" }}>
                <YouTubeIcon />
              </Link>
              <Link href="#" sx={{ color: "#FFCB05", fontSize: "30px" }}>
                <PinterestIcon />
              </Link>
              <Link href="#" sx={{ color: "#FFCB05", fontSize: "30px" }}>
                <FacebookRoundedIcon />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </FooterWrapStyle>
    </Box>
  );
}

export default MainFooter;
