/* global WebsyDesigns */ 
class Pie {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.pie = new WebsyDesigns.WebsyPie(elementId, this.options)
    this.data = []
    window.addEventListener('resize', () => this.pie.render(this.data))
    this.render()
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.options = Object.assign({}, this.options, layout.options)
      this.pie.options = this.options
      this.layout = layout
      if (layout.qHyperCube.qDataPages[0]) {
        this.data = this.transformData(layout.qHyperCube.qDataPages[0].qMatrix)
        this.pie.render(this.data)
      }
    })
  }
  transformData (data) {
    let output = []
    data.forEach(row => {
      row[0].label = row[0].qText
      row[1].value = row[1].qNum
      output.push(
        [row[0], row[1]]
      )
    })
    return output
  }
}
