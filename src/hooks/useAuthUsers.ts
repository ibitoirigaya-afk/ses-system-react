import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import type { User, UserRole } from "../features/auth/authTypes";
import {
	loadFromStorage,
	removeFromStorage,
	saveToStorage,
} from "../utils/storage";

type ApiUser = {
	id: number;
	name: string;
	email: string;
	role: User["role"];
};

type RegisterInput = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRole;
};

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

const convertApiUserToUser = (apiUser: ApiUser): User => {
	return {
		id: apiUser.id,
		name: apiUser.name,
		email: apiUser.email,
		password: "",
		role: apiUser.role,
	};
};

export function useAuthUsers() {
	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

	const [currentUserId, setCurrentUserId] = useState<number | null>(() =>
		loadFromStorage(STORAGE_KEYS.currentUserId, null),
	);

	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			setIsAuthLoading(true);

			if (currentUserId === null) {
				setCurrentUser(undefined);
				removeFromStorage(STORAGE_KEYS.currentUserId);
				setIsAuthLoading(false);
				return;
			}

			try {
				const response = await fetch(
					`${API_BASE_URL}/me?user_id=${currentUserId}`,
				);

				if (!response.ok) {
					setCurrentUser(undefined);
					removeFromStorage(STORAGE_KEYS.currentUserId);
					setCurrentUserId(null);
					return;
				}

				const data: { user: ApiUser } = await response.json();
				setCurrentUser(convertApiUserToUser(data.user));
				saveToStorage(STORAGE_KEYS.currentUserId, data.user.id);
			} catch {
				setCurrentUser(undefined);
			} finally {
				setIsAuthLoading(false);
			}
		};

		fetchCurrentUser();
	}, [currentUserId]);

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch(`${API_BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (!response.ok) {
				return false;
			}

			const data: { user: ApiUser } = await response.json();
			const user = convertApiUserToUser(data.user);

			setCurrentUser(user);
			setCurrentUserId(user.id);
			saveToStorage(STORAGE_KEYS.currentUserId, user.id);

			return true;
		} catch {
			return false;
		}
	};

	const register = async (input: RegisterInput) => {
		try {
			const response = await fetch(`${API_BASE_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: input.name,
					email: input.email,
					password: input.password,
					password_confirmation: input.passwordConfirm,
					role: input.role,
				}),
			});

			if (!response.ok) {
				return false;
			}

			const data: { user: ApiUser } = await response.json();
			const user = convertApiUserToUser(data.user);

			setCurrentUser(user);
			setCurrentUserId(user.id);
			saveToStorage(STORAGE_KEYS.currentUserId, user.id);

			return true;
		} catch {
			return false;
		}
	};

	const logout = async () => {
		try {
			await fetch(`${API_BASE_URL}/logout`, {
				method: "POST",
			});
		} finally {
			setCurrentUser(undefined);
			setCurrentUserId(null);
			removeFromStorage(STORAGE_KEYS.currentUserId);
		}
	};

	return {
		currentUser,
		currentUserId,
		isAuthLoading,
		login,
		register,
		logout,
	};
}
