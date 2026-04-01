import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../../services/services.service";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop";

export default function ServiceDetails() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getServiceById(id)
        .then((res) => setService(res.data))
        .catch(() => navigate("/services")) 
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-yellow-600 animate-pulse">Loading Details...</div>;
  if (!service) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors font-medium"
        >
          ← Back to Catalog
        </button>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-yellow-50">
          <div className="relative h-[400px]">
            <img
              src={service.image || DEFAULT_IMAGE}
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              className="w-full h-full object-cover"
              alt={service.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>

          <div className="p-10 -mt-20 relative z-10 bg-white rounded-t-[3rem]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-0.5 bg-yellow-600"></span>
                  <span className="text-yellow-600 font-bold uppercase tracking-[0.2em] text-xs">
                    {service.icon || "Premium Service"}
                  </span>
                </div>
                <h2 className="text-5xl font-serif font-bold text-gray-900">{service.title}</h2>
              </div>
              <div className="text-4xl font-light text-yellow-700 bg-yellow-50 px-6 py-3 rounded-2xl">
                ₹{service.price}
              </div>
            </div>

            <p className="text-gray-600 text-xl leading-relaxed mb-10 max-w-2xl">
              {service.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button className="bg-yellow-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-700 transition-all shadow-lg">
                  Book This Service
               </button>
               <button className="border-2 border-yellow-600 text-yellow-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-50 transition-all">
                  Inquire Now
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}