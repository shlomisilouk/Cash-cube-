import { useState, FormEvent, useEffect } from 'react';
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
  MapPin,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

export default function MainLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  });

  useEffect(() => {
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
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...utmParams }),
      });

      if (response.ok) {
        alert('תודה על פנייתך! נחזור אליך בהקדם.');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        alert('חלה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('חלה שגיאה בתקשורת עם השרת.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="fixed top-0 w-full z-50 bg-matte-black/80 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block bg-gold text-matte-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20 active:scale-95">
              לקבלת הצעה עכשיו
            </a>
          </div>
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#benefits" className="hover:text-gold transition-colors">יתרונות</a>
            <a href="#how-it-works" className="hover:text-gold transition-colors">איך זה עובד</a>
            <a href="#use-cases" className="hover:text-gold transition-colors">למי זה מתאים</a>
            <a href="#contact" className="hover:text-gold transition-colors">צור קשר</a>
          </nav>
          <div className="flex items-center gap-8">
            <a 
              href="tel:0528109400" 
              className="flex items-center gap-2 text-white font-bold hover:text-gold transition-colors text-sm sm:text-lg"
            >
              <span dir="ltr">052-8109400</span>
              <Phone className="w-5 h-5 text-gold" />
            </a>
            <div className="text-2xl font-black gold-text-gradient tracking-tighter">
              כסף על הרצפה
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Flying Money */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <img 
            src="/flyingmoney.jpeg" 
            alt="Flying Money Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-matte-black/60 via-matte-black/20 to-matte-black"></div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-right"
          >
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              כסף על הרצפה <br />
              לא תיקח? <br />
              <span className="gold-text-gradient font-serif italic font-medium">כסף על הרצפה</span> <br />
              הגיע לאירוע.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl">
              האטרקציה שהופכת כל אירוע למערבולת של מזומנים. תפסו את ההזדמנות והשאירו חותם יוקרתי ובלתי נשכח.
            </p>
            <a href="#contact" className="cta-button inline-block text-lg">
              לקבלת הצעה עכשיו
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.2)] group">
              <img 
                src="/hero.jpg" 
                alt="כסף על הרצפה" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ objectPosition: 'top' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent"></div>
              {/* Luxury Flash Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:animate-pulse pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-zinc-900/50 py-24">
        <div className="section-padding">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            למה לבחור ב-<span className="gold-text-gradient">כסף על הרצפה</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Camera, title: 'מושך קהל ויוצר באז חברתי.', color: 'text-gold' },
              { icon: DollarSign, title: 'תחושת שפע ויוקרה לכל אירוע.', color: 'text-gold' },
              { icon: Trophy, title: 'חוויה מהמה ובלתי נשכחת ללקוחות.', color: 'text-gold' }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-matte-black p-10 rounded-3xl border border-gold/10 text-center hover:border-gold/40 transition-all group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                  <benefit.icon className={`w-10 h-10 ${benefit.color}`} />
                </div>
                <p className="text-xl font-bold leading-relaxed">{benefit.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="section-padding">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">איך זה עובד?</h2>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gold/20 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
              {[
                { icon: UserPlus, step: '01', title: 'היכנסו ל-"כסף על הרצפה".', desc: 'החוויה מתחילה ברגע שאתם בפנים.' },
                { icon: Wind, step: '02', title: 'האוויר נדלק, והשטרות עפים לכל עבר!', desc: 'המפוחים הירוקים-צהובים נכנסים לפעולה.' },
                { icon: Hand, step: '03', title: 'תפסו כמה שיותר שטרות בזמן שאתם מקציבים!', desc: 'הזמן קצר, המזומנים עפים - תהיו מהירים!' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mb-8 shadow-xl shadow-gold/20 relative">
                    <item.icon className="w-10 h-10 text-matte-black" />
                    <span className="absolute -top-2 -right-2 w-10 h-10 bg-matte-black rounded-full border-2 border-gold flex items-center justify-center font-bold text-gold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="bg-zinc-900/50 py-24">
        <div className="section-padding">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">האטרקציה המושלמת לכל אירוע.</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'מסיבות חברה', image: '/companyparty.jpg' },
              { title: 'השקות מוצרים', image: '/launch.jpg' },
              { title: 'אירועים קמעונאיים', image: '/retail.jpg' },
              { title: 'אירועים פרטיים', image: '/private.jpg' }
            ].map((useCase, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10"
              >
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-gold">{useCase.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
        
        <div className="section-padding max-w-3xl">
          <div className="bg-matte-black p-8 md:p-12 rounded-[2rem] border-2 border-gold/30 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-4">מוכנים להזניק את האירוע שלכם?</h2>
            <p className="text-center text-gray-400 mb-10">השאירו פרטים ונחזור אליכם עם הצעה מנצחת.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gold">שם מלא</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-gold focus:outline-none transition-colors"
                  placeholder="ישראל ישראלי"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gold">מספר טלפון</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-gold focus:outline-none transition-colors"
                    placeholder="050-0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gold">אימייל</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:border-gold focus:outline-none transition-colors"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="cta-button w-full text-xl mt-4">
                שלח פנייה
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
            <div className="max-w-2xl">
              <div className="text-3xl font-black gold-text-gradient mb-6">כסף על הרצפה</div>
              <p className="text-gray-400 leading-relaxed">
                אנו מציגים קונספט חדשני ומדויק לאירועים, המבוסס על מתקן "כסף על הרצפה" - תא מתנפח שקוף, ממותג ובעל עיצוב יוקרתי (זהב-שחור) כפי שמוצג בתמונה.
                <br /><br />
                'כסף על הרצפה' אינו רק מכונת תפיסת כסף בסיסית; הוא פלטפורמה מקיפה למעורבות קהל. אנו מספקים חוויה אימרסיבית שבה אורח נכנס לתא השקוף ומוקף בטורנדו של "שטרות מתעופפים" הניתנים ללכידה בזמן מוגבל.
              </p>
            </div>
            
            <div className="space-y-6 md:text-left">
              <h4 className="text-xl font-black mb-6 gold-text-gradient uppercase tracking-tight">צרו קשר</h4>
              <a 
                href="tel:0528109400" 
                className="flex items-center gap-3 text-white md:justify-end hover:text-gold transition-all group lg:text-xl font-bold"
              >
                <span dir="ltr">052-8109400</span>
                <Phone className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:cash.cube99@gmail.com"
                className="flex items-center gap-3 text-gray-400 md:justify-end hover:text-gold transition-colors"
              >
                <span>cash.cube99@gmail.com</span>
                <Mail className="w-5 h-5 text-gold" />
              </a>
              <div className="flex items-center gap-3 text-gray-400 md:justify-end">
                <span>פריסה ארצית</span>
                <MapPin className="w-5 h-5 text-gold" />
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} כסף על הרצפה. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
}
