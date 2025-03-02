import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Container from '../components/Container';
import Stats from '../components/States';
import './Home.css'
import RegisterCard from '../components/RegisterCard';
import WorkFlowCard from '../components/WorkFlowCard';
import WorkProcess from '../components/WorkProcess';
import Designcard from '../components/Designcard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DeveloperFooter from '../components/DeveloperFooter';

function Home() {
  return (
    <div className='home'>
      <Header />
      {/* <Card/> */}
      <Container />
      <RegisterCard />
      <WorkProcess />
      <Stats />
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who are achieving their academic goals with TutorMatch.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/tutors" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Find a Tutor
              </Link>
              <Link 
                to="/signup" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Sign Up Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <DeveloperFooter/>

    </div>

  )
}

export default Home