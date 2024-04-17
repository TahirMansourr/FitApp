import React from 'react'

const LoadingComponent = ({LoadingText} : {LoadingText : string}) => {
  return (
    <div className=" flex gap-2 items-center">
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.86 0-7.177-2.21-8.832-5.709l-1.154 1.154z"
        ></path>
        </svg>
         {LoadingText}
     </div>
  )
}

export default LoadingComponent