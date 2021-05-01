import React, { Component } from 'react';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: null
  }

  componentDidMount(){
    this.updatePerson()
  }

  componentDidUpdate(prevProps){
    if(this.props.itemId !== prevProps.itemId){
      this.updatePerson();
    }
  }

  updatePerson(){
    const { itemId, getData, getImageUrl } = this.props;
    if(!itemId)
      return;

    this.setState({
      loading: true
    });
    
    getData(itemId)
      .then(item => 
        this.setState({ 
          item,
          loading: false,
          image: getImageUrl(item)
        }));
  }

  render() {

    if(!this.state.item)
      return <span>Select a person from a list</span>

    const { loading, item, image } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <ItemView item={item}
                                         imageUrl={image} /> : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
        <ErrorButton />
      </div>
    )
  }
}

const ItemView = ({ item, imageUrl }) => {

  const { id, name, gender, 
          birthYear, eyeColor } = item;
                  
  return (
    <React.Fragment>
      <img className="person-image"
          src={imageUrl} alt="" />

      <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
      </div>
    </React.Fragment>
  )
}