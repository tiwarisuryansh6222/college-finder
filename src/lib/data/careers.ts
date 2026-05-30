export interface Career {
  id: string;
  title: string;
  description: string;
  avgSalary: string;
  education: string;
  demandLevel: 'Very High' | 'High' | 'Medium' | 'Growing';
  topSkills: string[];
  topCompanies: string[];
  stream: string;
}

export interface CareerDomain {
  id: string;
  name: string;
  stream: string;
  icon: string;
  color: string;
  description: string;
  careerCount: number;
  avgSalaryRange: string;
  careers: Career[];
}

export const careers: CareerDomain[] = [
  {
    id: 'engg',
    name: 'Engineering Careers',
    stream: 'Engineering',
    icon: 'ti-cpu',
    color: 'bg-primary-600',
    description: 'Build the future with technology, infrastructure, and innovation.',
    careerCount: 8,
    avgSalaryRange: '₹6–25 LPA',
    careers: [
      {
        id: 'se', title: 'Software Engineer', stream: 'Engineering',
        description: 'Design, develop, and maintain software applications and systems.',
        avgSalary: '₹8–20 LPA', education: 'B.Tech / B.E. in CS or IT',
        demandLevel: 'Very High',
        topSkills: ['JavaScript', 'React', 'Java', 'Python', 'System Design'],
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS']
      },
      {
        id: 'ds', title: 'Data Scientist', stream: 'Engineering',
        description: 'Analyze complex data sets to drive business decisions and build ML models.',
        avgSalary: '₹10–25 LPA', education: 'B.Tech / B.E. / M.Tech in CS/Stats',
        demandLevel: 'Very High',
        topSkills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
        topCompanies: ['Meta', 'Fractal', 'Mu Sigma', 'Uber']
      },
      {
        id: 'mle', title: 'ML Engineer', stream: 'Engineering',
        description: 'Deploy, optimize, and maintain machine learning models in production.',
        avgSalary: '₹12–28 LPA', education: 'B.Tech / M.Tech in CS/AI',
        demandLevel: 'Very High',
        topSkills: ['TensorFlow', 'PyTorch', 'MLOps', 'Python'],
        topCompanies: ['OpenAI', 'Google', 'Nvidia', 'Amazon']
      },
      {
        id: 'devops', title: 'DevOps Engineer', stream: 'Engineering',
        description: 'Bridge the gap between development and operations to automate deployments.',
        avgSalary: '₹9–22 LPA', education: 'B.Tech / B.E. in CS or IT',
        demandLevel: 'High',
        topSkills: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD'],
        topCompanies: ['Atlassian', 'Red Hat', 'IBM', 'Accenture']
      },
      {
        id: 'mech', title: 'Mechanical Engineer', stream: 'Engineering',
        description: 'Design and manufacture mechanical systems, robotics, and automotive parts.',
        avgSalary: '₹5–15 LPA', education: 'B.Tech / B.E. in Mechanical',
        demandLevel: 'Medium',
        topSkills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Manufacturing'],
        topCompanies: ['Tata Motors', 'L&T', 'Mahindra', 'Bosch']
      },
      {
        id: 'civil', title: 'Civil Engineer', stream: 'Engineering',
        description: 'Plan, design, and oversee construction of infrastructure projects.',
        avgSalary: '₹5–14 LPA', education: 'B.Tech / B.E. in Civil',
        demandLevel: 'High',
        topSkills: ['AutoCAD', 'Structural Analysis', 'Project Management'],
        topCompanies: ['L&T Construction', 'Shapoorji Pallonji', 'DLF']
      },
      {
        id: 'ee', title: 'Electrical Engineer', stream: 'Engineering',
        description: 'Design electrical systems, power generation, and control systems.',
        avgSalary: '₹6–16 LPA', education: 'B.Tech / B.E. in Electrical',
        demandLevel: 'Medium',
        topSkills: ['Circuit Design', 'Power Systems', 'PLC', 'MATLAB'],
        topCompanies: ['Siemens', 'ABB', 'GE', 'BHEL']
      },
      {
        id: 'aero', title: 'Aerospace Engineer', stream: 'Engineering',
        description: 'Design aircraft, spacecraft, satellites, and missiles.',
        avgSalary: '₹8–20 LPA', education: 'B.Tech / B.E. in Aerospace',
        demandLevel: 'Growing',
        topSkills: ['Aerodynamics', 'Propulsion', 'CAD', 'Fluid Dynamics'],
        topCompanies: ['ISRO', 'DRDO', 'Boeing', 'Airbus']
      }
    ]
  },
  {
    id: 'mba',
    name: 'Management Careers',
    stream: 'Management',
    icon: 'ti-briefcase',
    color: 'bg-blue-500',
    description: 'Lead organizations, drive growth, and manage global business operations.',
    careerCount: 6,
    avgSalaryRange: '₹8–30 LPA',
    careers: [
      {
        id: 'pm', title: 'Product Manager', stream: 'Management',
        description: 'Guide the success of a product and lead cross-functional teams.',
        avgSalary: '₹12–35 LPA', education: 'MBA / B.Tech + MBA',
        demandLevel: 'Very High',
        topSkills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis'],
        topCompanies: ['Google', 'Flipkart', 'Swiggy', 'Microsoft']
      },
      {
        id: 'mm', title: 'Marketing Manager', stream: 'Management',
        description: 'Develop marketing strategies to promote products and brands.',
        avgSalary: '₹8–25 LPA', education: 'MBA in Marketing',
        demandLevel: 'High',
        topSkills: ['Digital Marketing', 'Brand Strategy', 'Market Research'],
        topCompanies: ['HUL', 'P&G', 'L\'Oréal', 'ITC']
      },
      {
        id: 'fa', title: 'Finance Analyst', stream: 'Management',
        description: 'Analyze financial data to guide business and investment decisions.',
        avgSalary: '₹7–20 LPA', education: 'MBA in Finance / CA / CFA',
        demandLevel: 'High',
        topSkills: ['Financial Modeling', 'Valuation', 'Excel', 'Corporate Finance'],
        topCompanies: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley']
      },
      {
        id: 'hrm', title: 'HR Manager', stream: 'Management',
        description: 'Manage employee relations, talent acquisition, and organizational culture.',
        avgSalary: '₹6–18 LPA', education: 'MBA in HR',
        demandLevel: 'Medium',
        topSkills: ['Talent Acquisition', 'Employee Engagement', 'Labor Laws'],
        topCompanies: ['Reliance', 'TCS', 'Infosys', 'Aditya Birla Group']
      },
      {
        id: 'om', title: 'Operations Manager', stream: 'Management',
        description: 'Oversee supply chain, logistics, and day-to-day business operations.',
        avgSalary: '₹8–22 LPA', education: 'MBA in Operations',
        demandLevel: 'High',
        topSkills: ['Supply Chain', 'Logistics', 'Six Sigma', 'Process Optimization'],
        topCompanies: ['Amazon', 'Delhivery', 'Flipkart', 'Maersk']
      },
      {
        id: 'consultant', title: 'Management Consultant', stream: 'Management',
        description: 'Advise organizations on high-level decisions to improve performance.',
        avgSalary: '₹15–35 LPA', education: 'MBA from Tier 1 B-School',
        demandLevel: 'Very High',
        topSkills: ['Problem Solving', 'Client Management', 'Strategy', 'Data Analysis'],
        topCompanies: ['McKinsey', 'BCG', 'Bain', 'Deloitte']
      }
    ]
  },
  {
    id: 'med',
    name: 'Medical Careers',
    stream: 'Medical',
    icon: 'ti-stethoscope',
    color: 'bg-success',
    description: 'Save lives, advance healthcare, and improve human well-being.',
    careerCount: 6,
    avgSalaryRange: '₹8–40 LPA',
    careers: [
      {
        id: 'doctor', title: 'General Physician', stream: 'Medical',
        description: 'Diagnose and treat everyday illnesses and provide primary healthcare.',
        avgSalary: '₹8–18 LPA', education: 'MBBS',
        demandLevel: 'Very High',
        topSkills: ['Clinical Diagnosis', 'Patient Care', 'Medicine'],
        topCompanies: ['Apollo', 'Fortis', 'Max Healthcare', 'Government Hospitals']
      },
      {
        id: 'surgeon', title: 'Surgeon', stream: 'Medical',
        description: 'Perform operations to treat injuries, diseases, and deformities.',
        avgSalary: '₹15–40 LPA', education: 'MBBS + MS',
        demandLevel: 'High',
        topSkills: ['Surgical Precision', 'Anatomy', 'Emergency Response'],
        topCompanies: ['AIIMS', 'Medanta', 'Manipal Hospitals']
      },
      {
        id: 'pharmacist', title: 'Pharmacist', stream: 'Medical',
        description: 'Dispense medications and advise on their safe use.',
        avgSalary: '₹4–10 LPA', education: 'B.Pharm / M.Pharm',
        demandLevel: 'High',
        topSkills: ['Pharmacology', 'Drug Dispensing', 'Healthcare Tech'],
        topCompanies: ['Sun Pharma', 'Cipla', 'Apollo Pharmacy']
      },
      {
        id: 'nurse', title: 'Registered Nurse', stream: 'Medical',
        description: 'Provide patient care and support doctors in medical treatments.',
        avgSalary: '₹3–8 LPA', education: 'B.Sc Nursing',
        demandLevel: 'Very High',
        topSkills: ['Patient Care', 'Vital Signs Monitoring', 'Empathy'],
        topCompanies: ['Private Hospitals', 'Govt Hospitals', 'Home Care Services']
      },
      {
        id: 'radiologist', title: 'Radiologist', stream: 'Medical',
        description: 'Diagnose diseases using medical imaging techniques like X-rays and MRIs.',
        avgSalary: '₹12–30 LPA', education: 'MBBS + MD Radiology',
        demandLevel: 'Growing',
        topSkills: ['MRI/CT Scan Analysis', 'Diagnostic Imaging', 'Ultrasound'],
        topCompanies: ['Diagnostic Centers', 'Dr. Lal PathLabs', 'SRL Diagnostics']
      },
      {
        id: 'dentist', title: 'Dentist', stream: 'Medical',
        description: 'Diagnose and treat issues relating to teeth and mouth health.',
        avgSalary: '₹5–15 LPA', education: 'BDS / MDS',
        demandLevel: 'Medium',
        topSkills: ['Dental Surgery', 'Orthodontics', 'Oral Hygiene'],
        topCompanies: ['Clove Dental', 'Private Clinics']
      }
    ]
  },
  {
    id: 'law',
    name: 'Legal Careers',
    stream: 'Law',
    icon: 'ti-scale',
    color: 'bg-orange-500',
    description: 'Uphold justice, navigate corporate laws, and shape public policy.',
    careerCount: 5,
    avgSalaryRange: '₹5–25 LPA',
    careers: [
      {
        id: 'corp-lawyer', title: 'Corporate Lawyer', stream: 'Law',
        description: 'Advise businesses on legal rights, obligations, and transactions.',
        avgSalary: '₹10–25 LPA', education: 'LLB / BA LLB',
        demandLevel: 'High',
        topSkills: ['Contract Drafting', 'M&A', 'Corporate Governance'],
        topCompanies: ['Cyril Amarchand Mangaldas', 'Khaitan & Co', 'Trilegal']
      },
      {
        id: 'litigation', title: 'Litigation Lawyer', stream: 'Law',
        description: 'Represent clients in civil or criminal court proceedings.',
        avgSalary: '₹5–20 LPA', education: 'LLB / BA LLB',
        demandLevel: 'Medium',
        topSkills: ['Advocacy', 'Legal Research', 'Cross-examination'],
        topCompanies: ['Independent Practice', 'Law Chambers']
      },
      {
        id: 'legal-advisor', title: 'Legal Advisor', stream: 'Law',
        description: 'Provide legal counsel to corporations or government agencies.',
        avgSalary: '₹8–18 LPA', education: 'LLB / LLM',
        demandLevel: 'High',
        topSkills: ['Compliance', 'Risk Management', 'Labor Laws'],
        topCompanies: ['Reliance', 'Tata Sons', 'Infosys']
      },
      {
        id: 'judge', title: 'Judge', stream: 'Law',
        description: 'Preside over court hearings and ensure justice is served.',
        avgSalary: '₹12–25 LPA', education: 'LLB + Judicial Services Exam',
        demandLevel: 'High',
        topSkills: ['Impartiality', 'Constitutional Law', 'Judgment Writing'],
        topCompanies: ['District Courts', 'High Courts', 'Supreme Court']
      },
      {
        id: 'notary', title: 'Notary Public', stream: 'Law',
        description: 'Authenticate legal documents and oversee oaths and affidavits.',
        avgSalary: '₹4–10 LPA', education: 'LLB + Notary License',
        demandLevel: 'Medium',
        topSkills: ['Document Verification', 'Affidavits', 'Legal Compliance'],
        topCompanies: ['Independent Practice']
      }
    ]
  },
  {
    id: 'des',
    name: 'Design Careers',
    stream: 'Design',
    icon: 'ti-palette',
    color: 'bg-pink-500',
    description: 'Create engaging user experiences, beautiful products, and visual stories.',
    careerCount: 6,
    avgSalaryRange: '₹5–20 LPA',
    careers: [
      {
        id: 'uiux', title: 'UI/UX Designer', stream: 'Design',
        description: 'Design user interfaces and experiences for digital products.',
        avgSalary: '₹6–18 LPA', education: 'B.Des / Certification',
        demandLevel: 'Very High',
        topSkills: ['Figma', 'Wireframing', 'User Research', 'Prototyping'],
        topCompanies: ['Google', 'Swiggy', 'Cred', 'Zoho']
      },
      {
        id: 'graphic', title: 'Graphic Designer', stream: 'Design',
        description: 'Create visual concepts for branding, marketing, and media.',
        avgSalary: '₹4–12 LPA', education: 'BFA / Graphic Design Cert',
        demandLevel: 'High',
        topSkills: ['Adobe Illustrator', 'Photoshop', 'Typography', 'Branding'],
        topCompanies: ['Ogilvy', 'Leo Burnett', 'Tech Startups']
      },
      {
        id: 'fashion', title: 'Fashion Designer', stream: 'Design',
        description: 'Design clothing, accessories, and footwear for brands or own label.',
        avgSalary: '₹5–15 LPA', education: 'B.Des / Fashion Diploma',
        demandLevel: 'Medium',
        topSkills: ['Pattern Making', 'Draping', 'Trend Forecasting', 'Illustration'],
        topCompanies: ['Manish Malhotra', 'FabIndia', 'Myntra', 'Raymond']
      },
      {
        id: 'interior', title: 'Interior Designer', stream: 'Design',
        description: 'Design functional and aesthetic indoor spaces for clients.',
        avgSalary: '₹4–14 LPA', education: 'B.Des / B.Arch / Diploma',
        demandLevel: 'Growing',
        topSkills: ['AutoCAD', 'SketchUp', 'Space Planning', 'Material Knowledge'],
        topCompanies: ['Livspace', 'HomeLane', 'Godrej Interio']
      },
      {
        id: 'animator', title: 'Animator', stream: 'Design',
        description: 'Create moving images and visual effects for movies, games, and TV.',
        avgSalary: '₹5–15 LPA', education: 'BFA / Animation Degree',
        demandLevel: 'Growing',
        topSkills: ['Maya', 'Blender', 'After Effects', 'Character Animation'],
        topCompanies: ['Prime Focus', 'Redchillies VFX', 'Rockstar Games']
      },
      {
        id: 'illustrator', title: 'Illustrator', stream: 'Design',
        description: 'Create original drawings for books, magazines, and digital media.',
        avgSalary: '₹4–12 LPA', education: 'BFA / Self-taught',
        demandLevel: 'Medium',
        topSkills: ['Procreate', 'Vector Art', 'Storyboarding', 'Sketching'],
        topCompanies: ['Publishing Houses', 'Ad Agencies', 'Freelance']
      }
    ]
  },
  {
    id: 'sci',
    name: 'Science Careers',
    stream: 'Science',
    icon: 'ti-microscope',
    color: 'bg-cyan-500',
    description: 'Discover new knowledge, conduct research, and innovate in pure sciences.',
    careerCount: 5,
    avgSalaryRange: '₹6–18 LPA',
    careers: [
      {
        id: 'research-sci', title: 'Research Scientist', stream: 'Science',
        description: 'Conduct experiments and analyze results in academic or corporate labs.',
        avgSalary: '₹8–18 LPA', education: 'M.Sc / Ph.D',
        demandLevel: 'Medium',
        topSkills: ['Experimental Design', 'Data Analysis', 'Grant Writing'],
        topCompanies: ['DRDO', 'ISRO', 'CSIR Labs', 'Reliance Life Sciences']
      },
      {
        id: 'lab-analyst', title: 'Lab Analyst', stream: 'Science',
        description: 'Test samples and maintain quality control in manufacturing and pharma.',
        avgSalary: '₹4–10 LPA', education: 'B.Sc / M.Sc',
        demandLevel: 'High',
        topSkills: ['Chromatography', 'Quality Control', 'Spectroscopy', 'Lab Safety'],
        topCompanies: ['Biocon', 'Dr. Reddy\'s', 'Sun Pharma']
      },
      {
        id: 'biotech', title: 'Biotech Researcher', stream: 'Science',
        description: 'Use biological systems to develop new products and technologies.',
        avgSalary: '₹6–15 LPA', education: 'B.Tech / M.Sc Biotechnology',
        demandLevel: 'Growing',
        topSkills: ['Molecular Biology', 'Cell Culture', 'Bioinformatics'],
        topCompanies: ['Biocon', 'Serum Institute', 'Bharat Biotech']
      },
      {
        id: 'astronomer', title: 'Astronomer', stream: 'Science',
        description: 'Study celestial bodies, space, and the physical universe.',
        avgSalary: '₹8–16 LPA', education: 'M.Sc / Ph.D Physics',
        demandLevel: 'Medium',
        topSkills: ['Astrophysics', 'Data Modeling', 'Telescope Operation'],
        topCompanies: ['ISRO', 'IUCAA', 'IIA']
      },
      {
        id: 'geologist', title: 'Geologist', stream: 'Science',
        description: 'Study the earth, its materials, processes, and history.',
        avgSalary: '₹6–15 LPA', education: 'B.Sc / M.Sc Geology',
        demandLevel: 'Medium',
        topSkills: ['Field Mapping', 'GIS', 'Mineralogy', 'Seismology'],
        topCompanies: ['ONGC', 'Geological Survey of India', 'Coal India']
      }
    ]
  },
  {
    id: 'arts',
    name: 'Arts & Media Careers',
    stream: 'Arts',
    icon: 'ti-pen',
    color: 'bg-purple-500',
    description: 'Shape culture through journalism, writing, performance, and media.',
    careerCount: 6,
    avgSalaryRange: '₹4–20 LPA',
    careers: [
      {
        id: 'journalist', title: 'Journalist', stream: 'Arts',
        description: 'Investigate and report news stories across print, digital, and TV media.',
        avgSalary: '₹4–15 LPA', education: 'BA Journalism / Mass Comm',
        demandLevel: 'High',
        topSkills: ['Investigative Reporting', 'Writing', 'Interviewing', 'Ethics'],
        topCompanies: ['Times Group', 'NDTV', 'The Hindu', 'Network18']
      },
      {
        id: 'content-writer', title: 'Content Writer', stream: 'Arts',
        description: 'Create engaging written content for websites, blogs, and brands.',
        avgSalary: '₹3–10 LPA', education: 'BA English / Mass Comm',
        demandLevel: 'Very High',
        topSkills: ['Copywriting', 'SEO', 'Proofreading', 'Storytelling'],
        topCompanies: ['Ad Agencies', 'Tech Companies', 'Media Houses']
      },
      {
        id: 'director', title: 'Film Director', stream: 'Arts',
        description: 'Lead the creative vision and production of films and video content.',
        avgSalary: '₹6–25 LPA', education: 'Film School Degree',
        demandLevel: 'Medium',
        topSkills: ['Storytelling', 'Cinematography', 'Leadership', 'Editing'],
        topCompanies: ['YRF', 'Dharma Productions', 'Netflix', 'Freelance']
      },
      {
        id: 'actor', title: 'Actor', stream: 'Arts',
        description: 'Perform roles in theatre, television, film, and digital media.',
        avgSalary: 'Variable', education: 'Acting Diploma / BA Arts',
        demandLevel: 'Medium',
        topSkills: ['Acting', 'Voice Modulation', 'Improvisation', 'Memorization'],
        topCompanies: ['Production Houses', 'Theatre Groups']
      },
      {
        id: 'photographer', title: 'Photographer', stream: 'Arts',
        description: 'Capture high-quality images for events, fashion, journalism, and art.',
        avgSalary: '₹4–12 LPA', education: 'Photography Course / Self-taught',
        demandLevel: 'Growing',
        topSkills: ['Lighting', 'Photo Editing', 'Composition', 'Camera Operations'],
        topCompanies: ['Media Agencies', 'Freelance', 'E-commerce Studios']
      },
      {
        id: 'art-director', title: 'Art Director', stream: 'Arts',
        description: 'Manage the visual style and images in magazines, newspapers, and packaging.',
        avgSalary: '₹8–20 LPA', education: 'BFA / B.Des',
        demandLevel: 'High',
        topSkills: ['Visual Design', 'Creative Strategy', 'Team Management'],
        topCompanies: ['Ogilvy', 'Dentsu', 'Condé Nast']
      }
    ]
  },
  {
    id: 'hosp',
    name: 'Hospitality Careers',
    stream: 'Hospitality',
    icon: 'ti-building',
    color: 'bg-yellow-500',
    description: 'Provide world-class service in hotels, travel, and events.',
    careerCount: 5,
    avgSalaryRange: '₹4–18 LPA',
    careers: [
      {
        id: 'hotel-mgr', title: 'Hotel Manager', stream: 'Hospitality',
        description: 'Oversee daily operations, staff, and customer satisfaction in a hotel.',
        avgSalary: '₹8–25 LPA', education: 'BHM / MHM',
        demandLevel: 'High',
        topSkills: ['Operations', 'Customer Service', 'Revenue Management', 'Leadership'],
        topCompanies: ['Taj Hotels', 'Oberoi Group', 'Marriott', 'Hyatt']
      },
      {
        id: 'chef', title: 'Chef', stream: 'Hospitality',
        description: 'Prepare meals, plan menus, and manage kitchen staff.',
        avgSalary: '₹5–20 LPA', education: 'Culinary Arts Degree',
        demandLevel: 'Very High',
        topSkills: ['Culinary Skills', 'Kitchen Management', 'Food Safety', 'Menu Planning'],
        topCompanies: ['5-Star Hotels', 'Fine Dining Restaurants', 'Cruise Lines']
      },
      {
        id: 'event-planner', title: 'Event Planner', stream: 'Hospitality',
        description: 'Organize corporate events, weddings, and large-scale exhibitions.',
        avgSalary: '₹4–15 LPA', education: 'Event Management Diploma',
        demandLevel: 'Growing',
        topSkills: ['Project Management', 'Networking', 'Budgeting', 'Negotiation'],
        topCompanies: ['Wizcraft', 'TCI', 'Freelance']
      },
      {
        id: 'travel-consultant', title: 'Travel Consultant', stream: 'Hospitality',
        description: 'Advise clients on travel destinations, itineraries, and bookings.',
        avgSalary: '₹3–10 LPA', education: 'Tourism Degree',
        demandLevel: 'Medium',
        topSkills: ['Geography Knowledge', 'Customer Service', 'GDS Systems'],
        topCompanies: ['MakeMyTrip', 'Thomas Cook', 'Cox & Kings']
      },
      {
        id: 'sommelier', title: 'Sommelier', stream: 'Hospitality',
        description: 'Expert in wine tasting, pairing, and managing wine cellars.',
        avgSalary: '₹6–15 LPA', education: 'Sommelier Certification',
        demandLevel: 'Growing',
        topSkills: ['Wine Tasting', 'Pairing Knowledge', 'Inventory Management'],
        topCompanies: ['Luxury Hotels', 'High-end Restaurants']
      }
    ]
  }
];
