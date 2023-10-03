
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
 
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// function Football() {
//   const shoot = (a, b) => {
//     alert(b.type);
//     /*
//     'b' represents the React event that triggered the function,
//     in this case the 'click' event
//     */
//   }

//   return (
//     <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Football />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
