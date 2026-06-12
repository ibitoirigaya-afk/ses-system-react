export type WorkRecord = {
	id: number;
	projectId: number;
	engineerId: number;
	targetMonth: string;
	workingHours: number;
	billingAmount: number;
	paymentAmount: number;
	grossProfit: number;
	memo: string;
	deletedAt?: string | null;
};
