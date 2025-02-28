import React from 'react'
import { articleSuggestions } from './Data'

const ArticleSuggestions = () => {
    return (
        <div className="inner-div pb-10 pt-4">
            <div className="p-4 px-8 text-center text-2xl font-bold tracking-wide text-brand md:px-10 lg:text-2xl xl:px-20 dark:text-dark">
                Find the perfect job for{" "}
                <span className="uppercase text-brand-dark dark:text-brand">
                    you
                </span>
            </div>
            <div className="mt-0 grid grid-cols-12 gap-2 gap-x-1 pb-10 sm:mt-6 sm:gap-4 sm:gap-x-0 md:gap-3 md:px-8 lg:gap-4 lg:px-10 xl:gap-5 xl:px-20">
                {articleSuggestions.map((element, index) => (
                    <div
                        onClick={() => window.open(element.link)}
                        key={index}
                        className={`col-span-6 flex scale-90 cursor-pointer flex-col items-center gap-2 rounded-md bg-white bg-card bg-center px-2 py-6 shadow-md transition-all duration-500 ease-in-out hover:scale-95 active:scale-90 md:col-span-3 dark:bg-dark dark:shadow-dark-input`}
                    >
                        <div>
                            <img
                                src={element.img}
                                alt={`${element.title} icon`}
                                className="h-8"
                            />
                        </div>
                        <div className="text-xl font-medium tracking-wide text-brand">
                            {element.title}
                        </div>
                        <div className="text-center text-sm font-medium tracking-wide dark:text-dark-text">
                            {element.subtitle}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ArticleSuggestions