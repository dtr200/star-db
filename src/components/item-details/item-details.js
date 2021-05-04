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
    this.updateItem()
  }

  componentDidUpdate(prevProps){
    if(this.props.itemId !== prevProps.itemId ||
       this.props.getData !== prevProps.getData ||
       this.props.getImageUrl !== prevProps.getImageUrl){
      this.updateItem();
    }
  }

  updateItem(){
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
    const content = !loading ? ( <ItemView item={item}
                                         imageUrl={image}>
                                    {this.props.children}
                                  </ItemView> ) : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
        <ErrorButton />
      </div>
    )
  }
}

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export {Record};

const ItemView = ({ item, imageUrl, children }) => {

  const { name } = item;
                  
  return (
    <React.Fragment>
      <img className="person-image"
          src={imageUrl} alt="" />

      <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map(children, child => {
                return React.cloneElement(child, { item })
              })
            }
          </ul>
      </div>
    </React.Fragment>
  )
}