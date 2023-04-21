import React from "react";
import about from"../../assets/about.jpg"
const About = () => {
  return (
    <section className="py-16" id="About">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 container mx-auto px-5">
        <div className="flex justify-start items-center sm:mb-5 ">
          <img
            src={about}
            alt="hero banner"
            className="w-full rounded-md h-[220px]"
          />
        </div>
        {/*........blog banner image end..........*/}

        <div className="about-text">
          <div>
            <p className="text-base md:text-xl lg:text-2xl font-bold text-primaryy mb-1 md:mb-3">
            Who we are
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-accent mb-3 md:mb-5">
            We help employers and candidates find the right fit
            </h1>
            <p className="pb-4 text-accent">
            We Recruit was founded to make meaningful connections between job seekers and employers.What started as a way to help small businesses find great candidates has grown into a leading online employment marketplace that connects millions of job seekers with companies of all sizes. Every day, We Recruit aims to make every workplace happier and more productive by transforming the way employers and candidates find the right fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;