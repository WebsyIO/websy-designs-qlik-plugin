/* global WebsyDesigns getAllData */ 
class Table {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 50
    }
    this.elementId = elementId    
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.pageNum = 0
    this.pageCount = 0
    this.errorCount = 0    
    this.retryFn = null
    this.pivotIndent = false
    this.busy = false
    this.table = new WebsyDesigns.WebsyTable(this.elementId, Object.assign({}, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),      
      onSort: this.handleSort.bind(this),
      onChangePageSize: this.setPageSize.bind(this),
      onSetPage: this.setPageNum.bind(this)
    }, this.options))
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
    this.options.model.applyPatches(patchDefs, true)
  }
  render (pageNum = 0) {    
    this.table.showLoading({message: 'Loading...'})
    this.options.model.getLayout().then(layout => {     
      console.log(layout)
      this.layout = layout
      this.rowCount = pageNum * this.options.pageSize
      this.errorCount = 0
      this.pageNum = pageNum      
      this.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / this.options.pageSize)
      this.table.options.pageNum = this.pageNum
      this.table.options.pageCount = this.pageCount
      if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
        this.table.hideLoading()
        this.table.showError({message: this.options.customError || layout.qHyperCube.qCalcCondMsg})
        return
      }
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
        this.table.hideLoading()
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
  setPageNum (page) {
    this.render(page)
  }
  setPageSize (size) {
    this.options.pageSize = size
    this.render()
  }
  transformData (page) {
    console.log('page', page)
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
          if (c.qAttrExps && c.qAttrExps.qValues) {
            let t = 'qDimensionInfo'
            let tIndex = i
            if (i > this.layout.qHyperCube.qDimensionInfo.length - 1) {
              t = 'qMeasureInfo'
              tIndex -= this.layout.qHyperCube.qDimensionInfo.length
            }
            c.qAttrExps.qValues.forEach((a, aI) => {
              if (a.qText && a.qText !== '') {
                if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  c.color = a.qText
                }
                else if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  c.backgroundColor = a.qText
                }
              }
            })
          }
          return c
        })
      })
    }
    else {
      let data = this.transformPivotTable(page)
      // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
      // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
      // this.table.options.columns = columns        
      this.table.options.columns = data.shift()
      this.table.render()
      return data
      // let rows = []
      // page.qData.forEach((r, i) => {
      //   rows.push([{ value: page.qLeft[i].qText, ...page.qLeft[i] }, ...r.map(c => {
      //     c.value = c.qText || '-'        
      //     if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
      //       c.backgroundColor = c.qAttrExps.qValues[0].qText
      //       let colorParts
      //       let red
      //       let green
      //       let blue
      //       if (c.backgroundColor.indexOf('#') !== -1) {
      //         // hex color
      //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '')
      //         colorParts = colorParts.split('')
      //         red = parseInt(colorParts[0] + colorParts[1], 16)
      //         green = parseInt(colorParts[2] + colorParts[3], 16)
      //         blue = parseInt(colorParts[4] + colorParts[5], 16)
      //       }
      //       else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
      //         // rgb color
      //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '')
      //         colorParts = colorParts.split(',')
      //         red = colorParts[0]
      //         green = colorParts[1]
      //         blue = colorParts[2]
      //       }
      //       c.color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
      //     }
      //     return c
      //   })])
      // })
      // return rows  
    }
  }
  transformPivotTable (page) {    
    let output = []
    let leftNodes = []
    let topNodes = []
    let topNodesTransposed = []
    let topCounter = 0
    let accCellSpan = 0
    let visibleLeftCount = 0    
    let visibleTopCount = 0   
    let visibleColCount = 0 
    let tempNode = []
    for (let i = 0; i < page.qLeft.length; i++) {
      expandLeft.call(this, page.qLeft[i], 0, 0, null, [])
    }              
    for (let i = 0; i < page.qTop.length; i++) {
      expandTop.call(this, page.qTop[i], 0, i)
    }
    for (let r = 0; r < page.qData.length; r++) {
      let row = page.qData[r]
      for (let c = 0; c < row.length; c++) {
        row[c].pos = 'Data'          
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
          row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText)
        }
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText)
        }
        let lastTop = topNodesTransposed[topNodesTransposed.length - 1][c]
        if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
          row[c].qType = 'T'
        }                           
        row[c].value = row[c].qText                
      }
      if (leftNodes[r]) {
        row = leftNodes[r].concat(row)
      }
      output.push(row)
    }
    let additionalTopCells = []
    let additionalCellCount = visibleLeftCount
    for (let i = 0; i < additionalCellCount; i++) {
      additionalTopCells.push({
        rowspan: 1,
        colSpan: 1,
        level: 0,
        qText: '',
        qType: 'V'
      })
    }
    if (visibleLeftCount !== 0) {                
      for (let i = 0; i < topNodesTransposed.length; i++) {
        if (i === topNodesTransposed.length - 1) {
          topNodesTransposed[i] = (this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).filter((d, dI) => dI < visibleLeftCount).map(d => {
            return {
              name: d.qFallbackTitle
            }
          })).concat(topNodesTransposed[i])
        } 
        else {
          topNodesTransposed[i] = additionalTopCells.concat(topNodesTransposed[i])
        }
      }
    }
    visibleColCount = topNodesTransposed[topNodesTransposed.length - 1]
    output = topNodesTransposed.concat(output)
    // This function is used to convert the qLeft structure from a parent/child hierarchy
    // into a 2 dimensions array    
    function expandLeft (input, level, index, parent, chain) {
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Left'
      o.value = o.qText
      input.value = input.qText
      visibleLeftCount = Math.max(visibleLeftCount, level + 1)
      o.childCount = o.qSubNodes.length      
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes  
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = 'Totals??'
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
        }
      }
      o.rowspan = Math.max(1, input.qSubNodes.length)
      input.rowspan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {        
        leftNodes.push(tempNode.concat([o])) 
        tempNode = []
      } 
      else {
        tempNode.push(o)                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandLeft.call(this, input.qSubNodes[i], level + 1, i, input, [...chain, o])
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].rowspan
        }
        input.rowspan = s
        o.rowspan = s
      }                
    }
    // This function is used to convert the qTop structure from a parent/child hierarchy
    // into a 2 dimensions array
    function expandTop (input, level, index, parent) {
      if (typeof topNodesTransposed[level] === 'undefined') {
        topNodesTransposed[level] = []
      }
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Top'
      o.rowIndex = topCounter
      o.topNode = true
      o.isHeader = true
      o.name = o.qText
      if (!o.font) {
        o.font = {}
      }
      input.value = input.qText
      if (o.qType === 'P') {
        o.qElemNo = -99
      }
      o.childCount = o.qSubNodes.length
      visibleTopCount = Math.max(visibleTopCount, level + 1)      
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
          o.name = this.layout.tableTotalsLabel
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
          input.qType = 'T'
        }
      }      
      o.colSpan = Math.max(1, input.qSubNodes.length)
      input.colSpan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {                  
        if (o.qElemNo === -99 && o.qCanCollapse === true) {
          accCellSpan++
        }
      } 
      else {                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandTop.call(this, input.qSubNodes[i], level + 1, i, input)
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].colSpan
        }
        o.rowIndex = topCounter
        topCounter += s
        o.colSpan = s
        input.colSpan = s
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
            accCellSpan += o.colSpan
          }
        }
      }
      let toPush = [o]
      if (o.colSpan > 1) {
        toPush = new Array(o.colSpan).fill({ ...o })
      }
      topNodesTransposed[level].push(...toPush)   
    }
    return output
  }
}
