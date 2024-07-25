import { useState } from 'react'
import { Header } from './components/HomePage/header/Header'
import { SectionOne } from './components/HomePage/sectionOne/SectionOne'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />,
    <SectionOne />
    
    </>
  )
}

export default App
