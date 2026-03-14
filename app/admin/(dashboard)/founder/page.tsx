'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Save,
  Upload,
  Loader2,
  CheckCircle,
  Plus,
  X,
  User,
  Linkedin,
} from 'lucide-react';

interface FormState {
  name: string;
  role: string;
  bio: string;
  experience: string;
  linkedin_url: string;
  profile_image_url: string;
  specialization: string[];
}

export default function FounderAdminPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    role: '',
    bio: '',
    experience: '',
    linkedin_url: '',
    profile_image_url: '',
    specialization: [],
  });
  const [newSpec, setNewSpec] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/founder')
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name ?? '',
          role: data.role ?? '',
          bio: data.bio ?? '',
          experience: data.experience ?? '',
          linkedin_url: data.linkedin_url ?? '',
          profile_image_url: data.profile_image_url ?? '',
          specialization: Array.isArray(data.specialization) ? data.specialization : [],
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/founder/upload', { method: 'POST', body: fd });
    const json = await res.json();

    if (json.url) {
      setForm((f) => ({ ...f, profile_image_url: json.url }));
    } else {
      setError(json.error ?? 'Upload failed');
    }
    setUploading(false);
    // Reset so same file can be re-uploaded
    e.target.value = '';
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    const res = await fetch('/api/founder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(json.error ?? 'Save failed');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function addSpec() {
    const v = newSpec.trim();
    if (!v) return;
    setForm((f) => ({ ...f, specialization: [...f.specialization, v] }));
    setNewSpec('');
  }

  function removeSpec(i: number) {
    setForm((f) => ({
      ...f,
      specialization: f.specialization.filter((_, idx) => idx !== i),
    }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="h2 italic mb-2">
          Founder <span className="text-primary">Profile</span>
        </h1>
        <p className="text-text-muted text-sm font-black uppercase tracking-widest">
          Edit your public profile visible to visitors
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Profile Picture */}
      <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-text-subtle">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 overflow-hidden flex items-center justify-center flex-shrink-0">
            {form.profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.profile_image_url}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-primary" size={36} />
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-xl text-sm font-bold text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? 'Uploading…' : 'Upload Photo'}
            </button>
            <p className="text-xs text-text-subtle">
              JPG, PNG or WebP — max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-text-subtle">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls}
              placeholder="Bilal Nazam"
            />
          </Field>
          <Field label="Role / Title">
            <input
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className={inputCls}
              placeholder="Founder & Migration Specialist"
            />
          </Field>
          <Field label="Years of Experience">
            <input
              value={form.experience}
              onChange={(e) =>
                setForm((f) => ({ ...f, experience: e.target.value }))
              }
              className={inputCls}
              placeholder="4+ years"
            />
          </Field>
          <Field label="LinkedIn URL">
            <div className="flex items-center gap-2">
              <Linkedin size={14} className="text-text-subtle flex-shrink-0" />
              <input
                value={form.linkedin_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, linkedin_url: e.target.value }))
                }
                className={inputCls}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </Field>
        </div>

        <Field label="Bio">
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            rows={6}
            className={`${inputCls} resize-none`}
            placeholder="Write your bio here…"
          />
        </Field>
      </div>

      {/* Specializations */}
      <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-text-subtle">
          Specializations
        </h3>

        <div className="flex flex-wrap gap-2 min-h-10">
          {form.specialization.map((spec, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm px-3 py-1.5 rounded-full"
            >
              {spec}
              <button
                onClick={() => removeSpec(i)}
                className="hover:text-red-400 transition-colors"
                aria-label={`Remove ${spec}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {form.specialization.length === 0 && (
            <p className="text-text-subtle text-sm italic">
              No specializations added yet
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <input
            value={newSpec}
            onChange={(e) => setNewSpec(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSpec()}
            className={`${inputCls} flex-1`}
            placeholder="Type a specialization and press Enter…"
          />
          <button
            onClick={addSpec}
            className="px-4 py-3 bg-primary/10 border border-primary/30 rounded-xl text-primary hover:bg-primary/20 transition-all"
            aria-label="Add specialization"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : saved ? (
            <CheckCircle size={18} />
          ) : (
            <Save size={18} />
          )}
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Profile'}
        </button>
        {saved && (
          <p className="text-primary text-sm font-bold">
            Profile updated successfully!
          </p>
        )}
      </div>
    </div>
  );
}

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-subtle';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase tracking-widest text-text-subtle">
        {label}
      </label>
      {children}
    </div>
  );
}
