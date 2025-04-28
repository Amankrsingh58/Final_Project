import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Award, Users } from 'lucide-react';


function RegisterCard() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  return (
<section className="py-16">
<div className="max-w-7xl mx-auto px-6">
  <motion.div 
    className="text-center mb-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
  >
    <h2 className="text-3xl font-bold mb-4">Why Choose TutorMatch?</h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      We make it easy to connect with qualified tutors who can help you succeed in your academic journey.
    </p>
  </motion.div>

  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      variants={fadeIn}
    >
      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
      <p className="text-gray-600">
        Search for tutors based on subject, price, and experience level to find your perfect match.
      </p>
    </motion.div>

    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      variants={fadeIn}
    >
      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Award className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Qualified Tutors</h3>
      <p className="text-gray-600">
        All our tutors are vetted professionals with proven experience in their subject areas.
      </p>
    </motion.div>

    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      variants={fadeIn}
    >
      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
      <p className="text-gray-600">
        Book sessions at times that work for you, with easy rescheduling options.
      </p>
    </motion.div>

    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      variants={fadeIn}
    >
      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
      <p className="text-gray-600">
        Get customized instruction tailored to your specific learning needs and goals.
      </p>
    </motion.div>
  </motion.div>
</div>
</section>
  )
}

export default RegisterCard
