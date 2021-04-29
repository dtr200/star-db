import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null
  }

  componentDidMount(){
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        })
      });
  }

  renderItems(arr){
    const data = arr.map(({ name, id }) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    })
    data.length = 5;
    return data;
  }

  render() {

    const { peopleList } = this.state;

    if(!peopleList){
      return <Spinner />
    }

    const items = this.renderItems(peopleList);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}