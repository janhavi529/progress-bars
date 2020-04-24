import React from 'react';
import ProgressBarDemo from './components/ProgressBarDemo/ProgressBarDemo';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ProgressBarDemo} />
      <Redirect from="/:anything" to="/" />
    </BrowserRouter>
  );
}

export default App;

