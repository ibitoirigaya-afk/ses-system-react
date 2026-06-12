import type { User } from "../features/auth/authTypes";

export const mockUsers: User[] = [
	{
		id: 1,
		name: "管理者",
		email: "admin@example.com",
		password: "password",
		role: "admin",
	},
	{
		id: 2,
		name: "要員担当ユーザー",
		email: "user@example.com",
		password: "password",
		role: "user",
	},
	{
		id: 3,
		name: "案件登録企業",
		email: "company@example.com",
		password: "password",
		role: "company",
	},
];
