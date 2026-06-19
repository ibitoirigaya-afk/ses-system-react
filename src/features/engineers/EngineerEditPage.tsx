import type { Skill } from "../skills/skillTypes";
import EngineerForm, { type EngineerFormValues } from "./EngineerForm";
import type { Engineer } from "./engineerTypes";
import type { BpCompany } from "../bpCompanies/bpCompanyTypes";

type Props = {
  skills: Skill[];
  bpCompanies: BpCompany[];
  engineer: Engineer;
  onUpdate: (engineer: Engineer) => void;
  onCancel: () => void;
};

export default function EngineerEditPage({
  skills,
  bpCompanies,
  engineer,
  onUpdate,
  onCancel,
}: Props) {
  const handleSubmit = (values: EngineerFormValues) => {
    const selectedSkills = skills.filter((skill) =>
      values.skillIds.includes(skill.id),
    );

    const updatedEngineer: Engineer = {
      ...engineer,
      bpCompanyId: values.bpCompanyId,
      bpCompany:
        bpCompanies.find((bpCompany) => bpCompany.id === values.bpCompanyId) ??
        null,
      name: values.name,
      companyName: values.companyName,
      age: values.age,
      gender: values.gender,
      nearestStation: values.nearestStation,
      desiredUnitPrice: values.desiredUnitPrice,
      experienceYears: values.experienceYears,
      availableDate: values.availableDate,
      desiredLocation: values.desiredLocation,
      desiredConditions: values.desiredConditions,
      careerSummary: values.careerSummary,
      status: values.status,
      skills: selectedSkills,
    };

    onUpdate(updatedEngineer);
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="mb-3 rounded bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700"
        >
          ← 要員一覧へ戻る
        </button>

        <h2 className="text-2xl font-bold text-gray-900">要員編集</h2>

        <p className="mt-1 text-sm text-gray-500">要員情報を編集します。</p>
      </div>

      <EngineerForm
        skills={skills}
        bpCompanies={bpCompanies}
        submitLabel="更新する"
        onSubmit={handleSubmit}
        onCancel={onCancel}
        initialValues={{
          bpCompanyId: engineer.bpCompanyId,
          name: engineer.name,
          companyName: engineer.companyName,
          age: engineer.age,
          gender: engineer.gender,
          nearestStation: engineer.nearestStation,
          desiredUnitPrice: engineer.desiredUnitPrice,
          experienceYears: engineer.experienceYears,
          availableDate: engineer.availableDate,
          desiredLocation: engineer.desiredLocation,
          desiredConditions: engineer.desiredConditions,
          careerSummary: engineer.careerSummary,
          status: engineer.status,
          skillIds: engineer.skills.map((skill) => skill.id),
        }}
      />
    </div>
  );
}
