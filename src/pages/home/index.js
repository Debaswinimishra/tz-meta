import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import metaImg from "../../assets/images/meta-whatsapp-cloud-api.jpg";

function Home() {
  const givenName = localStorage.getItem("given_name");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount < 250 ? prevCount + 1 : 250));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const StyledPaper = ({ children }) => (
    <Paper
      style={{
        width: "20%",
        background: "#f3f2ff",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "5%",
        padding: "5%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Paper>
  );

  const HomePage = () => (
    <div>
      <div
        style={{
          fontSize: "30px",
          fontFamily: "serif",
          fontWeight: "bolder",
          display: "grid",
          placeItems: "center",
          marginTop: 5,
        }}
      >
        Hi, {givenName}
      </div>

      <Box
        display="flex"
        flexWrap="wrap"
        margin="5%"
        borderLeft="2px solid rgb(0 0 0 / 6%)"
      >
        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            Total Student
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </StyledPaper>
      </Box>
    </div>
  );

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={metaImg} alt="meta img" width="100%" />
          <Box>
            <Typography variant="body1">
              WhatsApp is one of the most popular messaging apps in the world,
              connecting people across the globe. With the Meta Cloud API, we
              bring a seamless and secure messaging experience right to your
              fingertips.
            </Typography>
            <Typography variant="body1">
              Stay up to date with the latest developments in the world of
              technology and messaging, and explore how the Meta Cloud API can
              take your software development skills to the next level. Enhance
              user interactions, streamline communication, and create innovative
              solutions that keep you at the forefront of the digital landscape.
            </Typography>
            <Typography variant="body1">
              The possibilities are vast, and your skills are the key to
              unlocking them.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <HomePage />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
