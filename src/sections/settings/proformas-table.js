import React, { useState, useEffect } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { Scrollbar } from "src/components/scrollbar";
import EditProformaModal from "./EditProformaModal";

export const ProformasTable = () => {
  const [proformas, setProformas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);

  const [filteredProformas, setFilteredProformas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProforma, setSelectedProforma] = useState(null);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProformas(proformas);
    } else {
      const filtered = proformas.filter(
        (proforma) =>
          proforma.numeroProforma.toLowerCase().includes(query) ||
          proforma.cliente.toLowerCase().includes(query)
      );
      setFilteredProformas(filtered);
    }
  };

  // Función para obtener las proformas
  const fetchProformas = async () => {
    try {
      const response = await axios.get("http://www.tallercentenos.somee.com/api/Proformas");
      setProformas(response.data);
      setFilteredProformas(response.data.reverse() || []);
    } catch (error) {
      console.error("Error al obtener las proformas:", error);
    }
  };

  const fetchProformaDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://www.tallercentenos.somee.com/api/Proformas/Listo-imprimir-proforma/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los detalles de la proforma:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchProformas(); // Llamar a la función cuando el componente se monte
  }, [isModalOpen]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownloadPDF = async (id) => {
    const data = await fetchProformaDetails(id);
    if (!data) return;

    const doc = new jsPDF();

    // Encabezado personalizado
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Taller Centeno", 14, 20); // Cambiado a "Taller Centeno"
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("TODA CLASE DE TRABAJOS DE TORNO, FRESA Y SOLDADURA", 14, 28);
    doc.setFont(undefined, "normal");
    doc.text("Iglesia Santa Ana 1c. al Sur y ½ c. arriba. Teléfonos: 2266-7121", 14, 34);
    doc.text("Managua, Nicaragua.", 14, 40);
    doc.text("No. RUC: 0012406510003K", 14, 46); // Agregar el RUC

    // Datos principales en columnas
    doc.setFont(undefined, "bold");
    doc.text(data.numeroProforma, 14, 56); // Solo deja el número de la proforma
    doc.text("Fecha:", 120, 56);
    doc.text(data.fechaEmision, 140, 56);

    doc.setFont(undefined, "normal");
    doc.text("Cliente:", 14, 64);
    doc.text(data.cliente, 50, 64);
    doc.text("Marca de Motor:", 14, 70); // Agregar Marca de Motor
    doc.text(data.marcaMotor, 50, 70);
    doc.text("Numero de Motor:", 14, 76); // Ajustar para evitar superposición
    doc.text(data.numeroMotor, 50, 76);
    doc.text("Estado:", 120, 64);
    doc.text(data.estado, 140, 64);

    // Línea separadora
    doc.setDrawColor(200);
    doc.line(14, 82, 200, 82);

    // Tabla de detalles (sin columnas de "Cantidad" y "Total")
    doc.autoTable({
      startY: 88,
      head: [["Descripción", "Precio Unitario"]],
      body: data.items.map((item) => [item.descripcion, item.precio || "-"]),
      styles: { halign: "center", fillColor: [240, 240, 240] },
      headStyles: { fillColor: [100, 100, 255], textColor: [255, 255, 255] },
    });

    // Resumen de totales al lado derecho
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont(undefined, "bold");
    doc.text("Resumen:", 120, finalY);
    doc.setFont(undefined, "normal");
    doc.text("Subtotal:", 120, finalY + 6);
    doc.text(data.subtotal, 160, finalY + 6);
    doc.text("IVA:", 120, finalY + 12);
    doc.text(data.iva, 160, finalY + 12);
    doc.text("Total:", 120, finalY + 18);
    doc.text(data.total, 160, finalY + 18);
    doc.text("Adelanto:", 120, finalY + 24);
    doc.text(data.adelanto, 160, finalY + 24);
    doc.text("Saldo Pendiente:", 120, finalY + 30);
    doc.text(data.saldoPendiente, 160, finalY + 30);

    // Repuestos
    doc.setFont(undefined, "bold");
    doc.text("Repuestos:", 14, finalY);
    doc.setFont(undefined, "normal");
    doc.text(data.respuestos, 14, finalY + 6);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Favor elaborar cheque a nombre de: Juan José Centeno Rosales", 14, finalY + 50);
    doc.text("Este documento NO es sustituto de factura", 14, finalY + 55);

    doc.save(`Factura_${data.numeroProforma}.pdf`);
  };

  const handlePrint = async (id) => {
    const data = await fetchProformaDetails(id);
    if (!data) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Proforma</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #4caf50; }
            .header { text-align: center; margin-bottom: 20px; }
            .details {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              border: 1px solid #ddd;
              padding: 10px;
              border-radius: 8px;
            }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals-container {
              display: flex;
              flex-direction: row;
              justify-content: space-between; /* Espaciado entre los elementos */
              align-items: center; /* Centrado vertical */
              margin-top: 20px;
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .totals, .repuestos {
              flex: 1; /* Para que ambos tengan el mismo espacio */
              padding: 0 10px;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #555; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Taller Centeno</h2>
            <p><strong>TODA CLASE DE TRABAJOS DE TORNO, FRESA Y SOLDADURA</strong></p>
            <p>Iglesia Santa Ana 1c. al Sur y ½ c. arriba. Teléfonos: 2266-7121</p>
            <p>Managua, Nicaragua.</p>
            <p><strong>No. RUC:</strong> 0012406510003K</p>
            <h3 style="color: red;">${data.numeroProforma}</h3>
          </div>
          <div class="details">
            <div>
            <p><strong>Cliente:</strong> ${data.cliente}</p>
            <p><strong>Marca de Motor:</strong> ${data.marcaMotor}</p>
            <p><strong>Numero de Motor:</strong> ${data.numeroMotor}</p>
            </div>
            <div>
            <p><strong>Fecha:</strong> ${data.fechaEmision}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr><th>Descripción</th><th>Precio Unitario</th></tr>
            </thead>
            <tbody>
              ${data.items
                .map(
                  (item) => `<tr><td>${item.descripcion}</td><td>${item.precio || "-"}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>
          <div class="totals-container">
          <div class="repuestos">
          <p><strong>Repuestos:</strong> ${data.respuestos}</p>
          </div>
          <div class="totals">
            <p><strong>Subtotal:</strong> ${data.subtotal}</p>
            <p><strong>IVA:</strong> ${data.iva}</p>
            <p><strong>Total:</strong> ${data.total}</p>
            <p><strong>Adelanto:</strong> ${data.adelanto}</p>
            <p><strong>Saldo Pendiente:</strong> ${data.saldoPendiente}</p>
          </div>
          </div>
          <div class="footer">
            <p><strong>Favor elaborar cheque a nombre de:</strong> Juan José Centeno Rosales</p>
            <p><strong>Este documento NO es sustituto de factura</strong></p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" gap={2} alignItems="center" p={2}>
        <Typography variant="h5" fontWeight="bold">
          Proformas
        </Typography>
        <TextField
          placeholder="Buscar proforma por cliente o número"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: 300 }}
        />
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Proforma</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProformas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((proforma) => (
                  <TableRow hover key={proforma.id}>
                    <TableCell>{`#${proforma.id}`}</TableCell>
                    <TableCell>{proforma.numeroProforma}</TableCell>
                    <TableCell>{proforma.cliente}</TableCell>
                    <TableCell>{format(new Date(proforma.fechaEmision), "yyyy-MM-dd")}</TableCell>
                    <TableCell
                      sx={{
                        color: proforma.estado === "Pendiente" ? "error.main" : "success.main",
                      }}
                    >
                      {proforma.estado}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePrint(proforma.id)}
                        sx={{ marginRight: 1 }}
                      >
                        Imprimir
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDownloadPDF(proforma.id)}
                        sx={{ marginRight: 1 }}
                      >
                        Descargar PDF
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleOpenModal();
                          setSelectedProforma(proforma);
                        }}
                        sx={{ marginRight: 1 }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      {selectedProforma && (
        <EditProformaModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          id={selectedProforma.id}
        />
      )}
      <TablePagination
        component="div"
        count={proformas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
