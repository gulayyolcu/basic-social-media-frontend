import React from 'react'

const PageNotFound = () => {
    return (
        <div>
            <div>
            <div className="h-screen bg-blue-600 flex justify-center content-center flex-wrap">
                <p className="font-sans text-9xl text-white error-text">404</p>
            </div>

            <div className="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
                <span className="opacity-50">Take me back to </span>
                Home Page
            </div>

        </div> 
        </div>
    )
}

export default PageNotFound
