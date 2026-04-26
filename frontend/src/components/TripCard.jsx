export default function TripCard({ trip, openBooking }) {
  return (
    <div className="bg-white/10 rounded-2xl overflow-hidden hover:scale-105 transition">

      <img src={trip.image} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-bold">{trip.title}</h3>
        <p className="text-gray-400">{trip.destination}</p>

        <p className="text-cyan-400 mt-2">
          {trip.price} DA
        </p>

        <button
          onClick={() => openBooking(trip)}
          className="mt-4 w-full bg-cyan-500 py-2 rounded-xl"
        >
          Réserver
        </button>
      </div>

    </div>
  );
}