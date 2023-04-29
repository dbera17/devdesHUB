import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register';

const App = () => {
  return (
    <div>
      <Register></Register>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));