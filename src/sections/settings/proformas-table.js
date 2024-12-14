import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
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
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";

const proformas = [
  { id: 1, numero: "9545", cliente: "Kevin", fecha: "2024-11-30", estado: "Pendiente" },
  { id: 2, numero: "9546", cliente: "Maria", fecha: "2024-12-01", estado: "Completada" },
  { id: 3, numero: "9547", cliente: "Luis", fecha: "2024-12-02", estado: "Pendiente" },
  { id: 4, numero: "9548", cliente: "Ana", fecha: "2024-12-03", estado: "Completada" },
];

export const ProformasTable = ({ handleOpenModal }) => {
  const [ordenes, setOrdenes] = useState(proformas);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Aquí puedes reemplazar esta lógica con una llamada a una API si es necesario
    setOrdenes(proformas);
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetails = (id) => {
    const proforma = ordenes.find((orden) => orden.id === id);
    handleOpenModal(proforma);
  };

  const handleEdit = (id) => {
    console.log(`Editar la proforma #${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar la proforma #${id}?`)) {
      setOrdenes((prev) => prev.filter((orden) => orden.id !== id));
    }
  };

  return (
    <Card>
      <Scrollbar>
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
              {ordenes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((orden) => (
                <TableRow hover key={orden.id}>
                  <TableCell>{`#${orden.id}`}</TableCell>
                  <TableCell>{`#${orden.numero}`}</TableCell>
                  <TableCell>{orden.cliente}</TableCell>
                  <TableCell>{format(new Date(orden.fecha), "yyyy-MM-dd")}</TableCell>
                  <TableCell
                    sx={{
                      color: orden.estado === "Pendiente" ? "error.main" : "success.main",
                    }}
                  >
                    {orden.estado}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetails(orden.id)}
                      sx={{ marginRight: 1 }}
                      startIcon={<SvgIcon fontSize="small">{<EyeIcon />}</SvgIcon>}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleEdit(orden.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(orden.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={ordenes.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
