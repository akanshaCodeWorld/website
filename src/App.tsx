import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/Home';
import CategoryListPage from './components/CategoryList';
import ProductListPage from './components/Product';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/category/:category" component={CategoryListPage} />
        <Route path="/products" component={ProductListPage} />
      </Switch>
    </Router>
  );
};

export default App;
