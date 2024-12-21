import { Box, Modal, Stack, TextField, Button, Select, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export const EditWorkerModal = ({ open, worker, onClose, onSave }) => {
  const [form, setForm] = useState(worker || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-placeholderledby="edit-worker-modal-title">
      <Box
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 4,
          width: "100%",
          maxWidth: 500,
          boxShadow: 3,
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          "@media (max-width: 600px)": {
            width: "98%",
            maxWidth: "100%",
            borderRadius: 0,
            margin: "auto",
            borderRadius: 4,
          },
        }}
      >
        <Typography id="edit-worker-modal-title" variant="h6" mb={2}>
          Editar Trabajador
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Nombre"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="Apellidos"
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="Dirección"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            variant="outlined"
          />
          <Select
            fullWidth
            name="position"
            value={form.position || ""}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccionar cargo
            </MenuItem>
            <MenuItem value="WorkshopHead">Encargado de Taller</MenuItem>
            <MenuItem value="LatheOperator">Operador de Torno</MenuItem>
            <MenuItem value="CylinderHeadSpecialist">Especialista en Culatas</MenuItem>
            <MenuItem value="CrankshaftTechnician">Técnico de Cigüeñales</MenuItem>
            <MenuItem value="ConnectingRodSpecialist">Especialista en Bielas</MenuItem>
            <MenuItem value="Mechanic">Mecánico</MenuItem>
            <MenuItem value="Assistant">Asistente</MenuItem>
            <MenuItem value="Manager">Gerente</MenuItem>
          </Select>
          <TextField
            fullWidth
            placeholder="Cédula"
            name="idNumber"
            value={form.idNumber || ""}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="Teléfono"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            variant="outlined"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Guardar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

EditWorkerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  worker: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
