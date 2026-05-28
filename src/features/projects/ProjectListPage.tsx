import { useState } from 'react'
import type { User } from '../auth/authTypes'
import type { Project } from './projectTypes'
import StatusBadge from '../../components/StatusBadge'
import {
  canEditProject,
  canUseMatching,
  canViewProject,
} from '../../utils/permissions'

type Props = {
  currentUser: User
  projects: Project[]
  onOpenCreate: () => void
  onOpenDetail: (project: Project) => void
  onOpenEdit: (project: Project) => void
  onOpenMatching: (projectId: number) => void
  onDelete: (projectId: number) => void
}

export default function ProjectListPage({
  currentUser,
  projects,
  onOpenCreate,
  onOpenDetail,
  onOpenEdit,
  onOpenMatching,
  onDelete,
}: Props) {
  const [searchText, setSearchText] = useState('')

  const visibleProjects = projects
    .filter((project) => canViewProject(currentUser, project))
    .filter((project) => {
      const keyword = searchText.trim().toLowerCase()

      if (keyword === '') {
        return true
      }

      const skillNames = project.skills
        .map((skill) => skill.name)
        .join(' ')
        .toLowerCase()

      return (
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.location.toLowerCase().includes(keyword) ||
        project.status.toLowerCase().includes(keyword) ||
        skillNames.includes(keyword)
      )
    })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">案件一覧</h2>

          <p className="mt-1 text-sm text-gray-500">
            登録されている案件を確認できます。
          </p>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'company') && (
          <button
            onClick={onOpenCreate}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white"
          >
            新規案件登録
          </button>
        )}
      </div>

      <div className="mb-4 rounded-xl bg-white p-4 shadow">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          案件検索
        </label>

        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
          placeholder="案件名・概要・勤務地・ステータス・スキルで検索"
        />

        <p className="mt-2 text-xs text-gray-500">
          表示中：{visibleProjects.length}件
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                案件名
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                勤務地
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                単価
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                ステータス
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                必要スキル
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleProjects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="px-4 py-4">
                  <div className="font-bold text-gray-900">
                    {project.title}
                  </div>

                  <div className="mt-1 text-sm text-gray-500">
                    {project.description}
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-gray-700">
                  {project.location}
                </td>

                <td className="px-4 py-4 text-sm text-gray-700">
                  {project.unitPrice.toLocaleString()}円
                </td>

                <td className="px-4 py-4 text-sm">
                  <StatusBadge status={project.status} type="project" />
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onOpenDetail(project)}
                      className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700"
                    >
                      詳細
                    </button>

                    {canEditProject(currentUser, project) && (
                      <>
                        <button
                          onClick={() => onOpenEdit(project)}
                          className="rounded bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                        >
                          編集
                        </button>

                        <button
                          onClick={() => {
                            const ok = window.confirm(
                              'この案件を削除しますか？',
                            )

                            if (ok) {
                              onDelete(project.id)
                            }
                          }}
                          className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                        >
                          削除
                        </button>
                      </>
                    )}

                    {canUseMatching(currentUser, project) && (
                      <button
                        onClick={() => onOpenMatching(project.id)}
                        className="rounded bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700"
                      >
                        マッチング
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {visibleProjects.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  条件に一致する案件がありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}