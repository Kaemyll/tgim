import React, {useState} from 'react';
import './App.css';
import Map from './components/Map/Map';
import { Layers, TileLayer, VectorLayer } from './components/Layers';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from './Source';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from './components/Controls';

let mapConfig = require('./json/mapConfig.json');


const App = () => {
  return (
    <div className="App">
        <Map {...mapConfig.view}>
          <MapLayer type={"Tile"} source={osm()}/>
          <MapLayer 
            type={"Vector"} 
            source={toVector(geometries, "EPSG:3857")} 
            style={FeatureStyles.MultiPolygon}
          />
          <MapLayer 
            type={"Vector"} 
            source={toVector(geometry, "EPSG:3857")} 
            style={FeatureStyles.Polygon}
          />
        </Map>
    </div>
  );
}

export default App;