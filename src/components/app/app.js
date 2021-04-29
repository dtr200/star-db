import React, { Component } from 'react';
import ErrorButton from '../error-button';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';

import './app.css';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch(){
    this.setState({ hasError: true });
  }

  render(){

    if(this.state.hasError)
      return <ErrorIndicator />

    const { showRandomPlanet } = this.state;

    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div>
        <Header />
        {planet}
        <div className="row mb2 button-row">
          <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
};