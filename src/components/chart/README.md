## Websy Designs Qlik Visualization Plugin - Chart
The *WebsyDesigns.QlikPlugins.Chart* class provides a Qlik Wrapper around the *WebsyDesigns.Chart* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.
The *WebsyDesigns.Chart* can be used to visualise data in an x-axis/y-axis configuration, for example Bar Chart, Line Chart, Scatter Plot, Combo Chart

#### Standalone Implementation with Enigma.js
To use the Chart visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the Chart visualization in an Object Manager configuration you simple need to provide a *qType* of `chart` within the Generic Object Definition.
``` JSON
{
  "qInfo": {
    "qType": "chart"
  } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. The Chart visualization expects a **qHyperCubeDef** in a straight table format (*qMode='S'*) and can support the following dimension/measure combinations:
* Single Dimension, Single Measure
* Single Dimension, Multiple Measures
* Two Dimensions, Single Measure
* No Dimensions, Multiple Measures

The following properties can be added to the Generic Object structure to customise the appearance of the Chart

**Dimension Options**
* **scale** - Determines what type of scale to use for the X axis, should be either *'Time'* or *'Band'*. Defaults to *'Band'*

``` JSON
{
  "qInfo": {
    "qType": "chart"
  },
  "qHyperCubeDef": {
    "qDimensions": [
      { 
        "qDef": 
      }
    ],
    "qMeasures": []
  },
  "options": {
    "type": "line"
  }
}
```

**Measure Options**
* **color** - Sets the color for the series
* **scale** - Determines what type of scale to use for the Y axis, should be either *'Linear'* or *'Log'*. Defaults to *'Linear'*
* **showArea** - If type is *'line'*, setting this property to true will fill in the area below it.
* **type** - Which visualization type should be used to visualize the series data. Should be one of - *'Bar'*, *'Line'* or *'Symbol'*

**General Options**


**Chart Type**
The type of visualization used to render each series (measure) can be specified in 2 places depending on your needs. To use the same type for every measure, you can use the top level *"options"* property, like this:
``` JSON
{
  "qInfo": {
    "qType": "chart"
  },
  "qHyperCubeDef": {},
  "options": {
    "type": "line"
  }
}
```

You can also specify the type at the measure level, like this:
``` JSON
{
  "qInfo": {
    "qType": "chart"
  },
  "qHyperCubeDef": {},
  "options": {
    "type": "line"
  }
}
```
