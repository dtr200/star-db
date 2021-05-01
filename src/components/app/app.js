import React, { Component } from 'react';
import ErrorButton from '../error-button';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import PersonDetails from '../item-details';
import Row from '../row';

import './app.css';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import ItemDetails from '../item-details';

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
            getPersonImage, getStarshipsImage } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11}
                   getData={getPerson}
                   getImageUrl={getPersonImage} />
    );

    const starshipDetails = (
      <ItemDetails itemId={5} 
                   getData={getStarship}
                   getImageUrl={getStarshipsImage} />
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <Row left={personDetails} right={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }
};