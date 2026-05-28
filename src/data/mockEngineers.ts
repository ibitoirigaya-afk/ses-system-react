import type { Engineer } from '../features/engineers/engineerTypes'
import { mockSkills } from './mockSkills'

export const mockEngineers: Engineer[] = [
  {
    id: 1,
    userId: 2,
    name: '田中 太郎',
    companyName: 'サンプルSES株式会社',
    age: 29,
    gender: '男性',
    nearestStation: '池袋',
    desiredUnitPrice: 700000,
    experienceYears: 5,
    availableDate: '2026-06-01',
    desiredLocation: '東京都内',
    desiredConditions: 'リモート併用希望',
    careerSummary: 'React、TypeScriptを中心にフロントエンド開発を経験。',
    status: '稼働可能',
    skills: [
      mockSkills[3], // TypeScript
      mockSkills[4], // React
      mockSkills[7], // CSS
    ],
  },
  {
    id: 2,
    userId: 2,
    name: '佐藤 花子',
    companyName: 'サンプルSES株式会社',
    age: 32,
    gender: '女性',
    nearestStation: '横浜',
    desiredUnitPrice: 720000,
    experienceYears: 7,
    availableDate: '2026-06-15',
    desiredLocation: '東京・神奈川',
    desiredConditions: 'バックエンド案件希望',
    careerSummary: 'PHP、Laravel、MySQLを使った業務システム開発を経験。',
    status: '提案中',
    skills: [
      mockSkills[0], // PHP
      mockSkills[1], // Laravel
      mockSkills[8], // MySQL
    ],
  },
  {
    id: 3,
    userId: 2,
    name: '鈴木 一郎',
    companyName: 'テックパートナー株式会社',
    age: 27,
    gender: '男性',
    nearestStation: '大宮',
    desiredUnitPrice: 650000,
    experienceYears: 4,
    availableDate: '2026-07-01',
    desiredLocation: '首都圏',
    desiredConditions: 'フロント・バックどちらも可',
    careerSummary: 'JavaScript、Vue.js、AWSを使った開発経験あり。',
    status: '稼働可能',
    skills: [
      mockSkills[2], // JavaScript
      mockSkills[5], // Vue.js
      mockSkills[9], // AWS
    ],
  },
]