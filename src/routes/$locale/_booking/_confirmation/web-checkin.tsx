import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { TextureButton } from '~/components/ui/texture-button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Container } from '~/components/ui/container';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { Smartphone, Plane, Clock, Users, MapPin, CheckCircle, AlertTriangle, Download } from 'lucide-react';

export const Route = createFileRoute('/$locale/_booking/_confirmation/web-checkin')({
  component: WebCheckinPage,
  validateSearch: (search: Record<string, unknown>) => ({
    bookingRef: search.bookingRef as string,
  }),
});

function WebCheckinPage() {
  const { locale } = Route.useParams();
  const { bookingRef } = Route.useSearch();
  const navigate = useNavigate();
  
  const [checkinStep, setCheckinStep] = useState<'lookup' | 'details' | 'seats' | 'complete'>('lookup');
  const [bookingReference, setBookingReference] = useState(bookingRef || '');
  const [lastName, setLastName] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('12A');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');

  // Mock booking data
  const booking = {
    reference: bookingReference,
    passenger: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    flight: {
      airline: 'Garuda Indonesia',
      flightNumber: 'GA 152',
      from: {
        code: 'CGK',
        city: 'Jakarta',
        airport: 'Soekarno-Hatta International Airport',
        terminal: 'Terminal 3'
      },
      to: {
        code: 'DPS',
        city: 'Denpasar',
        airport: 'Ngurah Rai International Airport'
      },
      departure: {
        date: '2024-03-15',
        time: '08:30',
        gate: 'A12'
      },
      arrival: {
        time: '11:45'
      },
      class: 'Economy'
    }
  };

  const handleLookupBooking = () => {
    if (bookingReference && lastName) {
      setCheckinStep('details');
    }
  };

  const handleConfirmDetails = () => {
    setCheckinStep('seats');
  };

  const handleCompleteCheckin = () => {
    if (acceptTerms) {
      setCheckinStep('complete');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderLookupStep = () => (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Web Check-in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="booking-ref">Booking Reference</Label>
          <Input
            id="booking-ref"
            value={bookingReference}
            onChange={(e) => setBookingReference(e.target.value)}
            placeholder="Enter booking reference"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter passenger last name"
            className="mt-1"
          />
        </div>
        <TextureButton 
          variant="primary" 
          className="w-full"
          onClick={handleLookupBooking}
          disabled={!bookingReference || !lastName}
        >
          Find Booking
        </TextureButton>
      </CardContent>
    </Card>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{booking.flight.from.code}</div>
              <div className="text-sm text-gray-600">{booking.flight.from.city}</div>
              <div className="text-lg font-semibold mt-2">{booking.flight.departure.time}</div>
              <div className="text-sm text-gray-600">{formatDate(booking.flight.departure.date)}</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-4">
              <Plane className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{booking.flight.to.code}</div>
              <div className="text-sm text-gray-600">{booking.flight.to.city}</div>
              <div className="text-lg font-semibold mt-2">{booking.flight.arrival.time}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Flight:</span>
              <div className="font-medium">{booking.flight.flightNumber}</div>
            </div>
            <div>
              <span className="text-gray-600">Class:</span>
              <div className="font-medium">{booking.flight.class}</div>
            </div>
            <div>
              <span className="text-gray-600">Terminal:</span>
              <div className="font-medium">{booking.flight.from.terminal}</div>
            </div>
            <div>
              <span className="text-gray-600">Gate:</span>
              <div className="font-medium">{booking.flight.departure.gate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Name:</span>
              <div className="font-medium">{booking.passenger.name}</div>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <div className="font-medium">{booking.passenger.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <TextureButton 
          variant="outline" 
          onClick={() => setCheckinStep('lookup')}
        >
          Back
        </TextureButton>
        <TextureButton 
          variant="primary" 
          className="flex-1"
          onClick={handleConfirmDetails}
        >
          Continue to Seat Selection
        </TextureButton>
      </div>
    </div>
  );

  const renderSeatsStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Seat Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Current Seat Assignment</span>
            </div>
            <div className="text-lg font-bold text-blue-900">Seat {selectedSeat}</div>
            <p className="text-sm text-blue-700">Window seat, Economy class</p>
          </div>

          <div>
            <Label htmlFor="emergency-contact">Emergency Contact (Optional)</Label>
            <Input
              id="emergency-contact"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Emergency contact phone number"
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={setAcceptTerms}
            />
            <Label htmlFor="terms" className="text-sm">
              I confirm that all passenger information is correct and I accept the terms and conditions
            </Label>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800">Important Reminders</div>
                <ul className="text-yellow-700 mt-1 space-y-1">
                  <li>• Arrive at airport 2 hours before departure</li>
                  <li>• Bring valid ID and travel documents</li>
                  <li>• Check baggage restrictions</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <TextureButton 
          variant="outline" 
          onClick={() => setCheckinStep('details')}
        >
          Back
        </TextureButton>
        <TextureButton 
          variant="primary" 
          className="flex-1"
          onClick={handleCompleteCheckin}
          disabled={!acceptTerms}
        >
          Complete Check-in
        </TextureButton>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-in Complete!</h2>
        <p className="text-gray-600">
          Your boarding pass is ready. You can download it or receive it via email.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Flight:</span>
              <span className="font-medium">{booking.flight.flightNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seat:</span>
              <span className="font-medium">{selectedSeat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gate:</span>
              <span className="font-medium">{booking.flight.departure.gate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Boarding:</span>
              <span className="font-medium">07:45</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <TextureButton 
          variant="primary" 
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Boarding Pass
        </TextureButton>
        
        <TextureButton 
          variant="outline" 
          className="w-full"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Send to Mobile
        </TextureButton>
      </div>

      <TextureButton 
        variant="ghost"
        onClick={() => navigate({ 
          to: `/${locale}/_booking/_confirmation/confirmation`, 
          params: { locale },
          search: { flightId: 'GA152', bookingRef: booking.reference }
        })}
      >
        Back to Booking Details
      </TextureButton>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Web Check-in</h1>
          <p className="text-lg text-gray-600">
            Check in online and get your boarding pass
          </p>
        </div>

        {/* Progress Steps */}
        {checkinStep !== 'lookup' && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {['details', 'seats', 'complete'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    checkinStep === step 
                      ? 'bg-blue-600 text-white' 
                      : ['details', 'seats', 'complete'].indexOf(checkinStep) > index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {['details', 'seats', 'complete'].indexOf(checkinStep) > index ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      ['details', 'seats', 'complete'].indexOf(checkinStep) > index ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {checkinStep === 'lookup' && renderLookupStep()}
        {checkinStep === 'details' && renderDetailsStep()}
        {checkinStep === 'seats' && renderSeatsStep()}
        {checkinStep === 'complete' && renderCompleteStep()}
      </Container>
    </div>
  );
}
