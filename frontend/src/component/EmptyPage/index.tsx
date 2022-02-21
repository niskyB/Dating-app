interface EmptyPageProps {
  title: string;
  description?: string;
}

const EmptyPage: React.FunctionComponent<EmptyPageProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full h-matchAndChatHeight ">
      <div className="text-base font-semibold">{title}</div>
      <img src="./images/sadDog.png" alt="sad dog" />
      <div className="text-base font-light">{description}</div>
    </div>
  );
};

export default EmptyPage;
