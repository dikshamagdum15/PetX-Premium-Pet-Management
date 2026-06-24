import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Activity, 
  Camera, 
  Brain, 
  MapPin,
  ChevronRight,
  Award,
  ArrowRight,
  Star
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-200/20 dark:bg-warm-900/10 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Trusted by 10,000+ Pet Parents
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-gray-900 dark:text-white">Care for your</span>
            <br />
            <span className="text-gradient">best friend</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            The all-in-one platform to track health, schedule care, and create lasting memories with your beloved pets.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300">
              Explore Features
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-warm-400 fill-warm-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">4.9/5 from 2,000+ reviews</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl transform rotate-6" />
            <div className="glass rounded-3xl p-8 shadow-2xl relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-2xl p-6"
                  >
                    <Heart className="w-8 h-8 text-primary-500 mb-3" />
                    <p className="font-semibold text-gray-900 dark:text-white">Health Tracking</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitor vitals daily</p>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/20 rounded-2xl p-6"
                  >
                    <Camera className="w-8 h-8 text-secondary-500 mb-3" />
                    <p className="font-semibold text-gray-900 dark:text-white">Photo Gallery</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Capture memories</p>
                  </motion.div>
                </div>
                <div className="space-y-4 mt-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-6"
                  >
                    <Brain className="w-8 h-8 text-green-500 mb-3" />
                    <p className="font-semibold text-gray-900 dark:text-white">AI Assistant</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Smart advice 24/7</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    { icon: Heart, title: 'Health Tracker', desc: 'Monitor weight, diet, and activity with beautiful charts.', color: 'from-primary-500 to-pink-400', link: '/dashboard' },
    { icon: Shield, title: 'Smart Reminders', desc: 'Never miss vaccinations, feeding, or grooming schedules.', color: 'from-secondary-500 to-blue-400', link: '/reminders' },
    { icon: MapPin, title: 'Vet Finder', desc: 'Find trusted veterinarians near you with real reviews.', color: 'from-warm-500 to-orange-400', link: '/vet-finder' },
    { icon: Brain, title: 'AI Assistant', desc: 'Get instant answers to your pet care questions.', color: 'from-green-500 to-emerald-400', link: '/ai-assistant' },
    { icon: Camera, title: 'Pet Gallery', desc: 'Upload and organize your favorite pet moments.', color: 'from-purple-500 to-violet-400', link: '/gallery' },
    { icon: Shield, title: 'Lost & Found', desc: 'Post alerts for missing pets in your community.', color: 'from-red-500 to-rose-400', link: '/lost-found' },
    { icon: Award, title: 'Expense Tracker', desc: 'Track food, medical, and toy budgets effortlessly.', color: 'from-warm-500 to-orange-400', link: '/expenses' },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything your pet needs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to make pet care effortless and enjoyable.
          </p>
        </motion.div>

        <motion.div 
          {...staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card group cursor-pointer"
            >
              <Link to={feature.link} className="block">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
                <div className="mt-4 flex items-center text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Dog Mom', text: 'PetX V has completely transformed how I care for my Golden Retriever. The health tracking is a game-changer!', avatar: 'SJ' },
    { name: 'Michael Chen', role: 'Cat Dad', text: 'The AI assistant helped me identify an issue with my cat early. Vet confirmed it was spot on. Amazing app!', avatar: 'MC' },
    { name: 'Emily Davis', role: 'Pet Sitter', text: 'I manage 5 pets for different clients. PetX V makes it so easy to keep track of everything in one place.', avatar: 'ED' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-primary-50/50 dark:to-primary-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by pet parents
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See what our community has to say
          </p>
        </motion.div>

        <motion.div 
          {...staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-warm-400 fill-warm-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        {...fadeInUp}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 p-12 lg:p-16 text-center"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-warm-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to give your pet<br />the best care?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of pet parents who trust PetX V for their furry friends' health and happiness.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
