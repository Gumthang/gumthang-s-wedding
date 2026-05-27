import React, { useState, useRef, useEffect } from 'react'
import mainPhoto from '../images/photo.png'
import { TbPlayerTrackPrevFilled, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import myMusic from '../media/taeyeon_poem.mp3';

const INTRO_MESSAGE = '저희 둘 결혼합니다';

function Cover() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [typedIntroText, setTypedIntroText] = useState('');
  const audioRef = useRef(new Audio(myMusic));

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let typingTimer;
    let hideTimer;
    let currentIndex = 0;

    const startTypingTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        currentIndex += 1;
        setTypedIntroText(INTRO_MESSAGE.slice(0, currentIndex));

        if (currentIndex === INTRO_MESSAGE.length) {
          clearInterval(typingTimer);

          hideTimer = setTimeout(() => {
            setShowIntro(false);
          }, 1950);
        }
      }, 130);
    }, 350);

    return () => {
      clearTimeout(startTypingTimer);
      clearInterval(typingTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play() : audio.pause();

    return () => {
      audio.pause();
      audio.currentTime = 0; // Ensure music starts from the beginning next time
    };
  }, [isPlaying]);

  return (
    <section className="cover container">
      {showIntro && (
        <div className="cover-intro" aria-hidden="true">
          <p className="cover-intro__text">
            {typedIntroText}
            <span className="cover-intro__cursor" />
          </p>
        </div>
      )}

      <div className={`cover__content ${!showIntro ? 'cover__content--visible' : ''}`}>
        <div className='title'>&ldquo;우리 결혼합니다&rdquo;</div>
        <img className="cover__main-photo" src={mainPhoto} alt='weddingcouple'></img>
        <div className='cover__person'>
          <div>이병환</div>
          <GoHeartFill className='cover__icon-heart' size="0.8em"/>
          <div>이성은</div>
        </div>
        <div className='cover__date'>2027년 5월 15일, 토요일 16시</div>
        <div className='cover__place'>S가든웨딩홀 르씨엘홀 4F</div>
        <div className='cover__line'></div>
        <div className='cover__icon-box'>
          <TbPlayerTrackPrevFilled size="1.5em"/>
          <TbPlayerSkipBackFilled size="1.5em"/>
          {isPlaying ? (
            <BsStopCircle size="3em" className='cover__music-btn' onClick={togglePlay} aria-label="Stop Music"/>
          ) : (
            <BsPlayCircle size="3em" className='cover__music-btn' onClick={togglePlay} aria-label="Play Music"/>
          )}
          <TbPlayerSkipForwardFilled size="1.5em"/>
          <TbPlayerTrackNextFilled size="1.5em"/>
        </div>
      </div>
    </section>
  )
}

export default Cover
