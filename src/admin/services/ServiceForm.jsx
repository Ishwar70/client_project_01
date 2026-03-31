import { useState } from "react";
import { createService, updateService } from "../../services/services.service";

export default function ServiceForm({ existing, onSuccess }) {
  const [form, setForm] = useState(
    existing || {
      title: "",
      description: "",
      price: "",
      image: "",
      icon: "landmark",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existing) {
      await updateService(existing._id, form);
    } else {
      await createService(form);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-3">
      <h2 className="font-semibold">
        {existing ? "Edit Service" : "Add Service"}
      </h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />

      <select name="icon" onChange={handleChange}>
        <option value="landmark">Landmark</option>
        <option value="mountain">Mountain</option>
        <option value="hotel">Hotel</option>
        <option value="map">Map</option>
        <option value="users">Users</option>
        <option value="car">Car</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-3 py-1">
        {existing ? "Update" : "Create"}
      </button>
    </form>
  );
}