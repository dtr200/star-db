import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers'; 
import { SwapiServiceConsumer } from '../swapi-service-context';

const StarshipDetails = ({ itemId, swapiService }) => {
    const { getStarship, getStarshipsImage } = swapiService;

    return (
        <ItemDetails itemId={itemId} 
            getData={getStarship}
            getImageUrl={getStarshipsImage}>
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost in credits" />
        </ItemDetails>
    )
            
}

export default withSwapiService(StarshipDetails);