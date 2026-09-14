'use client';

import { useMobileMenuContext } from '@/src/context/MobileMenuContext';

const MobileMenuButton = () => {
  const { openMenu } = useMobileMenuContext();

  return (
    <div className="block xl:hidden">
      <button
        type="button"
        onClick={() => openMenu()}
        className="bg-background-4 flex size-12 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full"
        aria-label="Open mobile menu"
      >
        <span className="sr-only">Menu</span>
        <span className="block h-0.5 w-6 bg-white/80 transition-all duration-200" />
        <span className="block h-0.5 w-6 bg-white/80 transition-all duration-200" />
        <span className="block h-0.5 w-6 bg-white/80 transition-all duration-200" />
      </button>
    </div>
  );
};

export default MobileMenuButton;
