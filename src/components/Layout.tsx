import type { User } from "../features/auth/authTypes";
import Navbar from "./Navbar";

type Page =
	| "top"
	| "projects"
	| "bpCompanies"
	| "engineers"
	| "skills"
	| "proposals"
	| "workRecords";

type Props = {
	currentUser: User;
	currentPage: Page;
	onChangePage: (page: Page) => void;
	onLogout: () => void;
	children: React.ReactNode;
};

export default function Layout({
	currentUser,
	currentPage,
	onChangePage,
	onLogout,
	children,
}: Props) {
	return (
		<main className="min-h-screen bg-gray-100">
			<div className="border-b bg-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							SES/BP営業管理システム
						</h1>

						<p className="mt-1 text-sm text-gray-500">
							ログイン中：{currentUser.name} / {currentUser.role}
						</p>
					</div>

					<button
						onClick={onLogout}
						className="rounded bg-gray-800 px-4 py-2 text-sm font-bold text-white"
					>
						ログアウト
					</button>
				</div>

				<Navbar
					currentUser={currentUser}
					currentPage={currentPage}
					onChangePage={onChangePage}
				/>
			</div>

			<div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
		</main>
	);
}
