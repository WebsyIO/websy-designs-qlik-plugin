/* global
  include
  WebsyDesigns
  Chart
  Table
  GeoMap
  Dropdown
  DatePicker
  KPI
  ObjectManager
*/ 

/* global WebsyDesigns createIdentity d3 */ 
class Chart {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.optionDefaults = {
      data: {
        left: { min: 0, max: 0 },
        right: { min: 0, max: 0 },
        bottom: { min: 0, max: 0 },
        top: { min: 0, max: 0 },
        series: []
      }      
    }
    this.chart = new WebsyDesigns.WebsyChart(elementId)
    window.addEventListener('resize', () => this.chart.render())
    this.monthMap = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    }
    this.render()
  }
  addOptions (input, options) {
    for (const key in options) {
      input[key] = options[key]
    }
  }
  close () {
    this.chart.close()
  }
  createSeriesKey (title) {
    return title.replace(/ /g, '_')
  }
  formatValue (d, options = {}) {
    console.log('formatting', d, options)
    let decimals = 0
    let isPercentage = false    
    if (options.decimals) {
      decimals = options.decimals
    }
    if (options.showAsPercentage === true) {
      isPercentage = options.showAsPercentage
    }
    if ((options || {}).scale === 'Time' && d.getDate) {
      d = `${d.getDate()} ${this.monthMap[d.getMonth()]} ${d.getFullYear()}`
    }    
    else if (!isNaN(d)) {      
      // if (d.toReduced(decimals, isPercentage, true) % 1 === 0) {
      //   decimals = 0
      // }
      d = WebsyDesigns.Utils.toReduced(d, decimals, isPercentage, false, options.max)
      if (options.showAsCurrency === true) {
        d = d.toCurrency()
      }
    }    
    return d
  }
  fromQlikDate (d) {    
    let output = new Date(Math.round((d - 25569) * 86400000))    
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000)
    return output
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      console.log(this.layout)
      let options = {}
      if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {
        // options = this.transformBasic()
        options = this.transformMultiMeasure()
      }
      else if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length > 1) {
        options = this.transformMultiMeasure()
      }
      else if (layout.qHyperCube.qDimensionInfo.length > 1) {
        options = this.transformMultiDimensions()
      }
      else if (layout.qHyperCube.qDimensionInfo.length === 0 && layout.qHyperCube.qMeasureInfo.length > 0) {
        options = this.transformNoDimensions()
      }
      this.chart.render(options)
    })
  }
  resize () {
    this.chart.render()
  }
  transformBasic () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)    
    this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    // options.data.left = Object.assign({}, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin 
    options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[0].options || {})
    // options.data.bottom = Object.assign({}, this.layout.qHyperCube.qDimensionInfo[0].options || {})
    options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
    options.data.bottom.data = []    
    options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    options.data.left.formatter = d => {          
      return this.formatValue(d, (this.layout.qHyperCube.qMeasureInfo[0].options || {}))
    }
    let series = this.layout.qHyperCube.qMeasureInfo[0].options || {}
    series.data = []
    series.key = this.createSeriesKey(this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle)
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      r[0].value = r[0].qText
      r[1].value = isNaN(r[1].qNum) ? 0 : r[1].qNum
      r[1].tooltipValue = r[1].qText
      options.data.bottom.data.push(r[0])
      series.data.push({
        x: r[0],
        y: r[1]
      })
    })    
    options.data.series = [series]
    return options
  }
  transformMultiDimensions () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    // options.data.left = Object.assign({}, options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin 
    options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})
    // options.data.bottom = Object.assign({}, options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})
    options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[1].qFallbackTitle
    options.data.bottom.data = []    
    options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    options.data.left.formatter = d => {          
      return this.formatValue(d, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    }
    const series = []
    const seriesKeys = []
    const bottomKeys = []
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      let seriesIndex = seriesKeys.indexOf(r[0].qText)
      let bottomIndex = bottomKeys.indexOf(r[1].qText)
      if (bottomIndex === -1) {
        bottomKeys.push(r[1].qText)
        r[1].value = r[1].qText
        options.data.bottom.data.push(r[1])
      }
      if (seriesIndex === -1) {
        seriesKeys.push(r[0].qText)
        seriesIndex = seriesKeys.length - 1
        series.push({
          key: `series_${seriesIndex}`,
          type: options.type || 'bar',   
          label: r[0].qText,
          // color: this.layout.options.color,
          data: []
        })
      }
      let c = r[2]
      c.value = isNaN(c.qNum) ? 0 : c.qNum
      c.tooltipLabel = r[0].qText
      c.tooltipValue = c.qText
      series[seriesIndex].data.push({
        x: { value: r[1].qText },
        y: c
      })      
    })
    options.data.series = series
    console.log(options)
    return options   
  }
  transformNoDimensions () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    let xAxis = 'bottom'
    let yAxis = 'left'
    let xScale = 'Band'
    let yScale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      yAxis = 'bottom'
      xScale = 'Linear'
      yScale = 'Band'
    }
    options.data[xAxis].scale = xScale
    options.data[yAxis].scale = yScale    
    options.data[xAxis].padding = options.padding || 0
    options.data[xAxis].data = []
    if (options.xTitle) {
      options.data[xAxis].title = options.xTitle
      options.data[xAxis].showTitle = true
      options.data[xAxis].titlePosition = 1
    }    
    options.data[yAxis].formatter = d => {          
      return this.formatValue(d, options || {})
    }
    this.layout.qHyperCube.qMeasureInfo.forEach(m => {
      options.data[xAxis].data.push({value: m.qFallbackTitle})
      options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)      
      options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)            
    })    
    if (options.yMinOverride) {
      options.data[yAxis].min = options.yMinOverride
    }
    if (options.yMaxOverride) {
      options.data[yAxis].max = options.yMaxOverride
    }
    if (this.layout.qHyperCube.qDataPages[0]) {
      options.data.series = [{
        key: this.layout.qInfo.qId,
        type: options.type || 'bar',   
        color: options.color,
        data: this.layout.qHyperCube.qDataPages[0].qMatrix.map(r => r.map((c, i) => {
          c.value = isNaN(c.qNum) ? 0 : c.qNum
          if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
            c.label = c.qAttrExps.qValues[0].qText
          }
          return {
            x: { value: this.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle },
            y: c
          }
        }))[0]
      }] 
    } 
    return options   
  }
  transformMultiMeasure () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    let xAxis = 'bottom'
    let x2Axis = 'bottom'
    let yAxis = 'left'
    let y2Axis = 'right'
    let xScale = 'Band'
    let x2Scale = 'Band'
    let yScale = 'Linear'
    let y2Scale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      x2Axis = 'right'
      yAxis = 'bottom'
      y2Axis = 'top'     
    }
    options.data[yAxis].min = 0
    options.data[yAxis].max = 0
    options.data[y2Axis].min = 0
    options.data[y2Axis].max = 0
    options.data.series = this.layout.qHyperCube.qMeasureInfo.map((m, i) => {
      let series = Object.assign({}, m.options)
      series.key = this.createSeriesKey(m.qFallbackTitle)
      series.data = []
      series.type = (m.options || {}).type || options.type || 'bar'      
      series.accumulative = 0
      if (m.axis === 'secondary') { // right hand axis
        this.addOptions(options.data[y2Axis], m.options || {})
        // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        
        if (options.grouping !== 'stacked') {          
          options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin)
          options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax)
        }        
        options.data[y2Axis].scale = (m.options || {}).scale || y2Scale
        options.data[y2Axis].title = m.qFallbackTitle
        options.data[y2Axis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[y2Axis]))
        }
      }
      else {
        this.addOptions(options.data[yAxis], m.options || {})
        // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)
        if (options.grouping !== 'stacked') {
          options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)
          options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)
        }
        console.log('max', options.data[yAxis].max)
        options.data[yAxis].scale = (m.options || {}).scale || yScale
        options.data[yAxis].title = m.qFallbackTitle
        options.data[yAxis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[yAxis]))
        }
      }
      return series
    })        
    this.addOptions(options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options || {})
    // options.data[xAxis] = Object.assign({}, options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options)
    if (options.data[xAxis].ticks && options.data[xAxis].ticks.indexOf('d3.time') !== -1) {
      let t = options.data[xAxis].ticks.split('.').pop()
      options.data[xAxis] = d3.time[t]
    }
    options.data[xAxis].title = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle    
    options.data[xAxis].data = []
    options.data[xAxis].min = this.layout.qHyperCube.qDimensionInfo[0].qMin
    options.data[xAxis].max = this.layout.qHyperCube.qDimensionInfo[0].qMax
    options.data[xAxis].scale = (this.layout.qHyperCube.qDimensionInfo[0].options || {}).scale || xScale
    if (options.data[xAxis].scale !== 'Time') {
      options.data[xAxis].formatter = d => {          
        return this.formatValue(d, this.layout.qHyperCube.qDimensionInfo[0].options || {})
      } 
    } 
    else {
      options.data[xAxis].min = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMin)
      options.data[xAxis].max = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMax)
    }   
    const xKeys = []
    const xTotals = []
    const xAcc = []
    this.layout.qHyperCube.qDataPages[0].qMatrix.map(r => {  
      r.forEach((c, cIndex) => {
        if (cIndex === 0) {
          if (options.data[xAxis].scale !== 'Time') {
            options.data[xAxis].min = options.data[xAxis].min.length < c.qText.length ? options.data[xAxis].min : c.qText
            options.data[xAxis].max = options.data[xAxis].max.length > c.qText.length ? options.data[xAxis].max : c.qText
          }
          return
        }        
        let x = r[0]
        x.value = x.qText        
        if ((this.layout.qHyperCube.qDimensionInfo[0].options || {}).scale === 'Time') {
          x.value = this.fromQlikDate(x.qNum)
        }
        // else {
        //   if (xKeys.indexOf(x.value) === -1) {
        //     xKeys.push(x.value)
        //     options.data[xAxis].data.push(x)  
        //   }
        // }
        if (xKeys.indexOf(x.qElemNumber) === -1) {
          xKeys.push(x.qElemNumber)
          xAcc.push(0)
          xTotals.push(0)
          options.data[xAxis].data.push(x)  
        }
        c.value = isNaN(c.qNum) ? 0 : c.qNum            
        xTotals[xKeys.indexOf(x.qElemNumber)] += c.value
        c.tooltipLabel = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle   
        c.tooltipValue = c.qText        
        // if (this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options) {
        // c.color = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options.color 
        // }        
        c.index = cIndex        
        c.accumulative = xAcc[xKeys.indexOf(x.qElemNumber)]
        xAcc[xKeys.indexOf(x.qElemNumber)] += c.value
        // console.log('accu is', options.data.series[cIndex - 1].key, options.data.series[cIndex - 1].accumulative)
        // options.data.series[cIndex - 1].accumulative += c.value
        x.index = xKeys.indexOf(x.value)
        options.data.series[cIndex - 1].data.push({
          x,
          y: c
        })
      })
    })
    if (options.grouping === 'stacked') {
      options.data[yAxis].min = 0 // may need to revisit this to think about negative numbers
      options.data[yAxis].max = Math.max(...xTotals)
      options.data[y2Axis].min = 0 // may need to revisit this to think about negative numbers
      options.data[y2Axis].max = Math.max(...xTotals)
    }
    console.log('options', options, xTotals)  
    return options
  }
}

/*
  global
  WebsyDesigns
  objectManager
*/
class DatePicker {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.picker = new WebsyDesigns.WebsyDatePicker(elementId, {
      onChange: this.onChange.bind(this)
    })
    this.listening = true
    this.render()
  }
  floorDate (d) {
    if (typeof d === 'number') {
      d = new Date(d)
    }
    return new Date(d.setHours(0, 0, 0, 0))
  }
  fromQlikDate (d) {    
    let output = new Date(Math.round((d - 25569) * 86400000))    
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000)
    return this.floorDate(output)
  }
  getField (f) {
    return new Promise((resolve, reject) => {
      if (this.field) {
        resolve(this.field)
      }
      else {
        objectManager.app.getField(f).then(field => {
          if (field) {
            this.field = field
            resolve(this.field)
          }
        }, reject)
      }
    })
  }
  toQlikDate (d) {
    let day = d.getDate()
    if (day.toString().length === 1) {
      day = `0${day}`
    }
    let month = d.getMonth() + 1
    if (month.toString().length === 1) {
      month = `0${month}`
    }
    let year = d.getFullYear()
    // return `${day}/${month}/${year}`
    return `${year}-${month}-${day}`
  }
  toQlikDateNum (d) {
    return Math.floor((d.getTime() / 86400000 + 25569))
  }
  onChange (data) {
    let start = this.toQlikDate(data[0])
    let end
    if (data[1] && (data[0].getTime() !== data[1].getTime())) {
      end = this.toQlikDate(data[1])
    }
    let query = `${start}`
    if (end) {
      query = `>=${start}<=${end}`
    }
    this.getField('Date').then(field => {
      // set listening to false to stop Qlik from updating the state of the datepicker
      this.listening = false
      field.select(query)
    })    
  }
  render () {
    this.options.model.getLayout().then(layout => {
      let disabledDates = []
      let min
      let max
      let selectedMin
      let selectedMax
      let selectedRange = []
      if (layout.qListObject.qDataPages[0] && this.listening === true) {
        // ensure we have a complete calendar
        const completeDateList = {}
        let oneDay = (1000 * 60 * 60 * 24)
        let start = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[0][0].qNum).getTime()
        let end = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum).getTime()
        let diff = (end - start) / oneDay        
        for (let i = 0; i < diff + 1; i++) {
          let temp = new Date(start + (i * oneDay))
          temp.setHours(0, 0, 0)      
          completeDateList[temp.getTime()] = {
            qNum: this.toQlikDateNum(temp),
            qState: 'Z'
          }
        }
        layout.qListObject.qDataPages[0].qMatrix.forEach((r, i, arr) => {
          if (completeDateList[this.fromQlikDate(r[0].qNum).getTime()]) {
            completeDateList[this.fromQlikDate(r[0].qNum).getTime()] = r[0]
          }
          if (i === 0) {
            min = this.fromQlikDate(r[0].qNum)
          }
          else if (i === arr.length - 1) {
            max = this.fromQlikDate(r[0].qNum)
          }          
        })
        const completeDateListArr = Object.values(completeDateList)
        completeDateListArr.forEach(d => {
          if (d.qState === 'S') {
            selectedRange.push(this.fromQlikDate(d.qNum))
          }
          // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {
          if (['Z'].indexOf(d.qState) !== -1) {
            disabledDates.push(this.fromQlikDate(d.qNum))
          }
        })
        this.picker.setDateBounds([min, max])
        if (selectedRange.length > 0) {
          this.picker.selectCustomRange([selectedRange[0], selectedRange[selectedRange.length - 1] || selectedRange[0]])
        }
        this.picker.render(disabledDates)
        this.listening = true
      }
    })
  }
}

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

/* global WebsyDesigns */ 
class KPI {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.kpiOptions = {}
    this.kpi = new WebsyDesigns.WebsyKPI(elementId, this.kpiOptions)
    this.render()
  }
  close () {
    this.kpiOptions.value = { value: '-' }
    this.kpiOptions.subValue = { value: '' }
    this.kpi.render(this.kpiOptions)
  }
  render () {
    this.options.model.getLayout().then(layout => {
      let decimals = 2
      let v = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][0].qText
      this.kpiOptions.value = {
        value: v
      }        
      this.kpiOptions.label = {
        value: layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle
      }
      if (layout.icon) {
        this.kpiOptions.icon = `${window.location.origin}/resources/svg/${layout.icon}.svg`
      }
      if (layout.tooltip && layout.tooltip.value) {
        this.kpiOptions.tooltip = {
          value: layout.tooltip.value
        }
        if (layout.tooltip.classes) {
          this.kpiOptions.tooltip.classes = layout.tooltip.classes
        }
      } 
      this.kpiOptions.subValue = {
        value: ''
      }     
      if (layout.kpi.qHyperCube.qMeasureInfo[1]) {
        let decimals = 2
        if (typeof layout.kpi.qHyperCube.qMeasureInfo[1].decimals !== 'undefined') {
          decimals = layout.kpi.qHyperCube.qMeasureInfo[1].decimals
        }
        let v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText
        this.kpiOptions.subValue = {
          value: `${layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle} ${v1}`
        }        
      }      
      this.kpi.render(this.kpiOptions)
    })    
  }
  resize () {
    this.kpi.resize()
  }
}

/* global WebsyDesigns coreService */ 
class GeoMap {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      geoFillColor: '#783c96',
      geoAutoFill: true,
      geoShowTooltip: true
    }
    this.options = Object.assign({}, DEFAULTS, options, options.def.options)    
    if (this.options.geoJSON && typeof this.options.geoJSON === 'string') {
      WebsyDesigns.service.get(this.options.geoJSON).then(geoJSON => {
        this.geoJSON = geoJSON        
        delete this.options.geoJSON
        this.map = new WebsyDesigns.WebsyMap(elementId, this.options)
        this.render()
      })      
    }   
    else {
      this.map = new WebsyDesigns.WebsyMap(elementId, this.options)
      this.render()
    }    
  }
  findGeoJsonByProperty (province) {
    for (let i = 0; i < this.geoJSON.features.length; i++) {
      if (this.geoJSON.features[i].properties.name.toLowerCase() === province.toLowerCase()) {
        return this.geoJSON.features[i]
      }
    }
    return null
  }
  render () {   
    const el = document.getElementById(this.elementId)     
    if (el.parentElement) {
      el.parentElement.classList.add('loading')
    } 
    this.options.model.getLayout().then(layout => {
      if (layout.options) {
        this.options = Object.assign({}, layout.options)
        this.map.options = Object.assign({}, this.map.options, layout.options)
      }
      if (layout.qHyperCube.qDataPages[0]) {
        if (this.geoJSON) {
          let geoJSON = {
            type: 'FeatureCollection',
            features: []
          }
          layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {          
            let p = this.findGeoJsonByProperty(r[0].qText)          
            if (p) {       
              if (this.options.geoAutoFill === true) {
                p.fillColor = this.options.geoFillColor
                p.fillOpacity = 0.4 + ((r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax) * 0.6)
              }
              if (r[1].qAttrExps && r[1].qAttrExps.qValues && r[1].qAttrExps.qValues[0] && r[1].qAttrExps.qValues[0].qText) {
                p.fillColor = r[1].qAttrExps.qValues[0].qText
              }                     
              if (this.options.geoShowTooltip === true) {
                p.tooltip = `${r[1].qText}<br>${p.properties.label}`
                p.tooltipClass = 'websy-map-tooltip' 
              }              
              geoJSON.features.push(p)
            }            
          })
          this.map.options.geoJSON = geoJSON          
        }
        const data = {}
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
          r.forEach((c, cIndex) => {
            if (cIndex === 0) {
              return
            }
            if ((layout.qHyperCube.qMeasureInfo[cIndex - 1].options || {}).type === 'polygon') {
              if (!data.polygons) {
                data.polygons = []
              }
              let latLng = JSON.parse(`[${c.qText}]`)
              data.polygons.push({
                label: r[0].qText,
                data: latLng.map(l => l.map(l2 => ({ Latitude: l2[1], Longitude: l2[0] })))
              })
            }
            else {
              // add a marker
            }
          })
        })        
        this.map.options.data = data        
        if (el.parentElement) {
          el.parentElement.classList.remove('loading')
        }
        this.map.render()
      }
    })
  }
}

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


if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Chart,
    Table,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
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
      initialActions: [],
      visualisationPlugins: [
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
    }
    this.app = null
    this.paused = false
    this.supportedChartTypes = []
    this.activeViews = []
    this.chartLibrary = {}
    this.globalObjectsLoaded = false    
    this.options = this.mergeObjects({}, defaults, options)            
    // this.options = Object.assign({}, defaults, options)            
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
    let deep = false
    let i = 0

    // Check if a deep merge
    if (typeof arguments[0] === 'boolean') {
      deep = arguments[0]
      i++
    }

    // Merge the object into the extended object
    let merge = function (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            // If we're doing a deep merge and the property is an object
            extended[prop] = this.mergeObjects(true, extended[prop], obj[prop])
          } 
          else {
            // Otherwise, do a regular merge
            if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
              extended[prop] = extended[prop].concat(obj[prop])
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
      let config = {
        schema: this.options.enigmaSchema,
        url
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
      this.app[method](params).then(model => {
        objectConfig.objectId = model.id
        objectConfig.attached = true
        if (this.supportedChartTypes.indexOf(objectConfig.definition.qInfo.qType) !== -1) {
          let options = Object.assign({}, objectConfig.options, {
            model, 
            def: objectConfig.definition,
            app: this.app
          })
          objectConfig.vis = new this.chartLibrary[objectConfig.definition.qInfo.qType](`${objectConfig.elementId}_vis`, options)
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
  select (index, selections, callbackFn) {
    if (index === selections.length) {
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
            f.selectValues(values).then(() => {
              index++
              this.select(index, selections, callbackFn)
            })
          },
          err => {
            console.log('field for selection not found', err)
            index++
            this.select(index, selections, callbackFn)
          }
        )
    }
  }
  selectFromUrl (callbackFn) {
    if (this.options.applySelections === true && location.search !== '') {
      let selections = location.search.replace('?', '').split('&')
      selections = selections
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
        .filter(s => s.param === 'select' || s.param === 'setvariable')
      this.select(0, selections, callbackFn)
    }
    else {
      callbackFn()
    }
  }
}

  WebsyDesigns.QlikObjectManager = ObjectManager
}
