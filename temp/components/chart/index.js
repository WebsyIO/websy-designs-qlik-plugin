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
