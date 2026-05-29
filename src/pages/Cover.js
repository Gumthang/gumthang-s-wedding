import React, { useState, useRef, useEffect, useCallback } from 'react'
import mainPhoto from '../images/photo.png'
import { TbPlayerTrackPrevFilled, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsPlayCircle, BsStopCircle } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import myMusic from '../media/taeyeon_poem.mp3';

const INTRO_MESSAGE = '저희 둘 결혼합니다';

const COVER_PETALS = Array.from({ length: 32 }, (_, index) => ({
  left: (index * 17) % 100,
  delay: -((index * 0.37) % 7.2),
  duration: 6.4 + (index % 7) * 0.58,
  size: 7 + (index % 5) * 2,
  drift: index % 2 === 0 ? 34 + (index % 4) * 12 : -34 - (index % 4) * 12,
  rotate: (index * 31) % 360,
  opacity: 0.42 + (index % 5) * 0.1,
}));

function Cover() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [typedIntroText, setTypedIntroText] = useState('');
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);
  const typingAudioContextRef = useRef(null);

  if (audioRef.current === null) {
    audioRef.current = new Audio(myMusic);
  }

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;

    try {
      await audio.play();
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
      return true;
    } catch (error) {
      setIsPlaying(false);
      setIsAutoplayBlocked(true);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const getTypingAudioContext = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      return null;
    }

    if (!typingAudioContextRef.current) {
      typingAudioContextRef.current = new AudioContext();
    }

    return typingAudioContextRef.current;
  }, []);

  const unlockTypingSound = useCallback(async () => {
    const audioContext = getTypingAudioContext();

    if (!audioContext) {
      return false;
    }

    if (audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (error) {
        return false;
      }
    }

    return true;
  }, [getTypingAudioContext]);

  const playTypingSound = useCallback(async () => {
    const audioContext = getTypingAudioContext();

    if (!audioContext) {
      return;
    }

    if (audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (error) {
        return;
      }
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(760 + Math.random() * 180, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.045, now + 0.006);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.06);
  }, [getTypingAudioContext]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
      return;
    }

    playMusic();
  }, [isPlaying, pauseMusic, playMusic]);

  useEffect(() => {
    if (!showIntro || typeof window === 'undefined') {
      return undefined;
    }

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const originalBodyStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      touchAction: body.style.touchAction,
    };
    const originalHtmlStyle = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };

    documentElement.style.overflow = 'hidden';
    documentElement.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.touchAction = 'none';

    return () => {
      documentElement.style.overflow = originalHtmlStyle.overflow;
      documentElement.style.overscrollBehavior = originalHtmlStyle.overscrollBehavior;
      body.style.overflow = originalBodyStyle.overflow;
      body.style.position = originalBodyStyle.position;
      body.style.top = originalBodyStyle.top;
      body.style.left = originalBodyStyle.left;
      body.style.right = originalBodyStyle.right;
      body.style.width = originalBodyStyle.width;
      body.style.touchAction = originalBodyStyle.touchAction;
      window.scrollTo(0, scrollY);
    };
  }, [showIntro]);

  useEffect(() => {
    let typingTimer;
    let hideTimer;
    let currentIndex = 0;

    const startTypingTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        currentIndex += 1;
        setTypedIntroText(INTRO_MESSAGE.slice(0, currentIndex));

        const typedCharacter = INTRO_MESSAGE[currentIndex - 1];

        if (typedCharacter && typedCharacter.trim()) {
          playTypingSound();
        }

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
  }, [playTypingSound]);

  useEffect(() => {
    return () => {
      const typingAudioContext = typingAudioContextRef.current;

      if (typingAudioContext && typingAudioContext.state !== 'closed') {
        typingAudioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;

    let isCleanedUp = false;
    const firstInteractionEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];

    const removeFirstInteractionListeners = () => {
      firstInteractionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstInteraction);
      });
    };

    const handleFirstInteraction = async () => {
      await unlockTypingSound();
      const didPlay = await playMusic();

      if (didPlay) {
        removeFirstInteractionListeners();
      }
    };

    firstInteractionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleFirstInteraction, { passive: true });
    });

    unlockTypingSound();

    playMusic().then((didPlay) => {
      if (didPlay || isCleanedUp) {
        removeFirstInteractionListeners();
      }
    });

    return () => {
      isCleanedUp = true;
      removeFirstInteractionListeners();
      audio.pause();
      audio.currentTime = 0;
    };
  }, [playMusic, unlockTypingSound]);

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
        <div className="cover__photo-frame">
          <img className="cover__main-photo" src={mainPhoto} alt='weddingcouple'></img>
          <div className="cover__photo-petals" aria-hidden="true">
            {COVER_PETALS.map((petal, index) => (
              <span
                className="cover__petal"
                key={`cover-petal-${index}`}
                style={{
                  '--petal-left': `${petal.left}%`,
                  '--petal-delay': `${petal.delay}s`,
                  '--petal-duration': `${petal.duration}s`,
                  '--petal-size': `${petal.size}px`,
                  '--petal-drift': `${petal.drift}px`,
                  '--petal-rotate': `${petal.rotate}deg`,
                  '--petal-opacity': petal.opacity,
                }}
              />
            ))}
          </div>
        </div>
        <div className='cover__person'>
          <div>이병환</div>
          <GoHeartFill className='cover__icon-heart' size="0.8em"/>
          <div>이성은</div>
        </div>
        <div className='cover__date'>2027년 5월 15일, 토요일 16시</div>
        <div className='cover__place'>S가든웨딩홀 르씨엘홀 4F</div>
        <div className={`cover__line ${isPlaying ? 'cover__line--playing' : ''}`}></div>
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

        {isAutoplayBlocked && (
          <p className="cover__music-notice">
            음악이 자동으로 시작되지 않으면 화면을 한 번 터치해주세요.
          </p>
        )}
      </div>
    </section>
  )
}

export default Cover
