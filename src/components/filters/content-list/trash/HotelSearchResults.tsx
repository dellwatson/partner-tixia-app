// import { useNavigate } from '@tanstack/react-router';
// import { Star, MapPin, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
// import { Button } from '~/components/ui/button';
// import { useLocaleStore } from '~/stores/locale-store';

// interface SearchData {
//   location: string;
//   checkIn: string;
//   checkOut: string;
//   guests: string;
//   rooms: string;
// }

// interface HotelSearchResultsProps {
//   searchData: SearchData;
//   onHotelSelect: (hotelId: string) => void;
// }

// // Mock hotel results - in real app this would come from API
// const mockHotels = [
//   {
//     id: 'marina-bay-sands-singapore',
//     name: 'Marina Bay Sands',
//     rating: 5,
//     reviewCount: 12847,
//     reviewScore: 8.9,
//     image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
//     location: 'Marina Bay, Singapore',
//     distance: '0.2 km from city center',
//     price: '$450',
//     originalPrice: '$520',
//     amenities: ['wifi', 'parking', 'restaurant', 'gym'],
//     description: 'Luxury hotel with infinity pool and stunning city views'
//   },
//   {
//     id: 'raffles-singapore',
//     name: 'Raffles Singapore',
//     rating: 5,
//     reviewCount: 8934,
//     reviewScore: 9.2,
//     image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
//     location: 'Colonial District, Singapore',
//     distance: '0.5 km from city center',
//     price: '$680',
//     originalPrice: '$750',
//     amenities: ['wifi', 'restaurant', 'gym'],
//     description: 'Historic luxury hotel with colonial charm and world-class service'
//   },
//   {
//     id: 'pan-pacific-singapore',
//     name: 'Pan Pacific Singapore',
//     rating: 4,
//     reviewCount: 15623,
//     reviewScore: 8.7,
//     image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
//     location: 'Marina Centre, Singapore',
//     distance: '0.3 km from city center',
//     price: '$320',
//     originalPrice: '$380',
//     amenities: ['wifi', 'parking', 'restaurant', 'gym'],
//     description: 'Modern hotel with harbor views and excellent facilities'
//   }
// ];

// const amenityIcons = {
//   wifi: Wifi,
//   parking: Car,
//   restaurant: Coffee,
//   gym: Dumbbell
// };

// export const HotelSearchResults = ({ searchData, onHotelSelect }: HotelSearchResultsProps) => {
//   const navigate = useNavigate();
//   const { buildPath } = useLocaleStore();

//   const handleHotelClick = (hotelId: string) => {
//     onHotelSelect(hotelId);
//     // Navigate to hotel detail with current search params
//     const currentParams = new URLSearchParams(window.location.search);
//     navigate(buildPath(`/hotels/${hotelId}?${currentParams.toString()}`));
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900">
//           {mockHotels.length} hotels found in {searchData.location}
//         </h2>
//         <p className="text-sm text-gray-600">
//           Prices per night include taxes and fees
//         </p>
//       </div>

//       {mockHotels.map((hotel) => (
//         <div
//           key={hotel.id}
//           className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
//           onClick={() => handleHotelClick(hotel.id)}
//         >
//           <div className="p-6">
//             <div className="flex space-x-4">
//               {/* Hotel Image */}
//               <div className="flex-shrink-0">
//                 <img
//                   src={hotel.image}
//                   alt={hotel.name}
//                   className="w-48 h-32 object-cover rounded-lg"
//                 />
//               </div>

//               {/* Hotel Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                       {hotel.name}
//                     </h3>
                    
//                     {/* Rating */}
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="flex items-center">
//                         {[...Array(hotel.rating)].map((_, i) => (
//                           <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600">
//                         {hotel.reviewScore}/10 ({hotel.reviewCount.toLocaleString()} reviews)
//                       </span>
//                     </div>

//                     {/* Location */}
//                     <div className="flex items-center text-sm text-gray-600 mb-2">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span>{hotel.location} • {hotel.distance}</span>
//                     </div>

//                     {/* Description */}
//                     <p className="text-sm text-gray-600 mb-3">{hotel.description}</p>

//                     {/* Amenities */}
//                     <div className="flex items-center space-x-3">
//                       {hotel.amenities.map((amenity) => {
//                         const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
//                         return IconComponent ? (
//                           <div key={amenity} className="flex items-center text-xs text-gray-500">
//                             <IconComponent className="h-4 w-4 mr-1" />
//                             <span className="capitalize">{amenity}</span>
//                           </div>
//                         ) : null;
//                       })}
//                     </div>
//                   </div>

//                   {/* Price and Book Button */}
//                   <div className="ml-6 text-right flex-shrink-0">
//                     <div className="mb-2">
//                       {hotel.originalPrice && (
//                         <p className="text-sm text-gray-500 line-through">
//                           {hotel.originalPrice}
//                         </p>
//                       )}
//                       <p className="text-2xl font-bold text-blue-600">
//                         {hotel.price}
//                       </p>
//                       <p className="text-xs text-gray-500">per night</p>
//                     </div>
                    
//                     <Button 
//                       className="bg-blue-600 hover:bg-blue-700 w-full"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleHotelClick(hotel.id);
//                       }}
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
