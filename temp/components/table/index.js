/* global WebsyDesigns getAllData */ 
class Table {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 50
    }
    this.elementId = elementId    
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.errorCount = 0    
    this.retryFn = null
    this.busy = false
    this.table = new WebsyDesigns.WebsyTable(this.elementId, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),      
      onSort: this.handleSort.bind(this)
    })
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
    }
    this.render()
  }
  appendRows (data) {
    this.table.appendRows(data)
  }
  getData (callbackFn) {
    if (this.busy === false) {
      this.busy = true
      if (this.options.getAllData === true) {
        getAllData('qHyperCube', this.options.model, this.layout, layout => {
          this.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length
          this.busy = false
          if (callbackFn) {
            callbackFn(layout.qHyperCube.qDataPages[0].qMatrix)  
          }
        })
      }
      else {
        const pageDefs = [{
          qTop: this.rowCount,
          qLeft: 0,
          qWidth: this.dataWidth,
          qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
        }]
        if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
          let method = 'getHyperCubeData'
          if (this.layout.qHyperCube.qMode === 'P') {
            method = 'getHyperCubePivotData'
          }
          this.options.model[method]('/qHyperCubeDef', pageDefs).then(pages => {
            if (pages && pages[0]) {
              if (this.layout.qHyperCube.qMode === 'P') {
                this.layout.qHyperCube.qPivotDataPages.push(pages[0])
                this.rowCount += pages[0].qData.length
              }
              else {
                pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')
                this.layout.qHyperCube.qDataPages.push(pages[0])
                this.rowCount += pages[0].qMatrix.length
              }
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
            let e = err          
            if (this.errorCount < 50) {
              this.errorCount++
              console.log('error getting data, attempt', this.errorCount)
              clearTimeout(this.retryFn)
              this.retryFn = setTimeout(() => {
                this.getData(callbackFn)
              }, 300)        
            } 
            // callbackFn({err})
          })
        } 
        else {
          this.busy = false
        }
      }
    }
  }
  handleClick (event, cell, row, column) {
    if (event.target.classList.contains('table-try-again')) {
      this.render()
    }
    else if (cell && cell.qElemNumber) {
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false)
    }
  }
  handleScroll (event) {    
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.getData(page => {
        this.appendRows(this.transformData(page))
      })
    }
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
    this.options.model.applyPatches(patchDefs)
  }
  render () {    
    this.options.model.getLayout().then(layout => {      
      this.layout = layout
      this.rowCount = 0
      this.errorCount = 0
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder
      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
      }
      let columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
      let activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
      columns = columns.map((c, i) => {
        c.colIndex = this.columnOrder.indexOf(i)
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
        if (c.qSortIndicator === 'A') {
          c.sort = 'asc'
        }
        else if (c.qSortIndicator === 'D') {
          c.sort = 'desc'
        }
        return c
      })
      columns.sort((a, b) => {
        return a.colIndex - b.colIndex
      })            
      this.getData(page => {
        this.table.options.columns = columns
        this.table.options.activeSort = activeSort
        this.table.render()
        if (page.err) {
          const tableEl = document.getElementById(`${this.elementId}_foot`)
          tableEl.innerHTML = `
            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>
          ` 
        }
        else {
          this.appendRows(this.transformData(page))          
        }
      })
    }, err => {
      // try again      
      let e = err      
      if (this.errorCount < 50) {
        this.errorCount++
        console.log('error getting layout, attempt', this.errorCount)
        clearTimeout(this.retryFn)
        this.retryFn = setTimeout(() => {
          this.render()
        }, 300)               
      }      
    })
  }
  transformData (page) {
    if (this.layout.qHyperCube.qMode === 'S') {      
      return page.map(r => {
        return r.map((c, i) => {
          if (this.table.options.columns[i].showAsLink === true || this.table.options.columns[i].showAsNavigatorLink === true) {
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
          return c
        })
      })
    }
    else {
      let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
      columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
      this.table.options.columns = columns        
      this.table.render()
      let rows = []
      page.qData.forEach((r, i) => {
        rows.push([{ value: page.qLeft[i].qText, ...page.qLeft[i] }, ...r.map(c => {
          c.value = c.qText || '-'        
          if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
            c.backgroundColor = c.qAttrExps.qValues[0].qText
            let colorParts
            let red
            let green
            let blue
            if (c.backgroundColor.indexOf('#') !== -1) {
              // hex color
              colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '')
              colorParts = colorParts.split('')
              red = parseInt(colorParts[0] + colorParts[1], 16)
              green = parseInt(colorParts[2] + colorParts[3], 16)
              blue = parseInt(colorParts[4] + colorParts[5], 16)
            }
            else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
              // rgb color
              colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '')
              colorParts = colorParts.split(',')
              red = colorParts[0]
              green = colorParts[1]
              blue = colorParts[2]
            }
            c.color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
          }
          return c
        })])
      })
      return rows  
    }
  }
}
