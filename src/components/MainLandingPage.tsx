import { useState, FormEvent, useEffect, type ReactNode } from 'react';
import { 
  Camera, 
  TrendingUp, 
  Trophy, 
  UserPlus, 
  Wind, 
  Hand, 

  CheckCircle2, 
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  DollarSign,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CashCubePhoto from './CashCubePhoto';

export default function MainLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  });

  useEffect(() => {
    document.title = 'תא כסף לאירועים | CASH CUBE - כסף על הרצפה';
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || ''
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...utmParams }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setSubmitError('חלה שגיאה בשליחת הטופס. אנא נסו שוב או פנו אלינו טלפונית.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitError('חלה שגיאה בתקשורת עם השרת. אנא נסו שוב או צרו קשר ישיר בוואטסאפ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs: { q: string; a: ReactNode }[] = [
    {
      q: 'מה זה תא כסף?',
      a: 'תא כסף (המוכר גם בשמות Cash Cube או תא דולרים) הוא מתקן שקוף ומרהיב הפועל באמצעות מערכת מפוחים מיוחדת. האורח נכנס לתא, וברגע הפעלת הטורנדו שטרות כסף, דולרים או שוברי פרס מתעופפים סביבו במהירות גבוהה במטרה לתפוס כמה שיותר שטרות בזמן קצוב.'
    },
    {
      q: 'איך עובד Cash Cube?',
      a: 'המשתתף נכנס לתא השקוף ומרכיב משקפי מגן. עם הפעלת הטיימר ומפוח האוויר, שטרות הכסף מתחילים להתעופף במערבולת מהירה. המשתתף מנסה לתפוס באוויר כמה שיותר שטרות בידיים בלבד לפני שתם הזמן.'
    },
    {
      q: 'כמה זמן נמשך סיבוב בתא?',
      a: 'סיבוב ממוצע נמשך בין 30 ל-45 שניות. משך זמן זה מספק רמת אדרנלין ואקשן מקסימלית למשתתף ומאפשר תחלופה מהירה כך שכל האורחים באירוע יוכלו ליהנות מהאטרקציה ללא תורים ארוכים.'
    },
    {
      q: 'לאילו אירועים תא כסף מתאים?',
      a: 'תא כסף מתאים למגוון עצום של אירועים: ימי הולדת, חתונות, בר ובת מצווה, אירועי חברה וערבי גיבוש, מסיבות עובדים, השקות מוצר, כנסים מקצועיים, תערוכות ופעילויות קידום מכירות בקניונים ובחנויות.'
    },
    {
      q: 'באילו שטרות משתמשים בתא הכסף?',
      a: 'האטרקציה מגיעה עם שטרות דמויי שקלים ושוברים (אפשר להזמין מראש שטרות דמויי דולרים) המתעופפים במערבולת האוויר בתוך התא. השטרות מותאמים במיוחד לזרימת אוויר אופטימלית ומעניקים חוויית תפיסת כסף סוחפת ומלאת אדרנלין.'
    },
    {
      q: 'האם האטרקציה מתאימה לחתונה?',
      a: 'כן! תא כסף לחתונה הוא שוס ענק ברחבת הריקודים ובקבלת הפנים. הוא יוצר התרגשות מדהימה, תמונות וסרטוני וידאו ויראליים לרשתות החברתיות (אינסטגרם וטיקטוק), ומעניק לאורחים חוויה בלתי נשכחת.'
    },
    {
      q: 'האם תא הכסף מתאים לבר ובת מצווה?',
      a: 'תא כסף הוא אחת האטרקציות המובילות והאהובות ביותר לנוער בבר מצווה ובת מצווה. הנערים והנערות מתחרים ביניהם מי יתפוס הכי הרבה כסף, והאווירה סביב התא מחשמלת ומלאת צחוק ועידוד.'
    },
    {
      q: 'כמה מקום צריך בשביל להציב את התא?',
      a: 'התקנת תא הכסף דורשת שטח נקי של כ-2 על 2 מטרים ושקע חשמל סטנדרטי (220V). אנו דואגים להובלה, התקנה ותפעול מלא לאורך כל האירוע על ידי איש צוות מקצועי.'
    },
    {
      q: 'לאן אנחנו מגיעים?',
      a: (
        <div className="space-y-4">
          <p>
            אנחנו מגיעים עם תא הכסף CASH CUBE לאירועים פרטיים ועסקיים בערים הבאות, בתיאום מראש ובכפוף לזמינות.
          </p>

          <div>
            <strong className="block text-gold font-bold text-base sm:text-lg mb-1.5">
              ללא תוספת נסיעה מעבר למחיר החבילה:
            </strong>
            <p className="text-gray-300 leading-relaxed">
              נתניה, הרצליה, רמת השרון, רעננה, כפר סבא, הוד השרון, כפר יונה וחדרה.
            </p>
          </div>

          <div>
            <strong className="block text-gold font-bold text-base sm:text-lg mb-1.5">
              בתוספת נסיעה בהתאם למיקום האירוע:
            </strong>
            <p className="text-gray-300 leading-relaxed">
              תל אביב־יפו, רמת גן, גבעתיים, בני ברק, חולון, בת ים, אור יהודה, קריית אונו, גבעת שמואל, גני תקווה, יהוד־מונוסון, פתח תקווה, ראש העין, אלעד, ראשון לציון, רחובות, נס ציונה, יבנה, באר יעקב, לוד, רמלה, מודיעין־מכבים־רעות, אריאל, מודיעין עילית, אשדוד, אשקלון, באר שבע, אופקים, נתיבות, שדרות, קריית גת, קריית מלאכי, דימונה, ערד, אילת, אור עקיבא, חריש, חיפה, נשר, טירת כרמל, קריית אתא, קריית ביאליק, קריית מוצקין, קריית ים, יקנעם עילית, עפולה, מגדל העמק, נוף הגליל, בית שאן, טבריה, עכו, נהריה, כרמיאל, מעלות־תרשיחא, צפת, קריית שמונה, ירושלים, בית שמש, מעלה אדומים, ביתר עילית וגבעת זאב.
            </p>
          </div>

          <p className="pt-1">
            תוספת הנסיעה תימסר מראש במסגרת הצעת המחיר. האירוע שלכם ביישוב שלא מופיע ברשימה?{' '}
            <a
              href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%91%D7%93%D7%95%D7%A7%20%D7%96%D7%9E%D7%99%D7%A0%D7%95%D7%AA%20%D7%95%D7%A2%D7%9C%D7%95%D7%AA%20%D7%94%D7%92%D7%A2%D7%94%20%D7%A2%D7%91%D7%95%D7%A8%20%D7%AA%D7%90%20%D7%9B%D7%A1%D7%A3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-bold inline-flex items-center gap-1"
            >
              שלחו לנו בוואטסאפ
            </a>{' '}
            את המיקום והתאריך ונבדוק זמינות ועלות הגעה.
          </p>
        </div>
      )
    },
    {
      q: 'איך מזמינים תא כסף לאירוע?',
      a: (
        <p className="leading-relaxed">
          פשוט מאוד! משאירים פרטים בטופס באתר, מתקשרים למספר{' '}
          <a
            href="tel:0528109400"
            className="inline-flex items-center gap-1.5 px-3 py-1 my-1 mx-1 rounded-full bg-gold/15 text-gold border border-gold/40 hover:bg-gold hover:text-black font-bold text-sm transition-all align-middle shadow-sm hover:shadow-[0_0_15px_rgba(230,177,75,0.4)] group cursor-pointer"
            aria-label="התקשרו למספר 052-8109400"
          >
            <Phone className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
            <span dir="ltr" className="tracking-wide">052-8109400</span>
          </a>{' '}
          או שולחים{' '}
          <a
            href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%95%D7%94%D7%A6%D7%A2%D7%AA%20%D7%9E%D7%97%D7%99%D7%A8%20%D7%9C%D7%AA%D7%90%20%D7%9B%D7%A1%D7%A3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 my-1 mx-1 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-black font-bold text-sm transition-all align-middle shadow-sm hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] group cursor-pointer"
            aria-label="שליחת הודעת וואטסאפ מהירה"
          >
            <MessageCircle className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            <span>הודעת וואטסאפ מהירה</span>
          </a>
          . אנו נתאים עבורכם את החבילה המושלמת לתאריך ולאופי האירוע שלכם.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-matte-black text-white selection:bg-gold selection:text-black">
      {/* Header/Nav */}
      <header className="fixed top-0 w-full z-50 bg-matte-black/90 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <a 
                href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%A6%D7%A2%D7%AA%20%D7%9E%D7%97%D7%99%D7%A8%20%D7%9C%D7%90%D7%98%D7%A8%D7%A7%D7%A6%D7%99%D7%99%D7%AA%20%22%D7%9B%D7%A1%D7%A3%20%D7%A2%D7%9C%20%D7%94%D7%A8%D7%A6%D7%A4%D7%94%22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                title="צ'אט וואטסאפ להזמנת תא כסף"
                aria-label="שלחו לנו הודעה בוואטסאפ"
              >
                <MessageCircle className="w-5 h-5 text-white fill-white" />
              </a>
              <a 
                href="tel:0528109400" 
                className="w-11 h-11 bg-gold rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                title="התקשרו אלינו להזמנת תא כסף"
                aria-label="התקשרו אלינו 052-8109400"
              >
                <Phone className="w-5 h-5 text-matte-black fill-matte-black" />
              </a>
            </div>
            <a 
              href="#contact" 
              className="hidden sm:inline-flex bg-gold text-matte-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20 active:scale-95"
            >
              הזמינו תא כסף לאירוע
            </a>
          </div>

          <nav className="hidden lg:flex gap-6 text-sm font-medium" aria-label="ניווט ראשי">
            <a href="#about" className="hover:text-gold transition-colors">מה זה תא כסף?</a>
            <a href="#how-it-works" className="hover:text-gold transition-colors">איך זה עובד?</a>
            <a href="#use-cases" className="hover:text-gold transition-colors">אירועים מתאימים</a>
            <a href="#benefits" className="hover:text-gold transition-colors">למה לבחור בנו?</a>
            <a href="#faq" className="hover:text-gold transition-colors">שאלות נפוצות</a>
            <a href="#contact" className="hover:text-gold transition-colors">צור קשר</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="/" className="text-xl sm:text-2xl font-black gold-text-gradient tracking-tighter hover:opacity-90 transition-opacity">
              כסף על הרצפה
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate pt-24 pb-16 md:pt-44 md:pb-32 overflow-hidden border-b border-white/5" aria-label="היכרות עם תא כסף לאירועים">
          {/* Background Flying Money */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img 
              src="/flyingmoney.jpeg" 
              alt="שטרות כסף מתעופפים ברקע אטרקציית תא כסף לאירועים" 
              className="w-full h-full object-cover object-center opacity-65"
              width="2048"
              height="1117"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-matte-black/85 via-matte-black/50 to-matte-black"></div>
            <div className="absolute inset-0 bg-matte-black/25"></div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[140px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green rounded-full blur-[140px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-16 flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center md:text-right"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm md:text-base font-bold mb-6">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <span>כסף על הרצפה – לא תיקח?</span>
              </div>
              
              {/* Only ONE H1 Tag on the entire page */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                תא כסף לאירועים <br className="hidden sm:inline" />
                <span className="gold-text-gradient">חוויית CASH CUBE</span> שכולם מדברים עליה
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                אטרקציית תפיסת כסף ומזומנים מעופפים שהופכת כל אירוע למערבולת של אדרנלין, התרגשות ובאזז מטורף ברשתות החברתיות.
                <br />
                מושלם לחתונות, בר/בת מצווה, אירועי חברה והשקות יוקרתיות בפריסה ארצית.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                <a 
                  href="#contact" 
                  className="cta-button w-full max-w-[260px] sm:w-[260px] h-[64px] !py-0 !px-4 inline-flex items-center justify-center text-center text-[15px] sm:text-base font-bold shadow-xl shadow-gold/25 rounded-full"
                >
                  <div className="flex flex-col items-center justify-center text-center leading-tight">
                    <span className="whitespace-nowrap">הזמינו תא כסף לאירוע</span>
                    <span className="whitespace-nowrap">עכשיו</span>
                  </div>
                </a>
                <a 
                  href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%A6%D7%A2%D7%AA%20%D7%9E%D7%97%D7%99%D7%A8%20%D7%9C%D7%90%D7%98%D7%A8%D7%A7%D7%A6%D7%99%D7%99%D7%AA%20%22%D7%9B%D7%A1%D7%A3%20%D7%A2%D7%9C%20%D7%94%D7%A8%D7%A6%D7%A4%D7%94%22"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="בואו נבדוק אם התאריך שלכם פנוי בוואטסאפ"
                  className="group w-full max-w-[260px] sm:w-[260px] h-[64px] !py-0 !px-4 inline-flex items-center justify-center text-center gap-2.5 bg-[#25D366]/20 border border-[#25D366]/50 text-white hover:bg-[#25D366] hover:text-white rounded-full font-bold text-[15px] sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#25D366]/10"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors shrink-0" />
                  <div className="flex flex-col items-center justify-center text-center leading-tight">
                    <span className="whitespace-nowrap">בואו נבדוק אם התאריך</span>
                    <span className="whitespace-nowrap">שלכם פנוי</span>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex-1 relative w-full max-w-lg md:max-w-none"
            >
              <CashCubePhoto />
            </motion.div>
          </div>

          {/* Symmetrical Full-Width Trust Metrics Bar */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 mt-4 md:mt-8">
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold mb-1">100%</div>
                <div className="text-sm sm:text-base text-gray-300 font-medium">חוויה סוחפת</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold mb-1">בפריסה ארצית</div>
                <div className="text-sm sm:text-base text-gray-300 font-medium">הגעה לכל יעד</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold mb-1">צוות מפעיל</div>
                <div className="text-sm sm:text-base text-gray-300 font-medium">אופציה לליווי מלא באירוע</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Cash Cube Section (SEO Content) */}
        <section id="about" className="py-24 bg-zinc-950/70 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="gold-eyebrow">הסבר על האטרקציה</span>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-6">
                מה זה <span className="gold-text-gradient">תא כסף (CASH CUBE)</span>?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                אטרקציית תא כסף המוכרת בעולם כ-<strong>Cash Cube</strong> או <strong>תא דולרים ומכונת כסף</strong> היא מתקן שקוף ויוקרתי המצויד במערכת שאיבה וזרימת אוויר מתקדמת.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6 text-gold leading-relaxed text-base sm:text-lg">
                <p>
                  כאשר משתתף נכנס לתוך התא השקוף, המפוח העוצמתי יוצר מערבולת אוויר (טורנדו) המעיפה מאות שטרות כסף, שוברים או קופוני זכייה במהירות סביבו. המטרה של המשתתף היא לתפוס באוויר כמה שיותר שטרות בפרק זמן קצוב של 30 עד 45 שניות.
                </p>
                <p>
                  תא הכסף מבית <strong className="text-gold-light font-bold">"כסף על הרצפה"</strong> בנוי בעיצוב יוקרתי בגווני שחור וזהב. זהו שילוב ממכר של תחרות, אדרנלין והנאה צרופה שמתאימה לכל גיל.
                </p>
              </div>

              <div className="bg-matte-black p-8 rounded-3xl border border-gold/30 shadow-xl space-y-6">
                <h3 className="text-2xl font-bold text-gold border-b border-gold/20 pb-4">
                  למה זו אטרקציית האירועים המובילה בישראל?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                    <span><strong>מעורבות קהל של 100%:</strong> כל האורחים מתאספים, מריעים ומעודדים את המשתתף בתוך התא.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                    <span><strong>קצב תחלופה מהיר:</strong> עשרות אורחים מספיקים לחוות את האטרקציה במהלך האירוע ללא תורים מייגעים.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                    <span><strong>אופציה להגעה של איש צוות מלווה:</strong> המנחה כל אורח.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="gold-eyebrow">פשוט, מהיר ומחשמל</span>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-4">
                איך עובדת אטרקציית <span className="gold-text-gradient">CASH CUBE</span>?
              </h2>
              <p className="text-gray-400">4 שלבים פשוטים לחוויית תפיסת כסף בלתי נשכחת באירוע שלכם</p>
            </div>
            
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gold/20 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  { 
                    icon: UserPlus, 
                    step: '01', 
                    title: 'נכנסים לתא הכסף', 
                    desc: 'המשתתף מקבל תדרוך קצר, מרכיב משקפי מגן ונכנס לתא השקוף והמעוצב.' 
                  },
                  { 
                    icon: Wind, 
                    step: '02', 
                    title: 'האוויר נדלק והשטרות עפים', 
                    desc: 'המפוח העוצמתי יוצר מערבולת שטרות סוחפת שממריאה לכל עבר ב-360 מעלות.' 
                  },
                  { 
                    icon: Hand, 
                    step: '03', 
                    title: 'תופסים כמה שיותר כסף', 
                    desc: '30-45 שניות של אדרנלין טהור לתפוס כמה שיותר שטרות מעופפים באוויר.' 
                  },
                  { 
                    icon: Trophy, 
                    step: '04', 
                    title: 'סופרים ומנצחים', 
                    desc: 'יוצאים החוצה לקול תשואות האורחים, סופרים את המזומנים ומקבלים פרס או מזכרת!' 
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col items-center text-center bg-matte-black/90 p-8 rounded-2xl border border-gold/20 hover:border-gold/50 transition-colors shadow-lg"
                  >
                    <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-6 shadow-xl shadow-gold/20 relative">
                      <item.icon className="w-9 h-9 text-matte-black" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-matte-black rounded-full border-2 border-gold flex items-center justify-center font-bold text-xs text-gold">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-14 text-center">
              <a href="#contact" className="cta-button inline-flex items-center gap-2 text-base py-3 px-8">
                <span>רוצים תא כסף באירוע שלכם? שריינו תאריך עכשיו</span>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-zinc-900/60 py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="gold-eyebrow">היתרונות שלנו</span>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-4">
                למה לבחור ב-<span className="gold-text-gradient">CASH CUBE</span> שלנו?
              </h2>
              <p className="text-gray-400">חוויה יוקרתית, ציוד פרימיום ושירות ללא פשרות בכל רחבי ישראל</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: Camera, 
                  title: 'מושך קהל ויוצר באז חברתי', 
                  desc: 'התא השקוף מרכז אליו את תשומת הלב של כל האורחים, ומייצר אינסוף סרטונים והתרגשות.',
                  color: 'text-gold' 
                },
                { 
                  icon: DollarSign, 
                  title: 'תחושת שפע ויוקרה לכל אירוע', 
                  desc: 'עיצוב פרימיום בגווני שחור וזהב שמשתלב מושלם עם אירועים יוקרתיים ומשדר רמה אחת מעל כולם.',
                  color: 'text-gold' 
                },
                { 
                  icon: Trophy, 
                  title: 'חוויה מדהימה ובלתי נשכחת', 
                  desc: 'האורחים או הלקוחות שלכם יזכרו את האירוע עוד זמן רב בזכות חוויית האדרנלין והכיף הייחודית.',
                  color: 'text-gold' 
                },
                { 
                  icon: ShieldCheck, 
                  title: 'בטיחות מלאה ומפעיל צמוד', 
                  desc: 'אנו מספקים איש צוות מקצועי שמלווה, מתפעל ומדריך את המשתתפים לכל אורך האירוע.',
                  color: 'text-gold' 
                },
                { 
                  icon: Clock, 
                  title: 'הגעה דייקנית בפריסה ארצית', 
                  desc: 'אנו מגיעים לכל מקום בארץ – מרכז, ירושלים, שרון, שפלה, צפון ודרום, עם הקמה מהירה ועמידה בזמנים.',
                  color: 'text-gold' 
                }
              ].map((benefit, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-matte-black p-8 rounded-3xl border border-gold/15 text-center hover:border-gold/40 transition-all group flex flex-col items-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section with H2 & H3s for SEO */}
        <section id="use-cases" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="gold-eyebrow">התאמה מושלמת</span>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-4">
                לאילו אירועים מתאים <span className="gold-text-gradient">תא הכסף</span>?
              </h2>
              <p className="text-gray-400">אטרקציה רב-תכליתית שמקפיצה כל חגיגה פרטית, עסקית או מסחרית</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.article 
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg"
              >
                <img 
                  src="/private.jpg" 
                  alt="תא כסף לחתונות ולאירועים פרטיים - CASH CUBE לחתונה"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="400"
                  height="533"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-gold mb-2">תא כסף לחתונות</h3>
                  <p className="text-xs text-gray-300">אטרקציה מדהימה לקבלת הפנים ולרחבת הריקודים שמשאירה את האורחים פעורי פה.</p>
                </div>
              </motion.article>

              <motion.article 
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg"
              >
                <img 
                  src="/companyparty.jpg" 
                  alt="תא כסף לאירועי חברה וערבי גיבוש - אטרקציות לאירועים עסקיים"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="400"
                  height="533"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-gold mb-2">תא כסף לאירועי חברה</h3>
                  <p className="text-xs text-gray-300">מרימים את האנרגיה בערב גיבוש, מסיבת סוף שנה או כנס חברה עם תחרות תפיסת שטרות.</p>
                </div>
              </motion.article>

              <motion.article 
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg"
              >
                <img 
                  src="/launch.jpg" 
                  alt="אטרקציית תפיסת כסף להשקות מוצר וכנסים"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="400"
                  height="533"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-gold mb-2">השקות מוצר וכנסים</h3>
                  <p className="text-xs text-gray-300">מושכים קהל לביתן בתערוכה ומייצרים עניין שיא סביב הפעילות עם אטרקציית תפיסת כסף סוחפת ומגנטית.</p>
                </div>
              </motion.article>

              <motion.article 
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg"
              >
                <img 
                  src="/retail.jpg" 
                  alt="תא דולרים ומכונת כסף לבר מצווה ובת מצווה וקניונים"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="400"
                  height="533"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-gold mb-2">תא דולרים לבר ובת מצווה</h3>
                  <p className="text-xs text-gray-300">האטרקציה המבוקשת ביותר לנוער, תחרות תפיסת שטרות מלאה באדרנלין, צחוק וסטוריז.</p>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section (Schema-aligned) */}
        <section id="faq" className="py-24 bg-zinc-950/80 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="gold-eyebrow">שאלות ותשובות</span>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-4">
                שאלות נפוצות על <span className="gold-text-gradient">תא כסף לאירועים</span>
              </h2>
              <p className="text-gray-400">ריכזנו עבורכם תשובות מקיפות לכל השאלות הנפוצות לגבי אטרקציית Cash Cube</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index} 
                    className="bg-matte-black border border-gold/20 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      id={`faq-btn-${index}`}
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-lg sm:text-xl text-white hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${index}`}
                          role="region"
                          aria-labelledby={`faq-btn-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 pt-2 text-gray-300 leading-relaxed border-t border-white/5 text-base">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center p-6 rounded-2xl bg-zinc-900 border border-gold/20">
              <p className="text-gray-300 mb-4">יש לכם שאלה נוספת לגבי תא הכסף או תאריך ספציפי?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="tel:0528109400" 
                  className="inline-flex items-center gap-2 bg-gold text-matte-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gold-light transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>חייגו: 052-8109400</span>
                </a>
                <a 
                  href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%90%D7%95%D7%9C%20%D7%A9%D7%90%D7%9C%D7%94%20%D7%A2%D7%9C%20%D7%AA%D7%90%20%D7%9B%D7%A1%D7%A3%20%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>שיחה בוואטסאפ</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]"></div>
          
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-matte-black p-8 md:p-12 rounded-[2rem] border-2 border-gold/30 shadow-2xl">
              <span className="gold-eyebrow block text-center mb-2">קבלת הצעה מהירה</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                הזמינו <span className="gold-text-gradient">תא כסף לאירוע</span> שלכם
              </h2>
              <p className="text-center text-gray-400 mb-8">
                השאירו פרטים ונחזור אליכם בהקדם עם הצעת מחיר מותאמת אישית ובדיקת זמינות לתאריך שלכם.
              </p>
              
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-zinc-900 border border-gold/40 text-center space-y-4">
                  <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">פנייתך התקבלה בהצלחה!</h3>
                  <p className="text-gray-300 max-w-md mx-auto">
                    תודה שיצרתם קשר. נחזור אליכם בהקדם האפשרי עם הצעת מחיר משתלמת לתא כסף לאירוע שלכם.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%A9%D7%9C%D7%97%D7%AA%D7%99%20%D7%A4%D7%A0%D7%99%D7%99%D7%94%20%D7%91%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%9E%D7%A2%D7%A0%D7%97%20%D7%9E%D7%94%D7%99%D7%A8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>מענה מהיר בוואטסאפ</span>
                    </a>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-gray-400 hover:text-gold transition-colors underline"
                    >
                      שליחת פנייה נוספת
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-sm text-center">
                      {submitError}
                    </div>
                  )}
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium mb-2 text-gold">שם מלא</label>
                    <input 
                      id="lead-name"
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="ישראל ישראלי"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="lead-phone" className="block text-sm font-medium mb-2 text-gold">מספר טלפון</label>
                      <input 
                        id="lead-phone"
                        type="tel" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-gold focus:outline-none transition-colors"
                        placeholder="050-0000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-email" className="block text-sm font-medium mb-2 text-gold">אימייל</label>
                      <input 
                        id="lead-email"
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-gold focus:outline-none transition-colors"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="cta-button w-full text-xl mt-4 py-4 shadow-xl shadow-gold/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'שולח...' : 'שלחו פנייה לקבלת הצעת מחיר'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
            {/* Direct Contact (Right) */}
            <div className="space-y-6 text-right">
              <h3 className="text-lg font-bold gold-text-gradient uppercase tracking-tight">צרו קשר ישיר</h3>
              <div className="flex flex-col gap-4 items-start">
                <a 
                  href="https://wa.me/972528109400?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%A6%D7%A2%D7%AA%20%D7%9E%D7%97%D7%99%D7%A8%20%D7%9C%D7%90%D7%98%D7%A8%D7%A7%D7%A6%D7%99%D7%99%D7%AA%20%22%D7%9B%D7%A1%D7%A3%20%D7%A2%D7%9C%20%D7%94%D7%A8%D7%A6%D7%A4%D7%94%22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-gold transition-all group font-bold text-lg"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="tel:0528109400" 
                  className="flex items-center gap-3 text-white hover:text-gold transition-all group font-bold text-lg"
                >
                  <Phone className="w-5 h-5 text-gold group-hover:scale-110 transition-transform shrink-0" />
                  <span dir="ltr">052-8109400</span>
                </a>
                <a 
                  href="mailto:cash.cube99@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span>cash.cube99@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span>שירות בפריסה ארצית (מרכז, ירושלים, שרון, שפלה, צפון ודרום)</span>
                </div>
              </div>
            </div>

            {/* About / Description (Center) */}
            <div className="max-w-xl">
              <div className="text-3xl font-black gold-text-gradient mb-4">כסף על הרצפה</div>
              <p className="text-gray-400 leading-relaxed text-sm mb-4">
                אטרקציית תא כסף יוקרתית (Cash Cube) המובילה בישראל. אנו מתמחים בהשכרת תאי כסף מתנפחים ושקופים לאירועים פרטיים ועסקיים, חתונות, בר/בת מצווה, כנסים, השקות מותג וקידום מכירות.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                תא הכסף מגיע בליווי צוות תפעול מיומן, שטרות מעופפים מרהיבים ואפשרות מיתוג אישי מלא.
              </p>
            </div>
            
            {/* Quick Links (Left) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gold uppercase tracking-tight">קישורים מהירים</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-gold transition-colors">מה זה תא כסף?</a></li>
                <li><a href="#how-it-works" className="hover:text-gold transition-colors">איך זה עובד?</a></li>
                <li><a href="#use-cases" className="hover:text-gold transition-colors">לאילו אירועים מתאים תא הכסף?</a></li>
                <li><a href="#benefits" className="hover:text-gold transition-colors">למה לבחור ב-CASH CUBE שלנו?</a></li>
                <li><a href="#faq" className="hover:text-gold transition-colors">שאלות נפוצות על תא כסף</a></li>
                <li><a href="/contact" className="hover:text-gold transition-colors">עמוד יצירת קשר</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} כסף על הרצפה - אטרקציית תא כסף לאירועים | CASH CUBE ישראל. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
}
