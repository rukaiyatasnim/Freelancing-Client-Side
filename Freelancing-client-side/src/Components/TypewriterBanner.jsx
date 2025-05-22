import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypewriterBanner = () => {
    return (
        <section className="flex flex-col justify-center items-center text-center h-[60vh] px-6 bg-white">
            <h1 className="text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight text-gray-900 tracking-tight">
                Hire top freelancers for
                <br />
                <span className="text-emerald-700 font-mono ml-1 inline-block">
                    <Typewriter
                        words={["Web Development", "Design", "Writing", "Marketing"]}
                        loop={0} // infinite loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-semibold text-gray-600">
                Find skilled professionals to get your tasks done efficiently and affordably.
            </p>
        </section>
    );
};

export default TypewriterBanner;
