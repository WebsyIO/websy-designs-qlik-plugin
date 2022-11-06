/*
  global
  WebsyDesigns
  d3
*/
class DatePicker {
  constructor (elementId, options) {
    const DEFAULTS = {
      mode: 'date',
      pageSize: 1000,
      dateFormat: '%_m/%_d/%Y',
      softLock: false
    }
    this.elementId = elementId  
    this.monthYearIsDate = true  
    this.options = Object.assign({}, DEFAULTS, options)
    this.picker = new WebsyDesigns.WebsyDatePicker(elementId, Object.assign({}, options, {
      onChange: this.onChange.bind(this),
      onClear: this.onClear.bind(this)
    }))
    this.listening = true
    this.hourList = new Array(24).fill(0).map((d, i) => (i < 10 ? '0' : '') + i + ':00')
    this.altHourList = new Array(24).fill(0).map((d, i) => (i + ':00')) 
    this.formatDate = d3.timeFormat ? d3.timeFormat(this.options.dateFormat) : d3.time.format(this.options.dateFormat)
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
    if (typeof d === 'number') {
      d = new Date(d)
    }
    // let day = d.getDate()
    // if (day.toString().length === 1) {
    //   day = `0${day}`
    // }
    // let month = d.getMonth() + 1
    // if (month.toString().length === 1) {
    //   month = `0${month}`
    // }
    // let year = d.getFullYear()
    // // return `${day}/${month}/${year}`
    // // return `${year}-${month}-${day}`
    // return `${month}/${day}/${year}`
    return this.formatDate(d).replace(/ /g, '')
  }
  toQlikDateNum (d) {
    return Math.floor((d.getTime() / 86400000 + 25569))
  }
  onChange (data, isRange) {    
    let start    
    let end    
    let valueList = data.map(d => {
      if (this.options.mode === 'date') {
        return this.toQlikDate(d)
      }
      else if (this.options.mode === 'monthyear') {
        if (this.monthYearIsDate === true) {
          return this.toQlikDate(d)
        }
        else {          
          if (!d.getFullYear) {        
            d = new Date(d)
          }
          return +`${d.getFullYear()}${d.getMonth() < 9 ? '0' : ''}${d.getMonth() + 1}`
        }
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
    if (this.options.mode === 'hour') {
      this.options.model.selectListObjectValues('/qListObjectDef', data.map(v => v.qElemNumber), false, this.options.softLock)
    }
    else {
      this.options.model.searchListObjectFor('/qListObjectDef', query).then(() => {
        this.options.model.acceptListObjectSearch('/qListObjectDef', false, this.options.softLock).then()
      })
    }    
    // })    
    // })    
  }
  onClear () {
    this.options.model.clear()
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
          else if (this.options.mode === 'monthyear') {
            start = layout.qListObject.qDataPages[0].qMatrix[0][0]
            end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0]
            if (start.qNum.toString().length === 5) {
              this.monthYearIsDate = true
              start = this.fromQlikDate(start.qNum)
              end = this.fromQlikDate(end.qNum)
            }
            else {
              this.monthYearIsDate = false
              let startYear = +start.qNum.toString().substring(0, 4)
              let startMonth = +start.qNum.toString().substring(4, 6) - 1
              let endYear = +end.qNum.toString().substring(0, 4)
              let endMonth = +end.qNum.toString().substring(4, 6) - 1
              start = new Date(new Date(new Date(new Date().setDate(1)).setMonth(startMonth)).setFullYear(startYear))
              end = new Date(new Date(new Date(new Date().setDate(1)).setMonth(endMonth)).setFullYear(endYear))              
            }
          }
          else if (this.options.mode === 'hour') {
            // 
          }
          let diff = (end - start)
          if (this.options.mode === 'date') {
            diff = diff / oneDay
          }
          else if (this.options.mode === 'monthyear') {
            let yearDiff = (end.getFullYear() - start.getFullYear()) * 12
            diff = Math.floor((end.getMonth() - start.getMonth())) + yearDiff
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
            else if (this.options.mode === 'monthyear') {
              let temp = this.floorDate(new Date(new Date(start.getTime()).setMonth(start.getMonth() + i)))
              // temp.setHours(0, 0, 0)
              completeDateList[temp.getTime()] = {
                qNum: this.monthYearIsDate === true ? this.toQlikDateNum(temp) : `${temp.getFullYear()}${temp.getMonth() < 9 ? '0' : ''}${temp.getMonth() + 1}`,
                qState: 'Z'
              }
            }
            else if (this.options.mode === 'hour') {
              // 
            }        
          }
          let hours = []
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
            else if (this.options.mode === 'monthyear') {
              if (this.monthYearIsDate === true) {
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
              else {
                let d = r[0]
                let startYear = +d.qNum.toString().substring(0, 4)
                let startMonth = +d.qNum.toString().substring(4, 6) - 1
                d = this.floorDate(new Date(new Date(new Date(new Date().setDate(1)).setMonth(startMonth)).setFullYear(startYear)))
                if (completeDateList[d.getTime()]) {
                  completeDateList[d.getTime()] = r[0]
                }
                if (i === 0) {
                  min = d
                }
                else if (i === arr.length - 1) {
                  max = d
                }
              }
            }
            else if (this.options.mode === 'hour') {
              hours.push(Object.assign({}, r[0], {
                text: r[0].qText,
                num: r[0].qNum
              })) 
            }             
          })
          let completeDateListArr = Object.values(completeDateList)
          if (this.options.mode === 'hour') {
            completeDateListArr = hours
          }          
          completeDateListArr.forEach(d => {
            if (['S', 'L', 'XS', 'XL'].indexOf(d.qState) !== -1) {
              if (this.options.mode === 'date') {                
                selectedRange.push(this.fromQlikDate(d.qNum))
              }            
              else if (this.options.mode === 'monthyear') {
                if (this.monthYearIsDate === true) {                  
                  selectedRange.push(this.fromQlikDate(d.qNum))
                }
                else {
                  let year = +d.qNum.toString().substring(0, 4)
                  let month = +d.qNum.toString().substring(4, 6) - 1
                  d = this.floorDate(new Date(new Date(new Date(new Date().setDate(1)).setMonth(month)).setFullYear(year)))
                  selectedRange.push(d)
                }
              }
              else if (this.options.mode === 'hour') {
                let hourIndex = this.hourList.indexOf(d.qText)
                if (hourIndex !== -1) {                  
                  selectedRange.push(hourIndex) 
                }                
                else {
                  hourIndex = this.altHourList.indexOf(d.qText)
                  if (hourIndex !== -1) {                    
                    selectedRange.push(hourIndex) 
                  }               
                }                
              } 
              else {
                selectedRange.push(d.qNum)
              }                           
            }
            // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {
            if (['Z'].indexOf(d.qState) !== -1) {
              if (this.options.mode === 'date') {
                disabledDates.push(this.fromQlikDate(d.qNum))
              }            
              else if (this.options.mode === 'monthyear') {
                if (this.monthYearIsDate === true) {
                  disabledDates.push(this.fromQlikDate(d.qNum))
                }
                else {
                  disabledDates.push(d.qNum)
                }
              } 
              else if (this.options.mode === 'hour') {
                disabledDates.push(d.qText)
              }
              else {
                disabledDates.push(d.qNum)
              }
            }
          })
          if (this.options.minAllowedDate || this.options.maxAllowedDate) {
            min = this.options.minAllowedDate
            max = this.options.maxAllowedDate            
          }
          if (this.options.mode === 'hour') {
            this.picker.options.hours = completeDateListArr
          }
          this.picker.setDateBounds([min, max])
          if (selectedRange.length === layout.qListObject.qDataPages[0].qMatrix.length) {
            // do nothing because all values are selected
          }
          else if (selectedRange.length > 0) {
            this.picker.selectCustomRange(selectedRange)
          }
          else if (selectedRange.length === 0) {
            this.picker.selectRange(0, false)
          }
          this.picker.render(disabledDates)
          this.listening = true
        }
      })       
    })
  }
}
