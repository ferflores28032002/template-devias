import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const EditProformaModal = ({ open, handleClose, id }) => {
  const [proformaData, setProformaData] = useState(null);
  const [prices, setPrices] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);

  useEffect(() => {
    if (open && id) {
      fetchProformaData(id);
      fetchStatuses();
    }
  }, [open, id]);

  const fetchProformaData = async (proformaId) => {
    try {
      const response = await axios.get(
        `https://www.tallercenteno.somee.com/api/Proformas/${proformaId}`
      );
      setProformaData(response.data);
      setPrices(
        response.data.items.reduce((acc, item) => {
          acc[item.descripcion] = item.precio;
          return acc;
        }, {})
      );
      setSelectedStatus(response.data.estadoId || 1);
    } catch (error) {
      console.error("Error fetching proforma data:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(
        "https://www.tallercenteno.somee.com/api/Proformas/estados"
      );
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const handlePriceChange = (description, value) => {
    if (!isNaN(value) && Number(value) >= 0) {
      setPrices((prev) => ({ ...prev, [description]: value }));
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(Number(e.target.value));
  };

  const handleSave = async () => {
    if (!proformaData) return;

    const payload = {
      estadoId: selectedStatus,
      adelanto: proformaData.adelanto || 0,
      items: Object.entries(prices).map(([descripcion, precio]) => ({
        descripcion,
        precio: parseFloat(precio) || 0,
      })),
    };

    try {
      const response = await axios.put(
        `https://www.tallercenteno.somee.com/api/Proformas/${id}`,
        payload
      );
      console.log("Proforma actualizada con éxito:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error al actualizar la proforma:", error);
    }
  };

  if (!proformaData) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", sm: 600 },
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Editar Proforma
        </Typography>
        <Box mb={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Cliente: {proformaData.cliente}
          </Typography>
          <Typography variant="body1">Marca Motor: {proformaData.marcaMotor}</Typography>
          <Typography variant="body1">Número Motor: {proformaData.numeroMotor}</Typography>
          <Typography variant="body1">
            Fecha de Emisión: {new Date(proformaData.fechaEmision).toLocaleDateString()}
          </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Descripción
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Precio
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proformaData.items.map((item) => (
                <TableRow key={item.descripcion}>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        C$
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={prices[item.descripcion]}
                        onChange={(e) =>
                          handlePriceChange(item.descripcion, e.target.value)
                        }
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mb={2}>
          <Typography variant="subtitle1">Estado</Typography>
          <TextField
            select
            value={selectedStatus}
            onChange={handleStatusChange}
            SelectProps={{ native: true }}
            fullWidth
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.nombre}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProformaModal;
