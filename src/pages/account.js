import { useState } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Unstable_Grid2 as Grid, Stack, SvgIcon } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { Orden } from "src/sections/account/orden";

const Page = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleAddOrderClick = () => {
    setShowProfile(!showProfile); // Cambiar entre mostrar el perfil y la orden
  };

  return (
    <>
      <Head>
        <title>Account | Devias Kit</title>
      </Head>
      <Box component="main">
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12} marginTop="2rem">
                  <Box display="flex" justifyContent="end">
                    <Button
                      startIcon={
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                      onClick={handleAddOrderClick}
                    >
                      Agregar orden de trabajo
                    </Button>
                  </Box>
                  {showProfile ? <AccountProfileDetails /> : <Orden />}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
