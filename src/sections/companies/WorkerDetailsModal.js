import { Box, Modal, Stack, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const WorkerDetailsModal = ({ open, worker, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="worker-details-modal-title">
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
          '@media (max-width: 600px)': {
            width: '98%',
            margin: 'auto',
            maxWidth: '100%',
            borderRadius: 4,
          },
        }}
      >
        <Typography id="worker-details-modal-title" variant="h6" mb={2}>
          Detalles del Trabajador
        </Typography>
        <Stack spacing={2}>
          <Box>
            <strong>Nombre:</strong> {worker?.name}
          </Box>
          <Box>
            <strong>Apellidos:</strong> {worker?.lastName}
          </Box>
          <Box>
            <strong>Dirección:</strong> {worker?.address}
          </Box>
          <Box>
            <strong>Cargo:</strong> {worker?.position}
          </Box>
          <Box>
            <strong>Cédula:</strong> {worker?.idNumber}
          </Box>
          <Box>
            <strong>Teléfono:</strong> {worker?.phone}
          </Box>
          <Box>
            <strong>Habilidades en el Taller:</strong>
            <ul>
              <li>Encargado de Taller</li>
              <li>Operador de Torno</li>
              <li>Especialista en Culatas</li>
              <li>Técnico de Cigüeñales</li>
              <li>Especialista en Bielas</li>
            </ul>
          </Box>
          <Button variant="contained" onClick={onClose} color="primary">
            Cerrar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

WorkerDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  worker: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
