import React, { Component } from 'react';
import "./nprogress.css";
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from './api';
import { OfflineAlert } from "./Alert";



class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 32,
  }


  async componentDidMount() {
    this.mounted = true;

    if (!navigator.onLine) {
      this.setState({
        infoText:
          "As you are offline, you are only viewing the cached events from your last session",
      });
    }
    getEvents().then((response) => {
      if (this.mounted) {
        this.setState({
          events: response.events,
          locations: response.locations,
        });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }


  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((response) => {
        const locationEvents =
          location === "all"
            ? response.events
            : response.events.filter((event) => event.location === location);
        const events = locationEvents.slice(0, numberOfEvents);
        return this.setState({
          events: events,
          currentLocation: location,
          locations: response.locations,
        });
      });
    } else {
      getEvents().then((response) => {
        const locationEvents =
          currentLocation === "all"
            ? response.events
            : response.events.filter(
              (event) => event.location === currentLocation
            );
        const events = locationEvents.slice(0, eventCount);
        return this.setState({
          events: events,
          numberOfEvents: eventCount,
          locations: response.locations,
        });
      });
    }
  };



  render() {
    return (
      <div className="App">

        <OfflineAlert text={this.state.infoText} />

        <CitySearch
          locations={this.state.locations}

          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;