import React from "react";
//import ReactDOM from "react-dom";
import  ReactDOM   from "react-dom/client";

import "./index.css";
import App from "./App";
// import { createRoot } from 'react-dom/client';

//ReactDOM.render(<App />, document.getElementById("root"));
// const root = document.getElementById('root');
// const ReactRoot = ReactDOM.createRoot(root)
// ReactRoot.render(<App/>)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
     <App/>
    </>
);
