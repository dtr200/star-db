import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import Row from '../row';

import './app.css';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import { PersonList,
         PlanetList,
         StarshipList,
         PersonDetails,
         PlanetDetails,
         StarshipDetails } from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
        selectedPerson: 5
      }
    });
  };

  componentDidCatch(){
    this.setState({ hasError: true });
  }

  render(){

    if(this.state.hasError)
      return <ErrorIndicator />

    const { showRandomPlanet, selectedPerson } = this.state;

    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    const { getPerson, getStarship, 
            getPersonImage, getStarshipsImage,
            getAllPeople, getAllPlanets } = this.swapiService;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11} />
          <PlanetDetails itemId={11} />
          <StarshipDetails itemId={11} />

          <PersonList />
          <StarshipList />
          <PlanetList />
          
        </div>
      </ErrorBoundry>
    );
  }
};