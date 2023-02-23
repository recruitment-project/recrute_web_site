import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import { createRoot } from 'react-dom/client';

ReactDOM.render(<App />, document.getElementById("root"));
//const root1= document.getElementById('root');
//const ReactRoot = createRoot(root1)
//ReactRoot.render(<App/>)
=======
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
>>>>>>> 1b80af36ae2277984052fece04ef15b2757a3d67
