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
import axios from "axios";
import ProformaModal from "./ProformaModal";

export const Orden = ({ searchQuery }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrdenesTrabajo();
        setOrdenes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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

  const handleCreateProforma = async (id) => {
    try {
      setButtonLoading(id);
      const response = await axios.get(
        `https://www.tallercenteno.somee.com/api/OrdenTrabajo/${id}`
      );
      setSelectedData(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setButtonLoading(null);
    }
  };

  const filteredOrdenes = ordenes
    .filter((orden) => orden.cliente.toLowerCase().includes(searchQuery.toLowerCase()))
    .reverse();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Card>
      {selectedData && (
        <ProformaModal
          open={open}
          handleClose={() => setOpen(false)}
          data={selectedData}
          id={selectedId}
        />
      )}
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
                      <TableCell>{format(new Date(orden.fechaCreacion), "dd/MM/yyyy")}</TableCell>
                      <TableCell sx={{ display: "flex", gap: `5px` }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setSelectedId(orden.id);
                            handleCreateProforma(orden.id);
                          }}
                          disabled={buttonLoading === orden.id}
                          isLoading={buttonLoading === orden.id}
                          sx={{ marginRight: 1, position: "relative" }}
                        >
                          Crear proforma
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
