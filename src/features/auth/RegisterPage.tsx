import { useState } from "react";
import type { UserRole } from "./authTypes";

type RegisterInput = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRole;
};

type Props = {
	onRegister: (input: RegisterInput) => Promise<boolean>;
	onBackToLogin: () => void;
};

export default function RegisterPage({ onRegister, onBackToLogin }: Props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState<UserRole>("user");

	const isValidEmail = (value: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	};

	const handleRegister = async () => {
		if (name.trim() === "") {
			alert("名前を入力してください。");
			return;
		}

		if (email.trim() === "") {
			alert("メールアドレスを入力してください。");
			return;
		}

		if (!isValidEmail(email)) {
			alert("メールアドレスの形式が正しくありません。");
			return;
		}

		if (password.trim() === "") {
			alert("パスワードを入力してください。");
			return;
		}

		if (password.length < 4) {
			alert("パスワードは4文字以上で入力してください。");
			return;
		}

		if (passwordConfirm.trim() === "") {
			alert("確認用パスワードを入力してください。");
			return;
		}

		if (password !== passwordConfirm) {
			alert("パスワードと確認用パスワードが一致しません。");
			return;
		}

		const success = await onRegister({
			name,
			email,
			password,
			passwordConfirm,
			role,
		});

		if (!success) {
			alert(
				"新規登録に失敗しました。メールアドレスがすでに使われている可能性があります。",
			);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-gray-900">新規登録</h1>

					<p className="mt-2 text-sm text-gray-500">
						ユーザー情報を登録します。
					</p>
				</div>

				<div className="grid gap-4">
					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							名前
						</label>

						<input
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：山田 太郎"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							メールアドレス
						</label>

						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="例：yamada@example.com"
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
							placeholder="4文字以上で入力"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							パスワード確認
						</label>

						<input
							type="password"
							value={passwordConfirm}
							onChange={(event) => setPasswordConfirm(event.target.value)}
							className="w-full rounded border border-gray-300 px-3 py-2"
							placeholder="もう一度パスワードを入力"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-bold text-gray-700">
							種別
						</label>

						<select
							value={role}
							onChange={(event) => setRole(event.target.value as UserRole)}
							className="w-full rounded border border-gray-300 px-3 py-2"
						>
							<option value="user">要員担当</option>
							<option value="company">企業担当</option>
						</select>
					</div>

					<button
						onClick={handleRegister}
						className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
					>
						登録する
					</button>

					<button
						onClick={onBackToLogin}
						className="rounded bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						ログイン画面へ戻る
					</button>
				</div>
			</div>
		</main>
	);
}
