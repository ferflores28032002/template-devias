import {
  Box,
  Button,
  Card,
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
import { getOrdenesTrabajo } from "src/services/ordenes/getOrdenesTrabajo";

const orders = [
  { marcaMotor: "Honda", numeroMotor: "12345", fechaCreacion: "2024-01-01", cliente: "Juan Pérez" },
  { marcaMotor: "Toyota", numeroMotor: "67890", fechaCreacion: "2024-01-02", cliente: "María López" },
  { marcaMotor: "Ford", numeroMotor: "54321", fechaCreacion: "2024-01-03", cliente: "Carlos Martínez" },
  { marcaMotor: "Chevrolet", numeroMotor: "98765", fechaCreacion: "2024-01-04", cliente: "Ana Gómez" },
  { marcaMotor: "Nissan", numeroMotor: "11223", fechaCreacion: "2024-01-05", cliente: "Luis Rodríguez" },
  { marcaMotor: "Mazda", numeroMotor: "33445", fechaCreacion: "2024-01-06", cliente: "Sofía Hernández" },
  { marcaMotor: "BMW", numeroMotor: "55667", fechaCreacion: "2024-01-07", cliente: "Miguel Torres" },
  { marcaMotor: "Mercedes", numeroMotor: "77889", fechaCreacion: "2024-01-08", cliente: "Lucía Sánchez" },
  { marcaMotor: "Hyundai", numeroMotor: "99000", fechaCreacion: "2024-01-09", cliente: "Jorge Romero" },
  { marcaMotor: "Kia", numeroMotor: "11122", fechaCreacion: "2024-01-10", cliente: "Elena Ruiz" },
  { marcaMotor: "Volkswagen", numeroMotor: "23334", fechaCreacion: "2024-01-11", cliente: "Pedro Vega" },
  { marcaMotor: "Audi", numeroMotor: "45566", fechaCreacion: "2024-01-12", cliente: "Clara Blanco" },
  { marcaMotor: "Renault", numeroMotor: "67788", fechaCreacion: "2024-01-13", cliente: "Fernando Ortiz" },
  { marcaMotor: "Peugeot", numeroMotor: "89900", fechaCreacion: "2024-01-14", cliente: "Natalia Cruz" },
  { marcaMotor: "Subaru", numeroMotor: "12321", fechaCreacion: "2024-01-15", cliente: "Raúl Jiménez" },
  { marcaMotor: "Tesla", numeroMotor: "34543", fechaCreacion: "2024-01-16", cliente: "Paula Rivas" },
  { marcaMotor: "Jaguar", numeroMotor: "56765", fechaCreacion: "2024-01-17", cliente: "Andrés Molina" },
  { marcaMotor: "Land Rover", numeroMotor: "78987", fechaCreacion: "2024-01-18", cliente: "Camila Castillo" },
  { marcaMotor: "Fiat", numeroMotor: "90123", fechaCreacion: "2024-01-19", cliente: "Tomás Aguirre" },
  { marcaMotor: "Mitsubishi", numeroMotor: "34567", fechaCreacion: "2024-01-20", cliente: "Isabel Ponce" }
];

export const Orden = () => {
  const [ordenes, setOrdenes] = useState(orders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrdenesTrabajo();
        setOrdenes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
              {ordenes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((orden) => (
                <TableRow hover key={orden.id}>
                  <TableCell>{orden.cliente}</TableCell>
                  <TableCell>{orden.marcaMotor}</TableCell>
                  <TableCell>{orden.numeroMotor}</TableCell>
                  <TableCell>{format(new Date(orden.fechaCreacion), "dd/MM/yyyy")}</TableCell>
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
