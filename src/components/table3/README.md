## Websy Designs Qlik Visualization Plugin - Table
The *WebsyDesigns.QlikPlugins.Table* class provides a Qlik Wrapper around the *WebsyDesigns.Table* class so that it can be used with the Qlik Engine API. It can be used as a standalone component or in combination with the *Object Manager*.

#### Standalone Implementation with Enigma.js
To use the Table visualization directly with the Engine API (using Enigma.js)

#### Object Manager Implementation
To use the Table visualization in an Object Manager configuration you simple need to provide a *qType* of `table` within the Generic Object Definition.
``` JSON
{
    "qInfo": {
      "qType": "table"
    } 
}
```

#### Generic Object Definition
The majority of the configuration is done within the Generic Object definition. The Table visualization expects a **qHyperCubeDef** in either a Straight Table format (*qMode='S'*) or Pivot Table format (*qMode='P'). If a Pivot Table structure is used, please note that it currently only supports 2 dimensions (one left and one top). Expand/collapse functionality is not currently supported.

The following properties can be assigned to either a dimension or measure in the `qDef` section:
* **classes** - A space separated string of additional CSS classes to assign to each cell in the column
* **clickable** - If set to true, performs a selection in Qlik when a cell is clicked
* **linkText** - If *showAsLink* is set to true, determines the text to display instead on the link instead of the actual cell value
* **openInNewTab** - If *showAsLink* is set to true, forces the link to open in a new browser tab
* **show** - If set to false, hides the column
* **showAsImage** - If set to true, renders an `<img>` tag in the cell using the cell value as the *src*
* **showAsLink** - If set to true, renders the value as a hyperlink
* **showAsRouterLink** - If set to true, adds the `websy-trigger` class to the cell and assigns a `data-view` attribute using the provided cell value to enable the link to work within the Websy Router.
* **width** - The width of the column

For example:
```JSON
{
    "qInfo": {
      "qType": "table"
    },
    "qHyperCubeDef": {
      "qDimensions": [
        {
          "qDef": {
            "qFieldDefs": ["Country"],
            "width": "200px"
          }
        }
      ]
    }
}
```