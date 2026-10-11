function PageContainer({ children }) {
  return <div className="w-full h-screen">{children}</div>;
}

function PageHeaderViewModel({ children }) {
  return <div className="flex flex-col h-95 ">{children}</div>;
}

function PageHeaderViewModelHost({ children }) {
  return <div className="h-95"> {children} </div>;
}

function PageHeaderRenderer({ children }) {
  return <div className="mt-12 h-103 p-4"> {children} </div>;
}

function PageHeaderViewModelHeadlineInfo({ children, className = "w-51" }) {
  return <div className={`mt-6 ${className}`}> {children} </div>;
}

function PageHeaderViewModelHeadlineFullWidthHero({ children }) {
  return <div> {children} </div>;
}

function TabContent({ children }) {
  return <div className='pb-18'> {children} </div>;
}

function SectionListHost({ children }) {
  return <div className="pt-2"> {children} </div>;
}

function SectionListContents({ children }) {
  return <div className="px-2"> {children} </div>;
}

export {
  PageContainer,
  PageHeaderViewModel,
  PageHeaderRenderer,
  PageHeaderViewModelHost,
  PageHeaderViewModelHeadlineInfo,
  PageHeaderViewModelHeadlineFullWidthHero,
  TabContent,
  SectionListHost,
  SectionListContents,
};
