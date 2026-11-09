/**
 * src/tactile-console.js
 * Controller for SoundWave TX-26 Analog Master Tape Deck & Tactile Controls
 */

(function () {
  'use strict';

  let audioCtx = null;
  let clickBuffer = null;

  function initAudioCtx() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Synthesize realistic mechanical micro-click for physical studio buttons
  function playTactileClick() {
    try {
      initAudioCtx();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.018);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.022);
    } catch (e) {}
  }

  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('festival-audio');
    const btnPlay = document.getElementById('deck-btn-play');
    const btnPause = document.getElementById('deck-btn-pause');
    const btnRewind = document.getElementById('deck-btn-rewind');
    const tapeDisplay = document.getElementById('tape-timer-display');
    const cassetteWindow = document.querySelector('.cassette-window');
    const needleL = document.getElementById('vu-needle-left');
    const needleR = document.getElementById('vu-needle-right');
    const peakLed = document.getElementById('peak-led');
    const volKnob = document.getElementById('deck-vol-knob');
    const volLabel = document.getElementById('deck-vol-label');

    if (!audio) return;

    let isPlaying = false;
    let animFrame = null;
    let currentAngleL = -32;
    let currentAngleR = -32;
    let targetAngleL = -32;
    let targetAngleR = -32;
    let currentVol = 0.8;

    // Attach mechanical sound to all tactile buttons
    document.querySelectorAll('.console-rocker-btn, .portal-card-cta, .nav-cta-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playTactileClick();
      });
    });

    // Formatting time MM:SS
    function formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0) return "00:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    // Ballistic VU needle physics loop
    function updateVuNeedles() {
      if (isPlaying) {
        // Natural musical pulse + variance between Left & Right channels
        const t = performance.now() / 1000;
        const beat = Math.sin(t * 7.5) * 0.5 + Math.sin(t * 15.2) * 0.35;
        const jitterL = (Math.random() - 0.5) * 12;
        const jitterR = (Math.random() - 0.5) * 12;

        // Map beat to needle angles (-32deg at rest up to +24deg peak)
        const intensity = Math.max(0, beat + 0.65) * currentVol;
        targetAngleL = -32 + (intensity * 48) + jitterL;
        targetAngleR = -32 + (intensity * 46) + jitterR;

        // Peak LED trigger when exceeding +1dB mark
        if (targetAngleL > 16 || targetAngleR > 16) {
          if (peakLed) peakLed.classList.add('peaking');
        } else {
          if (peakLed) peakLed.classList.remove('peaking');
        }
      } else {
        targetAngleL = -32;
        targetAngleR = -32;
        if (peakLed) peakLed.classList.remove('peaking');
      }

      // Smooth spring damping towards target
      currentAngleL += (targetAngleL - currentAngleL) * 0.28;
      currentAngleR += (targetAngleR - currentAngleR) * 0.28;

      if (needleL) needleL.style.transform = `rotate(${currentAngleL.toFixed(1)}deg)`;
      if (needleR) needleR.style.transform = `rotate(${currentAngleR.toFixed(1)}deg)`;

      if (isPlaying && tapeDisplay && audio) {
        tapeDisplay.textContent = formatTime(audio.currentTime);
      }

      animFrame = requestAnimationFrame(updateVuNeedles);
    }

    // Set Initial Volume
    audio.volume = currentVol;

    // Transport Handlers
    function startPlayback() {
      initAudioCtx();
      isPlaying = true;
      audio.play().catch(() => {});
      if (cassetteWindow) cassetteWindow.classList.add('is-playing');
      if (btnPlay) btnPlay.classList.add('is-active');
      if (btnPause) btnPause.classList.remove('is-active');
    }

    function pausePlayback() {
      isPlaying = false;
      audio.pause();
      if (cassetteWindow) cassetteWindow.classList.remove('is-playing');
      if (btnPlay) btnPlay.classList.remove('is-active');
      if (btnPause) btnPause.classList.add('is-active');
    }

    function rewindPlayback() {
      audio.currentTime = 0;
      if (tapeDisplay) tapeDisplay.textContent = "00:00";
      // Quick mechanical rewind reel spin
      if (cassetteWindow) {
        cassetteWindow.classList.add('is-playing');
        setTimeout(() => {
          if (!isPlaying) cassetteWindow.classList.remove('is-playing');
        }, 350);
      }
    }

    if (btnPlay) btnPlay.addEventListener('click', startPlayback);
    if (btnPause) btnPause.addEventListener('click', pausePlayback);
    if (btnRewind) btnRewind.addEventListener('click', rewindPlayback);

    audio.addEventListener('play', () => {
      isPlaying = true;
      if (cassetteWindow) cassetteWindow.classList.add('is-playing');
      if (btnPlay) btnPlay.classList.add('is-active');
      if (btnPause) btnPause.classList.remove('is-active');
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      if (cassetteWindow) cassetteWindow.classList.remove('is-playing');
      if (btnPlay) btnPlay.classList.remove('is-active');
    });

    audio.addEventListener('ended', () => {
      pausePlayback();
      rewindPlayback();
    });

    // Volume Potentiometer Knob click/drag
    if (volKnob) {
      let isDragging = false;
      function setVolume(pct) {
        currentVol = Math.max(0, Math.min(1, pct));
        audio.volume = currentVol;
        // Map 0..1 to -135deg .. +135deg
        const deg = -135 + currentVol * 270;
        volKnob.style.transform = `rotate(${deg}deg)`;
        if (volLabel) volLabel.textContent = `${Math.round(currentVol * 100)}%`;
      }

      setVolume(0.8);

      volKnob.addEventListener('mousedown', (e) => {
        isDragging = true;
        const startY = e.clientY;
        const startVol = currentVol;

        function onMouseMove(e2) {
          if (!isDragging) return;
          const deltaY = startY - e2.clientY;
          setVolume(startVol + deltaY / 100);
        }

        function onMouseUp() {
          isDragging = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });

      // Quick Click toggle volume
      volKnob.addEventListener('click', () => {
        if (currentVol > 0.1) {
          setVolume(currentVol >= 0.9 ? 0.3 : currentVol + 0.25);
        } else {
          setVolume(0.8);
        }
      });
    }

    // Start VU meter animation loop
    updateVuNeedles();
  });
})();
