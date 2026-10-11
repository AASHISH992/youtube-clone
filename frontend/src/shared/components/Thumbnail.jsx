function ThumbnailBottomOverlayViewModel({ children }) {
  return (
    <div className="absolute bottom-4 left-0.8 text-xs font-medium w-full h-1/8 ">
      {children}
    </div>
  );
}

function ThumbnailBottomOverlayViewModelHost({children}) {
return (
    <div className='w-full h-full flex justify-end '>
        {children}
    </div>

)
}

function ThumbnailBottomOverlayViewModelBadgeContainer({ children }) {
    return (
        <div className=' w-1/5 h-full'>
            {children}
        </div>
    )

}





export { ThumbnailBottomOverlayViewModel, ThumbnailBottomOverlayViewModelHost, ThumbnailBottomOverlayViewModelBadgeContainer }
