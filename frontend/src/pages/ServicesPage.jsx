import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Activity, Camera, Brain, MapPin, Calendar, Stethoscope, Award, ArrowRight } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Monitor your pet\'s weight, diet, activity, and mood over time with beautiful charts and insights.',
      features: ['Weight tracking', 'Diet logging', 'Activity monitoring', 'Mood tracking'],
      color: 'from-primary-500 to-pink-400',
      link: '/dashboard'
    },
    {
      icon: Calendar,
      title: 'Smart Reminders',
      description: 'Never forget feeding times, medication, grooming, or vet appointments again.',
      features: ['Custom schedules', 'Recurring reminders', 'Priority levels', 'Push notifications'],
      color: 'from-warm-500 to-orange-400',
      link: '/reminders'
    },
    {
      icon: Camera,
      title: 'Pet Gallery',
      description: 'Create beautiful photo albums of your pets with captions and memories.',
      features: ['Unlimited uploads', 'Photo captions', 'Timeline view', 'Share albums'],
      color: 'from-purple-500 to-violet-400',
      link: '/gallery'
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'Get instant answers to pet care questions from our intelligent AI assistant.',
      features: ['24/7 availability', 'Health advice', 'Nutrition tips', 'Behavior help'],
      color: 'from-green-500 to-emerald-400',
      link: '/ai-assistant'
    },
    {
      icon: MapPin,
      title: 'Vet Finder',
      description: 'Find trusted veterinarians and emergency clinics near your location.',
      features: ['Nearby search', 'Reviews & ratings', 'Emergency filter', 'Directions'],
      color: 'from-red-500 to-rose-400',
      link: '/vet-finder'
    },
    {
      icon: Stethoscope,
      title: 'Health Notes',
      description: 'Document behaviors, symptoms, and observations for better vet consultations.',
      features: ['Categorized notes', 'Tag system', 'Date tracking', 'Pet linking'],
      color: 'from-blue-500 to-cyan-400',
      link: '/notes'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn points and badges for being a responsible pet parent.',
      features: ['Points system', 'Achievement badges', 'Level progression', 'Leaderboards'],
      color: 'from-yellow-500 to-amber-400',
      link: '/dashboard'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to keep your pet healthy, happy, and safe in one beautiful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card group"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, j) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link to={service.link} className="inline-flex items-center gap-2 text-primary-500 font-medium hover:text-primary-600 transition-colors">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
