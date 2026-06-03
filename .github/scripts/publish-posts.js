// Runs in GitHub Actions. Checks posts.js for posts due today or earlier,
// moves their folders from future-posts/ to blog/, updates sitemap.xml,
// and flips published:true in posts.js.
'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..', '..');
const POSTS_JS   = path.join(ROOT, 'blog', 'posts.js');
const SITEMAP    = path.join(ROOT, 'sitemap.xml');
const FUTURE_DIR = path.join(ROOT, 'blog', 'future-posts');
const BLOG_DIR   = path.join(ROOT, 'blog');

const today = new Date();
today.setHours(0, 0, 0, 0);

const posts = require(POSTS_JS);
let postsContent = fs.readFileSync(POSTS_JS, 'utf8');
const published = [];

for (const post of posts) {
  if (post.published || !post.publishDate) continue;

  const due = new Date(post.publishDate);
  if (due > today) continue;

  console.log(`Publishing: ${post.slug} (due ${post.publishDate})`);

  // 1. Flip published:false → true in posts.js source
  const pos = postsContent.indexOf(`slug:'${post.slug}'`);
  if (pos !== -1) {
    const before = postsContent.slice(0, pos);
    const after  = postsContent.slice(pos).replace('published:false', 'published:true');
    postsContent = before + after;
  }

  // 2. Move folder: future-posts/slug/ → blog/slug/
  const src = path.join(FUTURE_DIR, post.slug);
  const dst = path.join(BLOG_DIR, post.slug);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dst);
    console.log(`  Moved  : future-posts/${post.slug}/ → blog/${post.slug}/`);
  } else {
    console.log(`  Warning: folder not found at future-posts/${post.slug}/`);
  }

  // 3. Add entry to sitemap.xml (before closing </urlset>)
  const sitemapEntry = `  <url><loc>https://techspirit.co.il/blog/${post.slug}/</loc>` +
    `<lastmod>${post.publishDate}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
  const sitemap = fs.readFileSync(SITEMAP, 'utf8');
  fs.writeFileSync(SITEMAP, sitemap.replace('</urlset>', sitemapEntry + '\n</urlset>'), 'utf8');
  console.log(`  Sitemap: added entry`);

  published.push(post.slug);
}

if (published.length === 0) {
  console.log('No posts due today.');
  process.exit(0);
}

fs.writeFileSync(POSTS_JS, postsContent, 'utf8');
console.log(`\nDone. Published: ${published.join(', ')}`);
