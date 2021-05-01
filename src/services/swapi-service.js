export default class SwapiService{

    _apiBase = `https://swapi.dev/api`;
  
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
  
        // если статус не 200
        if(!res.ok){
            throw new Error(`Could not fetch ${url},
            recieved ${res.status}`)
        }
  
        return await res.json();
    }
  
    getAllPeople = async () => {
        const peoples = await this.getResource(`/people/`);
        return peoples.results.map(person =>
                this._transformPerson(person));
    }
  
    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    getPersonImage = ({ id }) => {
        return `img/characters/${id}.jpg`;
    }
  
    getAllPlanets = async () => {
        const planets = await this.getResource(`/planets/`);
        return planets.results.map(planet => 
                this._transformPlanet(planet));
    }
  
    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    getPlanetImage = ({ id }) => {
        return `img/planets/${id}.jpg`;
    }
  
    getAllStarships = async () => {
        const starships = await this.getResource(`/starships/`);
        return starships.results.map(starship => 
                this._transformStarship(starship));
    }
    
    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    getStarshipsImage = ({ id }) => {
        return `img/starships/${id}.jpg`;
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period, 
            diameter: planet.diameter
        }
    }
    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year, 
            eyeColor: person.eye_color
        }
    }
    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer, 
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }
  }