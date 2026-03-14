import { getVisibleReviews, type Review } from '@/lib/reviews';

const WA =
  'https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase';

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const STATS = [
  { v: '50+',   l: 'Migrations' },
  { v: '100%',  l: 'Success' },
  { v: '4.9/5', l: 'Rating' },
  { v: '< 7d',  l: 'Turnaround' },
];

export default async function ReviewsSection() {
  const reviews = await getVisibleReviews();

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : 5;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lovable Migration',
    url: 'https://lovablemigration.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.reviewer_name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: r.review_text,
    })),
  };

  return (
    <section
      id="reviews"
      className="section-padding bg-surface/30 relative overflow-hidden"
      aria-label="Client reviews"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="pill mb-4">
            <span>★★★★★</span>
            40+ Happy Clients
          </span>
          <h2 className="h2 mb-4">
            Trusted by Builders &amp;<br />
            <span className="primary-gradient-text italic">Small to Large SaaS Founders</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-lg leading-relaxed">
            Real feedback from developers who broke free from vendor lock-in and scaled their apps on Supabase.
          </p>
        </div>

        {/* Reviews grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-subtle italic py-12 mb-16">
            Reviews coming soon.
          </p>
        )}

        {/* Stats + CTA bar */}
        <div className="glass-card !p-0 grid grid-cols-1 md:grid-cols-5 border-primary/10 bg-black/40 shadow-2xl overflow-hidden">
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="text-center py-10 px-4 group hover:bg-white/[0.02] transition-colors"
              >
                <p className="text-3xl font-black mb-1 primary-gradient-text italic">{s.v}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle group-hover:text-primary transition-colors">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 flex flex-col items-center justify-center p-10 text-center gap-6 bg-primary/5 border-l border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-white font-black text-lg mb-2 tracking-tight italic">
                Ready to be our next success?
              </p>
              <p className="text-xs font-bold text-text-muted mb-6 uppercase tracking-widest">
                Free audit — No strings attached.
              </p>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full py-4 text-sm shadow-xl"
              >
                <WaIcon />
                Start Free Consultation
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg leading-none ${i <= rating ? 'text-amber-400' : 'text-white/10'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.reviewer_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="glass-card flex flex-col group hover:-translate-y-2 transition-all duration-500">
      <div className="flex gap-1 mb-6">
        <StarRow rating={review.rating} />
      </div>

      <blockquote className="text-lg leading-relaxed mb-8 text-white/90 italic font-medium flex-1 relative">
        <span className="text-4xl absolute -top-4 -left-2 text-primary/20 leading-none select-none">
          &ldquo;
        </span>
        {review.review_text}
      </blockquote>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(62,207,142,0.1)] flex-shrink-0 select-none">
          {initials}
        </div>
        <div>
          <p className="font-black text-white tracking-tight">{review.reviewer_name}</p>
          <p className="text-xs font-bold text-text-subtle uppercase tracking-widest">
            {review.reviewer_role}
            {review.company_name ? ` · ${review.company_name}` : ''}
          </p>
        </div>
      </div>
    </article>
  );
}
