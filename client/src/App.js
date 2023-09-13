import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to the Recipe Sharing Platform!
          </p>
          {/* Navigation Links */}
          <nav>
            <Link to="/">Home</Link>
            {/* Add more links as needed */}
          </nav>
        </header>

        {/* Routes */}
        <main>
          <Switch>
            <Route path="/" exact component={RecipeList} />
            <Route path="/recipe/:id" component={Recipe} />
            {/* Add more routes as needed */}
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
