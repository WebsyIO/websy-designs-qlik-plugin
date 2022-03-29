## Object Manager
This component allows you to control the active state of objects that are connected to Qlik and turn them on an off according to the current "view" on screen. This prevents objects from rendering or calling for data unnessarily.
For example, if you have an application with 2 views/pages, let's call them "Dashboard" and "Detail". When looking at the "Dashboard" view and interacting with filters to make selections etc., we don't want objects on the "Detail" view to update.
The Object Manager has been designed primarily for use with the [Websy Router](https://github.com/WebsyIO/websy-designs/tree/master/src/components/router), however, it can also be used independently.

#### Initializing the Object Manager
To instantiate a new instance of a Object Manager, you can do this:
``` javascript
const options = {}
const objectManager = new WebsyDesigns.QlikObjectManager(options)
objectManager.init().then(() => {
  // The connection is now open
})
```

#### Options
The following options are available on the Object Manager:
* **actions** - An Array of Qlik action definitions to assign to a DOM Event and HTML Element. See 'Actions' below for further information
* **alwaysLoadGlobal** - Determines whether or not the "global" view should be updated everytime a view is loaded.
* **applySelections** - Determines whether or not to apply selections that have been passed through as Url parameters. See 'Url Selections' below for further information
* **enigmaConfig** - An object used to define the connection to the Qlik Server. Supports the following options:
  * **app** - The ID of the Qlik App to connect to
  * **authUrl** - The Url to redirect to if the current user is not authenticated/authorized in Qlik. If specified the *onMustAuthenticate* option is ignored.
  * **onMustAuthenticate** - A custom function to use to handle users that are not authenticated
  * **ticket** - If using a custom login mechanism to create a ticket, the ticket can be provided here to authorize the user
  * **url** - The Websocket Url to use to connect to the Qlik Server. Should be in the format `wss://<servername>/app/<appId>`
* **enigmaSchema** - The JSON schema to be used with the Enigma library
* **initialActions** - An Array of Qlik actions to be performed when the connection to the application is first opened. See 'Actions' below for further information
* **keepAlive** - Determines whether or not to send an instruction to the Qlik server to keep the connection alive. Defaults to *false*
* **views** - An Object that contains the structure for each "view" within the Object Manager. See 'Views' below for more information
* **visualizationPlugins** - An Array of custom JavaScript classes which can be used to visualize objects. See 'Visualization Plugins' below for more information

#### Methods
**loadView** 
Loads the speificed view which will create or update each of the associated objects and reattach them to the Qlik Engine
``` javascript
objectManager.loadView(view)
```

**closeView** 
Closes the speificed view which will prevent the associated objects for responding to updates in the Qlik Engine/Associative model
``` javascript
objectManager.closeView(view)
```

#### Views
The "views" property in options above is an Object. Each "key" on the object represents the name of a "view" and the properties within it allow is to control what that view consists of. The following options can be provided:
* **actions** - An Array of Qlik action definitions to assign to a DOM Event and HTML Element. See 'Actions' below for further information
* **objects** - An Array of objects to render when the view is loaded. 
  * **elementId** - The Id of the HTML element where the object will be rendered
  * **definition** - If the object is powered by Qlik data, this property should contain the Generic Object definition. The value provided can be either an Object or a String with a Url to the JSON file with the definition. If provided, the *type* property is ignored. See 'Visualization Plugins' below for more information on how the object is rendered when using a definition
  * **options** - A placeholder for passing in additional options to the constructor of the associated Visualization Plugin.
  * **render** - For simpler objects and visualizations, a full Visualization Plugin may not be required. In those situations, a function can be provided which will be called each time the view loads. The function will receive 2 parameters (the options for this objects and if applicable, the Qlik object model)
  * **type** - For objects not powered by Qlik data, a Visualization Plugin can be provided here to determine how to visualize the object

**Defining Views with a Generic Object definition**
``` javascript
const objectManager = new WebsyDesigns.QlikObjectManager({
  views: {
    dashboard: {
      actions: [],
      objects: [
        {
          elementId: 'someObject',
          definition: '/someDirectory/object1.json'
        },
        {
          elementId: 'someOtherObject',
          definition: '/someDirectory/object2.json'
        }
      ]
    }
  }
})
```

**Defining Views with a Qlik Generic Object definition and custom render() function**
``` javascript
const objectManager = new WebsyDesigns.QlikObjectManager({
  views: {
    dashboard: {
      actions: [],
      objects: [
        {
          elementId: 'someObject',
          definition: { qInfo: { qType: 'custom' }, totalSales: { qStringExpression: `Num(Sum(Sales), '$#,##0.00'` } }
          render: (options, model) => {
            model.getLayout().then(layout => {
              const el = document.getElementById(options.elementId)
              el.innerHTML = `Total Sales <div>${layout.totalSales}</div>`
            })
          }
        }
      ]
    }
  }
})
```

#### Using the Websy Router and Object Manager together
The Object Manager has been designed primarily for use with the [Websy Router](https://github.com/WebsyIO/websy-designs/tree/master/src/components/router), however, it can also be used independently.
To use the Object Manager with the Websy Router, you can use the *show* and *hide* events of the Router to manage the state of the Object Manager views. For this to work, the views defined in the options in the Object Manager should match the "views" defined in your HTML for the Router.
``` javascript
const router = new WebsyDesigns.Router({
  onShow: (view, params, group) => {    
    objectManager.loadView(view)
  },
  onHide: view => {    
    objectManager.closeView(view)
  }
})
```

#### Actions
The Object Manager allows actions to be executed against the Qlik Application with a simple configuration. These actions can be performed in the following places:
1. When the user interacts specific HTML elements. These actions are defined in the *actions* property in the options
2. When the Qlik Application is first opened. These actions are defined in the *initialActions* property in the options
3. When a particular "view" is loaded. These actions are defined in the *actions* property on the "view" in the options

**Constructing an Action for the DOM**
``` javascript
// Clear all selections when the HTML element with Id 'clearAllSelections' is clicked
const objectManager = new WebsyDesigns.QlikObjectManager({
  actions: [
    {
      event: 'click',
      elementId: 'clearAllSelections',
      items: [{          
        method: 'clearAll',
        params: []
      }]
    }
  ],
  ...
})
```

**Constructing an Initial Action for when the Qlik App first opens**
``` javascript
// Unlock and Clear all selections
const objectManager = new WebsyDesigns.QlikObjectManager({
  initialActions: [
    {          
      method: 'unlockAll'
    },
    {          
      method: 'clearAll'
    }
  ]
  ...
})
```

**Constructing an Action for when a view loads**
``` javascript
// Make a selection of 'UK' in the Country field and lock it
const objectManager = new WebsyDesigns.QlikObjectManager({
  views: [
    dashboard: {
      actions: [
        {          
          method: 'selectValues',
          field: 'Country',
          lock: true,
          params: [[{qText: 'UK'}], false] // Select UK with a toggle mode of false
        }
      ],
      objects: [...]
    }
  ],
  ...
})
```

#### Url Selections
Enabling Url selections allows you to share Urls from the application which will in turn, make selections in the appropriate fields when the application is first opened. The format of the Url parameters is the same as that used in the [Qlik Single API](https://help.qlik.com/en-US/sense-developer/February2022/Subsystems/APIs/Content/Sense_ClientAPIs/single-integration-api.htm#:~:text=%26bookmark%3DPzsxuKb-,select,-Mandatory%3A%20Field%20name).

For example, the following Url (if used with the Websy Router), will load the "detail" view and select UK in the Country field
```
https://somedomainname/detail?select=Country,UK
```

#### Visualization Plugins
The Object Manager has been designed to work with Visualization Plugins to enable developers to create solutions with minimal effort by visualizing data with reusable classes. These classes are connected to Qlik and typically use a Generic Object Definition to get data out of Qlik. When including the *Websy Designs Qlik Plugin* in your application, the following Visualization Plugins will be available by default and provide a Qlik wrapper around the equivalent underlying classes from the core *Websy Designs* framework:
* **Chart** - [Read the docs]()
* **DatePicker** - [Read the docs]()
* **Dropdown** - [Read the docs]()
* **KPI** - [Read the docs]()
* **Map** - [Read the docs]()
* **Table** - [Read the docs]()

**Building a custom Plugin**
To create a custom Visualization Plugin you will need to build a JavaScript class that has the following format:
``` javascript
class MyCustomPlugin {
  constructor (elementId, options) {
    // here we typically store the elementId and options parameters for use later
    this.elementId = elementId
    this.options = Object.assign({}, options)
    // this is also an opportunity to add an event listener to our element
    const el = document.getElementById(this.elementId)
    el.addEventListener('click', this.onClick.bind(this))
    this.render()
  }
  close () {
    // this function is optional and called when a view closes
    // we typically use this function to clean up the DOM
    const el = document.getElementById(this.elementId)
    el.innerHTML = ''
  }
  onClick (event) {
    // do something with the event
  }
  render () {
    // this function is called when a view loads
    // we typically use this function to get the latest layout of the object from Qlik
    this.options.model.getLayout().then(layout => {
      // do something with the layout and render to the DOM
      const el = document.getElementById(this.elementId)
      el.innerHTML = `Total Sales <div>${layout.totalSales}</div>`
    })
  }
}
```

**Register a plugin for use**
To register a plugin in the Object Manager you can add an item to the visualizationPlugins Array. Each registration should contain 2 properties:
* **id** - An identifier to use for the plugin. We can use this in a Qlik Generic Object definition to point an object to the class 
* **definition** - The JavaScript class definition for the plugin

``` javascript
const objectManager = new WebsyDesigns.QlikObjectManager({
  visualizationPlugins: [
    {
      id: 'my-custom-type',
      definition: MyCustomPlugin
    }
  ]
})
```

**Configuring an object to use a plugin**
When creating a Qlik Generic Object definition for one of our objects, we can use the *qType* of the object to specify which plugin when would like to be used to render the 

#### Accessing the enigmaModel for the App
After the Object Manager has successfully connected, the app instance is stored so that it can be used within your code. This provides access to the Doc API, more information can be found [here](https://qlik.dev/apis/json-rpc/qix/doc#%23%2Fentries%2FDoc)

For example, to perform a *clearAll* on the app, you could do this

``` javascript
const objectManager = new WebsyDesigns.QlikObjectManager(options)
objectManager.init().then(() => {
  objectManager.app.clearAll().then(() => {
    // all selections have been cleared
  })
})
```