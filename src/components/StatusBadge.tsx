type BadgeType = "project" | "engineer" | "proposal";

type Props = {
	status: string;
	type: BadgeType;
};

export default function StatusBadge({ status, type }: Props) {
	const getClassName = () => {
		if (type === "project") {
			switch (status) {
				case "募集中":
					return "bg-green-100 text-green-700";
				case "提案中":
					return "bg-blue-100 text-blue-700";
				case "成約":
					return "bg-orange-100 text-orange-700";
				case "終了":
					return "bg-gray-100 text-gray-700";
				default:
					return "bg-gray-100 text-gray-700";
			}
		}

		if (type === "engineer") {
			switch (status) {
				case "稼働可能":
					return "bg-green-100 text-green-700";
				case "提案中":
					return "bg-blue-100 text-blue-700";
				case "稼働中":
					return "bg-purple-100 text-purple-700";
				case "停止中":
					return "bg-gray-100 text-gray-700";
				default:
					return "bg-gray-100 text-gray-700";
			}
		}

		if (type === "proposal") {
			switch (status) {
				case "提案中":
					return "bg-blue-100 text-blue-700";
				case "面談調整中":
					return "bg-yellow-100 text-yellow-700";
				case "面談予定":
					return "bg-purple-100 text-purple-700";
				case "面談済み":
					return "bg-gray-100 text-gray-700";
				case "成約":
					return "bg-green-100 text-green-700";
				case "見送り":
					return "bg-red-100 text-red-700";
				default:
					return "bg-gray-100 text-gray-700";
			}
		}

		return "bg-gray-100 text-gray-700";
	};

	return (
		<span
			className={`rounded-full px-3 py-1 text-xs font-bold ${getClassName()}`}
		>
			{status}
		</span>
	);
}
