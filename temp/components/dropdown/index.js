/*
  global
  WebsyDesigns
*/
class Dropdown {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      pageSize: 100
    }
    this.options = Object.assign({}, DEFAULTS, options)
    this.dropdownOptions = Object.assign({}, options.def.options, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),      
      onCancelSearch: this.cancelSearch.bind(this)
    })
    this.dropdown = new WebsyDesigns.WebsyDropdown(elementId, this.dropdownOptions)
    this.render()
  }
  cancelSearch (value) {
    this.options.model.abortListObjectSearch('/qListObjectDef')
  }  
  checkForData (layout) {
    return new Promise((resolve, reject) => {
      this.options.model.getListObjectData('/qListObjectDef', [{
        qTop: 0,
        qLeft: 0,
        qWidth: 1,
        qHeight: this.options.pageSize
      }]).then(pages => {
        layout.qListObject.qDataPages = pages
        resolve(layout)
      }, reject)
    })    
  }
  clearSelected () {
    this.options.model.clearSelections('/qListObjectDef')
  }
  itemSelected (item, selectedIndexes, items) {    
    this.options.model.selectListObjectValues('/qListObjectDef', [item.qElemNumber], this.dropdown.options.multiSelect === true)
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.checkForData(layout).then(layout => {
        if (layout.qListObject.qDataPages[0]) {
          this.dropdown.options.label = layout.qListObject.qDimensionInfo.qFallbackTitle
          const indexes = {}
          if (this.options.hideExcluded === true) {
            layout.qListObject.qDataPages[0].qMatrix = layout.qListObject.qDataPages[0].qMatrix.filter(r => ['X', 'XS', 'XL'].indexOf(r[0].qState) === -1) 
          }        
          layout.qListObject.qDataPages[0].qMatrix.forEach((r, i) => {
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
          const data = layout.qListObject.qDataPages[0].qMatrix.map(r => (Object.assign(r[0], {label: r[0].qText || '-', classes: [`state-${r[0].qState}`]})))
          this.dropdown.data = data
        }
      })      
    })
  }
  search (value) {
    this.options.model.searchListObjectFor('/qListObjectDef', `*${value}*`)
  }
}
