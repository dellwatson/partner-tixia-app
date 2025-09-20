import { useLocaleSync } from '~/stores/locale-store';
import SwitchTravel from './SwitchTravel';

export const Navigation = () => {
	useLocaleSync(); // Sync locale from URL params

	return (
		<div className="flex flex-1 items-center justify-center gap-2 md:justify-start">
			<SwitchTravel />
		</div>
	);
};
