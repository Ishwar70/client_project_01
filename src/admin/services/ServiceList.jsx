import { useEffect, useState } from "react";
import { getAllServices, deleteService } from "../../services/services.service";

export default function ServiceList({ refresh, onSelect, onRefresh }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  const fetchServices = async () => {
    const res = await getAllServices();
    setServices(res.data);
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    onRefresh();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">All Services</h2>

      {services.map((s) => (
        <div
          key={s._id}
          className="border p-3 rounded mb-2 flex justify-between"
        >
          <div>
            <p className="font-bold">{s.title}</p>
            <p className="text-sm">{s.price}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onSelect(s._id)}>View</button>
            <button onClick={() => onSelect(s._id)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}