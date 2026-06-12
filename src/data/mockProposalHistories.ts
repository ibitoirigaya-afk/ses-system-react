import type { ProposalHistory } from "../features/proposals/proposalTypes";

export const mockProposalHistories: ProposalHistory[] = [
	{
		id: 1,
		projectId: 1,
		engineerId: 1,
		proposedDate: "2026-05-20",
		interviewDate: "2026-05-25",
		interviewResult: "面談予定",
		status: "面談予定",
		memo: "React経験が案件条件と一致。企業側に提案済み。",
	},
	{
		id: 2,
		projectId: 2,
		engineerId: 2,
		proposedDate: "2026-05-18",
		interviewDate: "2026-05-23",
		interviewResult: "結果待ち",
		status: "面談済み",
		memo: "Laravel経験が豊富。単価条件も近い。",
	},
];
