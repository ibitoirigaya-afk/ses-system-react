import type { Skill } from '../skills/skillTypes'
import type { Project } from './projectTypes'
import ProjectForm, { type ProjectFormValues } from './ProjectForm'

type Props = {
  skills: Skill[]
  project: Project
  onUpdate: (project: Project) => void
  onCancel: () => void
}

export default function ProjectEditPage({
  skills,
  project,
  onUpdate,
  onCancel,
}: Props) {
  const handleSubmit = (values: ProjectFormValues) => {
    const selectedSkills = skills.filter((skill) =>
      values.skillIds.includes(skill.id),
    )

    const updatedProject: Project = {
      ...project,
      title: values.title,
      description: values.description,
      location: values.location,
      unitPrice: values.unitPrice,
      status: values.status,
      skills: selectedSkills,
    }

    onUpdate(updatedProject)
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

        <h2 className="text-2xl font-bold text-gray-900">案件編集</h2>

        <p className="mt-1 text-sm text-gray-500">
          案件情報を編集します。
        </p>
      </div>

      <ProjectForm
        skills={skills}
        submitLabel="更新する"
        onSubmit={handleSubmit}
        onCancel={onCancel}
        initialValues={{
          title: project.title,
          description: project.description,
          location: project.location,
          unitPrice: project.unitPrice,
          status: project.status,
          skillIds: project.skills.map((skill) => skill.id),
        }}
      />
    </div>
  )
}