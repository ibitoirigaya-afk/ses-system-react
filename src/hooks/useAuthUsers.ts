import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { mockUsers } from "../data/mockUsers";
import type { User } from "../features/auth/authTypes";
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
	const [users, setUsers] = useState<User[]>(() =>
		loadFromStorage(STORAGE_KEYS.users, mockUsers),
	);

	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

	const [currentUserId, setCurrentUserId] = useState<number | null>(() =>
		loadFromStorage(STORAGE_KEYS.currentUserId, null),
	);

	useEffect(() => {
		saveToStorage(STORAGE_KEYS.users, users);
	}, [users]);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			if (currentUserId === null) {
				setCurrentUser(undefined);
				removeFromStorage(STORAGE_KEYS.currentUserId);
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

	const register = (user: User) => {
		setUsers((prev) => [user, ...prev]);
		setCurrentUser(user);
		setCurrentUserId(user.id);
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
		users,
		currentUser,
		currentUserId,
		login,
		register,
		logout,
	};
}
