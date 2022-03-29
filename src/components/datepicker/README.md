## Websy Designs Qlik Visualization Plugin - DatePicker
The *WebsyDesigns.QlikPlugins.DatePicker* class provides a Qlik Wrapper around the *WebsyDesigns.DatePicker* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.

#### Standalone Implementation with Enigma.js
To use the DatePicker visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the DatePicker visualization in an Object Manager configuration you simple need to provide a *qType* of `datepicker` within the Generic Object Definition.
``` JSON
{
    "qInfo": {
      "qType": "datepicker"
    } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. 