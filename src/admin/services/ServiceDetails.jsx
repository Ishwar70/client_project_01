import { useEffect, useState } from "react";
import { getServiceById } from "../../services/services.service";

export default function ServiceDetails({ id }) {
  const [service, setService] = useState(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    const res = await getServiceById(id);
    setService(res.data);
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{service.title}</h2>
      <p>{service.description}</p>
      <p>{service.price}</p>

      <img
        src={service.image}
        alt={service.title}
        className="w-40 mt-2"
      />
    </div>
  );
}