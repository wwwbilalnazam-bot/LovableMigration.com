import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, CheckCircle } from 'lucide-react';
import { getFounderProfile } from '@/lib/founder';

export default async function FounderSection() {
  const founder = await getFounderProfile();

  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="pill mb-4">Meet the Expert</span>
          <h2 className="h2 mb-4">
            Your Dedicated<br />
            <span className="primary-gradient-text italic">Migration Specialist</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto text-lg leading-relaxed">
            Real expertise behind every successful migration
          </p>
        </div>

        {/* Main card */}
        <div className="glass-card !p-0 overflow-hidden !rounded-3xl border-primary/10 hover:border-primary/30 transition-all duration-500 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">

            {/* Left panel — dark green accent */}
            <div className="lg:w-72 bg-primary/5 border-r border-white/5 p-10 flex flex-col items-center justify-center gap-8 flex-shrink-0">
              {/* Avatar ring */}
              <div className="relative">
                <div className="w-44 h-44 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-[var(--bg-card)] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {founder.profile_image_url ? (
                    <Image
                      src={founder.profile_image_url}
                      alt={founder.name}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-6xl font-black text-primary select-none">
                      {founder.name.charAt(0)}
                    </span>
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-3 w-5 h-5 bg-primary rounded-full border-2 border-[var(--bg-card)] shadow-[0_0_10px_rgba(62,207,142,0.6)]" />
              </div>

              {/* Experience badge */}
              <div className="text-center bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 w-full">
                <p className="text-3xl font-black primary-gradient-text italic">
                  {founder.experience}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle mt-1">
                  Experience
                </p>
              </div>

              {/* LinkedIn */}
              {founder.linkedin_url && (
                <Link
                  href={founder.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 text-[#4db5e3] font-bold px-5 py-3 rounded-xl transition-all text-sm"
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
                </Link>
              )}
            </div>

            {/* Right panel */}
            <div className="flex-1 p-10 lg:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
                {founder.role}
              </p>
              <h3 className="text-3xl font-black text-white tracking-tight mb-6">
                {founder.name}
              </h3>

              <p className="text-text-muted leading-relaxed mb-10 text-base">
                {founder.bio}
              </p>

              {/* Specializations */}
              {founder.specialization.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle mb-5">
                    Areas of Expertise
                  </p>
                  <ul className="space-y-3">
                    {founder.specialization.map((spec, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 font-semibold text-sm group">
                        <CheckCircle
                          size={16}
                          className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform"
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
