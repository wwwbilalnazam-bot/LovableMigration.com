import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const posts = [
  {
    title: "How to Deploy Self-Hosted Supabase with Docker: Complete Tutorial",
    slug: "supabase-docker-self-hosted-tutorial",
    excerpt: "Step-by-step Docker Compose tutorial for deploying self-hosted Supabase with SSL, automated backups, and production-ready configuration.",
    meta_title: "Supabase Docker Self-Hosted Tutorial 2025 | Production Setup",
    meta_description: "Deploy self-hosted Supabase using Docker Compose. Complete tutorial covering SSL, backups, environment configuration, and production hardening.",
    keywords: "supabase docker compose, self-hosted supabase tutorial, deploy supabase docker, supabase production docker",
    category: "Self-Hosting",
    tags: ["supabase", "docker", "self-hosted", "tutorial", "devops"],
    featured_image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-03-21T08:00:00Z",
    published: true,
    read_time: "10 min read",
    content: `<h2>Why Docker Compose for Supabase?</h2>
<p>Supabase consists of 8+ services: PostgreSQL, PostgREST, GoTrue (auth), Realtime, Storage, Kong (API gateway), Supabase Studio, and more. Docker Compose orchestrates all of these with a single command, making self-hosted Supabase manageable even for teams without deep DevOps expertise.</p>

<h2>Server Requirements</h2>
<ul>
  <li>Ubuntu 22.04 LTS</li>
  <li>Minimum: 2 vCPU, 4GB RAM, 40GB SSD</li>
  <li>Recommended: 4 vCPU, 8GB RAM, 100GB SSD</li>
  <li>A domain name and DNS access</li>
</ul>

<h2>Step 1: Install Docker Engine</h2>
<pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER</code></pre>

<h2>Step 2: Clone Supabase and Configure</h2>
<pre><code>git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env</code></pre>

<p>Generate the required secrets:</p>
<pre><code># Generate JWT secret (minimum 32 chars)
openssl rand -base64 32

# Generate API keys (use Supabase's JWT tool or this approach)
# Visit https://supabase.com/docs/guides/self-hosting#api-keys for instructions</code></pre>

<p>Edit <code>.env</code> with your values:</p>
<pre><code>############
# Secrets - Generate fresh values for production!
############
POSTGRES_PASSWORD=your-strong-password-here
JWT_SECRET=your-jwt-secret-minimum-32-chars
ANON_KEY=eyJhbGci...  # Generated from JWT_SECRET
SERVICE_ROLE_KEY=eyJhbGci...  # Generated from JWT_SECRET

############
# API - Your public domain
############
SITE_URL=https://yourdomain.com
API_EXTERNAL_URL=https://api.yourdomain.com

############
# Studio - Internal access
############
STUDIO_DEFAULT_ORGANIZATION=Your Org
STUDIO_DEFAULT_PROJECT=Production

############
# Email - Configure SMTP
############
SMTP_ADMIN_EMAIL=admin@yourdomain.com
SMTP_HOST=smtp.youremailprovider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_SENDER_NAME=Your App Name</code></pre>

<h2>Step 3: Configure Nginx Reverse Proxy</h2>
<pre><code>sudo apt install nginx certbot python3-certbot-nginx -y</code></pre>

<p>Create <code>/etc/nginx/sites-available/supabase</code>:</p>
<pre><code>server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support for Realtime
    location /realtime/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}</code></pre>

<pre><code>sudo ln -s /etc/nginx/sites-available/supabase /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.yourdomain.com</code></pre>

<h2>Step 4: Start Supabase</h2>
<pre><code>cd ~/supabase/docker
docker compose up -d</code></pre>

<p>Verify all containers are running:</p>
<pre><code>docker compose ps</code></pre>

<h2>Step 5: Set Up Automated Backups</h2>
<pre><code>sudo mkdir -p /backups/supabase
sudo crontab -e</code></pre>

<p>Add this cron job:</p>
<pre><code># Daily backup at 2 AM
0 2 * * * docker exec supabase-db pg_dumpall -U postgres | gzip > /backups/supabase/backup-$(date +\%Y\%m\%d).sql.gz

# Keep only last 7 days
0 3 * * * find /backups/supabase -name "*.sql.gz" -mtime +7 -delete</code></pre>

<h2>Step 6: Configure Firewall</h2>
<pre><code>sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 5432/tcp   # Block direct Postgres access
sudo ufw deny 8000/tcp   # Block direct Kong access
sudo ufw enable</code></pre>

<h2>Updating Supabase</h2>
<pre><code>cd ~/supabase
git pull
cd docker
docker compose pull
docker compose up -d</code></pre>
<p>Need this set up professionally? <a href="/#contact">Our self-hosted deployment service gets you running in 24 hours with full documentation.</a></p>`,
    faqs: [
      { q: "How do I access Supabase Studio on self-hosted?", a: "Supabase Studio runs on port 3000 by default. Set up a separate Nginx vhost for studio.yourdomain.com proxying to localhost:3000, and protect it with basic auth or restrict to your IP." },
      { q: "Can I run self-hosted Supabase without a domain name?", a: "Yes, using an IP address, but SSL becomes more complex. For production, always use a domain with Let's Encrypt SSL." },
      { q: "How do I monitor self-hosted Supabase?", a: "Use docker compose logs -f for live logs, set up UptimeRobot for uptime monitoring, and consider Grafana + Prometheus for detailed metrics on larger deployments." }
    ]
  },
  {
    title: "Lovable Cloud Pricing Problems: Why Your App Is Getting Too Expensive",
    slug: "lovable-cloud-pricing-problems",
    excerpt: "Lovable Cloud pricing scales fast and often catches founders by surprise. Here's a breakdown of the cost structure and better alternatives.",
    meta_title: "Lovable Cloud Pricing Problems 2025 | Why It Gets Expensive",
    meta_description: "Understand Lovable Cloud's pricing model and why costs escalate quickly for growing apps. Learn how migrating to Supabase can reduce your backend costs significantly.",
    keywords: "lovable cloud pricing, lovable cloud expensive, lovable cloud cost, lovable cloud alternatives cheaper",
    category: "Migration",
    tags: ["lovable", "pricing", "cost", "migration", "backend"],
    featured_image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-03-23T08:00:00Z",
    published: true,
    read_time: "5 min read",
    content: `<h2>The Lovable Cloud Pricing Surprise</h2>
<p>Many founders start building on Lovable Cloud because it's fast and easy. The early pricing seems reasonable. Then the app gets traction, users start signing up, and the monthly bill grows in ways that weren't clearly communicated upfront.</p>
<p>This isn't unique to Lovable Cloud — it's a common pattern with managed BaaS platforms. But understanding the problem is the first step to solving it.</p>

<h2>How Lovable Cloud Pricing Escalates</h2>
<p>Most BaaS platforms including Lovable Cloud charge across multiple dimensions simultaneously:</p>
<ul>
  <li><strong>Monthly active users (MAU):</strong> Every user who touches your app counts. Free tiers often allow 10,000–50,000 MAU but paid tiers can reach $500+/month for high user counts.</li>
  <li><strong>Database storage:</strong> As your data grows, storage costs grow with it.</li>
  <li><strong>API calls:</strong> Every database read or write is a metered operation.</li>
  <li><strong>Bandwidth/egress:</strong> Data leaving the platform (to your users) is often charged separately.</li>
  <li><strong>Feature tiers:</strong> Advanced features like custom domains, SAML auth, or audit logs are often locked behind expensive enterprise plans.</li>
</ul>

<h2>The Real Impact on Your Margin</h2>
<p>For a SaaS app charging $20/month with 500 paying users ($10k MRR), a backend bill of $300–$500/month represents 3–5% of revenue — before you've paid for hosting, domains, email, or any other infrastructure. As you scale, if the backend bill doesn't scale linearly with revenue, it compresses your margins.</p>

<h2>The Hidden Lock-In Problem</h2>
<p>Beyond cost, Lovable Cloud creates vendor lock-in. Your data schema, auth system, and API calls are all built around their platform. Moving feels risky — which is exactly how they like it.</p>
<p>The truth is that migrating is straightforward when done correctly. Your data is just data. Your auth users can be migrated. Your API calls can be updated to use standard Supabase client calls.</p>

<h2>What Moving to Supabase Actually Costs</h2>
<p>Migration is a one-time investment. After that:</p>
<ul>
  <li><strong>Supabase Cloud Pro:</strong> $25/month flat, predictable, scales reasonably</li>
  <li><strong>Self-hosted Supabase:</strong> $20–80/month depending on server size, fixed cost regardless of users</li>
</ul>
<p>A typical app spending $300/month on Lovable Cloud would spend $25–80/month on Supabase — saving $2,640–$3,300 per year from year one.</p>

<h2>Is the Migration Worth the Effort?</h2>
<p>For most teams: absolutely. Especially when you factor in:</p>
<ul>
  <li>Full database access (raw SQL, custom indexes, stored procedures)</li>
  <li>No vendor lock-in (open source PostgreSQL)</li>
  <li>Ability to self-host for even lower costs</li>
  <li>Better developer experience (Supabase Studio, type generation, edge functions)</li>
</ul>
<p>Our migration service makes this a one-week project rather than a months-long internal effort. <a href="/#contact">Get a free cost analysis comparing your current Lovable Cloud bill vs. what Supabase would cost.</a></p>`,
    faqs: [
      { q: "Can I export all my data from Lovable Cloud?", a: "Yes. Lovable Cloud provides data export functionality. The exported data can be imported into Supabase (PostgreSQL) with the right migration tooling." },
      { q: "Will my app go down during migration?", a: "With proper migration planning, downtime is minimal (typically a maintenance window of 30–60 minutes for the final cutover). Most migration work happens in parallel with your existing system." },
      { q: "How much does the migration service cost?", a: "Our migration packages start at $300 for Basic (small MVPs) up to $600 for Premium (large production apps with complex requirements). This is typically recovered in 1–2 months of backend savings." }
    ]
  },
  {
    title: "Supabase API Migration Guide: Updating Your Frontend After Moving to Supabase",
    slug: "supabase-api-migration-guide",
    excerpt: "After migrating your database to Supabase, you need to update your frontend API calls. This guide covers every pattern: queries, auth, storage, and real-time.",
    meta_title: "Supabase API Migration Guide | Update Frontend After Migration",
    meta_description: "Complete guide to updating your frontend code after migrating to Supabase. Covers query patterns, auth integration, storage, and real-time subscriptions.",
    keywords: "supabase api migration, update frontend supabase, supabase client migration, supabase javascript sdk",
    category: "Development",
    tags: ["supabase", "api", "frontend", "migration", "javascript"],
    featured_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-03-25T08:00:00Z",
    published: true,
    read_time: "7 min read",
    content: `<h2>The Code Migration Challenge</h2>
<p>Once your database is on Supabase, you need to update your application code to use the Supabase client instead of your previous provider's SDK. This guide covers every common pattern you'll encounter.</p>

<h2>Setup: Installing the Supabase Client</h2>
<pre><code>npm install @supabase/supabase-js</code></pre>
<pre><code>// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)</code></pre>

<h2>Pattern 1: Basic Data Queries</h2>
<pre><code>// SELECT * FROM posts WHERE published = true ORDER BY created_at DESC
const { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false })

// SELECT specific columns with JOIN
const { data } = await supabase
  .from('orders')
  .select('id, total, created_at, users(name, email)')
  .eq('status', 'pending')

// SELECT with complex filter
const { data } = await supabase
  .from('products')
  .select('*')
  .gte('price', 10)
  .lte('price', 100)
  .ilike('name', '%shirt%')
  .limit(20)</code></pre>

<h2>Pattern 2: Mutations (Insert, Update, Delete)</h2>
<pre><code>// INSERT
const { data, error } = await supabase
  .from('profiles')
  .insert({ name: 'Alice', email: 'alice@example.com' })
  .select()
  .single()

// UPDATE
const { error } = await supabase
  .from('posts')
  .update({ published: true })
  .eq('id', postId)

// UPSERT (insert or update on conflict)
const { data } = await supabase
  .from('settings')
  .upsert({ user_id: userId, theme: 'dark' }, { onConflict: 'user_id' })

// DELETE
const { error } = await supabase
  .from('comments')
  .delete()
  .eq('id', commentId)</code></pre>

<h2>Pattern 3: Authentication</h2>
<pre><code>// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123'
})

// Sign in with email/password
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123'
})

// Sign in with OAuth (Google, GitHub, etc.)
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: window.location.origin }
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})</code></pre>

<h2>Pattern 4: File Storage</h2>
<pre><code>// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(\`\${userId}/avatar.jpg\`, file, {
    contentType: 'image/jpeg',
    upsert: true
  })

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(\`\${userId}/avatar.jpg\`)

// Download file
const { data, error } = await supabase.storage
  .from('documents')
  .download('private/report.pdf')

// Delete file
await supabase.storage
  .from('avatars')
  .remove([\`\${userId}/old-avatar.jpg\`])</code></pre>

<h2>Pattern 5: Real-Time Subscriptions</h2>
<pre><code>// Subscribe to table changes
const channel = supabase
  .channel('db-changes')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('New message:', payload.new)
    }
  )
  .subscribe()

// Clean up on component unmount (React)
useEffect(() => {
  const channel = supabase.channel(...)
  return () => supabase.removeChannel(channel)
}, [])</code></pre>

<h2>Pattern 6: Calling Edge Functions</h2>
<pre><code>const { data, error } = await supabase.functions.invoke('send-email', {
  body: { to: 'user@example.com', subject: 'Hello' }
})</code></pre>
<p>Need help updating your frontend after a Lovable Cloud migration? <a href="/#contact">Our team handles both the database migration and full frontend code update.</a></p>`,
    faqs: [
      { q: "Do I need to change all my API calls after migrating to Supabase?", a: "Yes, but the pattern is consistent. Once you understand the Supabase client API, most queries follow the same fluent builder pattern. The bulk of the work is mechanical find-and-replace." },
      { q: "Can I use raw SQL with the Supabase JavaScript client?", a: "Yes, via supabase.rpc() for stored procedures/functions, or by using the Postgres REST API with raw SQL filters. For complex queries, create a PostgreSQL function and call it via rpc()." },
      { q: "How do I handle errors in Supabase queries?", a: "Every Supabase call returns { data, error }. Always check if error is non-null before using data. You can also throw errors in server-side code and handle them with try/catch." }
    ]
  },
  {
    title: "Supabase Performance Optimization: Speed Up Your Database Queries",
    slug: "supabase-performance-optimization",
    excerpt: "Practical techniques to optimize Supabase performance: indexing strategies, query optimization, connection pooling, and caching patterns.",
    meta_title: "Supabase Performance Optimization Guide 2025 | Speed Up Queries",
    meta_description: "Optimize your Supabase database performance with indexing, query tuning, connection pooling, and caching. Real techniques that improve response times by 10x.",
    keywords: "supabase performance optimization, supabase slow queries, supabase indexing, optimize supabase database",
    category: "Supabase",
    tags: ["supabase", "performance", "optimization", "postgresql", "indexing"],
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-03-27T08:00:00Z",
    published: true,
    read_time: "8 min read",
    content: `<h2>Why Supabase Queries Slow Down</h2>
<p>A freshly migrated database often starts fast, then slows as data grows. The culprits are almost always the same: missing indexes, N+1 query patterns, too many concurrent connections, or fetching more data than needed. Here's how to fix each one.</p>

<h2>1. Identify Slow Queries First</h2>
<p>Enable pg_stat_statements in Supabase to track query performance:</p>
<pre><code>-- In Supabase SQL Editor
SELECT
  query,
  calls,
  round(mean_exec_time::numeric, 2) AS avg_ms,
  round(total_exec_time::numeric, 2) AS total_ms,
  rows
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat%'
ORDER BY mean_exec_time DESC
LIMIT 20;</code></pre>

<h2>2. Add the Right Indexes</h2>
<p>Indexes are the biggest performance lever. Use EXPLAIN ANALYZE to confirm you're hitting sequential scans:</p>
<pre><code>EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 'abc' ORDER BY created_at DESC LIMIT 10;</code></pre>

<p>If you see <code>Seq Scan</code> instead of <code>Index Scan</code>, add an index:</p>
<pre><code>-- Composite index for filter + sort pattern
CREATE INDEX CONCURRENTLY idx_orders_user_created
ON orders(user_id, created_at DESC);

-- Partial index for filtered queries (only pending orders)
CREATE INDEX CONCURRENTLY idx_orders_pending
ON orders(created_at DESC)
WHERE status = 'pending';

-- Full-text search index
CREATE INDEX idx_posts_search
ON posts USING GIN(to_tsvector('english', title || ' ' || content));</code></pre>

<h2>3. Select Only What You Need</h2>
<p>Avoid <code>select('*')</code> in production. Fetching all columns transfers unnecessary data:</p>
<pre><code>// Bad: fetches all columns including large content fields
const { data } = await supabase.from('posts').select('*')

// Good: fetch only what the list view needs
const { data } = await supabase
  .from('posts')
  .select('id, title, slug, excerpt, created_at, author')</code></pre>

<h2>4. Fix N+1 Query Patterns</h2>
<p>N+1 is when you fetch a list, then query related data for each item separately. Use Supabase's JOIN syntax instead:</p>
<pre><code>// Bad: N+1 (1 query for orders + N queries for each user)
const orders = await supabase.from('orders').select('*')
for (const order of orders.data) {
  const user = await supabase.from('users').select('name').eq('id', order.user_id)
}

// Good: single query with JOIN
const { data } = await supabase
  .from('orders')
  .select('*, users(name, email)')</code></pre>

<h2>5. Implement Query Caching</h2>
<p>For data that doesn't change frequently, cache at the application layer:</p>
<pre><code>// Next.js: Cache with revalidation
import { unstable_cache } from 'next/cache'

const getPublicPosts = unstable_cache(
  async () => {
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return data
  },
  ['public-posts'],
  { revalidate: 300 } // Cache for 5 minutes
)

// In a Server Component:
const posts = await getPublicPosts()</code></pre>

<h2>6. Use Connection Pooling Correctly</h2>
<pre><code># Use the pooler URL (port 6543) for your application
# This routes through PgBouncer and reuses connections

DATABASE_URL=postgresql://postgres.ref:[pass]@pooler.supabase.com:6543/postgres

# Use the direct URL only for migrations
DIRECT_URL=postgresql://postgres.ref:[pass]@db.supabase.com:5432/postgres</code></pre>

<h2>7. Paginate Large Result Sets</h2>
<pre><code>// Never fetch all rows from a large table
const { data, count } = await supabase
  .from('orders')
  .select('*', { count: 'exact' })
  .range(0, 19) // First 20 rows
  .order('created_at', { ascending: false })</code></pre>

<h2>8. Use Database Functions for Complex Logic</h2>
<p>Move complex multi-step operations into PostgreSQL functions to reduce round-trips:</p>
<pre><code>-- PostgreSQL function
CREATE OR REPLACE FUNCTION get_user_dashboard(p_user_id UUID)
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'orders', (SELECT count(*) FROM orders WHERE user_id = p_user_id),
    'total_spent', (SELECT sum(total) FROM orders WHERE user_id = p_user_id)
  );
END;
$$ LANGUAGE plpgsql;

-- Call from client
const { data } = await supabase.rpc('get_user_dashboard', { p_user_id: userId })</code></pre>`,
    faqs: [
      { q: "How do I enable query performance monitoring in Supabase?", a: "Go to Supabase Dashboard → Database → Query Performance. This shows the slowest queries automatically. For deeper analysis, enable pg_stat_statements extension." },
      { q: "What's the maximum number of connections Supabase handles?", a: "Supabase Cloud Pro allows up to 60 direct connections. With PgBouncer pooling enabled (port 6543), this effectively scales to thousands of concurrent app connections." },
      { q: "Should I use Supabase Realtime or polling for live data?", a: "Realtime is better for user-facing live updates (chat, notifications). For dashboards and analytics that refresh every 30+ seconds, polling with caching is more efficient and cheaper." }
    ]
  },
  {
    title: "Advanced Supabase RLS Patterns: Secure Your Database Like a Pro",
    slug: "supabase-rls-advanced-patterns",
    excerpt: "Go beyond basic RLS. Learn advanced Row Level Security patterns for multi-tenancy, team-based access, hierarchical permissions, and admin overrides.",
    meta_title: "Advanced Supabase RLS Patterns 2025 | Row Level Security Guide",
    meta_description: "Master Supabase Row Level Security with advanced patterns: multi-tenancy, team access, hierarchical permissions, and performance-optimized RLS policies.",
    keywords: "supabase rls, row level security supabase, supabase rls patterns, supabase security policies",
    category: "Supabase",
    tags: ["supabase", "rls", "security", "postgresql", "multi-tenancy"],
    featured_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-03-29T08:00:00Z",
    published: true,
    read_time: "9 min read",
    content: `<h2>Why RLS Matters</h2>
<p>Row Level Security is Supabase's most powerful security feature. When configured correctly, RLS enforces access control at the database level — meaning even if your application has a bug, users cannot access data they shouldn't see. This article covers patterns beyond the basic "users see their own data" scenario.</p>

<h2>The Fundamentals</h2>
<pre><code>-- Always enable RLS first
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Without policies, no rows are accessible (default deny)
-- Add policies to explicitly allow access</code></pre>

<h2>Pattern 1: User Owns Their Data</h2>
<pre><code>-- Users can CRUD their own rows
CREATE POLICY "own_data_select" ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "own_data_insert" ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_data_update" ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_data_delete" ON profiles FOR DELETE
  USING (auth.uid() = user_id);</code></pre>

<h2>Pattern 2: Multi-Tenant SaaS (Organization-Based)</h2>
<pre><code>-- Users belong to organizations, data belongs to organizations
CREATE TABLE organization_members (
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('owner', 'admin', 'member')),
  PRIMARY KEY (org_id, user_id)
);

-- Documents visible to org members
CREATE POLICY "org_member_access" ON documents FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM organization_members
      WHERE user_id = auth.uid()
    )
  );

-- Only admins and owners can delete
CREATE POLICY "org_admin_delete" ON documents FOR DELETE
  USING (
    org_id IN (
      SELECT org_id FROM organization_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );</code></pre>

<h2>Pattern 3: Team-Based Access with Roles</h2>
<pre><code>-- Helper function to check user role
CREATE OR REPLACE FUNCTION get_user_role(p_org_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM organization_members
  WHERE user_id = auth.uid() AND org_id = p_org_id
$$ LANGUAGE sql SECURITY DEFINER;

-- Use the function in policies for cleaner syntax
CREATE POLICY "admin_only_billing" ON billing_records FOR SELECT
  USING (get_user_role(org_id) IN ('owner', 'admin'));</code></pre>

<h2>Pattern 4: Public Content with Private Annotations</h2>
<pre><code>-- Posts table: public posts visible to all, drafts only to owner
CREATE POLICY "public_posts_select" ON posts FOR SELECT
  USING (
    published = true
    OR author_id = auth.uid()
  );

-- Only authors can modify their posts
CREATE POLICY "author_modify" ON posts FOR UPDATE
  USING (author_id = auth.uid());</code></pre>

<h2>Pattern 5: Hierarchical Permissions</h2>
<pre><code>-- Comments on posts: visible if the post is visible
CREATE POLICY "comments_select" ON comments FOR SELECT
  USING (
    post_id IN (
      SELECT id FROM posts WHERE published = true
      UNION
      SELECT id FROM posts WHERE author_id = auth.uid()
    )
  );</code></pre>

<h2>Pattern 6: Admin Override</h2>
<pre><code>-- Store admin status in a table
CREATE TABLE admins (user_id UUID PRIMARY KEY REFERENCES auth.users(id));

-- Admin helper function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
$$ LANGUAGE sql SECURITY DEFINER;

-- Admins see everything
CREATE POLICY "admin_all_access" ON documents FOR ALL
  USING (is_admin());

-- Regular users see their own
CREATE POLICY "user_own_access" ON documents FOR SELECT
  USING (user_id = auth.uid());</code></pre>

<h2>Performance: Avoid Slow Subqueries in RLS</h2>
<p>RLS policies run on every query. A slow policy can bring your entire app to a crawl. Always index columns used in RLS policies:</p>
<pre><code>-- These indexes make RLS lookups fast
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);
CREATE INDEX idx_documents_org_id ON documents(org_id);
CREATE INDEX idx_posts_author_published ON posts(author_id, published);</code></pre>

<h2>Testing Your RLS Policies</h2>
<pre><code>-- Test as a specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "user-uuid-here"}';

SELECT * FROM documents; -- Should only return rows this user can see</code></pre>`,
    faqs: [
      { q: "Does RLS slow down Supabase queries?", a: "RLS adds a small overhead per query. With proper indexes on columns used in policies, the impact is typically under 5ms. Always benchmark after adding policies." },
      { q: "Can I bypass RLS for server-side operations?", a: "Yes. Use the service role key (SUPABASE_SERVICE_ROLE_KEY) on the server side. The service role bypasses all RLS policies. Never expose this key to the client." },
      { q: "How do I debug RLS policy issues?", a: "Use EXPLAIN to see if policies are being applied, check policy definitions in the Supabase Dashboard, and test with SET LOCAL role commands in the SQL editor to impersonate different users." }
    ]
  },
  {
    title: "Supabase Storage Optimization: CDN, Access Policies, and Cost Management",
    slug: "supabase-storage-optimization-guide",
    excerpt: "Optimize your Supabase Storage setup for performance and cost: CDN configuration, signed URLs, image transformations, and storage RLS policies.",
    meta_title: "Supabase Storage Optimization Guide 2025 | CDN & Cost Tips",
    meta_description: "Optimize Supabase Storage for speed and cost savings. Covers CDN setup, image transformations, signed URLs, RLS policies, and storage cost management.",
    keywords: "supabase storage optimization, supabase storage cdn, supabase signed urls, supabase image optimization",
    category: "Supabase",
    tags: ["supabase", "storage", "cdn", "optimization", "files"],
    featured_image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-04-01T08:00:00Z",
    published: true,
    read_time: "6 min read",
    content: `<h2>Supabase Storage Basics</h2>
<p>Supabase Storage is built on top of S3-compatible object storage with a built-in CDN. It integrates directly with your RLS policies, handles image transformations, and provides both public and private file access. But the default setup isn't always optimal — here's how to get the most out of it.</p>

<h2>1. Choose the Right Bucket Type</h2>
<p>Supabase has two bucket types with very different behaviors:</p>
<ul>
  <li><strong>Public buckets:</strong> Files accessible to anyone with the URL. Good for: avatars, blog images, product photos, anything SEO-relevant.</li>
  <li><strong>Private buckets:</strong> Files require signed URLs. Good for: user documents, invoices, private media.</li>
</ul>
<pre><code>-- Create a public bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Create a private bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);</code></pre>

<h2>2. Set Up Storage RLS Policies</h2>
<pre><code>-- Users can upload to their own folder
CREATE POLICY "user_upload_avatar" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can update/delete their own files
CREATE POLICY "user_manage_own_files" ON storage.objects FOR ALL
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );</code></pre>

<h2>3. Use Image Transformations</h2>
<p>Supabase Storage can resize and optimize images on-the-fly. Always serve appropriately sized images instead of full-resolution originals:</p>
<pre><code>// Get a resized, cached image URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('user123/avatar.jpg', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover',
      quality: 80
    }
  })

// Returns a URL with automatic resizing
// Transformed images are cached by the CDN</code></pre>

<h2>4. Generate Signed URLs for Private Files</h2>
<pre><code>// Generate a signed URL valid for 1 hour
const { data, error } = await supabase.storage
  .from('documents')
  .createSignedUrl('reports/q4-2024.pdf', 3600)

// For multiple files at once (more efficient)
const { data } = await supabase.storage
  .from('documents')
  .createSignedUrls([
    'invoice-001.pdf',
    'invoice-002.pdf'
  ], 3600)</code></pre>

<h2>5. Upload Optimization</h2>
<pre><code>// Upload with progress tracking
const { data, error } = await supabase.storage
  .from('uploads')
  .upload(filePath, file, {
    contentType: file.type,
    upsert: false, // Prevent accidental overwrites
    duplex: 'half' // For streaming uploads
  })

// For large files, use resumable uploads
const { data } = await supabase.storage
  .from('videos')
  .uploadToSignedUrl(path, token, file)</code></pre>

<h2>6. Organize Files for CDN Efficiency</h2>
<p>Structure your file paths to take advantage of CDN caching:</p>
<pre><code>// Good: organized by type and user
avatars/{userId}/profile.jpg
documents/{userId}/{year}/{filename}
products/{productId}/images/{index}.jpg

// Bad: flat structure that's hard to manage
{randomUUID}.jpg</code></pre>

<h2>7. Cost Management</h2>
<p>Storage costs come from two sources: storage space and egress (bandwidth). Manage both:</p>
<ul>
  <li>Delete files when users delete accounts (use database triggers or cleanup functions)</li>
  <li>Compress images before upload on the client side</li>
  <li>Use image transformations to avoid storing multiple sizes</li>
  <li>Set up lifecycle policies to auto-delete temporary files</li>
</ul>
<pre><code>// Client-side image compression before upload
async function compressImage(file: File): Promise<Blob> {
  // Use browser-image-compression library
  const options = { maxSizeMB: 1, maxWidthOrHeight: 1920 }
  return await imageCompression(file, options)
}</code></pre>`,
    faqs: [
      { q: "Does Supabase Storage have a CDN?", a: "Yes. Public bucket files are served through a global CDN automatically. Transformed images are also cached at the CDN layer." },
      { q: "How do I migrate files from another storage provider to Supabase Storage?", a: "Download files from your current provider and upload them to Supabase Storage using the admin client. For large migrations, process files in batches to avoid rate limits." },
      { q: "Can I use Supabase Storage with a custom domain?", a: "On Supabase Cloud Pro and above, you can configure custom domains. For self-hosted Supabase, configure Nginx to proxy storage requests through your domain." }
    ]
  },
  {
    title: "Supabase Edge Functions: Build Serverless Logic at the Edge",
    slug: "supabase-edge-functions-guide",
    excerpt: "Learn how to write, deploy, and use Supabase Edge Functions — serverless Deno functions that run globally at the edge for ultra-low latency.",
    meta_title: "Supabase Edge Functions Guide 2025 | Serverless at the Edge",
    meta_description: "Master Supabase Edge Functions: write Deno serverless functions, deploy globally, handle webhooks, call external APIs, and integrate with your database.",
    keywords: "supabase edge functions, supabase serverless, supabase deno functions, edge functions tutorial",
    category: "Development",
    tags: ["supabase", "edge-functions", "serverless", "deno", "typescript"],
    featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-04-03T08:00:00Z",
    published: true,
    read_time: "7 min read",
    content: `<h2>What Are Supabase Edge Functions?</h2>
<p>Supabase Edge Functions are serverless TypeScript/JavaScript functions that run in Deno on Supabase's global edge network. They're deployed in 30+ regions worldwide, giving your users sub-100ms latency regardless of where they are. Use them for: webhook handlers, third-party API integrations, background jobs, and business logic that shouldn't run on the client.</p>

<h2>Setting Up the Supabase CLI</h2>
<pre><code>npm install -g supabase
supabase login
supabase init</code></pre>

<h2>Creating Your First Edge Function</h2>
<pre><code>supabase functions new hello-world</code></pre>

<p>This creates <code>supabase/functions/hello-world/index.ts</code>:</p>
<pre><code>import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req: Request) => {
  const { name } = await req.json()
  return new Response(
    JSON.stringify({ message: \`Hello \${name}!\` }),
    { headers: { "Content-Type": "application/json" } }
  )
})</code></pre>

<h2>Serving Locally</h2>
<pre><code>supabase functions serve hello-world --env-file .env.local</code></pre>

<h2>Real-World Pattern 1: Webhook Handler</h2>
<pre><code>// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  // Verify webhook signature
  // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

  const event = JSON.parse(body)

  if (event.type === 'payment_intent.succeeded') {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('payment_intent_id', event.data.object.id)

    if (error) throw error
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})</code></pre>

<h2>Real-World Pattern 2: Send Email via Resend</h2>
<pre><code>// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std/http/server.ts"

serve(async (req) => {
  const { to, subject, html } = await req.json()

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${Deno.env.get('RESEND_API_KEY')}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html
    })
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
})</code></pre>

<h2>Real-World Pattern 3: Database Trigger Handler</h2>
<pre><code>// Called via pg_net when a row is inserted
// Great for: welcome emails, notifications, async processing

serve(async (req) => {
  const payload = await req.json()
  const { record } = payload // The inserted row

  // Send welcome email when user signs up
  if (payload.type === 'INSERT' && payload.table === 'profiles') {
    await sendWelcomeEmail(record.email, record.name)
  }

  return new Response('OK')
})</code></pre>

<h2>Calling Edge Functions from Your App</h2>
<pre><code>// From client
const { data, error } = await supabase.functions.invoke('send-email', {
  body: { to: 'user@example.com', subject: 'Welcome!', html: '...' }
})

// With custom headers
const { data } = await supabase.functions.invoke('process-image', {
  body: formData,
  headers: { 'x-custom-header': 'value' }
})</code></pre>

<h2>Deploying to Production</h2>
<pre><code># Deploy single function
supabase functions deploy hello-world

# Deploy all functions
supabase functions deploy

# Set secrets (environment variables)
supabase secrets set RESEND_API_KEY=your-key-here
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...</code></pre>`,
    faqs: [
      { q: "What's the difference between Supabase Edge Functions and Next.js API Routes?", a: "Edge Functions run globally on Supabase's edge network in Deno. Next.js API Routes run in Node.js, typically in a single region. Edge Functions are better for latency-sensitive operations; API Routes are better when you need Node.js ecosystem packages." },
      { q: "Can Edge Functions access my Supabase database?", a: "Yes. Use the Supabase JS client with your service role key to access the database from Edge Functions. Always use the service role key (not the anon key) in server-side functions." },
      { q: "Are Supabase Edge Functions free?", a: "The free tier includes 500,000 invocations per month. Beyond that, you pay per invocation. For most apps, edge functions stay within the free tier." }
    ]
  },
  {
    title: "The Complete SaaS Migration Checklist: Moving to Supabase in 2025",
    slug: "migrating-saas-to-supabase-checklist",
    excerpt: "A practical 40-point checklist for migrating a production SaaS application to Supabase. Cover every detail from data export to post-launch monitoring.",
    meta_title: "SaaS Migration to Supabase Checklist 2025 | 40-Point Guide",
    meta_description: "Complete 40-point checklist for migrating your SaaS app to Supabase. Covers pre-migration audit, database migration, auth, storage, testing, and launch.",
    keywords: "supabase migration checklist, saas migration to supabase, migrate to supabase guide, supabase production migration",
    category: "Migration",
    tags: ["supabase", "migration", "checklist", "saas", "production"],
    featured_image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-04-05T08:00:00Z",
    published: true,
    read_time: "7 min read",
    content: `<h2>Use This Checklist to Migrate Without Surprises</h2>
<p>Based on dozens of production migrations, here is every step you need to complete a safe, zero-surprise Supabase migration. Print it, share it with your team, and check items off methodically.</p>

<h2>Phase 1: Pre-Migration Audit</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Document all database tables with row counts</li>
  <li>☐ List all foreign key relationships</li>
  <li>☐ Identify all database indexes</li>
  <li>☐ Document all database functions and triggers</li>
  <li>☐ List all auth providers (social logins, magic links, OTP)</li>
  <li>☐ Inventory all storage buckets and their access patterns</li>
  <li>☐ List all third-party services connected to the backend</li>
  <li>☐ Identify all real-time features in the app</li>
</ul>

<h2>Phase 2: Supabase Setup</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Create new Supabase project (or self-hosted instance)</li>
  <li>☐ Configure environment variables in a staging environment</li>
  <li>☐ Enable required Postgres extensions (uuid-ossp, pgcrypto, etc.)</li>
  <li>☐ Set up custom SMTP for auth emails</li>
  <li>☐ Configure auth redirect URLs</li>
  <li>☐ Set up Storage buckets matching current structure</li>
</ul>

<h2>Phase 3: Database Migration</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Export schema from source database</li>
  <li>☐ Clean schema of platform-specific syntax</li>
  <li>☐ Import schema to Supabase</li>
  <li>☐ Verify all tables created correctly</li>
  <li>☐ Export all data (consider chunking large tables)</li>
  <li>☐ Import data in correct dependency order</li>
  <li>☐ Validate row counts match source</li>
  <li>☐ Validate foreign key integrity</li>
  <li>☐ Re-create all indexes</li>
</ul>

<h2>Phase 4: Auth Migration</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Export user accounts from source</li>
  <li>☐ Import users via Supabase Admin API (preserve UUIDs)</li>
  <li>☐ Verify user IDs match FK references in other tables</li>
  <li>☐ Test email/password auth flow</li>
  <li>☐ Test social auth providers (Google, GitHub, etc.)</li>
  <li>☐ Configure and test magic link flow</li>
  <li>☐ Verify email templates match your brand</li>
</ul>

<h2>Phase 5: Security Configuration</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Enable RLS on every table</li>
  <li>☐ Write and test SELECT policies</li>
  <li>☐ Write and test INSERT/UPDATE/DELETE policies</li>
  <li>☐ Configure Storage bucket policies</li>
  <li>☐ Test as anon role (unauthenticated)</li>
  <li>☐ Test as authenticated role</li>
  <li>☐ Verify service role key is server-side only</li>
</ul>

<h2>Phase 6: Application Code Update</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Install @supabase/supabase-js</li>
  <li>☐ Update all data query calls to Supabase client</li>
  <li>☐ Update auth flows (login, logout, signup, session)</li>
  <li>☐ Update storage upload/download calls</li>
  <li>☐ Update real-time subscriptions</li>
  <li>☐ Generate and integrate TypeScript types</li>
</ul>

<h2>Phase 7: Testing</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Test all CRUD operations via API</li>
  <li>☐ Test auth flows end-to-end</li>
  <li>☐ Test file upload and retrieval</li>
  <li>☐ Test real-time features</li>
  <li>☐ Run performance benchmarks on key queries</li>
  <li>☐ Test with production data volume (if possible)</li>
</ul>

<h2>Phase 8: Production Cutover</h2>
<ul style="list-style:none;padding:0">
  <li>☐ Run final incremental data sync</li>
  <li>☐ Schedule maintenance window</li>
  <li>☐ Update production environment variables</li>
  <li>☐ Deploy updated application</li>
  <li>☐ Run smoke tests in production</li>
  <li>☐ Monitor error rates for 48 hours</li>
  <li>☐ Keep old backend live for 72 hours before decommissioning</li>
</ul>

<p>Want this checklist executed for you? <a href="/#contact">Our team handles end-to-end migrations from Lovable Cloud to Supabase with a guaranteed zero-data-loss process.</a></p>`,
    faqs: [
      { q: "How long does a full SaaS migration to Supabase take?", a: "Small MVPs: 1–3 days. Medium production apps: 3–7 days. Large enterprise apps with complex requirements: 2–4 weeks. Most of the time is spent on testing and validation, not the actual migration." },
      { q: "Can I do a partial migration (some features on Supabase, some still on old backend)?", a: "Yes. This is a valid incremental approach. Start by migrating the database and accessing it from Supabase while keeping your old auth or storage temporarily. Then migrate those progressively." },
      { q: "What if something goes wrong during production cutover?", a: "Always keep your old backend live and have a documented rollback plan. If something breaks, update environment variables back to the old backend. The actual cutover should take under 5 minutes — not enough time for significant data divergence." }
    ]
  },
  {
    title: "Supabase for Indie Hackers: Launch Faster, Spend Less in 2025",
    slug: "supabase-for-indie-hackers",
    excerpt: "Why Supabase is the ideal backend for indie hackers and solo founders: fast prototyping, generous free tier, type safety, and a clear path to self-hosting when you scale.",
    meta_title: "Supabase for Indie Hackers 2025 | Build Fast, Scale Cheap",
    meta_description: "Why indie hackers love Supabase in 2025. Free tier, type safety, built-in auth and storage, and the ability to self-host when you scale make it the perfect solo founder backend.",
    keywords: "supabase indie hackers, supabase solo founder, supabase free tier, build saas with supabase",
    category: "Supabase",
    tags: ["supabase", "indie-hackers", "startup", "solo-founder", "saas"],
    featured_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-04-07T08:00:00Z",
    published: true,
    read_time: "5 min read",
    content: `<h2>Why Supabase Fits the Indie Hacker Model</h2>
<p>Indie hackers have specific needs: ship fast, don't waste money before finding product-market fit, and avoid technical decisions that will hurt you later. Supabase checks all three boxes better than any alternative in 2025.</p>

<h2>The Free Tier Is Actually Useful</h2>
<p>Unlike some platforms that offer barely-functional free tiers, Supabase's free tier includes:</p>
<ul>
  <li>500MB PostgreSQL database</li>
  <li>1GB file storage</li>
  <li>2GB bandwidth/month</li>
  <li>50,000 monthly active users</li>
  <li>50MB database size</li>
  <li>Real-time subscriptions</li>
  <li>Edge Functions (500K invocations/month)</li>
  <li>Full Supabase Studio dashboard</li>
</ul>
<p>This is enough to launch, validate, and get your first paying customers without spending a cent on backend.</p>

<h2>Ship a Full Backend in One Afternoon</h2>
<p>With Supabase, a solo founder can have a production-capable backend with auth, database, file storage, and API layer in a single afternoon:</p>
<ol>
  <li>Create project: 2 minutes</li>
  <li>Design schema in Studio: 30 minutes</li>
  <li>Set up auth with social providers: 15 minutes</li>
  <li>Configure RLS policies: 30 minutes</li>
  <li>Install SDK and write first queries: 30 minutes</li>
  <li>Deploy first version: 10 minutes</li>
</ol>
<p>Total: under 2 hours from zero to working backend.</p>

<h2>TypeScript Type Safety Out of the Box</h2>
<p>Generated types mean fewer runtime errors and faster development:</p>
<pre><code>npx supabase gen types typescript --project-id your-id > types/supabase.ts

// Now TypeScript knows your exact schema
const { data } = await supabase
  .from('products')  // Autocomplete for all columns
  .select('name, price')  // Type error if column doesn't exist</code></pre>

<h2>The Self-Hosting Escape Valve</h2>
<p>Here's what makes Supabase uniquely good for indie hackers: when you hit product-market fit and start scaling, you can self-host and cut your backend costs by 60–80%. Most platforms force you to pay their pricing forever. Supabase lets you graduate to owning your infrastructure.</p>
<p>The path looks like:</p>
<ol>
  <li><strong>Pre-launch:</strong> Supabase free tier ($0)</li>
  <li><strong>Early traction:</strong> Supabase Pro ($25/month)</li>
  <li><strong>Growth:</strong> Self-hosted on Hetzner ($20–50/month)</li>
  <li><strong>Scale:</strong> Self-hosted on better hardware ($50–200/month)</li>
</ol>

<h2>The Indie Hacker Stack in 2025</h2>
<p>The most popular indie hacker stack right now:</p>
<ul>
  <li><strong>Frontend:</strong> Next.js (App Router)</li>
  <li><strong>Backend:</strong> Supabase (Database + Auth + Storage)</li>
  <li><strong>Payments:</strong> Stripe or Lemon Squeezy</li>
  <li><strong>Email:</strong> Resend</li>
  <li><strong>Deployment:</strong> Vercel or Railway</li>
</ul>
<p>This stack lets a solo founder ship a full SaaS product with professional-grade infrastructure.</p>

<h2>Coming from Lovable Cloud?</h2>
<p>Many indie hackers started on Lovable Cloud because it was the fastest way to prototype. Once you have users and the bill starts growing, Supabase is the natural next step. You get the same speed of development with full data ownership and a clear path to cost-efficient scaling.</p>
<p><a href="/#contact">Our migration service is designed for indie hackers — fast, affordable, and with zero downtime.</a></p>`,
    faqs: [
      { q: "Can I use Supabase without knowing SQL?", a: "Yes. The JavaScript client's fluent API handles most queries without writing raw SQL. Supabase Studio also provides a table editor and GUI for managing data. SQL becomes useful for optimization and complex queries as you grow." },
      { q: "What's the Supabase free tier limitation I should know about?", a: "Free tier projects pause after 1 week of inactivity. Use the Pro plan ($25/month) once you have real users. Also, free tier has a 500MB database limit — enough for early stages but plan to upgrade." },
      { q: "Is Supabase reliable enough for a paid product?", a: "Yes. Supabase is used by thousands of production applications including public companies. Their Pro plan has a 99.9% uptime SLA. For maximum reliability, self-hosted with proper backups and monitoring is even more reliable." }
    ]
  },
  {
    title: "Supabase Production Security Guide: Harden Your Backend Before Launch",
    slug: "supabase-production-security-guide",
    excerpt: "A comprehensive security checklist for Supabase in production: RLS, API key management, auth hardening, rate limiting, and monitoring for suspicious activity.",
    meta_title: "Supabase Production Security Guide 2025 | Harden Before Launch",
    meta_description: "Secure your Supabase backend for production. Complete guide covering RLS policies, API key security, auth hardening, rate limiting, and security monitoring.",
    keywords: "supabase security, supabase production security, supabase rls security, secure supabase backend",
    category: "Supabase",
    tags: ["supabase", "security", "production", "rls", "auth"],
    featured_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    author: "Bilal Nazam",
    published_at: "2025-04-09T08:00:00Z",
    published: true,
    read_time: "8 min read",
    content: `<h2>Security Before You Launch</h2>
<p>A misconfigured Supabase backend is a serious security risk. Exposed API keys, missing RLS policies, or weak auth configuration can lead to data breaches. This guide covers every security layer you should configure before going to production.</p>

<h2>1. API Key Management</h2>
<p>Supabase has two key types with very different purposes:</p>
<ul>
  <li><strong>Anon key:</strong> Safe to expose on the client. Respects RLS policies. Only allows what your policies permit.</li>
  <li><strong>Service role key:</strong> Bypasses ALL security. Never expose to clients. Only use server-side.</li>
</ul>
<pre><code>// ✅ Safe: anon key in client code
const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// ✅ Safe: service role key in server-side only
const supabaseAdmin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)

// ❌ NEVER: service role key in client-side code or exposed in browser</code></pre>

<h2>2. Enable and Test RLS on Every Table</h2>
<pre><code>-- Verify all public tables have RLS enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Any table with rowsecurity = false is a security risk</code></pre>
<p>Test RLS as the anon role from the Supabase SQL editor:</p>
<pre><code>-- Test as anon user (no auth)
SET LOCAL role TO anon;
SELECT * FROM profiles; -- Should return 0 rows if RLS is correct</code></pre>

<h2>3. Auth Security Hardening</h2>
<pre><code>-- In Supabase Dashboard → Auth → Settings:
-- ✅ Enable email confirmation
-- ✅ Set minimum password length (12+)
-- ✅ Enable leaked password protection (HaveIBeenPwned)
-- ✅ Set session timeout
-- ✅ Restrict sign-up by email domain if needed</code></pre>

<p>For OAuth providers, only enable what you actually use. Each enabled provider is an additional attack surface.</p>

<h2>4. Validate JWT Claims in RLS</h2>
<p>Use JWT metadata to enforce additional access rules:</p>
<pre><code>-- Only allow verified email users
CREATE POLICY "verified_users_only" ON sensitive_data FOR SELECT
  USING (
    auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Only allow specific email domains
CREATE POLICY "company_email_only" ON internal_data FOR SELECT
  USING (
    auth.jwt() ->> 'email' LIKE '%@yourcompany.com'
  );</code></pre>

<h2>5. Protect Against Mass Data Export</h2>
<pre><code>-- Add rate limiting via custom claims or limit rows returned
CREATE POLICY "limit_export" ON user_data FOR SELECT
  USING (
    auth.uid() = user_id -- Users can only see their own data
    -- Combined with application-level pagination, prevents mass export
  );

-- For APIs, always use pagination
const { data } = await supabase
  .from('sensitive_table')
  .select('*')
  .limit(100) // Never allow unlimited selects</code></pre>

<h2>6. Input Validation for Edge Functions</h2>
<pre><code>// Always validate inputs in Edge Functions
serve(async (req) => {
  const body = await req.json()

  // Validate required fields
  if (!body.email || typeof body.email !== 'string') {
    return new Response('Invalid email', { status: 400 })
  }

  // Sanitize to prevent injection
  const email = body.email.trim().toLowerCase()
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return new Response('Invalid email format', { status: 400 })
  }

  // Proceed safely...
})</code></pre>

<h2>7. Secure Storage Buckets</h2>
<pre><code>-- Block direct public access to private buckets
-- In Supabase Dashboard → Storage → Bucket → Edit:
-- ✅ Set bucket to private
-- ✅ Add RLS policies for the storage.objects table

-- Restrict file types
CREATE POLICY "images_only" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'webp'))
    AND (metadata->>'size')::integer < 5242880 -- 5MB max
  );</code></pre>

<h2>8. Set Up Monitoring and Alerts</h2>
<ul>
  <li>Enable Supabase audit logs (Dashboard → Database → Logs)</li>
  <li>Set up alerts for unusual query volumes</li>
  <li>Monitor auth failure rates (high failures = potential attack)</li>
  <li>Use pg_stat_statements to detect unusual query patterns</li>
</ul>
<pre><code>-- Find unusual activity: user accessing many rows suddenly
SELECT
  auth.uid() as user_id,
  query,
  calls,
  rows
FROM pg_stat_statements
WHERE calls > 1000 -- Flag queries called more than 1000 times
ORDER BY calls DESC;</code></pre>

<h2>9. CORS Configuration</h2>
<p>In Supabase Dashboard → API Settings, set your API URL whitelist to only your actual domains. Don't leave it as wildcard (*) in production.</p>

<h2>Pre-Launch Security Checklist</h2>
<ul>
  <li>☐ Service role key is NOT in client code or git repo</li>
  <li>☐ RLS enabled on all public tables</li>
  <li>☐ All RLS policies tested as anon and authenticated</li>
  <li>☐ Auth email confirmation enabled</li>
  <li>☐ Storage buckets have appropriate policies</li>
  <li>☐ All API inputs validated in Edge Functions</li>
  <li>☐ CORS configured for your domains only</li>
  <li>☐ Monitoring and alerting configured</li>
</ul>
<p>Migrating from Lovable Cloud and want a security-first setup? <a href="/#contact">Our migration service includes a full security configuration review.</a></p>`,
    faqs: [
      { q: "Is Supabase secure for handling sensitive user data?", a: "Yes, when properly configured. The key is enabling RLS on all tables, keeping the service role key server-side only, and validating all inputs. Supabase infrastructure itself is SOC2 Type II certified." },
      { q: "Can hackers access my Supabase database if they get my anon key?", a: "Not if RLS is properly configured. The anon key only allows what your RLS policies permit. A well-configured RLS setup means the anon key is safe to expose publicly — it's designed to be." },
      { q: "How do I rotate compromised Supabase API keys?", a: "Go to Supabase Dashboard → Settings → API → Regenerate keys. This invalidates old keys immediately. Update your environment variables across all deployments. Your database data is not affected by key rotation." }
    ]
  }
];

async function seed() {
  console.log(`Seeding ${posts.length} blog posts (batch 2)...`);

  for (const post of posts) {
    const { data, error } = await supabase
      .from('posts')
      .upsert(post, { onConflict: 'slug' })
      .select('id, slug');

    if (error) {
      console.error(`❌ Failed: ${post.slug}`, error.message);
    } else {
      console.log(`✅ Upserted: ${post.slug}`);
    }
  }

  console.log('\nAll 20 posts seeded successfully!');
}

seed().catch(console.error);
