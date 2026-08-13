/**
 * Central Category Configuration
 * Defines metadata, gradients, headers, and static sections for all 8 resource categories.
 */

export const CATEGORIES = {
  judicial: {
    id: 'judicial',
    name: 'Judicial Resources',
    headerTitle: 'Judicial & Legal Resources',
    headerSubtitle: 'Explore Supreme Court judgments, Acts, Law Commission reports, and legal archives.',
    badge: 'Legal Terminal',
    badgeIcon: '⚖️',
    gradient: 'from-[#1b5e20] to-[#1b3022]',
    accentColor: '#4caf50',
    subdomainParam: 'judicial',
    staticSections: [
      {
        subdomain: 'content-providers',
        title: 'Court Judgments',
        icon: '⚖️',
        items: [
          { name: 'Supreme Court of India', count: '50,000+' },
          { name: 'High Courts (State-wise)', count: '1.2M+' },
          { name: 'District Courts', count: '200,000+' },
          { name: 'Consumer Forums', count: '200,000+' }
        ]
      },
      {
        subdomain: 'laws-acts',
        title: 'Laws & Acts',
        icon: '📜',
        items: [
          { name: 'Central Acts (1836-2024)', count: '2,500+' },
          { name: 'State Acts & Rules', count: '15,000+' },
          { name: 'Constitutional Provisions', count: '450+' },
          { name: 'Ordinances & Gazettes', count: '25,000+' }
        ]
      },
      {
        subdomain: 'resource-types',
        title: 'Legal Research',
        icon: '🔍',
        items: [
          { name: 'Law Commission Reports', count: '280+' },
          { name: 'Legal Glossaries', count: '10,000 terms' },
          { name: 'Constituent Assembly Debates', count: '12 Vols' },
          { name: 'Historical Legal Archives', count: 'By-laws' }
        ]
      }
    ]
  },

  school: {
    id: 'school',
    name: 'School Education',
    headerTitle: 'School Education Vault',
    headerSubtitle: 'NCERT textbooks, video lectures, sample papers, and interactive learning modules for K-12.',
    badge: 'K-12 Portal',
    badgeIcon: '🎒',
    gradient: 'from-[#1a237e] to-[#0d47a1]',
    accentColor: '#3f51b5',
    subdomainParam: 'school',
    staticSections: [
      {
        subdomain: 'subjects',
        title: 'Subjects',
        icon: '📚',
        items: [
          'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Commerce', 'History',
          'Geography', 'Economics', 'Vocational Studies', 'General Science',
          'Computer Science', 'The Arts', 'English', 'Political Science', 'Regional Languages'
        ]
      },
      {
        subdomain: 'educational-levels',
        title: 'Educational Levels',
        icon: '🎓',
        items: [
          'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI',
          'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII',
          'JEE Main Preparatory', 'JEE Advanced Preparatory', 'NEET (UG) Preparatory'
        ]
      },
      {
        subdomain: 'languages',
        title: 'Contents in Indian Languages',
        icon: '🇮🇳',
        items: [
          'Assamese', 'Bengali', 'Bodo/Boro', 'Dogri', 'Garo', 'Gujarati',
          'Hindi', 'Kannada', 'Kashmiri', 'Khasi', 'Konkani', 'Maithili',
          'Malayalam', 'Marathi', 'Manipuri', 'Nepali', 'Odia', 'Punjabi',
          'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Urdu'
        ]
      }
    ]
  },

  research: {
    id: 'research',
    name: 'Research Resources',
    headerTitle: 'Research & Academic Repository',
    headerSubtitle: 'Access peer-reviewed journals, doctoral theses, preprints, conference proceedings, and datasets.',
    badge: 'Research Lab',
    badgeIcon: '🔬',
    gradient: 'from-[#004d40] to-[#002f2b]',
    accentColor: '#009688',
    subdomainParam: 'research',
    staticSections: [
      {
        subdomain: 'subjects',
        title: 'Academic Subjects',
        icon: '🧬',
        items: ['Physical Sciences', 'Biological Sciences', 'Chemical Sciences', 'Engineering & Tech', 'Arts & Humanities', 'Social Sciences', 'Medicine & Health', 'Earth & Environment', 'Business & Econ', 'Computer Science', 'Mathematics', 'Philosophy', 'Agricultural Science', 'Law & Governance', 'Psychology']
      },
      {
        subdomain: 'resource-types',
        title: 'Research Types',
        icon: '📑',
        items: ['Journal Articles', 'Theses & Dissertations', 'Conference Papers', 'Research Reports', 'Datasets', 'Preprints', 'Patents & Standards', 'Systematic Reviews', 'Case Studies', 'Book Chapters', 'Monographs', 'Working Papers']
      },
      {
        subdomain: 'institutes',
        title: 'Institutes & Labs',
        icon: '🏢',
        items: ['Indian Institutes of Technology (IITs)', 'National Institutes of Tech (NITs)', 'IISERs & IISC', 'CSIR Laboratories', 'DRDO Research Centers', 'ISRO / Dept of Space', 'ICMR Centers', 'ICAR Institutions', 'National Repositories', 'Public Universities', 'International Research Agencies', 'Private R&D Centers']
      },
      {
        subdomain: 'journals',
        title: 'Journals & Repositories',
        icon: '🗞️',
        items: ['Nature Portfolio', 'ScienceDirect (Elsevier)', 'IEEE Xplore', 'PubMed Central', 'arXiv.org (Preprints)', 'SAGE Journals', 'SpringerLink', 'Wiley Online Library', 'JSTOR Archive', 'Taylor & Francis', 'Oxford Academic', 'ACM Digital Library']
      }
    ]
  },

  patents: {
    id: 'patents',
    name: 'Patents & Standards',
    headerTitle: 'Patents & Technical Standards',
    headerSubtitle: 'Browse global patent databases, ISO/IEEE standards, technical specifications, and IP filings.',
    badge: 'IP Terminal',
    badgeIcon: '📜',
    gradient: 'from-[#3e2723] to-[#1b0000]',
    accentColor: '#795548',
    subdomainParam: 'patents',
    staticSections: [
      {
        subdomain: 'jurisdictions',
        title: 'Patent Authorities',
        icon: '🏛️',
        items: [
          'Indian Patent Office (IPO)', 'USPTO (USA)', 'European Patent Office (EPO)',
          'WIPO (PCT International)', 'JPO (Japan)', 'KIPO (South Korea)',
          'CNIPA (China)', 'IP Australia', 'UK Intellectual Property Office',
          'German Patent Office (DPMA)', 'Canadian IP Office (CIPO)', 'INPI (France)'
        ]
      },
      {
        subdomain: 'standards',
        title: 'International Standards',
        icon: '📏',
        items: [
          'ISO Standards', 'IEEE Standards', 'IEC Electrotechnical',
          'ASTM International', 'ASI Standards', 'ITU Telecommunications',
          'SAE International', 'CEN European Standards', 'NIST (USA)',
          'BSI (UK)', 'DIN (Germany)', 'BIS (India)'
        ]
      },
      {
        subdomain: 'domains',
        title: 'Technical Domains',
        icon: '⚙️',
        items: [
          'High-Tech Electronics', 'Pharmaceutical & Bio', 'Mechanical Engineering',
          'Sustainable Energy', 'Aviation & Space', 'Artificial Intelligence',
          'Telecommunications', 'Medical Devices', 'Chemical Processing',
          'Automotive Tech', 'Materials Science', 'Nanotechnology'
        ]
      },
      {
        subdomain: 'legal',
        title: 'Legal & Compliance',
        icon: '⚖️',
        items: [
          'Intellectual Property Rights', 'Trademark Guidelines', 'Licensing Frameworks',
          'Compliance Protocols', 'Patent Litigation', 'Copyright Laws',
          'Industrial Design Rights', 'Trade Secrets Protection', 'IP Valuation',
          'Patent Drafting Guide', 'Filing Strategies', 'Prior Art Search'
        ]
      }
    ]
  },

  higher: {
    id: 'higher',
    name: 'Higher Education',
    headerTitle: 'Higher Education Hub',
    headerSubtitle: 'University curricula, degree programs, lecture notes, academic journals, and college resources.',
    badge: 'University Hub',
    badgeIcon: '🏛️',
    gradient: 'from-[#4a148c] to-[#260052]',
    accentColor: '#9c27b0',
    subdomainParam: 'higher',
    staticSections: [
      {
        subdomain: 'subjects',
        title: 'Academic Streams',
        icon: '🎓',
        items: [
          'Engineering & Technology', 'Medical & Healthcare', 'Commerce & Finance',
          'Arts & Humanities', 'Sciences & Mathematics', 'Law & Governance',
          'Agriculture & Rural', 'Management & Leadership', 'Design & Architecture',
          'Information Technology', 'Social Sciences', 'Mass Communication'
        ]
      },
      {
        subdomain: 'institutes',
        title: 'Institute Categories',
        icon: '🏛️',
        items: [
          'Central Universities', 'State Public Universities', 'Deemed Universities',
          'Private Universities', 'Institutes of National Importance', 'Autonomous Colleges',
          'Research Institutions', 'Affiliated Institutes', 'International Partners',
          'Technical Education Boards', 'Vocational Centers', 'Open Universities'
        ]
      },
      {
        subdomain: 'educational-levels',
        title: 'Degree Levels',
        icon: '📜',
        items: [
          'Undergraduate (UG)', 'Postgraduate (PG)', 'Doctoral (Ph.D)',
          'Post-Doctoral Research', 'Diploma Programs', 'Executive Certificates',
          'Integrated Dual Degrees', 'Vocational Diplomas', 'Distance Education'
        ]
      }
    ]
  },

  career: {
    id: 'career',
    name: 'Career Development',
    headerTitle: 'Career & Competitive Exams',
    headerSubtitle: 'Exam prep materials, UPSC/GATE/CAT study guides, skill certifications, and career roadmaps.',
    badge: 'Career Hub',
    badgeIcon: '🚀',
    gradient: 'from-[#b71c1c] to-[#5f0000]',
    accentColor: '#f44336',
    subdomainParam: 'career',
    staticSections: [
      {
        subdomain: 'examinations',
        title: 'Competitive Examinations',
        icon: '📝',
        items: [
          'UPSC Civil Services', 'GATE Preparation', 'Banking Exams (IBPS/SBI)',
          'SSC CGL & CHSL', 'Railway Recruitment (RRB)', 'Staff Selection Commission',
          'Insurance Exams', 'Defense Services (NDA/CDS)', 'Teaching Exams (TET)',
          'Management Aptitude (CAT/XAT)', 'Common Law Admission (CLAT)', 'State Public Services'
        ]
      },
      {
        subdomain: 'resource-types',
        title: 'Study Resources',
        icon: '📜',
        items: [
          'Mock Tests', 'Previous Year Papers', 'Study Guides',
          'Interview Prep', 'Resume Templates',
          'Cloud Computing (AWS/Azure)', 'Data Science & Analytics', 'Project Management (PMP)',
          'Cybersecurity (CISSP/CEH)', 'Digital Marketing', 'Full Stack Development',
          'AI & Machine Learning', 'Finance (CFA/FRM)', 'HR Certifications',
          'Agile & Scrum Master', 'Salesforce Administration', 'Blockchain Technology'
        ]
      }
    ]
  },

  cultural: {
    id: 'cultural',
    name: 'Cultural Archives',
    headerTitle: 'Cultural & Heritage Archives',
    headerSubtitle: 'Explore historical manuscripts, classical arts, folk traditions, museum artifacts, and rare epics.',
    badge: 'Heritage Vault',
    badgeIcon: '🏛️',
    gradient: 'from-[#880e4f] to-[#4a0026]',
    accentColor: '#e91e63',
    subdomainParam: 'cultural',
    staticSections: [
      {
        subdomain: 'heritage',
        title: 'Heritage Monuments & Sites',
        icon: '🏛️',
        items: [
          'Taj Mahal (Agra)', 'Hampi (Karnataka)', 'Ajanta & Ellora',
          'Khajuraho Temples', 'Qutub Minar (Delhi)', 'Sun Temple (Konark)',
          'Chhatrapati Shivaji Terminus', 'Rani ki Vav', 'Red Fort',
          'Hill Forts of Rajasthan', 'Mahabodhi Temple', 'Sanchi Stupa'
        ]
      },
      {
        subdomain: 'arts',
        title: 'Classical Arts',
        icon: '🎭',
        items: [
          'Bharatanatyam (Tamil Nadu)', 'Kathak (North India)', 'Kathakali (Kerala)',
          'Kuchipudi (Andhra)', 'Odissi (Odisha)', 'Sattriya (Assam)',
          'Manipuri (Manipur)', 'Mohiniyattam (Kerala)', 'Hindustani Classical',
          'Carnatic Music', 'Dhrupad Traditions', 'Classical Instruments'
        ]
      },
      {
        subdomain: 'literature',
        title: 'Literature & Scripts',
        icon: '✍️',
        items: [
          'Vedic Sanskrit Texts', 'Sangam Literature', 'Bhakti Poetry',
          'Pali Canon', 'Brahmi Script', 'Grantha Script',
          'Persian Manuscripts', 'Medieval Chronicles', 'Folk Epics',
          'Modern Indian Literature', 'Regional Masterpieces', 'Calligraphy'
        ]
      },
      {
        subdomain: 'festivals',
        title: 'Festivals & Rituals',
        icon: '✨',
        items: [
          'Kumbh Mela', 'Diwali Traditions', 'Durga Puja (Kolkata)',
          'Holi Celebrations', 'Onam Festival', 'Pongal (Tamil Nadu)',
          'Bihu (Assam)', 'Navratri & Garba', 'Ganesh Chaturthi',
          'Chhath Puja', 'Hemis Festival (Ladakh)', 'Hornbill Festival (Nagaland)'
        ]
      }
    ]
  },

  newspaper: {
    id: 'newspaper',
    name: 'Newspaper Archives',
    headerTitle: 'Newspaper & Periodical Archives',
    headerSubtitle: 'Historical gazettes, regional dailies, pre-independence periodicals, and international press clippings.',
    badge: 'Press Archives',
    badgeIcon: '🗞️',
    gradient: 'from-[#0d47a1] to-[#002171]',
    accentColor: '#2196f3',
    subdomainParam: 'newspaper',
    staticSections: [
      {
        subdomain: 'national',
        title: 'National Dailies',
        icon: '📰',
        items: [
          'The Times of India (1838-Present)', 'The Hindu (1878-Present)', 'The Indian Express (1932-Present)',
          'Hindustan Times (1924-Present)', 'The Statesman (1875-Present)', 'The Telegraph (1982-Present)',
          'Deccan Herald (1948-Present)', 'The Tribune (1881-Present)', 'The Pioneer (1865-Present)',
          'Business Standard', 'The Economic Times', 'Financial Express'
        ]
      },
      {
        subdomain: 'regional',
        title: 'Regional Publications',
        icon: '📍',
        items: [
          'Dainik Jagran (Hindi)', 'Malayala Manorama (Malayalam)', 'Dina Thanthi (Tamil)',
          'Eenadu (Telugu)', 'Lokmat (Marathi)', 'Anandabazar Patrika (Bengali)',
          'Gujarat Samachar (Gujarati)', 'Prajavani (Kannada)', 'Mathrubhumi (Malayalam)',
          'Amar Ujala (Hindi)', 'Dainik Bhaskar (Hindi)', 'Daily Thanthi (Tamil)'
        ]
      },
      {
        subdomain: 'historical',
        title: 'Historical Gazettes',
        icon: '📜',
        items: [
          'Gazette of India (1864-1947)', 'The Bengal Gazette (1780)', 'Bombay Courier (1790)',
          'Calcutta Gazette (1784)', 'Madras Courier (1785)', 'The Friend of India (1818)',
          'Hicky\'s Bengal Gazette', 'The Spectator (Historical)', 'Asiatic Journal',
          'Colonial Records', 'Pre-Independence Reports', 'Royal Proclamations'
        ]
      },
      {
        subdomain: 'international',
        title: 'International Press',
        icon: '🌍',
        items: [
          'The New York Times', 'The Guardian', 'The Washington Post',
          'Le Monde', 'The Japan Times', 'Al Jazeera',
          'South China Morning Post', 'The Straits Times', 'Der Spiegel',
          'The Moscow Times', 'Le Figaro', 'El País'
        ]
      }
    ]
  }
};

export default CATEGORIES;
