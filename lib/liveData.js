import { getServerClient } from './supabaseServer';
import {
  PROFILE as FB_PROFILE,
  ACADEMICS as FB_ACADEMICS,
  EXPERIENCES as FB_EXPERIENCES,
  PROJECTS as FB_PROJECTS,
  PORTFOLIO as FB_PORTFOLIO,
  ACHIEVEMENTS as FB_ACHIEVEMENTS,
  BLOG_POSTS as FB_BLOGS,
  SKILLS as FB_SKILLS,
} from './siteData';

function periodOf(e) {
  const y = (d) => (d ? String(d).slice(0, 4) : '');
  const s = y(e.start_date);
  const en = e.is_current ? 'Present' : y(e.end_date);
  if (s && en) return `${s} — ${en}`;
  if (s) return en && en !== s ? `${s} — ${en}` : s;
  return en || '';
}

export async function getProfile() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_PROFILE;
    const { data, error } = await sb.from('profile').select('*').order('created_at').limit(1).maybeSingle();
    if (error || !data) return FB_PROFILE;
    return {
      full_name: data.full_name || FB_PROFILE.full_name,
      tagline: data.tagline || FB_PROFILE.tagline,
      bio: data.bio || FB_PROFILE.bio,
      email: data.email || FB_PROFILE.email,
      phone: data.phone || FB_PROFILE.phone,
      linkedin: data.linkedin || FB_PROFILE.linkedin,
      university: data.university || FB_PROFILE.university,
      degree: data.degree || FB_PROFILE.degree,
      credits_completed: data.credits_completed ?? FB_PROFILE.credits_completed,
      cgpa: data.cgpa ?? FB_PROFILE.cgpa,
      available_for: data.available_for || FB_PROFILE.available_for,
      portrait_url: data.portrait_url || data.hero_image_url || FB_PROFILE.portrait_url,
      resume_url: data.resume_url || '',
    };
  } catch {
    return FB_PROFILE;
  }
}

export async function getAcademics() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_ACADEMICS;
    const { data, error } = await sb.from('academics').select('*').order('sort_order');
    if (error || !data || data.length === 0) return FB_ACADEMICS;
    return data.map((a) => ({
      id: a.id, level: a.level, institution: a.institution, program: a.program,
      period: a.period, result: a.result, description: a.description, image_url: a.image_url,
    }));
  } catch {
    return FB_ACADEMICS;
  }
}

export async function getExperiences() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_EXPERIENCES;
    const [{ data: exps }, { data: photos }] = await Promise.all([
      sb.from('experiences').select('*').order('sort_order'),
      sb.from('experience_photos').select('*').order('sort_order'),
    ]);
    if (!exps || exps.length === 0) return FB_EXPERIENCES;
    const byExp = {};
    (photos || []).forEach((p) => {
      (byExp[p.experience_id] = byExp[p.experience_id] || []).push({ url: p.image_url, caption: p.caption || '' });
    });
    return exps.map((e) => {
      const ph = byExp[e.id] || [];
      return {
        id: e.id, role: e.role, organization: e.organization, category: e.category,
        period: periodOf(e) || undefined, description: e.description,
        cover: ph[0]?.url || null, photos: ph,
      };
    });
  } catch {
    return FB_EXPERIENCES;
  }
}

export async function getProjects() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_PROJECTS;
    const { data, error } = await sb.from('projects').select('*').order('sort_order');
    if (error || !data || data.length === 0) return FB_PROJECTS;
    return data.map((p) => ({
      id: p.id, title: p.title, subtitle: p.subtitle, description: p.description,
      long: p.description, link_url: p.link_url, link_label: p.link_label,
      tags: p.tags || [], featured: p.featured, cover: p.thumbnail_url || null,
      photos: p.thumbnail_url ? [{ url: p.thumbnail_url, caption: p.title }] : [],
    }));
  } catch {
    return FB_PROJECTS;
  }
}

export async function getPortfolio() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_PORTFOLIO;
    const { data, error } = await sb.from('portfolio_items').select('*').order('sort_order');
    if (error || !data || data.length === 0) return FB_PORTFOLIO;
    return data.map((p) => ({
      id: p.id, title: p.title, category: p.category, media_type: p.media_type,
      media_url: p.media_url, description: p.description, year: p.year,
      show_on_home: p.show_on_home !== false, featured: p.featured,
    }));
  } catch {
    return FB_PORTFOLIO;
  }
}

export async function getAchievements() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_ACHIEVEMENTS;
    const { data, error } = await sb.from('achievements').select('*').order('sort_order');
    if (error || !data || data.length === 0) return FB_ACHIEVEMENTS;
    return data.map((a) => ({
      id: a.id, title: a.title, event_name: a.event_name, organizer: a.organizer,
      award_placement: a.award_placement, year: a.year, category: a.category,
      description: a.description, cover: a.thumbnail_url || null,
      photos: a.thumbnail_url ? [{ url: a.thumbnail_url, caption: a.title }] : [],
    }));
  } catch {
    return FB_ACHIEVEMENTS;
  }
}

export async function getBlogPosts() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_BLOGS;
    const { data, error } = await sb.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return FB_BLOGS;
    const visible = data.filter((b) => b.published !== false);
    if (visible.length === 0) return FB_BLOGS;
    return visible.map((b) => ({
      id: b.slug || b.id,
      title: b.title, excerpt: b.excerpt,
      date: b.published_at ? String(b.published_at).slice(0, 10) : '',
      read_minutes: b.read_minutes || 5,
      cover: b.cover_url || '',
      body: b.body || '',
    }));
  } catch {
    return FB_BLOGS;
  }
}

export async function getBlogById(id) {
  const posts = await getBlogPosts();
  return posts.find((b) => b.id === id) || null;
}

export async function getSkills() {
  try {
    const sb = getServerClient();
    if (!sb) return FB_SKILLS;
    const { data, error } = await sb.from('skills').select('*').order('sort_order');
    if (error || !data || data.length === 0) return FB_SKILLS;
    const grouped = {};
    data.forEach((s) => {
      (grouped[s.group_name] = grouped[s.group_name] || []).push(s.label);
    });
    return Object.keys(grouped).length ? grouped : FB_SKILLS;
  } catch {
    return FB_SKILLS;
  }
}
