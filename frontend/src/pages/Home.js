import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Container from '../components/Container';
import Stats from '../components/States';
import './Home.css'

function Home() {
  return (
    <div className='home'>
      <Header/>
      {/* <Card/> */}
<Container/>
<Stats/>
      <Footer/>
     
    </div>
    
  )
}

export default Home