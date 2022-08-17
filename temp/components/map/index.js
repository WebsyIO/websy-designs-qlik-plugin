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
        this.options = Object.assign({}, this.options, layout.options)
        // this.map.options = Object.assign({}, this.options, this.map.options, layout.options)
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
