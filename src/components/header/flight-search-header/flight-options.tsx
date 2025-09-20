import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import { SelectNative } from '~/components/ui/select-native';
import { Checkbox } from '~/components/ui/checkbox';

export type CabinClass = 'economy' | 'premium-economy' | 'business' | 'first';

interface FlightOptionsProps {
	tripType: 'ROUNDTRIP' | 'ONEWAY';
	cabinClass: CabinClass;
	directFlightsOnly: boolean;
	onTripTypeChange: (value: 'ROUNDTRIP' | 'ONEWAY') => void;
	onCabinClassChange: (value: CabinClass) => void;
	onDirectFlightsChange: (checked: boolean) => void;
}

export const FlightOptions = ({
	tripType,
	cabinClass,
	directFlightsOnly,
	onTripTypeChange,
	onCabinClassChange,
	onDirectFlightsChange,
}: FlightOptionsProps) => {
	const { t } = useTranslation();

	const cabinClasses = [
		{ value: 'economy' as const, label: t('economy', 'Economy') },
		{ value: 'premium-economy' as const, label: t('premium_economy', 'Premium Economy') },
		{ value: 'business' as const, label: t('business', 'Business') },
		{ value: 'first' as const, label: t('first_class', 'First Class') },
	];

	return (
		<div className="mt-4 mb-0 ml-2 flex items-center gap-4 md:my-1 md:mt-0">
			{/* Trip Type Selector */}
			<RadioGroup
				value={tripType}
				onValueChange={onTripTypeChange}
				className="flex items-center space-x-2 md:my-2"
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="ROUNDTRIP" id="roundtrip" />
					<Label
						htmlFor="roundtrip"
						className="cursor-pointer text-sm font-medium text-gray-700"
					>
						{t('round_trip', 'Round trip')}
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="ONEWAY" id="oneway" />
					<Label
						htmlFor="oneway"
						className="cursor-pointer text-sm font-medium text-gray-700"
					>
						{t('one_way', 'One way')}
					</Label>
				</div>
			</RadioGroup>

			{/* Direct Flights Checkbox - Hidden on mobile */}
			<div className="hidden items-center space-x-2 md:flex">
				<Checkbox
					id="direct-flights"
					checked={directFlightsOnly}
					onCheckedChange={onDirectFlightsChange}
				/>
				<Label
					htmlFor="direct-flights"
					className="cursor-pointer text-sm font-medium text-gray-700"
				>
					{t('direct_flights_only', 'Direct flights only')}
				</Label>
			</div>

			{/* Cabin Class Selector - Hidden on mobile */}
			<SelectNative
				value={cabinClass}
				onChange={(e) => onCabinClassChange(e.target.value as CabinClass)}
				className="hidden h-8 w-auto min-w-[120px] shadow-none md:block"
			>
				{cabinClasses.map((cabinClassOption) => (
					<option key={cabinClassOption.value} value={cabinClassOption.value}>
						{cabinClassOption.label}
					</option>
				))}
			</SelectNative>
		</div>
	);
};
