import { useState } from "react";
import type { User } from "./authTypes";

type Props = {
	users: User[];
	onLogin: (userId: number) => void;
	onOpenRegister: () => void;
};

export default function LoginPage({ users, onLogin, onOpenRegister }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		const user = users.find(
			(user) => user.email === email && user.password === password,
		);

		if (!user) {
			alert("メールアドレスまたはパスワードが違います。");
			return;
		}

		onLogin(user.id);
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-gray-900">SES営業管理 DEMO</h1>

					<p className="mt-2 text-sm text-gray-500">
						メールアドレスとパスワードでログインしてください。
					</p>
				</div>

				<div className="grid gap-4">
					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							メールアドレス
						</label>

						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：admin@example.com"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							パスワード
						</label>

						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：password"
						/>
					</div>

					<button
						onClick={handleLogin}
						className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
					>
						ログイン
					</button>

					<button
						onClick={onOpenRegister}
						className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						新規登録はこちら
					</button>
				</div>

				<div className="mt-6 rounded bg-blue-50 p-4 text-sm text-blue-800">
					<p className="font-bold">DEMOログイン例</p>

					<ul className="mt-2 list-inside list-disc">
						{users.map((user) => (
							<li key={user.id}>
								{user.name}：{user.email} / password
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
