import type { Skill } from "../skills/skillTypes";
import type { BpCompany } from "../bpCompanies/bpCompanyTypes";

export type EngineerStatus = "稼働可能" | "提案中" | "稼働中" | "停止中";

export type Engineer = {
  id: number;
  userId: number;
  bpCompanyId: number | null;
  bpCompany?: BpCompany | null;
  name: string;
  companyName: string;
  age: number;
  gender: string;
  nearestStation: string;
  desiredUnitPrice: number;
  experienceYears: number;
  availableDate: string;
  desiredLocation: string;
  desiredConditions: string;
  careerSummary: string;
  status: EngineerStatus;
  skills: Skill[];
  deletedAt?: string | null;
};
