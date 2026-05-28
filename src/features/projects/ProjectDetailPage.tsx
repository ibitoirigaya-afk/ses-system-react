import type { Project } from './projectTypes'

type Props = {
  project: Project
  onBack: () => void
}

export default function ProjectDetailPage({ project, onBack }: Props) {
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← 案件一覧へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">案件詳細</h2>

        <p className="mt-1 text-sm text-gray-500">
          案件の詳しい情報を確認できます。
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <dl className="grid gap-5">
          <div>
            <dt className="text-sm font-bold text-gray-700">案件名</dt>
            <dd className="mt-1 text-lg font-bold text-gray-900">
              {project.title}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-gray-700">案件概要</dt>
            <dd className="mt-1 whitespace-pre-wrap text-gray-700">
              {project.description}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-gray-700">勤務地</dt>
            <dd className="mt-1 text-gray-700">{project.location}</dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-gray-700">単価</dt>
            <dd className="mt-1 text-gray-700">
              {project.unitPrice.toLocaleString()}円
            </dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-gray-700">ステータス</dt>
            <dd className="mt-1">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {project.status}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-gray-700">必要スキル</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
                >
                  {skill.name}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}