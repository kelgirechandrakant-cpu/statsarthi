import type { NSSTACourse } from '@/types/statsarthi';

const SOURCE_URL =
  'https://mospi.gov.in/sites/default/files/main_menu/training/Training%20Calendar%20of%20NSSTA%20for%20FY%202021-22.pdf';

export const nsstaCourses: NSSTACourse[] = [
  {
    id: 'nssta-survey-planning-design',
    title: 'Planning and Designing of Large Scale Sample Surveys',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['survey-design'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'NSSTA',
    description:
      'Review of sample survey techniques, survey planning (frame, sampling scheme, sample size), questionnaire design, post-survey operations (field/computer scrutiny, multipliers), report writing, and network/quota sampling.',
  },
  {
    id: 'nssta-advanced-sampling-techniques',
    title: 'Advanced Sampling Techniques (with NSSO/Health Survey examples)',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['survey-design'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'NSSTA',
    description:
      'Revision of basic sampling techniques, small area estimation, sampling for rare populations, network sampling, quota sampling, cluster sampling â€” using live NSSO and health survey examples.',
  },
  {
    id: 'nssta-sampling-methods-state-des',
    title: 'Sampling Methods and Techniques Used in Large Scale Sample Surveys',
    programme: 'Specially Designed Training Programme for State/UT Statistical Personnel',
    url: SOURCE_URL,
    competencyTags: ['survey-design'],
    duration: '1 week',
    targetGroup: 'State/UT DES officials',
    provider: 'NSSTA',
    description:
      'Survey planning, frame and sample selection, questionnaire design, field/computer scrutiny, estimation procedures, multipliers, and report writing â€” practical grounding via NSSO, NFHS, RCH, SRS surveys.',
  },
  {
    id: 'nssta-handling-large-scale-data-r',
    title: 'Handling Large Scale Data & Data Analysis Using R',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['python-r', 'data-visualization'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'IIT Kanpur / IASRI (delivery partner)',
    description:
      'Practical R-based data analysis: descriptive statistics, regression, logistic/log-linear analysis, factor and cluster analysis, using live NSSO/Census unit-level data including multipliers and estimation procedures.',
  },
  {
    id: 'nssta-python-for-statisticians',
    title: 'Python Training for Statisticians',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['python-r'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'C.R. Rao AIMSC, Hyderabad (delivery partner)',
    description:
      'Core Python for data science: NumPy, Pandas, Matplotlib, Seaborn, SciPy, statsmodels, scikit-learn â€” from language basics through data pre-processing and model building.',
  },
  {
    id: 'nssta-big-data-analysis',
    title: 'Big Data Analysis',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['ai-ml', 'cloud-computing'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'Dr. MCRHRD Hyderabad / C.R. Rao AIMSC / IIT Madras (delivery partners)',
    description:
      'Data science fundamentals, big data analytics for data-driven decision making, visualization, predictive analytics, data mining, forecasting, and regression/classification techniques in R/SAS/SPSS/Excel.',
  },
  {
    id: 'nssta-ai-blockchain',
    title: 'Artificial Intelligence (AI) and Concept of Blockchain',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['ai-ml', 'cybersecurity'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'C.R. Rao AIMSC / IISc Bangalore / IIT Madras (delivery partners)',
    description:
      'AI and machine learning fundamentals, common attack vectors and mitigation, blockchain applications (e.g. land records), and disruptive technologies with a focus on official statistics use cases.',
  },
  {
    id: 'nssta-national-accounts',
    title: 'National Accounts Statistics',
    programme: 'Specially Designed Training Programme for State/UT Statistical Personnel',
    url: SOURCE_URL,
    competencyTags: ['national-accounts'],
    duration: '1 week',
    targetGroup: 'State/UT DES officials',
    provider: 'NSSTA',
    description:
      'Theoretical concepts of national/social accounting; estimation of GDP, savings, capital formation, private consumption; Input-Output analysis; 1993 System of National Accounts (SNA).',
  },
  {
    id: 'nssta-index-numbers-price-statistics',
    title: 'Index Numbers and Price Statistics',
    programme: 'Specially Designed Training Programme for State/UT Statistical Personnel',
    url: SOURCE_URL,
    competencyTags: ['price-statistics'],
    duration: '1 week',
    targetGroup: 'State/UT DES officials',
    provider: 'NSSTA',
    description:
      'Sources and limitations of price data in India; construction methodology of WPI and CPI; comparative international development indices; compilation of the Index of Industrial Production (IIP).',
  },
  {
    id: 'nssta-labour-force-employment',
    title: 'Labour Force and Employment',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['labour-statistics'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'NSSTA',
    description:
      'Labour market trends and segmentation theory; concepts of underemployment, informal/unpaid work; national and international data sources and practices in compiling labour statistics.',
  },
  {
    id: 'nssta-poverty-inequality',
    title: 'Poverty Analysis, Mapping, and Measuring Inequality',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['sdg-indicators', 'labour-statistics'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'JNU (delivery partner)',
    description:
      'Poverty definitions and estimates, income inequality, poverty line estimation, use of NSSO data for poverty measurement, and review of poverty alleviation programme impact.',
  },
  {
    id: 'nssta-social-statistics-state-des',
    title: 'Social Statistics',
    programme: 'Specially Designed Training Programme for State/UT Statistical Personnel',
    url: SOURCE_URL,
    competencyTags: ['sdg-indicators'],
    duration: '1 week',
    targetGroup: 'State/UT DES officials',
    provider: 'NSSTA',
    description:
      'Human Development Index and socio-economic indicators, gender statistics, Census and Civil/Sample Registration Systems, health/education/labour/housing statistics, and Multidimensional Poverty Index.',
  },
  {
    id: 'nssta-statistical-literacy-storytelling',
    title: 'Statistical Literacy and Storytelling',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['communication', 'data-visualization'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'IIM Ahmedabad (delivery partner)',
    description:
      'Communicating statistical findings to non-technical audiences â€” framing, narrative structure, and visual storytelling for official statistics.',
  },
  {
    id: 'nssta-management-development',
    title: 'Management Development',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['leadership', 'project-management', 'change-management'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers (senior)',
    provider: 'Dr. MCRHRD Hyderabad (delivery partner)',
    description:
      'HR, time, stress, financial, change, and conflict management; communication, motivation, leadership, and global economic context for senior officer roles.',
  },
  {
    id: 'nssta-integration-survey-admin-data',
    title: 'Integration of Survey and Administrative Data',
    programme: 'Domain Specific Training Programme (In-service ISS Officers)',
    url: SOURCE_URL,
    competencyTags: ['survey-design', 'metadata-standards', 'data-quality'],
    duration: '1 week',
    targetGroup: 'In-service ISS officers',
    provider: 'IASRI Delhi / NSSTA',
    description:
      'Methods and challenges of integrating administrative record sources with traditional survey data for official statistics production.',
  },
];
