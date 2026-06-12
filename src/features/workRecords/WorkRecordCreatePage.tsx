import type { Engineer } from "../engineers/engineerTypes";
import type { Project } from "../projects/projectTypes";
import WorkRecordForm, { type WorkRecordFormValues } from "./WorkRecordForm";
import type { WorkRecord } from "./workRecordTypes";

type Props = {
	projects: Project[];
	engineers: Engineer[];
	onCreate: (workRecord: WorkRecord) => void;
	onCancel: () => void;
};

export default function WorkRecordCreatePage({
	projects,
	engineers,
	onCreate,
	onCancel,
}: Props) {
	const handleSubmit = (values: WorkRecordFormValues) => {
		const newWorkRecord: WorkRecord = {
			id: Date.now(),
			projectId: values.projectId,
			engineerId: values.engineerId,
			targetMonth: values.targetMonth,
			workingHours: values.workingHours,
			billingAmount: values.billingAmount,
			paymentAmount: values.paymentAmount,
			grossProfit: values.billingAmount - values.paymentAmount,
			memo: values.memo,
		};

		onCreate(newWorkRecord);
	};

	return (
		<div>
			<div className="mb-6">
				<button
					onClick={onCancel}
					className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
				>
					← 稼働実績一覧へ戻る
				</button>

				<h2 className="text-2xl font-bold text-gray-900">稼働実績登録</h2>

				<p className="mt-1 text-sm text-gray-500">
					案件・要員ごとの稼働時間、請求額、支払額を登録します。
				</p>
			</div>

			<WorkRecordForm
				projects={projects}
				engineers={engineers}
				submitLabel="登録する"
				onSubmit={handleSubmit}
				onCancel={onCancel}
			/>
		</div>
	);
}
