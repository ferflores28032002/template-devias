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
      const response = await axios.get("https://www.tallercenteno.somee.com/api/Proformas");
      setProformas(response.data);
      setFilteredProformas(response.data.reverse() || []);
    } catch (error) {
      console.error("Error al obtener las proformas:", error);
    }
  };

  const fetchProformaDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://www.tallercenteno.somee.com/api/Proformas/Listo-imprimir-proforma/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los detalles de la proforma:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchProformas(); // Llamar a la función cuando el componente se monte
  }, []);

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
    doc.text("De Taller Centeno", 14, 20);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("TODA CLASE DE TRABAJOS DE TORNO, FRESA Y SOLDADURA", 14, 28);
    doc.setFont(undefined, "normal");
    doc.text(
      "Iglesia Santa Ana 1c. al Sur y ½ c. arriba. Teléfonos: 2255-7211 / 2265-8139",
      14,
      34
    );
    doc.text("Managua, Nicaragua.", 14, 40);
    doc.setFont(undefined, "bold");
    doc.text("PROFORMA N° ", 150, 20);
    doc.setTextColor(255, 0, 0);
    doc.text(data.numeroProforma, 180, 20);
    doc.setTextColor(40);
    doc.setFont(undefined, "normal");
    doc.text(`Fecha: ${data.fechaEmision}`, 150, 28);

    // Información general
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text("Número de Proforma: " + data.numeroProforma, 14, 50);
    doc.text("Cliente: " + data.cliente, 14, 56);
    doc.text("Estado: " + data.estado, 14, 62);

    // Tabla de detalles
    doc.autoTable({
      startY: 70,
      head: [["Descripción", "Precio"]],
      body: data.items.map((item) => [item.descripcion, item.precio]),
      styles: { halign: "center", fillColor: [230, 230, 250] },
      headStyles: { fillColor: [100, 100, 255], textColor: [255, 255, 255] },
    });

    // Repuestos
    doc.setFontSize(12);
    doc.text("Repuestos: " + data.respuestos, 14, doc.lastAutoTable.finalY + 10);

    // Totales
    doc.text("Subtotal: " + data.subtotal, 14, doc.lastAutoTable.finalY + 20);
    doc.text("IVA: " + data.iva, 14, doc.lastAutoTable.finalY + 26);
    doc.text("Total: " + data.total, 14, doc.lastAutoTable.finalY + 32);
    doc.text("Adelanto: " + data.adelanto, 14, doc.lastAutoTable.finalY + 38);
    doc.text("Saldo Pendiente: " + data.saldoPendiente, 14, doc.lastAutoTable.finalY + 44);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(
      "Favor elaborar cheque a nombre de: Juan José Centeno Rosales",
      14,
      doc.lastAutoTable.finalY + 60
    );
    doc.text("Este documento NO es sustituto de factura", 14, doc.lastAutoTable.finalY + 65);

    doc.save(`Proforma_${data.numeroProforma}.pdf`);
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
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals { margin-top: 20px; }
            .footer { margin-top: 30px; font-size: 12px; color: #555; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>De Taller Centeno</h2>
            <p><strong>TODA CLASE DE TRABAJOS DE TORNO, FRESA Y SOLDADURA</strong></p>
            <p>Iglesia Santa Ana 1c. al Sur y ½ c. arriba. Teléfonos: 2255-7211 / 2265-8139</p>
            <p>Managua, Nicaragua.</p>
            <h3>PROFORMA N° <span style="color: red;">${data.numeroProforma}</span></h3>
            <p>Fecha: ${data.fechaEmision}</p>
          </div>
          <table>
            <thead>
              <tr><th>Descripción</th><th>Precio</th></tr>
            </thead>
            <tbody>
              ${data.items
                .map((item) => `<tr><td>${item.descripcion}</td><td>${item.precio}</td></tr>`)
                .join("")}
            </tbody>
          </table>
          <div class="totals">
            <p><strong>Repuestos:</strong> ${data.respuestos}</p>
            <p><strong>Subtotal:</strong> ${data.subtotal}</p>
            <p><strong>IVA:</strong> ${data.iva}</p>
            <p><strong>Total:</strong> ${data.total}</p>
            <p><strong>Adelanto:</strong> ${data.adelanto}</p>
            <p><strong>Saldo Pendiente:</strong> ${data.saldoPendiente}</p>
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
  const [isModalOpen, setModalOpen] = useState(false);

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
