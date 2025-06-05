import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router}
  from 'react-router-dom'
import Home from './components/Home'
import TaskList from './components/taskList'
import Feedback from './components/Feedback'
import Hystory from './components/Hystory'
import Navbar from './components/Navbar'
import Stastic from './components/Stastic'
import HeaderCom from './components/HeaderCom'
import Currpgcontextprovider from './context/currpgcontextprovider'

function App() {

  return (
    
    <Currpgcontextprovider>
    <div className='flex-row homepg-body'>
      <Router>
        <Navbar />
        <div className="homepg-main-content flex-col">
          <HeaderCom/>
          <div className="content">
            <Routes>
              <Route path="/" element={
                <Home />
              } />
              <Route path="/tasklist" element={
                <TaskList />
              } />
              <Route path="/stastic" element={
                <Stastic />
              } />
              <Route path="/history" element={
                <Hystory />
              } />
              <Route path="/feedback" element={
                <Feedback />
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
    </Currpgcontextprovider>
  )
}

export default App
