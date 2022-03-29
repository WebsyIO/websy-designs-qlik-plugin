## Websy Designs Qlik Visualization Plugin - GeoMap
The *WebsyDesigns.QlikPlugins.GeoMap* class provides a Qlik Wrapper around the *WebsyDesigns.GeoMap* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.

#### Standalone Implementation with Enigma.js
To use the GeoMap visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the GeoMap visualization in an Object Manager configuration you simple need to provide a *qType* of `map` within the Generic Object Definition.
``` JSON
{
    "qInfo": {
      "qType": "map"
    } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. The GeoMap visualization expects a **qHyperCubeDef** in a straight table format (*qMode='S'*) and can render features using a geoJSON definition or polygons provided by the Qlik *qMatrix*.

When using geoJSON, a qAttributeExpression can be added to the measure in the *qHyperCube* to control the background color of the rendered features -
``` JSON
{
    "qInfo": {
      "qType": "map"
    },
    "qHyperCubeDef": {
      "qDimensions": [
        {
          "qDef": {
            "qFieldDefs": ["Country"],
            "width": "200px"
          }
        }
      ],
      "qMeasure": [
        {
          "qDef": {
            "qDef": "Sum(Sales)"
          },
          "qAttributeExpressions": [
            {
              "qExpression": "if(Sum(Sales) > 10000, '#00dd00', '#dd0000')"
            }
          ]
        }
      ]
    }
}
```

To render polygons, the *type* property on the measure should be set and the data in the measure should be an Array of LatLng values. A *qAttributeExpression* can also be added to the measure to control the line color of the rendered polygon.
``` JSON
{
    "qInfo": {
      "qType": "map"
    },
    "qHyperCubeDef": {
      "qDimensions": [
        {
          "qDef": {
            "qFieldDefs": ["Country"],
            "width": "200px"
          }
        }
      ],
      "qMeasure": [
        {
          "qDef": {
            "qDef": "Concat(LatLng)",
            "type": "polygon"
          }
        }
      ]
    }
}
```

The following additional properties can also be provided to add further control to the styling of the map
* **center** - A LatLng to specify the center point on the map. If not provided will be calculated based on the rendered data points
* **disablePan** - If set to true will disable the ability to pan in the map
* **disableZoom** - If set to true will disable the ability to zoom in the map
* **geoJSON** - A url to a JSON file containing geoJSON to be used (if required)
* **showLegend** - If set to true will show a legend on the bottom (or specified side) of the map 
* **tileUrl** - Determines which tiles to use on the map.
* **zoom** - Determines the initial zoom level of the map. If not provided will be calculated based on the rendered data points
``` JSON
{
    "qInfo": {
      "qType": "map"
    },
    "qHyperCubeDef": {
      "qDimensions": [
        {
          "qDef": {
            "qFieldDefs": ["Country"],
            "width": "200px"
          }
        }
      ],
      "qMeasure": [
        {
          "qDef": {
            "qDef": "Concat(LatLng)",
            "type": "polygon"
          }
        }
      ]
    },
    "options": {                  
      "disablePan": true,
      "disableZoom": true,      
      "showLegend": true,
      "tileUrl": "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      "zoom": 7
    }
}
```
