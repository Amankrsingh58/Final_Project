import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Heart, Target, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import AmanImg from '../images/Aman4.JPG'
import AnjaniImg from '../images/Anjani.JPG'
import { useSelector } from 'react-redux';

const AboutUs = () => {

  const {user, isAuthenticated} = useSelector((state) => state.auth)
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

  const teamMembers = [
    {
      name: 'Aman Kumar Singh',
      role: 'Founder & CEO',
      bio: 'Aman is passionate about creating solutions that bridge educational gaps. He and his co-founder noticed how difficult it was for people to find quality tutors and wanted to make the process easier for everyone.',
      image: AmanImg
    },
    {
      name: 'Anjani Kumar',
      role: 'Co-Founder & CMO',
      bio: 'Anjani’s leadership skills and commitment to education helped bring the vision of TutorMatch to life. He observed how many students and parents struggled with finding the right tutor and set out to change that.',
      image: AnjaniImg
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About TutorMatch</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connecting passionate educators with eager learners to create meaningful educational experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  TutorMatch was founded by Aman Kumar Singh and Anjani Kumar, both third-year students at IIMT College of Engineering, Greater Noida. The idea for this project came from noticing the struggles faced by friends, family, and other people who found it difficult to find home tutors. Parents were struggling to find the best tutors for their children, and students often faced challenges in finding quality tutoring services. 
                </p>
                <p>
                  Our goal was simple: to create a platform where students and parents can easily find qualified tutors that match their educational needs. With a shared vision and a passion for education, we worked to bring TutorMatch to life, offering personalized tutoring solutions for all.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Team meeting" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're guided by core principles that put students and educators first.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Our Mission</h3>
              <p className="text-gray-600">
                To democratize education by connecting students with expert tutors who can provide personalized learning experiences that inspire growth, confidence, and academic success.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Our Vision</h3>
              <p className="text-gray-600">
                A world where every student has access to quality education tailored to their unique learning style, regardless of geographic or economic barriers.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Our Promise</h3>
              <p className="text-gray-600">
                We're committed to maintaining the highest standards of educational excellence, ensuring every tutoring session delivers real value and measurable progress.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Student-Centered Approach",
                description: "We put students' needs first, designing every aspect of our platform to support their unique learning journey.",
                icon: <Users className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Educational Excellence",
                description: "We maintain rigorous standards for our tutors, ensuring students receive instruction from qualified experts in their field.",
                icon: <Award className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Accessibility",
                description: "We're committed to making quality education available to students of all backgrounds and learning needs.",
                icon: <BookOpen className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Continuous Improvement",
                description: "We constantly evolve our platform based on feedback from students and tutors to create the best possible learning experience.",
                icon: <MessageSquare className="h-6 w-6 text-indigo-600" />
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind TutorMatch
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                variants={fadeIn}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-indigo-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 overflow-x-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 text-center ml-auto  overflow-x-hidden">
            {[
              { number: "5,000+", label: "Qualified Tutors" },
              { number: "50,000+", label: "Tutoring Sessions" },
              { number: "25+", label: "Subject Areas" },
              { number: "98%", label: "Student Satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join the TutorMatch Community</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Whether you're looking to learn or to share your knowledge, we'd love to have you as part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to={isAuthenticated ? "/tutor" : "/login"} 
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Find a Tutor
              </Link>
              <Link 
                to={isAuthenticated ? "/my-bookings" : "/signup"} 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Become a Tutor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
