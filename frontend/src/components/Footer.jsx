export default function Footer() {
  return (
    <footer className="bg-black/80 text-white mt-20">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            Meriem Voyage ✈️
          </h2>

          <p className="text-gray-400 mt-4 text-sm leading-6">
            Explore breathtaking destinations, create unforgettable memories and travel the world with comfort and trust.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4 text-gray-300">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-bold mb-4">Nos services</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Flight Booking</li>
            <li>Hotel Reservations</li>
            <li>Visa Assistance</li>
            <li>Custom Tours</li>
            <li>Travel Insurance</li>
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-bold mb-4">Liens rapides</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Home</li>
            <li>Destinations</li>
            <li>Tours</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold mb-4">Contactez-nous</h3>

          <p className="text-gray-400 text-sm">
            Beailieu, EL Harrach <br />
            , Alger
          </p>

          <p className="mt-3 text-gray-300 text-sm">
            📞 0554868511<br />
            📱 0554868511
          </p>

          <p className="mt-3 text-gray-300 text-sm">
            ✉️meriemguendouzi45@gmail.com
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-4 text-center text-gray-400 text-sm">

        <p>
          Copyright © Meriem Voyage. Tous droits réservés.
        </p>

        <p className="mt-1">
          Conçu par Meriem 
        </p>

      </div>

    </footer>
  );
}