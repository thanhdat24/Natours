import React, { Fragment, useEffect } from "react";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Tab,
  Stack,
} from "@mui/material";
import Info from "./Info";

export default function MovieEdit() {
  const breadcrumbs = [
    <Link underline="hover" key="1" href="/" color="text.primary">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      href="/admin/users/list"
      color="text.primary"
    >
      User
    </Link>,
    <Typography key="3" color="inherit">
      Edit user
    </Typography>,
  ];
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={12}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Edit user
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Info />
      </Box>
    </Container>
  );
}
