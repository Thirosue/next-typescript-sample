export const Progress = ({
  processing,
}: {
  processing: boolean
}): JSX.Element => {
  return (
    <>
      {!!processing && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#fff"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
            <h2 className="mt-2 text-center text-white text-base">
              Loading...
            </h2>
          </div>
        </>
      )}
    </>
  )
}

export default Progress
