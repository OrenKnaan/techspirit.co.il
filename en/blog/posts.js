const BLOG_POSTS = [
  {
    slug:'questions-before-building',
    title:'4 Questions to Ask Before Building a Business Website',
    excerpt:'Questions that, if you don\'t ask them before the project, reveal you started from the wrong place after you\'ve already invested.',
    date:'June 3, 2026',d:'2026-06-03',read:'5 min',tag:'Planning',cat:'strategy',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'choosing-website-builder',
    title:'How to Choose a Website Builder That Fits You',
    excerpt:'What could save you a lot of headaches: understanding that the most common problem in website projects isn\'t the price, it\'s the fit.',
    date:'June 2, 2026',d:'2026-06-02',read:'5 min',tag:'Website Building',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'ethical-marketing',
    title:'Ethical Marketing for Your Business: Your Website Is Where Honesty Becomes Marketing',
    excerpt:'Ethical marketing doesn\'t mean weak marketing. If you have a good service and a clear target audience, a well-made website is the most honest marketing tool there is.',
    date:'June 7, 2026',d:'2026-06-07',read:'5 min',tag:'Marketing',cat:'seo',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'wordpress-hosting-israel',
    title:'WordPress Hosting in Israel: Why I Pay More and Don\'t Regret It',
    excerpt:'For years I tried cheap services. Until I understood that bad hosting costs you far more than the monthly savings.',
    date:'June 11, 2026',d:'2026-06-11',read:'5 min',tag:'Tools',cat:'tools',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'business-website',
    title:'Business Website: Why Relying Only on Social Media Is a Mistake',
    excerpt:'Your social networks belong to the social networks, not to you. Your website belongs to you. That difference matters more than people think.',
    date:'June 16, 2026',d:'2026-06-16',read:'5 min',tag:'Website Building',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'website-content',
    title:'Writing Website Content: A Lesson from Nonviolent Communication',
    excerpt:'The most common problem on therapists\' websites: they write about themselves, not about the client. One lesson from NVC will change that.',
    date:'June 23, 2026',d:'2026-06-23',read:'5 min',tag:'Content',cat:'seo',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'online-presence',
    title:'Building an Online Presence: What I Learned from Reality Creation',
    excerpt:'The difference between a website that works and one that doesn\'t is usually not the tools. It\'s the intention behind it.',
    date:'June 19, 2026',d:'2026-06-19',read:'5 min',tag:'Strategy',cat:'strategy',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'spiritual-business-website',
    title:'Building a Website for a Spiritual Business: 5 Things I Learned from Projects',
    excerpt:'A website for a spiritual business is different. It needs to build trust, reflect personality, and speak to an audience looking for resonance, not features.',
    date:'June 28, 2026',d:'2026-06-28',read:'5 min',tag:'Website Building',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'website-cost',
    title:'How Much Does It Cost to Build a Website? 2026 Price Guide',
    excerpt:'Website building prices in Israel: what determines the price, freelancer vs. agency, what\'s included and what isn\'t, and what to ask before you sign.',
    date:'June 9, 2026',d:'2026-06-09',read:'8 min',tag:'Website Building',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'diy-website-with-ai',
    title:'Build Your Own Website with AI or Hire a Professional?',
    excerpt:'AI has changed what you can build on your own. A practical guide: when to build a website yourself and when it\'s worth hiring a professional in Israel.',
    date:'July 21, 2026',d:'2026-07-21',read:'7 min',tag:'Website Building',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'landing-page-cost',
    title:'How Much Does a Landing Page Cost? 2026 Price Guide',
    excerpt:'Landing page prices in Israel: what determines conversion, when to choose a landing page versus a full website, and what to ask before you order.',
    date:'June 16, 2026',d:'2026-06-16',read:'7 min',tag:'Landing Page',cat:'website',feat:false,published:true,weeklyViews:0
  }
];
if (typeof module !== 'undefined') module.exports = BLOG_POSTS;

if (typeof document !== 'undefined') document.querySelectorAll('details.fi').forEach(function(d){
  d.addEventListener('click',function(e){
    if(!e.target.closest('summary'))return;
    e.preventDefault();
    if(d.classList.contains('is-open')){
      d.classList.remove('is-open');
      setTimeout(function(){d.removeAttribute('open');},110);
    }else{
      d.setAttribute('open','');
      requestAnimationFrame(function(){d.classList.add('is-open');});
    }
  });
});
