import { useState, useEffect } from 'react';

interface User {
	name: string;
	email: string;
	avatar: string;
	initials: string;
}

export const useAuthDemo = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user] = useState<User>({
		name: 'John Doe',
		email: 'john.doe@example.com',
		avatar: 'https://github.com/shadcn.png',
		initials: 'JD',
	});

	// Load demo login state from localStorage on hook initialization
	useEffect(() => {
		const demoLoggedIn = localStorage.getItem('demoLoggedIn') === 'true';
		setIsLoggedIn(demoLoggedIn);
	}, []);

	const login = () => {
		setIsLoggedIn(true);
		localStorage.setItem('demoLoggedIn', 'true');
	};

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('demoLoggedIn');
	};

	return {
		isLoggedIn,
		user,
		login,
		logout,
	};
};
