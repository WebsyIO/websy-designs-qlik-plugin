/*
  global
  WebsyDesigns
*/
class Dropdown {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      pageSize: 100,
      path: '',
      useVariable: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (!options.def) {
      options.def = { options: {} }
    }
    this.busy = false
    this.dropdownOptions = Object.assign({}, options, options.def.options || {}, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),      
      onCancelSearch: this.cancelSearch.bind(this),
      onScroll: this.handleScroll.bind(this),
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this)
    })
    this.dropdown = new WebsyDesigns.WebsyDropdown(elementId, this.dropdownOptions)
    this.render()
  }
  cancelSearch (value) {
    this.options.model.abortListObjectSearch(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'))
  }  
  checkForData () {
    return new Promise((resolve, reject) => {
      if (this.busy === false) {
        this.busy = true
        this.options.model.getListObjectData(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), [{
          qTop: this.rowsLoaded,
          qLeft: 0,
          qWidth: 1,
          qHeight: this.options.pageSize
        }]).then(pages => {
          if (this.options.path !== '') {
            this.layout[this.options.path].qListObject.qDataPages[0].qMatrix = this.layout[this.options.path].qListObject.qDataPages[0].qMatrix.concat((pages[0] || {qMatrix: []}).qMatrix)
            this.rowsLoaded = this.layout[this.options.path].qListObject.qDataPages[0].qMatrix.length
          }                           
          else {
            if (!this.layout.qListObject.qDataPages[0]) {
              this.layout.qListObject.qDataPages[0] = {
                qMatrix: []
              }
            }
            this.layout.qListObject.qDataPages[0].qMatrix = this.layout.qListObject.qDataPages[0].qMatrix.concat((pages[0] || {qMatrix: []}).qMatrix)
            this.rowsLoaded = this.layout.qListObject.qDataPages[0].qMatrix.length
          }          
          this.busy = false 
          resolve()
        }, err => {
          this.busy = false
          reject(err)
        })
      }
    })    
  }
  checkForVariable () {
    return new Promise((resolve, reject) => {
      if (this.options.useVariable === true && this.options.variable && this.options.app) {
        this.options.app.getVariableByName(this.options.variable).then(v => {
          v.getLayout().then(layout => {            
            resolve(layout)
          })
        })
      }
      else {
        resolve()
      }
    })
  }
  clearSelected () {
    this.options.model.clearSelections(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'))
  }
  onClose (elementId) {
    this.options.model.endSelections(true)
  }
  handleScroll (event) {    
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.checkForData().then(() => {
        this.dropdown.data = this.transformData()
      })
    }
  }
  itemSelected (item, selectedIndexes, items) {    
    if (this.options.useVariable === true && this.options.variable && this.options.app) {
      this.options.app.getVariableByName(this.options.variable).then(v => {
        if (item.qNum === 'NaN') {
          v.setStringValue(item.qText).then(() => {
            if (this.options.onItemSelected) {
              this.options.onItemSelected(item, selectedIndexes, items)
            }
          })
        }
        else {
          v.setNumValue(item.qNum).then(() => {
            if (this.options.onItemSelected) {
              this.options.onItemSelected(item, selectedIndexes, items)
            }
          })
        }
      })
    }
    else {
      this.options.model.selectListObjectValues(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), [item.qElemNumber], this.dropdown.options.multiSelect === true).then(() => {
        if (this.options.onItemSelected) {
          this.options.onItemSelected(item, selectedIndexes, items)
        }
      })
    }
  }
  onOpen () {
    console.log('dropdown open')    
    this.options.model.beginSelections([`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')])
  }
  open () {    
    this.dropdown.open()
  }
  render () {
    this.rowsLoaded = 0    
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.checkForVariable().then(variableValue => {
        let listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject
        if (!listObject.qDataPages || listObject.qDataPages.length === 0) {
          listObject.qDataPages = [{qMatrix: []}]
        }
        this.rowsLoaded = listObject.qDataPages[0].qMatrix.length
        this.checkForData().then(() => {        
          if (listObject.qDataPages[0]) {
            this.dropdown.options.label = listObject.qDimensionInfo.qFallbackTitle                                
            this.dropdown.data = this.transformData(variableValue)
          }
        })
      })      
    })
  }
  search (value) {
    this.options.model.searchListObjectFor(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), `*${value}*`)
  }
  transformData (variableValue) {
    const indexes = {}
    let listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject
    const flatList = listObject.qDataPages[0].qMatrix.map(r => r[0].qText)
    if (this.options.hideExcluded === true) {
      listObject.qDataPages[0].qMatrix = listObject.qDataPages[0].qMatrix.filter(r => ['X', 'XS', 'XL'].indexOf(r[0].qState) === -1) 
    }
    if (variableValue) {
      const index = flatList.indexOf(variableValue.qText)
      if (index !== -1) {
        this.dropdown.selectedItems = [index]
      }
    }
    else {
      listObject.qDataPages[0].qMatrix.forEach((r, i) => {
        if (!indexes[r[0].qState]) {
          indexes[r[0].qState] = []
        }
        indexes[r[0].qState].push(i)
      })        
      if (indexes.S && indexes.S.length > 0) {
        this.dropdown.selectedItems = indexes.S
      }
      else if (indexes.S && indexes.S.length === 0 && indexes.O && indexes.O.length === 1) {
        this.dropdown.selectedItems = indexes.O 
      }
      else {
        this.dropdown.selectedItems = []
      }       
    }   
    return listObject.qDataPages[0].qMatrix.map(r => (Object.assign(r[0], {label: r[0].qText || '-', classes: [`state-${r[0].qState}`]})))                    
  }
}
