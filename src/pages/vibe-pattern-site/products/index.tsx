import { useEffect, useState } from 'react'
import FlowingBtn from '../components/flowingbtn'
import { FooterSection } from '../components/footer'

import { Navbar } from '../components/navbar'
import { ContactSection } from './components/contactsection'
import ProductList from './ProductList'

import { Hero } from './components/hero'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      {/* <Hero title='PRODUCTS' backgroundImage='/images/cloud-background.png' /> */}
      <ProductList />
      <FooterSection />
      <FlowingBtn />
    </div>
  )
}
