import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { es } from "date-fns/locale";
import axios from "axios";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";

const MySwal = withReactContent(Swal);

const validationSchema = yup.object().shape({
  cliente: yup.string().required("El nombre del cliente es obligatorio"),
  marcaMotor: yup.string().required("La marca del motor es obligatoria"),
  numeroMotor: yup.string().required("El número de motor es obligatorio"),
  revisionBiela: yup.string().required("Este campo es obligatorio"),
  bancada: yup.string().required("Este campo es obligatorio"),
});

const EditOrden = ({ id, setEdit }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [initialData, setInitialData] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
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
      reconstruirAxial: false,
      notasCigueñal: "",
      encamisado: false,
      rectificado: false,
      pulido: false,
      cambioBujeLeva: false,
      reconstruirCojineteBancada: false,
      superficieBlock: false,
      superficieBlockCejas: false,
      medirPertuberanciaPistones: false,
      notasBlock: "",
      hechuraCasquillo: false,
      cambiarChamber: false,
      cambiarGuia: false,
      rectificarSuperficie: false,
      rectificarAsientoCulata: false,
      rellenarPasesAgua: false,
      calibrar: false,
      instalarChamber: false,
      numeroLevas: 0,
      rectificarBanca: false,
      notasCulatas: "",
      cambiarBujies: false,
      cantidadBielasaReconstruir: 0,
      hacerBushines: false,
      respuesto: "",
      notasBiela: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.tallercenteno.somee.com/api/OrdenTrabajo/ObtenerDuplicado/${id}`
        );
        setInitialData(response.data);
        reset(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://www.tallercenteno.somee.com/api/OrdenTrabajo/${id}`,
        data
      );
      console.log("Response:", response.data);
      setLoading(false);
      await MySwal.fire({
        icon: "success",
        title: "Orden de trabajo actualizada",
        text: "Los datos se actualizaron correctamente.",
        confirmButtonText: "Aceptar",
      });
      setEdit(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setLoading(false);
      await MySwal.fire({
        icon: "error",
        title: "Error al actualizar la orden",
        text: "Hubo un problema al enviar los datos. Por favor, inténtelo de nuevo.",
        confirmButtonText: "Aceptar",
      });
      setEdit(false);
    }
  };

  if (loading && !initialData) {
    return <Typography>Cargando...</Typography>;
  }
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Button variant="contained" color="error" onClick={() => setEdit(false)}>
            Regresar
          </Button>
        </Box>
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

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  marginLeft: 3,
                  marginTop: 2,
                }}
              >
                {[
                  "rellenarAxial",
                  "pistaTrasera",
                  "pistaDelantera",
                  "cambioPiniones",
                  "reconstruirPuntaCigueñal",
                  "reconstruirAxial",
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

                  "cambioBujeDeLeva",
                  "reconstruirCojinetebancada",
                  "superficieBlock",
                  "superficieBlockCejas",
                  "medirPertuberanciaPistones",

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

              <Grid item xs={12}>
                <Typography variant="h6">Biela</Typography>
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
                {["cambiarBujies", "hacerBushines"].map((name) => (
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

              {/* Sección Final */}

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

export default EditOrden;
