-- Seed with real CV data. Run after schema.sql.
insert into profile (full_name, tagline, bio, email, phone, linkedin, university, degree, credits_completed, cgpa, available_for)
values (
'Ananya Ahmed Tisha',
'Microbiology Researcher, Project Manager & Digital Science Communicator.',
'Dedicated 4th-year Microbiology undergraduate at BRAC University (105 credits completed) seeking research and professional opportunities in biomedical science and translational research. Eager to apply strong biological knowledge, particularly in public health microbiology and rigorous data analysis, complemented by hands-on project management experience and innovative science communication skills. Committed to continuous learning, supporting peers, and contributing to impactful clinical research and collaborative academic environments through effective communication, teamwork, and knowledge sharing.',
'ananyaahmedtisha@gmail.com',
'+8801749911824',
'https://linkedin.com/in/ananya-ahmed-tisha',
'BRAC University',
'BSc in Microbiology',
105, 3.83,
'Research internships, translational projects & science communication collabs'
) on conflict do nothing;

insert into site_settings (id) values (1) on conflict (id) do nothing;

insert into experiences (role, organization, category, start_date, end_date, is_current, location, description, sort_order) values
('Microbiology Intern','BIRDEM General Hospital','Research','2026-01-01',null,true,'Dhaka, Bangladesh','Clinical microbiology rotation: sample processing, culture observation, sterilization QA and infection-control documentation.',0),
('Millennium Fellow — Project FoodSense','Millennium Fellowship, Class of 2026','Fellowship','2025-08-01',null,true,'Remote','Handling and managing the project website at foodsensebd.vercel.app. Leading food-safety storytelling and project coordination.',1),
('Volunteer','38th Annual Conference of the Bangladesh Society of Microbiologists (BSM)','Volunteer','2025-01-01','2025-12-31',false,'Dhaka','Assisted conference activities and observed national-level microbiology research presentations.',2),
('Secretary, Marketing & Creative Department','BRAC University Leadership Development Club','Club','2024-01-01',null,true,'BRAC University','Leading creative campaigns, brand visuals and cross-team storytelling for leadership programs.',3),
('Executive, Human Resources Department','BRAC University Natural Sciences Club','Club','2024-01-01',null,true,'BRAC University','People operations, onboarding and editorial coordination for science outreach.',4),
('Volunteer — AMR Awareness Program (AMR Week)','Udayan Uchcha Madhyamik Bidyalaya','Volunteer','2024-11-01','2024-11-30',false,'Dhaka','Conducted awareness sessions on antimicrobial resistance for school students.',5),
('Volunteer — Solid Waste Management & Environmental Sustainability Seminar','BRAC University','Volunteer','2024-01-01','2024-12-31',false,'Dhaka','Assisted seminar activities focused on solid waste management and environmental health.',6);

insert into projects (title, subtitle, description, link_url, link_label, tags, featured, sort_order) values
('Project FoodSense','Millennium Fellowship Class of 2026','Food-safety & fermentation literacy project. Currently handling and managing the project website, content pipeline and outreach.','https://foodsensebd.vercel.app','foodsensebd.vercel.app','{Food Microbiology, Project Management, Web, Outreach}',true,0),
('3D Science Animations — Vertical Cinema','Creator · 9:16 cinematic series','Cinematic 3D animated science videos focused on microbiology, cellular processes and environmental restoration. Built for mobile-first viewing with macro-zoom storytelling.','', 'Watch gallery below','{3D Animation, Microbiology, SciComm, Video}',true,1),
('Science Content Contributor — BUNSC Editorials','BRAC University Natural Sciences Club','Authored educational content on the gut microbiome and metabolism for a general audience.','', 'Editorials','{Writing, Gut Microbiome, Metabolism}',false,2),
('Poetry Contributor — BRACU Express','Student-run news publication','Published an original poem on Bangladesh''s July movement, focusing on social awareness and civic reflection.','', 'BRACU Express','{Poetry, Civic Reflection}',false,3);

insert into achievements (title, event_name, organizer, award_placement, year, category, description) values
('AMR Awareness Poster — One-Health','AMR Awareness Poster Competition 2026','IEDCR, WaterAid Bangladesh & Sweden Sverige','1st Place',2026,'Poster','Scientific poster focused on One-Health. 1st place.'),
('Literature-review poster on AMR & public health','BioBangla International Poster Competition 2025','BioBangla','10th Position (International)',2025,'Poster','10th position in an international poster competition.'),
('Poster Presentation Segment','North South University Health Fest 2026','NSU Public Health & Science Club','Second Runner-Up',2026,'Poster','Poster presentation segment.'),
('DNA Day Poster Design','DNA Day Poster Design Competition','Biotechnology Society of BRAC University','Second Runner-Up',2026,'Poster','Poster design competition.'),
('Urban & public-health photography','Urban October Photo Exhibition 2025','BRAC James P Grant School of Public Health','Selected Photographer',2025,'Photography','Visual work highlighting urban and public health perspectives.'),
('Original digital artwork','Art of Aperture 1.0 — National Digital Art Exhibition','Art & Photography Society, BRAC University','Selected Artist',2025,'Art','Selected among nationwide submissions.'),
('Essay on regional language & culture','Ancholika Intra-University Essay Competition','BRAC University Communication and Language Club','Champion',2025,'Writing','Champion for analytical and written expression.');

insert into portfolio_items (title, category, media_type, media_url, description, year, featured, sort_order) values
('One-Health AMR — Winning Poster','Poster','image','https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80','1st place, AMR Awareness Poster Competition 2026. Replace with Supabase Storage URL from admin.',2026,true,0),
('Gut Microbiome — 3D Animation Still','Animation','video','','Vertical 9:16 cinematic 3D animation. Upload MP4 to Supabase Storage via Admin → Portfolio.',2025,true,1),
('Cellular Process — Macro Zoom','Animation','video','','Cellular processes series. Upload vertical video from admin.',2025,false,2),
('Environmental Restoration Reel','Animation','video','','Environmental restoration series.',2025,false,3),
('Urban Health — Street Frame','Photography','image','https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80','Selected Photographer, Urban October 2025. Swap with real photo in admin.',2025,true,4),
('Digital Bloom — Aperture 1.0','Art','image','https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=900&q=80','Selected Artist, Art of Aperture 1.0. Replace with original artwork.',2025,true,5);

insert into skills (label, group_name, level, sort_order) values
('Canva','Digital',5,0),('MS Word','Digital',5,1),('PowerPoint','Digital',5,2),('Excel','Digital',4,3),
('Google Colab','Digital',4,4),('Adobe Illustrator','Digital',4,5),('OpenCode','Digital',3,6),
('Scientific Writing','Academic',5,10),('Literature Review','Academic',5,11),('Research & Data Analysis','Academic',5,12),('Presentation','Academic',5,13),
('Communication','Soft',5,20),('Leadership','Soft',5,21),('Teamwork','Soft',5,22),('Public Speaking','Soft',4,23),('Time Management','Soft',5,24),('Problem Solving','Soft',5,25),
('Food Microbiology and Dairy Fermentation','Research Interest',5,30),
('Industrial Sterilization Kinetics and Quality Assurance','Research Interest',4,31),
('Public Health Microbiology and Proactive Pathogen Management','Research Interest',5,32),
('Antimicrobial Resistance in Agricultural Supply Chains','Research Interest',5,33),
('Environmental Health and Sustainable Agro-Processing','Research Interest',4,34);
