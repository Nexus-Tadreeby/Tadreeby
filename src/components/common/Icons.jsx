// All SVG icons in one place for easy reuse
export const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const LockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const CardIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

export const EyeIcon = ({ show, onClick, className = "w-4 h-4" }) => (
  <span onClick={onClick} className="cursor-pointer">
    {show ? (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </span>
);

export const BuildingIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 21V7l3-4 3 4v14M9 12h6M9 16h6" />
  </svg>
);

export const CodeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const InfoIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const WarnIcon = ({ className = "w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const ChevronDown = ({ className = "w-4 h-4 text-gray-400" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SuccessIcon = ({ className = "w-8 h-8 text-green-500" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const ArrowLeft = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export const ArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const ErrorIcon = ({ className = "w-8 h-8 text-red-500" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Add these to your Icons.jsx
export const UploadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const CameraIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const DocumentIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v4m0 0l-2-2m2 2l2-2" />
  </svg>
);

export const CloseIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const StudentIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#EFF6FF" />
    <path
      d="M41.3333 25.3333V33.3333M41.3333 25.3333L28 18.6666L14.6667 25.3333L28 32L41.3333 25.3333Z"
      stroke="#2563EB"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 28V34.6667C24.6667 37.3333 31.3333 37.3333 36 34.6667V28"
      stroke="#2563EB"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UniversityIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#FFF4ED" />
    <path
      d="M28 12L27.416 12.303L14.084 19.0919L13.3333 19.4807V21.8595H42.6667V19.4807L41.916 19.0919L28.5827 12.303L28 12ZM28 15.1135L35.8333 19.0919H20.1667L28 15.1135ZM16 23.2432V37.0811H14.6667V39.8486H41.3333V37.0811H40V23.2432H37.3333V37.0811H34.6667V23.2432H32V37.0811H29.3333V23.2432H26.6667V37.0811H24V23.2432H21.3333V37.0811H18.6667V23.2432H16ZM12 41.2324V44H44V41.2324H12Z"
      fill="#FD7474"
    />
  </svg>
);

export const CompanyIcon = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="56" height="56" rx="16" fill="#ECFDF5" />
    <path
      d="M36.4 32H33.6V34.6667H36.4M36.4 26.6667H33.6V29.3333H36.4M39.2 37.3333H28V34.6667H30.8V32H28V29.3333H30.8V26.6667H28V24H39.2M25.2 21.3333H22.4V18.6667H25.2M25.2 26.6667H22.4V24H25.2M25.2 32H22.4V29.3333H25.2M25.2 37.3333H22.4V34.6667H25.2M19.6 21.3333H16.8V18.6667H19.6M19.6 26.6667H16.8V24H19.6M19.6 32H16.8V29.3333H19.6M19.6 37.3333H16.8V34.6667H19.6M28 21.3333V16H14V40H42V21.3333H28Z"
      fill="#68B69D"
    />
  </svg>
);

export const MatchingIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="14" fill="#EEF3FF" />
    <path
      d="M24 32.1593C29.5229 32.1593 34 27.6822 34 22.1593C34 16.6364 29.5229 12.1593 24 12.1593C18.4771 12.1593 14 16.6364 14 22.1593C14 27.6822 18.4771 32.1593 24 32.1593Z"
      stroke="#1D4ED8"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M26.0174 18.4239C25.6237 17.9505 25.156 17.5751 24.6411 17.3192C24.1262 17.0633 23.5742 16.9319 23.0169 16.9326C22.4596 16.9319 21.9076 17.0633 21.3927 17.3192C20.8778 17.5751 20.4101 17.9505 20.0164 18.4239M29.4995 30.4401L34 35.8407"
      stroke="#1D4ED8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TrackingIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="14" fill="#EBF8F3" />
    <path
      d="M14.6667 24.3888C14.6667 23.9292 14.7572 23.4741 14.9331 23.0494C15.109 22.6248 15.3668 22.239 15.6918 21.914C16.0168 21.589 16.4027 21.3312 16.8273 21.1553C17.2519 20.9794 17.7071 20.8888 18.1667 20.8888C18.6263 20.8888 19.0814 20.9794 19.5061 21.1553C19.9307 21.3312 20.3165 21.589 20.6416 21.914C20.9666 22.239 21.2244 22.6248 21.4003 23.0494C21.5761 23.4741 21.6667 23.9292 21.6667 24.3888C21.6667 25.3171 21.2979 26.2073 20.6416 26.8637C19.9852 27.5201 19.0949 27.8888 18.1667 27.8888C17.2384 27.8888 16.3482 27.5201 15.6918 26.8637C15.0354 26.2073 14.6667 25.3171 14.6667 24.3888ZM18.1667 23.2222C17.8573 23.2222 17.5605 23.3451 17.3417 23.5639C17.1229 23.7827 17 24.0794 17 24.3888C17 24.6983 17.1229 24.995 17.3417 25.2138C17.5605 25.4326 17.8573 25.5555 18.1667 25.5555C18.4761 25.5555 18.7728 25.4326 18.9916 25.2138C19.2104 24.995 19.3333 24.6983 19.3333 24.3888C19.3333 24.0794 19.2104 23.7827 18.9916 23.5639C18.7728 23.3451 18.4761 23.2222 18.1667 23.2222ZM23.2222 24.3888C23.2222 24.0794 23.3451 23.7827 23.5639 23.5639C23.7827 23.3451 24.0795 23.2222 24.3889 23.2222H28.2778C28.5872 23.2222 28.8839 23.3451 29.1027 23.5639C29.3215 23.7827 29.4444 24.0794 29.4444 24.3888C29.4444 24.6983 29.3215 24.995 29.1027 25.2138C28.8839 25.4326 28.5872 25.5555 28.2778 25.5555H24.3889C24.0795 25.5555 23.7827 25.4326 23.5639 25.2138C23.3451 24.995 23.2222 24.6983 23.2222 24.3888ZM14.6667 17.3888C14.6667 17.0794 14.7896 16.7827 15.0084 16.5639C15.2272 16.3451 15.5239 16.2222 15.8334 16.2222H28.2778C28.5872 16.2222 28.8839 16.3451 29.1027 16.5639C29.3215 16.7827 29.4444 17.0794 29.4444 17.3888C29.4444 17.6983 29.3215 17.995 29.1027 18.2138C28.8839 18.4326 28.5872 18.5555 28.2778 18.5555H15.8334C15.5239 18.5555 15.2272 18.4326 15.0084 18.2138C14.7896 17.995 14.6667 17.6983 14.6667 17.3888Z"
      fill="#1D936C"
    />
    <path
      d="M15.0555 10C13.7147 10 12.4288 10.5326 11.4807 11.4807C10.5326 12.4288 10 13.7147 10 15.0556V29.0556C10 30.3964 10.5326 31.6823 11.4807 32.6304C12.4288 33.5785 13.7147 34.1111 15.0555 34.1111H29.0555C30.3963 34.1111 31.6822 33.5785 32.6303 32.6304C33.5784 31.6823 34.1111 30.3964 34.1111 29.0556V15.0556C34.1111 13.7147 33.5784 12.4288 32.6303 11.4807C31.6822 10.5326 30.3963 10 29.0555 10H15.0555ZM12.3333 15.0556C12.3333 13.5529 13.5529 12.3333 15.0555 12.3333H29.0555C30.5582 12.3333 31.7777 13.5529 31.7777 15.0556V29.0556C31.779 29.6374 31.5933 30.2043 31.248 30.6725C30.9026 31.1408 30.416 31.4857 29.8597 31.6565C29.6046 31.7353 29.3366 31.7757 29.0555 31.7778H15.0555C14.3336 31.7778 13.6412 31.491 13.1306 30.9805C12.6201 30.47 12.3333 29.7775 12.3333 29.0556V15.0556Z"
      fill="#1D936C"
    />
    <path
      d="M18.9445 37.9999C18.0952 38.0003 17.2596 37.7867 16.5146 37.3789C15.7697 36.9711 15.1395 36.3822 14.6823 35.6666H29.8333C31.3804 35.6666 32.8642 35.052 33.9581 33.9581C35.0521 32.8641 35.6667 31.3804 35.6667 29.8333V14.6837C36.3823 15.141 36.9712 15.7712 37.379 16.5161C37.7868 17.261 38.0004 18.0967 38 18.9459V29.8348C37.9996 32.0005 37.139 34.0773 35.6075 35.6085C34.076 37.1397 31.999 37.9999 29.8333 37.9999H18.9445Z"
      fill="#1D936C"
    />
  </svg>
);

export const RocketIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.6 7.99556L5.55 8.82056C5.78333 8.3539 6.025 7.9039 6.275 7.47056C6.525 7.03723 6.8 6.6039 7.1 6.17056L5.7 5.89556L3.6 7.99556ZM7.15 10.0706L10 12.8956C10.7 12.6289 11.45 12.2206 12.25 11.6706C13.05 11.1206 13.8 10.4956 14.5 9.79556C15.6667 8.6289 16.5792 7.33306 17.2375 5.90806C17.8958 4.48306 18.1833 3.17056 18.1 1.97056C16.9 1.88723 15.5833 2.17473 14.15 2.83306C12.7167 3.4914 11.4167 4.4039 10.25 5.57056C9.55 6.27056 8.925 7.02056 8.375 7.82056C7.825 8.62056 7.41667 9.37056 7.15 10.0706ZM11.6 8.44556C11.2167 8.06223 11.025 7.5914 11.025 7.03306C11.025 6.47473 11.2167 6.0039 11.6 5.62056C11.9833 5.23723 12.4583 5.04556 13.025 5.04556C13.5917 5.04556 14.0667 5.23723 14.45 5.62056C14.8333 6.0039 15.025 6.47473 15.025 7.03306C15.025 7.5914 14.8333 8.06223 14.45 8.44556C14.0667 8.8289 13.5917 9.02056 13.025 9.02056C12.4583 9.02056 11.9833 8.8289 11.6 8.44556ZM12.075 16.4706L14.175 14.3706L13.9 12.9706C13.4667 13.2706 13.0333 13.5414 12.6 13.7831C12.1667 14.0247 11.7167 14.2622 11.25 14.4956L12.075 16.4706ZM19.9 0.145565C20.2167 2.16223 20.0208 4.12473 19.3125 6.03306C18.6042 7.9414 17.3833 9.76223 15.65 11.4956L16.15 13.9706C16.2167 14.3039 16.2 14.6289 16.1 14.9456C16 15.2622 15.8333 15.5372 15.6 15.7706L11.4 19.9706L9.3 15.0456L5.025 10.7706L0.1 8.67056L4.275 4.47056C4.50833 4.23723 4.7875 4.07056 5.1125 3.97056C5.4375 3.87056 5.76667 3.8539 6.1 3.92056L8.575 4.42056C10.3083 2.68723 12.125 1.46223 14.025 0.745565C15.925 0.0288979 17.8833 -0.171102 19.9 0.145565ZM1.875 13.9456C2.45833 13.3622 3.17083 13.0664 4.0125 13.0581C4.85417 13.0497 5.56667 13.3372 6.15 13.9206C6.73333 14.5039 7.02083 15.2164 7.0125 16.0581C7.00417 16.8997 6.70833 17.6122 6.125 18.1956C5.70833 18.6122 5.0125 18.9706 4.0375 19.2706C3.0625 19.5706 1.71667 19.8372 0 20.0706C0.233333 18.3539 0.5 17.0081 0.8 16.0331C1.1 15.0581 1.45833 14.3622 1.875 13.9456ZM3.3 15.3456C3.13333 15.5122 2.96667 15.8164 2.8 16.2581C2.63333 16.6997 2.51667 17.1456 2.45 17.5956C2.9 17.5289 3.34583 17.4164 3.7875 17.2581C4.22917 17.0997 4.53333 16.9372 4.7 16.7706C4.9 16.5706 5.00833 16.3289 5.025 16.0456C5.04167 15.7622 4.95 15.5206 4.75 15.3206C4.55 15.1206 4.30833 15.0247 4.025 15.0331C3.74167 15.0414 3.5 15.1456 3.3 15.3456Z"
      fill="currentColor"
    />
  </svg>
);

export const InsightsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 20V15.7C2.05 14.8333 1.3125 13.8208 0.7875 12.6625C0.2625 11.5042 0 10.2833 0 9C0 6.5 0.875 4.375 2.625 2.625C4.375 0.875 6.5 0 9 0C11.0833 0 12.9292 0.6125 14.5375 1.8375C16.1458 3.0625 17.1917 4.65833 17.675 6.625L18.975 11.75C19.0583 12.0667 19 12.3542 18.8 12.6125C18.6 12.8708 18.3333 13 18 13H16V16C16 16.55 15.8042 17.0208 15.4125 17.4125C15.0208 17.8042 14.55 18 14 18H12V20H10V16H14V11H16.7L15.75 7.125C15.3667 5.60833 14.55 4.375 13.3 3.425C12.05 2.475 10.6167 2 9 2C7.06667 2 5.41667 2.675 4.05 4.025C2.68333 5.375 2 7.01667 2 8.95C2 9.95 2.20417 10.9 2.6125 11.8C3.02083 12.7 3.6 13.5 4.35 14.2L5 14.8V20H3ZM8 13H10L10.15 11.75C10.2833 11.7 10.4042 11.6417 10.5125 11.575C10.6208 11.5083 10.7167 11.4333 10.8 11.35L11.95 11.85L12.95 10.15L11.95 9.4C11.9833 9.26667 12 9.13333 12 9C12 8.86667 11.9833 8.73333 11.95 8.6L12.95 7.85L11.95 6.15L10.8 6.65C10.7167 6.56667 10.6208 6.49167 10.5125 6.425C10.4042 6.35833 10.2833 6.3 10.15 6.25L10 5H8L7.85 6.25C7.71667 6.3 7.59583 6.35833 7.4875 6.425C7.37917 6.49167 7.28333 6.56667 7.2 6.65L6.05 6.15L5.05 7.85L6.05 8.6C6.01667 8.73333 6 8.86667 6 9C6 9.13333 6.01667 9.26667 6.05 9.4L5.05 10.15L6.05 11.85L7.2 11.35C7.28333 11.4333 7.37917 11.5083 7.4875 11.575C7.59583 11.6417 7.71667 11.7 7.85 11.75L8 13ZM9 10.5C8.58333 10.5 8.22917 10.3542 7.9375 10.0625C7.64583 9.77083 7.5 9.41667 7.5 9C7.5 8.58333 7.64583 8.22917 7.9375 7.9375C8.22917 7.64583 8.58333 7.5 9 7.5C9.41667 7.5 9.77083 7.64583 10.0625 7.9375C10.3542 8.22917 10.5 8.58333 10.5 9C10.5 9.41667 10.3542 9.77083 10.0625 10.0625C9.77083 10.3542 9.41667 10.5 9 10.5Z"
      fill="currentColor"
    />
  </svg>
);