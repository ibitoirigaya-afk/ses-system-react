import { useEffect, useState } from "react";
import type { Skill } from "../features/skills/skillTypes";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

type ApiActionResult = {
	success: boolean;
	message?: string;
};

export function useSkills() {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [isLoadingSkills, setIsLoadingSkills] = useState(true);
	const [skillError, setSkillError] = useState("");

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				setIsLoadingSkills(true);
				setSkillError("");

				const response = await fetch(`${API_BASE_URL}/skills`);

				if (!response.ok) {
					throw new Error("スキル一覧の取得に失敗しました。");
				}

				const data: Skill[] = await response.json();
				setSkills(data);
			} catch (error) {
				console.error(error);
				setSkillError("スキル一覧の取得に失敗しました。");
			} finally {
				setIsLoadingSkills(false);
			}
		};

		fetchSkills();
	}, []);

	const createSkill = async (skill: Skill): Promise<ApiActionResult> => {
		try {
			setSkillError("");

			const response = await fetch(`${API_BASE_URL}/skills`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: skill.name,
					category: skill.category,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "スキルの登録に失敗しました。");
			}

			const createdSkill: Skill = await response.json();

			setSkills((prev) => [createdSkill, ...prev]);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "スキルの登録に失敗しました。";

			setSkillError(message);

			return {
				success: false,
				message,
			};
		}
	};

	const updateSkill = async (updatedSkill: Skill): Promise<ApiActionResult> => {
		try {
			setSkillError("");

			const response = await fetch(
				`${API_BASE_URL}/skills/${updatedSkill.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: updatedSkill.name,
						category: updatedSkill.category,
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "スキルの更新に失敗しました。");
			}

			const savedSkill: Skill = await response.json();

			setSkills((prev) =>
				prev.map((skill) => (skill.id === savedSkill.id ? savedSkill : skill)),
			);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "スキルの更新に失敗しました。";

			setSkillError(message);

			return {
				success: false,
				message,
			};
		}
	};

	const deleteSkill = async (skillId: number): Promise<ApiActionResult> => {
		try {
			setSkillError("");

			const response = await fetch(`${API_BASE_URL}/skills/${skillId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "スキルの削除に失敗しました。");
			}

			setSkills((prev) => prev.filter((skill) => skill.id !== skillId));

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "スキルの削除に失敗しました。";

			setSkillError(message);

			return {
				success: false,
				message,
			};
		}
	};

	return {
		skills,
		isLoadingSkills,
		skillError,
		createSkill,
		updateSkill,
		deleteSkill,
	};
}
