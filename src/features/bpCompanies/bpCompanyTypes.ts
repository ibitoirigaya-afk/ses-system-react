export type BpCompany = {
	id: number;
	name: string;
	contactPerson: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	memo: string | null;
	engineersCount: number;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
};

export type BpCompanyFormData = {
	name: string;
	contactPerson: string;
	email: string;
	phone: string;
	address: string;
	memo: string;
};
