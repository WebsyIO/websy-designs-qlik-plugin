/*
  global
  WebsyDesigns
*/
class DatePicker {
  constructor (elementId, options) {
    const DEFAULTS = {
      mode: 'date',
      pageSize: 1000
    }
    this.elementId = elementId    
    this.options = Object.assign({}, DEFAULTS, options)
    this.picker = new WebsyDesigns.WebsyDatePicker(elementId, Object.assign({}, options, {
      onChange: this.onChange.bind(this)
    }))
    this.listening = true
    this.render()
  }
  checkForData () {
    return new Promise((resolve, reject) => {
      if (this.listening === true) {
        this.listening = false
        this.options.model.getListObjectData('/qListObjectDef', [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: this.options.pageSize
        }]).then(pages => {          
          this.layout.qListObject.qDataPages = [pages[0]]
          this.listening = true
          resolve()
        }, err => {
          this.listening = true
          reject(err)
        })
      }
    })    
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
        this.options.app.getField(f).then(field => {
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
  onChange (data, isRange) {
    console.log(data)
    let start    
    let end    
    let valueList = data.map(d => {
      if (this.options.mode === 'date') {
        return this.toQlikDate(d)
      }
      else {
        return d
      }  
    })
    let query = ''      
    if (isRange) {
      query = `${valueList[0]}`
      if (valueList.length > 1) {
        query = `>=${valueList[0]}<=${valueList[valueList.length - 1]}`  
      }
    }    
    else {
      query = valueList.join(' ')
    }
    // this.getField(this.options.selectField).then(field => {
    // set listening to false to stop Qlik from updating the state of the datepicker
    // this.listening = false
    // this.options.model.beginSelections('/qListObjectDef').then(() => {
    this.options.model.searchListObjectFor('/qListObjectDef', query).then(() => {
      this.options.model.acceptListObjectSearch('/qListObjectDef', false).then()
    })
    // })    
    // })    
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.checkForData().then(() => {
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
          let start
          let end
          if (this.options.mode === 'date') {
            start = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[0][0].qNum).getTime()
            end = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum).getTime()
          }
          else if (this.options.mode === 'year') {
            start = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum
            end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum
            if (start > end) {
              end = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum
              start = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum
              this.options.sortDirection = 'desc'
              this.picker.options.sortDirection = 'desc'
            }
            min = start
            max = end
            this.picker.options.minAllowedYear = start
            this.picker.options.maxAllowedYear = end
          }
          let diff = (end - start)
          if (this.options.mode === 'date') {
            diff = diff / oneDay
          }        
          for (let i = 0; i < diff + 1; i++) {
            if (this.options.mode === 'date') {
              let temp = new Date(start + (i * oneDay))
              temp.setHours(0, 0, 0)      
              completeDateList[temp.getTime()] = {
                qNum: this.toQlikDateNum(temp),
                qState: 'Z'
              } 
            }
            else if (this.options.mode === 'year') {
              completeDateList[start + i] = {
                qNum: start + i,
                qState: 'Z'
              }
            }        
          }
          layout.qListObject.qDataPages[0].qMatrix.forEach((r, i, arr) => {
            if (this.options.mode === 'date') {
              if (completeDateList[this.fromQlikDate(r[0].qNum).getTime()]) {
                completeDateList[this.fromQlikDate(r[0].qNum).getTime()] = r[0]
              }
              if (i === 0) {
                min = this.fromQlikDate(r[0].qNum)
              }
              else if (i === arr.length - 1) {
                max = this.fromQlikDate(r[0].qNum)
              }   
            }    
            else if (this.options.mode === 'year') {
              if (completeDateList[r[0].qNum]) {
                completeDateList[r[0].qNum] = r[0]
              }
              // if (i === 0) {
              //   min = r[0].qNum
              // }
              // if (i === arr.length - 1) {
              //   max = r[0].qNum
              // } 
            }              
          })
          const completeDateListArr = Object.values(completeDateList)
          completeDateListArr.forEach(d => {
            if (d.qState === 'S') {            
              selectedRange.push(this.options.mode === 'date' ? this.fromQlikDate(d.qNum) : d.qNum)
            }
            // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {
            if (['Z'].indexOf(d.qState) !== -1) {
              disabledDates.push(this.options.mode === 'date' ? this.fromQlikDate(d.qNum) : d.qNum)
            }
          })
          this.picker.setDateBounds([min, max])
          if (selectedRange.length !== layout.qListObject.qDataPages[0].qMatrix.length) {
            // do nothing because all values are selected
          }
          else if (selectedRange.length > 0) {
            this.picker.selectCustomRange([selectedRange[0], selectedRange[selectedRange.length - 1] || selectedRange[0]])
          }
          this.picker.render(disabledDates)
          this.listening = true
        }
      })       
    })
  }
}
