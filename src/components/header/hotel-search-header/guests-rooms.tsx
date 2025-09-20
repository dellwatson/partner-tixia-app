import { useState } from 'react';
import { Users, Minus, Plus, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TextureButton } from '~/components/ui/texture-button';
import { SearchInputWrapper } from '~/components/ui/search-input-wrapper';

interface GuestsRoomsProps {
  guests: number;
  rooms: number;
  onChange: (guests: number, rooms: number) => void;
}

export const GuestsRooms = ({ guests, rooms, onChange }: GuestsRoomsProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(guests);
  const [children, setChildren] = useState(0);
  const [roomCount, setRoomCount] = useState(rooms);


  const getDisplayText = () => {
    const totalGuests = adults + children;
    const guestText = totalGuests === 1 ? 'adult' : 'adults';
    const childText = children > 0 ? ` · ${children} children` : '';
    const roomText = roomCount === 1 ? 'room' : 'rooms';
    
    return `${totalGuests} ${guestText}${childText} · ${roomCount} ${roomText}`;
  };

  const handleDone = () => {
    onChange(adults + children, roomCount);
    setIsOpen(false);
  };

  const updateAdults = (value: number) => {
    const newValue = Math.max(1, Math.min(30, value));
    setAdults(newValue);
  };

  const updateChildren = (value: number) => {
    const newValue = Math.max(0, Math.min(10, value));
    setChildren(newValue);
  };

  const updateRooms = (value: number) => {
    const newValue = Math.max(1, Math.min(30, value));
    setRoomCount(newValue);
  };

  // Guest room content component
  const GuestRoomContent = () => (
    <div className="space-y-4">
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">
            Adults
          </div>
          <div className="text-sm text-gray-500">
            Age 18+
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateAdults(adults - 1)}
            disabled={adults <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">
            {adults}
          </span>
          <button
            onClick={() => updateAdults(adults + 1)}
            disabled={adults >= 30}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">
            Children
          </div>
          <div className="text-sm text-gray-500">
            Age 0 - 17
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateChildren(children - 1)}
            disabled={children <= 0}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">
            {children}
          </span>
          <button
            onClick={() => updateChildren(children + 1)}
            disabled={children >= 10}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Rooms */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">
            Rooms
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateRooms(roomCount - 1)}
            disabled={roomCount <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">
            {roomCount}
          </span>
          <button
            onClick={() => updateRooms(roomCount + 1)}
            disabled={roomCount >= 30}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="font-medium text-gray-900">
        </span>
        <div>
          <TextureButton
            variant="accent"
            onClick={handleDone}
          >
            Done
          </TextureButton>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex-1">
      <SearchInputWrapper
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Select Guests & Rooms"
        content={<div className="p-4"><GuestRoomContent /></div>}
        centered={true}
        popoverClassName="w-80"
      >
        <button className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none h-[48px] md:h-[56px] cursor-pointer">
          <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="text-sm text-gray-600 mb-1">
              Guests & rooms
            </div>
            <div className="text-base font-medium truncate">
              {getDisplayText()}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
      </SearchInputWrapper>
    </div>
  );
};
