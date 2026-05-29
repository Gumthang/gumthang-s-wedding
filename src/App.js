import React, { useState } from 'react'
import './App.css';

import './css/Cover.css'
import './css/Invitation.css'
import './css/Calendar.css'
import './css/Account.css'
import './css/Gallery.css'
import './css/Location.css'
import './css/Footer.css'
import './css/SurveyModal.css'
import './css/Submit.css'
import './css/Comment.css'
import './css/Quiz.css'
import './css/RibbonDivider.css'

import Cover from './pages/Cover.js'
import Invitation from './pages/Invitation.js';
import Calendar from './pages/Calendar.js';
import Contact from './pages/Account.js';
import Location from './pages/Location.js';
import ImgGallery from './pages/ImgGallery.js';
import Footer from './components/Footer.js';
import SurveyModal from './components/SurveyModal.js';
import ScrollReveal from './components/ScrollReveal.js';
import RibbonDivider from './components/RibbonDivider.js';
// import Submit from './pages/Submit.js';
import Comment from './pages/Comment.js';
import Quiz from './pages/Quiz.js';



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false); // 우선 모달창 닫아놓음
  
    // 모달을 닫기 위한 함수
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModal = () => {
      setIsModalOpen(true);
    }

  return (
    <div className="App">
      {isModalOpen && <SurveyModal closeModal={closeModal} />}
      <Cover/>
      <ScrollReveal variant="soft"><Invitation /></ScrollReveal>
      <ScrollReveal variant="soft"><RibbonDivider /></ScrollReveal>
      <ScrollReveal variant="up"><Calendar /></ScrollReveal>
      <ScrollReveal variant="zoom"><ImgGallery /></ScrollReveal>
      <ScrollReveal variant="left"><Location /></ScrollReveal>
      {/* <Submit openModal={openModal}/> */}
      <ScrollReveal variant="right"><Quiz/></ScrollReveal>
      <ScrollReveal variant="soft"><Contact /></ScrollReveal>
      <ScrollReveal variant="up"><Comment /></ScrollReveal>
      <ScrollReveal variant="soft"><Footer /></ScrollReveal>
    </div>
  );
}

export default App;
