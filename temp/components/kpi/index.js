/* global WebsyDesigns translate */ 
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
        value: translate('global', layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle)
      }
      if (layout.icon) {
        this.kpiOptions.icon = `${window.location.origin}/resources/svg/${layout.icon}.svg`
      }
      if (layout.tooltip && layout.tooltip.value) {
        this.kpiOptions.tooltip = {
          value: translate('global', layout.tooltip.value)
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
        // let v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qNum === 'NaN' ? layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText : layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qNum.toReduced(decimals, layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText.indexOf('%') !== -1)            
        // if (layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText && layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText.indexOf('€') !== -1) {
        //   v1 = v1.toCurrency('€')
        // }
        let v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText
        this.kpiOptions.subValue = {
          value: `${translate('global', layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle)} ${v1}`
        }        
      }      
      this.kpi.render(this.kpiOptions)
    })    
  }
  resize () {
    this.kpi.resize()
  }
}
