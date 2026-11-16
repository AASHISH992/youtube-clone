
function TouchFeedback({ children, className='size-8  rounded-full'}) {
  return (
    <div
      className={`flex justify-center items-center active:bg-gray-300 hover:bg-gray-200 ${className} `}
    >
      {children}
    </div>
  );
}

export { TouchFeedback };
