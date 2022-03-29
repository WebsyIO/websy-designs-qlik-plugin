## Websy Designs Qlik Visualization Plugin - Dropdown
The *WebsyDesigns.QlikPlugins.Dropdown* class provides a Qlik Wrapper around the *WebsyDesigns.Dropdown* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.

#### Standalone Implementation with Enigma.js
To use the Dropdown visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the Dropdown visualization in an Object Manager configuration you simple need to provide a *qType* of `dropdown` within the Generic Object Definition.
``` JSON
{
    "qInfo": {
      "qType": "dropdown"
    } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. 