import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const UnAuthorized: React.FC = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ textAlign: "center", mt: 5 }}
    >
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          403 - Unauthorized Access
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          You do not have permission to view this page.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default UnAuthorized;
