import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createOrdenTrabajo } from "src/services/ordenes/getOrdenesTrabajo";

export const AccountProfileDetails = () => {
  const { control, handleSubmit } = useForm({
    
    defaultValues: {
      cliente: "Fernando Jose", // Referencia al cliente
      marcaMotor: "Susuki", // Marca del motor que se está trabajando
      numeroMotor: "12345", // Número de identificación del motor
      revisionBiela: "Revisión de la revisionBiela", // Observaciones sobre la revisionBiela
      bancada: "Estado de la bancada", // Detalles de la bancada
      rellenarAxial: "Medir tolerancias axiales", // Descripción del trabajo axial
      hacerChamber: "Revisión del chamber", // Trabajo relacionado con el chamber
      hacerGuias: "Cambio de guías", // Trabajo específico de guías
      notas: "Notas adicionales sobre la orden de trabajo", // Información general adicional
      pistaTrasera: true, // Pista trasera está seleccionada por defecto
      pistaDelantera: true, // Pista delantera está seleccionada por defecto
      cambioPiniones: true, // Cambio de piñones seleccionado
      encamisado: true, // Encamisado seleccionado por defecto
      rectificado: true, // Rectificado seleccionado por defecto
      pulido: false, // Pulido no seleccionado por defecto
      cambioBujeDeLeva: false, // Cambio de buje no seleccionado por defecto
      reconstruirCojinetebancada: false, // Reconstrucción no seleccionada por defecto
      reconstruirPuntaCigueñal: false, // Reconstrucción no seleccionada por defecto
      cambiarBujes: false, // Cambio de bujes no seleccionado
      hacerBushines: true, // Trabajo de bushines seleccionado por defecto
      cambioGuia: true, // Cambio de guía seleccionado por defecto
      hechuraDeCasquillo: true, // Hechura de casquillo seleccionada
      rectificarSuperficie: true, // Rectificado de superficie seleccionado
      rellenarPasesDeAgua: false, // Relleno de pases de agua no seleccionado
      calibrar: true, // Calibración seleccionada
      instalarChamber: true, // Instalación de chamber seleccionada
      rectificarAsientoDeCulata: false, // Rectificado de asiento no seleccionado
    },
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const onSubmit = async (data) => {
    try {
      await createOrdenTrabajo(data);
      setSnackbar({ open: true, message: "Orden de trabajo creada exitosamente.", severity: "success" });
      reset();
    } catch (error) {
      setSnackbar({ open: true, message: "Error al crear la orden de trabajo.", severity: "error" });
    }
  };

  const fechaActual = new Date();
  const fechaFormateada = format(fechaActual, "EEEE, dd 'de' MMMM 'del' yyyy", { locale: es });

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          subheader={` ${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)} `}
          title="Orden de trabajo"
        />

        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {/* Inputs de texto */}
              <Grid xs={12} md={4}>
                <Controller
                  name="cliente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText="Por favor, especifique el nombre del cliente"
                      label="Cliente"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Controller
                  name="marcaMotor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText="Por favor, especifique la marca del motor"
                      label="Marca del motor"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Controller
                  name="numeroMotor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText="Por favor, especifique el número de motor"
                      label="Número de motor"
                      required
                    />
                  )}
                />
              </Grid>

              {/* Cigueñal */}
              <Grid xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "-9px" }}>
                  Cigueñal
                </Typography>
              </Grid>
              <Grid xs={12} md={4}>
                <Controller
                  name="revisionBiela"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="revisionBiela" required />
                  )}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Controller
                  name="bancada"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="bancada" required />
                  )}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Controller
                  name="rellenarAxial"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Hacer axiales" required />
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    alignItems: "center",
                    gap: 5,
                    flexWrap: "wrap", 
                  }}
                >
                  {[
                    { label: "Pista Trasera", name: "pistaTrasera" },
                    { label: "Pista Delantera", name: "pistaDelantera" },
                    { label: "Reconstruir punta", name: "reconstruirPuntaCigueñal" },
                    { label: "Cambio de Piñones", name: "cambioPiniones" },
                  ].map(({ label, name }) => (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label={label}
                        />
                      )}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Block */}
              <Grid xs={12}>
                <Typography variant="h6">Block</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-center",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Encamisado", name: "encamisado" },
                    { label: "Rectificado", name: "rectificado" },
                    { label: "Pulido", name: "pulido" },
                    { label: "Cambio Buje de leva", name: "cambioBujeDeLeva" },
                    { label: "Reconstruir cojinete bancada", name: "reconstruirCojinetebancada" },
                  ].map(({ label, name }) => (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label={label}
                        />
                      )}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Culata */}
              <Grid xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Culata
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)", // Una columna en pantallas extra pequeñas
                      sm: "repeat(2, 1fr)", // Dos columnas en pantallas pequeñas
                      md: "repeat(3, 1fr)", // Tres columnas en pantallas medianas
                      lg: "repeat(4, 1fr)", // Cuatro columnas en pantallas grandes
                    },
                    gap: 2,
                  }}
                >
                  {[
                    { label: "Cambio guía", name: "cambioGuia" },
                    { label: "Hechura de casquillo", name: "hechuraDeCasquillo" },
                    { label: "Rectificar superficie", name: "rectificarSuperficie" },
                    { label: "Rellenar pases de agua", name: "rellenarPasesDeAgua" },
                    { label: "Calibrar", name: "calibrar" },
                    { label: "Instalar Chamber", name: "instalarChamber" },
                    { label: "Rectificar asiento de culata", name: "rectificarAsientoDeCulata" },
                  ].map(({ label, name }) => (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<Checkbox {...field} checked={field.value} />}
                          label={label}
                        />
                      )}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Notas */}
              <Grid xs={12}>
                <Controller
                  name="notas"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Notas"
                      multiline
                      minRows={5}
                      maxRows={5}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Guardar Cambios
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
