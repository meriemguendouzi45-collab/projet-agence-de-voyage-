import { useState } from "react";
import {
  Plane,
  Hotel,
  FileText,
  Map,
  Umbrella,
  Camera,
} from "lucide-react";

import ServiceModal from "../components/ServiceModal";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      type: "flight",
      desc: "Best airline deals worldwide",
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      type: "hotel",
      desc: "Luxury & budget stays",
    },
    {
      icon: FileText,
      title: "Visa Assistance",
      type: "visa",
      desc: "Full document support",
    },
    {
      icon: Map,
      title: "Custom Tours",
      type: "custom",
      desc: "Trips designed for you",
    },
    {
      icon: Umbrella,
      title: "Travel Insurance",
      type: "insurance",
      desc: "Safe travel protection",
    },
    {
      icon: Camera,
      title: "Photography Tours",
      type: "photo",
      desc: "Capture the world",
    },
  ];

  return (
    <div className="bg-[#0b1220] text-white py-20 px-6 min-h-screen">

      {/* HEADER */}
      <h2 className="text-4xl text-center font-bold mb-2">
        What We Offer
      </h2>

      <p className="text-gray-400 text-center mb-10">
        Premium travel services for your journey
      </p>

      {/* SERVICES GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {services.map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.type}
              onClick={() => setSelectedService(s.type)}
              className="
                bg-white/5 
                p-6 
                rounded-2xl 
                cursor-pointer 
                hover:scale-105 
                transition 
                duration-300
                border border-white/10
                hover:border-cyan-400/50
              "
            >
              <Icon className="text-cyan-400 mx-auto mb-3" size={34} />

              <h3 className="font-bold text-center text-lg">
                {s.title}
              </h3>

              <p className="text-gray-400 text-sm text-center mt-2">
                {s.desc}
              </p>
            </div>
          );
        })}

      </div>

      {/* MODAL */}
      {selectedService && (
        <ServiceModal
          type={selectedService}
          close={() => setSelectedService(null)}
        />
      )}

    </div>
  );
}