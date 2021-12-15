interface GoBackIconProps {}

const GoBackIcon: React.FunctionComponent<GoBackIconProps> = () => {
  return (
    <svg
      className="w-12 h-12 hover:scale-125 cursor-pointer transition-all duration-300"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      <path
        d="M9.11008 5.08002C9.98008 4.82002 10.9401 4.65002 12.0001 4.65002C16.7901 4.65002 20.6701 8.53002 20.6701 13.32C20.6701 18.11 16.7901 21.99 12.0001 21.99C7.21008 21.99 3.33008 18.11 3.33008 13.32C3.33008 11.54 3.87008 9.88002 4.79008 8.50002"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.87012 5.32L10.7601 2"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.87012 5.31995L11.2401 7.77995"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoBackIcon;
