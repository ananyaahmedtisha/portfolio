'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  User, Briefcase, FolderKanban, Image as ImageIcon,
  Award, Tags, Inbox, LogOut, Plus, Trash2, Save, RefreshCw,
  ExternalLink, Pencil, X, Upload, GraduationCap, PenLine, Sparkles,
} from 'lucide-react';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const configured = Boolean(url && anon && !url.includes('your-project'));
const sb = configured ? createClient(url, anon) : null;

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'homepage', label: 'Homepage', icon: Sparkles },
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'experiences', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'portfolio', label: 'Gallery', icon: ImageIcon },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'blog', label: 'Blog', icon: PenLine },
  { id: 'skills', label: 'Skills', icon: Tags },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
];

const inputCls = 'w-full rounded-xl border border-deepsea/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-seafoam focus:ring-2 focus:ring-seafoam/20';
const btnPrimary = 'flex items-center gap-1.5 rounded-xl bg-seafoam px-5 py-2.5 text-xs font-bold text-white transition hover:bg-seafoam-dark';
const btnDark = 'flex items-center gap-1.5 rounded-xl bg-deepsea px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90';
const btnGhost = 'flex items-center gap-1.5 rounded-xl border border-deepsea/15 bg-white px-4 py-2.5 text-xs font-bold transition hover:bg-seafoam-pale';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-deepsea/60">{label}</span>
      {children}
    </label>
  );
}

/* Upload + preview field for images and files.
   Once a file exists it shows preview + Edit; edit mode offers replace + remove. */
function UploadField({ label, value, onChange, bucket = 'portfolio-media', accept = 'image/*', setMsg }) {
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const isPdf = accept.includes('pdf');
  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f || !sb) return;
    setBusy(true);
    try {
      const path = `${Date.now()}-${f.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
      const { error } = await sb.storage.from(bucket).upload(path, f, { upsert: true });
      if (error) throw error;
      const { data } = sb.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
      setEditing(false);
      setMsg('Image uploaded successfully — press Save to apply it.');
    } catch (err) {
      setMsg('Upload failed: ' + err.message);
    }
    setBusy(false);
    e.target.value = '';
  }
  return (
    <div className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-deepsea/60">{label}</span>
      <div className="flex flex-col gap-2 rounded-xl border border-deepsea/10 bg-white p-3">
        {value && !isPdf && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="h-28 w-full rounded-lg object-cover" />
        )}
        {value && isPdf && (
          <a href={value} target="_blank" className="flex items-center gap-1 text-xs font-bold text-seafoam-dark">View uploaded PDF <ExternalLink size={13} /></a>
        )}
        {!value && (
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-deepsea/5 px-3 py-2 text-xs font-bold text-deepsea transition hover:bg-seafoam-pale">
            <Upload size={13} /> {busy ? 'Uploading…' : isPdf ? 'Upload PDF' : 'Upload image'}
            <input type="file" accept={accept} className="hidden" onChange={onFile} disabled={busy} />
          </label>
        )}
        {value && !editing && (
          <button type="button" onClick={() => setEditing(true)} className="flex items-center justify-center gap-2 rounded-lg bg-deepsea/5 px-3 py-2 text-xs font-bold text-deepsea transition hover:bg-seafoam-pale">
            <Pencil size={13} /> Edit
          </button>
        )}
        {value && editing && (
          <>
            <input className={inputCls} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://…" />
            <div className="flex gap-2">
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-deepsea/5 px-3 py-2 text-xs font-bold text-deepsea transition hover:bg-seafoam-pale">
                <Upload size={13} /> {busy ? 'Uploading…' : isPdf ? 'Upload new PDF' : 'Upload new image'}
                <input type="file" accept={accept} className="hidden" onChange={onFile} disabled={busy} />
              </label>
              <button
                type="button"
                onClick={() => { onChange(''); setEditing(false); }}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={13} /> Remove
              </button>
            </div>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg px-3 py-1.5 text-xs font-bold text-deepsea/60 hover:underline">
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CheckField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-deepsea/10 bg-white px-3.5 py-2.5 text-sm font-semibold">
      <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#20B2AA]" />
      {label}
    </label>
  );
}

/* Generic list-first CRUD: rows with Edit, editor opens on selection */
function CrudSection({ items, fields, defaults, labelOf, subOf, onSave, onDelete, setMsg, msg, extraEditor }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  function startEdit(item) {
    setEditingId(item.id);
    setDraft({ ...item });
  }
  function startNew() {
    setEditingId('new');
    setDraft({ ...defaults });
  }
  function cancel() {
    setEditingId(null);
    setDraft(null);
  }
  function set(k, v) {
    setDraft((p) => ({ ...p, [k]: v }));
  }

  async function save() {
    await onSave(draft, editingId === 'new');
    cancel();
  }

  function renderField(f) {
    const v = draft[f.key];
    if (f.type === 'textarea') {
      return <Field key={f.key} label={f.label}><textarea rows={3} className={inputCls} value={v || ''} onChange={(e) => set(f.key, e.target.value)} /></Field>;
    }
    if (f.type === 'select') {
      return (
        <Field key={f.key} label={f.label}>
          <select className={inputCls} value={v || ''} onChange={(e) => set(f.key, e.target.value)}>
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      );
    }
    if (f.type === 'image' || f.type === 'file') {
      return <UploadField key={f.key} label={f.label} value={v} bucket={f.bucket} accept={f.accept} setMsg={setMsg} onChange={(u) => set(f.key, u)} />;
    }
    if (f.type === 'check') {
      return <CheckField key={f.key} label={f.label} value={v} onChange={(u) => set(f.key, u)} />;
    }
    if (f.type === 'number') {
      return <Field key={f.key} label={f.label}><input type="number" className={inputCls} value={v ?? ''} onChange={(e) => set(f.key, e.target.value === '' ? null : Number(e.target.value))} /></Field>;
    }
    return <Field key={f.key} label={f.label}><input className={inputCls} value={v || ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.label} /></Field>;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-extrabold">({items.length})</h2>
        <button onClick={startNew} className={btnDark}><Plus size={14} /> Add new</button>
      </div>

      {!editingId && (
        <div className="grid gap-3">
          {items.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-deepsea/60">No entries.</div>}
          {items.map((r) => (
            <div key={r.id} className="glass flex items-center gap-3 rounded-2xl p-4">
              {renderThumb(r)}
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{labelOf(r)}</p>
                {subOf && <p className="truncate text-xs text-deepsea/55">{subOf(r)}</p>}
              </div>
              <button onClick={() => startEdit(r)} className={btnGhost}><Pencil size={13} /> Edit</button>
              <button onClick={() => onDelete(r.id)} className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      )}

      {editingId && draft && (
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-extrabold">{editingId === 'new' ? 'Add new' : 'Edit'}</h3>
            <button onClick={cancel} className="rounded-lg border p-2"><X size={15} /></button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(renderField)}
          </div>
          {extraEditor && <div className="mt-4">{extraEditor(draft, set)}</div>}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button onClick={save} className={btnPrimary}><Save size={14} /> Save</button>
            <button onClick={cancel} className={btnGhost}>Cancel</button>
            {msg && <span className={`text-sm font-semibold ${msg.includes('failed') || msg.includes('Upload failed') || msg.includes('Load error') ? 'text-red-600' : 'text-seafoam-dark'}`}>{msg}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function renderThumb(r) {
  const src = r.thumbnail_url || r.image_url || r.cover_url || r.media_url || r.thumbnailUrl;
  if (!src) return <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-seafoam-pale font-display text-sm font-extrabold text-seafoam-dark">{(r.title || r.role || r.label || '?').charAt(0)}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />;
}

const TABLES = {
  academics: {
    fields: [
      { key: 'level', label: 'Level', type: 'select', options: ['University', 'College', 'School', 'Other'] },
      { key: 'institution', label: 'Institution' },
      { key: 'program', label: 'Program' },
      { key: 'period', label: 'Period' },
      { key: 'result', label: 'Result' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image_url', label: 'Photo', type: 'image', bucket: 'portfolio-media' },
    ],
    defaults: { level: 'University', institution: '', program: '', period: '', result: '', description: '', sort_order: 0 },
    labelOf: (r) => r.institution || 'Untitled',
    subOf: (r) => `${r.level || ''} · ${r.program || ''}`,
  },
  experiences: {
    fields: [
      { key: 'role', label: 'Role' },
      { key: 'organization', label: 'Organization' },
      { key: 'category', label: 'Category', type: 'select', options: ['Research', 'Leadership', 'Volunteer', 'Fellowship', 'Club'] },
      { key: 'location', label: 'Location' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
    defaults: { role: '', organization: '', category: 'Research', location: '', description: '', sort_order: 0 },
    labelOf: (r) => r.role || 'Untitled',
    subOf: (r) => r.organization || '',
  },
  projects: {
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'link_url', label: 'Link URL' },
      { key: 'link_label', label: 'Link label' },
      { key: 'tags_text', label: 'Tags (comma separated)', type: 'text' },
      { key: 'thumbnail_url', label: 'Cover image', type: 'image', bucket: 'portfolio-media' },
      { key: 'featured', label: 'Featured', type: 'check' },
    ],
    defaults: { title: '', subtitle: '', description: '', link_url: '', link_label: '', thumbnail_url: '', featured: false, sort_order: 0 },
    labelOf: (r) => r.title || 'Untitled',
    subOf: (r) => r.subtitle || '',
  },
  portfolio_items: {
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category', type: 'select', options: ['Animation', 'Poster', 'Art', 'Photography'] },
      { key: 'media_type', label: 'Media type', type: 'select', options: ['image', 'video'] },
      { key: 'media_url', label: 'Media file', type: 'image', bucket: 'portfolio-media', accept: 'image/*,video/*' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'show_on_home', label: 'Show on home', type: 'check' },
      { key: 'featured', label: 'Featured', type: 'check' },
    ],
    defaults: { title: '', category: 'Photography', media_type: 'image', media_url: '', description: '', year: new Date().getFullYear(), show_on_home: false, featured: false, sort_order: 0 },
    labelOf: (r) => r.title || 'Untitled',
    subOf: (r) => `${r.category || ''} · ${r.media_type || ''}`,
  },
  achievements: {
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'event_name', label: 'Event' },
      { key: 'organizer', label: 'Organizer' },
      { key: 'award_placement', label: 'Placement' },
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'category', label: 'Category', type: 'select', options: ['Poster', 'Art', 'Photography', 'Writing', 'Other'] },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'thumbnail_url', label: 'Photo', type: 'image', bucket: 'portfolio-media' },
    ],
    defaults: { title: '', event_name: '', organizer: '', award_placement: '', year: new Date().getFullYear(), category: 'Poster', description: '', sort_order: 0 },
    labelOf: (r) => r.title || 'Untitled',
    subOf: (r) => `${r.event_name || ''} · ${r.award_placement || ''}`,
  },
  blog_posts: {
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'cover_url', label: 'Cover image', type: 'image', bucket: 'portfolio-media' },
      { key: 'read_minutes', label: 'Read minutes', type: 'number' },
      { key: 'published', label: 'Published', type: 'check' },
    ],
    defaults: { title: '', slug: '', excerpt: '', body: '', cover_url: '', read_minutes: 5, published: true },
    labelOf: (r) => r.title || 'Untitled',
    subOf: (r) => r.slug || '',
  },
  skills: {
    fields: [
      { key: 'label', label: 'Skill' },
      { key: 'group_name', label: 'Group', type: 'select', options: ['Digital', 'Academic', 'Soft', 'Research Interest'] },
    ],
    defaults: { label: '', group_name: 'Digital', sort_order: 0 },
    labelOf: (r) => r.label || 'Untitled',
    subOf: (r) => r.group_name || '',
  },
};

export default function Admin() {
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [tab, setTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [rows, setRows] = useState({ experiences: [], experience_photos: [], projects: [], portfolio_items: [], achievements: [], skills: [], messages: [], profile: null, academics: [], blog_posts: [] });
  const [profileForm, setProfileForm] = useState(null);
  const [topicsText, setTopicsText] = useState('');
  const [heroFields, setHeroFields] = useState({ status_pill: '', role_line_1: '', role_line_2: '' });

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadAll() {
    if (!sb) return;
    setLoading(true);
    try {
      const [exp, expPhotos, proj, port, ach, ski, inbox, prof, acad, blogs, settings] = await Promise.all([
        sb.from('experiences').select('*').order('sort_order'),
        sb.from('experience_photos').select('*').order('sort_order'),
        sb.from('projects').select('*').order('sort_order'),
        sb.from('portfolio_items').select('*').order('sort_order'),
        sb.from('achievements').select('*').order('sort_order'),
        sb.from('skills').select('*').order('sort_order'),
        sb.from('messages').select('*').order('created_at', { ascending: false }),
        sb.from('profile').select('*').limit(1).single(),
        sb.from('academics').select('*').order('sort_order'),
        sb.from('blog_posts').select('*').order('created_at', { ascending: false }),
        sb.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      ]);
      const withTags = (proj.data || []).map((p) => ({ ...p, tags_text: (p.tags || []).join(', ') }));
      setRows({
        experiences: exp.data || [],
        experience_photos: expPhotos.data || [],
        projects: withTags,
        portfolio_items: port.data || [],
        achievements: ach.data || [],
        skills: ski.data || [],
        messages: inbox.data || [],
        profile: prof.data || null,
        academics: acad.data || [],
        blog_posts: blogs.data || [],
      });
      if (prof.data) setProfileForm(prof.data);
      if (settings.data?.exploring_topics) setTopicsText(settings.data.exploring_topics.join('\n'));
      if (settings.data) {
        setHeroFields({
          status_pill: settings.data.status_pill || '',
          role_line_1: settings.data.role_line_1 || '',
          role_line_2: settings.data.role_line_2 || '',
        });
      }
    } catch (e) {
      setMsg('Load error: ' + e.message);
    }
    setLoading(false);
  }

  useEffect(() => { if (session) loadAll(); }, [session]);

  async function doLogin(e) {
    e.preventDefault();
    setMsg('');
    if (!sb) return;
    const { error } = await sb.auth.signInWithPassword(login);
    if (error) setMsg('Login failed: ' + error.message);
  }

  function clean(table, row) {
    const { id, created_at, tags_text, ...rest } = row;
    if (table === 'projects') {
      rest.tags = (tags_text || '').split(',').map((t) => t.trim()).filter(Boolean);
    }
    return rest;
  }

  async function handleSave(table, draft, isNew) {
    const payload = clean(table, draft);
    let error;
    if (isNew) {
      const res = await sb.from(table).insert([payload]).select().single();
      error = res.error;
    } else {
      const res = await sb.from(table).update(payload).eq('id', draft.id);
      error = res.error;
    }
    setMsg(error ? 'Save failed: ' + error.message : 'Saved successfully.');
    if (!error) loadAll();
  }

  async function handleDelete(table, id) {
    if (!confirm('Delete this entry?')) return;
    const { error } = await sb.from(table).delete().eq('id', id);
    setMsg(error ? 'Delete failed: ' + error.message : 'Deleted.');
    if (!error) loadAll();
  }

  async function saveProfile(e) {
    e.preventDefault();
    setLoading(true);
    const { id, created_at, ...rest } = profileForm;
    const { error } = await sb.from('profile').update({ ...rest, updated_at: new Date().toISOString() }).eq('id', id);
    setMsg(error ? 'Save failed: ' + error.message : 'Saved successfully.');
    setLoading(false);
    if (!error) loadAll();
  }

  async function saveTopics(e) {
    e.preventDefault();
    const list = topicsText.split('\n').map((t) => t.trim()).filter(Boolean);
    const { error } = await sb.from('site_settings').update({
      exploring_topics: list,
      status_pill: heroFields.status_pill || null,
      role_line_1: heroFields.role_line_1 || null,
      role_line_2: heroFields.role_line_2 || null,
    }).eq('id', 1);
    setMsg(error ? 'Save failed: ' + error.message : 'Saved successfully.');
  }

  /* Experience photos sub-editor */
  function ExperiencePhotos({ experienceId }) {
    const [caption, setCaption] = useState('');
    const [fileBusy, setFileBusy] = useState(false);
    const photos = rows.experience_photos.filter((p) => p.experience_id === experienceId);
    async function addPhoto(e) {
      const f = e.target.files?.[0];
      if (!f) return;
      setFileBusy(true);
      try {
        const path = `${Date.now()}-${f.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
        const { error } = await sb.storage.from('portfolio-media').upload(path, f, { upsert: true });
        if (error) throw error;
        const { data } = sb.storage.from('portfolio-media').getPublicUrl(path);
        const { error: dbErr } = await sb.from('experience_photos').insert([{ experience_id: experienceId, image_url: data.publicUrl, caption, sort_order: photos.length }]);
        if (dbErr) throw dbErr;
        setCaption('');
        setMsg('Photo added successfully.');
        loadAll();
      } catch (err) {
        setMsg('Photo upload failed: ' + err.message);
      }
      setFileBusy(false);
    }
    async function delPhoto(id) {
      if (!confirm('Remove this photo?')) return;
      await sb.from('experience_photos').delete().eq('id', id);
      loadAll();
    }
    if (!experienceId) return <p className="text-xs text-deepsea/50">Save the experience first, then add photos.</p>;
    return (
      <div className="rounded-xl bg-deepsea/[0.03] p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-deepsea/60">Photos ({photos.length})</p>
        <div className="grid gap-2">
          {photos.map((p) => (
            <div key={p.id} className="flex items-center gap-2 rounded-lg bg-white p-2">
              {/* eslint-disable-next-line @next notch/no-img-element */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt="" className="h-11 w-11 rounded-lg object-cover" />
              <span className="flex-1 truncate text-xs text-deepsea/70">{p.caption || 'No caption'}</span>
              <button onClick={() => delPhoto(p.id)} className="rounded-lg border border-red-200 p-1.5 text-red-600"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input className={inputCls} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Photo caption" />
          <label className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-deepsea px-4 py-2.5 text-xs font-bold text-white">
            <Upload size={13} /> {fileBusy ? 'Uploading…' : 'Add photo'}
            <input type="file" accept="image/*" className="hidden" onChange={addPhoto} disabled={fileBusy} />
          </label>
        </div>
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-alice p-4">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <h1 className="font-display text-xl font-extrabold">CMS unavailable</h1>
          <p className="mt-2 text-sm text-deepsea/60">Supabase environment variables are missing.</p>
          <a href="/" className="mt-4 inline-block rounded-xl bg-deepsea px-5 py-2.5 text-sm font-bold text-white">Back</a>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-alice p-4">
        <form onSubmit={doLogin} className="glass w-full max-w-md rounded-3xl p-8 shadow-blue-soft">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam-dark">Restricted</p>
          <h1 className="font-display mt-2 text-2xl font-extrabold">Sign in</h1>
          <div className="mt-5 grid gap-3">
            <input className={inputCls} placeholder="Email" type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            <input className={inputCls} placeholder="Password" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            <button className="rounded-xl bg-deepsea py-3 font-bold text-white hover:bg-seafoam-dark">Sign in</button>
            {msg && <p className="text-sm font-semibold text-red-600">{msg}</p>}
          </div>
        </form>
      </div>
    );
  }

  const unread = rows.messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-alice">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-deepsea font-bold text-white">A</span>
            <p className="font-display text-sm font-extrabold">Studio</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadAll} className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold hover:bg-seafoam-pale"><RefreshCw size={14} /> {loading ? 'Loading…' : 'Refresh'}</button>
            <a href="/" target="_blank" className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold hover:bg-seafoam-pale"><ExternalLink size={14} /> Site</a>
            <button onClick={() => sb.auth.signOut()} className="flex items-center gap-1.5 rounded-xl bg-deepsea px-3 py-2 text-xs font-bold text-white"><LogOut size={14} /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="glass h-fit rounded-2xl p-3 lg:sticky lg:top-20">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${tab === t.id ? 'bg-deepsea text-white' : 'text-deepsea/70 hover:bg-seafoam-pale'}`}>
              <t.icon size={16} /> {t.label}
              {t.id === 'inbox' && unread > 0 && (
                <span className="ml-auto rounded-full bg-seafoam px-2 py-0.5 text-[11px] text-white">{unread}</span>
              )}
            </button>
          ))}
        </aside>

        <main className="min-w-0">
          {tab === 'profile' && profileForm && (
            <form onSubmit={saveProfile} className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-extrabold">Profile</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Full name"><input className={inputCls} value={profileForm.full_name || ''} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} /></Field>
                <Field label="Tagline"><input className={inputCls} value={profileForm.tagline || ''} onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })} /></Field>
              </div>
              <div className="mt-4"><Field label="Bio"><textarea rows={4} className={inputCls} value={profileForm.bio || ''} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} /></Field></div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Field label="Email"><input className={inputCls} value={profileForm.email || ''} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} /></Field>
                <Field label="Phone"><input className={inputCls} value={profileForm.phone || ''} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} /></Field>
                <Field label="LinkedIn"><input className={inputCls} value={profileForm.linkedin || ''} onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })} /></Field>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="University"><input className={inputCls} value={profileForm.university || ''} onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })} /></Field>
                <Field label="Degree"><input className={inputCls} value={profileForm.degree || ''} onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })} /></Field>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <UploadField label="Portrait photo" value={profileForm.portrait_url} bucket="portfolio-media" setMsg={setMsg} onChange={(u) => setProfileForm({ ...profileForm, portrait_url: u })} />
                <UploadField label="Resume (PDF)" value={profileForm.resume_url} bucket="resumes" accept=".pdf" setMsg={setMsg} onChange={(u) => setProfileForm({ ...profileForm, resume_url: u })} />
              </div>
              <button className="mt-5 flex items-center gap-2 rounded-xl bg-seafoam px-6 py-3 font-bold text-white hover:bg-seafoam-dark"><Save size={16} /> Save</button>
              {msg && <p className={`mt-2 text-sm font-semibold ${msg.includes('failed') ? 'text-red-600' : 'text-seafoam-dark'}`}>{msg}</p>}
            </form>
          )}

          {tab !== 'profile' && tab !== 'homepage' && tab !== 'inbox' && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-display mb-4 text-lg font-extrabold">{TABS.find((t) => t.id === tab)?.label}</h2>
              <CrudSection
                items={rows[tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab] || []}
                fields={TABLES[tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab].fields}
                defaults={TABLES[tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab].defaults}
                labelOf={TABLES[tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab].labelOf}
                subOf={TABLES[tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab].subOf}
                setMsg={setMsg}
                msg={msg}
                onSave={(d, isNew) => handleSave(tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab, d, isNew)}
                onDelete={(id) => handleDelete(tab === 'portfolio' ? 'portfolio_items' : tab === 'blog' ? 'blog_posts' : tab, id)}
                extraEditor={tab === 'experiences' ? (draft, set) => <ExperiencePhotos experienceId={draft.id} /> : null}
              />
            </div>
          )}

          {tab === 'homepage' && (
            <form onSubmit={saveTopics} className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-extrabold">Exploring topics</h2>
              <p className="mt-1 text-sm text-deepsea/60">One topic per line — these rotate after “Exploring:” on the homepage.</p>
              <div className="mt-4 grid gap-4">
                <Field label="Status pill">
                  <input className={inputCls} value={heroFields.status_pill} onChange={(e) => setHeroFields({ ...heroFields, status_pill: e.target.value })} placeholder="Open to Opportunities · Dhaka, Bangladesh" />
                </Field>
                <Field label="Role line 1">
                  <input className={inputCls} value={heroFields.role_line_1} onChange={(e) => setHeroFields({ ...heroFields, role_line_1: e.target.value })} placeholder="BSc in Microbiology · BRAC University" />
                </Field>
                <Field label="Role line 2">
                  <input className={inputCls} value={heroFields.role_line_2} onChange={(e) => setHeroFields({ ...heroFields, role_line_2: e.target.value })} placeholder="Millennium Fellow · Project Manager & Science Communicator" />
                </Field>
                <Field label="Topics">
                  <textarea rows={6} className={inputCls} value={topicsText} onChange={(e) => setTopicsText(e.target.value)} placeholder={'Food Microbiology\nAMR Awareness'} />
                </Field>
              </div>
              <button className="mt-4 flex items-center gap-2 rounded-xl bg-seafoam px-6 py-3 font-bold text-white hover:bg-seafoam-dark"><Save size={16} /> Save</button>
              {msg && <p className={`mt-2 text-sm font-semibold ${msg.includes('failed') ? 'text-red-600' : 'text-seafoam-dark'}`}>{msg}</p>}
            </form>
          )}

          {tab === 'inbox' && (
            <div className="grid gap-3">
              {msg && <p className="text-sm font-semibold text-deepsea/70">{msg}</p>}
              {rows.messages.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-deepsea/60">No messages.</div>}
              {rows.messages.map((m) => (
                <div key={m.id} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold">{m.name} <span className="ml-2 text-xs font-medium text-deepsea/50">{m.email}</span></p>
                    <div className="flex gap-2">
                      {!m.is_read && <button onClick={async () => { await sb.from('messages').update({ is_read: true }).eq('id', m.id); loadAll(); }} className="rounded-lg bg-seafoam-pale px-3 py-1.5 text-xs font-bold">Mark read</button>}
                      <button onClick={() => handleDelete('messages', m.id)} className="rounded-lg border p-1.5 text-red-600"><Trash2 size={13} /></button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-seafoam-dark">{m.subject}</p>
                  <p className="mt-1 text-sm text-deepsea/70">{m.body}</p>
                  <p className="mt-2 text-xs text-deepsea/40">{new Date(m.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
