import React, { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import PropTypes from "prop-types";

export const WorkersTable = ({ workers, onEdit, onDelete, onViewDetails }) => {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredWorkers = workers.filter((worker) => {
    return (
      (!selectedPosition || worker.position === selectedPosition) &&
      (!searchName || worker.name.toLowerCase().includes(searchName.toLowerCase()))
    );
  });

  const paginatedWorkers = filteredWorkers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card sx={{ overflow: "hidden", boxShadow: 3, borderRadius: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          placeholder="Buscar por nombre"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={handleSearchChange}
          sx={{ flex: "1 1 auto", maxWidth: "300px" }}
        />
        <FormControl sx={{ flex: "1 1 auto", maxWidth: "300px" }}>
          <Select
            value={selectedPosition}
            onChange={handlePositionChange}
            displayEmpty
            size="small"
            placeholder="Filtrar por cargo"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="WorkshopHead">Encargado de Taller</MenuItem>
            <MenuItem value="LatheOperator">Operador de Torno</MenuItem>
            <MenuItem value="CylinderHeadSpecialist">Especialista en Culatas</MenuItem>
            <MenuItem value="CrankshaftTechnician">Técnico de Cigüeñales</MenuItem>
            <MenuItem value="ConnectingRodSpecialist">Especialista en Bielas</MenuItem>
            <MenuItem value="Mechanic">Mecánico</MenuItem>
            <MenuItem value="Assistant">Asistente</MenuItem>
            <MenuItem value="Manager">Gerente</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Nombre</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Apellidos</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Dirección</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Cargo</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Cédula</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Teléfono</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkers.map((worker) => (
                <TableRow
                  hover
                  key={worker.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{worker.name}</TableCell>
                  <TableCell>{worker.lastName}</TableCell>
                  <TableCell>{worker.address}</TableCell>
                  <TableCell>{worker.position}</TableCell>
                  <TableCell>{worker.idNumber}</TableCell>
                  <TableCell>{worker.phone}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="flex-start">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => onViewDetails(worker)}
                        sx={{
                          width: 40,
                          height: 40,
                          minWidth: 0,
                          borderRadius: "8px",
                          padding: "0",
                          backgroundColor: "#6A5ACD", // Violeta
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            backgroundColor: "#483D8B", // Más oscuro al hover
                          },
                        }}
                      >
                        <Visibility />
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => onEdit(worker)}
                        sx={{
                          width: 40,
                          height: 40,
                          minWidth: 0,
                          borderRadius: "8px",
                          padding: "0",
                          backgroundColor: "#2196F3", // Azul
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            backgroundColor: "#1976D2", // Azul más oscuro
                          },
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => onDelete(worker.id)}
                        sx={{
                          width: 40,
                          height: 40,
                          minWidth: 0,
                          borderRadius: "8px",
                          padding: "0",
                          backgroundColor: "#F44336", // Rojo
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            backgroundColor: "#D32F2F", // Rojo más oscuro
                          },
                        }}
                      >
                        <Delete />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredWorkers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
          labelRowsPerPage="Filas por página"
        />
      </Box>
    </Card>
  );
};

WorkersTable.propTypes = {
  workers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      idNumber: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func,
};
