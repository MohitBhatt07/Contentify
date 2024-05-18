import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes   } from 'react-router-dom'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import EntityOperations from './components/EntityOperations'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div className="container mx-auto p-4">
        <Navbar />
        <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path="/entity/:entityName" element={<EntityOperations />} />
        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
