import React from 'react';
import { ReactComponent as HeroSVG } from '../../assets/homed/bg.svg';
import heroCircle from  '../../assets/hero-circle.png';
import herocircle2 from  '../../assets/hero-circle-2.png';
import herosquare2 from"../../assets/hero-square-2.png";
import herosquare from "../../assets/hero-square.png";
import herodot from "../../assets/hero-triangle.png"
import herotriangle from"../../assets/hero-dot.png"
const HeroArea = () => {
   return (
      <>
          <section className="hero__area hero__height grey-bg-3 d-flex align-items-center">
            <div className="hero__shape">
               <img className="circle" src={heroCircle} alt="circle"/>
               <img className="circle-2" src={herocircle2} alt="circle"/>
               <img className="square" src={herosquare} alt="circle"/>
               <img className="square-2" src={herosquare2} alt="circle"/>
               <img className="dot" src={herodot} alt="circle"/>
               <img className="triangle" src={herotriangle} alt="circle"/>
            </div>
            <div className="containerr">
               <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-8">
                     <div className="hero__content">
                        <h2 className="hero__title">
                           <span>Get</span> <br/>
                           The Career You Deserve
                        </h2>
                        <p>{`Find Jobs , Employment & Career Opportunities.`}</p>
         
                     </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                     <div className="hero__thumb-wrapper scene ml-70 p-relative">
                        <span className="vectorWrapper">
                        <HeroSVG />
                     </span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HeroArea;