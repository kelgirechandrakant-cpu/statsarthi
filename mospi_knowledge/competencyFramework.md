import { CompetencyDomain } from '@/types/statsarthi';

export const competencyDomains: CompetencyDomain[] = [
  {
    id: 'statistical',
    name: 'Statistical',
    icon: 'BarChart3',
    areas: [
      {
        id: 'survey-design',
        domainId: 'statistical',
        name: 'Survey Design & Sampling',
        description: 'Design statistically sound surveys and appropriate sampling methodologies.',
        subCompetencies: ['Sampling Techniques', 'Questionnaire Design', 'Pilot Testing', 'Survey Ethics'],
      },
      {
        id: 'national-accounts',
        domainId: 'statistical',
        name: 'National Accounts & GDP',
        description: 'Methodology and estimation for National Accounts and GDP calculations.',
        subCompetencies: ['SNA Methodology', 'GDP Estimation', 'Deflators', 'Input-Output Analysis'],
      },
      {
        id: 'price-statistics',
        domainId: 'statistical',
        name: 'Price Statistics',
        description: 'Computation of CPI/WPI and index number theory.',
        subCompetencies: ['CPI Computation', 'WPI Computation', 'Index Number Theory', 'Inflation Tracking'],
      },
      {
        id: 'labour-statistics',
        domainId: 'statistical',
        name: 'Labour Statistics',
        description: 'Measuring employment, workforce indicators, and labour market trends.',
        subCompetencies: ['Employment Surveys', 'Workforce Indicators', 'Informal Economy', 'PLFS Methodology'],
      },
      {
        id: 'agricultural-statistics',
        domainId: 'statistical',
        name: 'Agricultural Statistics',
        description: 'Crop estimation, land use statistics, and agricultural census methodologies.',
        subCompetencies: ['Crop Estimation', 'Land Use Statistics', 'Agricultural Census', 'Yield Measurement'],
      },
      {
        id: 'industrial-statistics',
        domainId: 'statistical',
        name: 'Industrial Statistics',
        description: 'Tracking industrial production and manufacturing surveys.',
        subCompetencies: ['IIP Calculation', 'ASI Methodology', 'Manufacturing Surveys', 'Sectoral Analysis'],
      },
      {
        id: 'sdg-indicators',
        domainId: 'statistical',
        name: 'SDG Indicators',
        description: 'Tracking and reporting Sustainable Development Goals metadata.',
        subCompetencies: ['Goal Tracking', 'Metadata Mapping', 'National Indicator Framework', 'VNR Reporting'],
      },
      {
        id: 'metadata-standards',
        domainId: 'statistical',
        name: 'Metadata Standards',
        description: 'Adherence to statistical classifications like SDDS and GDDS.',
        subCompetencies: ['SDDS', 'GDDS', 'Statistical Classifications', 'Data Documentation'],
      },
      {
        id: 'data-quality',
        domainId: 'statistical',
        name: 'Data Quality Frameworks (SQAF)',
        description: 'Implementing MoSPI\'s Statistical Quality Assessment Framework.',
        subCompetencies: ['NQAF Principles', 'Quality Audits', 'Error Management', 'Framework Implementation'],
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: 'Code',
    areas: [
      {
        id: 'python-r',
        domainId: 'technical',
        name: 'Python & R Programming',
        description: 'Data analysis and statistical computing using Python and R.',
        subCompetencies: ['Pandas/NumPy', 'R Dataframes', 'Statistical Packages', 'Data Wrangling'],
      },
      {
        id: 'sql-databases',
        domainId: 'technical',
        name: 'SQL & Database Management',
        description: 'Query design, database management, and data warehousing.',
        subCompetencies: ['Query Design', 'Relational Databases', 'Data Warehousing', 'Performance Tuning'],
      },
      {
        id: 'stata-spss-sas',
        domainId: 'technical',
        name: 'Stata, SPSS & SAS',
        description: 'Proficiency in specialized statistical software packages.',
        subCompetencies: ['Data Modeling', 'Macro Programming', 'Output Generation', 'Syntax Writing'],
      },
      {
        id: 'gis',
        domainId: 'technical',
        name: 'GIS & Spatial Analysis',
        description: 'Geographic Information Systems and spatial mapping for statistics.',
        subCompetencies: ['Spatial Mapping', 'QGIS/ArcGIS', 'Geospatial Data', 'Boundary Mapping'],
      },
      {
        id: 'data-visualization',
        domainId: 'technical',
        name: 'Data Visualization',
        description: 'Creating dashboards, charts, and communicating through data storytelling.',
        subCompetencies: ['Dashboards', 'Chart Design', 'Data Storytelling', 'Tableau/PowerBI'],
      },
      {
        id: 'ai-ml',
        domainId: 'technical',
        name: 'AI & Machine Learning',
        description: 'Machine learning models, NLP, and predictive analytics for official stats.',
        subCompetencies: ['ML Models', 'NLP', 'Predictive Analytics', 'Anomaly Detection'],
      },
      {
        id: 'cloud-computing',
        domainId: 'technical',
        name: 'Cloud Computing',
        description: 'Leveraging Government cloud (MeghRaj) and scalable cloud services.',
        subCompetencies: ['MeghRaj Concepts', 'Cloud Architecture', 'Scalable Storage', 'Compute Services'],
      },
      {
        id: 'apis-open-data',
        domainId: 'technical',
        name: 'APIs & Open Data',
        description: 'API integration and management of open data portals.',
        subCompetencies: ['API Integration', 'Open Data Portals', 'JSON/XML', 'Data Syndication'],
      },
    ],
  },
  {
    id: 'digital-governance',
    name: 'Digital Governance',
    icon: 'Shield',
    areas: [
      {
        id: 'cybersecurity',
        domainId: 'digital-governance',
        name: 'Cybersecurity',
        description: 'Information security, threat management, and secure data practices.',
        subCompetencies: ['Information Security', 'Threat Management', 'Secure Workflows', 'Incident Response'],
      },
      {
        id: 'data-privacy',
        domainId: 'digital-governance',
        name: 'Data Privacy',
        description: 'Data protection, GDPR/DPDP awareness, and statistical confidentiality.',
        subCompetencies: ['Data Protection Act', 'Statistical Confidentiality', 'Anonymization', 'Privacy by Design'],
      },
      {
        id: 'digital-signatures',
        domainId: 'digital-governance',
        name: 'Digital Signatures',
        description: 'Use and management of e-Sign and digital certificates.',
        subCompetencies: ['e-Sign Integration', 'Digital Certificates', 'PKI', 'Document Authentication'],
      },
      {
        id: 'meghraj-cloud',
        domainId: 'digital-governance',
        name: 'Government Cloud (MeghRaj)',
        description: 'Understanding and utilizing NIC cloud infrastructure.',
        subCompetencies: ['NIC Infrastructure', 'Cloud Policies', 'Gov Cloud Security', 'Resource Allocation'],
      },
      {
        id: 'dpi',
        domainId: 'digital-governance',
        name: 'Digital Public Infrastructure',
        description: 'Integrating with India Stack, UPI, DigiLocker, and eKYC.',
        subCompetencies: ['India Stack', 'DigiLocker Integration', 'eKYC', 'Consent Artefacts'],
      },
    ],
  },
  {
    id: 'behavioural',
    name: 'Behavioural & Managerial',
    icon: 'Users',
    areas: [
      {
        id: 'leadership',
        domainId: 'behavioural',
        name: 'Leadership',
        description: 'Team leadership, strategic thinking, and guiding statistical teams.',
        subCompetencies: ['Team Leadership', 'Strategic Thinking', 'Mentorship', 'Vision Setting'],
      },
      {
        id: 'communication',
        domainId: 'behavioural',
        name: 'Communication',
        description: 'Written/verbal communication and stakeholder engagement.',
        subCompetencies: ['Stakeholder Engagement', 'Report Writing', 'Verbal Communication', 'Interdepartmental Liaison'],
      },
      {
        id: 'project-management',
        domainId: 'behavioural',
        name: 'Project Management',
        description: 'Planning, execution, and monitoring of statistical projects and surveys.',
        subCompetencies: ['Project Planning', 'Execution', 'Monitoring & Evaluation', 'Resource Management'],
      },
      {
        id: 'ethics',
        domainId: 'behavioural',
        name: 'Ethics & Integrity',
        description: 'Maintaining professional ethics and statistical integrity.',
        subCompetencies: ['Professional Ethics', 'Statistical Integrity', 'Impartiality', 'Transparency'],
      },
      {
        id: 'decision-making',
        domainId: 'behavioural',
        name: 'Decision Making',
        description: 'Evidence-based, analytical decision making.',
        subCompetencies: ['Evidence-based Logic', 'Analytical Decision Making', 'Risk Assessment', 'Problem Solving'],
      },
      {
        id: 'change-management',
        domainId: 'behavioural',
        name: 'Change Management',
        description: 'Driving organizational change and digital transformation.',
        subCompetencies: ['Organizational Change', 'Digital Transformation', 'Adaptability', 'Resistance Management'],
      },
    ],
  },
];

/**
 * PROFICIENCY LEVEL DESCRIPTORS (from SIH26101 research â€” Image 2)
 * 
 * This matrix defines what "good" looks like at each level for each domain.
 * The AI engine maps every official against this framework.
 * 
 * Maps to FRAC levels: 1=Awareness, 2=Foundation, 3=Practitioner, 4=Expert
 * (Level 5 "Ustad" = mastery beyond Expert, reserved for policy-setting leaders)
 */
export interface ProficiencyDescriptor {
  level: number;
  label: string;
  description: string;
}

export const PROFICIENCY_DESCRIPTORS: Record<string, ProficiencyDescriptor[]> = {
  statistical: [
    { level: 1, label: 'Awareness', description: 'Knows terms; Reads reports; Understands basic concepts' },
    { level: 2, label: 'Foundation', description: 'Applies under guidance; Runs standard surveys' },
    { level: 3, label: 'Practitioner', description: 'Independently designs surveys; Reviews others\' work' },
    { level: 4, label: 'Expert', description: 'Sets policy; Trains others; Innovates methods' },
    { level: 5, label: 'Ustad', description: 'National authority; Shapes international standards; Mentors experts' },
  ],
  technical: [
    { level: 1, label: 'Awareness', description: 'Knows tools exist; Runs basic scripts' },
    { level: 2, label: 'Foundation', description: 'Writes queries; Cleans data; Makes charts' },
    { level: 3, label: 'Practitioner', description: 'Builds pipelines; Deploys models; Integrates APIs' },
    { level: 4, label: 'Expert', description: 'Architects systems; Mentors teams' },
    { level: 5, label: 'Ustad', description: 'Designs national-scale technical infrastructure; Leads digital transformation' },
  ],
  'digital-governance': [
    { level: 1, label: 'Awareness', description: 'Follows rules; Aware of policies' },
    { level: 2, label: 'Foundation', description: 'Applies data privacy rules; Uses govt. cloud safely' },
    { level: 3, label: 'Practitioner', description: 'Audits systems; Advises on data sharing' },
    { level: 4, label: 'Expert', description: 'Designs governance frameworks' },
    { level: 5, label: 'Ustad', description: 'Shapes national digital governance policy; CERT-In advisor' },
  ],
  behavioural: [
    { level: 1, label: 'Awareness', description: 'Works in teams; Follows instructions' },
    { level: 2, label: 'Foundation', description: 'Coordinates teams; Writes clear reports' },
    { level: 3, label: 'Practitioner', description: 'Leads projects; Manages stakeholders' },
    { level: 4, label: 'Expert', description: 'Drives change; Mentors leaders; Policy vision' },
    { level: 5, label: 'Ustad', description: 'Strategic national leadership; Cross-ministry collaboration' },
  ],
};

/**
 * Get the behavioral descriptor for a given domain and FRAC level.
 * Used by the gap report to explain what an official needs to achieve.
 */
export function getProficiencyDescriptor(domainId: string, level: number): ProficiencyDescriptor | undefined {
  return PROFICIENCY_DESCRIPTORS[domainId]?.find(d => d.level === level);
}
