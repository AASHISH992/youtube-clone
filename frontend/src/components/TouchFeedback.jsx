
function TouchFeedback({ children, height = 'h-12', width = 'w-12' }) {
  return (
    <div
      className={`flex flex-none justify-center items-center  rounded-full ${height} ${width}`}
    >
      {children}
    </div>
  );
}

export { TouchFeedback };
