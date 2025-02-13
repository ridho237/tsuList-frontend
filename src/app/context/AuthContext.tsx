'use client';
import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { getProfile, logoutUser } from '../utils/auth';

interface User {
	username: string;
	profileImage: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (userData: User) => void;
	logout: () => void;
	setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			const profile = await getProfile();
			if (profile) {
				setUser(profile);
				setIsAuthenticated(true);
			}
		};
		fetchUser();
	}, []);

	const login = async () => {
		const profile = await getProfile();
		if (profile) {
			setUser(profile);
			setIsAuthenticated(true);
		} else {
			console.log('No user data found during login.');
		}
	};

	// ✅ Fungsi logout
	const logout = async () => {
		await logoutUser();
		setUser(null);
		setIsAuthenticated(false);
	};

	const contextValue = useMemo(
		() => ({ user, setUser, isAuthenticated, login, logout }),
		[user, isAuthenticated]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
