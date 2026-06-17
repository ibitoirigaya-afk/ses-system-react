import { useCallback, useEffect, useState } from "react";
import Layout from "./components/Layout";
import type { User } from "./features/auth/authTypes";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import EngineerCreatePage from "./features/engineers/EngineerCreatePage";
import EngineerDetailPage from "./features/engineers/EngineerDetailPage";
import EngineerEditPage from "./features/engineers/EngineerEditPage";
import EngineerListPage from "./features/engineers/EngineerListPage";
import type { Engineer } from "./features/engineers/engineerTypes";
import ProjectCreatePage from "./features/projects/ProjectCreatePage";
import ProjectDetailPage from "./features/projects/ProjectDetailPage";
import ProjectEditPage from "./features/projects/ProjectEditPage";
import ProjectListPage from "./features/projects/ProjectListPage";
import ProjectMatchingPage from "./features/projects/ProjectMatchingPage";
import type { Project } from "./features/projects/projectTypes";
import ProposalHistoryCreatePage from "./features/proposals/ProposalHistoryCreatePage";
import ProposalHistoryDetailPage from "./features/proposals/ProposalHistoryDetailPage";
import ProposalHistoryEditPage from "./features/proposals/ProposalHistoryEditPage";
import ProposalHistoryListPage from "./features/proposals/ProposalHistoryListPage";
import ProposalHistoryManualCreatePage from "./features/proposals/ProposalHistoryManualCreatePage";
import type { ProposalHistory } from "./features/proposals/proposalTypes";
import SkillCreatePage from "./features/skills/SkillCreatePage";
import SkillEditPage from "./features/skills/SkillEditPage";
import SkillListPage from "./features/skills/SkillListPage";
import type { Skill } from "./features/skills/skillTypes";
import WorkRecordCreatePage from "./features/workRecords/WorkRecordCreatePage";
import WorkRecordEditPage from "./features/workRecords/WorkRecordEditPage";
import WorkRecordListPage from "./features/workRecords/WorkRecordListPage";
import type { WorkRecord } from "./features/workRecords/workRecordTypes";
import { useAuthUsers } from "./hooks/useAuthUsers";
import { useEngineers } from "./hooks/useEngineers";
import { useProjects } from "./hooks/useProjects";
import { useProposalHistories } from "./hooks/useProposalHistories";
import { useSkills } from "./hooks/useSkills";
import { useWorkRecords } from "./hooks/useWorkRecords";
import {
	getEngineerStatusByProposalStatus,
	getProjectStatusByProposalStatus,
} from "./utils/proposalStatusSync";

type Page =
	| "top"
	| "projects"
	| "engineers"
	| "skills"
	| "proposals"
	| "workRecords";

type AuthMode = "login" | "register";

type CreatingProposal = {
	projectId: number;
	engineerId: number;
};

type ViewState = {
	currentPage: Page;

	isCreatingProject: boolean;
	selectedProject: Project | null;
	editingProject: Project | null;
	selectedProjectId: number | null;

	isCreatingEngineer: boolean;
	selectedEngineer: Engineer | null;
	editingEngineer: Engineer | null;

	isCreatingSkill: boolean;
	editingSkill: Skill | null;

	isCreatingWorkRecord: boolean;
	editingWorkRecord: WorkRecord | null;

	creatingProposal: CreatingProposal | null;
	selectedProposalHistory: ProposalHistory | null;
	editingProposalHistory: ProposalHistory | null;
	isCreatingProposalHistory: boolean;
};

const createBaseViewState = (page: Page): ViewState => {
	return {
		currentPage: page,

		isCreatingProject: false,
		selectedProject: null,
		editingProject: null,
		selectedProjectId: null,

		isCreatingEngineer: false,
		selectedEngineer: null,
		editingEngineer: null,

		isCreatingSkill: false,
		editingSkill: null,

		isCreatingWorkRecord: false,
		editingWorkRecord: null,

		creatingProposal: null,
		selectedProposalHistory: null,
		editingProposalHistory: null,
		isCreatingProposalHistory: false,
	};
};

const getPageFromHash = (): Page => {
	const hashPage = window.location.hash.replace("#", "");

	if (
		hashPage === "top" ||
		hashPage === "projects" ||
		hashPage === "engineers" ||
		hashPage === "skills" ||
		hashPage === "proposals" ||
		hashPage === "workRecords"
	) {
		return hashPage;
	}

	return "top";
};

export default function App() {
	const [authMode, setAuthMode] = useState<AuthMode>("login");

	const {
		projects,
		setProjects,
		createProject,
		updateProject,
		deleteProject,
		restoreProject,
	} = useProjects();

	const {
		engineers,
		setEngineers,
		createEngineer,
		updateEngineer,
		deleteEngineer,
		restoreEngineer,
	} = useEngineers();

	const { skills, createSkill, updateSkill, deleteSkill } = useSkills();

	const {
		workRecords,
		createWorkRecord,
		updateWorkRecord,
		deleteWorkRecord,
		restoreWorkRecord,
	} = useWorkRecords();

	const {
		proposalHistories,
		createProposalHistory,
		updateProposalHistory,
		deleteProposalHistory,
		restoreProposalHistory,
	} = useProposalHistories();

	const { currentUser, isAuthLoading, login, register, logout } =
		useAuthUsers();

	const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromHash());

	const [isCreatingProject, setIsCreatingProject] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
		null,
	);

	const [isCreatingEngineer, setIsCreatingEngineer] = useState(false);
	const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
		null,
	);
	const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null);

	const [isCreatingSkill, setIsCreatingSkill] = useState(false);
	const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

	const [isCreatingWorkRecord, setIsCreatingWorkRecord] = useState(false);
	const [editingWorkRecord, setEditingWorkRecord] = useState<WorkRecord | null>(
		null,
	);

	const [creatingProposal, setCreatingProposal] =
		useState<CreatingProposal | null>(null);

	const [selectedProposalHistory, setSelectedProposalHistory] =
		useState<ProposalHistory | null>(null);

	const [editingProposalHistory, setEditingProposalHistory] =
		useState<ProposalHistory | null>(null);

	const [isCreatingProposalHistory, setIsCreatingProposalHistory] =
		useState(false);

	const applyViewState = useCallback((viewState: ViewState) => {
		setCurrentPage(viewState.currentPage);

		setIsCreatingProject(viewState.isCreatingProject);
		setSelectedProject(viewState.selectedProject);
		setEditingProject(viewState.editingProject);
		setSelectedProjectId(viewState.selectedProjectId);

		setIsCreatingEngineer(viewState.isCreatingEngineer);
		setSelectedEngineer(viewState.selectedEngineer);
		setEditingEngineer(viewState.editingEngineer);

		setIsCreatingSkill(viewState.isCreatingSkill);
		setEditingSkill(viewState.editingSkill);

		setIsCreatingWorkRecord(viewState.isCreatingWorkRecord);
		setEditingWorkRecord(viewState.editingWorkRecord);

		setCreatingProposal(viewState.creatingProposal);
		setSelectedProposalHistory(viewState.selectedProposalHistory);
		setEditingProposalHistory(viewState.editingProposalHistory);
		setIsCreatingProposalHistory(viewState.isCreatingProposalHistory);
	}, []);

	const getCurrentViewState = useCallback((): ViewState => {
		return {
			currentPage,

			isCreatingProject,
			selectedProject,
			editingProject,
			selectedProjectId,

			isCreatingEngineer,
			selectedEngineer,
			editingEngineer,

			isCreatingSkill,
			editingSkill,

			isCreatingWorkRecord,
			editingWorkRecord,

			creatingProposal,
			selectedProposalHistory,
			editingProposalHistory,
			isCreatingProposalHistory,
		};
	}, [
		currentPage,
		isCreatingProject,
		selectedProject,
		editingProject,
		selectedProjectId,
		isCreatingEngineer,
		selectedEngineer,
		editingEngineer,
		isCreatingSkill,
		editingSkill,
		isCreatingWorkRecord,
		editingWorkRecord,
		creatingProposal,
		selectedProposalHistory,
		editingProposalHistory,
		isCreatingProposalHistory,
	]);

	const moveToViewState = useCallback(
		(viewState: ViewState) => {
			applyViewState(viewState);
			window.history.pushState({ viewState }, "", `#${viewState.currentPage}`);
		},
		[applyViewState],
	);

	useEffect(() => {
		const currentViewState = getCurrentViewState();

		window.history.replaceState(
			{ viewState: currentViewState },
			"",
			`#${currentViewState.currentPage}`,
		);

		const handlePopState = (event: PopStateEvent) => {
			const viewState = event.state?.viewState as ViewState | undefined;

			if (viewState) {
				applyViewState(viewState);
				return;
			}

			const page = getPageFromHash();
			applyViewState(createBaseViewState(page));
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [applyViewState, getCurrentViewState]);

	const handleChangePage = (page: Page) => {
		moveToViewState(createBaseViewState(page));
	};

	const handleLogin = async (email: string, password: string) => {
		const isSuccess = await login(email, password);

		if (!isSuccess) {
			return false;
		}

		const topViewState = createBaseViewState("top");

		applyViewState(topViewState);
		window.history.replaceState({ viewState: topViewState }, "", "#top");

		return true;
	};

	const handleRegister = async (input: {
		name: string;
		email: string;
		password: string;
		passwordConfirm: string;
		role: User["role"];
	}) => {
		const isSuccess = await register(input);

		if (!isSuccess) {
			return false;
		}

		const topViewState = createBaseViewState("top");

		applyViewState(topViewState);
		window.history.replaceState({ viewState: topViewState }, "", "#top");

		return true;
	};

	const handleLogout = async () => {
		await logout();

		setAuthMode("login");

		const topViewState = createBaseViewState("top");

		applyViewState(topViewState);
		window.history.replaceState({ viewState: topViewState }, "", "#top");
	};

	const handleCreateProject = (project: Project) => {
		createProject(project);

		setIsCreatingProject(false);
		setSelectedProject(null);
		setEditingProject(null);
		setSelectedProjectId(null);
		setCurrentPage("projects");
	};

	const handleUpdateProject = (updatedProject: Project) => {
		updateProject(updatedProject);

		setSelectedProject(null);
		setEditingProject(null);
		setIsCreatingProject(false);
		setSelectedProjectId(null);
		setCurrentPage("projects");
	};

	const handleDeleteProject = (projectId: number) => {
		deleteProject(projectId);

		setSelectedProject(null);
		setEditingProject(null);
		setSelectedProjectId(null);
		setCurrentPage("projects");
	};

	const handleRestoreProject = (projectId: number) => {
		restoreProject(projectId);

		setCurrentPage("projects");
	};

	const handleCreateEngineer = (engineer: Engineer) => {
		createEngineer(engineer);

		setIsCreatingEngineer(false);
		setSelectedEngineer(null);
		setEditingEngineer(null);
		setCurrentPage("engineers");
	};

	const handleUpdateEngineer = (updatedEngineer: Engineer) => {
		updateEngineer(updatedEngineer);

		setIsCreatingEngineer(false);
		setSelectedEngineer(null);
		setEditingEngineer(null);
		setCurrentPage("engineers");
	};

	const handleDeleteEngineer = (engineerId: number) => {
		deleteEngineer(engineerId);

		setIsCreatingEngineer(false);
		setSelectedEngineer(null);
		setEditingEngineer(null);
		setCurrentPage("engineers");
	};

	const handleRestoreEngineer = (engineerId: number) => {
		restoreEngineer(engineerId);

		setCurrentPage("engineers");
	};

	const handleCreateSkill = (skill: Skill) => {
		createSkill(skill);

		setIsCreatingSkill(false);
		setEditingSkill(null);
		setCurrentPage("skills");
	};

	const handleUpdateSkill = (updatedSkill: Skill) => {
		updateSkill(updatedSkill);

		setIsCreatingSkill(false);
		setEditingSkill(null);
		setCurrentPage("skills");
	};

	const handleDeleteSkill = (skillId: number) => {
		deleteSkill(skillId);

		setIsCreatingSkill(false);
		setEditingSkill(null);
		setCurrentPage("skills");
	};

	const handleCreateWorkRecord = (workRecord: WorkRecord) => {
		createWorkRecord(workRecord);

		setIsCreatingWorkRecord(false);
		setEditingWorkRecord(null);
		setCurrentPage("workRecords");
	};

	const handleUpdateWorkRecord = (updatedWorkRecord: WorkRecord) => {
		updateWorkRecord(updatedWorkRecord);

		setIsCreatingWorkRecord(false);
		setEditingWorkRecord(null);
		setCurrentPage("workRecords");
	};

	const handleDeleteWorkRecord = (workRecordId: number) => {
		deleteWorkRecord(workRecordId);

		setIsCreatingWorkRecord(false);
		setEditingWorkRecord(null);
		setCurrentPage("workRecords");
	};

	const handleRestoreWorkRecord = (workRecordId: number) => {
		restoreWorkRecord(workRecordId);

		setCurrentPage("workRecords");
	};

	const syncStatusesByProposalHistory = (proposalHistory: ProposalHistory) => {
		const nextProjectStatus = getProjectStatusByProposalStatus(
			proposalHistory.status,
		);

		const nextEngineerStatus = getEngineerStatusByProposalStatus(
			proposalHistory.status,
		);

		setProjects((prev) =>
			prev.map((project) =>
				project.id === proposalHistory.projectId
					? {
							...project,
							status: nextProjectStatus,
						}
					: project,
			),
		);

		setEngineers((prev) =>
			prev.map((engineer) =>
				engineer.id === proposalHistory.engineerId
					? {
							...engineer,
							status: nextEngineerStatus,
						}
					: engineer,
			),
		);
	};

	const handleCreateProposalHistory = (proposalHistory: ProposalHistory) => {
		createProposalHistory(proposalHistory);

		syncStatusesByProposalHistory(proposalHistory);

		setCurrentPage("proposals");
		setIsCreatingProposalHistory(false);
		setSelectedProjectId(null);
		setCreatingProposal(null);
		setSelectedProposalHistory(null);
		setEditingProposalHistory(null);
	};

	const handleUpdateProposalHistory = (
		updatedProposalHistory: ProposalHistory,
	) => {
		updateProposalHistory(updatedProposalHistory);

		syncStatusesByProposalHistory(updatedProposalHistory);

		setEditingProposalHistory(null);
		setSelectedProposalHistory(null);
		setCurrentPage("proposals");
	};

	const handleDeleteProposalHistory = (proposalHistoryId: number) => {
		deleteProposalHistory(proposalHistoryId);

		setSelectedProposalHistory(null);
		setEditingProposalHistory(null);
		setCurrentPage("proposals");
	};

	const handleRestoreProposalHistory = (proposalHistoryId: number) => {
		restoreProposalHistory(proposalHistoryId);

		setCurrentPage("proposals");
	};

	if (isAuthLoading) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-gray-100">
				<div className="rounded-2xl bg-white px-8 py-6 text-center shadow">
					<p className="text-sm font-bold text-gray-700">読み込み中...</p>
				</div>
			</main>
		);
	}

	if (!currentUser) {
		if (authMode === "register") {
			return (
				<RegisterPage
					onRegister={handleRegister}
					onBackToLogin={() => setAuthMode("login")}
				/>
			);
		}

		return (
			<LoginPage
				onLogin={handleLogin}
				onChangeToRegister={() => setAuthMode("register")}
			/>
		);
	}

	return (
		<Layout
			currentUser={currentUser}
			currentPage={currentPage}
			onChangePage={handleChangePage}
			onLogout={handleLogout}
		>
			{currentPage === "top" && (
				<DashboardPage
					currentUser={currentUser}
					projects={projects}
					engineers={engineers}
					proposalHistories={proposalHistories}
					workRecords={workRecords}
					onChangePage={handleChangePage}
				/>
			)}

			{currentPage === "projects" &&
				!isCreatingProject &&
				selectedProject === null &&
				editingProject === null &&
				selectedProjectId === null &&
				creatingProposal === null && (
					<ProjectListPage
						currentUser={currentUser}
						projects={projects}
						onOpenCreate={() =>
							moveToViewState({
								...createBaseViewState("projects"),
								isCreatingProject: true,
							})
						}
						onOpenDetail={(project) =>
							moveToViewState({
								...createBaseViewState("projects"),
								selectedProject: project,
							})
						}
						onOpenEdit={(project) =>
							moveToViewState({
								...createBaseViewState("projects"),
								editingProject: project,
							})
						}
						onOpenMatching={(projectId) =>
							moveToViewState({
								...createBaseViewState("projects"),
								selectedProjectId: projectId,
							})
						}
						onDelete={handleDeleteProject}
						onRestore={handleRestoreProject}
					/>
				)}

			{currentPage === "projects" && isCreatingProject && (
				<ProjectCreatePage
					currentUser={currentUser}
					skills={skills}
					onCreate={handleCreateProject}
					onCancel={() => moveToViewState(createBaseViewState("projects"))}
				/>
			)}

			{currentPage === "projects" && selectedProject !== null && (
				<ProjectDetailPage
					project={selectedProject}
					onBack={() => moveToViewState(createBaseViewState("projects"))}
				/>
			)}

			{currentPage === "projects" && editingProject !== null && (
				<ProjectEditPage
					skills={skills}
					project={editingProject}
					onUpdate={handleUpdateProject}
					onCancel={() => moveToViewState(createBaseViewState("projects"))}
				/>
			)}

			{currentPage === "projects" &&
				!isCreatingProject &&
				selectedProject === null &&
				editingProject === null &&
				selectedProjectId !== null &&
				creatingProposal === null && (
					<ProjectMatchingPage
						currentUser={currentUser}
						projects={projects}
						engineers={engineers}
						projectId={selectedProjectId}
						onBack={() => moveToViewState(createBaseViewState("projects"))}
						onCreateProposal={(projectId, engineerId) =>
							moveToViewState({
								...createBaseViewState("projects"),
								selectedProjectId: projectId,
								creatingProposal: { projectId, engineerId },
							})
						}
					/>
				)}

			{currentPage === "projects" &&
				!isCreatingProject &&
				selectedProject === null &&
				editingProject === null &&
				selectedProjectId !== null &&
				creatingProposal !== null && (
					<ProposalHistoryCreatePage
						projects={projects}
						engineers={engineers}
						projectId={creatingProposal.projectId}
						engineerId={creatingProposal.engineerId}
						onBack={() =>
							moveToViewState({
								...createBaseViewState("projects"),
								selectedProjectId: creatingProposal.projectId,
							})
						}
						onCreate={handleCreateProposalHistory}
					/>
				)}

			{currentPage === "engineers" &&
				!isCreatingEngineer &&
				selectedEngineer === null &&
				editingEngineer === null && (
					<EngineerListPage
						currentUser={currentUser}
						engineers={engineers}
						onOpenCreate={() =>
							moveToViewState({
								...createBaseViewState("engineers"),
								isCreatingEngineer: true,
							})
						}
						onOpenDetail={(engineer) =>
							moveToViewState({
								...createBaseViewState("engineers"),
								selectedEngineer: engineer,
							})
						}
						onOpenEdit={(engineer) =>
							moveToViewState({
								...createBaseViewState("engineers"),
								editingEngineer: engineer,
							})
						}
						onDelete={handleDeleteEngineer}
						onRestore={handleRestoreEngineer}
					/>
				)}

			{currentPage === "engineers" && isCreatingEngineer && (
				<EngineerCreatePage
					currentUser={currentUser}
					skills={skills}
					onCreate={handleCreateEngineer}
					onCancel={() => moveToViewState(createBaseViewState("engineers"))}
				/>
			)}

			{currentPage === "engineers" && selectedEngineer !== null && (
				<EngineerDetailPage
					engineer={selectedEngineer}
					onBack={() => moveToViewState(createBaseViewState("engineers"))}
				/>
			)}

			{currentPage === "engineers" && editingEngineer !== null && (
				<EngineerEditPage
					skills={skills}
					engineer={editingEngineer}
					onUpdate={handleUpdateEngineer}
					onCancel={() => moveToViewState(createBaseViewState("engineers"))}
				/>
			)}

			{currentPage === "skills" &&
				!isCreatingSkill &&
				editingSkill === null && (
					<SkillListPage
						skills={skills}
						onOpenCreate={() =>
							moveToViewState({
								...createBaseViewState("skills"),
								isCreatingSkill: true,
							})
						}
						onOpenEdit={(skill) =>
							moveToViewState({
								...createBaseViewState("skills"),
								editingSkill: skill,
							})
						}
						onDelete={handleDeleteSkill}
					/>
				)}

			{currentPage === "skills" && isCreatingSkill && (
				<SkillCreatePage
					skills={skills}
					onCreate={handleCreateSkill}
					onCancel={() => moveToViewState(createBaseViewState("skills"))}
				/>
			)}

			{currentPage === "skills" && editingSkill !== null && (
				<SkillEditPage
					skill={editingSkill}
					skills={skills}
					onUpdate={handleUpdateSkill}
					onCancel={() => moveToViewState(createBaseViewState("skills"))}
				/>
			)}

			{currentPage === "proposals" &&
				!isCreatingProposalHistory &&
				selectedProposalHistory === null &&
				editingProposalHistory === null && (
					<ProposalHistoryListPage
						currentUser={currentUser}
						proposalHistories={proposalHistories}
						projects={projects}
						engineers={engineers}
						onOpenCreate={() =>
							moveToViewState({
								...createBaseViewState("proposals"),
								isCreatingProposalHistory: true,
							})
						}
						onShowDetail={(proposalHistory) =>
							moveToViewState({
								...createBaseViewState("proposals"),
								selectedProposalHistory: proposalHistory,
							})
						}
						onEdit={(proposalHistory) =>
							moveToViewState({
								...createBaseViewState("proposals"),
								editingProposalHistory: proposalHistory,
							})
						}
						onDelete={handleDeleteProposalHistory}
						onRestore={handleRestoreProposalHistory}
					/>
				)}

			{currentPage === "proposals" && isCreatingProposalHistory && (
				<ProposalHistoryManualCreatePage
					projects={projects}
					engineers={engineers}
					onCreate={handleCreateProposalHistory}
					onCancel={() => moveToViewState(createBaseViewState("proposals"))}
				/>
			)}

			{currentPage === "proposals" && selectedProposalHistory !== null && (
				<ProposalHistoryDetailPage
					proposalHistory={selectedProposalHistory}
					projects={projects}
					engineers={engineers}
					onBack={() => moveToViewState(createBaseViewState("proposals"))}
				/>
			)}

			{currentPage === "proposals" && editingProposalHistory !== null && (
				<ProposalHistoryEditPage
					proposalHistory={editingProposalHistory}
					projects={projects}
					engineers={engineers}
					onBack={() => moveToViewState(createBaseViewState("proposals"))}
					onUpdate={handleUpdateProposalHistory}
				/>
			)}

			{currentPage === "workRecords" &&
				!isCreatingWorkRecord &&
				editingWorkRecord === null && (
					<WorkRecordListPage
						workRecords={workRecords}
						projects={projects}
						engineers={engineers}
						onOpenCreate={() =>
							moveToViewState({
								...createBaseViewState("workRecords"),
								isCreatingWorkRecord: true,
							})
						}
						onOpenEdit={(workRecord) =>
							moveToViewState({
								...createBaseViewState("workRecords"),
								editingWorkRecord: workRecord,
							})
						}
						onDelete={handleDeleteWorkRecord}
						onRestore={handleRestoreWorkRecord}
					/>
				)}

			{currentPage === "workRecords" && isCreatingWorkRecord && (
				<WorkRecordCreatePage
					projects={projects}
					engineers={engineers}
					onCreate={handleCreateWorkRecord}
					onCancel={() => moveToViewState(createBaseViewState("workRecords"))}
				/>
			)}

			{currentPage === "workRecords" && editingWorkRecord !== null && (
				<WorkRecordEditPage
					projects={projects}
					engineers={engineers}
					workRecord={editingWorkRecord}
					onUpdate={handleUpdateWorkRecord}
					onCancel={() => moveToViewState(createBaseViewState("workRecords"))}
				/>
			)}
		</Layout>
	);
}
