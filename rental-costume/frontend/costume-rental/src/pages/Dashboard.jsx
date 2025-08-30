import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { UserContext } from "./usercontext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not logged in
      navigate("/login");
      return;
    }

    API.get("/bookings/my")
      .then((r) => setBookings(r.data))
      .catch(console.error);
  }, [user, navigate]);

  if (!user) return null; // prevent rendering if not logged in

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        My Bookings
      </h2>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-2xl transition flex flex-col h-full"
          >
            {/* Costume Image */}
            {b.costume.images && b.costume.images.length > 0 ? (
              <div className="w-full h-[400px] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={b.costume.images[0]}
                  alt={b.costume.title}
                  className="w-full h-full object-contain transform hover:scale-105 transition duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-[400px] bg-pink-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Booking Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold text-pink-700 mb-2">
                  {b.costume.title}
                </h4>
                <p className="text-gray-600 mb-1">
                  📅 {new Date(b.startDate).toLocaleDateString()} →{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 font-medium">
                  💰 ₹{b.totalPrice} •{" "}
                  <span className="text-purple-600">{b.status}</span>
                </p>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 italic col-span-full">
            No bookings yet.
          </p>
        )}
      </div>
    </div>
  );
}
