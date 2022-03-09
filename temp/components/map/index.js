/* global WebsyDesigns coreService */ 
class GeoMap {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.mapOptions = Object.assign({}, options.def.mapOptions || {})
    if (this.mapOptions.geoJSON && typeof this.mapOptions.geoJSON === 'string') {
      WebsyDesigns.service.get(this.mapOptions.geoJSON).then(geoJSON => {
        this.geoJSON = geoJSON
        // this.mapOptions.geoJSON = geoJSON
        delete this.mapOptions.geoJSON
        this.map = new WebsyDesigns.WebsyMap(elementId, this.mapOptions)
        this.render()
      })      
    }   
    else {
      this.map = new WebsyDesigns.WebsyMap(elementId, this.mapOptions)
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
      if (layout.qHyperCube.qDataPages[0]) {
        if (this.geoJSON) {
          let geoJSON = {
            type: 'FeatureCollection',
            features: []
          }
          layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {          
            let p = this.findGeoJsonByProperty(r[0].qText)          
            if (p) {               
              p.fillColor = '#783c96'            
              p.fillOpacity = 0.4 + ((r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax) * 0.6)
              p.tooltip = `${r[1].qText}<br>${p.properties.label}`
              p.tooltipClass = 'websy-map-tooltip'
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
