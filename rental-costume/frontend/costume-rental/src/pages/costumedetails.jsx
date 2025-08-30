import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { UserContext } from "./usercontext"; // ✅ import context

export default function CostumeDetails() {
  const { id } = useParams();
  const [costume, setCostume] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ startDate: "", endDate: "", size: "" });
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ✅ get logged-in user

  useEffect(() => {
    API.get(`/costumes/${id}`).then((r) => setCostume(r.data));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first to book a costume.");
      navigate("/login");
      return;
    }

    try {
      await API.post("/bookings", { costumeId: id, ...formData });
      alert("Booked successfully");
      setShowForm(false);
      navigate("/dashboard");
    } catch (e) {
      alert(e.response?.data?.msg || e.message);
    }
  };

  if (!costume)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-8 flex justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">{costume.title}</h2>
        <p className="text-gray-600 mb-6">{costume.description}</p>

        {/* Images */}
        {costume.images?.length > 0 ? (
          <div className="flex flex-col gap-4 mb-6">
            {costume.images.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-[600px] bg-white flex items-center justify-center overflow-hidden rounded-xl border border-pink-100"
              >
                <img
                  src={img}
                  alt={`${costume.title} ${idx + 1}`}
                  className="object-contain w-full h-full transform hover:scale-105 transition duration-500 bg-white"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[600px] bg-pink-100 flex items-center justify-center text-gray-400 mb-6 rounded-xl">
            No Image
          </div>
        )}

        {/* Price & Deposit */}
        <div className="text-lg text-gray-700 mb-6">
          <p>
            💰 <span className="font-semibold">₹{costume.pricePerDay}</span> / day
          </p>
          <p>
            🔒 Deposit: <span className="font-semibold">₹{costume.deposit}</span>
          </p>
        </div>

        {/* Book Now Button */}
        <button
          onClick={() => {
            if (!user) {
              alert("Please login first to book a costume.");
              navigate("/login");
            } else {
              setShowForm(true);
            }
          }}
          className="w-full py-3 px-6 rounded-xl bg-pink-400 text-white font-semibold hover:bg-pink-500 transition shadow-md"
        >
          Book Now
        </button>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">Book Costume</h3>
              <form onSubmit={handleBook} className="flex flex-col gap-4">
                <label className="flex flex-col text-gray-700 font-medium">
                  Start Date
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 border rounded-lg"
                  />
                </label>
                <label className="flex flex-col text-gray-700 font-medium">
                  End Date
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 border rounded-lg"
                  />
                </label>
                <label className="flex flex-col text-gray-700 font-medium">
                  Size
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 border rounded-lg"
                  >
                    <option value="">Select size</option>
                    {costume.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-pink-400 text-white font-semibold hover:bg-pink-500 transition shadow-md"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
