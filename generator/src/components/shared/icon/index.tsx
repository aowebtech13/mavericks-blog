import { cn } from '@/src/utils/cn';
import type { FC } from 'react';

interface IconProps {
  className?: string;
}

const ArrowIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden
    className={cn('partner-ship-arrow-icon size-13 fill-none stroke-[#F8F9FA]', className)}
  >
    <path d="M15.168 36.8307L36.8346 15.1641" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.168 15.1641H36.8346V36.8307" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    aria-hidden
    className={cn('size-5 fill-none stroke-[#F8F9FA]', className)}
  >
    <path
      d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.75 6.25H12.25C11.6533 6.25 11.081 6.48705 10.659 6.90901C10.2371 7.33097 10 7.90326 10 8.5V19"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7 11.5H13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstagramIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    aria-hidden
    className={cn('size-5 fill-none stroke-[#CED7DE]', className)}
  >
    <path
      d="M10 13.75C12.0711 13.75 13.75 12.0711 13.75 10C13.75 7.92893 12.0711 6.25 10 6.25C7.92893 6.25 6.25 7.92893 6.25 10C6.25 12.0711 7.92893 13.75 10 13.75Z"
      strokeMiterlimit="10"
    />
    <path
      d="M14.125 1.375H5.875C3.38972 1.375 1.375 3.38972 1.375 5.875V14.125C1.375 16.6103 3.38972 18.625 5.875 18.625H14.125C16.6103 18.625 18.625 16.6103 18.625 14.125V5.875C18.625 3.38972 16.6103 1.375 14.125 1.375Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.875 6.25C15.4963 6.25 16 5.74632 16 5.125C16 4.50368 15.4963 4 14.875 4C14.2537 4 13.75 4.50368 13.75 5.125C13.75 5.74632 14.2537 6.25 14.875 6.25Z"
      fill="currentColor"
    />
  </svg>
);

const XIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
    aria-hidden
    className={cn('size-[17px] fill-none stroke-[#CED7DE]', className)}
  >
    <path
      d="M15.2955 1L9.19287 7.29329M7.11364 9.4375L0.75 16M0.75 1L12.1136 16H15.75L4.38636 1H0.75Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    aria-hidden
    className={cn('size-[18px] fill-none stroke-[#CED7DE]', className)}
  >
    <path
      d="M16.5 0.75H1.5C1.08579 0.75 0.75 1.08579 0.75 1.5V16.5C0.75 16.9142 1.08579 17.25 1.5 17.25H16.5C16.9142 17.25 17.25 16.9142 17.25 16.5V1.5C17.25 1.08579 16.9142 0.75 16.5 0.75Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.25 7.5V13.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.25 7.5V13.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M8.25 10.125C8.25 9.42881 8.52656 8.76113 9.01884 8.26884C9.51113 7.77656 10.1788 7.5 10.875 7.5C11.5712 7.5 12.2389 7.77656 12.7312 8.26884C13.2234 8.76113 13.5 9.42881 13.5 10.125V13.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5.25 5.625C5.87132 5.625 6.375 5.12132 6.375 4.5C6.375 3.87868 5.87132 3.375 5.25 3.375C4.62868 3.375 4.125 3.87868 4.125 4.5C4.125 5.12132 4.62868 5.625 5.25 5.625Z" />
  </svg>
);

const YouTubeIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden
    className={cn('size-[24px] fill-none stroke-[#CED7DE]', className)}
  >
    <path
      d="M22.5406 6.42C22.4218 5.94541 22.1799 5.51057 21.8392 5.15941C21.4986 4.80824 21.0713 4.55318 20.6006 4.42C18.8806 4 12.0006 4 12.0006 4C12.0006 4 5.12057 4 3.40057 4.46C2.92982 4.59318 2.50255 4.84824 2.16192 5.19941C1.82129 5.55057 1.57936 5.98541 1.46057 6.46C1.14579 8.20556 0.991808 9.97631 1.00057 11.75C0.989351 13.537 1.14334 15.3213 1.46057 17.08C1.59153 17.5398 1.83888 17.9581 2.17872 18.2945C2.51855 18.6308 2.93939 18.8738 3.40057 19C5.12057 19.46 12.0006 19.46 12.0006 19.46C12.0006 19.46 18.8806 19.46 20.6006 19C21.0713 18.8668 21.4986 18.6118 21.8392 18.2606C22.1799 17.9094 22.4218 17.4746 22.5406 17C22.8529 15.2676 23.0069 13.5103 23.0006 11.75C23.0118 9.96295 22.8578 8.1787 22.5406 6.42V6.42Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.75 15.0166L15.5 11.7466L9.75 8.47656V15.0166Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn('size-6 shrink-0 fill-white', className)}
    aria-hidden
  >
    <path
      d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6937 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6937 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
      fillOpacity="0.9"
    />
  </svg>
);

const GoogleIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn('size-6 shrink-0 fill-none', className)}
    aria-hidden
  >
    <path
      d="M21.7541 12.2199C21.7541 11.4182 21.6878 10.8332 21.5441 10.2266H12.2031V13.8449H17.6861C17.5756 14.744 16.9786 16.0982 15.6521 17.0082L15.6335 17.1293L18.5869 19.3715L18.7915 19.3916C20.6708 17.6907 21.7541 15.1882 21.7541 12.2199Z"
      fill="#4285F4"
    />
    <path
      d="M12.2002 21.7514C14.8864 21.7514 17.1415 20.8847 18.7886 19.3897L15.6492 17.0063C14.8091 17.5805 13.6815 17.9813 12.2002 17.9813C9.56932 17.9813 7.33635 16.2805 6.54036 13.9297L6.42369 13.9394L3.35266 16.2686L3.3125 16.378C4.94853 19.563 8.30907 21.7514 12.2002 21.7514Z"
      fill="#34A853"
    />
    <path
      d="M6.53907 13.9306C6.32904 13.3239 6.20749 12.6739 6.20749 12.0023C6.20749 11.3305 6.32904 10.6806 6.52802 10.0739L6.52246 9.94471L3.41294 7.57812L3.3112 7.62555C2.63691 8.94723 2.25 10.4314 2.25 12.0023C2.25 13.5731 2.63691 15.0572 3.3112 16.3789L6.53907 13.9306Z"
      fill="#FBBC05"
    />
    <path
      d="M12.2003 6.01997C14.0685 6.01997 15.3286 6.8108 16.0472 7.47168L18.855 4.785C17.1306 3.21417 14.8865 2.25 12.2003 2.25C8.3091 2.25 4.94854 4.43832 3.3125 7.62329L6.52933 10.0717C7.33638 7.72083 9.56936 6.01997 12.2003 6.01997Z"
      fill="#EB4335"
    />
  </svg>
);

const FacebookBrandIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn('size-6 shrink-0 fill-none', className)}
    aria-hidden
  >
    <path
      d="M22.5 12.0642C22.5 6.22974 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.22974 1.5 12.0642C1.5 17.337 5.33968 21.7075 10.3594 22.5V15.1179H7.69336V12.0642H10.3594V9.73675C10.3594 7.08911 11.927 5.62663 14.3254 5.62663C15.4738 5.62663 16.6758 5.83296 16.6758 5.83296V8.43274H15.3518C14.0475 8.43274 13.6406 9.24713 13.6406 10.0834V12.0642H16.5527L16.0872 15.1179H13.6406V22.5C18.6603 21.7075 22.5 17.337 22.5 12.0642Z"
      fill="#0C63D4"
    />
  </svg>
);

const PlayIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 15"
    className={cn('h-[15px] w-[13px] shrink-0 fill-white', className)}
  >
    <path d="M0 2.00317C0 0.420843 1.75049 -0.53484 3.08152 0.320818L11.383 5.65749C12.6076 6.44476 12.6076 8.23493 11.383 9.0222L3.08152 14.3589C1.75049 15.2145 0 14.2588 0 12.6765V2.00317Z" />
  </svg>
);

const PrimaryButtonArrowIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden
    className={cn('size-[18px] shrink-0', className)}
  >
    <path
      d="M6.75 13.5L11.25 9L6.75 4.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = PrimaryButtonArrowIcon;

const PaginationPrevIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    className={cn(
      'hover:stroke-background-13 size-5 stroke-white transition-all duration-500 ease-in-out',
      className
    )}
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaginationNextIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    aria-hidden
    fill="none"
    className={cn(
      'hover:stroke-background-13 size-5 stroke-white transition-all duration-500 ease-in-out',
      className
    )}
  >
    <path
      d="M7.5 15L12.5 10L7.5 5"
      strokeOpacity="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClipBoardIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 35 42"
    fill="none"
    className={cn('stroke-opai-purple h-10.5 w-[35px] shrink-0', className)}
  >
    <path d="M10.832 26.875H23.832" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.832 20.375H23.832" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M23.8324 4.125H31.957C32.388 4.125 32.8013 4.29621 33.1061 4.60095C33.4108 4.9057 33.582 5.31902 33.582 5.75V39.875C33.582 40.306 33.4108 40.7193 33.1061 41.024C32.8013 41.3288 32.388 41.5 31.957 41.5H2.70703C2.27605 41.5 1.86273 41.3288 1.55798 41.024C1.25324 40.7193 1.08203 40.306 1.08203 39.875V5.75C1.08203 5.31902 1.25324 4.9057 1.55798 4.60095C1.86273 4.29621 2.27605 4.125 2.70703 4.125H10.8316"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.20703 10.625V9C9.20703 6.84512 10.0631 4.77849 11.5868 3.25476C13.1105 1.73102 15.1771 0.875 17.332 0.875C19.4869 0.875 21.5535 1.73102 23.0773 3.25476C24.601 4.77849 25.457 6.84512 25.457 9V10.625H9.20703Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TimerIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38 44"
    fill="none"
    className={cn('stroke-opai-purple h-11 w-[38px] shrink-0', className)}
  >
    <path
      d="M18.6641 42.875C28.5362 42.875 36.5391 34.8721 36.5391 25C36.5391 15.1279 28.5362 7.125 18.6641 7.125C8.79197 7.125 0.789062 15.1279 0.789062 25C0.789062 34.8721 8.79197 42.875 18.6641 42.875Z"
      strokeMiterlimit="10"
    />
    <path d="M18.6641 24.9965L26.7074 16.9531" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.7891 0.625H23.5391" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11 11"
    fill="none"
    className={cn('fill-opai-purple size-[11px] shrink-0', className)}
  >
    <path d="M5.21514 1.2258C5.38701 0.820568 5.97239 0.820568 6.14426 1.2258L7.15865 3.61752C7.23115 3.78836 7.39498 3.90508 7.58304 3.91986L10.216 4.12687C10.6622 4.16194 10.843 4.70789 10.5032 4.99341L8.49709 6.67856C8.35382 6.79895 8.29121 6.98782 8.33498 7.16777L8.94787 9.68744C9.05171 10.1143 8.57815 10.4518 8.19621 10.223L5.94197 8.87275C5.78095 8.7763 5.57845 8.7763 5.41744 8.87275L3.16319 10.223C2.78125 10.4518 2.30767 10.1143 2.41151 9.68744L3.0244 7.16777C3.06818 6.98782 3.0056 6.79895 2.86232 6.67856L0.856219 4.99341C0.516328 4.70789 0.697221 4.16194 1.14333 4.12687L3.77637 3.91986C3.96445 3.90508 4.12827 3.78836 4.20073 3.61752L5.21514 1.2258Z" />
  </svg>
);

const BadgeStarIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={cn('fill-opai-blue size-4 shrink-0', className)}
    aria-hidden
  >
    <path d="M7.60938 0L7.9357 6.99568L12.3117 1.52786L8.4637 7.3793L15.2178 5.52786L8.66537 8L15.2178 10.4721L8.4637 8.6207L12.3117 14.4721L7.9357 9.00432L7.60938 16L7.28305 9.00432L2.90709 14.4721L6.75505 8.6207L0.00092268 10.4721L6.55338 8L0.00092268 5.52786L6.75505 7.3793L2.90709 1.52786L7.28305 6.99568L7.60938 0Z" />
  </svg>
);

const TestimonialStarIcon: FC<IconProps> = ({ className }) => (
  <span className={cn('flex items-center justify-start gap-x-1', className)}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        className="fill-[#FFF049]"
        aria-hidden
      >
        <path d="M5.44254 0.622517C5.64879 0.136244 6.35124 0.136245 6.55749 0.622518L7.77475 3.49259C7.86175 3.69759 8.05835 3.83766 8.28402 3.8554L11.4436 4.10381C11.979 4.14589 12.196 4.80103 11.7882 5.14366L9.38089 7.16583C9.20896 7.3103 9.13382 7.53695 9.18636 7.75288L9.92182 10.7765C10.0464 11.2888 9.47816 11.6937 9.01982 11.4192L6.31474 9.79886C6.12152 9.68312 5.87851 9.68312 5.6853 9.79886L2.9802 11.4192C2.52187 11.6937 1.95358 11.2888 2.07819 10.7765L2.81366 7.75288C2.86619 7.53695 2.7911 7.3103 2.61916 7.16583L0.211838 5.14366C-0.196031 4.80103 0.0210408 4.14589 0.556376 4.10381L3.71602 3.8554C3.94171 3.83766 4.1383 3.69759 4.22525 3.49259L5.44254 0.622517Z" />
      </svg>
    ))}
  </span>
);

const ExternalLinkArrowIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={cn('size-6 stroke-[#F8F9FA]', className)}
  >
    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7H17V17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GloveIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 16"
    fill="none"
    className={cn('size-5 shrink-0', className)}
    aria-hidden
  >
    <path
      d="M8.33203 15.5C12.4742 15.5 15.832 12.1421 15.832 8C15.832 3.85786 12.4742 0.5 8.33203 0.5C4.1899 0.5 0.832031 3.85786 0.832031 8C0.832031 12.1421 4.1899 15.5 8.33203 15.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.20703 12.3284L3.11936 11.7776C3.21101 11.7223 3.28691 11.6444 3.33978 11.5513C3.39266 11.4582 3.42075 11.3531 3.42135 11.2461L3.43719 8.42348C3.43786 8.30555 3.47187 8.19022 3.5353 8.0908L5.0855 5.6613C5.13132 5.58949 5.19134 5.52781 5.26186 5.48003C5.33239 5.43226 5.41193 5.39941 5.49562 5.38349C5.5793 5.36758 5.66535 5.36894 5.74849 5.38749C5.83163 5.40604 5.91009 5.44139 5.97907 5.49136L7.51468 6.60391C7.64475 6.69814 7.80609 6.73869 7.96525 6.71713L10.4247 6.38406C10.5755 6.36363 10.7137 6.28884 10.8134 6.17373L12.5444 4.17367C12.6495 4.05225 12.7038 3.89504 12.6961 3.73464L12.6048 1.83594"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9485 13.9111L12.1101 13.071C12.0317 12.9924 11.9338 12.9361 11.8264 12.908L10.15 12.468C10.0012 12.429 9.87199 12.3364 9.78717 12.2081C9.70236 12.0798 9.66785 11.9246 9.69026 11.7724L9.87657 10.5071C9.8923 10.4003 9.93543 10.2994 10.0017 10.2142C10.0681 10.129 10.1553 10.0625 10.255 10.021L12.634 9.03224C12.7439 8.98657 12.8645 8.97322 12.9817 8.99375C13.0989 9.01429 13.2078 9.06786 13.2957 9.14817L15.2405 10.9269"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownArrowLongIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7 43"
    fill="none"
    className={cn('h-[43px] w-[7px] shrink-0', className)}
    aria-hidden
  >
    <path d="M0.665365 3C0.665365 4.47276 1.85927 5.66667 3.33203 5.66667C4.80479 5.66667 5.9987 4.47276 5.9987 3C5.9987 1.52724 4.80479 0.333333 3.33203 0.333333C1.85927 0.333333 0.665365 1.52724 0.665365 3ZM3.33203 43L6.21878 38L0.445278 38L3.33203 43ZM3.33203 3L2.83203 3L2.83203 38.5L3.33203 38.5L3.83203 38.5L3.83203 3L3.33203 3Z" />
  </svg>
);

const DownArrowIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={cn('size-6 shrink-0', className)}
    aria-hidden
  >
    <path
      d="M7.80469 10L11.8047 14L15.8047 10"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfinityIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 10"
    fill="none"
    className={cn('size-5 shrink-0', className)}
    aria-hidden
  >
    <path
      d="M7.6623 6.88538L6.98368 7.65165C6.45923 8.1761 5.79105 8.53325 5.06362 8.67795C4.33619 8.82264 3.58219 8.74838 2.89697 8.46455C2.21175 8.18072 1.62608 7.70007 1.21402 7.08339C0.801965 6.46671 0.582031 5.74168 0.582031 5C0.582031 4.25832 0.801965 3.5333 1.21402 2.91661C1.62608 2.29993 2.21175 1.81928 2.89697 1.53545C3.58219 1.25163 4.33619 1.17736 5.06362 1.32206C5.79105 1.46675 6.45923 1.8239 6.98368 2.34835L11.6804 7.65165C12.2048 8.1761 12.873 8.53325 13.6004 8.67795C14.3279 8.82264 15.0819 8.74838 15.7671 8.46455C16.4523 8.18072 17.038 7.70007 17.45 7.08339C17.8621 6.46671 18.082 5.74168 18.082 5C18.082 4.25832 17.8621 3.5333 17.45 2.91661C17.038 2.29993 16.4523 1.81928 15.7671 1.53545C15.0819 1.25163 14.3279 1.17736 13.6004 1.32206C12.873 1.46675 12.2048 1.8239 11.6804 2.34835L11.0018 3.11462"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RetailEcommerceIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 43 43"
    fill="none"
    className={cn('size-13 shrink-0 stroke-[#11141D]', className)}
    aria-hidden
  >
    <path
      d="M35.125 33.5H11.9318L6.26533 2.33431C6.19725 1.95989 5.99993 1.62124 5.70775 1.3774C5.41558 1.13356 5.0471 1 4.66654 1H1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 41.625C16.2437 41.625 18.0625 39.8062 18.0625 37.5625C18.0625 35.3188 16.2437 33.5 14 33.5C11.7563 33.5 9.9375 35.3188 9.9375 37.5625C9.9375 39.8062 11.7563 41.625 14 41.625Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35.125 41.625C37.3687 41.625 39.1875 39.8062 39.1875 37.5625C39.1875 35.3188 37.3687 33.5 35.125 33.5C32.8813 33.5 31.0625 35.3188 31.0625 37.5625C31.0625 39.8062 32.8813 41.625 35.125 41.625Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.4545 25.375H35.9581C36.7192 25.375 37.4562 25.1079 38.0405 24.6202C38.6249 24.1325 39.0195 23.4552 39.1557 22.7064L41.625 9.125H7.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HealthcareIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    fill="none"
    className={cn('size-13 shrink-0 stroke-[#11141D]', className)}
    aria-hidden
  >
    <path
      d="M6.5 8.125L6.5 32.5L6.5 43.875"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 24.375L12.1875 14.625L17.875 32.5L23.5625 19.5L29.25 32.5L34.9375 22.75L40.625 32.5L45.5 24.375"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FinanceIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    fill="none"
    className={cn('size-13 shrink-0 stroke-[#11141D]', className)}
    aria-hidden
  >
    <path
      d="M45.5 26C45.5 36.7696 36.7696 45.5 26 45.5C15.2304 45.5 6.5 36.7696 6.5 26C6.5 15.2304 15.2304 6.5 26 6.5C36.7696 6.5 45.5 15.2304 45.5 26Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 8.125L19.5 11.375M19.5 27.625L19.5 30.875"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.25 19.5C29.25 17.0147 27.2353 15 24.75 15L21.5 15C19.0147 15 17 17.0147 17 19.5C17 21.9853 19.0147 24 21.5 24L24.75 24C27.2353 24 29.25 26.0147 29.25 28.5C29.25 30.9853 27.2353 33 24.75 33L21.5 33C19.0147 33 17 30.9853 17 28.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LegalRealEstateIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    fill="none"
    className={cn('size-13 shrink-0 stroke-[#11141D]', className)}
    aria-hidden
  >
    <path
      d="M3.25 43.875L48.75 43.875"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 43.875L6.5 6.5L25.5 6.5L25.5 43.875"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.5 13L42 19L42 43.875"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 16.25L13 16.25M16.25 29.25L16.25 29.25M13 37.375L13 37.375M35.75 37.375L35.75 37.375M35.75 29.25L35.75 29.25"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExpandIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={cn('stroke-background-7 size-6', className)}
  >
    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7H17V17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Contact section icons (from contact.htm)
const ContactEmailIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    aria-hidden
    className={cn('size-9 shrink-0 stroke-white/90', className)}
  >
    <path
      d="M6 6H30C31.65 6 33 7.35 33 9V27C33 28.65 31.65 30 30 30H6C4.35 30 3 28.65 3 27V9C3 7.35 4.35 6 6 6Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M33 9L18 19.5L3 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ContactPhoneIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    viewBox="0 0 27 27"
    fill="none"
    aria-hidden
    className={cn('size-9 shrink-0 stroke-white/90', className)}
  >
    <path
      d="M17.293 1.57812C19.2001 2.09104 20.939 3.09606 22.3355 4.49254C23.732 5.88901 24.737 7.62791 25.2499 9.53505"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1289 5.92969C17.2732 6.23743 18.3165 6.84045 19.1544 7.67834C19.9923 8.51622 20.5953 9.55956 20.9031 10.7039"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.87948 13.5067C9.04643 15.8924 10.9803 17.8175 13.3714 18.9736C13.5463 19.0565 13.7398 19.0924 13.9328 19.0778C14.1259 19.0632 14.3118 18.9986 14.4723 18.8903L17.9929 16.5427C18.1486 16.4389 18.3278 16.3755 18.5141 16.3584C18.7005 16.3413 18.8882 16.3709 19.0602 16.4446L25.6467 19.2674C25.8704 19.3624 26.0572 19.5276 26.1789 19.7381C26.3006 19.9485 26.3506 20.1928 26.3214 20.4341C26.1132 22.0631 25.3184 23.5604 24.0858 24.6456C22.8532 25.7308 21.2673 26.3295 19.625 26.3295C14.5527 26.3295 9.68822 24.3146 6.10158 20.728C2.51495 17.1413 0.5 12.2768 0.5 7.20454C0.500086 5.56229 1.09877 3.97637 2.18396 2.74375C3.26914 1.51112 4.76641 0.716303 6.39542 0.508123C6.63675 0.478918 6.88104 0.528933 7.09148 0.650635C7.30191 0.772336 7.4671 0.959131 7.56214 1.18287L10.3874 7.77507C10.4604 7.94559 10.4902 8.13153 10.474 8.31633C10.4579 8.50114 10.3962 8.67907 10.2947 8.8343L7.95516 12.4089C7.84868 12.5698 7.78574 12.7554 7.77247 12.9478C7.75921 13.1402 7.79607 13.3328 7.87948 13.5067V13.5067Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ContactAddressIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={31}
    viewBox="0 0 24 31"
    fill="none"
    aria-hidden
    className={cn('size-9 shrink-0 stroke-white/90', className)}
  >
    <path
      d="M11.75 16.25C14.2353 16.25 16.25 14.2353 16.25 11.75C16.25 9.26472 14.2353 7.25 11.75 7.25C9.26472 7.25 7.25 9.26472 7.25 11.75C7.25 14.2353 9.26472 16.25 11.75 16.25Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 11.75C23 21.875 11.75 29.75 11.75 29.75C11.75 29.75 0.5 21.875 0.5 11.75C0.5 8.76631 1.68526 5.90483 3.79505 3.79505C5.90483 1.68526 8.76631 0.5 11.75 0.5C14.7337 0.5 17.5952 1.68526 19.705 3.79505C21.8147 5.90483 23 8.76631 23 11.75V11.75Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BlurSvg: FC<IconProps & { idPrefix: string }> = ({ idPrefix, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="398"
    height="135"
    viewBox="0 0 398 135"
    fill="none"
    className={cn('absolute top-0 left-1/2 -translate-x-1/2 select-none', className)}
    aria-hidden
  >
    <g filter={`url(#${idPrefix}_0)`} style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx="199" cy="-16.5" rx="115" ry="67.5" fill="#8D59FF" />
    </g>
    <g opacity="0.6" filter={`url(#${idPrefix}_1)`} style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx="205.5" rx="67.5" ry="21" fill="white" />
    </g>
    <defs>
      <filter
        id={`${idPrefix}_0`}
        x="0"
        y="-168"
        width="398"
        height="303"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur" />
      </filter>
      <filter
        id={`${idPrefix}_1`}
        x="87"
        y="-72"
        width="237"
        height="144"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="25.5" result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
);

const GradientSvg: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={380}
    height={134}
    viewBox="0 0 380 134"
    fill="none"
    className={cn('pointer-events-none select-none', className)}
  >
    <g filter="url(#filter0_f_9805_101317)" style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx={199} cy="-17.5" rx={115} ry="67.5" fill="#8D59FF" />
    </g>
    <g opacity="0.6" filter="url(#filter1_f_9805_101317)" style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx="205.5" cy={-1} rx="67.5" ry={21} fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_f_9805_101317"
        x={0}
        y={-169}
        width={398}
        height={303}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={42} result="effect1_foregroundBlur_9805_101317" />
      </filter>
      <filter
        id="filter1_f_9805_101317"
        x={87}
        y={-73}
        width={237}
        height={144}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="25.5" result="effect1_foregroundBlur_9805_101317" />
      </filter>
    </defs>
  </svg>
);

const SearchIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={cn('size-6 shrink-0 stroke-white', className)}
  >
    <path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20.9984 20.9984L16.6484 16.6484" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={cn('size-5 shrink-0 stroke-white', className)}
  >
    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
  </svg>
);

const CheckIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 10"
    fill="none"
    aria-hidden
    className={cn('h-2 w-3 shrink-0 stroke-white/90', className)}
  >
    <path d="M1 5L4.5 8.5L11 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const LightningIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={cn('size-6 shrink-0 stroke-white', className)}
  >
    <path
      d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const MicrophoneIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="18"
    viewBox="0 0 13 18"
    fill="none"
    aria-hidden
    className={cn('h-[18px] w-[13px] shrink-0 fill-none stroke-white/60', className)}
  >
    <path
      d="M6.08984 0.5H6.08984C6.91865 0.5 7.7135 0.82924 8.29955 1.41529C8.8856 2.00134 9.21484 2.7962 9.21484 3.625V8.625C9.21484 9.4538 8.8856 10.2487 8.29955 10.8347C7.7135 11.4208 6.91865 11.75 6.08984 11.75H6.08984C5.67946 11.75 5.2731 11.6692 4.89395 11.5121C4.51481 11.3551 4.17032 11.1249 3.88013 10.8347C3.58995 10.5445 3.35977 10.2 3.20272 9.82089C3.04567 9.44175 2.96484 9.03539 2.96484 8.62501V3.62499C2.96484 2.79619 3.29408 2.00134 3.88013 1.41529C4.46618 0.829239 5.26104 0.5 6.08984 0.5V0.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6.08984 14.25V16.75" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M11.6813 9.25001C11.5275 10.6251 10.8722 11.8953 9.84085 12.8177C8.80948 13.7401 7.47434 14.25 6.09066 14.25C4.70699 14.25 3.37185 13.74 2.34048 12.8176C1.30911 11.8952 0.653865 10.6251 0.5 9.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ServiceGradientIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="380"
    height="134"
    viewBox="0 0 380 134"
    fill="none"
    aria-hidden
    className={cn(className)}
  >
    <g filter="url(#detailsSidebarFilter0)" style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx="199" cy="-17.5" rx="115" ry="67.5" fill="#8D59FF" />
    </g>
    <g opacity="0.6" filter="url(#detailsSidebarFilter1)" style={{ mixBlendMode: 'plus-lighter' }}>
      <ellipse cx="205.5" cy="-1" rx="67.5" ry="21" fill="white" />
    </g>
    <defs>
      <filter
        id="detailsSidebarFilter0"
        x="0"
        y="-169"
        width="398"
        height="303"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur_9805_101317" />
      </filter>
      <filter
        id="detailsSidebarFilter1"
        x="87"
        y="-73"
        width="237"
        height="144"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="25.5" result="effect1_foregroundBlur_9805_101317" />
      </filter>
    </defs>
  </svg>
);

const IconGradient: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="380"
      height="134"
      viewBox="0 0 380 134"
      fill="none"
      aria-hidden
      className={cn(className)}
    >
      <g filter="url(#detailsSidebarFilter0)" style={{ mixBlendMode: 'plus-lighter' }}>
        <ellipse cx="199" cy="-17.5" rx="115" ry="67.5" fill="#8D59FF" />
      </g>
      <g
        opacity="0.6"
        filter="url(#detailsSidebarFilter1)"
        style={{ mixBlendMode: 'plus-lighter' }}
      >
        <ellipse cx="205.5" cy="-1" rx="67.5" ry="21" fill="white" />
      </g>
      <defs>
        <filter
          id="detailsSidebarFilter0"
          x="0"
          y="-169"
          width="398"
          height="303"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur_9805_101317" />
        </filter>
        <filter
          id="detailsSidebarFilter1"
          x="87"
          y="-73"
          width="237"
          height="144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25.5" result="effect1_foregroundBlur_9805_101317" />
        </filter>
      </defs>
    </svg>
  );
};

const ClientIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    className={cn('size-4 shrink-0 stroke-white stroke-1', className)}
  >
    <path
      d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
      strokeOpacity="0.6"
      strokeMiterlimit="10"
    />
    <path
      d="M1.9375 13.4994C2.55222 12.4354 3.43613 11.5519 4.50043 10.9376C5.56472 10.3234 6.77192 9.99999 8.00076 10C9.22959 10 10.4368 10.3234 11.5011 10.9377C12.5654 11.552 13.4492 12.4355 14.0639 13.4995"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    className={cn('size-4 shrink-0 stroke-white stroke-1', className)}
  >
    <path
      d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11 1.5V3.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 1.5V3.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5.5H13.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProjectServicesIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    aria-hidden
    className={cn('size-4 shrink-0 stroke-white stroke-1', className)}
  >
    <path
      d="M10.5 11.5V1.5C10.5 0.947715 10.0523 0.5 9.5 0.5L1.5 0.5C0.947715 0.5 0.5 0.947715 0.5 1.5V11.5C0.5 12.0523 0.947715 12.5 1.5 12.5H9.5C10.0523 12.5 10.5 12.0523 10.5 11.5Z"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DetailsLocationIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    className={cn('size-4 shrink-0 stroke-white stroke-1', className)}
  >
    <path
      d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 6.5C13 11 8 14.5 8 14.5C8 14.5 3 11 3 6.5C3 5.17392 3.52678 3.90215 4.46447 2.96447C5.40215 2.02678 6.67392 1.5 8 1.5C9.32608 1.5 10.5979 2.02678 11.5355 2.96447C12.4732 3.90215 13 5.17392 13 6.5V6.5Z"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DurationIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    className={cn('size-4 shrink-0 stroke-white stroke-1', className)}
  >
    <path
      d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z"
      strokeOpacity="0.6"
      strokeMiterlimit="10"
    />
    <path
      d="M8 7.99831L10.4749 5.52344"
      strokeOpacity="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6.5 0.5H9.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const KeywordTypewriterSearchIcon: FC<IconProps> = ({ className }) => (
  <span className={cn('flex size-[30px] items-center justify-center', className)} aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
    >
      <ellipse
        cx="7.20446"
        cy="7.19982"
        rx="6.70446"
        ry="6.69982"
        stroke="white"
        strokeLinecap="square"
      />
      <path d="M11.7695 12.1406L15.5673 15.9259" stroke="white" strokeLinecap="round" />
    </svg>
  </span>
);

// Keyword section (home)
const KeywordDecorIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 57 57"
    fill="none"
    aria-hidden
    className={cn(className)}
  >
    <path
      d="M36.7895 5.71619C40.018 6.89063 43.0473 8.77285 45.6373 11.3627C48.2272 13.9527 50.1094 16.982 51.2838 20.2105M36.7895 5.71619C45.072 0.682328 52.0443 -1.00823 55.0263 1.9737C58.0082 4.95564 56.3177 11.9281 51.2838 20.2105M36.7895 5.71619C30.4511 3.41041 23.3456 3.83276 17.293 6.98401M51.2838 20.2105C47.9824 25.6424 43.243 31.6378 37.4404 37.4404C35.024 39.8566 32.5743 42.0886 30.1458 44.1092M51.2838 20.2105C53.5897 26.5489 53.1673 33.6544 50.0161 39.707M17.293 6.98401C12.2259 4.61894 8.14073 4.15754 6.14914 6.14915C4.15755 8.14073 4.61894 12.2259 6.984 17.293M17.293 6.98401C15.1534 8.09801 13.1452 9.55305 11.3491 11.3491C9.55305 13.1452 8.09801 15.1534 6.984 17.293M30.1458 44.1092C33.518 46.6439 36.7767 48.6484 39.707 50.0161M30.1458 44.1092C27.1148 41.8308 23.9923 39.124 20.9341 36.066C14.4735 29.6053 9.58105 22.8572 6.984 17.293M30.1458 44.1092C26.7423 46.9407 23.3804 49.3572 20.2105 51.2838M50.0161 39.707C48.902 41.8466 47.447 43.8548 45.6508 45.6508C43.8548 47.447 41.8466 48.902 39.707 50.0161M50.0161 39.707C52.3811 44.7741 52.8425 48.8593 50.8509 50.8509C48.8593 52.8425 44.7741 52.3811 39.707 50.0161M39.707 50.0161C33.6544 53.1673 26.5489 53.5897 20.2105 51.2838M20.2105 51.2838C16.982 50.1094 13.9527 48.2272 11.3627 45.6373C8.77285 43.0473 6.89063 40.018 5.71619 36.7895M20.2105 51.2838C11.9281 56.3177 4.95564 58.0082 1.9737 55.0263C-1.00823 52.0443 0.682329 45.072 5.71619 36.7895M6.984 17.293C3.83276 23.3456 3.41039 30.4511 5.71619 36.7895"
      stroke="white"
      strokeOpacity={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordCardTwoIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="73"
    height="72"
    viewBox="0 0 73 72"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M7.29254 15.6741C8.18905 16.4731 9.56176 16.4414 10.4205 15.579C11.3011 14.6946 11.3119 13.2674 10.4528 12.3697M7.29254 15.6741C7.25834 15.6435 7.22484 15.6118 7.19209 15.579C6.30058 14.6836 6.30058 13.232 7.19209 12.3366C8.08359 11.4413 9.52901 11.4413 10.4205 12.3366C10.4314 12.3476 10.4422 12.3586 10.4528 12.3697M7.29254 15.6741C-2.37152 27.4425 -1.72345 44.8847 9.23675 55.8921C20.8857 67.5913 39.7725 67.5913 51.4215 55.8921C63.0706 44.1929 63.0706 25.2248 51.4215 13.5255C40.1697 2.22509 22.1651 1.83984 10.4528 12.3697M32.3073 13.4786C32.3053 13.446 32.3044 13.413 32.3044 13.3799C32.3044 12.4774 33.0328 11.7458 33.9314 11.7458C34.83 11.7458 35.5584 12.4774 35.5584 13.3799C35.5584 13.3909 35.5583 13.4019 35.5581 13.4129M32.3073 13.4786C32.3581 14.3351 33.0659 15.0139 33.9314 15.0139C34.819 15.0139 35.5405 14.3001 35.5581 13.4129M32.3073 13.4786C21.5313 14.5182 13.1052 23.6367 13.1052 34.7315C13.1052 46.5238 22.6237 56.0833 34.3652 56.0833C46.1069 56.0833 55.6253 46.5238 55.6253 34.7315C55.6253 23.3414 46.7448 14.0343 35.5581 13.4129M19.3433 36.0377C20.0365 36.0086 20.5897 35.435 20.5897 34.7315C20.5897 34.0282 20.0365 33.4546 19.3433 33.4255M19.3433 36.0377C19.3249 36.0385 19.3065 36.0389 19.288 36.0389C18.5691 36.0389 17.9864 35.4536 17.9864 34.7315C17.9864 34.0096 18.5691 33.4243 19.288 33.4243C19.3065 33.4243 19.3249 33.4247 19.3433 33.4255M19.3433 36.0377C20.0026 43.7891 26.4765 49.8739 34.3652 49.8739C42.6922 49.8739 49.4425 43.0945 49.4425 34.7315C49.4425 26.3687 42.6922 19.5893 34.3652 19.5893C26.4765 19.5893 20.0026 25.6741 19.3433 33.4255M63.0289 59.1822C63.0634 59.219 63.0969 59.2571 63.1296 59.2965C64.019 60.3678 63.8752 61.9602 62.8086 62.8535C61.742 63.7466 60.1563 63.6023 59.267 62.5311C59.256 62.5179 59.2453 62.5048 59.2348 62.4915M63.0289 59.1822C62.1245 58.2161 60.6154 58.1138 59.5879 58.9741C58.5344 59.8563 58.3812 61.4209 59.2348 62.4915M63.0289 59.1822C74.7958 47.2369 75.8117 28.0377 64.8778 14.8676C53.2569 0.86998 32.5375 -1.01608 18.6 10.655C4.66237 22.3261 2.78442 43.1348 14.4054 57.1324C25.6303 70.6528 45.3436 72.8734 59.2348 62.4915M41.7412 34.7315C41.7412 38.8228 38.4389 42.1393 34.3652 42.1393C30.2916 42.1393 26.9894 38.8228 26.9894 34.7315C26.9894 30.6404 30.2916 27.3238 34.3652 27.3238C38.4389 27.3238 41.7412 30.6404 41.7412 34.7315Z"
      stroke="white"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordWorkflowTriggerIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M7 17L17 7"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7H17V17"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordWorkflowEmailIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordWorkflowSmsIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M16.5 8.26066C16.5 12.5468 13.0528 15.5 8.5 15.5V17.5C4 17 0.5 12.426 0.5 8.26066C0.5 3.97457 3.95638 0.5 8.5092 0.5C13.062 0.5 16.5 3.97457 16.5 8.26066Z"
      stroke="white"
      strokeOpacity={0.9}
    />
    <circle cx="4.5" cy="8.5" r="0.75" fill="white" fillOpacity={0.9} />
    <circle cx="8.5" cy="8.5" r="0.75" fill="white" fillOpacity={0.9} />
    <circle cx="12.5" cy="8.5" r="0.75" fill="white" fillOpacity={0.9} />
  </svg>
);

const KeywordWorkflowPushIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="21"
    viewBox="0 0 19 21"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M2.51855 8.75016C2.51608 7.86461 2.68837 6.98727 3.02554 6.16841C3.36271 5.34956 3.85815 4.60528 4.48346 3.97822C5.10876 3.35116 5.85166 2.85365 6.66957 2.51419C7.48748 2.17474 8.36433 2 9.24989 2C10.1354 2 11.0123 2.17474 11.8302 2.51419C12.6481 2.85365 13.391 3.35116 14.0163 3.97822C14.6416 4.60528 15.1371 5.34956 15.4742 6.16841C15.8114 6.98727 15.9837 7.86461 15.9812 8.75016V8.75016C15.9812 12.1079 16.6837 14.0563 17.3024 15.1212C17.3691 15.235 17.4046 15.3644 17.4053 15.4962C17.406 15.6281 17.3719 15.7578 17.3065 15.8723C17.241 15.9868 17.1466 16.0821 17.0326 16.1484C16.9186 16.2147 16.7892 16.2498 16.6573 16.2502H1.84173C1.70985 16.2498 1.58038 16.2147 1.4664 16.1484C1.35242 16.082 1.25795 15.9868 1.19252 15.8723C1.1271 15.7577 1.09303 15.628 1.09376 15.4961C1.09449 15.3642 1.12999 15.2349 1.19667 15.1211C1.81573 14.0561 2.51855 12.1077 2.51855 8.75016H2.51855Z"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 16.25V17C6.25 17.7956 6.56607 18.5587 7.12868 19.1213C7.69129 19.6839 8.45435 20 9.25 20C10.0456 20 10.8087 19.6839 11.3713 19.1213C11.9339 18.5587 12.25 17.7956 12.25 17V16.25"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.4453 0.5C15.9714 1.46343 17.2016 2.82982 18.0002 4.44834"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.5 4.44834C1.29852 2.82982 2.52874 1.46343 4.05486 0.5"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordCardFiveIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="73"
    height="72"
    viewBox="0 0 73 72"
    fill="none"
    className={cn('relative z-10', className)}
    aria-label="Keyword research network diagram"
  >
    <path
      d="M27.3716 44.6385C33.0404 47.1554 39.664 47.3068 45.6305 44.658M27.3716 44.6385C28.0957 38.1496 31.5263 32.4852 36.5 28.816M27.3716 44.6385C27.2775 45.4829 27.229 46.3411 27.229 47.2108C27.229 59.7969 37.3634 70 49.8646 70C62.3658 70 72.5 59.7969 72.5 47.2108C72.5 34.6248 62.3658 24.4217 49.8646 24.4217C44.8656 24.4217 40.2452 26.0531 36.5 28.816M27.3716 44.6385C23.1267 42.7537 19.4171 39.5426 16.9197 35.1876C10.669 24.2876 14.3784 10.35 25.2048 4.05696C36.0311 -2.23607 49.8748 1.4985 56.1253 12.3984C62.376 23.2982 58.6667 37.2359 47.8402 43.5289C47.1161 43.9498 46.3784 44.3259 45.6305 44.658M45.6305 44.658C44.9111 38.1609 41.4787 32.4888 36.5 28.816M45.6305 44.658C45.7233 45.4961 45.771 46.3478 45.771 47.2108C45.771 59.7969 35.6366 70 23.1354 70C10.6342 70 0.5 59.7969 0.5 47.2108C0.5 34.6248 10.6342 24.4217 23.1354 24.4217C28.1344 24.4217 32.7548 26.0532 36.5 28.816M31.0997 34.4622L38.2924 30.285M28.9962 38.3684L39.9809 31.9886M27.8976 41.6908L41.4521 33.8188M27.4128 44.6568L42.7157 35.7695M30.2544 45.691L43.7743 37.839M33.6561 46.4L44.6242 40.03M38.0445 46.5356L45.2544 42.3484"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeywordCardSevenIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="69"
    viewBox="0 0 60 69"
    fill="none"
    className={cn('relative z-10', className)}
    aria-label="Keyword network connection diagram"
  >
    <path
      d="M41.2695 6.86685L29.8029 0.496516L18.0815 7.12166M41.2695 6.86685L29.5481 13.492M41.2695 6.86685L41.2695 20.9148L35.9184 23.9393M29.5481 13.492L18.0815 7.12166M29.5481 13.492L29.5481 41.2666M18.0815 7.12166L18.0815 27.4501L23.6874 30.5645M29.5481 41.2666L35.9184 44.8057M29.5481 41.2666L23.6873 44.5792M23.6874 30.5645L12.2208 24.1942L0.499347 30.8193M23.6874 30.5645L11.9659 37.1896M23.6874 30.5645L23.6873 44.5792M11.9659 37.1896L0.499347 30.8193M11.9659 37.1896L12.2208 57.5747M0.499347 30.8193L0.499345 50.9495L12.2208 57.5747M41.2695 47.7644L29.2932 54.2621M41.2695 47.7644L35.9184 44.8057M41.2695 47.7644L35.9184 50.6676L29.2932 54.2621M41.2695 47.7644L41.2695 61.3969M41.2695 47.7644L41.2695 53.8799M29.2932 54.2621L17.8266 47.8918M29.2932 54.2621L29.2932 68.4042M17.8266 47.8918L23.6873 44.5792M17.8266 47.8918L17.8266 54.2621M59.1064 23.6845L47.6398 17.3142L35.9184 23.9393M59.1064 23.6845L47.385 30.3097M59.1064 23.6845L59.1064 50.9495L47.385 57.5747M47.385 30.3097L35.9184 23.9393M47.385 30.3097L47.385 57.5747M35.9184 23.9393L35.9184 44.8057M47.385 57.5747L41.2695 53.8799M41.2695 53.8799L41.2695 61.3969M41.2695 61.3969L29.2932 68.4042M29.2932 68.4042L17.8266 61.3969L17.8266 54.2621M12.2208 57.5747L17.8266 54.2621"
      stroke="white"
      strokeOpacity={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export {
  ArrowIcon,
  BadgeStarIcon,
  BlurSvg,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  ClientIcon,
  ClipBoardIcon,
  ContactAddressIcon,
  ContactEmailIcon,
  ContactPhoneIcon,
  CrossIcon,
  DetailsLocationIcon,
  DownArrowIcon,
  DownArrowLongIcon,
  DurationIcon,
  ExpandIcon,
  ExternalLinkArrowIcon,
  FacebookBrandIcon,
  FacebookIcon,
  FinanceIcon,
  GloveIcon,
  GoogleIcon,
  GradientSvg,
  HealthcareIcon,
  IconGradient,
  InfinityIcon,
  InstagramIcon,
  KeywordCardFiveIcon,
  KeywordCardSevenIcon,
  KeywordCardTwoIcon,
  KeywordDecorIcon,
  KeywordTypewriterSearchIcon,
  KeywordWorkflowEmailIcon,
  KeywordWorkflowPushIcon,
  KeywordWorkflowSmsIcon,
  KeywordWorkflowTriggerIcon,
  LegalRealEstateIcon,
  LightningIcon,
  LinkedInIcon,
  LocationIcon,
  MicrophoneIcon,
  PaginationNextIcon,
  PaginationPrevIcon,
  PlayIcon,
  PrimaryButtonArrowIcon,
  ProjectServicesIcon,
  RetailEcommerceIcon,
  SearchIcon,
  ServiceGradientIcon,
  StarIcon,
  TestimonialStarIcon,
  TimerIcon,
  XIcon,
  YouTubeIcon,
};
