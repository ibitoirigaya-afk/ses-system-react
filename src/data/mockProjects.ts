import type { Project } from "../features/projects/projectTypes";
import { mockSkills } from "./mockSkills";

export const mockProjects: Project[] = [
	{
		id: 1,
		userId: 3,
		title: "React管理画面開発案件",
		description: "SES営業管理システムのフロントエンド開発案件です。",
		location: "東京都 渋谷",
		unitPrice: 750000,
		status: "募集中",
		skills: [
			mockSkills[3], // TypeScript
			mockSkills[4], // React
			mockSkills[7], // CSS
		],
	},
	{
		id: 2,
		userId: 3,
		title: "Laravel API開発案件",
		description: "既存業務システムのAPI開発案件です。",
		location: "東京都 新宿",
		unitPrice: 700000,
		status: "提案中",
		skills: [
			mockSkills[0], // PHP
			mockSkills[1], // Laravel
			mockSkills[8], // MySQL
		],
	},
];
