import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import axios from "axios";
import { ReparacionesTable } from "src/sections/customer/customers-table";

const fetchReparaciones = async () => {
  const response = await axios.get("https://www.tallercenteno.somee.com/api/Reparaciones");
  return response.data;
};

const useReparaciones = (page, rowsPerPage, data) => {
  return useMemo(() => {
    const startIndex = page * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useReparacionIds = (reparaciones) => {
  return useMemo(() => {
    return reparaciones.map((reparacion) => reparacion.id);
  }, [reparaciones]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const reparaciones = await fetchReparaciones();
      setData(reparaciones);
    };
    fetchData();
  }, [isEditModalOpen]);

  const reparaciones = useReparaciones(page, rowsPerPage, data);
  const reparacionIds = useReparacionIds(reparaciones);
  const reparacionesSelection = useSelection(reparacionIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  return (
    <>
      <Head>
        <title>Reparaciones | Taller Centeno</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <ReparacionesTable
              count={data.length}
              items={reparaciones.map((reparacion) => ({
                ...reparacion,
                fechaEstimadaEntregaColor: reparacion.esFechaPasada ? "red" : "inherit",
              }))}
              onDeselectAll={reparacionesSelection.handleDeselectAll}
              onDeselectOne={reparacionesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={reparacionesSelection.handleSelectAll}
              onSelectOne={reparacionesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={reparacionesSelection.selected}
              setEditModalOpen={setEditModalOpen}
              isEditModalOpen={isEditModalOpen}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
