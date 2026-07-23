'use client';

import { MicrophoneIcon } from '@/src/components/shared/icon';
import { cn } from '@/src/utils/cn';
import { useRef, useState } from 'react';

type MicPermissionStatus = 'idle' | 'granted' | 'denied';

const HeroMicButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [micStatus, setMicStatus] = useState<MicPermissionStatus>('idle');

  return (
    <button
      ref={buttonRef}
      type="button"
      data-mic-button
      onClick={async () => {
        if (!navigator.mediaDevices?.getUserMedia) return;

        const button = buttonRef.current;
        if (!button) return;

        try {
          (await navigator.mediaDevices.getUserMedia({ audio: true }))
            .getTracks()
            .forEach((t) => t.stop());

          setMicStatus('granted');
          button.dispatchEvent(new CustomEvent('micPermissionGranted'));
          console.log('Microphone access granted');
        } catch (error) {
          setMicStatus('denied');
          button.dispatchEvent(
            new CustomEvent('micPermissionDenied', { detail: error, bubbles: true }),
          );
          console.error('Microphone access error:', error);
        }
      }}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20',
        micStatus === 'granted' && 'mic-permission-granted',
        micStatus === 'denied' && 'mic-permission-denied',
      )}
      aria-label="Microphone input"
    >
      <MicrophoneIcon />
    </button>
  );
};

export default HeroMicButton;
