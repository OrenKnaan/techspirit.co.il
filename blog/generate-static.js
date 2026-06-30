#!/usr/bin/env node
// Regenerates the <noscript> fallback in blog/index.html from posts.js.
// Run after every post publish. Googlebot reads this during its first-pass
// crawl before JS rendering; human visitors see the JS-rendered grid.

const fs = require('fs');
const path = require('path');
const BLOG_POSTS = require('./posts.js');

const published = BLOG_POSTS
  .filter(p => p.published)
  .sort((a, b) => b.d.localeCompare(a.d));

const items = published.map(p =>
  `    <article>
      <h2><a href="/blog/${p.slug}/">${p.title}</a></h2>
      <p>${p.excerpt}</p>
      <p><time datetime="${p.d}">${p.date}</time> · ${p.read}</p>
    </article>`
).join('\n');

const block = `<noscript>
  <section aria-label="רשימת מאמרים">
${items}
  </section>
</noscript>`;

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const marker = /<!-- STATIC-POSTS-START -->[\s\S]*?<!-- STATIC-POSTS-END -->/;
const wrapped = `<!-- STATIC-POSTS-START -->\n${block}\n<!-- STATIC-POSTS-END -->`;

if (marker.test(html)) {
  html = html.replace(marker, wrapped);
} else {
  html = html.replace('</main>', `${wrapped}\n</main>`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log(`✓ Injected static fallback for ${published.length} posts`);
