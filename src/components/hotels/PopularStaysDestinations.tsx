const destinations = [
  {
    city: 'Paris',
    country: 'France',
    price: 'from $89/night',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    price: 'from $125/night',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
  },
  {
    city: 'New York',
    country: 'USA',
    price: 'from $149/night',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop'
  },
  {
    city: 'London',
    country: 'UK',
    price: 'from $99/night',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop'
  }
];

export const PopularStaysDestinations = () => {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Popular Stay Destinations
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            Discover amazing places to stay around the world
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {destination.city}
                </h3>
                <p className="text-sm text-gray-600">{destination.country}</p>
                <p className="mt-2 text-lg font-bold text-green-600">
                  {destination.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
