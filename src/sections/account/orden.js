import {
  Box,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { getOrdenesTrabajo } from "src/services/ordenes/getOrdenesTrabajo";

export const Orden = ({ searchQuery }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrdenesTrabajo();
        setOrdenes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Oculta el indicador de carga
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit order with ID: ${id}`);
    // Aquí puedes agregar la lógica para editar
  };

  const handleDelete = (id) => {
    console.log(`Delete order with ID: ${id}`);
    // Aquí puedes agregar la lógica para eliminar
  };
  const filteredOrdenes = ordenes
  .filter((orden) =>
    orden.cliente.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .reverse() ;


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Marca de motor</TableCell>
                <TableCell>Numero de motor</TableCell>
                <TableCell>Fecha de Creacion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrdenes.length > 0 ? (
                filteredOrdenes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((orden) => (
                    <TableRow hover key={orden.id}>
                      <TableCell>{orden.cliente}</TableCell>
                      <TableCell>{orden.marcaMotor}</TableCell>
                      <TableCell>{orden.numeroMotor}</TableCell>
                      <TableCell>
                        {format(new Date(orden.fechaCreacion), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell sx={{ display: "flex", gap: `5px` }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(orden.id)}
                          sx={{ marginRight: 1 }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(orden.id)}
                          sx={{ marginRight: 1 }}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6" color="textSecondary">
                      No se encontraron datos
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Intenta ajustar el filtro o agregar nuevas órdenes.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {filteredOrdenes.length > 0 && (
        <TablePagination
          component="div"
          count={filteredOrdenes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
};
