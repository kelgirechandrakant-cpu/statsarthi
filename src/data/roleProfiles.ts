import { RoleProfile } from '@/types/statsarthi';

export const roleProfiles: RoleProfile[] = [
  {
    id: 'jso',
    designation: 'Junior Statistical Officer (JSO)',
    department: 'National Statistical Office (NSO)',
    level: 'junior',
    requiredCompetencies: [
      { competencyId: 'survey-design', requiredLevel: 2 },
      { competencyId: 'data-quality', requiredLevel: 3 },
      { competencyId: 'python-r', requiredLevel: 2 },
      { competencyId: 'communication', requiredLevel: 2 },
      { competencyId: 'ethics', requiredLevel: 3 },
    ],
  },
  {
    id: 'sso',
    designation: 'Senior Statistical Officer (SSO)',
    department: 'National Statistical Office (NSO)',
    level: 'mid',
    requiredCompetencies: [
      { competencyId: 'survey-design', requiredLevel: 4 },
      { competencyId: 'data-quality', requiredLevel: 4 },
      { competencyId: 'national-accounts', requiredLevel: 3 },
      { competencyId: 'data-visualization', requiredLevel: 3 },
      { competencyId: 'project-management', requiredLevel: 3 },
      { competencyId: 'leadership', requiredLevel: 2 },
    ],
  },
  {
    id: 'iss-director',
    designation: 'Director (ISS)',
    department: 'Ministry of Statistics & Programme Implementation',
    level: 'senior',
    requiredCompetencies: [
      { competencyId: 'survey-design', requiredLevel: 5 },
      { competencyId: 'national-accounts', requiredLevel: 4 },
      { competencyId: 'sdg-indicators', requiredLevel: 5 },
      { competencyId: 'data-privacy', requiredLevel: 4 },
      { competencyId: 'leadership', requiredLevel: 4 },
      { competencyId: 'decision-making', requiredLevel: 5 },
      { competencyId: 'change-management', requiredLevel: 4 },
    ],
  },
  {
    id: 'iss-adg',
    designation: 'Additional Director General (ADG)',
    department: 'Ministry of Statistics & Programme Implementation',
    level: 'senior',
    requiredCompetencies: [
      { competencyId: 'national-accounts', requiredLevel: 5 },
      { competencyId: 'sdg-indicators', requiredLevel: 5 },
      { competencyId: 'leadership', requiredLevel: 5 },
      { competencyId: 'decision-making', requiredLevel: 5 },
      { competencyId: 'change-management', requiredLevel: 5 },
      { competencyId: 'data-privacy', requiredLevel: 5 },
    ],
  },
  {
    id: 'des-officer',
    designation: 'Statistical Officer (State DES)',
    department: 'Directorate of Economics and Statistics',
    level: 'mid',
    requiredCompetencies: [
      { competencyId: 'survey-design', requiredLevel: 3 },
      { competencyId: 'agricultural-statistics', requiredLevel: 4 },
      { competencyId: 'price-statistics', requiredLevel: 3 },
      { competencyId: 'data-visualization', requiredLevel: 3 },
      { competencyId: 'project-management', requiredLevel: 3 },
    ],
  },
];
