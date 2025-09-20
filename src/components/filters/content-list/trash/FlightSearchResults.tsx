// import { useNavigate } from '@tanstack/react-router';
// import { Plane, Clock, ArrowRight } from 'lucide-react';
// import { Button } from '~/components/ui/button';

// interface SearchData {
//   from: string;
//   to: string;
//   fromLocationName: string;
//   toLocationName: string;
//   depart: string;
//   return: string;
//   adults: string;
//   cabinClass: string;
//   type: string;
//   sort: string;
// }

// interface FlightSearchResultsProps {
//   searchData: SearchData;
//   onFlightSelect: (flightId: string) => void;
// }

// // Mock flight results - in real app this would come from API
// const mockFlights = [
//   {
//     id: 'd6a1f_H4sIAAAAAAAA_y2Qa2-zIBzFP033TgS81SVk2bTdutm6irbZK2IRL7uURli0fvqHpy6Qc37nEMI_tFpf1L1t199d02pldZX1qyrQSC2bUgvA5Y9d90ZOUn5158Yuu95-fcvpZoddunq3kW2Zxe8_HsSoLdVzctedBCgVJ4j-YU984HthmBQU3iouNXFBAN1luMdJ9j6XPXmBWVHEt1SRbayGdHpdpdM6TafNlE582MWNV-QbuP-CwTbPaEaHcQchTtbtOo_G47GQaps3zsH0aVwdkgjR4lO_7Olwza6Dc4iGIYngmMRtkaxWC2d-THAzLQBuEKJblqUi7kxcEzQPLStNcvzkR49z1MQL4Hw0EuT4OATIhXh5p8S34LqT5zdxJftnD_uW-StxwZ71scBReR66emlg4Tya3TBotL1pyejW2IkFa2N8toqVPBQGBHMwLA3UzDXaMQQg-H_tk22Oxia25Gi81P8AbpZ2tdQBAAA',
//     airline: 'Singapore Airlines',
//     flightNumber: 'SQ 955',
//     departure: '14:30',
//     arrival: '17:45',
//     duration: '3h 15m',
//     price: '$299',
//     stops: 'Direct',
//     aircraft: 'Boeing 737-800'
//   },
//   {
//     id: 'e7b2g_H5sJBBBBBBB_z3Rb3-aJCaGP044TgS82SVk3bUeutm7jrbZL3IRL8uURli1gvqHqy7Rd48nEMJ_uGqf2M2t290e03qmldZY2ryrRTC3bUhvB6Z9e91aOUo6259bvv96-gdvpZpddvnr4kW3Zye9_IsTpLdWactfeBDgWK5j-ZU985HuhmCQV4iouOXGBBN2muMeK-k7YPYmCWWHFt2SRcayHeIpdqeM7TbfOlF683MXNW-RcuQ-DwUbQaFaIdRchUtctPo_H57GRbps4zsI1aVxekhjS5lP_8Olxza7Ec5iHIZngmNRulaxXD2e-UHBzMQCuFKJcmqUj8kxdEzRQLTtOcvzkS49y2MQL5Hw1EuT5OATJhYh6p9S44LqU6zdyJfunE_uX-TtywZ82scCReS67fmlh4Uya4TBpuL2pyfjX2JkGa3N9toqWPBRGCHMxLA4UzEXaMQRg-I_uk23Oxja36Gi92P8BbqZ3udQCAAB',
//     airline: 'Jetstar Asia',
//     flightNumber: '3K 642',
//     departure: '09:15',
//     arrival: '12:30',
//     duration: '3h 15m',
//     price: '$189',
//     stops: 'Direct',
//     aircraft: 'Airbus A320'
//   },
//   {
//     id: 'f8c3h_I6tKCCCCCCC_a4Sc4-bKDbHP155UhT93TWl4cVfvun8kscaM4JRM9vVSmi2hvqIqz8Se59oFNK_vHrf3N3u391f04rnmmeaZ3syrSTC4cUivC7a9f92bOVp7369cvw97-hevqapeevnr5kX4Zze-_JsTqLeXdtufeBEgXL6j-aU996HvhmDQV5iouPXHBBN3muMfL-l7ZPZmDWXHGt3SRdayIeJpdreM8TcfPlF784MXOW-RduR-EwVbRaGaJdSchVtdtPo_I57GRcps5zsJ2aVxflhjS6lP_9Olxza8Ec6iHIZohmNRvlaxYD3e-VHCzMQDuGKJdmqVj9kxeEzRRLTuOcwzkS59y3MRL6Hw2EuT6OATKhZh7p-S54LqV7zdyJgunF_uY-UtyxZ93scCSeT67gmlh5Uya5TBquL3pygjY2JkHa4N-toqXPBSGCIMxLA5UzFXaMQRh-J_vk23Pxja47Gi-3P8CbqZ4udQDAAB',
//     airline: 'Scoot',
//     flightNumber: 'TR 186',
//     departure: '21:45',
//     arrival: '01:00+1',
//     duration: '3h 15m',
//     price: '$159',
//     stops: 'Direct',
//     aircraft: 'Boeing 787-9'
//   }
// ];

// export const FlightSearchResults = ({ searchData, onFlightSelect }: FlightSearchResultsProps) => {
//   const navigate = useNavigate();

//   const handleFlightClick = (flightId: string) => {
//     onFlightSelect(flightId);
//     // Navigate to flight detail with booking.com-style URL
//     const route = `${searchData.from}-${searchData.to}`;
//     const currentParams = new URLSearchParams(window.location.search);
//     navigate(`/flights/${route}/${flightId}?${currentParams.toString()}`);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900">
//           {mockFlights.length} flights found
//         </h2>
//         <p className="text-sm text-gray-600">
//           Prices include taxes and fees
//         </p>
//       </div>

//       {mockFlights.map((flight) => (
//         <div
//           key={flight.id}
//           className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
//           onClick={() => handleFlightClick(flight.id)}
//         >
//           <div className="p-6">
//             <div className="flex items-center justify-between">
//               {/* Flight Info */}
//               <div className="flex-1">
//                 <div className="flex items-center space-x-4 mb-2">
//                   <Plane className="h-5 w-5 text-blue-600" />
//                   <span className="font-medium text-gray-900">
//                     {flight.airline} {flight.flightNumber}
//                   </span>
//                   <span className="text-sm text-gray-500">{flight.aircraft}</span>
//                 </div>
                
//                 <div className="flex items-center space-x-6">
//                   {/* Departure */}
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-gray-900">{flight.departure}</p>
//                     <p className="text-sm text-gray-600">{searchData.from}</p>
//                   </div>
                  
//                   {/* Duration */}
//                   <div className="flex-1 flex items-center justify-center">
//                     <div className="text-center">
//                       <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
//                       <p className="text-sm text-gray-600">{flight.duration}</p>
//                       <p className="text-xs text-gray-500">{flight.stops}</p>
//                     </div>
//                   </div>
                  
//                   {/* Arrival */}
//                   <div className="text-center">
//                     <p className="text-xl font-bold text-gray-900">{flight.arrival}</p>
//                     <p className="text-sm text-gray-600">{searchData.to}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Price and Book Button */}
//               <div className="ml-6 text-right">
//                 <p className="text-2xl font-bold text-blue-600 mb-2">{flight.price}</p>
//                 <Button 
//                   className="bg-blue-600 hover:bg-blue-700"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleFlightClick(flight.id);
//                   }}
//                 >
//                   Select Flight
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
