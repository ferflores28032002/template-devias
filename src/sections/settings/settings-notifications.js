import { useTheme } from "@emotion/react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useState } from "react";
import { CustomersSearch } from "../customer/customers-search";
import { ProformasTable } from "./proformas-table";

const initialPrices = {
  encamisarBlock: "",
  rectificarBlock: "",
  cambiarBushings: "",
  rectificarCigueñal: "",
};

export const ProformaGrid = () => {
  const [selectedProforma, setSelectedProforma] = useState(null);
  const [prices, setPrices] = useState(initialPrices);
  const [isAdding, setIsAdding] = useState(false);

  const handlePriceChange = (key, value) => {
    setPrices((prev) => ({
      ...prev,
      [key]: parseFloat(value) || "",
    }));
  };

  const calculateSubtotal = () =>
    Object.values(prices).reduce((sum, price) => sum + (parseFloat(price) || 0), 0);

  const calculateIVA = () => calculateSubtotal() * 0.15;

  const calculateTotal = () => calculateSubtotal() + calculateIVA();

  const handleOpenModal = (proforma) => {
    setIsAdding(false);
    setSelectedProforma(proforma);
    setPrices({
      encamisarBlock: 6500,
      rectificarBlock: 3500,
      cambiarBushings: 1500,
      rectificarCigueñal: 2500,
    });
  };

  const handleOpenAddModal = () => {
    setIsAdding(true);
    setSelectedProforma(null);
    setPrices(initialPrices);
  };

  const handleCloseModal = () => {
    setSelectedProforma(null);
    setIsAdding(false);
  };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detecta si es mobile
  

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CustomersSearch>
          <Button
          startIcon={
            !isMobile && ( // Muestra el ícono solo si no es mobile
              <SvgIcon fontSize="small">
                { <PlusIcon /> }
              </SvgIcon>
            )
          }
            variant="contained"
            onClick={handleOpenAddModal}
            sx={{
              width: { xs: "250px", sm: "auto" }, // 200px en mobile, auto en pantallas más grandes
            }}
          >
            Crear proforma
          </Button>
        </CustomersSearch>
      </Box>

      <ProformasTable handleOpenModal={handleOpenModal} />

      {/* Modal */}
      <Modal open={!!selectedProforma || isAdding} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "98%", sm: "55%" },
            maxHeight: "95vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "3px",
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
            {isAdding ? "Nueva Proforma" : `Proforma #${selectedProforma?.id}`}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Stack spacing={2} mb={3}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">
                <strong>Cliente:</strong> {selectedProforma?.cliente || "Nuevo"}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha:</strong> {selectedProforma?.fecha || "Por definir"}
              </Typography>
            </Stack>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Descripción</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">Precio</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { label: "Encamisar Block", key: "encamisarBlock" },
                {
                  label: "Rectificar Superficie de Block",
                  key: "rectificarBlock",
                },
                { label: "Cambiar 4 Bushings de Bielas", key: "cambiarBushings" },
                { label: "Rectificar Cigüeñal", key: "rectificarCigueñal" },
              ].map((item) => (
                <TableRow key={item.key}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                      <Typography>C$</Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={prices[item.key]}
                        onChange={(e) => handlePriceChange(item.key, e.target.value)}
                        sx={{ width: 80, ml: 1 }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Subtotal</Typography>
                </TableCell>
                <TableCell align="right">C$ {calculateSubtotal().toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IVA (15%)</TableCell>
                <TableCell align="right">C$ {calculateIVA().toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold" color="secondary">
                    C$ {calculateTotal().toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Button variant="contained" onClick={handleCloseModal} fullWidth>
            {isAdding ? "Guardar Nueva Proforma" : "Cerrar"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
