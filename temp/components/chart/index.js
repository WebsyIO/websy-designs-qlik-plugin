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
  checkForData () {
    return new Promise((resolve, reject) => {
      let location = 'qDataPages'
      let method = 'getHyperCubeData'
      let dataProp = 'qMatrix'
      if (this.layout.qHyperCube.qMode === 'K') {
        location = 'qStackedDataPages'
        method = 'getHyperCubeStackData'
        dataProp = 'qData'
      }
      if (this.layout.qHyperCube[location][0] && this.layout.qHyperCube[location][0][dataProp]) {
        if (this.layout.qHyperCube.qMode === 'K') {
          this.layout.qHyperCube.qDataPages = [{ qMatrix: this.transformDataToMatrix(this.layout.qHyperCube[location][0][dataProp][0].qSubNodes) }]
        }
        resolve()
      }
      else {
        this.options.model[method]('/qHyperCubeDef', [{
          qTop: 0,
          qLeft: 0,
          qWidth: this.layout.qHyperCube.qSize.qcx,
          qHeight: Math.floor(10000 / this.layout.qHyperCube.qSize.qcx)
        }]).then(pages => {
          this.layout.qHyperCube[location] = pages    
          if (this.layout.qHyperCube.qMode === 'K') {
            this.layout.qHyperCube.qDataPages = [{ qMatrix: this.transformDataToMatrix(pages[0].qData[0].qSubNodes) }]
          }
          resolve()
        })
      }
    })
  }
  close () {
    this.chart.close()
  }
  createSeriesKey (title) {
    const rgx = new RegExp('[^a-zA-Z0-9 -]', 'g')
    return title.replace(rgx, '_').replace(/ /g, '_')
  }
  formatValue (d, options = {}, qlikSettings = {}) {
    let decimals = 0
    let isPercentage = false
    if (typeof options.max === 'undefined' && qlikSettings.qMax) {
      options.max = qlikSettings.qMax
    }                   
    if (options.decimals) {
      decimals = options.decimals
    }
    else if (qlikSettings.qNumFormat && qlikSettings.qNumFormat.qnDec) {
      decimals = qlikSettings.qNumFormat.qnDec
    }
    if (options.showAsPercentage === true) {
      isPercentage = options.showAsPercentage
    }
    else if (qlikSettings.qNumFormat && qlikSettings.qNumFormat.qFmt) {
      isPercentage = qlikSettings.qNumFormat.qFmt.indexOf('%') !== -1
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
  getColor (cell, dimCell, dimension, measure, colorProps) {
    let colors = (this.layout.options || {}).colors || this.chart.options.colors
    if (colorProps) {
      if (!colorProps.auto) {
        if (colorProps.mode === 'byDimension') {
          if (dimension.qAttrDimInfo && dimension.qAttrDimInfo[0] && dimension.qAttrDimInfo[0].id === 'colorByAlternative') {
            if (this.options.legendKeys.indexOf(dimCell.qAttrDims.qValues[0].qText) === -1) {
              this.options.legendKeys.push(dimCell.qAttrDims.qValues[0].qText)
              this.options.legendData.push({
                value: dimCell.qAttrDims.qValues[0].qText,
                color: colors[dimCell.qAttrDims.qValues[0].qElemNo % colors.length]
              })
            }            
            return colors[dimCell.qAttrDims.qValues[0].qElemNo % colors.length]
          }
          else if (measure.qAttrDimInfo && measure.qAttrDimInfo[0] && measure.qAttrDimInfo[0].id === 'colorByAlternative') {
            if (this.options.legendKeys.indexOf(cell.qAttrDims.qValues[0].qText) === -1) {
              this.options.legendKeys.push(cell.qAttrDims.qValues[0].qText)
              this.options.legendData.push({
                value: cell.qAttrDims.qValues[0].qText,
                color: colors[cell.qAttrDims.qValues[0].qElemNo % colors.length]
              })
            }            
            return colors[cell.qAttrDims.qValues[0].qElemNo % colors.length]
          }
          else {
            return colors[dimCell.qElemNumber % colors.length]
          }          
        }        
        else if (measure.qAttrExprInfo && measure.qAttrExprInfo[0] && measure.qAttrExprInfo[0].id === 'colorByExpression') {
          if (cell.qAttrExps && cell.qAttrExps.qValues && cell.qAttrExps.qValues[0] && cell.qAttrExps.qValues[0].qText) {
            return cell.qAttrExps.qValues[0].qText
          }
        }
        else if (measure.qAttrExprInfo && measure.qAttrExprInfo[0] && measure.qAttrExprInfo[0].id === 'colorByAlternative') {
          if (this.options.legendKeys.indexOf(cell.qAttrExps.qValues[0].qText) === -1) {
            this.options.legendKeys.push(cell.qAttrExps.qValues[0].qText)
            this.options.legendData.push({
              value: cell.qAttrExps.qValues[0].qText,
              color: colors[cell.qAttrExps.qValues[0].qNum % colors.length]
            })
          }
          if (cell.qAttrExps && cell.qAttrExps.qValues && cell.qAttrExps.qValues[0] && !isNaN(cell.qAttrExps.qValues[0].qNum)) {
            return colors[cell.qAttrExps.qValues[0].qNum % colors.length]
          }
        }
      }       
    }    
  }
  render () {
    this.options.legendData = []
    this.options.legendKeys = []
    this.options.model.getLayout().then(layout => {
      this.layout = layout

      this.chart.brushBarsInitialized = {}
      this.chart.brushLinesInitialized = {}
      this.chart.brushInitialized = false
      this.chart.brushedDomain = []
      if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
        this.chart.hideLoading()
        this.chart.showError({message: this.options.customError || layout.qHyperCube.qCalcCondMsg})
        return
      }
      if (layout.qHyperCube.qSize.qcy === 0 || layout.qHyperCube.qSize.qcx === 0) {
        this.chart.showError({message: 'No data to display'})
        return
      }
      else {
        this.chart.hideError()
      }
      console.log('layout', layout)
      this.checkForData().then(() => {
        let options = {}
        if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {        
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
        if (this.options.legendData.length > 0) {
          options.legendData = this.options.legendData
        }    
        if (layout.refLine && layout.refLine.refLines && layout.refLine.refLines.length > 0) {
          options.refLines = layout.refLine.refLines.filter(r => r.show !== false).map(r => ({
            value: r.refLineExpr.value,
            displayValue: r.refLineExpr.label,
            label: r.showLabel ? r.label : '',
            color: (r.paletteColor || { color: '#000000' }).color || '#000000',
            lineWidth: (r.style || { lineThickness: 1 }).lineThickness || 1,
            lineStyle: (r.style || { lineType: '' }).lineType || ''
          }))
        }
        layout.qHyperCube.qMeasureInfo.forEach(m => {
          if (m.qTrendLines && m.qTrendLines.length > 0) {
            // currently only support straight lines
            if (!options.refLines) {
              options.refLines = []
            }
            m.qTrendLines.forEach(t => {
              options.refLines.push({
                value: t.qCoeff[0],
                displayValue: t.label,
                label: t.label,
                color: (t.style.paletteColor || { color: '#000000' }).color || '#000000',
                lineWidth: 1,
                lineStyle: t.style.lineDash.replace(',', '')
              })
            })
          }
        })
        this.chart.render(options)
      })      
    })
  }
  resize () {
    this.chart.render()
  }
  transformBasic () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options, this.options.chartOptions)    
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
      return this.formatValue(d, (this.layout.qHyperCube.qMeasureInfo[0].options || {}), this.layout.qHyperCube.qMeasureInfo[0])
    }
    let series = this.layout.qHyperCube.qMeasureInfo[0].options || {}
    series.data = []
    series.key = this.createSeriesKey(this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle)
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      r[0].value = r[0].qText || '-'
      r[1].value = isNaN(r[1].qNum) ? 0 : r[1].qNum
      r[1].tooltipValue = r[1].qText
      r[1].label = r[1].qText || '-'
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
    const options = Object.assign({}, this.optionDefaults, this.layout.options, this.options.chartOptions)
    let xAxis = 'bottom'
    let yAxis = 'left'
    let xScale = 'Ordinal'
    let yScale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      yAxis = 'bottom'
      // xScale = 'Linear'
      // yScale = 'Band'
    }    
    this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    // options.data.left = Object.assign({}, options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    options.data[xAxis].scale = xScale
    options.data[yAxis].scale = yScale    
    options.data[yAxis].label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    this.addOptions(options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[1].options || {})
    // options.data.bottom = Object.assign({}, options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})
    options.data[xAxis].label = this.layout.qHyperCube.qDimensionInfo[1].qFallbackTitle
    options.data[xAxis].data = []    
    options.data[yAxis].title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    options.data[yAxis].formatter = d => {         
      return this.formatValue(d, this.layout.qHyperCube.qMeasureInfo[0].options || {}, this.layout.qHyperCube.qMeasureInfo[0])
    }
    const series = []
    const seriesKeys = []
    const bottomKeys = []
    const bottomAcc = []
    const bottomTotals = []
    const groupCounts = {}
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      let seriesIndex = seriesKeys.indexOf(r[0].qText || '-')
      let bottomIndex = bottomKeys.indexOf(r[1].qText || '-')
      let v = r[1].qText || '-'
      if ((this.layout.qHyperCube.qDimensionInfo[1].options || {}).scale === 'Time') {
        v = this.fromQlikDate(r[1].qNum)
      }
      if (bottomIndex === -1) {        
        bottomKeys.push(v)
        bottomAcc.push(0)
        bottomTotals.push(0)
        r[1].value = v
        r[1].valueCount = 0
        groupCounts[v] = r[1]
        options.data[xAxis].data.push(r[1])
        bottomIndex = bottomKeys.length - 1
      }
      groupCounts[v].valueCount++
      if (seriesIndex === -1) {
        seriesKeys.push(r[0].qText || '-')
        seriesIndex = seriesKeys.length - 1
        series.push(Object.assign({}, this.layout.qHyperCube.qMeasureInfo[0].options, {
          key: `series_${seriesIndex}`,
          type: (this.layout.qHyperCube.qMeasureInfo[0].options || {}).type || options.type || 'bar',
          accumulative: 0,   
          label: r[0].qText || '-',
          // color: this.layout.options.color,
          data: []
        }))
      }
      let c = r[2]
      // c.value = isNaN(c.qNum) ? 0 : c.qNum
      c.value = c.qNum
      c.label = c.qText || '-'
      if (this.layout.qHyperCube.qMeasureInfo[0].qAttrExprInfo && this.layout.qHyperCube.qMeasureInfo[0].qAttrExprInfo[0] && this.layout.qHyperCube.qMeasureInfo[0].qAttrExprInfo[0].id === 'customLabel') {
        if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
          if (this.layout.qHyperCube.qMeasureInfo[0].qAttrExprInfo[0].addTo === true) {
            c.label += c.qAttrExps.qValues[0].qText
          }
          else {
            c.label = c.qAttrExps.qValues[0].qText
          }          
        } 
      }      
      c.color = this.getColor(c, r[1], this.layout.qHyperCube.qDimensionInfo[1], this.layout.qHyperCube.qMeasureInfo[0], this.layout.qHyperCube.color)
      if (!c.color) {
        let colors = (this.layout.options || {}).colors || this.chart.options.colors
        if (this.options.legendKeys.indexOf(r[0].qText) === -1) {
          this.options.legendKeys.push(r[0].qText)
          this.options.legendData.push({
            value: r[0].qText,
            color: colors[r[0].qElemNumber % colors.length]
          })
        }
        c.color = colors[r[0].qElemNumber % colors.length]
      }
      c.tooltipLabel = r[0].qText
      c.tooltipValue = c.qText || '-'
      c.accumulative = bottomAcc[bottomIndex]
      if (c.value !== 'NaN') {
        bottomTotals[bottomIndex] += c.value
        bottomAcc[bottomIndex] += c.value
      }      
      !isNaN(c.value) && series[seriesIndex].data.push({
        x: { value: v },
        y: c
      })      
    })
    options.data.series = series
    options.data[yAxis].min = this.layout.qHyperCube.qMeasureInfo[0].qMin 
    // options.data[yAxis].max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    if (this.options.grouping === 'stacked' || (this.options.def.options.grouping && this.options.def.options.grouping === 'stacked')) {
      options.data[yAxis].max = Math.max(...bottomTotals)
    }    
    else {
      options.data[yAxis].max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    }
    // options.data[xAxis].min = options.data[xAxis].data[0].value
    // options.data[xAxis].max = options.data[xAxis].data[options.data[xAxis].data.length - 1].value
    return options   
  }
  transformNoDimensions () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options, this.options.chartOptions)
    let xAxis = 'bottom'
    let yAxis = 'left'
    let xScale = 'Ordinal'
    let yScale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      yAxis = 'bottom'
      // xScale = 'Linear'
      // yScale = 'Band'
    }
    options.data[xAxis].scale = xScale
    options.data[yAxis].scale = yScale    
    options.data[xAxis].padding = options.padding || 0
    options.data[xAxis].data = []
    options.data[yAxis].min = 0
    options.data[yAxis].max = 0
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
      if (m.qMin !== 'NaN') {
        options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)      
      }      
      if (m.qMax !== 'NaN') {
        options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)            
      }
    })    
    if (typeof options.yMinOverride !== 'undefined') {
      options.data[yAxis].min = options.yMinOverride
    }
    if (typeof options.yMaxOverride !== 'undefined') {
      options.data[yAxis].max = options.yMaxOverride
    }
    if (this.layout.qHyperCube.qDataPages[0]) {
      options.data.series = [{
        key: this.layout.qInfo.qId,
        type: options.type || 'bar',   
        color: options.color,
        data: this.layout.qHyperCube.qDataPages[0].qMatrix.map(r => r.map((c, i) => {
          c.value = isNaN(c.qNum) ? 0 : c.qNum
          c.index = i
          c.label = c.qText || ''
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
    const options = Object.assign({}, this.optionDefaults, this.layout.options, this.options.chartOptions)
    let seriesTypes = this.layout.qHyperCube.qMeasureInfo.map(d => {
      if (d.options && d.options.type) {
        return d.options.type
      }
      if (d.series && d.series.type) {
        return d.series.type
      }
      return 'bar'
    })
    const isCombo = seriesTypes.indexOf('bar') !== -1 && seriesTypes.indexOf('line') !== -1
    if (isCombo) {
      options.grouping = 'stacked' 
    }    
    let xAxis = 'bottom'
    let x2Axis = 'bottom'
    let yAxis = 'left'
    let y2Axis = 'right'
    let xScale = 'Ordinal'
    let x2Scale = 'Ordinal'
    let yScale = 'Linear'
    let y2Scale = 'Linear'
    let hasyAxis = false
    let hasy2Axis = false
    let primaryCount = 0
    let secondaryCount = 0
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
    options.data[xAxis].padding = options.padding || 0
    let colors = (this.layout.options || {}).colors || this.chart.options.colors
    options.data.series = this.layout.qHyperCube.qMeasureInfo.map((m, i) => {
      let series = Object.assign({}, m.options)
      series.key = this.createSeriesKey(m.qFallbackTitle)
      series.data = []
      // series.type = (m.options || {}).type || options.type || 'bar'      
      series.type = seriesTypes[i]
      series.accumulative = 0
      series.color = colors[i % colors.length]   
      if (typeof series.showSymbols === 'undefined') {
        series.showSymbols = m.series.markerFill
      }
      if (m.series && m.series.axis) {
        m.axis = m.series.axis === 0 ? 'primary' : 'secondary'
      }   
      if (this.options.legendKeys.indexOf(m.qFallbackTitle) === -1) {
        this.options.legendKeys.push(m.qFallbackTitle)
        this.options.legendData.push({
          value: m.qFallbackTitle,
          color: colors[i % colors.length]
        })
      }
      if (m.axis === 'secondary') { // right hand axis
        hasy2Axis = true
        series.axis = 'secondary'
        secondaryCount++
        this.addOptions(options.data[y2Axis], m.options || {})
        // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        
        if (options.grouping !== 'stacked' || isCombo === true) {          
          options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin)
          options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax)
        }        
        options.data[y2Axis].scale = (m.options || {}).scale || y2Scale
        options.data[y2Axis].title = m.qFallbackTitle
        options.data[y2Axis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[y2Axis]), m)
        }
      }
      else {
        hasyAxis = true
        primaryCount++
        this.addOptions(options.data[yAxis], m.options || {})
        // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)
        if (options.grouping !== 'stacked' || isCombo === true) {
          options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)
          options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)
        }
        options.data[yAxis].scale = (m.options || {}).scale || yScale
        options.data[yAxis].title = m.qFallbackTitle
        options.data[yAxis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[yAxis]), m)
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
        return this.formatValue(d, this.layout.qHyperCube.qDimensionInfo[0].options || {}, this.layout.qHyperCube.qMeasureInfo[0])
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
            options.data[xAxis].min = (options.data[xAxis].min || '').length < (c.qText || '').length ? (options.data[xAxis].min || '') : (c.qText || '')
            options.data[xAxis].max = (options.data[xAxis].max || '').length > (c.qText || '').length ? (options.data[xAxis].max || '') : (c.qText || '')
          }
          return
        }        
        let x = r[0]
        x.value = x.qText || '-'       
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
          r[0].valueCount = 0
          options.data[xAxis].data.push(x)
        }
        c.value = isNaN(c.qNum) ? 0 : c.qNum            
        xTotals[xKeys.indexOf(x.qElemNumber)] += c.value
        c.tooltipLabel = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle   
        c.tooltipValue = c.qText || '-'    
        c.label = c.qText || '-'
        if ((this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options || {}).type !== 'line') {
          r[0].valueCount++
        }
        c.color = this.getColor(c, r[0], this.layout.qHyperCube.qDimensionInfo[0], this.layout.qHyperCube.qMeasureInfo[cIndex - 1], this.layout.qHyperCube.color)
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
    if (options.grouping === 'stacked' && isCombo !== true) {
      if (hasyAxis) {
        options.data[yAxis].min = 0 // may need to revisit this to think about negative numbers
        options.data[yAxis].max = Math.max(...xTotals)
      }      
      if (hasy2Axis) {
        options.data[y2Axis].min = 0 // may need to revisit this to think about negative numbers
        options.data[y2Axis].max = Math.max(...xTotals)
      }
    }
    console.log('multi measure options', options, xTotals)  
    return options
  }
  transformDataToMatrix (dataInput) {
    const matrix = []
    dataInput.forEach((node, nIndex) => {
      if (node.qSubNodes.length > 0) {
        node.qSubNodes.forEach((s) => {
          const row = [
            { qText: node.qText || '-', qElemNumber: node.qElemNo }
          ]
          let dimCell2 = {
            qText: s.qText || '-',
            qElemNumber: s.qElemNo
          }
          if (s.qAttrExps) {
            dimCell2.qAttrExps = s.qAttrExps
          }
          row.push(dimCell2)
          if (s.qSubNodes && s.qSubNodes.length > 0) {
            let expCell = {
              qText: s.qSubNodes[0].qText || '-',
              qNum: s.qSubNodes[0].qValue
            }
            if (s.qSubNodes[0].qAttrExps) {
              expCell.qAttrExps = s.qSubNodes[0].qAttrExps
            }
            row.push(expCell)
          }
          matrix.push([row[1], row[0], row[2]])
        })
      }
    })      
    return matrix
  }
}
