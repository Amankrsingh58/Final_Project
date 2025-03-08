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
import TwoTimesCard from '../components/TwoTimesCard';

function Home() {
  return (
    <div className='home'>
      <Header />
      {/* <Card/> */}
      <Container />
      <RegisterCard />
      {/* <WorkProcess /> */}
      <Stats />
      
      <TwoTimesCard/>
      <Footer />
      <DeveloperFooter/>

    </div>

  )
}

export default Home