import { useEffect, useState } from "react";
import type { Engineer } from "../features/engineers/engineerTypes";
import type { Skill } from "../features/skills/skillTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiEngineer = {
	id: number;
	user_id: number;
	name: string;
	company_name: string;
	age: number;
	gender: string;
	nearest_station: string;
	desired_unit_price: number;
	experience_years: number;
	available_date: string;
	desired_location: string;
	desired_conditions: string;
	career_summary: string;
	status: Engineer["status"];
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
	skills: Skill[];
};

const convertApiEngineerToEngineer = (apiEngineer: ApiEngineer): Engineer => {
	return {
		id: apiEngineer.id,
		userId: apiEngineer.user_id,
		name: apiEngineer.name,
		companyName: apiEngineer.company_name,
		age: apiEngineer.age,
		gender: apiEngineer.gender,
		nearestStation: apiEngineer.nearest_station,
		desiredUnitPrice: apiEngineer.desired_unit_price,
		experienceYears: apiEngineer.experience_years,
		availableDate: apiEngineer.available_date.slice(0, 10),
		desiredLocation: apiEngineer.desired_location,
		desiredConditions: apiEngineer.desired_conditions,
		careerSummary: apiEngineer.career_summary,
		status: apiEngineer.status,
		skills: apiEngineer.skills,
		deletedAt: apiEngineer.deleted_at,
	};
};

export function useEngineers() {
	const [engineers, setEngineers] = useState<Engineer[]>([]);
	const [isLoadingEngineers, setIsLoadingEngineers] = useState(true);
	const [engineerError, setEngineerError] = useState("");

	useEffect(() => {
		const fetchEngineers = async () => {
			try {
				setIsLoadingEngineers(true);
				setEngineerError("");

				const response = await fetch(`${API_BASE_URL}/engineers`);

				if (!response.ok) {
					throw new Error("要員一覧の取得に失敗しました。");
				}

				const data: ApiEngineer[] = await response.json();
				const convertedEngineers = data.map(convertApiEngineerToEngineer);

				setEngineers(convertedEngineers);
			} catch (error) {
				console.error(error);
				setEngineerError("要員一覧の取得に失敗しました。");
			} finally {
				setIsLoadingEngineers(false);
			}
		};

		fetchEngineers();
	}, []);

	const createEngineer = async (engineer: Engineer) => {
		try {
			setEngineerError("");

			const response = await fetch(`${API_BASE_URL}/engineers`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: engineer.userId,
					name: engineer.name,
					company_name: engineer.companyName,
					age: engineer.age,
					gender: engineer.gender,
					nearest_station: engineer.nearestStation,
					desired_unit_price: engineer.desiredUnitPrice,
					experience_years: engineer.experienceYears,
					available_date: engineer.availableDate,
					desired_location: engineer.desiredLocation,
					desired_conditions: engineer.desiredConditions,
					career_summary: engineer.careerSummary,
					status: engineer.status,
					skill_ids: engineer.skills.map((skill) => skill.id),
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "要員の登録に失敗しました。");
			}

			const createdEngineer: ApiEngineer = await response.json();
			const convertedEngineer = convertApiEngineerToEngineer(createdEngineer);

			setEngineers((prev) => [convertedEngineer, ...prev]);
		} catch (error) {
			console.error(error);
			setEngineerError(
				error instanceof Error ? error.message : "要員の登録に失敗しました。",
			);
		}
	};

	const updateEngineer = async (updatedEngineer: Engineer) => {
		try {
			setEngineerError("");

			const response = await fetch(
				`${API_BASE_URL}/engineers/${updatedEngineer.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: updatedEngineer.userId,
						name: updatedEngineer.name,
						company_name: updatedEngineer.companyName,
						age: updatedEngineer.age,
						gender: updatedEngineer.gender,
						nearest_station: updatedEngineer.nearestStation,
						desired_unit_price: updatedEngineer.desiredUnitPrice,
						experience_years: updatedEngineer.experienceYears,
						available_date: updatedEngineer.availableDate,
						desired_location: updatedEngineer.desiredLocation,
						desired_conditions: updatedEngineer.desiredConditions,
						career_summary: updatedEngineer.careerSummary,
						status: updatedEngineer.status,
						skill_ids: updatedEngineer.skills.map((skill) => skill.id),
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "要員の更新に失敗しました。");
			}

			const savedEngineer: ApiEngineer = await response.json();
			const convertedEngineer = convertApiEngineerToEngineer(savedEngineer);

			setEngineers((prev) =>
				prev.map((engineer) =>
					engineer.id === convertedEngineer.id ? convertedEngineer : engineer,
				),
			);
		} catch (error) {
			console.error(error);
			setEngineerError(
				error instanceof Error ? error.message : "要員の更新に失敗しました。",
			);
		}
	};

	const deleteEngineer = async (engineerId: number) => {
		try {
			setEngineerError("");

			const response = await fetch(`${API_BASE_URL}/engineers/${engineerId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "要員の削除に失敗しました。");
			}

			setEngineers((prev) =>
				prev.map((engineer) =>
					engineer.id === engineerId
						? {
								...engineer,
								deletedAt: new Date().toISOString(),
							}
						: engineer,
				),
			);
		} catch (error) {
			console.error(error);
			setEngineerError(
				error instanceof Error ? error.message : "要員の削除に失敗しました。",
			);
		}
	};

	const restoreEngineer = async (engineerId: number) => {
		try {
			setEngineerError("");

			const response = await fetch(
				`${API_BASE_URL}/engineers/${engineerId}/restore`,
				{
					method: "PATCH",
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);

				throw new Error(errorData?.message ?? "要員の復元に失敗しました。");
			}

			const restoredEngineer: ApiEngineer = await response.json();
			const convertedEngineer = convertApiEngineerToEngineer(restoredEngineer);

			setEngineers((prev) =>
				prev.map((engineer) =>
					engineer.id === convertedEngineer.id ? convertedEngineer : engineer,
				),
			);
		} catch (error) {
			console.error(error);
			setEngineerError(
				error instanceof Error ? error.message : "要員の復元に失敗しました。",
			);
		}
	};

	return {
		engineers,
		setEngineers,
		isLoadingEngineers,
		engineerError,
		createEngineer,
		updateEngineer,
		deleteEngineer,
		restoreEngineer,
	};
}
