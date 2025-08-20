import React, { useEffect } from 'react'
import AOS from 'aos'
import Nav from './components/Nav'
import Home from './components/Home'
import Products from './components/Products'

export default function App() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      <Nav />
      <Home />
      <Products />
    </>
  )
}