/* global SelectionBar WebsyDesignsQlikPlugins WebsyDropdown */ 
class CurrentSelections {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      def: {
        qInfo: {qType: 'currentSelections'},
        qSelectionObjectDef: {}
      }

    }
    this.options = Object.assign({}, DEFAULTS, options)    
    this.hasOpenDropdown = false
    this.dropdowns = {}
    this.current = []
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html = `
      <div class="websy-selection-bar">
        <div class="left-group">
          <div class="back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448,440a16,16,0,0,1-12.61-6.15c-22.86-29.27-44.07-51.86-73.32-67C335,352.88,301,345.59,256,344.23V424A16,16,0,0,1,229,435.57l-176-168a16,16,0,0,1,0-23.14l176-168A16,16,0,0,1,256,88v80.36c74.14,3.41,129.38,30.91,164.35,81.87C449.32,292.44,464,350.9,464,424a16,16,0,0,1-16,16Z"/></svg>
          </div>
          <div class="forward">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M58.79,439.13A16,16,0,0,1,48,424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16,0,0,1,27.05-11.57l176,168a16,16,0,0,1,0,23.14l-176,168A16,16,0,0,1,256,424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16,0,0,1-17.82,5.28Z"/></svg>
          </div>
          <div class="clear-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
          </div>
        </div>
        <div class="no-selections" id="${this.elementId}_noselections">No Selections</div>
        <div class="selections-group" id="${this.elementId}_selections"></div>    
      </div>
      `
      el.innerHTML = html
    }    
    this.options.app.createSessionObject(this.options.def)
      .then(model => {
        model.on('changed', this.render.bind(this))
        this.options.model = model
        this.render()
      })
  }
  onDropdownOpen () {
    this.hasOpenDropdown = true
  }
  onDropdownClose () {
    this.hasOpenDropdown = false
  }
  render () {
    const el = document.getElementById(`${this.elementId}_selections`)
    const noEl = document.getElementById(`${this.elementId}_noselections`)
    this.options.model.getLayout()
      .then(layout => {
        console.log(layout)
        this.current = []
        if (layout.qSelectionObject.qSelections.length > 0) {
          el.classList.add('active')
          noEl.classList.remove('active')                     
          layout.qSelectionObject.qSelections.forEach((selection, index) => {              
            let id = selection.qField.toLowerCase().replace(/ /g, '_')
            this.current.push(id)
            if (!this.dropdowns[id]) {
              selection.id = id                 
              let newEl = document.createElement('div')
              newEl.id = `${this.elementId}_${id}`
              newEl.classList.add('selection-tabs')              
              el.appendChild(newEl)          
              const def = {
                qInfo: { qType: 'filter' },
                qListObjectDef: {
                  qDef: {
                    qFieldDefs: [selection.qField],
                    qSortCriterias: [{qSortByState: 1, qSortByAscii: 1}]
                  },
                  options: {
                    closeAfterSelection: false
                  }
                }
              }
              this.options.app.createSessionObject(def).then(model => {
                this.dropdowns[id] = {
                  instance: new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_${id}`, {
                    model,
                    multiSelect: true,
                    closeAfterSelection: false
                    // onOpen: this.onDropdownOpen.bind(this),
                    // onClose: this.onDropdownClose.bind(this)
                  }),
                  model
                }
                // model.on('changed', () => {
                //   this.dropdowns[id].instance.render()
                // })
              }) 
            }           
          })                  
        }
        else {
          el.classList.remove('active')
          noEl.classList.add('active')
        }
        // Cleanup unused selections
        for (const key in this.dropdowns) {
          if (this.current.indexOf(key) === -1) {
            const sEl = document.getElementById(`${this.elementId}_${key}`)
            if (sEl) {
              el.removeChild(sEl) 
            }            
            this.options.app.destroySessionObject(this.dropdowns[key].model.id)
            delete this.dropdowns[key]
          }
        }
      })
  }
  backSelection () {
    this.options.app.back()
    this.render()
  }
  forwardSelection () {
    this.options.app.forward()
    this.render()
  }
  clearSelection () {
    this.options.app.clearAll()
    this.render()
  }
  handleClick (event) {  
    if (event.target.classList.contains('back')) {
      this.backSelection()
    } 
    if (event.target.classList.contains('forward')) {
      this.forwardSelection()
    } 
    if (event.target.classList.contains('clear-all')) {
      this.clearSelection()
    } 
  }
}
