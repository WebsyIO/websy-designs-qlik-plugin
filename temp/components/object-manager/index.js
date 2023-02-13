/* 
  global
  include
  enigma
  location
  XMLHttpRequest
  WebsyDesigns
  Chart
  Table
  GeoMap
  Dropdown
  DatePicker
  KPI
*/ 
class ObjectManager {
  constructor (options) {
    const defaults = {      
      helpEvent: 'mouseover',
      applySelections: false,
      actions: [],
      retryCount: 5,
      initialActions: []  
    }
    const defaultVisualisationPlugins = [
      {
        id: 'kpi',
        definition: KPI
      },
      {
        id: 'table',
        definition: Table
      },
      {
        id: 'chart',
        definition: Chart 
      },
      {
        id: 'map',
        definition: GeoMap 
      },
      {
        id: 'dropdown',
        definition: Dropdown
      },
      {
        id: 'datepicker',
        definition: DatePicker
      }
    ]
    this.app = null
    this.paused = false
    this.supportedChartTypes = []
    this.activeViews = []
    this.chartLibrary = {}
    this.globalObjectsLoaded = false    
    // this.options = this.mergeObjects({}, defaults, options)            
    this.options = Object.assign({}, defaults, options)
    if (options.visualisationPlugins && options.visualisationPlugins.length > 0) {
      const visKeys = options.visualisationPlugins.map(d => d.id)
      defaultVisualisationPlugins.forEach(p => {
        if (visKeys.indexOf(p.id) === -1) {
          this.options.visualisationPlugins.push(p)
        }
      })
    }
    else {
      this.options.visualisationPlugins = Object.assign({}, defaultVisualisationPlugins)
    }          
    if (this.options.visualisationPlugins && this.options.visualisationPlugins.length > 0) {
      for (let i = 0; i < this.options.visualisationPlugins.length; i++) {
        this.registerVisualisation(this.options.visualisationPlugins[i].id, this.options.visualisationPlugins[i].definition)
      }
    }    
  }
  buildChildElement (elementId, text) {
    let el = document.getElementById(`${elementId}_vis`)
    if (el) {
      return ''
    }
    let html = `
      <article id='${elementId}_vis' class='websy-vis-article'></article>
      <div id='${elementId}_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>
    `
    if (text && text !== '') {
      html += `
        <i class='websy-vis-help-listener' data-element='${elementId}'></i>
        <div id='${elementId}_help' class='websy-vis-help'><span>${text || ''}</span></div>        
      `
    }
    return html
  }  
  mergeObjects () {    
    // Variables
    let extended = {}
    let deep = true
    let i = 0

    // Check if a deep merge
    if (typeof arguments[0] === 'boolean') {
      deep = arguments[0]
      i++
    }

    // Merge the object into the extended object
    let merge = (obj) => {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            // If we're doing a deep merge and the property is an object
            extended[prop] = this.mergeObjects(extended, extended[prop], obj[prop])
          } 
          else {
            // Otherwise, do a regular merge
            if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
              if (obj[prop].length > 0) {
                // try {
                extended[prop] = [...extended[prop], ...obj[prop]]
                // } 
                // catch (error) {
                //   console.log('prop', prop)
                //   console.log(extended[prop])
                //   console.log(obj[prop])
                //   console.log(error)
                // }                
              }              
            }
            else {
              extended[prop] = obj[prop]  
            }            
          }
        }
      }
    }
    // Loop through each object and conduct a merge
    for (; i < arguments.length; i++) {
      merge(arguments[i])
    }
    return extended
  }
  init () {
    return new Promise((resolve, reject) => {      
      this.prep('global')        
      this.connectToApp().then(() => {                          
        this.executeAction(0, this.options.initialActions, () => {
          this.selectFromUrl(() => {
            resolve()
          })
        })          
      }, reject)
    })
  }
  pause () {
    this.paused = true
  }
  play (resume, excludeViews) {
    if (typeof excludeViews === 'undefined') {
      excludeViews = []
    }
    this.paused = false
    if (resume === true) {
      if (excludeViews.indexOf('global') === -1) {
        this.loadObjects('global') 
      }      
      for (let i = 0; i < this.activeViews.length; i++) {
        if (excludeViews.indexOf(this.activeViews[i]) === -1) {
          this.loadObjects(this.activeViews[i])
        }
      }
    }        
  }
  request (method, url, data, responseType) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)		
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.responseType = 'text'
      if (responseType) {
        xhr.responseType = responseType
      }
      xhr.withCredentials = true
      xhr.onload = () => {        
        let response = xhr.responseType === 'text' ? xhr.responseText : xhr.response
        if (response !== '' && response !== 'null') {
          try {
            response = JSON.parse(response)
          }
          catch (e) {
            // Either a bad Url or a string has been returned
          }
        }
        else {
          response = null
        }      
        if (response.err) {					
          reject(JSON.stringify(response))
        }
        else {					
          resolve(response)	
        }				
      }
      xhr.onerror = () => reject(xhr.statusText)
      if (data) {
        xhr.send(JSON.stringify(data))	
      }
      else {
        xhr.send()
      }			
    })
  }
  prep (view) {
    // for (let view in this.options.views) {
    // sort out the elements in each view
    for (let o = 0; o < this.options.views[view].objects.length; o++) {
      let config = this.options.views[view].objects[o]
      let el = document.getElementById(config.elementId)
      if (el) {
        el.innerHTML += this.buildChildElement(config.elementId, config.help)
        if (config.help && config.help !== '') {
          el.addEventListener(this.options.helpEvent, this.handleEvent.bind(this))
          el.addEventListener('mouseout', this.handleEvent.bind(this))
        }
      }
    }
    // }    
    // setup  the event listeners for the actions
    // actions should not have a visualisation in the same property structure
    for (let a = 0; a < this.options.actions.length; a++) {      
      let el = document.getElementById(this.options.actions[a].elementId)
      if (el) {
        el.addEventListener(this.options.actions[a].event, () => {                                
          for (let i = 0; i < this.options.actions[a].items.length; i++) {
            let item = this.options.actions[a].items[i]
            if (typeof item.params === 'undefined') {
              item.params = []
            }
            if (item.field) {
              this.app.getField(item.field).then(field => {                
                field[item.method](...item.params)
              })
            }
            else {
              this.app[item.method](...item.params)
            }
          }          
        })
      }
    }
    this.options.views[view].prepped = true
  }
  connectToApp () {
    return new Promise((resolve, reject) => {
      // check for enigma.js      
      const originalId = this.options.enigmaConfig.app
      if (this.options.enigmaConfig.app) {
        this.options.enigmaConfig.app = this.normalizeId(this.options.enigmaConfig.app) 
      }      
      if (typeof enigma === 'undefined') {
        reject({
          error: 'Enigma.js not found.'
        })
        return
      }
      if (typeof this.options.enigmaSchema === 'undefined') {
        reject({
          error: 'enigmaSchema property not found.'
        })
        return
      }
      let url = this.options.enigmaConfig.url
      if (this.options.enigmaConfig.ticket) {
        if (url.indexOf('?') === -1) {
          url += '?'
        }
        else {
          url += '&'
        }
        url += `qlikTicket=${this.options.enigmaConfig.ticket}`
      }
      const MAX_RETRIES = 5
      let config = {
        schema: this.options.enigmaSchema,
        url,
        onRejected: function (sessionReference, request, error) {          
          if (error.code === this.options.enigmaSchema.enums.LocalizedErrorCode.LOCERR_GENERIC_ABORTED) {                  
            request.tries = (request.tries || 0) + 1            
            if (request.tries <= MAX_RETRIES) {
              return request.retry()
            }
          }                
          return this.Promise.reject(error)
        }
      }
      let session = enigma.create(config)
      this.session = session      
      session.open().then(global => {
        this.global = global
        global.getActiveDoc().then(app => {          
          if (app) {
            this.app = app
            if (this.options.views.global) {
              this.executeActions('global').then(() => {
                resolve()
              })            
            }
            else {
              resolve()  
            }
          }
          else {
            return this.openApp(originalId).then(() => {
              resolve()
            })
          }
        }, err => {  
          const e = err        
          if (originalId) {
            return this.openApp(originalId).then(() => {
              resolve()
            }, err => {
              this.sessionOnNotification({err})
            }) 
          }          
          else {
            resolve()
          }
        })
        if (this.options.keepAlive === true) {                    
          this.keepAlive()
        }
      }, err => {
        reject(err)
      })
      session.on('traffic:received', (data) => {
        if (typeof data.suspend !== 'undefined') {
          this.sessionSuspended()
        }        
      })
      session.on('notification:*', (eventName, data) => {        
        if (eventName === 'OnAuthenticationInformation') {
          if (data.mustAuthenticate === true) {
            if (this.options.enigmaConfig.authUrl) {
              window.location = this.options.enigmaConfig.authUrl + window.location.search.replace('?', '%3F').replace('=', '%3D') 
            } 
            else if (this.options.enigmaConfig.onMustAuthenticate) {
              this.options.enigmaConfig.onMustAuthenticate()
            }           
            else if (data.loginUri) {
              window.location = data.loginUri
            }
          }
          else if (data.mustAuthenticate === false) {
            this.user = {
              userDirectory: data.userDirectory,
              userId: data.userId
            }
          }
        }
        else {
          this.sessionOnNotification(data, eventName)
        }
      })
      session.on('suspended', this.sessionSuspended.bind(this))
      session.on('resumed', this.sessionResumed.bind(this))
      session.on('closed', this.sessionClosed.bind(this))
    })        
  }
  closeApp () {
    this.session.close()
    this.app = null
    for (let view in this.options.views) {
      this.options.views[view].objects.forEach(o => {
        delete o.objectId
        delete o.vis
        o.attached = false
      })
      delete this.options.views[view]      
    }
  } 
  keepAlive () {
    this.global.engineVersion()
    setTimeout(() => {
      this.keepAlive()
    }, 59000)
  } 
  openApp (appId) {
    return new Promise((resolve, reject) => {
      this.global.openDoc(appId).then(app => {        
        this.app = app 
        if (this.options.views.global) {
          this.executeActions('global').then(() => {
            resolve()
          })            
        }
        else {
          resolve()  
        }
      }, err => {
        reject(err)
      })
    })
  }
  loadView (view, force) {
    if (typeof force === 'undefined') {
      force = false
    }
    if (this.paused === true && force === false) {
      return
    }
    if (view === '' || !this.options.views[view]) {
      return
    }    
    if (this.activeViews.indexOf(view) === -1 && view !== 'global') {
      this.activeViews.push(view)
    }  
    if (this.options.views[view].controller && this.options.views[view].initialized !== true) {
      this.options.views[view].controller.init(() => {
        this.options.views[view].initialized = true
        if (this.options.views[view].prepped !== true) {
          this.prep(view)
        }
        this.executeActions(view).then(() => {    
          if ((this.globalObjectsLoaded === false || this.options.alwaysLoadGlobal === true) && view !== 'global') {
            this.loadObjects('global', force)
            this.globalObjectsLoaded = true
          }
          this.loadObjects(view, force)
          if (view === 'global') {
            this.globalObjectsLoaded = true
          }
        })
      })
    }  
    else {
      if (this.options.views[view].prepped !== true) {
        this.prep(view)
      }
      console.log('Running Actions', view)
      this.executeActions(view).then(() => {    
        console.log('Actions complete', view)
        if ((this.globalObjectsLoaded === false || this.options.alwaysLoadGlobal === true) && view !== 'global') {
          this.loadObjects('global', force)
          this.globalObjectsLoaded = true
        }
        this.loadObjects(view, force)
        if (view === 'global') {
          this.globalObjectsLoaded = true
        }
      })
    }    
  }
  executeAction (index, actionList, callbackFn) {
    let item = actionList[index]
    if (typeof item === 'undefined') {
      callbackFn()
      return
    }
    if (typeof item.params === 'undefined') {
      item.params = []
    }
    if (item.field) {
      this.app.getField(item.field).then(field => {
        field[item.method](...item.params).then(() => {
          if (item.lock === true) {
            field.lock().then(() => {
              index++
              if (index === actionList.length) {
                callbackFn()
              }
              else {
                this.executeAction(index, actionList, callbackFn)
              }
            })
          }
          else {
            index++
            if (index === actionList.length) {
              callbackFn()
            }
            else {
              this.executeAction(index, actionList, callbackFn)
            }
          }          
        })
      })
    }
    else {
      this.app[item.method](...item.params).then(() => {
        index++
        if (index === actionList.length) {
          callbackFn()
        }
        else {
          this.executeAction(index, actionList, callbackFn)
        }
      })
    }
  }
  executeActions (view) {    
    return new Promise((resolve, reject) => {
      if (!this.options.views[view] || !this.options.views[view].actions || this.options.views[view].actions.length === 0) {
        resolve()
      }
      this.executeAction(0, this.options.views[view].actions, resolve)
    })
  }
  loadObjects (view, force) {
    console.log('Loading objects', view)
    if (typeof force === 'undefined') {
      force = false
    }
    if (this.paused === true && force === false) {
      return
    }    
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {                
        if (objList[i].objectId) {
          objList[i].attached = true
          if (objList[i].vis && objList[i].vis.render) {
            objList[i].vis.render()  
          }
          else if (objList[i].render) {
            objList[i].render(objList[i], objList[i].model)
          }          
        }
        else if (objList[i].definition) {
          if (typeof objList[i].definition === 'string' && objList[i].definition.toLowerCase().indexOf('.json') !== -1) {
            this.request('GET', objList[i].definition).then(def => {
              objList[i].definition = def
              this.createObjectFromDefinition(objList[i])
            })
          }
          else {
            this.createObjectFromDefinition(objList[i])
          }          
        }
        else {
          this.createObjectFromDefinition(objList[i])
        }       
      }
    }
  }
  closeObjects (view) {
    this.closeView(view)
  }
  closeView (view) {
    if (view === '' || !this.options.views[view]) {
      return
    }
    const viewIsActive = this.activeViews.indexOf(view)
    if (viewIsActive !== -1) {
      this.activeViews.splice(viewIsActive, 1)
    }
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {
        if (objList[i].vis) {
          objList[i].attached = false
          if (objList[i].vis.close) {
            objList[i].vis.close()  
          }
        }
        else if (objList[i].objectId) {
          if (objList[i].close) {
            objList[i].close()  
          }
          this.destroyObjectFromId(objList[i])          
        }
      }
    }
  }  
  handleEvent (event) {
    if (event.target.classList.contains('websy-vis-help-listener')) {
      let elementId = event.target.attributes['data-element']
      if (elementId.value) {
        this.toggleHelp(`${elementId.value}_help`)
      }
    }
  }
  createObjectFromDefinition (objectConfig) {
    if (objectConfig.retries) {
      objectConfig.retries = 0
    }    
    if (objectConfig.definition && this.app) {
      console.log('Creating object', objectConfig.definition.qInfo)
      let method = 'createSessionObject'
      let params = objectConfig.definition
      if (objectConfig.definition.qField) {
        method = 'getField'
        params = objectConfig.definition.qField
      }
      if (!objectConfig.definition.qInfo) {
        // assume we have an objectId
        method = 'getObject'
      }
      this.app[method](params).then(model => {
        objectConfig.objectId = model.id
        objectConfig.attached = true
        let chartType = objectConfig.type || objectConfig.definition.qInfo.qType
        if (this.supportedChartTypes.indexOf(chartType) !== -1) {
          let options = Object.assign({}, objectConfig.options, {
            model, 
            def: objectConfig.definition,
            app: this.app
          })
          objectConfig.vis = new this.chartLibrary[chartType](`${objectConfig.elementId}_vis`, options)
          model.on('changed', () => {
            if (objectConfig.attached === true && this.paused === false) {
              objectConfig.vis.render()
            }
          })
        }
        else if (objectConfig.render && typeof objectConfig.render === 'function') {
          objectConfig.vis = {}
          objectConfig.attached = true
          objectConfig.model = model
          objectConfig.render(objectConfig, model)
          model.on('changed', () => {
            if (objectConfig.attached === true && this.paused === false) {
              objectConfig.render(objectConfig, model)
            }
          })
        }
      }, err => {
        console.log('Error creating object', err)
        if (objectConfig.retries < this.options.retryCount) {
          console.log('retrying')
          objectConfig.retries++
          this.createObjectFromDefinition(objectConfig) 
        }        
        else {
          console.log('Max retries reached.')
        }
      })
    }
    else if (objectConfig.type) {
      objectConfig.objectId = objectConfig.elementId
      objectConfig.attached = true
      objectConfig.vis = new this.chartLibrary[objectConfig.type](`${objectConfig.elementId}_vis`, objectConfig.options || {})
    }    
  }  
  destroyObjectFromId (objectConfig) {
    let hostEl = document.getElementById(`${objectConfig.elementId}_vis`)
    if (hostEl) {
      hostEl.innerHTML = ''
    }
    this.app.destroySessionObject(objectConfig.objectId)
  }
  detachObject (objectConfig) {
    objectConfig.attached = false
  }
  normalizeId (id) {
    return id.replace(/\s:\\\//, '-')
  }
  sessionOnNotification (data, eventName) {    
    if (this.options.sessionOnNotification) {
      this.options.sessionOnNotification(data, eventName)
    }
  }
  sessionOnTraffic (event) {    
    if (this.options.sessionOnTraffic) {
      this.options.sessionOnTraffic(event)
    }
  }
  sessionResumed (event) {        
    if (this.options.sessionResumed) {
      this.options.sessionResumed(event)
    }
  }
  sessionSuspended (event) {    
    if (this.options.sessionSuspended) {
      this.options.sessionSuspended(event)
    }
  }
  sessionClosed (event) {    
    if (this.options.sessionClosed) {
      this.options.sessionClosed(event)
    }
  }
  showHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.add('active')
    }
  }
  hideHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.remove('active')
    }
  }
  toggleHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.toggle('active')
    }
  }
  onError (err) {
    console.log(err)
  }
  onClose (msg) {}
  resize () {
    for (let i = 0; i < this.activeViews.length; i++) {
      this.resizeObjects(this.activeViews[i])
    }
  }
  resizeObjects (view) {
    if (view === '') {
      return
    }    
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {                
        if (objList[i].objectId) {          
          if (objList[i].vis && objList[i].vis.resize) {
            objList[i].vis.resize()  
          }
          else if (objList[i].resize) {
            objList[i].resize()
          }          
        }                
      }
    }
  }
  registerVisualisation (name, classDef) {
    if (name.indexOf(/\s/) !== -1) {
      console.log('Failed to register Chart Extension. Chart name must not contain spaces.')
      return
    }
    if (this.supportedChartTypes.indexOf(name) !== -1) {
      console.log('Failed to register Chart Extension. Chart name already exists.')
      return
    }
    this.supportedChartTypes.push(name)
    this.chartLibrary[name] = classDef
  }
  select (index, selections, locks, callbackFn) {
    if (index === selections.length) {
      this.play()
      callbackFn()
      return 
    }
    if (selections[index].param === 'select') {
      this.app
        .getField(selections[index].field, selections[index].state)
        .then(
          f => {
            let values = selections[index].values.map(v => {
              let numRep = +v
              if (!isNaN(numRep)) {
                return {
                  qNumber: numRep,
                  qIsNumeric: true
                }
              } 
              else {
                let dateRep = new Date(v)
                if (!isNaN(dateRep.getDate())) {
                  return {
                    qNumber: WebsyDesigns.Utils.toQlikDate(dateRep),
                    qIsNumeric: true
                  }
                } 
                else {
                  return {
                    qText: decodeURI(v)
                  }
                }
              }
            })
            f.selectValues(values, false).then(() => {              
              if (locks.indexOf(selections[index].field) !== -1) {
                f.lock().then(() => {
                  index++
                  this.select(index, selections, locks, callbackFn)
                })
              }
              else {
                index++
                this.select(index, selections, locks, callbackFn)
              }
            })
          },
          err => {
            console.log('field for selection not found', err)
            index++
            this.select(index, selections, locks, callbackFn)
          }
        )
    }
  }
  selectFromUrl (callbackFn) {
    if (this.options.applySelections === true && location.search !== '') {
      this.pause()
      let params = location.search.replace('?', '').split('&')
      params = params
        .map(s => {
          let parts = s.split('=')
          let parts2 = parts[1].split(',')
          let field = parts2.shift().replace(/%20/g, ' ')
          let state = '$'
          if (field.indexOf('::') !== -1) {
            // selection has a defined state
            state = field.split('::')[0]
            field = field.split('::')[1]
          }
          return {
            param: parts[0],
            field,
            state,
            values: parts2
          }
        })
      let selections = params.filter(s => s.param === 'select' || s.param === 'setvariable')
      let locks = params.filter(s => s.param === 'lock').map(d => d.field)
      this.select(0, selections, locks, callbackFn)
    }
    else {
      callbackFn()
    }
  }
}
