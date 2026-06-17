import { useEffect, useState } from "react";
import type { Project } from "../features/projects/projectTypes";
import type { Skill } from "../features/skills/skillTypes";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

type ApiProject = {
	id: number;
	user_id: number;
	title: string;
	description: string;
	location: string;
	unit_price: number;
	status: Project["status"];
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	skills: Skill[];
};

type ApiActionResult = {
	success: boolean;
	message?: string;
};

const convertApiProjectToProject = (apiProject: ApiProject): Project => {
	return {
		id: apiProject.id,
		userId: apiProject.user_id,
		title: apiProject.title,
		description: apiProject.description,
		location: apiProject.location,
		unitPrice: apiProject.unit_price,
		status: apiProject.status,
		skills: apiProject.skills,
		deletedAt: apiProject.deleted_at,
	};
};

export function useProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoadingProjects, setIsLoadingProjects] = useState(true);
	const [projectError, setProjectError] = useState("");

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setIsLoadingProjects(true);
				setProjectError("");

				const response = await fetch(`${API_BASE_URL}/projects`);

				if (!response.ok) {
					throw new Error("案件一覧の取得に失敗しました。");
				}

				const data: ApiProject[] = await response.json();
				const convertedProjects = data.map(convertApiProjectToProject);

				setProjects(convertedProjects);
			} catch (error) {
				console.error(error);
				setProjectError("案件一覧の取得に失敗しました。");
			} finally {
				setIsLoadingProjects(false);
			}
		};

		fetchProjects();
	}, []);

	const createProject = async (project: Project): Promise<ApiActionResult> => {
		try {
			setProjectError("");

			const response = await fetch(`${API_BASE_URL}/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: project.userId,
					title: project.title,
					description: project.description,
					location: project.location,
					unit_price: project.unitPrice,
					status: project.status,
					skill_ids: project.skills.map((skill) => skill.id),
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "案件の登録に失敗しました。");
			}

			const createdProject: ApiProject = await response.json();
			const convertedProject = convertApiProjectToProject(createdProject);

			setProjects((prev) => [convertedProject, ...prev]);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "案件の登録に失敗しました。";

			setProjectError(message);

			return {
				success: false,
				message,
			};
		}
	};

	const updateProject = async (
		updatedProject: Project,
	): Promise<ApiActionResult> => {
		try {
			setProjectError("");

			const response = await fetch(
				`${API_BASE_URL}/projects/${updatedProject.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: updatedProject.userId,
						title: updatedProject.title,
						description: updatedProject.description,
						location: updatedProject.location,
						unit_price: updatedProject.unitPrice,
						status: updatedProject.status,
						skill_ids: updatedProject.skills.map((skill) => skill.id),
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "案件の更新に失敗しました。");
			}

			const savedProject: ApiProject = await response.json();
			const convertedProject = convertApiProjectToProject(savedProject);

			setProjects((prev) =>
				prev.map((project) =>
					project.id === convertedProject.id ? convertedProject : project,
				),
			);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "案件の更新に失敗しました。";

			setProjectError(message);

			return {
				success: false,
				message,
			};
		}
	};

	const deleteProject = async (projectId: number): Promise<ApiActionResult> => {
		try {
			setProjectError("");

			const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "案件の削除に失敗しました。");
			}

			setProjects((prev) =>
				prev.map((project) =>
					project.id === projectId
						? {
								...project,
								deletedAt: new Date().toISOString(),
							}
						: project,
				),
			);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "案件の削除に失敗しました。";

			setProjectError(message);

			return {
				success: false,
				message,
			};
		}
	};

	const restoreProject = async (
		projectId: number,
	): Promise<ApiActionResult> => {
		try {
			setProjectError("");

			const response = await fetch(
				`${API_BASE_URL}/projects/${projectId}/restore`,
				{
					method: "PATCH",
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "案件の復元に失敗しました。");
			}

			const restoredProject: ApiProject = await response.json();
			const convertedProject = convertApiProjectToProject(restoredProject);

			setProjects((prev) =>
				prev.map((project) =>
					project.id === convertedProject.id ? convertedProject : project,
				),
			);

			return {
				success: true,
			};
		} catch (error) {
			console.error(error);

			const message =
				error instanceof Error ? error.message : "案件の復元に失敗しました。";

			setProjectError(message);

			return {
				success: false,
				message,
			};
		}
	};

	return {
		projects,
		setProjects,
		isLoadingProjects,
		projectError,
		createProject,
		updateProject,
		deleteProject,
		restoreProject,
	};
}
