import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactLeadPage() {
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
    <div className="min-h-screen bg-matte-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Flying Money */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-20">
        <img 
          src="/flyingmoney.jpeg" 
          alt="Flying Money" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black via-matte-black/40 to-matte-black"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full z-10"
      >
        <div className="text-center mb-10">
          <div className="text-4xl font-black gold-text-gradient mb-4">CASH$CUBE</div>
          <h1 className="text-3xl font-bold mb-2">מוכנים להזניק את האירוע שלכם?</h1>
          <p className="text-gray-400">השאירו פרטים ונחזור אליכם עם הצעה מנצחת.</p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-gold/30 shadow-2xl">
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
            <button type="submit" className="cta-button w-full text-xl mt-4">
              קבלו הצעה עכשיו
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <a 
            href="https://wa.me/972528109400" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-gold transition-all font-bold text-xl"
          >
            <span dir="ltr">052-8109400</span>
            <Phone className="w-6 h-6 text-gold" />
          </a>
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-5 h-5 text-gold" />
              <span className="text-sm">cash.cube99@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="text-sm">פריסה ארצית</span>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="mt-20 text-gray-600 text-sm">
        © {new Date().getFullYear()} CASH$CUBE. כל הזכויות שמורות.
      </footer>
    </div>
  );
}
