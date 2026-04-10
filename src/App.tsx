import { Routes, Route } from 'react-router-dom'
import { ContactModalProvider } from './context/ContactModalContext'
import { JobApplicationModalProvider } from './context/JobApplicationModalContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Admin from './pages/Admin'

function App() {
  return (
    <ContactModalProvider>
      <JobApplicationModalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </JobApplicationModalProvider>
    </ContactModalProvider>
  )
}

export default App
