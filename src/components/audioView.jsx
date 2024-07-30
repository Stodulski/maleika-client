import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioView = ({ audioURL }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    // Inicializar Wavesurfer
    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ddd',
      progressColor: '#4a90e2',
      cursorColor: '#4a90e2',
      height: 50,
    });

    // Cargar el archivo de audio
    waveSurferRef.current.load(audioURL);

    return () => {
      // Limpiar Wavesurfer al desmontar el componente
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, [audioURL]);

  const playPause = () => {
    waveSurferRef.current.playPause();
  };

  return (
    <div className='z-10'>
      <div ref={waveformRef} />
      <button onClick={playPause}>Play/Pause</button>
    </div>
  );
};

export default AudioView;