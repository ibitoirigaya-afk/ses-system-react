import { useState } from "react";

type Props = {
	onLogin: (email: string, password: string) => Promise<boolean>;
	onChangeToRegister: () => void;
};

export default function LoginPage({ onLogin, onChangeToRegister }: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (email.trim() === "") {
			alert("メールアドレスを入力してください。");
			return;
		}

		if (password.trim() === "") {
			alert("パスワードを入力してください。");
			return;
		}

		const isSuccess = await onLogin(email, password);

		if (!isSuccess) {
			alert("メールアドレスまたはパスワードが違います。");
		}
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
						type="button"
						onClick={onChangeToRegister}
						className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						新規登録はこちら
					</button>
				</div>

				<div className="mt-6 rounded bg-blue-50 p-4 text-sm text-blue-800">
					<p className="font-bold">DEMOログイン例</p>

					<ul className="mt-2 list-inside list-disc">
						<li>管理者：admin@example.com / password</li>
						<li>要員担当：user@example.com / password</li>
						<li>企業担当：company@example.com / password</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
