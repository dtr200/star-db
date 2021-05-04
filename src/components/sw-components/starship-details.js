import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost in credits" />
        </ItemDetails>
    )      
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipsImage
    }
}

export default withSwapiService(StarshipDetails, mapMethodsToProps);