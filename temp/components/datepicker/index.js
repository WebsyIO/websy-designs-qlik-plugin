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
