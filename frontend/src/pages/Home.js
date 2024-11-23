import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card'
import './Home.css'

function Home() {
  return (
    <div className='home'>
      <Header/>
      <Card/>
      <Footer/>
    </div>
    
  )
}

export default Home