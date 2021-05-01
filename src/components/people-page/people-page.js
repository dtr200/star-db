import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import './people-page.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 5,
        hasError: false
    }

    componentDidCatch(){
        this.setState({
            hasError: true
        });
    }

    onPersonSelected = (id) => {
        this.setState({
          selectedPerson: id
        })
      }

    render(){

        const { selectedPerson, hasError } = this.state;
        const { renderItem } = this.props;

        if(hasError)
            return <ErrorIndicator />

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                {(i) => 
                   `${i.name} (${i.gender}, ${i.birthYear})`}
            </ItemList>
        )

        const personDetails = (
            <ItemDetails itemId={selectedPerson} />
        )

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        )
    }
}