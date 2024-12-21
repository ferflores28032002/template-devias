import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { EditWorkerModal } from "src/sections/companies/EditWorkerModal";
import { WorkerDetailsModal } from "src/sections/companies/WorkerDetailsModal";
import { WorkersTable } from "src/sections/companies/WorkersTable";


// Example workers data
const workersData = [
  { id: 1, name: "Juan", lastName: "Perez", address: "Calle 1", position: "WorkshopHead", idNumber: "12345", phone: "555-1234" },
  { id: 2, name: "Maria", lastName: "Lopez", address: "Calle 2", position: "LatheOperator", idNumber: "67890", phone: "555-5678" },
  { id: 3, name: "Luis", lastName: "Martinez", address: "Calle 3", position: "CylinderHeadSpecialist", idNumber: "54321", phone: "555-8765" },
  { id: 4, name: "Ana", lastName: "Garcia", address: "Calle 4", position: "CrankshaftTechnician", idNumber: "98765", phone: "555-4321" },
  { id: 5, name: "Carlos", lastName: "Rodriguez", address: "Calle 5", position: "ConnectingRodSpecialist", idNumber: "11223", phone: "555-2211" },
  { id: 6, name: "Sofia", lastName: "Hernandez", address: "Calle 6", position: "Mechanic", idNumber: "33445", phone: "555-3344" },
  { id: 7, name: "Diego", lastName: "Gomez", address: "Calle 7", position: "Assistant", idNumber: "66778", phone: "555-6677" },
  { id: 8, name: "Elena", lastName: "Alvarez", address: "Calle 8", position: "Manager", idNumber: "99001", phone: "555-9988" },
  { id: 9, name: "Jorge", lastName: "Castro", address: "Calle 9", position: "WorkshopHead", idNumber: "22334", phone: "555-4455" },
  { id: 10, name: "Lucia", lastName: "Vega", address: "Calle 10", position: "LatheOperator", idNumber: "55667", phone: "555-7766" },
  { id: 11, name: "Raul", lastName: "Mendoza", address: "Calle 11", position: "CylinderHeadSpecialist", idNumber: "88900", phone: "555-9989" },
  { id: 12, name: "Isabel", lastName: "Campos", address: "Calle 12", position: "CrankshaftTechnician", idNumber: "33556", phone: "555-5544" },
  { id: 13, name: "Pedro", lastName: "Rios", address: "Calle 13", position: "ConnectingRodSpecialist", idNumber: "77889", phone: "555-8877" },
  { id: 14, name: "Adriana", lastName: "Ortiz", address: "Calle 14", position: "Mechanic", idNumber: "11234", phone: "555-2210" },
  { id: 15, name: "Miguel", lastName: "Chavez", address: "Calle 15", position: "Assistant", idNumber: "33445", phone: "555-4450" },
  { id: 16, name: "Valeria", lastName: "Luna", address: "Calle 16", position: "Manager", idNumber: "66777", phone: "555-6678" },
  { id: 17, name: "Oscar", lastName: "Ramirez", address: "Calle 17", position: "WorkshopHead", idNumber: "88999", phone: "555-9980" },
  { id: 18, name: "Camila", lastName: "Sanchez", address: "Calle 18", position: "LatheOperator", idNumber: "22345", phone: "555-7760" },
  { id: 19, name: "Fernando", lastName: "Flores", address: "Calle 19", position: "CylinderHeadSpecialist", idNumber: "55666", phone: "555-5540" },
  { id: 20, name: "Daniela", lastName: "Morales", address: "Calle 20", position: "CrankshaftTechnician", idNumber: "77888", phone: "555-8870" },
  { id: 21, name: "Alex", lastName: "Smith", address: "Calle 21", position: "Manager", idNumber: "23456", phone: "555-4567" },
  { id: 22, name: "Laura", lastName: "Brown", address: "Calle 22", position: "Assistant", idNumber: "34567", phone: "555-5678" },
  { id: 23, name: "Tom", lastName: "Wilson", address: "Calle 23", position: "WorkshopHead", idNumber: "45678", phone: "555-6789" },
  { id: 24, name: "Alice", lastName: "Davis", address: "Calle 24", position: "Mechanic", idNumber: "56789", phone: "555-7890" },
  { id: 25, name: "Eva", lastName: "Clark", address: "Calle 25", position: "LatheOperator", idNumber: "67890", phone: "555-8901" },
  { id: 26, name: "John", lastName: "Miller", address: "Calle 26", position: "CrankshaftTechnician", idNumber: "78901", phone: "555-9012" },
  { id: 27, name: "Emma", lastName: "Jones", address: "Calle 27", position: "CylinderHeadSpecialist", idNumber: "89012", phone: "555-0123" },
  { id: 28, name: "Michael", lastName: "Taylor", address: "Calle 28", position: "ConnectingRodSpecialist", idNumber: "90123", phone: "555-1230" },
  { id: 29, name: "Sophia", lastName: "Anderson", address: "Calle 29", position: "Mechanic", idNumber: "01234", phone: "555-2345" },
  { id: 30, name: "Oliver", lastName: "Thomas", address: "Calle 30", position: "LatheOperator", idNumber: "12340", phone: "555-3456" },
];

const Page = () => {
  const [workers, setWorkers] = useState(workersData);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleEdit = (worker) => {
    setSelectedWorker(worker);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedWorker) => {
    setWorkers((prev) =>
      prev.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker))
    );
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    setWorkers((prev) => prev.filter((worker) => worker.id !== id));
  };

  const handleViewDetails = (worker) => {
    setSelectedWorker(worker);
    setDetailsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Reparaciones | Taller Centeno</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <WorkersTable
                workers={workers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
              />
              <EditWorkerModal
                open={isEditModalOpen}
                worker={selectedWorker}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveEdit}
              />
              <WorkerDetailsModal
                open={isDetailsModalOpen}
                worker={selectedWorker}
                onClose={() => setDetailsModalOpen(false)}
              />
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
