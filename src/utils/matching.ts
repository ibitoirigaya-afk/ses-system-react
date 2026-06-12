import type { Engineer } from "../features/engineers/engineerTypes";
import type { Project } from "../features/projects/projectTypes";

export type MatchedEngineer = {
	engineer: Engineer;
	matchedSkillNames: string[];
	matchedCount: number;
	matchRate: number;
};

export function getMatchedEngineers(
	project: Project,
	engineers: Engineer[],
): MatchedEngineer[] {
	const requiredSkillIds = project.skills.map((skill) => skill.id);

	return engineers
		.map((engineer) => {
			const matchedSkills = engineer.skills.filter((skill) =>
				requiredSkillIds.includes(skill.id),
			);

			const matchedCount = matchedSkills.length;

			const matchRate =
				project.skills.length === 0
					? 0
					: Math.round((matchedCount / project.skills.length) * 100);

			return {
				engineer,
				matchedSkillNames: matchedSkills.map((skill) => skill.name),
				matchedCount,
				matchRate,
			};
		})
		.sort((a, b) => b.matchRate - a.matchRate);
}
