import React, { useState } from "react";
import { Modal, Box, Typography, Button, SvgIcon } from "@mui/material";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '40%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RepairDetailsModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        startIcon={
          <SvgIcon fontSize="small">
            <EyeIcon />
          </SvgIcon>
        }
        variant="contained"
        onClick={handleOpen}
      >
        Ver detalles
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Detalles de Reparación
          </Typography>
          <Typography>
            <strong>Orden:</strong> #4514
          </Typography>
          <Typography>
            <strong>Proforma:</strong> #9454
          </Typography>
          <Typography>
            <strong>Cliente:</strong> Kevin
          </Typography>
          <Typography>
            <strong>Fecha:</strong> 2024-11-30
          </Typography>
          <Typography>
            <strong>Estado:</strong> pendiente
          </Typography>
          <Typography>
            <strong>Fecha de Entrega Esperada:</strong> 2024-12-15
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Items:</strong>
          </Typography>
          <Typography>Encamisar Block - C$6500</Typography>
          <Typography>Rectificar Superficie de Block - C$3500</Typography>
          <Typography>Cambiar 4 Bushings de Bielas - C$1500</Typography>
          <Typography>Rectificar Cigüeñal - C$2500</Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Repuestos:</strong>
          </Typography>
          <Typography>
            Camisas semi acabadas, Pistones STD, 2 Brazos de Bielas Nuevos, 4 Bushings de Bielas
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 3 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
