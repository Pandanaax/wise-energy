'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const HEADER_H = 88;

export default function BrandHeader() {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById('main-start') || document.getElementById('intro');
    if (!trigger) return;

    const onScroll = () => {
      const top = trigger.getBoundingClientRect().top;
      setHidden(top <= HEADER_H);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={[
        'fixed inset-x-0 top-0 z-50 bg-white border-b border-slate-200',
        'transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)]',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl h-[88px] px-6">
        <div className="h-full flex items-center gap-4">
          <Image src="/wise-energy-logo.png" alt="Wise Energy" width={210} height={58} priority />
          <span className="text-sm font-semibold tracking-wide text-slate-800">
            Solar ROI Simulator
          </span>
        </div>
      </div>
    </header>
  );
}
