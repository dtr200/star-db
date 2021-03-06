import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage,
         PlanetPage,
         StarshipPage,
         LoginPage,
         SecretPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? 
                        DummySwapiService : SwapiService

      return {
        swapiService: new Service()
      }
    })
  }

  componentDidCatch(){
    this.setState({ hasError: true });
  }

  render(){

    const { isLoggedIn } = this.state;
    console.log(isLoggedIn, 'render')
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>        
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet/>
              <Switch>
                <Route path="/" 
                      render={() => <h2>Welcome to StarDB</h2>}
                      exact />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" 
                      component={StarshipPage}
                      exact />       
                <Route path="/starships/:id"
                      render={({match, location, history}) => {
                          const { id } = match.params;
                          return <StarshipDetails itemId={id} />
                      }} />       
                <Route path="/secret" 
                      render={() => ( 
                        <SecretPage isLoggedIn={isLoggedIn} /> 
                      )} />
                <Route path="/login" 
                      render={() => ( 
                        <LoginPage isLoggedIn={isLoggedIn}
                                    onLogin={this.onLogin} />
                      )} />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};