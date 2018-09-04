import React, { Component } from 'react';
import '../App.css'
import { Map, TileLayer } from 'react-leaflet';
import axios from 'axios';
import Markers from './markers';
import Details from './details';
export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      mapCenter: [28.7041, 77.1025],
      earthquakeArray: [],
      markerSelected: null
    }
    this.getData();
  }
  getData() {
    var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
    axios.get(url).then((response) => {
      var earthquakeData = response.data.features.map((elem) => {
        return { 'position': [elem.geometry.coordinates[1], elem.geometry.coordinates[0]], 'mag': elem.properties.mag, 'place': elem.properties.place };
      });
      earthquakeData = earthquakeData.slice(0, 10);
      this.setState({ earthquakeArray: earthquakeData });
    });
  }

  render() {
    const MarkersList = this.state.earthquakeArray.map((earthquakeObj) => {
      return (
        <Markers
          key={Math.random()}
          onMarkerSelect={markerSelected => this.setState({
            markerSelected: markerSelected,
            zoom: 10,
            mapCenter: markerSelected
          })}
          positionArray={earthquakeObj.position} />
      )
    }
    )
    var mag = null;
    var place = 'please select';
    const filteredArray = this.state.earthquakeArray.filter((obj) => {
      if (obj.position === this.state.markerSelected) {
        this.mag = obj.mag;
        this.place = obj.place;
        return obj;
      }
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Map className="map-box" center={this.state.mapCenter} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {MarkersList}
            </Map>
          </div>
          <div className="col-md-4">
            <Details marker={this.state.markerSelected} mag={this.mag} place={this.place} />
          </div>
        </div>
      </div>
    );
  }

}