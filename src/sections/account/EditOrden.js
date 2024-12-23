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
      pulirCigueñal: false,
      pistaTrasera: false,
      pistaDelantera: false,
      cambioPiniones: false,
      reconstruirPuntaCigueñal: false,
      reconstruirAxial: false,
      notasCigueñal: "",
      encamisado: false,
      rectificado: false,
      pulido: false,
      rectificarCigueñal: false,
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
      cantidadBielasaReconstruir: 0,
      rectificarSuperficiePistones: false,
      rectificarBanca: false,
      rectificarValvulas: false,
      lavadoArmadoInstaladoSellos: false,
      hacerPruebaPresionCulata: false,
      notasCulatas: "",
      cantidadPasesAgua: 0,
      cambiarBujies: false,
      reconstruirHaushingBiela: false,
      cantidadBielasaReconstruir: 0,
      notasBiela: "",
      respuesto: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.tallercentenos.somee.com/api/OrdenTrabajo/ObtenerDuplicado/${id}`
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
        `https://www.tallercentenos.somee.com/api/OrdenTrabajo/${id}`,
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
              {/* Información General */}
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
                      required
                      label="Marca del motor"
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

              {/* Sección: Cigüeñal */}
              <Grid item xs={12}>
                <Typography variant="h6">Cigüeñal</Typography>
              </Grid>
              {[
                "rectificarCigueñal",
                "pulirCigueñal",
                "pistaTrasera",
                "pistaDelantera",
                "cambioPiniones",
                "reconstruirPuntaCigueñal",
                "reconstruirAxial",
              ].map((name) => (
                <Grid item xs={12} md={4} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={4}>
                <Controller
                  name="revisionBiela"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Revisión de Biela"
                      helperText={errors.revisionBiela?.message}
                      error={!!errors.revisionBiela}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="bancada"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Bancada"
                      helperText={errors.bancada?.message}
                      error={!!errors.bancada}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notasCigueñal"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Notas Cigüeñal" />
                  )}
                />
              </Grid>

              {/* Sección: Block */}
              <Grid item xs={12}>
                <Typography variant="h6">Block</Typography>
              </Grid>
              {[
                "encamisado",
                "rectificado",
                "pulido",
                "cambioBujeLeva",
                "reconstruirCojineteBancada",
                "superficieBlock",
                "superficieBlockCejas",
                "medirPertuberanciaPistones",
                "rectificarSuperficiePistones",
              ].map((name) => (
                <Grid item xs={12} md={4} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Controller
                  name="notasBlock"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Notas Block" />
                  )}
                />
              </Grid>

              {/* Sección: Culatas */}
              <Grid item xs={12}>
                <Typography variant="h6">Culatas</Typography>
              </Grid>
              {[
                "hechuraCasquillo",
                "cambiarChamber",
                "cambiarGuia",
                "rectificarSuperficie",
                "rectificarAsientoCulata",
                "rellenarPasesAgua",
                "calibrar",
                "instalarChamber",
                "rectificarBanca",
                "rectificarValvulas",
                "lavadoArmadoInstaladoSellos",
                "hacerPruebaPresionCulata",
              ].map((name) => (
                <Grid item xs={12} md={4} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Controller
                  name="numeroLevas"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="number" fullWidth label="Número de Levas" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cantidadPasesAgua"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label="Cantidad de Pases de Agua"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notasCulatas"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Notas Culatas" />
                  )}
                />
              </Grid>

              {/* Sección: Biela */}
              <Grid item xs={12}>
                <Typography variant="h6">Biela</Typography>
              </Grid>
              {["cambiarBujies", "reconstruirHaushingBiela"].map((name) => (
                <Grid item xs={12} md={4} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={name}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Controller
                  name="cantidadBielasaReconstruir"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label="Cantidad de Bielas a Reconstruir"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notasBiela"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Notas Biela" />
                  )}
                />
              </Grid>

              {/* Sección: Respuesto */}
              <Grid item xs={12}>
                <Controller
                  name="respuesto"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Respuesto" />
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
