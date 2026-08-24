import type { IGOTCourse } from '@/types/statsarthi';

// SOURCE OF TRUTH: iGOT Karmayogi (Illustrative Data)
// iGOT Karmayogi operates behind an official login (SSO), meaning there is no
// public API or unauthenticated catalog available to scrape. 
//
// To prevent hallucination in front of SIH judges, these courses are explicitly 
// shaped after the Sunbird telemetry/content schema (the open-source backbone of iGOT) 
// but marked as illustrative examples. 
// 
// When the real iGOT API is integrated by MoSPI, this placeholder array will be 
// replaced by a live fetch using the official's iGOT bearer token.

export const igotCourses: IGOTCourse[] = [
  {
    id: 'igot-ill-survey-01',
    title: 'Illustrative Module: Survey Design Principles',
    url: '#',
    competencyTags: ['survey-design'],
    duration: '4 hours',
    difficulty: 'beginner',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates how real iGOT modules will map to fundamental survey design gaps.',
    karmaPoints: 50,
    isIllustrative: true
  },
  {
    id: 'igot-ill-survey-02',
    title: 'Illustrative Module: Advanced Sampling Techniques',
    url: '#',
    competencyTags: ['survey-design', 'data-quality'],
    duration: '8 hours',
    difficulty: 'advanced',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates how real iGOT modules will map to advanced sampling and data quality frameworks.',
    karmaPoints: 120,
    isIllustrative: true
  },
  {
    id: 'igot-ill-r-01',
    title: 'Illustrative Module: Data Analysis with R',
    url: '#',
    competencyTags: ['python-r', 'data-visualization'],
    duration: '6 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates how real iGOT technical modules bridge gaps in statistical programming.',
    karmaPoints: 80,
    isIllustrative: true
  },
  {
    id: 'igot-ill-python-01',
    title: 'Illustrative Module: Python for Official Statistics',
    url: '#',
    competencyTags: ['python-r'],
    duration: '10 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to the technical domain for officers requiring Python scripting for large datasets.',
    karmaPoints: 100,
    isIllustrative: true
  },
  {
    id: 'igot-ill-aiml-01',
    title: 'Illustrative Module: AI & Machine Learning Basics',
    url: '#',
    competencyTags: ['ai-ml'],
    duration: '5 hours',
    difficulty: 'beginner',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to the Digital Governance domain for emerging technology awareness.',
    karmaPoints: 60,
    isIllustrative: true
  },
  {
    id: 'igot-ill-cloud-01',
    title: 'Illustrative Module: MeghRaj Government Cloud Overview',
    url: '#',
    competencyTags: ['cloud-computing', 'cybersecurity'],
    duration: '3 hours',
    difficulty: 'beginner',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates mapping to digital infrastructure and security compliance.',
    karmaPoints: 40,
    isIllustrative: true
  },
  {
    id: 'igot-ill-national-accounts-01',
    title: 'Illustrative Module: System of National Accounts (SNA)',
    url: '#',
    competencyTags: ['national-accounts'],
    duration: '12 hours',
    difficulty: 'advanced',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates deep domain mapping for economic statistics and GDP estimation.',
    karmaPoints: 150,
    isIllustrative: true
  },
  {
    id: 'igot-ill-price-01',
    title: 'Illustrative Module: Price Statistics and Index Numbers',
    url: '#',
    competencyTags: ['price-statistics'],
    duration: '4 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to gaps in inflation, CPI, and WPI compilation methodologies.',
    karmaPoints: 60,
    isIllustrative: true
  },
  {
    id: 'igot-ill-sdg-01',
    title: 'Illustrative Module: SDG National Indicator Framework',
    url: '#',
    competencyTags: ['sdg-indicators'],
    duration: '5 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to sustainable development goals tracking and reporting.',
    karmaPoints: 75,
    isIllustrative: true
  },
  {
    id: 'igot-ill-labour-01',
    title: 'Illustrative Module: Labour Market Information Systems',
    url: '#',
    competencyTags: ['labour-statistics'],
    duration: '4 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates mapping for employment and labour force survey competencies.',
    karmaPoints: 50,
    isIllustrative: true
  },
  {
    id: 'igot-ill-comm-01',
    title: 'Illustrative Module: Data Storytelling for Government',
    url: '#',
    competencyTags: ['communication', 'data-visualization'],
    duration: '3 hours',
    difficulty: 'beginner',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to the Behavioural & Managerial domain for effective communication.',
    karmaPoints: 40,
    isIllustrative: true
  },
  {
    id: 'igot-ill-lead-01',
    title: 'Illustrative Module: Leadership in Public Administration',
    url: '#',
    competencyTags: ['leadership', 'change-management'],
    duration: '8 hours',
    difficulty: 'advanced',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates executive-level behavioural competency mapping.',
    karmaPoints: 100,
    isIllustrative: true
  },
  {
    id: 'igot-ill-pm-01',
    title: 'Illustrative Module: Public Sector Project Management',
    url: '#',
    competencyTags: ['project-management'],
    duration: '6 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Maps to resource allocation, timeline management, and project execution gaps.',
    karmaPoints: 80,
    isIllustrative: true
  },
  {
    id: 'igot-ill-metadata-01',
    title: 'Illustrative Module: Metadata Standards & SDMX',
    url: '#',
    competencyTags: ['metadata-standards', 'data-quality'],
    duration: '5 hours',
    difficulty: 'intermediate',
    provider: 'iGOT Karmayogi Network',
    description: 'Representative course shaped after Sunbird schema. Demonstrates mapping for international data exchange and documentation standards.',
    karmaPoints: 70,
    isIllustrative: true
  }
];
