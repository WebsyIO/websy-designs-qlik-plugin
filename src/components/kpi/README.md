## Websy Designs Qlik Visualization Plugin - KPI
The *WebsyDesigns.QlikPlugins.KPI* class provides a Qlik Wrapper around the *WebsyDesigns.KPI* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.

#### Standalone Implementation with Enigma.js
To use the KPI visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the KPI visualization in an Object Manager configuration you simple need to provide a *qType* of `kpi` within the Generic Object Definition.
``` JSON
{
    "qInfo": {
      "qType": "kpi"
    } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. The KPI visualization expects a **qHyperCubeDef** in a straight table format (*qMode='S'*) and can support