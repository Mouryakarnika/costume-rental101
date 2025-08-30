import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [costumes, setCostumes] = useState([]);

  useEffect(() => {
    API.get("/costumes")
      .then((r) => setCostumes(r.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-10">
        ✨ Available Costumes ✨
      </h2>

      {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {costumes.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100 hover:shadow-2xl transition duration-300 flex flex-col h-full"
          >
            {/* Image */}
            {c.images && c.images.length > 0 ? (
              <div className="overflow-hidden w-full h-56 bg-white flex items-center justify-center">
                <img
                  src={c.images[0]}
                  alt={c.title}
                  className="w-full h-full object-contain transform hover:scale-105 transition duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-56 bg-pink-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-500 mb-4">
                  {c.category} •{" "}
                  <span className="text-purple-500 font-semibold">
                    ₹{c.pricePerDay}/day
                  </span>
                </p>
              </div>

              <Link
                to={`/costume/${c._id}`}
                className="mt-4 inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-2 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
