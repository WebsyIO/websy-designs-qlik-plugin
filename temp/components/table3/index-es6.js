/* global include Table3 */ 
import Dropdown from '../dropdown'

/* global WebsyDesigns WebsyDesignsQlikPlugins:true Dropdown getAllData */ 
class Table3 {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 200,
      cellHeight: 35,
      virtualScroll: true,
      columnOverrides: [],
      maxColWidth: '50%',
      allowPivoting: false,
      pivotPanel: 'docked',
      pivotButtonText: 'Pivot',
      dropdownOptions: {},
      forceRenderAfterSelect: false,
      maxPlaceholderRows: 1000,
      allowCellSelections: true,
      resizeTimeout: 200,
      confirmIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><polyline points="416 128 192 384 96 288" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`,
      cancelIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>`
    }
    // if (Dropdown) {
    //   if (!WebsyDesignsQlikPlugins) {
    //     WebsyDesignsQlikPlugins = {}
    //   }
    //   WebsyDesignsQlikPlugins.Dropdown = Dropdown
    // }
    this.elementId = elementId  
    this.inSelections = false  
    this.qlikTop = 0
    this.options = Object.assign({}, DEFAULTS, options)
    this.fullData = []
    this.rowIndexList = []
    this.rowsLoaded = 0
    this.resizeTimeoutFn = null
    // this.rowCount = 0
    this.pageNum = 0
    this.pageCount = 0
    this.errorCount = 0
    this.leftDataCol = 0
    this.topDataRow = 0
    this.retryFn = null
    this.pivotIndent = false
    this.busy = false
    this.dimensionWidth = 0
    this.dropdowns = {}
    this.searchPrepped = false
    this.qlikColumnOrder = []
    this.pinnedColumns = 0    
    this.selectedCells = []
    this.startCol = 0
    this.endCol = 0
    this.startRow = 0
    const el = document.getElementById(this.elementId)
    if (el) {
      let html = ''
      let tableStyle = 'height: 100%'
      if (this.options.allowPivoting === true) {
        if (this.options.pivotPanel === 'docked') {
          tableStyle = 'height: calc(100% - 100px);' 
        }
        else {
          tableStyle = 'height: calc(100% - 30px);' 
          html += `
            <div class="pivot-button-container">
              <button class="toggle-pivot-panel">${this.options.pivotButtonText}</button>
            </div>
          `
        }        
        html += `
          <div id='${this.elementId}_pivotContainer' class='websy-designs-pivot-container ${this.options.pivotPanel}'>
            <div>
              <h3>Rows</h3>
              <div id='${this.elementId}_pivotRows'></div>
            </div>
            <div>
              <h3>Columns</h3>
              <div id='${this.elementId}_pivotColumns'></div>
            </div>
          </div>       
        `
      }             
      html += `
        <div id='${this.elementId}_cellSelectMask' class='websy-cell-select-mask'></div>
        <div id='${this.elementId}_tableContainer' style='${tableStyle}'></div>        
        <div id='${this.elementId}_cellSelectMaskLeft' class='websy-cell-select-mask-side'></div>
        <div id='${this.elementId}_cellSelectMaskRight' class='websy-cell-select-mask-side'></div>
        <div id='${this.elementId}_cellSelectButtons' class='websy-cell-select-buttons'>
          <div class='websy-cell-select-cancel'>
            ${this.options.cancelIcon}
          </div>
          <div class='websy-cell-select-confirm'>
            ${this.options.confirmIcon}
          </div>
        </div>
      `
      el.innerHTML = html
      this.table = new WebsyDesigns.WebsyTable3(`${this.elementId}_tableContainer`, Object.assign({}, {
        onClick: this.handleClick.bind(this),
        onCellSelect: this.handleCellSelect.bind(this),
        onScroll: this.handleScroll.bind(this),      
        onSort: this.handleSort.bind(this),
        onChangePageSize: this.setPageSize.bind(this),
        onSetPage: this.setPageNum.bind(this),
        onScrollX: this.handleVirtualScrollX.bind(this),
        onNativeScroll: this.handleNativeScroll.bind(this),
        onExpandCell: this.handleExpand.bind(this),
        onCollapseCell: this.handleCollapse.bind(this)
      }, this.options))
      if (this.options.allowPivoting === true) {
        this.rowList = new WebsyDesigns.DragDrop(`${this.elementId}_pivotRows`, {
          group: this.elementId,
          items: [],
          onItemAdded: () => {         
            this.updatePivotStructure()
          }
        })
        this.columnList = new WebsyDesigns.DragDrop(`${this.elementId}_pivotColumns`, {
          group: this.elementId,
          items: [],
          onItemAdded: () => {         
            this.updatePivotStructure()
          }
        })
      }      
      el.addEventListener('click', this.handleClick.bind(this))
      window.addEventListener('resize', () => {
        if (this.resizeTimeoutFn) {
          clearTimeout(this.resizeTimeoutFn)
        }
        this.resizeTimeoutFn = setTimeout(() => {
          this.resize()
        }, this.options.resizeTimeout)
      })
      this.render()
    }    
  }
  abortModal () {
    return new Promise((resolve, reject) => {
      if (this.options.app) {
        this.options.app.abortModal(true).then(() => {
          this.selectedCells = []
          resolve()
        })
      }
      else {
        resolve()
      }
    })
  }
  appendRows (data) {      
    this.table.appendRows(data)
  }
  beginSelections () {
    return new Promise((resolve, reject) => {
      if (this.inSelections === true) {
        resolve()
      }
      else {
        this.inSelections = true
        this.abortModal().then(() => {
          this.options.model.beginSelections(['/qHyperCubeDef']).then(() => {            
            resolve()
          })
        })        
      }
    })
  }
  buildPivotColumns () {
    if (!this.layout.qHyperCube.qPivotDataPages[0]) {
      return
    }
    let pData = this.transformPivotTable(this.layout.qHyperCube.qPivotDataPages[0])    
    // this.pinnedColumns = this.layout.qHyperCube.qIndentMode === true ? 1 : this.layout.qHyperCube.qNoOfLeftDims
    this.columns = pData.columns // .filter(c => c.show !== false) -- shift logic to underlying table
    this.startCol = 0
    // if (this.layout.qHyperCube.qIndentMode !== true) {
    //   this.startCol = this.pinnedColumns
    // }
    if (this.columns.length === 0) {
      return
    }
    this.endCol = this.columns[this.columns.length - 1].length
    this.table.options.columns = this.columns
    const maxMValue = this.layout.qHyperCube.qMeasureInfo.filter(m => !m.qError).reduce((a, b) => a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b).qApprMaxGlyphCount
    const maxMLabel = this.layout.qHyperCube.qMeasureInfo.filter(m => !m.qError).reduce((a, b) => a.qFallbackTitle.length > b.qFallbackTitle.length ? a : b).qFallbackTitle
    let maxMLength = maxMLabel.length > maxMValue ? maxMLabel : new Array(maxMValue).fill('X').join('')
    let effectiveOrder = this.layout.qHyperCube.qEffectiveInterColumnSortOrder
    let possibleExpandCollapse = this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qAlwaysFullyExpanded !== true
    let measureLengths = this.layout.qHyperCube.qMeasureInfo.reduce((a, b) => Math.max(a, b.qApprMaxGlyphCount), 0)    
    // let dimensionLengths = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).map(d => {
    // dimensionLengths not filtered
    let dimensionLengths = this.layout.qHyperCube.qDimensionInfo.map(d => {
      let out = possibleExpandCollapse ? 'xxx' : ''
      if (d.qError) {
        return ''
      }
      if (d.qApprMaxGlyphCount > d.qFallbackTitle.length) {
        out += new Array(d.qApprMaxGlyphCount).fill('X').join('') 
      } 
      else {
        out += d.qFallbackTitle
      }
      return out
    })
    if (dimensionLengths.length > this.pinnedColumns) {
      // we have a top column(s)
      for (let i = this.layout.qHyperCube.qNoOfLeftDims; i < dimensionLengths.length; i++) {
        if (dimensionLengths[effectiveOrder[i]]) {
          measureLengths = Math.max(measureLengths, dimensionLengths[effectiveOrder[i]].length) 
        }        
      }      
      maxMLength = measureLengths > maxMLength.length ? new Array(measureLengths).fill('X').join('') : maxMLength
    }
    // dimensionLengths filtered
    dimensionLengths = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).map(d => {
      let out = possibleExpandCollapse ? 'xxx' : ''      
      if (d.qApprMaxGlyphCount > d.qFallbackTitle.length) {
        out += new Array(d.qApprMaxGlyphCount).fill('X').join('') 
      } 
      else {
        out += d.qFallbackTitle
      }
      return out
    })
    let activeColumns = []
    let rows = []
    let columns = []
    for (let i = 0; i < effectiveOrder.length; i++) {   
      if (effectiveOrder[i] < this.layout.qHyperCube.qDimensionInfo.length) {
        if (effectiveOrder[i] >= 0) {
          let dim = this.properties.qHyperCubeDef.qDimensions[effectiveOrder[i]]                
          if ((this.layout.qHyperCube.qIndentMode !== true && i < this.pinnedColumns) || i < this.layout.qHyperCube.qNoOfLeftDims) {          
            rows.push(dim)          
          }   
          else {
            columns.push(dim)
          }
        } 
      }      
      if (this.layout.qHyperCube.qIndentMode === true) {
        if (i < this.pinnedColumns) {
          if (effectiveOrder[i] === -1) {
            activeColumns.push(new Array(measureLengths).fill('X'))
            // activeColumns.push(maxMLength)
          }          
          if (!activeColumns[0]) {
            activeColumns.push(dimensionLengths[i])
          }
          else if (dimensionLengths[i] && dimensionLengths[i].length > activeColumns[0].length) {
            activeColumns[0] = dimensionLengths[i]
          }                      
        }
      }
      else if (i < this.pinnedColumns) {
        activeColumns.push(dimensionLengths[i])
      }
    }       
    if (effectiveOrder.indexOf(-1) >= (this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns)) {
      for (let i = (this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns); i < this.columns[this.columns.length - 1].length; i++) {
        // activeColumns.push(Math.max(maxMLength, maxMLabel))
        activeColumns.push(maxMLength)
      }
    }  
    else if (effectiveOrder.indexOf(-1) === -1) {
      // only a single measure has been defined
      if (this.pinnedColumns <= 0) {
        // we have no left dimensions so all columns should be sized according to the measure
        activeColumns = []
      }
      for (let i = activeColumns.length; i < this.columns[this.columns.length - 1].length; i++) {
        activeColumns.push(maxMLength)
      }
    }
    for (let i = activeColumns.length; i < this.columns[this.columns.length - 1].length; i++) {
      // activeColumns.push(Math.max(maxMLength, maxMLabel))
      activeColumns.push(maxMLength)
    }
    let columnParamValues = activeColumns.map(d => ({value: d, width: null}))
    this.tableSizes = this.table.calculateSizes(columnParamValues, this.layout.qHyperCube.qSize.qcy, this.layout.qHyperCube.qSize.qcx, this.pinnedColumns)     
    let rowsWidth = 0
    if (this.options.allowPivoting === true && this.options.app) {      
      const rEl = document.getElementById(`${this.elementId}_pivotRows`)
      let count = this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns
      for (let i = 0; i < count; i++) {
        rowsWidth += this.columns[this.columns.length - 1][i].actualWidth        
      }
      if (this.options.pivotPanel === 'docked') {
        rEl.style.width = rowsWidth + 'px'
        rEl.style.maxWidth = rowsWidth + 'px'        
      }      
      this.rowList.options.items = rows.map((dim, dimIndex) => {
        let dimId = dim.qLibraryId || dim.qDef.qFieldLabels[0] || dim.qDef.qFieldDefs[0]            
        return {
          component: 'Dropdown',
          isQlikPlugin: true,
          dim, 
          dimId,
          options: Object.assign({}, this.options.dropdownOptions)
        }        
      })
      this.rowList.render()
      this.rowList.options.items.forEach((d, i) => {
        if (!this.dropdowns[d.dimId]) {
          let ddDef = {
            qInfo: { qType: 'table-dropdown' },
            qListObjectDef: d.dim
          }
          ddDef.qListObjectDef.qDef.qSortCriterias = [{
            qSortByState: 1,
            qSortByAscii: 1,
            qSortByNumeric: 1
          }]
          this.options.app.createSessionObject(ddDef).then(model => {
            this.dropdowns[d.dimId] = model
            d.instance.options.model = model
            d.instance.render()
          })
        }
        else {
          d.instance.options.model = this.dropdowns[d.dimId]
          d.instance.render()
        } 
      })      
      this.columnList.options.items = columns.map((dim, dimIndex) => {
        let dimId = dim.qLibraryId || dim.qDef.qFieldLabels[0] || dim.qDef.qFieldDefs[0]            
        return {
          component: 'Dropdown',
          isQlikPlugin: true,
          dim, 
          dimId,
          options: Object.assign({}, this.options.dropdownOptions)
        }      
      })
      this.columnList.render()
      this.columnList.options.items.forEach((d, i) => {
        if (!this.dropdowns[d.dimId]) {
          if (!d.dim.qDef) {            
            d.dim.qDef = {}
          }
          d.dim.qDef.qSortCriterias = [{qSortByAscii: 1, qSortByState: 1, qSortByNumeric: 1}]
          let ddDef = {
            qInfo: { qType: 'table-dropdown' },
            qListObjectDef: d.dim
          }
          ddDef.qListObjectDef.qDef.qSortCriterias = [{
            qSortByState: 1,
            qSortByAscii: 1,
            qSortByNumeric: 1
          }]
          this.options.app.createSessionObject(ddDef).then(model => {
            this.dropdowns[d.dimId] = model
            d.instance.options.model = model
            d.instance.render()
          })
        }
        else {
          d.instance.options.model = this.dropdowns[d.dimId]
          d.instance.render()
        } 
      })
    }
    else {
      const tableEl = document.getElementById(`${this.elementId}_tableContainer`)
      if (tableEl) {
        tableEl.style.height = '100%'
      }
    }
  }
  buildStraightColumnsAndTotals () {
    // used for straight tables
    this.columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo.map(m => {
      m.isMeasure = true
      return m
    }))
    // append the column definitions
    this.properties.qHyperCubeDef.qDimensions.concat(this.properties.qHyperCubeDef.qMeasures).forEach((cDef, i) => {
      this.columns[i].def = cDef
    })
    let activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
    this.columns = this.columns.map((c, i) => {
      c.colIndex = this.columnOrder.indexOf(i)
      c.classes = [`${c.isMeasure ? 'measure' : 'dimension'}`]
      c.name = c.qFallbackTitle
      if (c.tooltip) {
        c.name += `
        <div class="websy-info websy-info-dock-right" data-info="${c.tooltip}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
        </div>
        `
      }
      c.reverseSort = activeSort === i && c.qReverseSort !== true
      c.activeSort = activeSort === i
      if (this.layout.qHyperCube.qMode === 'S') {
        if (c.qSortIndicator === 'A') {
          c.sort = 'asc'
        }
        else if (c.qSortIndicator === 'D') {
          c.sort = 'desc'
        }
      }        
      // if (this.options.columnOverrides[i]) {
      //   c = {...c, ...this.options.columnOverrides[i]}
      // }
      if (c.searchable !== false && i < this.layout.qHyperCube.qDimensionInfo.length) {
        c.searchable = true
        if (!c.onSearch) {    
          c.isExternalSearch = true   
          let dimId = c.def.qLibraryId || c.def.qDef.qFieldLabels[0] || c.def.qDef.qFieldDefs[0]            
          c.dimId = c.cId || dimId
          c.onSearch = this.handleSearch.bind(this)
          c.onCloseSearch = this.handleCloseSearch.bind(this)
        }
      }
      return c
    })
    this.columns.sort((a, b) => {
      return a.colIndex - b.colIndex
    })         
    this.columns = this.columns.filter(c => !c.qError && c.show !== false)
    this.table.options.columns = [this.columns]
    // set up the Totals
    this.totals = []
    if (this.layout.qHyperCube.qGrandTotalRow && this.layout.totals && this.layout.totals.show === true) {
      if (this.layout.qHyperCube.qMode === 'S') {
        this.totals = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).map(d => ({ value: '', classes: ['dimension'] })).concat(this.layout.qHyperCube.qGrandTotalRow.map(t => Object.assign({}, t, { value: t.qText, classes: ['measure'] })))
        this.totals.splice(0, 1, { value: this.layout.totals.label || this.totals })
      }
    }
    this.table.options.totals = this.totals
    let activeDimensions = this.layout.qHyperCube.qDimensionInfo        
      .filter(c => !c.qError)        
    this.columnParamValues = activeDimensions
      .filter((c, i) => (this.layout.qHyperCube.qMode === 'S' || i < this.pinnedColumns))
      .map((c, i) => ({ 
        value: new Array(Math.max((c.showAsLink ? 0 : c.qApprMaxGlyphCount), activeDimensions[i].qFallbackTitle.length)).fill('X').join(''),
        width: c.width || null
      }))
    let measureLabel = activeDimensions.pop()
    const maxMValue = this.layout.qHyperCube.qMeasureInfo.filter(m => !m.qError).reduce((a, b) => a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b, {qApprMaxGlyphCount: 0})
    const maxMLabel = this.layout.qHyperCube.qMeasureInfo.filter(m => !m.qError).reduce((a, b) => a > b.qFallbackTitle.length ? a : b.qFallbackTitle.length, 0)
    this.columnParamValues = this.columnParamValues.concat(new Array(this.layout.qHyperCube.qSize.qcx).fill(new Array(Math.max(maxMValue.qApprMaxGlyphCount, maxMLabel)).fill('X').join('')).map(d => ({value: d, width: null})))    
    if (this.layout.scrolling && this.layout.scrolling.keepFirstColumnInView === true) {
      this.pinnedColumns = 1
    }
    this.tableSizes = this.table.calculateSizes(this.columnParamValues, this.layout.qHyperCube.qSize.qcy, this.layout.qHyperCube.qSize.qcx, this.pinnedColumns)     
    this.columns.forEach((c, i) => {
      if (c.searchable !== false) {
        if (c.isExternalSearch === true) {                 
          if (!this.dropdowns[c.dimId]) {
            let ddDef = {
              qInfo: { qType: 'table-dropdown' },
              qListObjectDef: c.def
            }
            ddDef.qListObjectDef.qDef.qSortCriterias = [{
              qSortByState: 1,
              qSortByAscii: 1,
              qSortByNumeric: 1
            }]
            this.options.app.createSessionObject(ddDef).then(model => {
              this.dropdowns[c.dimId] = new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_tableContainer_columnSearch_${c.dimId || i}`, {
                app: this.options.app,
                model,
                multiSelect: true,
                closeAfterSelection: false,
                onClose: this.handleCloseSearch
              })
              model.on('changed', () => {
                this.dropdowns[c.dimId].render()
              })
              // d.instance.options.model = model
              // d.instance.render()
            })
          }
          else {
            // d.instance.options.model = this.dropdowns[d.dimId]
            // d.instance.render()
          }          
        }
      }
    }) 
    this.table.options.activeSort = activeSort
    // console.log('column params', this.columnParamValues)
  }
  buildDataStructure () {
    this.fullData = []
    this.rowIndexList = []
    this.buildEmptyRows(0)
  }
  buildEmptyRows (start) {
    if (!this.layout) {
      return
    }
    if (this.layout.qHyperCube.qMode === 'S' || this.layout.qHyperCube.qIndentMode === true) {      
      for (let r = start; r < Math.min(this.layout.qHyperCube.qSize.qcy, (start + this.options.maxPlaceholderRows)); r++) {      
        if (!this.fullData[r]) {
          let row = []
          for (let c = 0; c < this.layout.qHyperCube.qSize.qcx; c++) {
            row.push({})          
          }
          this.fullData.push(row) 
        }      
      }
    }    
  }
  checkDataExists (start, end) {
    return new Promise((resolve, reject) => {
      if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {
        this.getData(start, () => {
          resolve()
        }) 
      }
      else {
        let top = -1
        for (let i = start; i < end; i++) {
          if (this.rowIndexList.indexOf(i) === -1) {
            top = i
            break
          }        
        }
        // console.log('slicing pre', top)
        this.buildEmptyRows(top)
        if (top < end && top !== -1) {
          console.log('get data 1')
          this.getData(top, () => {
            // console.log('if callback for', top)
            resolve()
          }, true)        
        }
        else if (top !== -1) {
          console.log('get data 2')
          this.getData(top, () => {
            // console.log('else if callback for', top)
            resolve()
          }, true)          
        }      
        else {
          // console.log('else callback for', top)
          console.log('no get data 3')
          resolve()
        } 
      }           
    })
  }
  confirmCancelSelections (confirm) {
    this.inSelections = false
    this.options.model.endSelections(confirm).then(() => {
      const maskEl = document.getElementById(`${this.elementId}_cellSelectMask`)
      const maskLeftEl = document.getElementById(`${this.elementId}_cellSelectMaskLeft`)
      const maskRightEl = document.getElementById(`${this.elementId}_cellSelectMaskRight`)        
      const maskButtonsEl = document.getElementById(`${this.elementId}_cellSelectButtons`)
      if (maskEl) {
        maskEl.classList.remove('active')
      }
      if (maskLeftEl) {
        maskLeftEl.classList.remove('active')
      }
      if (maskRightEl) {
        maskRightEl.classList.remove('active')
      }
      if (maskButtonsEl) {
        maskButtonsEl.classList.remove('active')
      }
      // if (this.options.forceRenderAfterSelect === true) {
      this.render()
      // }
    })
  }
  getData (top = 0, callbackFn, force = false) {
    if (this.busy === false || force === true) {
      this.busy = true
      if (this.options.getAllData === true) {
        getAllData('qHyperCube', this.options.model, this.layout, layout => {
          // this.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length
          this.busy = false
          if (callbackFn) {
            callbackFn(layout.qHyperCube.qDataPages[0].qMatrix)  
          }
        })
      }
      else {
        let qHeight = this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize	
        if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true && this.tableSizes) {	
          qHeight = this.tableSizes.rowsToRender	
        }	
        const pageDefs = [{	
          qTop: top,	
          qLeft: 0,	
          qWidth: this.dataWidth,	
          qHeight	
        }]
        if ((this.rowIndexList || []).length < this.layout.qHyperCube.qSize.qcy) {
          let method = 'getHyperCubeData'
          if (this.layout.qHyperCube.qMode === 'P') {
            method = 'getHyperCubePivotData'          
          }
          this.options.model[method]('/qHyperCubeDef', pageDefs).then(pages => {
            if (pages) {
              this.qlikTop = pages[0].qArea.qTop
              if (this.layout.qHyperCube.qMode === 'P') {
                this.layout.qHyperCube.qPivotDataPages = pages
                let pData = this.transformPivotTable(pages[0])                                
                pages[0].qMatrix = pData.data                                
                // this.fullData.push(pages[0])
                // this.rowCount += pages[0].qData.length
              }
              // else {
              // pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')              
              if (this.layout.qHyperCube.qMode === 'S' || this.layout.qHyperCube.qIndentMode === true) {
                this.fullData.splice(pages[0].qArea.qTop, pages[0].qArea.qHeight, ...pages[0].qMatrix)
                this.rowsLoaded = Math.max(this.rowsLoaded, pages[0].qArea.qTop + pages[0].qArea.qHeight)
                for (let i = 0; i < pages[0].qArea.qHeight; i++) {
                  if (this.rowIndexList.indexOf(pages[0].qArea.qTop + i) === -1) {
                    this.rowIndexList.push(pages[0].qArea.qTop + i)
                  }                                    
                }
                this.rowIndexList.sort((a, b) => a - b)                                
              }                            
              else {
                this.fullData = pages[0].qMatrix
              }
              // }
              this.busy = false
              if (callbackFn) {
                if (this.layout.qHyperCube.qMode === 'P') {
                  callbackFn(pages[0])  
                }
                else {
                  callbackFn(pages[0].qMatrix)  
                }
              }
            }
          }, err => {            
            console.log('error getting data', err)              
          })
        } 
        else {
          this.busy = false
          callbackFn()  
        }
      }
    }
  }
  getFontColor (c) {
    let colorParts
    let red
    let green
    let blue
    if (c.indexOf('#') !== -1) {
      // hex color
      colorParts = c.toLowerCase().replace('#', '')
      colorParts = colorParts.split('')
      red = parseInt(colorParts[0] + colorParts[1], 16)
      green = parseInt(colorParts[2] + colorParts[3], 16)
      blue = parseInt(colorParts[4] + colorParts[5], 16)
    }
    else if (c.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = c.toLowerCase().replace('rgb(', '').replace(')', '')
      colorParts = colorParts.split(',')
      red = colorParts[0]
      green = colorParts[1]
      blue = colorParts[2]
    }
    return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
  }
  handleCellSelect (event, data) {
    if (this.options.allowCellSelections === true) {
      let elemNum = -1
      let colIndex = this.qlikColumnOrder[data.colIndex]
      if (typeof colIndex === 'undefined' || colIndex === null) {
        colIndex = data.colIndex
      }
      if (colIndex < 0) {
        return
      }
      if (typeof data.cell.qElemNo !== 'undefined') {
        elemNum = data.cell.qElemNo
        // return
      } 
      else if (typeof data.cell.qElemNumber !== 'undefined') {
        elemNum = data.cell.qElemNumber
      }
      if (elemNum < 0 || data.column.isMeasure === true) {
        return
      }
      // this.inSelections = true      
      this.beginSelections().then(() => {        
        const maskEl = document.getElementById(`${this.elementId}_cellSelectMask`)
        const maskLeftEl = document.getElementById(`${this.elementId}_cellSelectMaskLeft`)
        const maskRightEl = document.getElementById(`${this.elementId}_cellSelectMaskRight`)        
        const maskButtonsEl = document.getElementById(`${this.elementId}_cellSelectButtons`)
        let cellEl = null
        if (event.target.classList.contains('websy-table-cell')) {
          cellEl = event.target
        }
        else {
          cellEl = event.target.parentElement
        }
        if (maskEl) {
          maskEl.classList.add('active')
        }
        if (maskLeftEl) {
          maskLeftEl.classList.add('active')
          maskLeftEl.style.left = '0px'
          maskLeftEl.style.width = `${cellEl.offsetLeft}px`
          maskLeftEl.style.top = `0px`
          maskLeftEl.style.bottom = '0px'
        }
        if (maskRightEl) {
          maskRightEl.classList.add('active')
          maskRightEl.style.left = `${cellEl.offsetLeft + cellEl.offsetWidth}px`
          maskRightEl.style.right = '0px'
          maskRightEl.style.top = `0px`
          maskRightEl.style.bottom = '0px'
        }
        if (maskButtonsEl) {
          maskButtonsEl.classList.add('active')
          maskButtonsEl.style.top = '0px'
          maskButtonsEl.style.left = `${cellEl.offsetLeft}px`
          maskButtonsEl.style.width = `${cellEl.offsetWidth}px`
          maskButtonsEl.style.height = `${this.table.sizes.header.height}px`
        }        
        // cellEl.classList.add('websy-cell-selected')   
        // let rowIndex = +cellEl.getAttribute('data-row-index')
        let rowIndex = +data.cell.qlikRowIndex
        let cellIndex = +cellEl.getAttribute('data-cell-index')
        let colIndex = +cellEl.getAttribute('data-col-index')        
        if (this.layout.qHyperCube.qMode === 'P') {
          let cellRef = `${data.cell.pos === 'Left' ? 'L' : 'T'}_${colIndex}_${rowIndex}`
          let cellRefIndex = this.selectedCells.indexOf(cellRef)
          if (this.layout.qHyperCube.qIndentMode !== true) {
            rowIndex -= this.startRow
          }
          if (cellRefIndex === -1) {
            if (this.fullData && this.fullData[rowIndex] && this.fullData[rowIndex][cellIndex]) {
              if (!this.fullData[rowIndex][cellIndex].classes) {
                this.fullData[rowIndex][cellIndex].classes = []
              }
              if (this.fullData[rowIndex][cellIndex].classes.indexOf('websy-cell-selected') === -1) {                
                this.fullData[rowIndex][cellIndex].classes.push('websy-cell-selected')
                if (!cellEl.classList.contains('websy-cell-selected')) {
                  cellEl.classList.add('websy-cell-selected')                  
                }
              }
            }
            this.selectedCells.push(cellRef)
          }
          else {
            if (this.fullData && this.fullData[rowIndex] && this.fullData[rowIndex][cellIndex]) {
              if (!this.fullData[rowIndex][cellIndex].classes) {
                this.fullData[rowIndex][cellIndex].classes = []
              }
              let classIndex = this.fullData[rowIndex][cellIndex].classes.indexOf('websy-cell-selected')
              if (classIndex !== -1) {
                this.fullData[rowIndex][cellIndex].classes.splice(classIndex, 1)
                if (cellEl.classList.contains('websy-cell-selected')) {
                  cellEl.classList.remove('websy-cell-selected')                  
                }
              }
            }
            this.selectedCells.splice(cellRefIndex, 1)
          }
          if (this.selectedCells.length > 0) {
            this.options.model.selectPivotCells('/qHyperCubeDef', this.selectedCells.map(c => ({qType: c.split('_')[0], qCol: +c.split('_')[1], qRow: +c.split('_')[2]})))            
          }
          else {
            this.options.model.clearSelections('/qHyperCubeDef', [colIndex])
          }
        }   
        else {
          let cellRefIndex = this.selectedCells.indexOf(rowIndex)
          if (cellRefIndex === -1) {
            if (this.fullData && this.fullData[rowIndex] && this.fullData[rowIndex][cellIndex]) {
              if (!this.fullData[rowIndex][cellIndex].classes) {
                this.fullData[rowIndex][cellIndex].classes = []
              }
              if (this.fullData[rowIndex][cellIndex].classes.indexOf('websy-cell-selected') === -1) {                
                this.fullData[rowIndex][cellIndex].classes.push('websy-cell-selected')
                if (!cellEl.classList.contains('websy-cell-selected')) {
                  cellEl.classList.add('websy-cell-selected')                  
                }
              }
            }
            this.selectedCells.push(+data.rowIndex)
          }
          else {
            if (this.fullData && this.fullData[rowIndex] && this.fullData[rowIndex][cellIndex]) {
              if (!this.fullData[rowIndex][cellIndex].classes) {
                this.fullData[rowIndex][cellIndex].classes = []
              }
              let classIndex = this.fullData[rowIndex][cellIndex].classes.indexOf('websy-cell-selected')
              if (classIndex !== -1) {
                this.fullData[rowIndex][cellIndex].classes.splice(classIndex, 1)
                if (cellEl.classList.contains('websy-cell-selected')) {
                  cellEl.classList.remove('websy-cell-selected')                  
                }
              }
            }
            this.selectedCells.splice(cellRefIndex, 1)
          }
          if (this.selectedCells.length > 0) {
            this.options.model.selectHyperCubeCells('/qHyperCubeDef', this.selectedCells, [colIndex])            
          }
          else {
            this.options.model.clearSelections('/qHyperCubeDef', [colIndex])
          }
        }        
      })      
    }
  }
  handleClick (event, cell, row, column) {
    if (event.target.classList.contains('table-try-again')) {
      this.render()
    }
    else if (cell && cell.qElemNumber) {
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false)
    }
    else if (event.target.classList.contains('toggle-pivot-panel')) {
      const el = document.getElementById(`${this.elementId}_pivotContainer`)
      if (el) {
        event.target.classList.toggle('active')
        el.classList.toggle('active')
      }
    }
    else if (event.target.classList.contains('websy-cell-select-mask')) {
      this.confirmCancelSelections(true)
    }
    else if (event.target.classList.contains('.websy-cell-select-mask-side')) {
      this.confirmCancelSelections(true)
    }
    else if (event.target.classList.contains('websy-cell-select-confirm')) {
      this.confirmCancelSelections(true)
    }
    else if (event.target.classList.contains('websy-cell-select-cancel')) {
      this.confirmCancelSelections(false)
    }
  }
  handleCollapse (event, row, column, all = false) {
    this.options.model.collapseLeft('/qHyperCubeDef', this.startRow + row, this.startCol + column, all)
  }
  handleExpand (event, row, column, all = false) {
    this.options.model.expandLeft('/qHyperCubeDef', this.startRow + row, this.startCol + column, all)
  }
  handleScroll (direction, startRow, endRow, startCol, endCol) {    
    this.startCol = startCol
    this.endCol = endCol
    // if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {
    //   this.startCol = Math.max(0, startCol - this.pinnedColumns)
    //   this.endCol = Math.max(0, endCol - this.pinnedColumns)
    // }
    this.startRow = startRow        
    this.checkDataExists(startRow, endRow).then(() => {
      if (this.columns && this.columns.length > 0) {
        if (this.layout.qHyperCube.qMode === 'S') {
          let columnsInView = this.columns.filter((c, i) => {
            return i < this.pinnedColumns || (i >= startCol && i <= endCol)
          })
          this.table.columns = [columnsInView]   
        }        
        else {          
          let columnsInView = this.columns.map((cP) => {
            let acc = 0
            let adjAcc = 0
            let firstColTrimmed = false
            let newRow = cP.map((cC, i) => {                            
              let c = Object.assign({}, cC)
              if (i < this.pinnedColumns) {
                acc += c.colspan || 1    
                adjAcc += c.colspan || 1    
                c.inView = true
                return c
              }              
              if (c.colspan > 1) {
                // not last level of column headers
                if (acc < startCol && acc + c.colspan > startCol && firstColTrimmed === false) {
                  c.colspan = c.colspan - (startCol - acc)
                  c.inView = true
                  firstColTrimmed = true
                }
                else if (acc >= startCol) {
                  c.inView = true
                }
                // else if (acc >= startCol && acc + c.colspan <= endCol) {                  
                //   c.inView = true
                // }
                // else if (acc <= endCol && acc + c.colspan >= endCol) {
                //   // c.colspan = c.colspan - (endCol - acc)
                //   c.inView = true
                // }
                else {
                  c.inView = false
                }               
              }              
              else {
                c.inView = i >= startCol + this.pinnedColumns && i <= endCol + this.pinnedColumns
              }  
              acc += cC.colspan || 1    
              adjAcc += c.colspan || 1    
              return c                                   
            }) 
            return newRow.filter(d => d.inView === true)
          })          
          this.table.columns = columnsInView
        }
      }
      if (this.totals && this.totals.length > 0) {
        let totalsInView = this.totals.filter((c, i) => {
          return i < this.pinnedColumns || (i >= startCol && i <= endCol)
        })      
        this.table.totals = totalsInView
      }      
      let start = this.layout.qHyperCube.qMode === 'S' || this.layout.qHyperCube.qIndentMode === true ? startRow : 0
      let end = this.layout.qHyperCube.qMode === 'S' || this.layout.qHyperCube.qIndentMode === true ? endRow : endRow - startRow            
      this.appendRows(this.transformData([...this.fullData].slice(start, end + 1).map(row => {
        // console.log(row)
        return row.filter((c, i) => {  
          if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {
            return c.level < this.pinnedColumns || (c.dataIndex >= (startCol - (this.layout.qHyperCube.qNoOfLeftDims - this.pinnedColumns)) && c.dataIndex <= (endCol - (this.layout.qHyperCube.qNoOfLeftDims - this.pinnedColumns)))
            // return c.level < this.pinnedColumns || (c.level >= startCol && c.level <= endCol)
          }        
          else {
            return i < this.pinnedColumns || (i >= startCol + this.pinnedColumns && i <= endCol + this.pinnedColumns)
          }
        }).map((c, i, arr) => {
          if (this.layout.qHyperCube.qMode === 'P') { // && this.layout.qHyperCube.qIndentMode !== true) {            
            c.level = c.level > this.pinnedColumns - 1 ? this.table.options.columns[this.table.options.columns.length - 1].length - (arr.length - i) : c.level
          }
          return c
        })
      })))
    })
  }
  handleNativeScroll (scrollTop) {
    let rowsRendered = Math.floor(scrollTop / this.table.sizes.cellHeight)    
    if (rowsRendered + (this.table.sizes.rowsToRender * 2) > this.rowsLoaded && this.rowsLoaded < this.layout.qHyperCube.qSize.qcy) {
      this.getData(this.rowsLoaded, (page) => {
        this.appendRows(this.transformData(page.qMatrix))
      })
    }
  }
  handleSearch (event, column) {
    // console.log(event, column)
    if (this.dropdowns[column.dimId]) {
      let el = document.getElementById(`${this.elementId}_tableContainer_columnSearch_${column.dimId}`)
      if (el) {
        el.classList.toggle('active')
        // el.style.top = `${event.pageY}px`
        el.style.top = '0px'
        // el.style.right = `calc(100vw - ${event.pageX + event.target.offsetWidth}px)`
        el.style.left = `${Math.max(130, event.pageX - this.table.sizes.outer.left)}px` // need to improve this logic. currently based on the dropdown being 220px wide
        this.dropdowns[column.dimId].open()
      }
    }
  }
  handleCloseSearch (id) {
    let el = document.getElementById(id)
    el.classList.remove('active')
  }
  handleSort (event, column, colIndex) {
    const reverse = column.reverseSort === true
    const patchDefs = [{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([colIndex])
    }]
    let sortType = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? 'qDimensions' : 'qMeasures'
    let sortIndex = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? colIndex : colIndex - this.layout.qHyperCube.qDimensionInfo.length    
    patchDefs.push({
      qOp: 'replace',
      qPath: `/qHyperCubeDef/${sortType}/${sortIndex}/qDef/qReverseSort`,
      qValue: JSON.stringify(reverse)
    })
    this.options.model.applyPatches(patchDefs, true)
  }
  handleVirtualScrollX (startPoint) {
    let handleWidth = (this.columnParams.scrollableWidth) * (this.columnParams.scrollableWidth / this.totalWidth)
    // let withoutScroll = this.columnParams.scrollableWidth - handleWidth
    // let realLeft = startPoint / withoutScroll * (this.totalWidth - handleWidth)
    let realLeft = (startPoint / this.columnParams.scrollableWidth) * this.totalWidth
    let accWidth = 0
    let leftDims = (this.options.pinnedColumns || this.layout.qHyperCube.qNoOfLeftDims)
    this.leftDataCol = 0
    for (let i = leftDims; i < this.fullColumnList.length; i++) {      
      if (realLeft >= (+this.fullColumnList[i].width.replace('px', '') + accWidth)) {
        accWidth += +this.fullColumnList[i].width.replace('px', '')
        this.leftDataCol = i // - leftDims
      }
      else {
        break
      }            
    }
    if (this.fullColumnList.length - this.leftDataCol < this.columnsToRender) {
      this.leftDataCol = (this.fullColumnList.length - this.columnsToRender) + 1
    }
    // console.log('col', startPoint / withoutScroll, realLeft, this.totalWidth, this.leftDataCol)
    this.resize()
  }  
  prepDropdowns () {
    // this.table.options.columns.forEach((c, i) => {
    //   if (c.searchable === true && c.searchField && this.layout[c.searchField] && this.layout[c.searchField].qListObject) {
    //     this.dropdowns[c.searchField] = new WebsyDesigns.QlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
    //       model: this.options.model,
    //       path: `${c.searchField}`
    //     })
    //   }
    // })
    // this.layout.qHyperCube.qDimensionInfo.forEach((d, i) => {
    //   if (!this.dropdowns[`dim${i}`]) {
    //     this.dropdowns[`dim${i}`] = new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
    //       model: this.options.model,
    //       path: `dim${i}`,
    //       onClose: this.handleCloseSearch
    //     }) 
    //   }      
    // })
  }
  prepSearch () {
    // this.busy = true
    // this.options.model.getProperties().then(props => {
    //   console.log('props', props)
    //   const patches = []
    //   props.qHyperCubeDef.qDimensions.forEach((d, i) => {
    //     patches.push({
    //       qOp: 'add',
    //       qPath: `/dim${i}`,
    //       qValue: JSON.stringify({
    //         qListObjectDef: {
    //           qDef: {...d.qDef, qSortCriterias: [{qSortByState: 1, qSortByAscii: 1}]},
    //           qLibraryId: d.qLibraryId
    //         }
    //       })
    //     })
    //   })
    //   this.options.model.applyPatches(patches, true).then(() => {
    //     this.busy = false
    //     this.searchPrepped = true
    //     this.render()
    //   })
    // }) 
  }
  render (pageNum = 0) {    
    // if (this.searchPrepped === false) {
    //   this.prepSearch()
    //   return 
    // }
    this.validPivotLeft = 0
    if (this.inSelections === false) {
      this.table.showLoading({message: 'Loading...'})    
    }    
    if (this.inSelections === true && this.layout.qSelectionInfo.qInSelections === true) {
      return
    }
    this.options.model.getLayout().then(layout => {  
      this.layout = layout
      this.qlikTop = 0
      this.startRow = 0
      if (this.inSelections === true) {
        if (layout.qSelectionInfo.qInSelections === true) {
          return
        }       
        else {
          this.confirmCancelSelections(true)
        } 
      }
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder   
      this.pageNum = pageNum         
      this.getData(0, page => {
        this.layout.qHyperCube.qDataPages = [page]  
        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          this.table.hideLoading()
          this.table.showError({message: this.options.customError || layout.qHyperCube.qCalcCondMsg})
          return
        }
        if (this.options.forcedRowLimit && layout.qHyperCube.qSize.qcy > this.options.forcedRowLimit) {
          this.table.hideLoading()
          this.table.showError({message: this.options.forcedRowLimitError || this.options.customError || layout.qHyperCube.qCalcCondMsg})
          return
        }
        if (this.options.forcedColLimit && layout.qHyperCube.qSize.qcx > this.options.forcedColLimit) {
          this.table.hideLoading()
          this.table.showError({message: this.options.forcedColLimitError || this.options.customError || layout.qHyperCube.qCalcCondMsg})
          return
        }
        this.table.hideError()
        this.options.model.getEffectiveProperties().then(props => {
          this.properties = props      
          if (this.options.onUpdate) {
            this.options.onUpdate(props, layout)
          }          
          this.endCol = layout.qHyperCube.qSize.qcx + (this.pinnedColumns || layout.qHyperCube.qNoOfLeftDims)
          // this.layout = layout
          if (this.layout.qHyperCube.qMode === 'P') {
            this.qlikColumnOrder = this.layout.qHyperCube.qEffectiveInterColumnSortOrder
          }
          else {
            this.qlikColumnOrder = this.layout.qHyperCube.qColumnOrder
          }
          this.resize()
        })
      })
    }, err => {        
      console.log('error getting layout', err)               
    })  
  }
  resize () {
    this.buildDataStructure()
    // this.rowCount = pageNum * this.options.pageSize
    // if (this.layout.qHyperCube.qPivotDataPages[0]) {
    //   this.layout.qHyperCube.qPivotDataPages = []
    // }
    this.errorCount = 0    
    this.pageCount = Math.ceil(this.layout.qHyperCube.qSize.qcy / this.options.pageSize)
    this.table.options.pageNum = this.pageNum          
    this.table.options.pageCount = this.pageCount
    // this.dataWidth = this.layout.qHyperCube.qSize.qcx
    // this.columnOrder = this.layout.qHyperCube.qColumnOrder
    if (typeof this.columnOrder === 'undefined') {
      this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
    }
    this.layout.qHyperCube.qDimensionInfo = this.layout.qHyperCube.qDimensionInfo.map((c, i) => {
      c.searchable = true
      if (this.options.columnOverrides[i]) {
        c = {
          ...c,             
          // onSearch: this.handleSearch.bind(this),
          // onCloseSearch: this.handleCloseSearch.bind(this),
          ...this.options.columnOverrides[i]
        }
      }        
      c.searchField = `dim${i}`
      
      return c
    })
    this.layout.qHyperCube.qMeasureInfo = this.layout.qHyperCube.qMeasureInfo.map((c, i) => {
      if (this.options.columnOverrides[this.layout.qHyperCube.qDimensionInfo.length + i]) {
        c = {...c, ...this.options.columnOverrides[this.layout.qHyperCube.qDimensionInfo.length + i]}
      }
      return c
    }) 
    if (this.layout.qHyperCube.qMode === 'S') {
      this.buildStraightColumnsAndTotals()
    }  
    else {      
      this.buildPivotColumns()         
    }      
    // let dataStart = this.startRow
    if (this.startRow > 0 && this.startRow + this.table.sizes.rowsToRender > this.layout.qHyperCube.qSize.qcy) {
      this.startRow = this.layout.qHyperCube.qSize.qcy - this.table.sizes.rowsToRender
    }
    this.getData(this.startRow, page => {
      if (this.layout.qHyperCube.qPivotDataPages && this.layout.qHyperCube.qPivotDataPages[0] && this.layout.qHyperCube.qPivotDataPages[0].qData.length !== this.layout.qHyperCube.qSize.qcx) {
        this.buildPivotColumns()            
      } 
      this.table.hideLoading()
      // if (this.layout.qHyperCube.qMode === 'S') {
      this.table.render([], false)
      this.prepDropdowns()
      // }        
      if (!page || page.err) {
        const tableEl = document.getElementById(`${this.elementId}_foot`)
        if (this.tableEl) {
          tableEl.innerHTML = `
            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>
          `
        }               
      }
      else {
        if (this.options.virtualScroll === true) {
          this.appendRows(this.transformData(this.fullData))
        }
        else {
          this.appendRows(this.transformData(this.fullData.slice(0, this.rowsLoaded)))
        }
      }
    })
  }
  setPageNum (page) {
    this.render(page)
  }
  setPageSize (size) {
    this.options.pageSize = size
    this.render()
  }
  transformData (page) {    
    return page.map(r => {
      return r.map((c, i) => {
        if (this.layout.qHyperCube.qMode === 'S') {
          c.level = i
        }        
        if (this.table.options.columns[this.table.options.columns.length - 1][i] && (this.table.options.columns[this.table.options.columns.length - 1][i].showAsLink === true || this.table.options.columns[this.table.options.columns.length - 1][i].showAsNavigatorLink === true)) {
          if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
            c.value = c.qAttrExps.qValues[0].qText
            if (c.value.indexOf('https://') === -1) {
              c.value = `https://${c.value}`
            }
            c.displayText = c.qText || '-'
          }
          else {
            c.value = c.qText || '-'
          }
        } 
        else {
          c.value = c.qText || '-'
        }
        if (c.qAttrExps && c.qAttrExps.qValues) {          
          let tIndex = i + (this.startCol || 0)          
          c.qAttrExps.qValues.forEach((a, aI) => {            
            if (a.qText && a.qText !== '') {              
              if (c.level < this.layout.qHyperCube.qDimensionInfo.length) {              
                if (this.layout.qHyperCube.qDimensionInfo[c.level] && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI] && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  c.color = a.qText
                }
                else if (this.layout.qHyperCube.qDimensionInfo[c.level] && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI] && this.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  c.backgroundColor = a.qText
                }
              }
              else {
                let measureIndex = (c.level - this.layout.qHyperCube.qDimensionInfo.length) % this.layout.qHyperCube.qMeasureInfo.length
                if (this.layout.qHyperCube.qMeasureInfo[measureIndex] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  c.color = a.qText
                }
                else if (this.layout.qHyperCube.qMeasureInfo[measureIndex] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  c.backgroundColor = a.qText
                }
              }              
            }
          })
        }        
        return c
      })
    })    
  }
  transformPivotTable (page) {    
    let output = []
    let leftNodes = []    
    let topNodesTransposed = []
    let topCounter = 0
    let accCellSpan = 0
    let visibleLeftCount = 0    
    let visibleTopCount = 0    
    let visibleColCount = 0
    let leftKeys = {}
    let lowestLevelNodes = 0
    this.validPivotLeft = 0
    let tempNode = []
    let sourceColumns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
    for (let i = 0; i < page.qLeft.length; i++) {
      expandLeft.call(this, page.qLeft[i], 0, 0, null, [])
    }              
    for (let i = 0; i < page.qTop.length; i++) {
      expandTop.call(this, page.qTop[i], 0, i)
    }
    this.pinnedColumns = Math.min(this.validPivotLeft + 1, visibleLeftCount)
    leftNodes = leftNodes.map(n => {
      return n.map((c, i) => {
        if (c.level >= this.pinnedColumns && c.qElemNo === -4) {
          c.level = -1
        }
        return c
      })
    })
    for (let r = 0; r < page.qData.length; r++) {
      let row = page.qData[r]      
      for (let c = 0; c < row.length; c++) {
        if (!row[c].classes) {
          row[c].classes = []
        }
        row[c].pos = 'Data'  
        row[c].style = 'text-align: right;'       
        // row[c].level = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).length + c
        row[c].dataIndex = c        
        // row[c].level = this.pinnedColumns
        if (this.layout.qHyperCube.qIndentMode !== true) {
          row[c].level = this.pinnedColumns + c
        }  
        if (row[c].qAttrExps && row[c].qAttrExps.qValues) {
          row[c].qAttrExps.qValues.forEach((a, aI) => {            
            if (a.qText && a.qText !== '') {              
              if (row[c].level < this.layout.qHyperCube.qDimensionInfo.length) {              
                if (this.layout.qHyperCube.qDimensionInfo[row[c].level] && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo[aI] && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  row[c].color = a.qText
                }
                else if (this.layout.qHyperCube.qDimensionInfo[row[c].level] && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo[aI] && this.layout.qHyperCube.qDimensionInfo[row[c].level].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  row[c].backgroundColor = a.qText
                }
              }
              else {
                let measureIndex = c % this.layout.qHyperCube.qMeasureInfo.length
                if (this.layout.qHyperCube.qMeasureInfo[measureIndex] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  row[c].color = a.qText
                }
                else if (this.layout.qHyperCube.qMeasureInfo[measureIndex] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && this.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  row[c].backgroundColor = a.qText
                }
              }              
            }
          })
        }       
        // row[c].width = `${this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + c] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
        // if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
        //   row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText
        //   row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText)
        // }
        // if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
        //   row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText)
        // }
        let lastTop = topNodesTransposed[topNodesTransposed.length - 1][c]
        if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
          row[c].qType = 'T'
        } 
        if (leftNodes[r] && leftNodes[r][leftNodes[r].length - 1].qType === 'T') {
          if (!leftNodes[r][leftNodes[r].length - 1].classes) {
            leftNodes[r][leftNodes[r].length - 1].classes = []
          }
          if (leftNodes[r][leftNodes[r].length - 1].classes.indexOf('total-cell') === -1) {
            leftNodes[r][leftNodes[r].length - 1].classes.push('total-cell')
          }
          if (row[c].classes.indexOf('total-cell') === -1) {
            row[c].classes.push('total-cell')
          }
        }
        if (leftNodes[r] && leftNodes[r][leftNodes[r].length - 1].classes && leftNodes[r][leftNodes[r].length - 1].classes.indexOf('sub-total-cell') !== -1) {
          row[c].classes.push('sub-total-cell')
        }                        
        row[c].value = row[c].qText || ''            
      }
      if (leftNodes[r]) {
        row = leftNodes[r].concat(row)
      }
      output.push(row)
    }    
    let additionalTopCells = []
    let additionalCellCount = visibleLeftCount
    if (this.layout.qHyperCube.qIndentMode === true) {
      additionalCellCount = 1
    }
    for (let i = 0; i < additionalCellCount; i++) {
      additionalTopCells.push({
        rowspan: 1,
        colspan: 1,
        level: 0,
        qText: '',
        name: '',
        qType: 'V'
      })
    }
    if (visibleLeftCount !== 0) {                
      for (let i = 0; i < topNodesTransposed.length; i++) {
        if (i === topNodesTransposed.length - 1 && this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {  
          let columns = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError)
          let labelledTopCells = additionalTopCells.map((d, i) => {
            d.name = (columns[i] || {}).qFallbackTitle || ''
            d.show = i <= this.validPivotLeft
            return d
          })
          topNodesTransposed[i] = labelledTopCells.concat(topNodesTransposed[i])
        }
        else {
        // if (i === topNodesTransposed.length - 1) {          
        // topNodesTransposed[i] = (this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).filter((d, dI) => dI < visibleLeftCount).map((d, dI) => {
        //   return Object.assign({}, d, {
        //     name: d.qFallbackTitle || 'Review this'
        //     // width: `${this.columnParams.cellWidths[dI] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
        //   })
        // }).filter((d, i) => {
        //   if (this.layout.qHyperCube.qIndentMode === true && i === 0) {
        //     return true
        //   }
        //   else if (this.layout.qHyperCube.qIndentMode === false) {
        //     return true
        //   }
        //   return false
        // })).concat(topNodesTransposed[i])
        // } 
        // else {
          topNodesTransposed[i] = additionalTopCells.concat(topNodesTransposed[i])
        }
      }
    }
    visibleColCount = topNodesTransposed[topNodesTransposed.length - 1]
    // output = topNodesTransposed.concat(output)
    // This function is used to convert the qLeft structure from a parent/child hierarchy
    // into a 2 dimensions array    
    function expandLeft (input, level, index, parent, chain) {
      let o = Object.assign({}, input)
      o.level = this.layout.qHyperCube.qIndentMode === true ? 0 : level
      o.index = level
      o.pos = 'Left'
      o.style = ''
      o.value = o.qText || '' 
      // if (!o.classes) {
      //   o.classes = []
      // }           
      // if (!input.classes) {
      //   input.classes = []
      // }
      input.value = input.qText || ''
      input.index = level
      // let keyLevel = level
      // if (this.layout.qHyperCube.qIndentMode === true) {
      //   keyLevel = 0
      // }
      // if (!leftKeys[keyLevel]) {
      //   leftKeys[keyLevel] = []
      // }      
      // o.qlikRowIndex = leftKeys[keyLevel].length + this.qlikTop
      // input.qlikRowIndex = leftKeys[keyLevel].length + this.qlikTop            
      // leftKeys[keyLevel].push(o.qElemNo)      
      visibleLeftCount = Math.max(visibleLeftCount, level + 1)
      o.childCount = o.qSubNodes.length    
      // TODO add id mapping to attribute exressions here
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes  
      if (o.qElemNo < 0 && this.layout.qHyperCube.qIndentMode === true && level > 0) {   
        if (o.qType === 'T') {
          if (!parent.classes) {
            parent.classes = []
          }
          if (parent.classes.indexOf('sub-total-cell') === -1 && parent.index > 0) {
            parent.classes.push('sub-total-cell')
            parent.isTotal = true
          }
        }     
        // return
      }
      // else {
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {          
          o.qText = 'Totals'
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          // o.qType = 'T'
        }
      }
      if (o.qElemNo === -4 && this.layout.qHyperCube.qIndentMode === true) {
        return
        // o.qType = 'T'
      }
      if (o.qType === 'T' && this.layout.qHyperCube.qIndentMode === true && level > 0) {
        return
        // o.qType = 'T'
      }
      o.expandable = o.qCanExpand
      o.collapsable = o.qCanCollapse
      o.rowspan = Math.max(1, input.qSubNodes.length)
      if (o.qAttrExps && o.qAttrExps.qValues) {
        o.qAttrExps.qValues.forEach((a, aI) => {            
          if (a.qText && a.qText !== '') {
            if (sourceColumns[o.level] && sourceColumns[o.level].qAttrExprInfo && sourceColumns[o.level].qAttrExprInfo[aI] && sourceColumns[o.level].qAttrExprInfo[aI].id === 'cellForegroundColor') {
              o.color = a.qText
            }
            else if (sourceColumns[o.level] && sourceColumns[o.level].qAttrExprInfo && sourceColumns[o.level].qAttrExprInfo[aI] && sourceColumns[o.level].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
              o.backgroundColor = a.qText
            }
          }
        })
      }      
      input.rowspan = Math.max(1, input.qSubNodes.length)
      if (this.layout.qHyperCube.qIndentMode === true) {
        o.rowspan = 1
        o.indent = level
        if (level < this.layout.qHyperCube.qNoOfLeftDims - 1 && o.qType !== 'T') {
          if (!input.classes) {
            input.classes = []
          }
          if (input.classes.indexOf('sub-total-cell') === -1) {
            input.classes.push('sub-total-cell')
            input.isTotal = true
          }
        }
        if (level > 0) {
          // o.style = `padding-left: ${level * 20}px;`
          o.style = `text-indent: ${level * 20}px;`
        }        
        if (o.qType !== 'E' && o.qUp === 0) {
          leftNodes.push([o])
          o.qlikRowIndex = lowestLevelNodes + this.qlikTop
          input.qlikRowIndex = lowestLevelNodes + this.qlikTop
          lowestLevelNodes++
        }        
        tempNode = []
        // if (o.qElemNo > -4) {

        // }
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandLeft.call(this, input.qSubNodes[i], level + 1, i, input, [...chain, o])
        }      
        o.classes = input.classes
      } 
      else if (input.qSubNodes.length === 0) {     
        if (o.qElemNo > -4) {
          this.validPivotLeft = Math.max(this.validPivotLeft, level)
        }
        leftNodes.push(tempNode.concat([o])) 
        o.qlikRowIndex = lowestLevelNodes + this.qlikTop
        input.qlikRowIndex = lowestLevelNodes + this.qlikTop
        lowestLevelNodes++
        tempNode = []
      }
      else {               
        if (input.qElemNo > -4 || (!input.qSubNodes || input.qSubNodes.length === 0)) {                  
          this.validPivotLeft = Math.max(this.validPivotLeft, level)
        }
        tempNode.push(o) 
        // if (o.qElemNo > -4) {                  
        //   this.validPivotLeft = Math.max(this.validPivotLeft, level)
        // }
        for (let i = 0; i < input.qSubNodes.length; i++) {
          o.qlikRowIndex = lowestLevelNodes + this.qlikTop
          input.qlikRowIndex = lowestLevelNodes + this.qlikTop
          expandLeft.call(this, input.qSubNodes[i], level + 1, i, input, [...chain, o])          
        }        
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].rowspan
        }
        input.rowspan = s
        o.rowspan = s        
      }
      // }                      
    }
    // This function is used to convert the qTop structure from a parent/child hierarchy
    // into a 2 dimensions array
    function expandTop (input, level, index, parent) {
      if (typeof topNodesTransposed[level] === 'undefined') {
        topNodesTransposed[level] = []
      }
      let o = Object.assign({}, input)
      o.level = this.layout.qHyperCube.qIndentMode === true ? 0 : level
      o.pos = 'Top'
      o.rowIndex = topCounter
      o.topNode = true
      o.isHeader = true
      o.style = 'text-align: center;'       
      o.name = o.qText || ''
      if (!o.font) {
        o.font = {}
      }
      input.value = input.qText
      if (o.qType === 'P') {
        o.qElemNo = -99
      }
      o.childCount = o.qSubNodes.length
      visibleTopCount = Math.max(visibleTopCount, level + 1)      
      // TODO add id mapping to attribute exressions here
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes
      if (['T', 'E'].indexOf(o.qType) === -1) {
        o.qType = 'B'
      }
      if (typeof parent !== 'undefined') {
        if (parent.qType === 'T') {
          o.qType = parent.qType
          input.qType = parent.qType
        }
      }
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = this.layout.tableTotalsLabel
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
          input.qType = 'T'
        }
      }      
      o.colspan = Math.max(1, input.qSubNodes.length)
      input.colspan = Math.max(1, input.qSubNodes.length)
      // if (level === this.layout.qHyperCube.qEffectiveInterColumnSortOrder.length - this.layout.qHyperCube.qNoOfLeftDims) {
      //   o.inView = topNodesTransposed[level].length >= this.startCol && topNodesTransposed[level].length <= this.endCol
      //   input.inView = topNodesTransposed[level].length >= this.startCol && topNodesTransposed[level].length <= this.endCol
      // }      
      if (input.qSubNodes.length === 0) {                  
        // if (o.qElemNo === -99 && o.qCanCollapse === true) {
        if (index >= this.startCol && index <= this.endCol) {
          o.inView = true
          input.inView = true
          accCellSpan++
        }          
        // }
      } 
      else {                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandTop.call(this, input.qSubNodes[i], level + 1, i, input)
        }
        let s = 0
        let inView = false
        for (let i = 0; i < input.qSubNodes.length; i++) {          
          // if (input.qSubNodes[i].inView === true) {
          // inView = true
          s += input.qSubNodes[i].colspan            
          // }
        }
        // o.inView = inView
        // input.inView = inView
        o.rowIndex = topCounter
        topCounter += s
        o.colspan = s
        input.colspan = s
        if (o.qType === 'T' && o.qElemNo === -1) {
          accCellSpan += s
        }
        if (o.qElemNo === -99) {
          accCellSpan++
        }
        if (input.qCanExpand === true || input.qCanCollapse === true) {
          if (input.qSubNodes.length > 0 && input.qCanCollapse === true && typeof input.qSubNodes[0].rowIndex !== 'undefined') {
            input.rowIndex = input.qSubNodes[0].rowIndex
            o.rowIndex = input.qSubNodes[0].rowIndex
          } 
          else {
            input.rowIndex = accCellSpan
            o.rowIndex = accCellSpan
            accCellSpan += o.colspan
          }
        }
      }
      let toPush = [o]
      // if (o.colspan > 1) {
      //   toPush = new Array(o.colspan).fill({ ...o })
      // }
      topNodesTransposed[level].push(...toPush)   
    }
    return { columns: topNodesTransposed, data: output }
  }
  updatePivotStructure () {
    let dims = this.rowList.options.items.concat(this.columnList.options.items).map(d => d.dim)
    let leftDims = this.rowList.options.items.length
    let patchDefs = [
      {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qNoOfLeftDims',
        qValue: JSON.stringify(leftDims)
      },
      {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qDimensions',
        qValue: JSON.stringify(dims)
      }
    ]
    if (this.options.onPivot) {
      this.options.onPivot()
    }
    this.options.model.applyPatches(patchDefs, true)
  }
}


export default Table3
