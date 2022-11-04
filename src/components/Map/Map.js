import React, {useRef, useState, useEffect} from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

/*
    * Map component
    * This component is a wrapper for the OpenLayers map.
    * It is responsible for creating the map and providing it to the children.
    * It also handles the map's interactions.
    * 
    * The map is created in the useEffect hook.
    * The map is provided to the children via the MapContext.
    * The map is destroyed when the component is unmounted.
    * 
    * The map's interactions are handled in the useEffect hook.
    * The map's interactions are destroyed when the component is unmounted.
    *
*/
const Map = ({children, zoom, center}) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    // on component mount, create the map
    useEffect(() => {
        let options = {
            view: new ol.View({ zoom, center}),
            layers: [],
            controls: [],
            overlays: [],
            projection: "EPSG:4326",
        };
        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return() => mapObject.setTarget(undefined);
    }, [zoom]);
    // zoom handler that detect change
    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(zoom);
    }, []);
    // center change handler
    useEffect(() => {
        if (!map) return;
        map.getView().setCenter(center);
    }, [center])
    return (
        <MapContext.Provider value={{map}}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;