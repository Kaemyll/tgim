import React, {useContext, useEffect, useState} from "react";
import {Fullscreen} from "ol/control";
import MapContext from "./MapContext";

const FullScreenControl = () => {
    const {map} = useContext(MapContext);
    const [control] = useState(new Fullscreen());

    useEffect(() => {
        if (!map) return;
        map.addControl(control);
        return () => {
            if (map) {
                map.removeControl(control);
            }
        };
    }, [map]);
    return null;
};

export default FullScreenControl;