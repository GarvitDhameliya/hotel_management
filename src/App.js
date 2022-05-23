import React from 'react'
import HeaderComponent from './components/Header/HeaderComponent'
import { BrowserRouter } from 'react-router-dom'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderComponent />
    </BrowserRouter>

  )
}

export default App