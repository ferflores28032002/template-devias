import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Resolver para Yup
import * as yup from "yup"; // Importación de Yup
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
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  cliente: yup.string().required("El nombre del cliente es obligatorio"),
  marcaMotor: yup.string().required("La marca del motor es obligatoria"),
  numeroMotor: yup.string().required("El número de motor es obligatorio"),
  revisionBiela: yup.string().required("Este campo es obligatorio"),
  bancada: yup.string().required("Este campo es obligatorio"),
});

export const AccountProfileDetails = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Resolver de validación
    defaultValues: {
      cliente: "",
      marcaMotor: "",
      numeroMotor: "",
      revisionBiela: "",
      bancada: "",
      rellenarAxial: false,
      pistaTrasera: false,
      pistaDelantera: false,
      cambioPiniones: false,
      reconstruirPuntaCigueñal: false,
      hacerBushines: false,
      cantidadBielasaReconstruir: 0,
      encamisado: false,
      rectificado: false,
      pulido: false,
      cambioBujeDeLeva: false,
      reconstruirCojinetebancada: false,
      superficieBlock: false,
      superficieBlockCejas: false,
      medirPertuberanciaPistones: false,
      rectificarBanca: false,
      hechuraDeCasquillo: false,
      rectificarSuperficie: false,
      rellenarPasesDeAgua: false,
      calibrar: false,
      instalarChamber: false,
      rellenarPasesAgua: false,
      rectificarAsientoDeCulata: false,
      cambiarChamber: false,
      respuesto: "",
      reconstruirAxial: false,
      notasCigueñal: "",
      cambioBujeLeva: false,
      rectificarAsientoCulata: false,
      reconstruirCojineteBancada: false,
      notasBlock: "",
      hechuraCasquillo: false,
      notasCulatas: "",
      numeroLevas: 0,
      cambiarBujies: false,
      notasBiela: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("https://tallercenteno.somee.com/api/OrdenTrabajo", data);
      console.log("Response:", response.data);
      setLoading(false);
      await MySwal.fire({
        icon: "success",
        title: "Orden de trabajo creada",
        text: "Los datos se enviaron correctamente.",
        confirmButtonText: "Aceptar",
      });
      reset();
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      await MySwal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al enviar los datos. Por favor, inténtelo de nuevo.",
        confirmButtonText: "Aceptar",
      });
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
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
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
              <Grid item xs={12} md={4}>
                <Controller
                  name="cliente"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText={errors.cliente?.message}
                      error={!!errors.cliente}
                      label="Cliente"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="marcaMotor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText={errors.marcaMotor?.message}
                      error={!!errors.marcaMotor}
                      label="Marca del motor"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="numeroMotor"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      helperText={errors.numeroMotor?.message}
                      error={!!errors.numeroMotor}
                      label="Número de motor"
                      required
                    />
                  )}
                />
              </Grid>

              {/* Cigueñal */}
              <Grid item xs={12}>
                <Typography variant="h6">Cigueñal</Typography>
              </Grid>
              {["revisionBiela", "bancada"].map((name) => (
                <Grid item xs={12} md={4} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        helperText={errors[name]?.message}
                        error={!!errors[name]}
                        label={name}
                        required
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={4}>
                <Controller
                  name="reconstruirAxial"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Reconstruir Axial"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="notasCigueñal"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      helperText={errors.notasCigueñal?.message}
                      error={!!errors.notasCigueñal}
                      label="Notas Cigueñal"
                    />
                  )}
                />
              </Grid>

              {/* Block */}
              <Grid item xs={12}>
                <Typography variant="h6">Block</Typography>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  marginLeft: 3,
                }}
              >
                {[
                  "encamisado",
                  "rectificado",
                  "pulido",
                  "pistaDelantera",
                  "cambioBujeDeLeva",
                  "reconstruirCojinetebancada",
                  "superficieBlock",
                  "superficieBlockCejas",
                  "medirPertuberanciaPistones",
                  "hacerBushines",
                  "rectificarBanca",
                ].map((name) => (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                ))}
              </Box>
              <Grid item xs={12} md={12}>
                <Controller
                  name="notasBlock"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      helperText={errors.notasBlock?.message}
                      error={!!errors.notasBlock}
                      label="Notas Block"
                    />
                  )}
                />
              </Grid>

              {/* Culata */}
              <Grid item xs={12}>
                <Typography variant="h6">Culata</Typography>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  marginLeft: 3,
                }}
              >
                {[
                  "hechuraDeCasquillo",
                  "rectificarAsientoCulata",
                  "rectificarSuperficie",
                  "rellenarPasesAgua",
                  "rellenarPasesDeAgua",
                  "calibrar",
                  "instalarChamber",
                  "rectificarAsientoDeCulata",
                  "cambiarChamber",
                  "cambioBujeLeva",
                  "hechuraCasquillo",
                  "cambiarGuia",
                ].map((name) => (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                ))}
              </Box>
              <Grid item xs={12} md={12}>
                <Controller
                  name="notasCulatas"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      helperText={errors.notasCulatas?.message}
                      error={!!errors.notasCulatas}
                      label="Notas Culatas"
                    />
                  )}
                />
              </Grid>

              {/* Sección Final */}
              <Grid item xs={12}>
                <Typography variant="h6">Sección Final</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="numeroLevas"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      helperText={errors.numeroLevas?.message}
                      error={!!errors.numeroLevas}
                      label="Número de Levas"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="cantidadBielasaReconstruir"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      helperText={errors.cantidadBielasaReconstruir?.message}
                      error={!!errors.cantidadBielasaReconstruir}
                      label="Cantidad de Bielas a Reconstruir"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="cambiarBujies"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Cambiar Bujies"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="notasBiela"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      helperText={errors.notasBiela?.message}
                      error={!!errors.notasBiela}
                      label="Notas Biela"
                    />
                  )}
                />
              </Grid>

              {/* Respuesto */}
              <Grid item xs={12}>
                <Controller
                  name="respuesto"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Respuesto"
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
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
