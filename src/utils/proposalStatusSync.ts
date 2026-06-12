import type { EngineerStatus } from "../features/engineers/engineerTypes";
import type { ProjectStatus } from "../features/projects/projectTypes";
import type { ProposalStatus } from "../features/proposals/proposalTypes";

export function getProjectStatusByProposalStatus(
	proposalStatus: ProposalStatus,
): ProjectStatus {
	if (
		proposalStatus === "提案中" ||
		proposalStatus === "面談調整中" ||
		proposalStatus === "面談予定" ||
		proposalStatus === "面談済み"
	) {
		return "提案中";
	}

	if (proposalStatus === "成約") {
		return "成約";
	}

	if (proposalStatus === "見送り") {
		return "募集中";
	}

	return "募集中";
}

export function getEngineerStatusByProposalStatus(
	proposalStatus: ProposalStatus,
): EngineerStatus {
	if (
		proposalStatus === "提案中" ||
		proposalStatus === "面談調整中" ||
		proposalStatus === "面談予定" ||
		proposalStatus === "面談済み"
	) {
		return "提案中";
	}

	if (proposalStatus === "成約") {
		return "稼働中";
	}

	if (proposalStatus === "見送り") {
		return "稼働可能";
	}

	return "稼働可能";
}
