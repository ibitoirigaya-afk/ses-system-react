export type UserRole = "admin" | "user" | "company";

export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	role: UserRole;
};
