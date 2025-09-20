import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';
import { useSelectionStore } from '~/lib/stores/selection-store';
import { convertFromIDR } from '~/lib/currency';
import { useFlightCheckoutStore } from '~/stores/flight-checkout-store';
import { PriceSummary } from '~/components/payment/PriceSummary';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/$locale/_booking/checkout/seats/$flightId')({
  component: SelectSeatPage,
});

interface Seat {
  id: string;
  row: number;
  letter: string;
  type: 'economy' | 'premium' | 'business';
  status: 'available' | 'occupied' | 'selected' | 'blocked';
  price?: number;
  features?: string[];
}

function SelectSeatPage() {
  const { locale, flightId } = Route.useParams();
  const navigate = useNavigate();
  const getSelection = useSelectionStore((s) => s.getSelection);
  const sel = getSelection(flightId || '');
  const route = sel && sel.type === 'flight' ? sel.item.route : undefined;
  const checkout = useFlightCheckoutStore();

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // Mock seat data - in real app this would come from API
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Business class (rows 1-3)
    for (let row = 1; row <= 3; row++) {
      for (const letter of letters) {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'business',
          status: Math.random() > 0.7 ? 'occupied' : 'available',
          price: 850000,
          features: ['Extra legroom', 'Priority boarding', 'Premium meal'],
        });
      }
    }

    // Premium economy (rows 4-8)
    for (let row = 4; row <= 8; row++) {
      for (const letter of letters) {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'premium',
          status: Math.random() > 0.6 ? 'occupied' : 'available',
          price: 350000,
          features: ['Extra legroom', 'Priority boarding'],
        });
      }
    }

    // Economy class (rows 9-35)
    for (let row = 9; row <= 35; row++) {
      for (const letter of letters) {
        const isExitRow = row === 12 || row === 25;
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: 'economy',
          status: Math.random() > 0.5 ? 'occupied' : 'available',
          price: isExitRow ? 125000 : 0,
          features: isExitRow ? ['Extra legroom'] : undefined,
        });
      }
    }

    return seats;
  };

  const seats = generateSeats();

  const handleSeatSelect = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (seat && seat.status === 'available') {
      setSelectedSeat(seatId);
      if (flightId) {
        checkout.setSeat(flightId, seatId, seat.price || 0);
      }
    }
  };

  const handleContinue = () => {
    navigate({
      to: '/$locale/checkout/payment/$flightId',
      params: {
        locale,
        flightId,
      },
    });
  };

  const getSelectedSeat = () => {
    return seats.find((s) => s.id === selectedSeat);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.id === selectedSeat) return 'bg-blue-600 text-white border-blue-600';
    if (seat.status === 'occupied') return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (seat.status === 'blocked') return 'bg-red-100 text-red-500 cursor-not-allowed';

    switch (seat.type) {
      case 'business':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 cursor-pointer';
      case 'premium':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 cursor-pointer';
      default:
        return seat.price
          ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 cursor-pointer'
          : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 cursor-pointer';
    }
  };

  const groupedSeats = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    },
    {} as Record<number, Seat[]>
  );

  const getExtrasPriceIDR = () => 293914; // stored in IDR
  const getSeatPriceIDR = () => getSelectedSeat()?.price || 0; // treat as IDR for add-on

  // Convert to selected currency for display & totals (only need seat for conditional row)
  const seatSelected = convertFromIDR(getSeatPriceIDR());

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 text-sm text-gray-600">
          {sel && sel.type === 'flight' && 'outbound' in sel.item
            ? 'Round trip'
            : 'One way'}{' '}
          • 1 traveller
        </div>
        <h1 className="mb-4 text-3xl font-bold">
          {route ? `${route.from.city} to ${route.to.city}` : 'Your trip'}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Seat Map */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">Select your seat</h2>

          {/* Legend */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-3 font-medium">Seat types</h3>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-purple-200 bg-purple-100"></div>
                <span>Business</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-blue-200 bg-blue-100"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-green-200 bg-green-100"></div>
                <span>Extra legroom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-gray-200 bg-gray-100"></div>
                <span>Standard</span>
              </div>
            </div>
          </div>

          {/* Seat Map */}
          <div className="overflow-x-auto rounded-lg border bg-white p-6">
            <div className="min-w-[400px]">
              {/* Aircraft nose indicator */}
              <div className="mb-4 text-center text-sm text-gray-500">
                ✈️ Front of aircraft
              </div>

              {Object.entries(groupedSeats).map(([rowNum, rowSeats]) => {
                const row = parseInt(rowNum);
                return (
                  <div key={row} className="mb-2">
                    {/* Section dividers */}
                    {row === 4 && (
                      <div className="my-4 border-t border-gray-300 pt-4">
                        <div className="mb-2 text-center text-sm text-gray-500">
                          Premium Economy
                        </div>
                      </div>
                    )}
                    {row === 9 && (
                      <div className="my-4 border-t border-gray-300 pt-4">
                        <div className="mb-2 text-center text-sm text-gray-500">
                          Economy
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="w-8 text-right text-sm text-gray-500">
                        {row}
                      </div>

                      {/* Left side seats (A, B, C) */}
                      <div className="flex gap-1">
                        {rowSeats.slice(0, 3).map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatSelect(seat.id)}
                            disabled={
                              seat.status === 'occupied' || seat.status === 'blocked'
                            }
                            className={cn(
                              'h-8 w-8 rounded border text-xs font-medium transition-colors',
                              getSeatColor(seat)
                            )}
                            title={`${seat.id} - ${seat.type} ${seat.price ? `(+IDR${seat.price.toLocaleString()})` : ''}`}
                          >
                            {seat.letter}
                          </button>
                        ))}
                      </div>

                      {/* Aisle */}
                      <div className="w-6"></div>

                      {/* Right side seats (D, E, F) */}
                      <div className="flex gap-1">
                        {rowSeats.slice(3, 6).map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatSelect(seat.id)}
                            disabled={
                              seat.status === 'occupied' || seat.status === 'blocked'
                            }
                            className={cn(
                              'h-8 w-8 rounded border text-xs font-medium transition-colors',
                              getSeatColor(seat)
                            )}
                            title={`${seat.id} - ${seat.type} ${seat.price ? `(+IDR${seat.price.toLocaleString()})` : ''}`}
                          >
                            {seat.letter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Seat Info */}
          {selectedSeat && (
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-medium text-blue-900">
                Selected seat: {selectedSeat}
              </h3>
              <div className="text-sm text-blue-800">
                {getSelectedSeat()?.features && (
                  <div className="mb-1">
                    Features: {getSelectedSeat()?.features?.join(', ')}
                  </div>
                )}
                {getSeatPriceIDR() > 0 && (
                  <div>Additional cost: IDR{getSeatPriceIDR().toLocaleString()}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Price Summary */}
        <div className="lg:col-span-1">
          {flightId && (
            <PriceSummary
              title="Price summary"
              items={(() => {
                const b = checkout.getSelectedBreakdown(flightId);
                const arr = [
                  { label: 'Flight', amount: b.baseSelected },
                  { label: 'Extras', amount: b.extrasSelected },
                ];
                if (seatSelected > 0) arr.push({ label: 'Seat selection', amount: seatSelected });
                return arr;
              })()}
              total={checkout.getSelectedBreakdown(flightId).totalSelected}
              buttonText="Continue"
              buttonDisabled={!selectedSeat}
              isProcessing={false}
              onButtonClick={() => navigate({
                to: '/$locale/checkout/payment/$flightId',
                params: { locale, flightId }
              })}
            />
          )}
        </div>
      </div>
      </Container>
    </div>
  );
}
