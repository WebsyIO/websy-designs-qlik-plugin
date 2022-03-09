"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
var Chart = /*#__PURE__*/function () {
  function Chart(elementId, options) {
    var _this = this;

    _classCallCheck(this, Chart);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.optionDefaults = {
      data: {
        left: {
          min: 0,
          max: 0
        },
        right: {
          min: 0,
          max: 0
        },
        bottom: {
          min: 0,
          max: 0
        },
        top: {
          min: 0,
          max: 0
        },
        series: []
      }
    };
    this.chart = new WebsyDesigns.WebsyChart(elementId);
    window.addEventListener('resize', function () {
      return _this.chart.render();
    });
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
    };
    this.render();
  }

  _createClass(Chart, [{
    key: "addOptions",
    value: function addOptions(input, options) {
      for (var key in options) {
        input[key] = options[key];
      }
    }
  }, {
    key: "createSeriesKey",
    value: function createSeriesKey(title) {
      return title.replace(/ /g, '_');
    }
  }, {
    key: "formatValue",
    value: function formatValue(d) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      console.log('formatting', d, options);
      var decimals = 0;
      var isPercentage = false;

      if (options.decimals) {
        decimals = options.decimals;
      }

      if (options.showAsPercentage === true) {
        isPercentage = options.showAsPercentage;
      }

      if ((options || {}).scale === 'Time' && d.getDate) {
        d = "".concat(d.getDate(), " ").concat(this.monthMap[d.getMonth()], " ").concat(d.getFullYear());
      } else if (!isNaN(d)) {
        // if (d.toReduced(decimals, isPercentage, true) % 1 === 0) {
        //   decimals = 0
        // }
        d = WebsyDesigns.Utils.toReduced(d, decimals, isPercentage, false, options.max);

        if (options.showAsCurrency === true) {
          d = d.toCurrency();
        }
      }

      return d;
    }
  }, {
    key: "fromQlikDate",
    value: function fromQlikDate(d) {
      var output = new Date(Math.round((d - 25569) * 86400000));
      output.setTime(output.getTime() + output.getTimezoneOffset() * 60000);
      return output;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.options.model.getLayout().then(function (layout) {
        _this2.layout = layout;
        console.log(_this2.layout);
        var options = {};

        if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {
          // options = this.transformBasic()
          options = _this2.transformMultiMeasure();
        } else if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length > 1) {
          options = _this2.transformMultiMeasure();
        } else if (layout.qHyperCube.qDimensionInfo.length > 1) {
          options = _this2.transformMultiDimensions();
        } else if (layout.qHyperCube.qDimensionInfo.length === 0 && layout.qHyperCube.qMeasureInfo.length > 0) {
          options = _this2.transformNoDimensions();
        }

        _this2.chart.render(options);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.chart.render();
    }
  }, {
    key: "transformBasic",
    value: function transformBasic() {
      var _this3 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options);

      this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {}); // options.data.left = Object.assign({}, this.layout.qHyperCube.qMeasureInfo[0].options || {})

      options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin;
      options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax;
      options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
      this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[0].options || {}); // options.data.bottom = Object.assign({}, this.layout.qHyperCube.qDimensionInfo[0].options || {})

      options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
      options.data.bottom.data = [];
      options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

      options.data.left.formatter = function (d) {
        return _this3.formatValue(d, _this3.layout.qHyperCube.qMeasureInfo[0].options || {});
      };

      var series = this.layout.qHyperCube.qMeasureInfo[0].options || {};
      series.data = [];
      series.key = this.createSeriesKey(this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
      this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
        r[0].value = r[0].qText;
        r[1].value = isNaN(r[1].qNum) ? 0 : r[1].qNum;
        r[1].tooltipValue = r[1].qText;
        options.data.bottom.data.push(r[0]);
        series.data.push({
          x: r[0],
          y: r[1]
        });
      });
      options.data.series = [series];
      return options;
    }
  }, {
    key: "transformMultiDimensions",
    value: function transformMultiDimensions() {
      var _this4 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options);

      this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {}); // options.data.left = Object.assign({}, options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})

      options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin;
      options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax;
      options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
      this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {}); // options.data.bottom = Object.assign({}, options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})

      options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[1].qFallbackTitle;
      options.data.bottom.data = [];
      options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

      options.data.left.formatter = function (d) {
        return _this4.formatValue(d, _this4.layout.qHyperCube.qMeasureInfo[0].options || {});
      };

      var series = [];
      var seriesKeys = [];
      var bottomKeys = [];
      this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
        var seriesIndex = seriesKeys.indexOf(r[0].qText);
        var bottomIndex = bottomKeys.indexOf(r[1].qText);

        if (bottomIndex === -1) {
          bottomKeys.push(r[1].qText);
          r[1].value = r[1].qText;
          options.data.bottom.data.push(r[1]);
        }

        if (seriesIndex === -1) {
          seriesKeys.push(r[0].qText);
          seriesIndex = seriesKeys.length - 1;
          series.push({
            key: "series_".concat(seriesIndex),
            type: options.type || 'bar',
            label: r[0].qText,
            // color: this.layout.options.color,
            data: []
          });
        }

        var c = r[2];
        c.value = isNaN(c.qNum) ? 0 : c.qNum;
        c.tooltipLabel = r[0].qText;
        c.tooltipValue = c.qText;
        series[seriesIndex].data.push({
          x: {
            value: r[1].qText
          },
          y: c
        });
      });
      options.data.series = series;
      console.log(options);
      return options;
    }
  }, {
    key: "transformNoDimensions",
    value: function transformNoDimensions() {
      var _this5 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options);

      var xAxis = 'bottom';
      var yAxis = 'left';
      var xScale = 'Band';
      var yScale = 'Linear';

      if (options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom';
        xScale = 'Linear';
        yScale = 'Band';
      }

      options.data[xAxis].scale = xScale;
      options.data[yAxis].scale = yScale;
      options.data[xAxis].padding = options.padding || 0;
      options.data[xAxis].data = [];

      if (options.xTitle) {
        options.data[xAxis].title = options.xTitle;
        options.data[xAxis].showTitle = true;
        options.data[xAxis].titlePosition = 1;
      }

      options.data[yAxis].formatter = function (d) {
        return _this5.formatValue(d, options || {});
      };

      this.layout.qHyperCube.qMeasureInfo.forEach(function (m) {
        options.data[xAxis].data.push({
          value: m.qFallbackTitle
        });
        options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin);
        options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax);
      });

      if (options.yMinOverride) {
        options.data[yAxis].min = options.yMinOverride;
      }

      if (options.yMaxOverride) {
        options.data[yAxis].max = options.yMaxOverride;
      }

      if (this.layout.qHyperCube.qDataPages[0]) {
        options.data.series = [{
          key: this.layout.qInfo.qId,
          type: options.type || 'bar',
          color: options.color,
          data: this.layout.qHyperCube.qDataPages[0].qMatrix.map(function (r) {
            return r.map(function (c, i) {
              c.value = isNaN(c.qNum) ? 0 : c.qNum;

              if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
                c.label = c.qAttrExps.qValues[0].qText;
              }

              return {
                x: {
                  value: _this5.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle
                },
                y: c
              };
            });
          })[0]
        }];
      }

      return options;
    }
  }, {
    key: "transformMultiMeasure",
    value: function transformMultiMeasure() {
      var _this6 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options);

      var xAxis = 'bottom';
      var x2Axis = 'bottom';
      var yAxis = 'left';
      var y2Axis = 'right';
      var xScale = 'Band';
      var x2Scale = 'Band';
      var yScale = 'Linear';
      var y2Scale = 'Linear';

      if (options.orientation === 'horizontal') {
        xAxis = 'left';
        x2Axis = 'right';
        yAxis = 'bottom';
        y2Axis = 'top';
      }

      options.data[yAxis].min = 0;
      options.data[yAxis].max = 0;
      options.data[y2Axis].min = 0;
      options.data[y2Axis].max = 0;
      options.data.series = this.layout.qHyperCube.qMeasureInfo.map(function (m, i) {
        var series = _extends({}, m.options);

        series.key = _this6.createSeriesKey(m.qFallbackTitle);
        series.data = [];
        series.type = (m.options || {}).type || options.type || 'bar';
        series.accumulative = 0;

        if (m.axis === 'secondary') {
          // right hand axis
          _this6.addOptions(options.data[y2Axis], m.options || {}); // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        


          if (options.grouping !== 'stacked') {
            options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin);
            options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax);
          }

          options.data[y2Axis].scale = (m.options || {}).scale || y2Scale;
          options.data[y2Axis].title = m.qFallbackTitle;

          options.data[y2Axis].formatter = function (d) {
            return _this6.formatValue(d, _extends({}, m.options, options.data[y2Axis]));
          };
        } else {
          _this6.addOptions(options.data[yAxis], m.options || {}); // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)


          if (options.grouping !== 'stacked') {
            options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin);
            options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax);
          }

          console.log('max', options.data[yAxis].max);
          options.data[yAxis].scale = (m.options || {}).scale || yScale;
          options.data[yAxis].title = m.qFallbackTitle;

          options.data[yAxis].formatter = function (d) {
            return _this6.formatValue(d, _extends({}, m.options, options.data[yAxis]));
          };
        }

        return series;
      });
      this.addOptions(options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options || {}); // options.data[xAxis] = Object.assign({}, options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options)

      if (options.data[xAxis].ticks && options.data[xAxis].ticks.indexOf('d3.time') !== -1) {
        var t = options.data[xAxis].ticks.split('.').pop();
        options.data[xAxis] = d3.time[t];
      }

      options.data[xAxis].title = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
      options.data[xAxis].data = [];
      options.data[xAxis].min = this.layout.qHyperCube.qDimensionInfo[0].qMin;
      options.data[xAxis].max = this.layout.qHyperCube.qDimensionInfo[0].qMax;
      options.data[xAxis].scale = (this.layout.qHyperCube.qDimensionInfo[0].options || {}).scale || xScale;

      if (options.data[xAxis].scale !== 'Time') {
        options.data[xAxis].formatter = function (d) {
          return _this6.formatValue(d, _this6.layout.qHyperCube.qDimensionInfo[0].options || {});
        };
      } else {
        options.data[xAxis].min = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMin);
        options.data[xAxis].max = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMax);
      }

      var xKeys = [];
      var xTotals = [];
      var xAcc = [];
      this.layout.qHyperCube.qDataPages[0].qMatrix.map(function (r) {
        r.forEach(function (c, cIndex) {
          if (cIndex === 0) {
            if (options.data[xAxis].scale !== 'Time') {
              options.data[xAxis].min = options.data[xAxis].min.length < c.qText.length ? options.data[xAxis].min : c.qText;
              options.data[xAxis].max = options.data[xAxis].max.length > c.qText.length ? options.data[xAxis].max : c.qText;
            }

            return;
          }

          var x = r[0];
          x.value = x.qText;

          if ((_this6.layout.qHyperCube.qDimensionInfo[0].options || {}).scale === 'Time') {
            x.value = _this6.fromQlikDate(x.qNum);
          } // else {
          //   if (xKeys.indexOf(x.value) === -1) {
          //     xKeys.push(x.value)
          //     options.data[xAxis].data.push(x)  
          //   }
          // }


          if (xKeys.indexOf(x.qElemNumber) === -1) {
            xKeys.push(x.qElemNumber);
            xAcc.push(0);
            xTotals.push(0);
            options.data[xAxis].data.push(x);
          }

          c.value = isNaN(c.qNum) ? 0 : c.qNum;
          xTotals[xKeys.indexOf(x.qElemNumber)] += c.value;
          c.tooltipLabel = _this6.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle;
          c.tooltipValue = c.qText; // if (this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options) {
          // c.color = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options.color 
          // }        

          c.index = cIndex;
          c.accumulative = xAcc[xKeys.indexOf(x.qElemNumber)];
          xAcc[xKeys.indexOf(x.qElemNumber)] += c.value; // console.log('accu is', options.data.series[cIndex - 1].key, options.data.series[cIndex - 1].accumulative)
          // options.data.series[cIndex - 1].accumulative += c.value

          x.index = xKeys.indexOf(x.value);
          options.data.series[cIndex - 1].data.push({
            x: x,
            y: c
          });
        });
      });

      if (options.grouping === 'stacked') {
        options.data[yAxis].min = 0; // may need to revisit this to think about negative numbers

        options.data[yAxis].max = Math.max.apply(Math, xTotals);
        options.data[y2Axis].min = 0; // may need to revisit this to think about negative numbers

        options.data[y2Axis].max = Math.max.apply(Math, xTotals);
      }

      console.log('options', options, xTotals);
      return options;
    }
  }]);

  return Chart;
}();
/*
  global
  WebsyDesigns
  objectManager
*/


var DatePicker = /*#__PURE__*/function () {
  function DatePicker(elementId, options) {
    _classCallCheck(this, DatePicker);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.picker = new WebsyDesigns.WebsyDatePicker(elementId, {
      onChange: this.onChange.bind(this)
    });
    this.listening = true;
    this.render();
  }

  _createClass(DatePicker, [{
    key: "floorDate",
    value: function floorDate(d) {
      if (typeof d === 'number') {
        d = new Date(d);
      }

      return new Date(d.setHours(0, 0, 0, 0));
    }
  }, {
    key: "fromQlikDate",
    value: function fromQlikDate(d) {
      var output = new Date(Math.round((d - 25569) * 86400000));
      output.setTime(output.getTime() + output.getTimezoneOffset() * 60000);
      return this.floorDate(output);
    }
  }, {
    key: "getField",
    value: function getField(f) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        if (_this7.field) {
          resolve(_this7.field);
        } else {
          objectManager.app.getField(f).then(function (field) {
            if (field) {
              _this7.field = field;
              resolve(_this7.field);
            }
          }, reject);
        }
      });
    }
  }, {
    key: "toQlikDate",
    value: function toQlikDate(d) {
      var day = d.getDate();

      if (day.toString().length === 1) {
        day = "0".concat(day);
      }

      var month = d.getMonth() + 1;

      if (month.toString().length === 1) {
        month = "0".concat(month);
      }

      var year = d.getFullYear(); // return `${day}/${month}/${year}`

      return "".concat(year, "-").concat(month, "-").concat(day);
    }
  }, {
    key: "toQlikDateNum",
    value: function toQlikDateNum(d) {
      return Math.floor(d.getTime() / 86400000 + 25569);
    }
  }, {
    key: "onChange",
    value: function onChange(data) {
      var _this8 = this;

      var start = this.toQlikDate(data[0]);
      var end;

      if (data[1] && data[0].getTime() !== data[1].getTime()) {
        end = this.toQlikDate(data[1]);
      }

      var query = "".concat(start);

      if (end) {
        query = ">=".concat(start, "<=").concat(end);
      }

      this.getField('Date').then(function (field) {
        // set listening to false to stop Qlik from updating the state of the datepicker
        _this8.listening = false;
        field.select(query);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      this.options.model.getLayout().then(function (layout) {
        var disabledDates = [];
        var min;
        var max;
        var selectedMin;
        var selectedMax;
        var selectedRange = [];

        if (layout.qListObject.qDataPages[0] && _this9.listening === true) {
          // ensure we have a complete calendar
          var completeDateList = {};
          var oneDay = 1000 * 60 * 60 * 24;

          var start = _this9.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[0][0].qNum).getTime();

          var end = _this9.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum).getTime();

          var diff = (end - start) / oneDay;

          for (var i = 0; i < diff + 1; i++) {
            var temp = new Date(start + i * oneDay);
            temp.setHours(0, 0, 0);
            completeDateList[temp.getTime()] = {
              qNum: _this9.toQlikDateNum(temp),
              qState: 'Z'
            };
          }

          layout.qListObject.qDataPages[0].qMatrix.forEach(function (r, i, arr) {
            if (completeDateList[_this9.fromQlikDate(r[0].qNum).getTime()]) {
              completeDateList[_this9.fromQlikDate(r[0].qNum).getTime()] = r[0];
            }

            if (i === 0) {
              min = _this9.fromQlikDate(r[0].qNum);
            } else if (i === arr.length - 1) {
              max = _this9.fromQlikDate(r[0].qNum);
            }
          });
          var completeDateListArr = Object.values(completeDateList);
          completeDateListArr.forEach(function (d) {
            if (d.qState === 'S') {
              selectedRange.push(_this9.fromQlikDate(d.qNum));
            } // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {


            if (['Z'].indexOf(d.qState) !== -1) {
              disabledDates.push(_this9.fromQlikDate(d.qNum));
            }
          });

          _this9.picker.setDateBounds([min, max]);

          if (selectedRange.length > 0) {
            _this9.picker.selectCustomRange([selectedRange[0], selectedRange[selectedRange.length - 1] || selectedRange[0]]);
          }

          _this9.picker.render(disabledDates);

          _this9.listening = true;
        }
      });
    }
  }]);

  return DatePicker;
}();
/*
  global
  WebsyDesigns
*/


var Dropdown = /*#__PURE__*/function () {
  function Dropdown(elementId, options) {
    _classCallCheck(this, Dropdown);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.dropdownOptions = _extends({}, options.def.options, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),
      onCancelSearch: this.cancelSearch.bind(this)
    });
    this.dropdown = new WebsyDesigns.WebsyDropdown(elementId, this.dropdownOptions);
    this.render();
  }

  _createClass(Dropdown, [{
    key: "cancelSearch",
    value: function cancelSearch(value) {
      this.options.model.abortListObjectSearch('/qListObjectDef');
    }
  }, {
    key: "clearSelected",
    value: function clearSelected() {
      this.options.model.clearSelections('/qListObjectDef');
    }
  }, {
    key: "itemSelected",
    value: function itemSelected(item, selectedIndexes, items) {
      this.options.model.selectListObjectValues('/qListObjectDef', [item.qElemNumber], this.dropdown.options.multiSelect === true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      this.options.model.getLayout().then(function (layout) {
        if (layout.qListObject.qDataPages[0]) {
          _this10.dropdown.options.label = layout.qListObject.qDimensionInfo.qFallbackTitle;
          var indexes = {};

          if (_this10.options.hideExcluded === true) {
            layout.qListObject.qDataPages[0].qMatrix = layout.qListObject.qDataPages[0].qMatrix.filter(function (r) {
              return ['X', 'XS', 'XL'].indexOf(r[0].qState) === -1;
            });
          }

          layout.qListObject.qDataPages[0].qMatrix.forEach(function (r, i) {
            if (!indexes[r[0].qState]) {
              indexes[r[0].qState] = [];
            }

            indexes[r[0].qState].push(i);
          });

          if (indexes.S && indexes.S.length > 0) {
            _this10.dropdown.selectedItems = indexes.S;
          } else if (indexes.S && indexes.S.length === 0 && indexes.O && indexes.O.length === 1) {
            _this10.dropdown.selectedItems = indexes.O;
          } else {
            _this10.dropdown.selectedItems = [];
          }

          var data = layout.qListObject.qDataPages[0].qMatrix.map(function (r) {
            return _extends(r[0], {
              label: r[0].qText || '-',
              classes: ["state-".concat(r[0].qState)]
            });
          });
          _this10.dropdown.data = data;
        }
      });
    }
  }, {
    key: "search",
    value: function search(value) {
      this.options.model.searchListObjectFor('/qListObjectDef', "*".concat(value, "*"));
    }
  }]);

  return Dropdown;
}();
/* global WebsyDesigns translate */


var KPI = /*#__PURE__*/function () {
  function KPI(elementId, options) {
    _classCallCheck(this, KPI);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.kpiOptions = {};
    this.kpi = new WebsyDesigns.WebsyKPI(elementId, this.kpiOptions);
    this.render();
  }

  _createClass(KPI, [{
    key: "close",
    value: function close() {
      this.kpiOptions.value = {
        value: '-'
      };
      this.kpiOptions.subValue = {
        value: ''
      };
      this.kpi.render(this.kpiOptions);
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      this.options.model.getLayout().then(function (layout) {
        var decimals = 2;
        var v = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
        _this11.kpiOptions.value = {
          value: v
        };
        _this11.kpiOptions.label = {
          value: translate('global', layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle)
        };

        if (layout.icon) {
          _this11.kpiOptions.icon = "".concat(window.location.origin, "/resources/svg/").concat(layout.icon, ".svg");
        }

        if (layout.tooltip && layout.tooltip.value) {
          _this11.kpiOptions.tooltip = {
            value: translate('global', layout.tooltip.value)
          };

          if (layout.tooltip.classes) {
            _this11.kpiOptions.tooltip.classes = layout.tooltip.classes;
          }
        }

        _this11.kpiOptions.subValue = {
          value: ''
        };

        if (layout.kpi.qHyperCube.qMeasureInfo[1]) {
          var _decimals = 2;

          if (typeof layout.kpi.qHyperCube.qMeasureInfo[1].decimals !== 'undefined') {
            _decimals = layout.kpi.qHyperCube.qMeasureInfo[1].decimals;
          } // let v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qNum === 'NaN' ? layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText : layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qNum.toReduced(decimals, layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText.indexOf('%') !== -1)            
          // if (layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText && layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText.indexOf('€') !== -1) {
          //   v1 = v1.toCurrency('€')
          // }


          var v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText;
          _this11.kpiOptions.subValue = {
            value: "".concat(translate('global', layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle), " ").concat(v1)
          };
        }

        _this11.kpi.render(_this11.kpiOptions);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.kpi.resize();
    }
  }]);

  return KPI;
}();
/* global WebsyDesigns coreService */


var GeoMap = /*#__PURE__*/function () {
  function GeoMap(elementId, options) {
    var _this12 = this;

    _classCallCheck(this, GeoMap);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.mapOptions = _extends({}, options.def.mapOptions || {});

    if (this.mapOptions.geoJSON && typeof this.mapOptions.geoJSON === 'string') {
      WebsyDesigns.service.get(this.mapOptions.geoJSON).then(function (geoJSON) {
        _this12.geoJSON = geoJSON; // this.mapOptions.geoJSON = geoJSON

        delete _this12.mapOptions.geoJSON;
        _this12.map = new WebsyDesigns.WebsyMap(elementId, _this12.mapOptions);

        _this12.render();
      });
    } else {
      this.map = new WebsyDesigns.WebsyMap(elementId, this.mapOptions);
      this.render();
    }
  }

  _createClass(GeoMap, [{
    key: "findGeoJsonByProperty",
    value: function findGeoJsonByProperty(province) {
      for (var i = 0; i < this.geoJSON.features.length; i++) {
        if (this.geoJSON.features[i].properties.name.toLowerCase() === province.toLowerCase()) {
          return this.geoJSON.features[i];
        }
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var el = document.getElementById(this.elementId);

      if (el.parentElement) {
        el.parentElement.classList.add('loading');
      }

      this.options.model.getLayout().then(function (layout) {
        if (layout.qHyperCube.qDataPages[0]) {
          if (_this13.geoJSON) {
            var geoJSON = {
              type: 'FeatureCollection',
              features: []
            };
            layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
              var p = _this13.findGeoJsonByProperty(r[0].qText);

              if (p) {
                p.fillColor = '#783c96';
                p.fillOpacity = 0.4 + r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax * 0.6;
                p.tooltip = "".concat(r[1].qText, "<br>").concat(p.properties.label);
                p.tooltipClass = 'websy-map-tooltip';
                geoJSON.features.push(p);
              }
            });
            _this13.map.options.geoJSON = geoJSON;
          }

          var data = {};
          layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
            r.forEach(function (c, cIndex) {
              if (cIndex === 0) {
                return;
              }

              if ((layout.qHyperCube.qMeasureInfo[cIndex - 1].options || {}).type === 'polygon') {
                if (!data.polygons) {
                  data.polygons = [];
                }

                var latLng = JSON.parse("[".concat(c.qText, "]"));
                data.polygons.push({
                  label: r[0].qText,
                  data: latLng.map(function (l) {
                    return l.map(function (l2) {
                      return {
                        Latitude: l2[1],
                        Longitude: l2[0]
                      };
                    });
                  })
                });
              } else {// add a marker
              }
            });
          });
          _this13.map.options.data = data;

          if (el.parentElement) {
            el.parentElement.classList.remove('loading');
          }

          _this13.map.render();
        }
      });
    }
  }]);

  return GeoMap;
}();
/* global WebsyDesigns getAllData */


var Table = /*#__PURE__*/function () {
  function Table(elementId, options) {
    _classCallCheck(this, Table);

    var DEFAULTS = {
      pageSize: 50
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.rowCount = 0;
    this.errorCount = 0;
    this.retryFn = null;
    this.busy = false;
    this.table = new WebsyDesigns.WebsyTable(this.elementId, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),
      onSort: this.handleSort.bind(this)
    });
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
    }

    this.render();
  }

  _createClass(Table, [{
    key: "appendRows",
    value: function appendRows(data) {
      this.table.appendRows(data);
    }
  }, {
    key: "getData",
    value: function getData(callbackFn) {
      var _this14 = this;

      if (this.busy === false) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            _this14.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length;
            _this14.busy = false;

            if (callbackFn) {
              callbackFn(layout.qHyperCube.qDataPages[0].qMatrix);
            }
          });
        } else {
          var pageDefs = [{
            qTop: this.rowCount,
            qLeft: 0,
            qWidth: this.dataWidth,
            qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
          }];

          if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
            var method = 'getHyperCubeData';

            if (this.layout.qHyperCube.qMode === 'P') {
              method = 'getHyperCubePivotData';
            }

            this.options.model[method]('/qHyperCubeDef', pageDefs).then(function (pages) {
              if (pages && pages[0]) {
                if (_this14.layout.qHyperCube.qMode === 'P') {
                  _this14.layout.qHyperCube.qPivotDataPages.push(pages[0]);

                  _this14.rowCount += pages[0].qData.length;
                } else {
                  pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                    return r[0].qText !== '-';
                  });

                  _this14.layout.qHyperCube.qDataPages.push(pages[0]);

                  _this14.rowCount += pages[0].qMatrix.length;
                }

                _this14.busy = false;

                if (callbackFn) {
                  if (_this14.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              var e = err;

              if (_this14.errorCount < 50) {
                _this14.errorCount++;
                console.log('error getting data, attempt', _this14.errorCount);
                clearTimeout(_this14.retryFn);
                _this14.retryFn = setTimeout(function () {
                  _this14.getData(callbackFn);
                }, 300);
              } // callbackFn({err})

            });
          } else {
            this.busy = false;
          }
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, cell, row, column) {
      if (event.target.classList.contains('table-try-again')) {
        this.render();
      } else if (cell && cell.qElemNumber) {
        this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var _this15 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this15.appendRows(_this15.transformData(page));
        });
      }
    }
  }, {
    key: "handleSort",
    value: function handleSort(event, column, colIndex) {
      var reverse = column.reverseSort === true;
      var patchDefs = [{
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([colIndex])
      }];
      var sortType = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? 'qDimensions' : 'qMeasures';
      var sortIndex = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? colIndex : colIndex - this.layout.qHyperCube.qDimensionInfo.length;
      patchDefs.push({
        qOp: 'replace',
        qPath: "/qHyperCubeDef/".concat(sortType, "/").concat(sortIndex, "/qDef/qReverseSort"),
        qValue: JSON.stringify(reverse)
      });
      this.options.model.applyPatches(patchDefs);
    }
  }, {
    key: "render",
    value: function render() {
      var _this16 = this;

      this.options.model.getLayout().then(function (layout) {
        _this16.layout = layout;
        _this16.rowCount = 0;
        _this16.errorCount = 0;
        _this16.dataWidth = _this16.layout.qHyperCube.qSize.qcx;
        _this16.columnOrder = _this16.layout.qHyperCube.qColumnOrder;

        if (typeof _this16.columnOrder === 'undefined') {
          _this16.columnOrder = new Array(_this16.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        var columns = _this16.layout.qHyperCube.qDimensionInfo.concat(_this16.layout.qHyperCube.qMeasureInfo);

        var activeSort = _this16.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
        columns = columns.map(function (c, i) {
          c.colIndex = _this16.columnOrder.indexOf(i);
          c.name = c.qFallbackTitle;

          if (c.tooltip) {
            c.name += "\n          <div class=\"websy-info websy-info-dock-right\" data-info=\"".concat(c.tooltip, "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n          </div>\n          ");
          }

          c.reverseSort = activeSort === i && c.qReverseSort !== true;
          c.activeSort = activeSort === i;

          if (c.qSortIndicator === 'A') {
            c.sort = 'asc';
          } else if (c.qSortIndicator === 'D') {
            c.sort = 'desc';
          }

          return c;
        });
        columns.sort(function (a, b) {
          return a.colIndex - b.colIndex;
        });

        _this16.getData(function (page) {
          _this16.table.options.columns = columns;
          _this16.table.options.activeSort = activeSort;

          _this16.table.render();

          if (page.err) {
            var tableEl = document.getElementById("".concat(_this16.elementId, "_foot"));
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          } else {
            _this16.appendRows(_this16.transformData(page));
          }
        });
      }, function (err) {
        // try again      
        var e = err;

        if (_this16.errorCount < 50) {
          _this16.errorCount++;
          console.log('error getting layout, attempt', _this16.errorCount);
          clearTimeout(_this16.retryFn);
          _this16.retryFn = setTimeout(function () {
            _this16.render();
          }, 300);
        }
      });
    }
  }, {
    key: "transformData",
    value: function transformData(page) {
      var _this17 = this;

      if (this.layout.qHyperCube.qMode === 'S') {
        return page.map(function (r) {
          return r.map(function (c, i) {
            if (_this17.table.options.columns[i].showAsLink === true || _this17.table.options.columns[i].showAsNavigatorLink === true) {
              if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
                c.value = c.qAttrExps.qValues[0].qText;

                if (c.value.indexOf('https://') === -1) {
                  c.value = "https://".concat(c.value);
                }

                c.displayText = c.qText || '-';
              } else {
                c.value = c.qText || '-';
              }
            } else {
              c.value = c.qText || '-';
            }

            return c;
          });
        });
      } else {
        var columns = [{
          name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
        }];
        columns = columns.concat(page.qTop.map(function (c) {
          return {
            name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-'
          };
        }));
        this.table.options.columns = columns;
        this.table.render();
        var rows = [];
        page.qData.forEach(function (r, i) {
          rows.push([_objectSpread({
            value: page.qLeft[i].qText
          }, page.qLeft[i])].concat(_toConsumableArray(r.map(function (c) {
            c.value = c.qText || '-';

            if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
              c.backgroundColor = c.qAttrExps.qValues[0].qText;
              var colorParts;
              var red;
              var green;
              var blue;

              if (c.backgroundColor.indexOf('#') !== -1) {
                // hex color
                colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '');
                colorParts = colorParts.split('');
                red = parseInt(colorParts[0] + colorParts[1], 16);
                green = parseInt(colorParts[2] + colorParts[3], 16);
                blue = parseInt(colorParts[4] + colorParts[5], 16);
              } else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
                // rgb color
                colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '');
                colorParts = colorParts.split(',');
                red = colorParts[0];
                green = colorParts[1];
                blue = colorParts[2];
              }

              c.color = red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
            }

            return c;
          }))));
        });
        return rows;
      }
    }
  }]);

  return Table;
}();

if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Chart: Chart,
    Table: Table,
    GeoMap: GeoMap,
    Dropdown: Dropdown,
    DatePicker: DatePicker,
    KPI: KPI
  };
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

  var ObjectManager = /*#__PURE__*/function () {
    function ObjectManager(options) {
      _classCallCheck(this, ObjectManager);

      var defaults = {
        helpEvent: 'mouseover',
        applySelections: false,
        actions: [],
        initialActions: [],
        visualisationPlugins: [{
          id: 'kpi',
          definition: KPI
        }, {
          id: 'table',
          definition: Table
        }, {
          id: 'chart',
          definition: Chart
        }, {
          id: 'map',
          definition: GeoMap
        }, {
          id: 'dropdown',
          definition: Dropdown
        }, {
          id: 'datepicker',
          definition: DatePicker
        }]
      };
      this.app = null;
      this.paused = false;
      this.supportedChartTypes = [];
      this.activeViews = [];
      this.chartLibrary = {};
      this.globalObjectsLoaded = false;
      this.options = this.mergeObjects({}, defaults, options); // this.options = Object.assign({}, defaults, options)            

      if (this.options.visualisationPlugins && this.options.visualisationPlugins.length > 0) {
        for (var i = 0; i < this.options.visualisationPlugins.length; i++) {
          this.registerVisualisation(this.options.visualisationPlugins[i].id, this.options.visualisationPlugins[i].definition);
        }
      }
    }

    _createClass(ObjectManager, [{
      key: "buildChildElement",
      value: function buildChildElement(elementId, text) {
        var el = document.getElementById("".concat(elementId, "_vis"));

        if (el) {
          return '';
        }

        var html = "\n      <article id='".concat(elementId, "_vis' class='websy-vis-article'></article>\n      <div id='").concat(elementId, "_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>\n    ");

        if (text && text !== '') {
          html += "\n        <i class='websy-vis-help-listener' data-element='".concat(elementId, "'></i>\n        <div id='").concat(elementId, "_help' class='websy-vis-help'><span>").concat(text || '', "</span></div>        \n      ");
        }

        return html;
      }
    }, {
      key: "mergeObjects",
      value: function mergeObjects() {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0; // Check if a deep merge

        if (typeof arguments[0] === 'boolean') {
          deep = arguments[0];
          i++;
        } // Merge the object into the extended object


        var merge = function merge(obj) {
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                // If we're doing a deep merge and the property is an object
                extended[prop] = this.mergeObjects(true, extended[prop], obj[prop]);
              } else {
                // Otherwise, do a regular merge
                if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
                  extended[prop] = extended[prop].concat(obj[prop]);
                } else {
                  extended[prop] = obj[prop];
                }
              }
            }
          }
        }; // Loop through each object and conduct a merge


        for (; i < arguments.length; i++) {
          merge(arguments[i]);
        }

        return extended;
      }
    }, {
      key: "init",
      value: function init() {
        var _this18 = this;

        return new Promise(function (resolve, reject) {
          _this18.prep('global');

          _this18.connectToApp().then(function () {
            _this18.executeAction(0, _this18.options.initialActions, function () {
              _this18.selectFromUrl(function () {
                resolve();
              });
            });
          }, reject);
        });
      }
    }, {
      key: "pause",
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: "play",
      value: function play(resume, excludeViews) {
        if (typeof excludeViews === 'undefined') {
          excludeViews = [];
        }

        this.paused = false;

        if (resume === true) {
          if (excludeViews.indexOf('global') === -1) {
            this.loadObjects('global');
          }

          for (var i = 0; i < this.activeViews.length; i++) {
            if (excludeViews.indexOf(this.activeViews[i]) === -1) {
              this.loadObjects(this.activeViews[i]);
            }
          }
        }
      }
    }, {
      key: "request",
      value: function request(method, url, data, responseType) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.responseType = 'text';

          if (responseType) {
            xhr.responseType = responseType;
          }

          xhr.withCredentials = true;

          xhr.onload = function () {
            var response = xhr.responseType === 'text' ? xhr.responseText : xhr.response;

            if (response !== '' && response !== 'null') {
              try {
                response = JSON.parse(response);
              } catch (e) {// Either a bad Url or a string has been returned
              }
            } else {
              response = null;
            }

            if (response.err) {
              reject(JSON.stringify(response));
            } else {
              resolve(response);
            }
          };

          xhr.onerror = function () {
            return reject(xhr.statusText);
          };

          if (data) {
            xhr.send(JSON.stringify(data));
          } else {
            xhr.send();
          }
        });
      }
    }, {
      key: "prep",
      value: function prep(view) {
        var _this19 = this;

        // for (let view in this.options.views) {
        // sort out the elements in each view
        for (var o = 0; o < this.options.views[view].objects.length; o++) {
          var config = this.options.views[view].objects[o];
          var el = document.getElementById(config.elementId);

          if (el) {
            el.innerHTML += this.buildChildElement(config.elementId, config.help);

            if (config.help && config.help !== '') {
              el.addEventListener(this.options.helpEvent, this.handleEvent.bind(this));
              el.addEventListener('mouseout', this.handleEvent.bind(this));
            }
          }
        } // }    
        // setup  the event listeners for the actions
        // actions should not have a visualisation in the same property structure


        var _loop = function _loop(a) {
          var el = document.getElementById(_this19.options.actions[a].elementId);

          if (el) {
            el.addEventListener(_this19.options.actions[a].event, function () {
              var _loop2 = function _loop2(i) {
                var item = _this19.options.actions[a].items[i];

                if (item.field) {
                  _this19.app.getField(item.field).then(function (field) {
                    field[item.method].apply(field, _toConsumableArray(item.params));
                  });
                } else {
                  var _this19$app;

                  (_this19$app = _this19.app)[item.method].apply(_this19$app, _toConsumableArray(item.params));
                }
              };

              for (var i = 0; i < _this19.options.actions[a].items.length; i++) {
                _loop2(i);
              }
            });
          }
        };

        for (var a = 0; a < this.options.actions.length; a++) {
          _loop(a);
        }

        this.options.views[view].prepped = true;
      }
    }, {
      key: "connectToApp",
      value: function connectToApp() {
        var _this20 = this;

        return new Promise(function (resolve, reject) {
          // check for enigma.js      
          var originalId = _this20.options.enigmaConfig.app;

          if (_this20.options.enigmaConfig.app) {
            _this20.options.enigmaConfig.app = _this20.normalizeId(_this20.options.enigmaConfig.app);
          }

          if (typeof enigma === 'undefined') {
            reject({
              error: 'Enigma.js not found.'
            });
            return;
          }

          if (typeof _this20.options.enigmaSchema === 'undefined') {
            reject({
              error: 'enigmaSchema property not found.'
            });
            return;
          }

          var url = _this20.options.enigmaConfig.url;

          if (_this20.options.enigmaConfig.ticket) {
            if (url.indexOf('?') === -1) {
              url += '?';
            } else {
              url += '&';
            }

            url += "qlikTicket=".concat(_this20.options.enigmaConfig.ticket);
          }

          var config = {
            schema: _this20.options.enigmaSchema,
            url: url
          };
          var session = enigma.create(config);
          _this20.session = session;
          session.open().then(function (global) {
            _this20.global = global;
            global.getActiveDoc().then(function (app) {
              if (app) {
                _this20.app = app;

                if (_this20.options.views.global) {
                  _this20.executeActions('global').then(function () {
                    resolve();
                  });
                } else {
                  resolve();
                }
              } else {
                return _this20.openApp(originalId).then(function () {
                  resolve();
                });
              }
            }, function (err) {
              var e = err;

              if (originalId) {
                return _this20.openApp(originalId).then(function () {
                  resolve();
                }, function (err) {
                  _this20.sessionOnNotification({
                    err: err
                  });
                });
              } else {
                resolve();
              }
            });

            if (_this20.options.keepAlive === true) {
              _this20.keepAlive();
            }
          }, function (err) {
            reject(err);
          });
          session.on('traffic:received', function (data) {
            if (typeof data.suspend !== 'undefined') {
              _this20.sessionSuspended();
            }
          });
          session.on('notification:*', function (eventName, data) {
            if (eventName === 'OnAuthenticationInformation') {
              if (data.mustAuthenticate === true) {
                if (_this20.options.enigmaConfig.authUrl) {
                  window.location = _this20.options.enigmaConfig.authUrl + window.location.search.replace('?', '%3F').replace('=', '%3D');
                } else if (_this20.options.enigmaConfig.onMustAuthenticate) {
                  _this20.options.enigmaConfig.onMustAuthenticate();
                } else if (data.loginUri) {
                  window.location = data.loginUri;
                }
              } else if (data.mustAuthenticate === false) {
                _this20.user = {
                  userDirectory: data.userDirectory,
                  userId: data.userId
                };
              }
            } else {
              _this20.sessionOnNotification(data);
            }
          });
          session.on('suspended', _this20.sessionSuspended.bind(_this20));
          session.on('resumed', _this20.sessionResumed.bind(_this20));
          session.on('closed', _this20.sessionClosed.bind(_this20));
        });
      }
    }, {
      key: "closeApp",
      value: function closeApp() {
        this.session.close();
        this.app = null;

        for (var view in this.options.views) {
          this.options.views[view].objects.forEach(function (o) {
            delete o.objectId;
            delete o.vis;
            o.attached = false;
          });
          delete this.options.views[view];
        }
      }
    }, {
      key: "keepAlive",
      value: function keepAlive() {
        var _this21 = this;

        this.global.engineVersion();
        setTimeout(function () {
          _this21.keepAlive();
        }, 59000);
      }
    }, {
      key: "openApp",
      value: function openApp(appId) {
        var _this22 = this;

        return new Promise(function (resolve, reject) {
          _this22.global.openDoc(appId).then(function (app) {
            _this22.app = app;

            if (_this22.options.views.global) {
              _this22.executeActions('global').then(function () {
                resolve();
              });
            } else {
              resolve();
            }
          }, function (err) {
            reject(err);
          });
        });
      }
    }, {
      key: "loadView",
      value: function loadView(view, force) {
        var _this23 = this;

        if (typeof force === 'undefined') {
          force = false;
        }

        if (this.paused === true && force === false) {
          return;
        }

        if (view === '' || !this.options.views[view]) {
          return;
        }

        if (this.activeViews.indexOf(view) === -1 && view !== 'global') {
          this.activeViews.push(view);
        }

        if (this.options.views[view].controller && this.options.views[view].initialized !== true) {
          this.options.views[view].controller.init(function () {
            _this23.options.views[view].initialized = true;

            if (_this23.options.views[view].prepped !== true) {
              _this23.prep(view);
            }

            _this23.executeActions(view).then(function () {
              if ((_this23.globalObjectsLoaded === false || _this23.options.alwaysLoadGlobal === true) && view !== 'global') {
                _this23.loadObjects('global', force);

                _this23.globalObjectsLoaded = true;
              }

              _this23.loadObjects(view, force);

              if (view === 'global') {
                _this23.globalObjectsLoaded = true;
              }
            });
          });
        } else {
          if (this.options.views[view].prepped !== true) {
            this.prep(view);
          }

          this.executeActions(view).then(function () {
            if ((_this23.globalObjectsLoaded === false || _this23.options.alwaysLoadGlobal === true) && view !== 'global') {
              _this23.loadObjects('global', force);

              _this23.globalObjectsLoaded = true;
            }

            _this23.loadObjects(view, force);

            if (view === 'global') {
              _this23.globalObjectsLoaded = true;
            }
          });
        }
      }
    }, {
      key: "executeAction",
      value: function executeAction(index, actionList, callbackFn) {
        var _this24 = this;

        var item = actionList[index];

        if (item.field) {
          this.app.getField(item.field).then(function (field) {
            field[item.method].apply(field, _toConsumableArray(item.params)).then(function () {
              if (item.lock === true) {
                field.lock().then(function () {
                  index++;

                  if (index === actionList.length) {
                    callbackFn();
                  } else {
                    _this24.executeAction(index, actionList, callbackFn);
                  }
                });
              } else {
                index++;

                if (index === actionList.length) {
                  callbackFn();
                } else {
                  _this24.executeAction(index, actionList, callbackFn);
                }
              }
            });
          });
        } else {
          var _this$app;

          (_this$app = this.app)[item.method].apply(_this$app, _toConsumableArray(item.params)).then(function () {
            index++;

            if (index === actionList.length) {
              callbackFn();
            } else {
              _this24.executeAction(index, actionList, callbackFn);
            }
          });
        }
      }
    }, {
      key: "executeActions",
      value: function executeActions(view) {
        var _this25 = this;

        return new Promise(function (resolve, reject) {
          if (!_this25.options.views[view] || !_this25.options.views[view].actions || _this25.options.views[view].actions.length === 0) {
            resolve();
          }

          _this25.executeAction(0, _this25.options.views[view].actions, resolve);
        });
      }
    }, {
      key: "loadObjects",
      value: function loadObjects(view, force) {
        var _this26 = this;

        if (typeof force === 'undefined') {
          force = false;
        }

        if (this.paused === true && force === false) {
          return;
        }

        var objList = this.options.views[view].objects;

        if (objList && objList.length > 0) {
          var _loop3 = function _loop3(i) {
            if (objList[i].objectId) {
              objList[i].attached = true;

              if (objList[i].vis && objList[i].vis.render) {
                objList[i].vis.render();
              } else if (objList[i].render) {
                objList[i].render(objList[i], objList[i].model);
              }
            } else if (objList[i].definition) {
              if (typeof objList[i].definition === 'string' && objList[i].definition.toLowerCase().indexOf('.json') !== -1) {
                _this26.request('GET', objList[i].definition).then(function (def) {
                  objList[i].definition = def;

                  _this26.createObjectFromDefinition(objList[i]);
                });
              } else {
                _this26.createObjectFromDefinition(objList[i]);
              }
            } else {
              _this26.createObjectFromDefinition(objList[i]);
            }
          };

          for (var i = 0; i < objList.length; i++) {
            _loop3(i);
          }
        }
      }
    }, {
      key: "closeObjects",
      value: function closeObjects(view) {
        if (view === '' || !this.options.views[view]) {
          return;
        }

        var viewIsActive = this.activeViews.indexOf(view);

        if (viewIsActive !== -1) {
          this.activeViews.splice(viewIsActive, 1);
        }

        var objList = this.options.views[view].objects;

        if (objList && objList.length > 0) {
          for (var i = 0; i < objList.length; i++) {
            if (objList[i].vis) {
              objList[i].attached = false;

              if (objList[i].vis.close) {
                objList[i].vis.close();
              }
            } else if (objList[i].objectId) {
              if (objList[i].close) {
                objList[i].close();
              }

              this.destroyObjectFromId(objList[i]);
            }
          }
        }
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        if (event.target.classList.contains('websy-vis-help-listener')) {
          var elementId = event.target.attributes['data-element'];

          if (elementId.value) {
            this.toggleHelp("".concat(elementId.value, "_help"));
          }
        }
      }
    }, {
      key: "createObjectFromDefinition",
      value: function createObjectFromDefinition(objectConfig) {
        var _this27 = this;

        if (objectConfig.definition && this.app) {
          var method = 'createSessionObject';
          var params = objectConfig.definition;

          if (objectConfig.definition.qField) {
            method = 'getField';
            params = objectConfig.definition.qField;
          }

          this.app[method](params).then(function (model) {
            objectConfig.objectId = model.id;
            objectConfig.attached = true;

            if (_this27.supportedChartTypes.indexOf(objectConfig.definition.qInfo.qType) !== -1) {
              var options = _extends({}, objectConfig.options, {
                model: model,
                def: objectConfig.definition,
                app: _this27.app
              });

              objectConfig.vis = new _this27.chartLibrary[objectConfig.definition.qInfo.qType]("".concat(objectConfig.elementId, "_vis"), options);
              model.on('changed', function () {
                if (objectConfig.attached === true && _this27.paused === false) {
                  objectConfig.vis.render();
                }
              });
            } else if (objectConfig.render && typeof objectConfig.render === 'function') {
              objectConfig.vis = {};
              objectConfig.attached = true;
              objectConfig.model = model;
              objectConfig.render(objectConfig, model);
              model.on('changed', function () {
                if (objectConfig.attached === true && _this27.paused === false) {
                  objectConfig.render(objectConfig, model);
                }
              });
            }
          });
        } else if (objectConfig.type) {
          objectConfig.objectId = objectConfig.elementId;
          objectConfig.attached = true;
          objectConfig.vis = new this.chartLibrary[objectConfig.type]("".concat(objectConfig.elementId, "_vis"), objectConfig.options || {});
        }
      }
    }, {
      key: "destroyObjectFromId",
      value: function destroyObjectFromId(objectConfig) {
        var hostEl = document.getElementById("".concat(objectConfig.elementId, "_vis"));

        if (hostEl) {
          hostEl.innerHTML = '';
        }

        this.app.destroySessionObject(objectConfig.objectId);
      }
    }, {
      key: "detachObject",
      value: function detachObject(objectConfig) {
        objectConfig.attached = false;
      }
    }, {
      key: "normalizeId",
      value: function normalizeId(id) {
        return id.replace(/\s:\\\//, '-');
      }
    }, {
      key: "sessionOnNotification",
      value: function sessionOnNotification(event) {
        if (this.options.sessionOnNotification) {
          this.options.sessionOnNotification(event);
        }
      }
    }, {
      key: "sessionOnTraffic",
      value: function sessionOnTraffic(event) {
        if (this.options.sessionOnTraffic) {
          this.options.sessionOnTraffic(event);
        }
      }
    }, {
      key: "sessionResumed",
      value: function sessionResumed(event) {
        if (this.options.sessionResumed) {
          this.options.sessionResumed(event);
        }
      }
    }, {
      key: "sessionSuspended",
      value: function sessionSuspended(event) {
        if (this.options.sessionSuspended) {
          this.options.sessionSuspended(event);
        }
      }
    }, {
      key: "sessionClosed",
      value: function sessionClosed(event) {
        if (this.options.sessionClosed) {
          this.options.sessionClosed(event);
        }
      }
    }, {
      key: "showHelp",
      value: function showHelp(elementId) {
        var el = document.getElementById(elementId);

        if (el) {
          el.classList.add('active');
        }
      }
    }, {
      key: "hideHelp",
      value: function hideHelp(elementId) {
        var el = document.getElementById(elementId);

        if (el) {
          el.classList.remove('active');
        }
      }
    }, {
      key: "toggleHelp",
      value: function toggleHelp(elementId) {
        var el = document.getElementById(elementId);

        if (el) {
          el.classList.toggle('active');
        }
      }
    }, {
      key: "onError",
      value: function onError(err) {
        console.log(err);
      }
    }, {
      key: "onClose",
      value: function onClose(msg) {}
    }, {
      key: "resize",
      value: function resize() {
        for (var i = 0; i < this.activeViews.length; i++) {
          this.resizeObjects(this.activeViews[i]);
        }
      }
    }, {
      key: "resizeObjects",
      value: function resizeObjects(view) {
        if (view === '') {
          return;
        }

        var objList = this.options.views[view].objects;

        if (objList && objList.length > 0) {
          for (var i = 0; i < objList.length; i++) {
            if (objList[i].objectId) {
              if (objList[i].vis && objList[i].vis.resize) {
                objList[i].vis.resize();
              } else if (objList[i].resize) {
                objList[i].resize();
              }
            }
          }
        }
      }
    }, {
      key: "registerVisualisation",
      value: function registerVisualisation(name, classDef) {
        if (name.indexOf(/\s/) !== -1) {
          console.log('Failed to register Chart Extension. Chart name must not contain spaces.');
          return;
        }

        if (this.supportedChartTypes.indexOf(name) !== -1) {
          console.log('Failed to register Chart Extension. Chart name already exists.');
          return;
        }

        this.supportedChartTypes.push(name);
        this.chartLibrary[name] = classDef;
      }
    }, {
      key: "select",
      value: function select(index, selections, callbackFn) {
        var _this28 = this;

        if (index === selections.length) {
          callbackFn();
          return;
        }

        if (selections[index].param === 'select') {
          this.app.getField(selections[index].field, selections[index].state).then(function (f) {
            var values = selections[index].values.map(function (v) {
              var numRep = +v;

              if (!isNaN(numRep)) {
                return {
                  qNumber: numRep,
                  qIsNumeric: true
                };
              } else {
                var dateRep = new Date(v);

                if (!isNaN(dateRep.getDate())) {
                  return {
                    qNumber: WebsyDesigns.Utils.toQlikDate(dateRep),
                    qIsNumeric: true
                  };
                } else {
                  return {
                    qText: decodeURI(v)
                  };
                }
              }
            });
            f.selectValues(values).then(function () {
              index++;

              _this28.select(index, selections, callbackFn);
            });
          }, function (err) {
            console.log('field for selection not found', err);
            index++;

            _this28.select(index, selections, callbackFn);
          });
        }
      }
    }, {
      key: "selectFromUrl",
      value: function selectFromUrl(callbackFn) {
        if (this.options.applySelections === true && location.search !== '') {
          var selections = location.search.replace('?', '').split('&');
          selections = selections.map(function (s) {
            var parts = s.split('=');
            var parts2 = parts[1].split(',');
            var field = parts2.shift().replace(/%20/g, ' ');
            var state = '$';

            if (field.indexOf('::') !== -1) {
              // selection has a defined state
              state = field.split('::')[0];
              field = field.split('::')[1];
            }

            return {
              param: parts[0],
              field: field,
              state: state,
              values: parts2
            };
          }).filter(function (s) {
            return s.param === 'select' || s.param === 'setvariable';
          });
          this.select(0, selections, callbackFn);
        } else {
          callbackFn();
        }
      }
    }]);

    return ObjectManager;
  }();

  WebsyDesigns.QlikObjectManager = ObjectManager;
}
