// Fallback static content (real CV data). Used when Supabase env is not configured.
// Everything here is editable live from /admin once Supabase is connected.

export const PROFILE = {
  full_name: 'Ananya Ahmed Tisha',
  tagline: 'Microbiology Researcher, Project Manager & Digital Science Communicator.',
  bio: 'Dedicated 4th-year Microbiology undergraduate at BRAC University (105 credits completed) seeking research and professional opportunities in biomedical science and translational research. Eager to apply strong biological knowledge, particularly in public health microbiology and rigorous data analysis, complemented by hands-on project management experience and innovative science communication skills. Committed to continuous learning, supporting peers, and contributing to impactful clinical research and collaborative academic environments through effective communication, teamwork, and knowledge sharing.',
  email: 'ananyaahmedtisha@gmail.com',
  phone: '+8801749911824',
  linkedin: 'https://linkedin.com/in/ananya-ahmed-tisha',
  university: 'BRAC University',
  degree: 'BSc in Microbiology',
  credits_completed: 105,
  cgpa: 3.83,
  available_for: 'Research internships, translational projects & science communication collabs',
  portrait_url: '/formal.jpeg',
  resume_url: '',
};

export const ACADEMICS = [
  {
    id: 'brac-microbiology',
    level: 'University',
    institution: 'BRAC University, Dhaka, Bangladesh',
    program: 'Bachelor of Science (BSc) in Microbiology',
    period: 'September 2023 — Present',
    result: 'CGPA 3.83/4.00 · 105 credits completed',
    description: 'Core focus on public-health microbiology, food microbiology, sterilization kinetics, AMR and data analysis. Active in research presentations and science editorials.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80',
  },
  {
    id: 'college',
    level: 'College',
    institution: 'College — to be added by admin',
    program: 'Higher Secondary Certificate (HSC), Science',
    period: '—',
    result: '—',
    description: 'Admin can edit this card from /admin → Academics: college name, group, passing year, GPA, notable activities.',
    image_url: '',
  },
  {
    id: 'school',
    level: 'School',
    institution: 'School — to be added by admin',
    program: 'Secondary School Certificate (SSC), Science',
    period: '—',
    result: '—',
    description: 'Admin can edit this card from /admin → Academics: school name, passing year, GPA, early interests.',
    image_url: '',
  },
];

export const EXPERIENCES = [
  { id: 'birdem-intern', role: 'Microbiology Intern', organization: 'BIRDEM General Hospital', category: 'Research', period: '2026', description: 'Clinical microbiology rotation: sample processing, culture observation, sterilization QA and infection-control documentation.', cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80',
    photos: [
      { url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80', caption: 'Culture observation bench — sample processing routine.' },
      { url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80', caption: 'Sterilization QA log — autoclave cycle documentation.' },
    ] },
  { id: 'foodsense-fellow', role: 'Millennium Fellow — Project FoodSense', organization: 'Millennium Fellowship, Class of 2026', category: 'Fellowship', period: '2025 — Present', description: 'Handling and managing the project website at foodsensebd.vercel.app. Leading food-safety storytelling and coordination.', cover: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900&q=80', caption: 'FoodSense field story — fermentation & food safety.' }] },
  { id: 'bsm-38', role: 'Volunteer', organization: '38th Annual Conference of the Bangladesh Society of Microbiologists (BSM)', category: 'Volunteer', period: '2025', description: 'Assisted conference activities and observed national-level microbiology research presentations.', cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80', caption: 'Conference hall — national research presentations.' }] },
  { id: 'buldc-secretary', role: 'Secretary, Marketing & Creative', organization: 'BRAC University Leadership Development Club', category: 'Club', period: '2024 — Present', description: 'Leading creative campaigns, brand visuals and cross-team storytelling.', cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80', caption: 'Creative sprint — campaign planning wall.' }] },
  { id: 'bunsc-hr', role: 'Executive, Human Resources', organization: 'BRAC University Natural Sciences Club', category: 'Club', period: '2024 — Present', description: 'People operations, onboarding and editorial coordination for science outreach.', cover: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80', caption: 'Team onboarding — natural sciences cohort.' }] },
  { id: 'amr-week', role: 'Volunteer — AMR Awareness (AMR Week)', organization: 'Udayan Uchcha Madhyamik Bidyalaya', category: 'Volunteer', period: 'Nov 2024', description: 'Conducted awareness sessions on antimicrobial resistance for school students.', cover: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80', caption: 'Classroom session — AMR awareness with students.' }] },
  { id: 'waste-seminar', role: 'Volunteer — Solid Waste & Sustainability Seminar', organization: 'BRAC University', category: 'Volunteer', period: '2024', description: 'Assisted seminar activities focused on solid waste management and environmental health.', cover: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80', caption: 'Seminar desk — waste-management material.' }] },
];

export const PROJECTS = [
  { id: 'foodsense', title: 'Project FoodSense', subtitle: 'Millennium Fellowship Class of 2026', description: 'Food-safety & fermentation literacy project. Currently handling and managing the project website, content pipeline and outreach.', long: 'Project FoodSense translates food-microbiology into everyday practice: safe fermentation, dairy hygiene, and consumer literacy. My role spans website management (foodsensebd.vercel.app), editorial calendar, and partner outreach. The goal is a replicable campus-to-community model for safer food systems.', link_url: 'https://foodsensebd.vercel.app', link_label: 'foodsensebd.vercel.app', tags: ['Food Microbiology', 'Project Management', 'Web', 'Outreach'], featured: true, cover: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900&q=80', caption: 'FoodSense hero — farm to ferment.' }] },
  { id: '3d-sci-cinema', title: '3D Science Animations — Vertical Cinema', subtitle: 'Creator · 9:16 cinematic series', description: 'Cinematic 3D animated science videos focused on microbiology, cellular processes and environmental restoration. Mobile-first macro-zoom storytelling.', long: 'A vertical-first animation lab: gut microbiome journeys, cellular macro-zooms, and environmental restoration arcs — designed for phones, classrooms and exhibitions. Each episode pairs rigorous references with cinematic pacing.', link_url: '', link_label: 'Watch gallery', tags: ['3D Animation', 'Microbiology', 'SciComm', 'Video'], featured: true, cover: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80', caption: 'Storyboard frame — cellular macro zoom.' }] },
  { id: 'bunsc-editorials', title: 'Science Content Contributor — BUNSC Editorials', subtitle: 'BRAC University Natural Sciences Club', description: 'Authored educational content on the gut microbiome and metabolism for a general audience.', long: 'Long-form explainers that turn metabolism and microbiome papers into plain-language stories with visuals. Focus on accuracy, citations, and classroom reuse.', link_url: '', link_label: 'Editorials', tags: ['Writing', 'Gut Microbiome', 'Metabolism'], featured: false, cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80', caption: 'Draft desk — editorial workflow.' }] },
  { id: 'bracu-express-poem', title: 'Poetry Contributor — BRACU Express', subtitle: 'Student-run news publication', description: "Published an original poem on Bangladesh's July movement, focusing on social awareness and civic reflection.", long: 'An original poem on the July movement — civic reflection through image and rhythm. Part of a broader practice of using art to hold public-health and social moments.', link_url: '', link_label: 'BRACU Express', tags: ['Poetry', 'Civic Reflection'], featured: false, cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80',
    photos: [{ url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80', caption: 'Night desk — poem draft.' }] },
];

export const ACHIEVEMENTS = [
  { id: 'amr-one-health-1st', title: 'AMR Awareness Poster — One-Health', event_name: 'AMR Awareness Poster Competition 2026', organizer: 'IEDCR, WaterAid Bangladesh & Sweden Sverige', award_placement: '1st Place', year: 2026, category: 'Poster', description: 'Scientific poster focused on One-Health — systems view of humans, animals and environment in AMR.', cover: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80', caption: 'Winning poster — One-Health systems map.' }] },
  { id: 'biobangla-10th', title: 'Literature-review poster on AMR & public health', event_name: 'BioBangla International Poster Competition 2025', organizer: 'BioBangla', award_placement: '10th Position (International)', year: 2025, category: 'Poster', description: 'Literature-review-based work addressing antimicrobial resistance and public health.', cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80', caption: 'Poster wall — international showcase.' }] },
  { id: 'nsu-healthfest', title: 'Poster Presentation Segment', event_name: 'North South University Health Fest 2026', organizer: 'NSU Public Health & Science Club', award_placement: 'Second Runner-Up', year: 2026, category: 'Poster', description: 'Poster presentation segment — judging on clarity, evidence and delivery.', cover: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80', caption: 'Presentation moment — poster defense.' }] },
  { id: 'dna-day', title: 'DNA Day Poster Design', event_name: 'DNA Day Poster Design Competition', organizer: 'Biotechnology Society of BRAC University', award_placement: 'Second Runner-Up', year: 2026, category: 'Poster', description: 'Poster design competition — visual storytelling of genetics.', cover: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80', caption: 'Design detail — DNA motif.' }] },
  { id: 'urban-october', title: 'Urban & public-health photography', event_name: 'Urban October Photo Exhibition 2025', organizer: 'BRAC James P Grant School of Public Health', award_placement: 'Selected Photographer', year: 2025, category: 'Photography', description: 'Visual work highlighting urban and public health perspectives.', cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80', caption: 'Street frame — urban health layers.' }] },
  { id: 'aperture-10', title: 'Original digital artwork', event_name: 'Art of Aperture 1.0 — National Digital Art Exhibition', organizer: 'Art & Photography Society, BRAC University', award_placement: 'Selected Artist', year: 2025, category: 'Art', description: 'Selected among nationwide submissions for original digital artwork.', cover: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=80', caption: 'Artwork detail — digital bloom.' }] },
  { id: 'ancholika-champion', title: 'Essay on regional language & culture', event_name: 'Ancholika Intra-University Essay Competition', organizer: 'BRAC University Communication and Language Club', award_placement: 'Champion', year: 2025, category: 'Writing', description: 'Champion for analytical and written expression on regional language and cultural themes.', cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80', photos: [{ url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80', caption: 'Manuscript — essay draft.' }] },
];

export const PORTFOLIO = [
  { id: 'g1', title: 'One-Health AMR — Winning Poster', category: 'Poster', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80', description: '1st place, AMR Awareness Poster Competition 2026.', year: 2026, show_on_home: true },
  { id: 'g2', title: 'Urban Health — Street Frame', category: 'Photography', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80', description: 'Selected Photographer, Urban October 2025.', year: 2025, show_on_home: true },
  { id: 'g3', title: 'Digital Bloom — Aperture 1.0', category: 'Art', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=80', description: 'Selected Artist, Art of Aperture 1.0.', year: 2025, show_on_home: true },
  { id: 'g4', title: 'Lab Bench — Culture Study', category: 'Photography', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80', description: 'Bench study — plates and process.', year: 2025, show_on_home: true },
  { id: 'g5', title: 'Gut Microbiome — Animation Still', category: 'Animation', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80', description: 'Still from vertical 3D series.', year: 2025, show_on_home: true },
  { id: 'g6', title: 'Poster Wall — BioBangla', category: 'Poster', media_type: 'image', media_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80', description: 'International poster showcase.', year: 2025, show_on_home: false },
];

export const BLOG_POSTS = [
  { id: 'gut-microbiome-101', title: 'Gut Microbiome 101 — what I tell non-scientists first', excerpt: 'Metabolism, microbes and everyday food choices — a plain-language starter.', date: '2025-11-02', read_minutes: 6, cover: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80', body: 'Full post is editable from /admin → Blog. Start with why the gut matters, then metabolism basics, then three practical food takeaways linked to FoodSense. Add references at the end.' },
  { id: 'amr-one-health-notes', title: 'One-Health notes from my winning AMR poster', excerpt: 'Humans, animals, environment — one poster, one system.', date: '2026-02-10', read_minutes: 5, cover: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80', body: 'Editable from admin. Walk through the poster logic: drivers of AMR in supply chains, what the visuals encode, and what schools can do next (ties to AMR Week sessions).' },
  { id: 'dairy-fermentation-diary', title: 'Dairy fermentation diary — from vat to lab notebook', excerpt: 'Sterilization kinetics meets taste and safety.', date: '2025-09-14', read_minutes: 7, cover: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80', body: 'Editable from admin. Notes on fermentation variables, QA checkpoints, and how industrial sterilization thinking improves small-batch safety.' },
];

export const SKILLS = {
  Digital: ['Canva', 'MS Word', 'PowerPoint', 'Excel', 'Google Colab', 'Adobe Illustrator', 'OpenCode'],
  Academic: ['Scientific Writing', 'Literature Review', 'Research & Data Analysis', 'Presentation'],
  Soft: ['Communication', 'Leadership', 'Teamwork', 'Public Speaking', 'Time Management', 'Problem Solving'],
  'Research Interest': [
    'Food Microbiology and Dairy Fermentation',
    'Industrial Sterilization Kinetics and Quality Assurance',
    'Public Health Microbiology and Proactive Pathogen Management',
    'Antimicrobial Resistance in Agricultural Supply Chains',
    'Environmental Health and Sustainable Agro-Processing',
  ],
};

export const MARQUEE = ['One-Health', 'AMR Awareness', 'Food Microbiology', '3D Science Animation', 'Public Health', 'Dairy Fermentation', 'SciComm', 'Project FoodSense'];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/academic', label: 'Academic Background' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function getById(list, id) {
  return list.find((x) => x.id === id);
}
