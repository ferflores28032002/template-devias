"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import axios from "axios";

export const ProformasTable = () => {
  const [proformas, setProformas] = useState([]); // Estado para guardar las proformas
  const [selectedProforma, setSelectedProforma] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Función para obtener las proformas
  const fetchProformas = async () => {
    try {
      const response = await axios.get("https://www.tallercenteno.somee.com/api/Proformas");
      setProformas(response.data);
    } catch (error) {
      console.error("Error al obtener las proformas:", error);
    }
  };

  useEffect(() => {
    fetchProformas(); // Llamar a la función cuando el componente se monte
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetails = (id) => {
    const proforma = proformas.find((item) => item.id === id);
    setSelectedProforma(proforma);
  };

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h5" fontWeight="bold">
          Proformas
        </Typography>
      </Box>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Proforma</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proformas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((proforma) => (
                <TableRow hover key={proforma.id}>
                  <TableCell>{`#${proforma.id}`}</TableCell>
                  <TableCell>{proforma.numeroProforma}</TableCell>
                  <TableCell>{proforma.cliente}</TableCell>
                  <TableCell>{format(new Date(proforma.fechaEmision), "yyyy-MM-dd")}</TableCell>
                  <TableCell
                    sx={{
                      color: proforma.estado === "Pendiente" ? "error.main" : "success.main",
                    }}
                  >
                    {proforma.estado}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetails(proforma.id)}
                      startIcon={
                        <SvgIcon fontSize="small">
                          <EyeIcon />
                        </SvgIcon>
                      }
                      sx={{ marginRight: 1 }}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={proformas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
