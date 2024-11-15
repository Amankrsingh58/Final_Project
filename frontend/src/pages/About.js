import React from 'react'
import sunny from'./Picture/Sunny.jpg'
import study from './Picture/study.jpg'


import './About.css';

function About() {
  return (

   <>
  <img className='sunny90' src={study} alt='logo'/>


 <div className='About1'>

 <h2 className='About' > About Us</h2>
 <div className='sunny'>
<img  className='image' src={sunny}></img>
<br></br>
<p className='para'> Ghargharsikha is a uniquie platform developed by us to provide quality education to the children who are in search of  good tutors . This website will help you to find out good tutors across the NCR region .In Our website there are hundreads of well qualified teachers and they will provide you a free demo 
 <hr></hr>
   
    <b className='bold'>BOOK YOUR TUTOR TODAY</b>
</p>

 </div>

 <div>
            <h2 className='story'>OUR STORY</h2>
            <p className='para's>Our story starts in 2014 when our founders were also a teacher and they often encounter the problem of finding a teaching job vacancy near their location. Soon they realized that this not only their problem but it is a hectic process for most of the teachers. Similarly, after talking to some parents, they got to know that the parents are also worried about finding an experienced and well-qualified teacher for their child. Students and parents were also having difficulties hiring a private tutor. It was that time when our founders identified an opportunity to start a venture that would help in eliminating the unnecessary inconvenience faced by students and parents as well as the teachers. After a few months of market research and planning, finally, GharPeShiksha.com was founded in October 2014. GharPeShiksha.com (also known as Chawla Enterprise / Chawla Classes) was started as an idea to narrow the gap between the teachers who are struggling in finding a better tutoring job and the students who are willing to hire a home tutor. It paved a way for working professionals, who were looking for a part-time job after office hours, to opt for a part-time job. Also, it proved to be a way for housewives to take up teaching a part-time profession after they are done with their household work.

As the popularity of GharPeShiksha's efficient services increased, it was decided to expand the operation from Delhi-NCR to other cities of the country. As of now, we are operational in Delhi-NCR, Mumbai and Hyderabad and hope to expand our operational area pan India.

Our vision is to make education available for every student and provide an opportunity for the teachers to earn a good salary by sharing their knowledge. We are not here to earn, but to serve our people with better services. We keep enhancing ourselves in every field and strive to give a better experience to our every user every time</p>
           
        </div>
        </div>
  
        </>
      

 

  )
}

export default About;