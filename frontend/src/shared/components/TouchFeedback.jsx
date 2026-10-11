
function TouchFeedback({ children, className='h-12 w-12 rounded-full'}) {
  return (
    <div
      className={`flex flex-none justify-center items-center ${className} `}
    >
      {children}
    </div>
  );
}

export { TouchFeedback };
