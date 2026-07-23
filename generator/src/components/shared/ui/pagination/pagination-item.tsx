import { cn } from '@/src/utils/cn';
import Link from 'next/link';

type PaginationItemProps = {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

const itemClassName = (active: boolean) =>
  cn(
    'border-stroke-3/25 group hover:text-background-4 data-[active=true]:text-background-4 text-tagline-4 flex size-8 items-center justify-center rounded-full border p-1.5 font-normal text-white/60 transition-all duration-500 ease-in-out hover:border-white hover:bg-white data-[active=true]:bg-white data-[active=true]:hover:border-white data-[active=true]:hover:bg-white',
    active && 'text-background-4 border-white bg-white'
  );

export const PaginationItem = ({
  children,
  active = false,
  className,
  onClick,
  href,
  disabled = false,
}: PaginationItemProps) => {
  if (disabled || !href) {
    return (
      <li>
        <span
          className={cn(itemClassName(active), 'cursor-not-allowed opacity-50', className)}
          aria-disabled="true"
        >
          {children}
        </span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        scroll={false}
        className={cn(itemClassName(active), className)}
        data-active={active ? 'true' : undefined}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
      >
        {children}
      </Link>
    </li>
  );
};
