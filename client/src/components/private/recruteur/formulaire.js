import React from "react";
import Step from "./multiSteppForm";
import { createContext } from "react";
export const StepperContext=createContext(null);
export default function StepNavigation(props) {
    return (
        <div className="stepWrapper">
            {props.labelArray.map((item, index) => <Step key={index} index={index} label={item} updateStep={props.updateStep} selected={props.currentStep === index + 1}></Step>) }
        </div>
    )
}