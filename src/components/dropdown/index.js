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
      useVariable: false,
      confirmIcon: `<div class='websy-cell-select-confirm'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><polyline points="416 128 192 384 96 288" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg></div>`,
      cancelIcon: `<div class="websy-cell-select-cancel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg></div>`
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (!options.def) {
      options.def = { options: {} }
    }
    this.busy = false
    this.inSelections = true
    this.dropdownOptions = Object.assign({}, options, options.def.options || {}, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),      
      onCancelSearch: this.cancelSearch.bind(this),
      onScroll: this.handleScroll.bind(this),
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      customButtons: [
        {
          label: this.options.cancelIcon,
          fn: () => {
            this.dropdown.hide()
            this.onClose(this.elementId, false)
          }
        },
        {
          label: this.options.confirmIcon,
          fn: () => {
            this.dropdown.hide()
            this.onClose(this.elementId, true)
          }
        }
      ],
      customActions: [
        {
          label: 'Clear All',
          fn: () => {
            this.options.model.clearSelections(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select All',
          fn: () => {
            this.options.model.selectListObjectAll(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Possible',
          fn: () => {
            this.options.model.selectListObjectPossible(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Alternative',
          fn: () => {
            this.options.model.selectListObjectAlternative(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Excluded',
          fn: () => {
            this.options.model.selectListObjectExcluded(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        }
      ]
    })
    this.dropdown = new WebsyDesigns.WebsyDropdown(elementId, this.dropdownOptions)
    this.render()
  }
  beginSelections () {
    return new Promise((resolve, reject) => {
      if (this.inSelections === true) {
        resolve()
      }
      else {
        if (this.options.useVariable !== true) {
          this.inSelections = true
          this.abortModal().then(() => {
            this.options.model.beginSelections(['/qListObjectDef']).then(() => {            
              resolve()
            })
          })        
        }
      }
    })
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
  onClose (elementId, confirm = true) {
    this.inSelections = false
    this.options.model.endSelections(confirm).then(() => {
      if (this.options.onClose) {
        this.options.onClose(elementId)
      }
    })
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
  open (event) {    
    this.dropdown.open(event)
  }
  render () {
    if (!this.options.model) {
      return
    }
    this.rowsLoaded = 0    
    this.options.model.getLayout().then(layout => {
      this.layout = layout      
      this.checkForVariable().then(variableValue => {
        let listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject
        if (!listObject.qDataPages || listObject.qDataPages.length === 0) {
          listObject.qDataPages = [{qMatrix: []}]
        }
        if (listObject.qDimensionInfo.qLocked) {
          this.dropdown.options.allowClear = false
        }
        else {
          this.dropdown.options.allowClear = typeof this.options.allowClear === 'undefined' ? true : this.options.allowClear
        }
        this.rowsLoaded = listObject.qDataPages[0].qMatrix.length
        this.checkForData().then(() => {        
          if (listObject.qDataPages[0]) {
            this.dropdown.options.label = this.options.label || listObject.qDimensionInfo.qFallbackTitle
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
      else if (indexes.L && indexes.L.length > 0) {
        this.dropdown.selectedItems = indexes.L
      }
      else if (((indexes.L && indexes.L.length === 0) || (indexes.S && indexes.S.length === 0)) && indexes.O && indexes.O.length === 1) {
        this.dropdown.selectedItems = indexes.O 
      }
      else {
        this.dropdown.selectedItems = []
      }        
    }   
    return listObject.qDataPages[0].qMatrix.map((r, i) => (Object.assign(r[0], {index: i, label: r[0].qText || '-', classes: [`state-${r[0].qState}`]})))                    
  }
}
