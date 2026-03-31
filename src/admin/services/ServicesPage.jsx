import { useState } from "react";
import ServiceList from "./ServiceList";
import ServiceForm from "./ServiceForm";
import ServiceDetails from "./ServiceDetails";

export default function ServicesPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Services Management</h1>

      {/* Add Service */}
      <ServiceForm onSuccess={() => setRefresh(!refresh)} />

      {/* Get All */}
      <ServiceList
        refresh={refresh}
        onSelect={(id) => setSelectedId(id)}
        onRefresh={() => setRefresh(!refresh)}
      />

      {/* Get By ID */}
      {selectedId && <ServiceDetails id={selectedId} />}
    </div>
  );
}