import type { User } from '../auth/authTypes'
import type { Skill } from '../skills/skillTypes'
import type { Project } from './projectTypes'
import ProjectForm, { type ProjectFormValues } from './ProjectForm'

type Props = {
  currentUser: User
  skills: Skill[]
  onCreate: (project: Project) => void
  onCancel: () => void
}

export default function ProjectCreatePage({
  currentUser,
  skills,
  onCreate,
  onCancel,
}: Props) {
  const handleSubmit = (values: ProjectFormValues) => {
    const selectedSkills = skills.filter((skill) =>
      values.skillIds.includes(skill.id),
    )

    const newProject: Project = {
      id: Date.now(),
      userId: currentUser.id,
      title: values.title,
      description: values.description,
      location: values.location,
      unitPrice: values.unitPrice,
      status: values.status,
      skills: selectedSkills,
    }

    onCreate(newProject)
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← 案件一覧へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">案件登録</h2>

        <p className="mt-1 text-sm text-gray-500">
          新しい案件情報を登録します。
        </p>
      </div>

      <ProjectForm
        skills={skills}
        submitLabel="登録する"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  )
}