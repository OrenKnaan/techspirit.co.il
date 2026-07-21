const BLOG_POSTS = [
  {
    slug:'שאלות-לפני-בניית-אתר',
    title:'4 שאלות שצריך לשאול לפני שבונים אתר לעסק',
    excerpt:'שאלות שאם לא שואלים אותן לפני הפרויקט, מגלים שהתחלנו מנקודה הלא נכונה אחרי שכבר השקענו.',
    date:'3 ביוני 2026',d:'2026-06-03',read:'5 דק׳',tag:'תכנון',cat:'strategy',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'בחירת-בונה-אתרים',
    title:'איך לבחור בונה אתרים שמתאים לך',
    excerpt:'מה שעשוי לחסוך לך הרבה כאב ראש: להבין שהבעיה הכי נפוצה בפרויקטי אתרים היא לא המחיר, היא ההתאמה.',
    date:'2 ביוני 2026',d:'2026-06-02',read:'5 דק׳',tag:'בניית אתרים',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'שיווק-אתי-לעסק',
    title:'שיווק אתי לעסק: האתר הוא המקום שבו הכנות הופכת לשיווק',
    excerpt:'שיווק אתי לא אומר שיווק חלש. אם יש לך שירות טוב וקהל יעד ברור, אתר שעשוי נכון הוא הכלי השיווקי הכי כנה שיש.',
    date:'7 ביוני 2026',d:'2026-06-07',read:'5 דק׳',tag:'שיווק',cat:'seo',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'אחסון-אתרים-וורדפרס',
    title:'אחסון אתרים וורדפרס בישראל: למה אני משלם יותר ולא מצטער',
    excerpt:'שנים ניסיתי שירותים זולים. עד שהבנתי ששירות אחסון גרוע עולה לך הרבה יותר מהחסכון החודשי.',
    date:'11 ביוני 2026',d:'2026-06-11',read:'5 דק׳',tag:'כלים',cat:'tools',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'אתר-אינטרנט-לעסק',
    title:'אתר אינטרנט לעסק: למה להסתמך רק על רשתות חברתיות זו טעות',
    excerpt:'הרשתות החברתיות שלך שייכות לרשתות החברתיות, לא לך. האתר שלך שייך לך. ההבדל הזה חשוב יותר ממה שחושבים.',
    date:'16 ביוני 2026',d:'2026-06-16',read:'5 דק׳',tag:'בניית אתרים',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'כתיבת-תוכן-לאתר',
    title:'כתיבת תוכן לאתר: שיעור מתקשורת מקרבת',
    excerpt:'הבעיה הכי נפוצה באתרים של מטפלים: הם כותבים על עצמם, לא על הלקוח. שיעור אחד מ-NVC ישנה את זה.',
    date:'23 ביוני 2026',d:'2026-06-23',read:'5 דק׳',tag:'תוכן',cat:'seo',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'נוכחות-אינטרנטית',
    title:'לבנות נוכחות אינטרנטית: מה שלמדתי מיצירת מציאות',
    excerpt:'ההבדל בין אתר שעובד לאתר שלא הוא לרוב לא בכלים. הוא בכוונה שמאחוריו.',
    date:'19 ביוני 2026',d:'2026-06-19',read:'5 דק׳',tag:'אסטרטגיה',cat:'strategy',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'אתר-לעסק-רוחני',
    title:'בניית אתר לעסק רוחני: 5 דברים שלמדתי בפרויקטים',
    excerpt:'אתר לעסק רוחני שונה. הוא צריך לבנות אמון, לשקף אישיות, ולדבר לקהל שמחפש תהודה לא פיצ׳רים.',
    date:'28 ביוני 2026',d:'2026-06-28',read:'5 דק׳',tag:'בניית אתרים',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'מחיר-בניית-אתר',
    title:'כמה עולה לבנות אתר אינטרנט? מחירון עדכני לשנת 2026',
    excerpt:'מחיר בניית אתר בישראל: מה קובע את המחיר, פרילנסר מול סוכנות, מה כלול ומה לא, ומה שואלים לפני שחותמים.',
    date:'9 ביוני 2026',d:'2026-06-09',read:'8 דק׳',tag:'בניית אתרים',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'בניית-אתר-לבד',
    title:'לבנות אתר לבד עם AI או לשכור איש מקצוע?',
    excerpt:'AI שינה מה שאפשר לבנות לבד. מדריך מעשי: מתי לבנות אתר לבד ומתי שווה לשכור איש מקצוע בישראל.',
    date:'21 ביולי 2026',d:'2026-07-21',read:'7 דק׳',tag:'בניית אתרים',cat:'website',feat:false,published:true,weeklyViews:0
  },
  {
    slug:'מחיר-דף-נחיתה',
    title:'כמה עולה לבנות דף נחיתה? מחירון עדכני לשנת 2026',
    excerpt:'מחיר דף נחיתה בישראל: מה קובע את ההמרה, מתי כדאי דף נחיתה מול אתר מלא, ומה שואלים לפני שמזמינים.',
    date:'16 ביוני 2026',d:'2026-06-16',read:'7 דק׳',tag:'דף נחיתה',cat:'website',feat:false,published:true,weeklyViews:0
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
