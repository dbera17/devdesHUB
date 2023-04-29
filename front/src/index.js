import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register';
import Login from './pages/login';

const App = () => {
  return (
    <div>
      <Login></Login>
      <Register></Register>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));