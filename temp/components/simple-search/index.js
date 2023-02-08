/* global WebsyDesigns pubSub */ 
class SimpleSearch {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)    
    this.paused = false
    this.searchText = ''
    const el = document.getElementById(this.elementId)    
    if (el) {
      this.search = new WebsyDesigns.Search(this.elementId, {
        placeholder: this.options.placeholder,
        onSubmit: this.handleSearchSubmit.bind(this),
        onClear: this.handleSearchClear.bind(this)
      })
    }    
  }
  handleSearchClear () {
    this.options.model.clearSelections('/qListObjectDef')
    this.searchText = ''
    if (this.options.onClear) {
      this.options.onClear()
    }
  }
  handleSearchSubmit (text) {
    this.searchText = text
    this.paused = true
    this.options.model.searchListObjectFor('/qListObjectDef', `*${text}*`).then(response => {
      this.options.model.acceptListObjectSearch('/qListObjectDef', false).then(() => {
        this.paused = false
        this.render()
      })
    })
  }
  render () {
    if (this.paused === true) {
      return
    }
    this.options.model.getLayout().then(layout => {
      if (this.options.onResults) {
        this.options.onResults(this.searchText.length === 0 || (layout.qListObject.qDimensionInfo.qStateCounts.qSelected !== 0 && this.searchText.length > 0))
      }
    })
  }
}
