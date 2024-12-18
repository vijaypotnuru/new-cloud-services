import FlowingBtn from '../components/flowingbtn'
import { FooterSection } from '../components/footer'

import { Navbar } from '../components/navbar'
import { ContactSection } from './components/contactsection'



import { Hero } from './components/hero'

const ContactUs = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <Hero title='CONTACT US' backgroundImage='/images/cloud-background.png' />
      <ContactSection />
      <FooterSection />
      <FlowingBtn />
    </div>
  )
}

export default ContactUs
