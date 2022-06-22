"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _websyDesignsEs = _interopRequireDefault(require("@websy/websy-designs/dist/websy-designs-es6"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

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
    this.chart = new _websyDesignsEs["default"].WebsyChart(elementId);
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
    key: "checkForData",
    value: function checkForData() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.layout.qHyperCube.qDataPages[0] && _this2.layout.qHyperCube.qDataPages[0].qMatrix) {
          resolve();
        } else {
          _this2.options.model.getHyperCubeData('/qHyperCubeDef', [{
            qTop: 0,
            qLeft: 0,
            qWidth: _this2.layout.qHyperCube.qSize.qcx,
            qHeight: Math.floor(10000 / _this2.layout.qHyperCube.qSize.qcx)
          }]).then(function (pages) {
            _this2.layout.qHyperCube.qDataPages = pages;
            resolve();
          });
        }
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.chart.close();
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
        d = _websyDesignsEs["default"].Utils.toReduced(d, decimals, isPercentage, false, options.max);

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
      var _this3 = this;

      this.options.model.getLayout().then(function (layout) {
        _this3.layout = layout;

        _this3.checkForData().then(function () {
          var options = {};

          if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {
            options = _this3.transformMultiMeasure();
          } else if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length > 1) {
            options = _this3.transformMultiMeasure();
          } else if (layout.qHyperCube.qDimensionInfo.length > 1) {
            options = _this3.transformMultiDimensions();
          } else if (layout.qHyperCube.qDimensionInfo.length === 0 && layout.qHyperCube.qMeasureInfo.length > 0) {
            options = _this3.transformNoDimensions();
          }

          _this3.chart.render(options);
        });
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
      var _this4 = this;

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
        return _this4.formatValue(d, _this4.layout.qHyperCube.qMeasureInfo[0].options || {});
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
      var _this5 = this;

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
        return _this5.formatValue(d, _this5.layout.qHyperCube.qMeasureInfo[0].options || {});
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
      var _this6 = this;

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
        return _this6.formatValue(d, options || {});
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
                  value: _this6.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle
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
      var _this7 = this;

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

        series.key = _this7.createSeriesKey(m.qFallbackTitle);
        series.data = [];
        series.type = (m.options || {}).type || options.type || 'bar';
        series.accumulative = 0;

        if (m.axis === 'secondary') {
          // right hand axis
          _this7.addOptions(options.data[y2Axis], m.options || {}); // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        


          if (options.grouping !== 'stacked') {
            options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin);
            options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax);
          }

          options.data[y2Axis].scale = (m.options || {}).scale || y2Scale;
          options.data[y2Axis].title = m.qFallbackTitle;

          options.data[y2Axis].formatter = function (d) {
            return _this7.formatValue(d, _extends({}, m.options, options.data[y2Axis]));
          };
        } else {
          _this7.addOptions(options.data[yAxis], m.options || {}); // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)


          if (options.grouping !== 'stacked') {
            options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin);
            options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax);
          }

          console.log('max', options.data[yAxis].max);
          options.data[yAxis].scale = (m.options || {}).scale || yScale;
          options.data[yAxis].title = m.qFallbackTitle;

          options.data[yAxis].formatter = function (d) {
            return _this7.formatValue(d, _extends({}, m.options, options.data[yAxis]));
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
          return _this7.formatValue(d, _this7.layout.qHyperCube.qDimensionInfo[0].options || {});
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

          if ((_this7.layout.qHyperCube.qDimensionInfo[0].options || {}).scale === 'Time') {
            x.value = _this7.fromQlikDate(x.qNum);
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
          c.tooltipLabel = _this7.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle;
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
*/


var DatePicker = /*#__PURE__*/function () {
  function DatePicker(elementId, options) {
    _classCallCheck(this, DatePicker);

    var DEFAULTS = {
      mode: 'date',
      pageSize: 1000
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.picker = new _websyDesignsEs["default"].WebsyDatePicker(elementId, _extends({}, options, {
      onChange: this.onChange.bind(this)
    }));
    this.listening = true;
    this.render();
  }

  _createClass(DatePicker, [{
    key: "checkForData",
    value: function checkForData() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        if (_this8.listening === true) {
          _this8.listening = false;

          _this8.options.model.getListObjectData('/qListObjectDef', [{
            qTop: 0,
            qLeft: 0,
            qWidth: 1,
            qHeight: _this8.options.pageSize
          }]).then(function (pages) {
            _this8.layout.qListObject.qDataPages = [pages[0]];
            _this8.listening = true;
            resolve();
          }, function (err) {
            _this8.listening = true;
            reject(err);
          });
        }
      });
    }
  }, {
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
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        if (_this9.field) {
          resolve(_this9.field);
        } else {
          _this9.options.app.getField(f).then(function (field) {
            if (field) {
              _this9.field = field;
              resolve(_this9.field);
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
    value: function onChange(data, isRange) {
      var _this10 = this;

      console.log(data);
      var start;
      var end;
      var valueList = data.map(function (d) {
        if (_this10.options.mode === 'date') {
          return _this10.toQlikDate(d);
        } else {
          return d;
        }
      });
      var query = '';

      if (isRange) {
        query = "".concat(valueList[0]);

        if (valueList.length > 1) {
          query = ">=".concat(valueList[0], "<=").concat(valueList[valueList.length - 1]);
        }
      } else {
        query = valueList.join(' ');
      } // this.getField(this.options.selectField).then(field => {
      // set listening to false to stop Qlik from updating the state of the datepicker
      // this.listening = false
      // this.options.model.beginSelections('/qListObjectDef').then(() => {


      this.options.model.searchListObjectFor('/qListObjectDef', query).then(function () {
        _this10.options.model.acceptListObjectSearch('/qListObjectDef', false).then();
      }); // })    
      // })    
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      this.options.model.getLayout().then(function (layout) {
        _this11.layout = layout;

        _this11.checkForData().then(function () {
          var disabledDates = [];
          var min;
          var max;
          var selectedMin;
          var selectedMax;
          var selectedRange = [];

          if (layout.qListObject.qDataPages[0] && _this11.listening === true) {
            // ensure we have a complete calendar
            var completeDateList = {};
            var oneDay = 1000 * 60 * 60 * 24;
            var start;
            var end;

            if (_this11.options.mode === 'date') {
              start = _this11.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[0][0].qNum).getTime();
              end = _this11.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum).getTime();
            } else if (_this11.options.mode === 'year') {
              start = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum;
              end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum;

              if (start > end) {
                end = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum;
                start = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum;
                _this11.options.sortDirection = 'desc';
                _this11.picker.options.sortDirection = 'desc';
              }

              min = start;
              max = end;
              _this11.picker.options.minAllowedYear = start;
              _this11.picker.options.maxAllowedYear = end;
            }

            var diff = end - start;

            if (_this11.options.mode === 'date') {
              diff = diff / oneDay;
            }

            for (var i = 0; i < diff + 1; i++) {
              if (_this11.options.mode === 'date') {
                var temp = new Date(start + i * oneDay);
                temp.setHours(0, 0, 0);
                completeDateList[temp.getTime()] = {
                  qNum: _this11.toQlikDateNum(temp),
                  qState: 'Z'
                };
              } else if (_this11.options.mode === 'year') {
                completeDateList[start + i] = {
                  qNum: start + i,
                  qState: 'Z'
                };
              }
            }

            layout.qListObject.qDataPages[0].qMatrix.forEach(function (r, i, arr) {
              if (_this11.options.mode === 'date') {
                if (completeDateList[_this11.fromQlikDate(r[0].qNum).getTime()]) {
                  completeDateList[_this11.fromQlikDate(r[0].qNum).getTime()] = r[0];
                }

                if (i === 0) {
                  min = _this11.fromQlikDate(r[0].qNum);
                } else if (i === arr.length - 1) {
                  max = _this11.fromQlikDate(r[0].qNum);
                }
              } else if (_this11.options.mode === 'year') {
                if (completeDateList[r[0].qNum]) {
                  completeDateList[r[0].qNum] = r[0];
                } // if (i === 0) {
                //   min = r[0].qNum
                // }
                // if (i === arr.length - 1) {
                //   max = r[0].qNum
                // } 

              }
            });
            var completeDateListArr = Object.values(completeDateList);
            completeDateListArr.forEach(function (d) {
              if (d.qState === 'S') {
                selectedRange.push(_this11.options.mode === 'date' ? _this11.fromQlikDate(d.qNum) : d.qNum);
              } // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {


              if (['Z'].indexOf(d.qState) !== -1) {
                disabledDates.push(_this11.options.mode === 'date' ? _this11.fromQlikDate(d.qNum) : d.qNum);
              }
            });

            _this11.picker.setDateBounds([min, max]);

            if (selectedRange.length !== layout.qListObject.qDataPages[0].qMatrix.length) {// do nothing because all values are selected
            } else if (selectedRange.length > 0) {
              _this11.picker.selectCustomRange([selectedRange[0], selectedRange[selectedRange.length - 1] || selectedRange[0]]);
            }

            _this11.picker.render(disabledDates);

            _this11.listening = true;
          }
        });
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
    var DEFAULTS = {
      pageSize: 100,
      path: '',
      useVariable: false
    };
    this.options = _extends({}, DEFAULTS, options);

    if (!options.def) {
      options.def = {
        options: {}
      };
    }

    this.busy = false;
    this.dropdownOptions = _extends({}, options, options.def.options || {}, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),
      onCancelSearch: this.cancelSearch.bind(this),
      onScroll: this.handleScroll.bind(this)
    });
    this.dropdown = new _websyDesignsEs["default"].WebsyDropdown(elementId, this.dropdownOptions);
    this.render();
  }

  _createClass(Dropdown, [{
    key: "cancelSearch",
    value: function cancelSearch(value) {
      this.options.model.abortListObjectSearch("/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/'));
    }
  }, {
    key: "checkForData",
    value: function checkForData() {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        if (_this12.busy === false) {
          _this12.busy = true;

          _this12.options.model.getListObjectData("/".concat(_this12.options.path, "/qListObjectDef").replace(/\/\//g, '/'), [{
            qTop: _this12.rowsLoaded,
            qLeft: 0,
            qWidth: 1,
            qHeight: _this12.options.pageSize
          }]).then(function (pages) {
            if (_this12.options.path !== '') {
              _this12.layout[_this12.options.path].qListObject.qDataPages[0].qMatrix = _this12.layout[_this12.options.path].qListObject.qDataPages[0].qMatrix.concat((pages[0] || {
                qMatrix: []
              }).qMatrix);
              _this12.rowsLoaded = _this12.layout[_this12.options.path].qListObject.qDataPages[0].qMatrix.length;
            } else {
              if (!_this12.layout.qListObject.qDataPages[0]) {
                _this12.layout.qListObject.qDataPages[0] = {
                  qMatrix: []
                };
              }

              _this12.layout.qListObject.qDataPages[0].qMatrix = _this12.layout.qListObject.qDataPages[0].qMatrix.concat((pages[0] || {
                qMatrix: []
              }).qMatrix);
              _this12.rowsLoaded = _this12.layout.qListObject.qDataPages[0].qMatrix.length;
            }

            _this12.busy = false;
            resolve();
          }, function (err) {
            _this12.busy = false;
            reject(err);
          });
        }
      });
    }
  }, {
    key: "checkForVariable",
    value: function checkForVariable() {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        if (_this13.options.useVariable === true && _this13.options.variable && _this13.options.app) {
          _this13.options.app.getVariableByName(_this13.options.variable).then(function (v) {
            v.getLayout().then(function (layout) {
              resolve(layout);
            });
          });
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "clearSelected",
    value: function clearSelected() {
      this.options.model.clearSelections("/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/'));
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var _this14 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.checkForData().then(function () {
          _this14.dropdown.data = _this14.transformData();
        });
      }
    }
  }, {
    key: "itemSelected",
    value: function itemSelected(item, selectedIndexes, items) {
      if (this.options.useVariable === true && this.options.variable && this.options.app) {
        this.options.app.getVariableByName(this.options.variable).then(function (v) {
          if (item.qNum === 'NaN') {
            v.setStringValue(item.qText);
          } else {
            v.setNumValue(item.qNum);
          }
        });
      } else {
        this.options.model.selectListObjectValues("/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/'), [item.qElemNumber], this.dropdown.options.multiSelect === true);
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.dropdown.open();
    }
  }, {
    key: "render",
    value: function render() {
      var _this15 = this;

      this.rowsLoaded = 0;
      this.options.model.getLayout().then(function (layout) {
        _this15.layout = layout;

        _this15.checkForVariable().then(function (variableValue) {
          var listObject = _this15.options.path !== '' ? _this15.layout[_this15.options.path].qListObject : _this15.layout.qListObject;

          if (!listObject.qDataPages || listObject.qDataPages.length === 0) {
            listObject.qDataPages = [{
              qMatrix: []
            }];
          }

          _this15.rowsLoaded = listObject.qDataPages[0].qMatrix.length;

          _this15.checkForData().then(function () {
            if (listObject.qDataPages[0]) {
              _this15.dropdown.options.label = listObject.qDimensionInfo.qFallbackTitle;
              _this15.dropdown.data = _this15.transformData(variableValue);
            }
          });
        });
      });
    }
  }, {
    key: "search",
    value: function search(value) {
      this.options.model.searchListObjectFor("/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/'), "*".concat(value, "*"));
    }
  }, {
    key: "transformData",
    value: function transformData(variableValue) {
      var indexes = {};
      var listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject;
      var flatList = listObject.qDataPages[0].qMatrix.map(function (r) {
        return r[0].qText;
      });

      if (this.options.hideExcluded === true) {
        listObject.qDataPages[0].qMatrix = listObject.qDataPages[0].qMatrix.filter(function (r) {
          return ['X', 'XS', 'XL'].indexOf(r[0].qState) === -1;
        });
      }

      if (variableValue) {
        var index = flatList.indexOf(variableValue.qText);

        if (index !== -1) {
          this.dropdown.selectedItems = [index];
        }
      } else {
        listObject.qDataPages[0].qMatrix.forEach(function (r, i) {
          if (!indexes[r[0].qState]) {
            indexes[r[0].qState] = [];
          }

          indexes[r[0].qState].push(i);
        });

        if (indexes.S && indexes.S.length > 0) {
          this.dropdown.selectedItems = indexes.S;
        } else if (indexes.S && indexes.S.length === 0 && indexes.O && indexes.O.length === 1) {
          this.dropdown.selectedItems = indexes.O;
        } else {
          this.dropdown.selectedItems = [];
        }
      }

      return listObject.qDataPages[0].qMatrix.map(function (r) {
        return _extends(r[0], {
          label: r[0].qText || '-',
          classes: ["state-".concat(r[0].qState)]
        });
      });
    }
  }]);

  return Dropdown;
}();
/* global WebsyDesigns */


var KPI = /*#__PURE__*/function () {
  function KPI(elementId, options) {
    _classCallCheck(this, KPI);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.kpiOptions = {};
    this.kpi = new _websyDesignsEs["default"].WebsyKPI(elementId, this.kpiOptions);
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
      var _this16 = this;

      this.options.model.getLayout().then(function (layout) {
        var decimals = 2;
        var v = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
        _this16.kpiOptions.value = {
          value: v
        };
        _this16.kpiOptions.label = {
          value: layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle
        };

        if (layout.icon) {
          _this16.kpiOptions.icon = "".concat(window.location.origin, "/resources/svg/").concat(layout.icon, ".svg");
        }

        if (layout.tooltip && layout.tooltip.value) {
          _this16.kpiOptions.tooltip = {
            value: layout.tooltip.value
          };

          if (layout.tooltip.classes) {
            _this16.kpiOptions.tooltip.classes = layout.tooltip.classes;
          }
        }

        _this16.kpiOptions.subValue = {
          value: ''
        };

        if (layout.kpi.qHyperCube.qMeasureInfo[1]) {
          var _decimals = 2;

          if (typeof layout.kpi.qHyperCube.qMeasureInfo[1].decimals !== 'undefined') {
            _decimals = layout.kpi.qHyperCube.qMeasureInfo[1].decimals;
          }

          var v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText;
          _this16.kpiOptions.subValue = {
            value: "".concat(layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle, " ").concat(v1)
          };
        }

        _this16.kpi.render(_this16.kpiOptions);
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
    var _this17 = this;

    _classCallCheck(this, GeoMap);

    this.elementId = elementId;
    var DEFAULTS = {
      geoFillColor: '#783c96',
      geoAutoFill: true,
      geoShowTooltip: true
    };
    this.options = _extends({}, DEFAULTS, options, options.def.options);

    if (this.options.geoJSON && typeof this.options.geoJSON === 'string') {
      _websyDesignsEs["default"].service.get(this.options.geoJSON).then(function (geoJSON) {
        _this17.geoJSON = geoJSON;
        delete _this17.options.geoJSON;
        _this17.map = new _websyDesignsEs["default"].WebsyMap(elementId, _this17.options);

        _this17.render();
      });
    } else {
      this.map = new _websyDesignsEs["default"].WebsyMap(elementId, this.options);
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
      var _this18 = this;

      var el = document.getElementById(this.elementId);

      if (el.parentElement) {
        el.parentElement.classList.add('loading');
      }

      this.options.model.getLayout().then(function (layout) {
        if (layout.options) {
          _this18.options = _extends({}, layout.options);
          _this18.map.options = _extends({}, _this18.map.options, layout.options);
        }

        if (layout.qHyperCube.qDataPages[0]) {
          if (_this18.geoJSON) {
            var geoJSON = {
              type: 'FeatureCollection',
              features: []
            };
            layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
              var p = _this18.findGeoJsonByProperty(r[0].qText);

              if (p) {
                if (_this18.options.geoAutoFill === true) {
                  p.fillColor = _this18.options.geoFillColor;
                  p.fillOpacity = 0.4 + r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax * 0.6;
                }

                if (r[1].qAttrExps && r[1].qAttrExps.qValues && r[1].qAttrExps.qValues[0] && r[1].qAttrExps.qValues[0].qText) {
                  p.fillColor = r[1].qAttrExps.qValues[0].qText;
                }

                if (_this18.options.geoShowTooltip === true) {
                  p.tooltip = "".concat(r[1].qText, "<br>").concat(p.properties.label);
                  p.tooltipClass = 'websy-map-tooltip';
                }

                geoJSON.features.push(p);
              }
            });
            _this18.map.options.geoJSON = geoJSON;
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
          _this18.map.options.data = data;

          if (el.parentElement) {
            el.parentElement.classList.remove('loading');
          }

          _this18.map.render();
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
    this.pageNum = 0;
    this.pageCount = 0;
    this.errorCount = 0;
    this.retryFn = null;
    this.pivotIndent = false;
    this.busy = false;
    this.table = new _websyDesignsEs["default"].WebsyTable(this.elementId, _extends({}, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),
      onSort: this.handleSort.bind(this),
      onChangePageSize: this.setPageSize.bind(this),
      onSetPage: this.setPageNum.bind(this)
    }, this.options));
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
      var _this19 = this;

      if (this.busy === false) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            _this19.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length;
            _this19.busy = false;

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
                if (_this19.layout.qHyperCube.qMode === 'P') {
                  _this19.layout.qHyperCube.qPivotDataPages.push(pages[0]);

                  _this19.rowCount += pages[0].qData.length;
                } else {
                  pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                    return r[0].qText !== '-';
                  });

                  _this19.layout.qHyperCube.qDataPages.push(pages[0]);

                  _this19.rowCount += pages[0].qMatrix.length;
                }

                _this19.busy = false;

                if (callbackFn) {
                  if (_this19.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              var e = err;

              if (_this19.errorCount < 50) {
                _this19.errorCount++;
                console.log('error getting data, attempt', _this19.errorCount);
                clearTimeout(_this19.retryFn);
                _this19.retryFn = setTimeout(function () {
                  _this19.getData(callbackFn);
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
    key: "getFontColor",
    value: function getFontColor(c) {
      var colorParts;
      var red;
      var green;
      var blue;

      if (c.indexOf('#') !== -1) {
        // hex color
        colorParts = c.toLowerCase().replace('#', '');
        colorParts = colorParts.split('');
        red = parseInt(colorParts[0] + colorParts[1], 16);
        green = parseInt(colorParts[2] + colorParts[3], 16);
        blue = parseInt(colorParts[4] + colorParts[5], 16);
      } else if (c.toLowerCase().indexOf('rgb') !== -1) {
        // rgb color
        colorParts = c.toLowerCase().replace('rgb(', '').replace(')', '');
        colorParts = colorParts.split(',');
        red = colorParts[0];
        green = colorParts[1];
        blue = colorParts[2];
      }

      return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
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
      var _this20 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this20.appendRows(_this20.transformData(page));
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
      this.options.model.applyPatches(patchDefs, true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this21 = this;

      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.table.showLoading({
        message: 'Loading...'
      });
      this.options.model.getLayout().then(function (layout) {
        console.log(layout);
        _this21.layout = layout;
        _this21.rowCount = pageNum * _this21.options.pageSize;
        _this21.errorCount = 0;
        _this21.pageNum = pageNum;
        _this21.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / _this21.options.pageSize);
        _this21.table.options.pageNum = _this21.pageNum;
        _this21.table.options.pageCount = _this21.pageCount;

        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          _this21.table.hideLoading();

          _this21.table.showError({
            message: _this21.options.customError || layout.qHyperCube.qCalcCondMsg
          });

          return;
        }

        _this21.dataWidth = _this21.layout.qHyperCube.qSize.qcx;
        _this21.columnOrder = _this21.layout.qHyperCube.qColumnOrder;

        if (typeof _this21.columnOrder === 'undefined') {
          _this21.columnOrder = new Array(_this21.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        var columns = _this21.layout.qHyperCube.qDimensionInfo.concat(_this21.layout.qHyperCube.qMeasureInfo);

        var activeSort = _this21.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
        columns = columns.map(function (c, i) {
          c.colIndex = _this21.columnOrder.indexOf(i);
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

        _this21.getData(function (page) {
          _this21.table.options.columns = columns;
          _this21.table.options.activeSort = activeSort;

          _this21.table.hideLoading();

          _this21.table.render();

          if (page.err) {
            var tableEl = document.getElementById("".concat(_this21.elementId, "_foot"));
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          } else {
            _this21.appendRows(_this21.transformData(page));
          }
        });
      }, function (err) {
        // try again      
        var e = err;

        if (_this21.errorCount < 50) {
          _this21.errorCount++;
          console.log('error getting layout, attempt', _this21.errorCount);
          clearTimeout(_this21.retryFn);
          _this21.retryFn = setTimeout(function () {
            _this21.render();
          }, 300);
        }
      });
    }
  }, {
    key: "setPageNum",
    value: function setPageNum(page) {
      this.render(page);
    }
  }, {
    key: "setPageSize",
    value: function setPageSize(size) {
      this.options.pageSize = size;
      this.render();
    }
  }, {
    key: "transformData",
    value: function transformData(page) {
      var _this22 = this;

      console.log('page', page);

      if (this.layout.qHyperCube.qMode === 'S') {
        return page.map(function (r) {
          return r.map(function (c, i) {
            if (_this22.table.options.columns[i].showAsLink === true || _this22.table.options.columns[i].showAsNavigatorLink === true) {
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

            if (c.qAttrExps && c.qAttrExps.qValues) {
              var t = 'qDimensionInfo';
              var tIndex = i;

              if (i > _this22.layout.qHyperCube.qDimensionInfo.length - 1) {
                t = 'qMeasureInfo';
                tIndex -= _this22.layout.qHyperCube.qDimensionInfo.length;
              }

              c.qAttrExps.qValues.forEach(function (a, aI) {
                if (a.qText && a.qText !== '') {
                  if (_this22.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this22.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                    c.backgroundColor = a.qText;
                  }
                }
              });
            }

            return c;
          });
        });
      } else {
        var data = this.transformPivotTable(page); // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
        // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
        // this.table.options.columns = columns        

        this.table.options.columns = data.shift();
        this.table.render();
        return data; // let rows = []
        // page.qData.forEach((r, i) => {
        //   rows.push([{ value: page.qLeft[i].qText, ...page.qLeft[i] }, ...r.map(c => {
        //     c.value = c.qText || '-'        
        //     if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
        //       c.backgroundColor = c.qAttrExps.qValues[0].qText
        //       let colorParts
        //       let red
        //       let green
        //       let blue
        //       if (c.backgroundColor.indexOf('#') !== -1) {
        //         // hex color
        //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '')
        //         colorParts = colorParts.split('')
        //         red = parseInt(colorParts[0] + colorParts[1], 16)
        //         green = parseInt(colorParts[2] + colorParts[3], 16)
        //         blue = parseInt(colorParts[4] + colorParts[5], 16)
        //       }
        //       else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
        //         // rgb color
        //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '')
        //         colorParts = colorParts.split(',')
        //         red = colorParts[0]
        //         green = colorParts[1]
        //         blue = colorParts[2]
        //       }
        //       c.color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
        //     }
        //     return c
        //   })])
        // })
        // return rows  
      }
    }
  }, {
    key: "transformPivotTable",
    value: function transformPivotTable(page) {
      var output = [];
      var leftNodes = [];
      var topNodes = [];
      var topNodesTransposed = [];
      var topCounter = 0;
      var accCellSpan = 0;
      var visibleLeftCount = 0;
      var visibleTopCount = 0;
      var visibleColCount = 0;
      var tempNode = [];

      for (var i = 0; i < page.qLeft.length; i++) {
        expandLeft.call(this, page.qLeft[i], 0, 0, null, []);
      }

      for (var _i = 0; _i < page.qTop.length; _i++) {
        expandTop.call(this, page.qTop[_i], 0, _i);
      }

      for (var r = 0; r < page.qData.length; r++) {
        var row = page.qData[r];

        for (var c = 0; c < row.length; c++) {
          row[c].pos = 'Data';

          if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
            row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText;
            row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText);
          }

          if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
            row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText);
          }

          var lastTop = topNodesTransposed[topNodesTransposed.length - 1][c];

          if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
            row[c].qType = 'T';
          }

          row[c].value = row[c].qText;
        }

        if (leftNodes[r]) {
          row = leftNodes[r].concat(row);
        }

        output.push(row);
      }

      var additionalTopCells = [];
      var additionalCellCount = visibleLeftCount;

      for (var _i2 = 0; _i2 < additionalCellCount; _i2++) {
        additionalTopCells.push({
          rowspan: 1,
          colSpan: 1,
          level: 0,
          qText: '',
          qType: 'V'
        });
      }

      if (visibleLeftCount !== 0) {
        for (var _i3 = 0; _i3 < topNodesTransposed.length; _i3++) {
          if (_i3 === topNodesTransposed.length - 1) {
            topNodesTransposed[_i3] = this.layout.qHyperCube.qDimensionInfo.filter(function (d) {
              return !d.qError;
            }).filter(function (d, dI) {
              return dI < visibleLeftCount;
            }).map(function (d) {
              return {
                name: d.qFallbackTitle
              };
            }).concat(topNodesTransposed[_i3]);
          } else {
            topNodesTransposed[_i3] = additionalTopCells.concat(topNodesTransposed[_i3]);
          }
        }
      }

      visibleColCount = topNodesTransposed[topNodesTransposed.length - 1];
      output = topNodesTransposed.concat(output); // This function is used to convert the qLeft structure from a parent/child hierarchy
      // into a 2 dimensions array    

      function expandLeft(input, level, index, parent, chain) {
        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Left';
        o.value = o.qText;
        input.value = input.qText;
        visibleLeftCount = Math.max(visibleLeftCount, level + 1);
        o.childCount = o.qSubNodes.length;

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
          o.backgroundColor = o.qAttrExps.qValues[0].qText;
          o.color = this.getFontColor(o.qAttrExps.qValues[0].qText);
        }

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
          o.color = this.getFontColor(o.qAttrExps.qValues[1].qText);
        }

        delete o.qSubNodes;

        if (typeof o.qText === 'undefined') {
          if (o.qElemNo === -1) {
            o.qText = 'Totals??';
          } else if (o.qElemNo === -4) {
            o.qText = '';
            o.qType = 'T';
          }
        }

        o.rowspan = Math.max(1, input.qSubNodes.length);
        input.rowspan = Math.max(1, input.qSubNodes.length);

        if (input.qSubNodes.length === 0) {
          leftNodes.push(tempNode.concat([o]));
          tempNode = [];
        } else {
          tempNode.push(o);

          for (var _i4 = 0; _i4 < input.qSubNodes.length; _i4++) {
            expandLeft.call(this, input.qSubNodes[_i4], level + 1, _i4, input, [].concat(_toConsumableArray(chain), [o]));
          }

          var s = 0;

          for (var _i5 = 0; _i5 < input.qSubNodes.length; _i5++) {
            s += input.qSubNodes[_i5].rowspan;
          }

          input.rowspan = s;
          o.rowspan = s;
        }
      } // This function is used to convert the qTop structure from a parent/child hierarchy
      // into a 2 dimensions array


      function expandTop(input, level, index, parent) {
        var _topNodesTransposed$l;

        if (typeof topNodesTransposed[level] === 'undefined') {
          topNodesTransposed[level] = [];
        }

        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Top';
        o.rowIndex = topCounter;
        o.topNode = true;
        o.isHeader = true;
        o.name = o.qText;

        if (!o.font) {
          o.font = {};
        }

        input.value = input.qText;

        if (o.qType === 'P') {
          o.qElemNo = -99;
        }

        o.childCount = o.qSubNodes.length;
        visibleTopCount = Math.max(visibleTopCount, level + 1);

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
          o.backgroundColor = o.qAttrExps.qValues[0].qText;
          o.color = this.getFontColor(o.qAttrExps.qValues[0].qText);
        }

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
          o.color = this.getFontColor(o.qAttrExps.qValues[1].qText);
        }

        delete o.qSubNodes;

        if (['T', 'E'].indexOf(o.qType) === -1) {
          o.qType = 'B';
        }

        if (typeof parent !== 'undefined') {
          if (parent.qType === 'T') {
            o.qType = parent.qType;
            input.qType = parent.qType;
          }
        }

        if (typeof o.qText === 'undefined') {
          if (o.qElemNo === -1) {
            o.qText = this.layout.tableTotalsLabel;
          } else if (o.qElemNo === -4) {
            o.qText = '';
            o.qType = 'T';
            input.qType = 'T';
          }
        }

        o.colSpan = Math.max(1, input.qSubNodes.length);
        input.colSpan = Math.max(1, input.qSubNodes.length);

        if (input.qSubNodes.length === 0) {
          if (o.qElemNo === -99 && o.qCanCollapse === true) {
            accCellSpan++;
          }
        } else {
          for (var _i6 = 0; _i6 < input.qSubNodes.length; _i6++) {
            expandTop.call(this, input.qSubNodes[_i6], level + 1, _i6, input);
          }

          var s = 0;

          for (var _i7 = 0; _i7 < input.qSubNodes.length; _i7++) {
            s += input.qSubNodes[_i7].colSpan;
          }

          o.rowIndex = topCounter;
          topCounter += s;
          o.colSpan = s;
          input.colSpan = s;

          if (o.qType === 'T' && o.qElemNo === -1) {
            accCellSpan += s;
          }

          if (o.qElemNo === -99) {
            accCellSpan++;
          }

          if (input.qCanExpand === true || input.qCanCollapse === true) {
            if (input.qSubNodes.length > 0 && input.qCanCollapse === true && typeof input.qSubNodes[0].rowIndex !== 'undefined') {
              input.rowIndex = input.qSubNodes[0].rowIndex;
              o.rowIndex = input.qSubNodes[0].rowIndex;
            } else {
              input.rowIndex = accCellSpan;
              o.rowIndex = accCellSpan;
              accCellSpan += o.colSpan;
            }
          }
        }

        var toPush = [o];

        if (o.colSpan > 1) {
          toPush = new Array(o.colSpan).fill(_objectSpread({}, o));
        }

        (_topNodesTransposed$l = topNodesTransposed[level]).push.apply(_topNodesTransposed$l, _toConsumableArray(toPush));
      }

      return output;
    }
  }]);

  return Table;
}();
/* global WebsyDesigns WebsyDesignsQlikPlugins:true Dropdown getAllData */


var Table2 = /*#__PURE__*/function () {
  function Table2(elementId, options) {
    _classCallCheck(this, Table2);

    var DEFAULTS = {
      pageSize: 50,
      cellHeight: 35,
      virtualScroll: false,
      columnOverrides: []
    };

    if (Dropdown) {
      if (!WebsyDesignsQlikPlugins) {
        ({}), _readOnlyError("WebsyDesignsQlikPlugins");
      }

      WebsyDesignsQlikPlugins.Dropdown = Dropdown;
    }

    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.rowCount = 0;
    this.pageNum = 0;
    this.pageCount = 0;
    this.errorCount = 0;
    this.leftDataCol = 0;
    this.topDataRow = 0;
    this.retryFn = null;
    this.pivotIndent = false;
    this.busy = false;
    this.dimensionWidth = 0;
    this.dropdowns = [];
    this.searchPrepped = false;
    this.table = new _websyDesignsEs["default"].WebsyTable2(this.elementId, _extends({}, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),
      onSort: this.handleSort.bind(this),
      onChangePageSize: this.setPageSize.bind(this),
      onSetPage: this.setPageNum.bind(this),
      onScrollX: this.handleVirtualScrollX.bind(this)
    }, this.options));
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
    }

    this.render();
  }

  _createClass(Table2, [{
    key: "appendRows",
    value: function appendRows(data) {
      this.table.appendRows(data);
    }
  }, {
    key: "getData",
    value: function getData(callbackFn) {
      var _this23 = this;

      if (this.busy === false) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            _this23.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length;
            _this23.busy = false;

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
                if (_this23.layout.qHyperCube.qMode === 'P') {
                  _this23.layout.qHyperCube.qPivotDataPages.push(pages[0]);

                  _this23.rowCount += pages[0].qData.length;
                } else {
                  pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                    return r[0].qText !== '-';
                  });

                  _this23.layout.qHyperCube.qDataPages.push(pages[0]);

                  _this23.rowCount += pages[0].qMatrix.length;
                }

                _this23.busy = false;

                if (callbackFn) {
                  if (_this23.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              var e = err;

              if (_this23.errorCount < 50) {
                _this23.errorCount++;
                console.log('error getting data, attempt', _this23.errorCount);
                clearTimeout(_this23.retryFn);
                _this23.retryFn = setTimeout(function () {
                  _this23.getData(callbackFn);
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
    key: "getFontColor",
    value: function getFontColor(c) {
      var colorParts;
      var red;
      var green;
      var blue;

      if (c.indexOf('#') !== -1) {
        // hex color
        colorParts = c.toLowerCase().replace('#', '');
        colorParts = colorParts.split('');
        red = parseInt(colorParts[0] + colorParts[1], 16);
        green = parseInt(colorParts[2] + colorParts[3], 16);
        blue = parseInt(colorParts[4] + colorParts[5], 16);
      } else if (c.toLowerCase().indexOf('rgb') !== -1) {
        // rgb color
        colorParts = c.toLowerCase().replace('rgb(', '').replace(')', '');
        colorParts = colorParts.split(',');
        red = colorParts[0];
        green = colorParts[1];
        blue = colorParts[2];
      }

      return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff';
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
      var _this24 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this24.appendRows(_this24.transformData(page));
        });
      }
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(event, column) {
      console.log(event, column);

      if (this.dropdowns[column.searchField]) {
        var el = document.getElementById("".concat(this.elementId, "_columnSearch_").concat(event.target.getAttribute('data-col-index')));

        if (el) {
          el.classList.toggle('active');
          el.style.top = "".concat(event.pageY, "px");
          el.style.right = "calc(100vw - ".concat(event.pageX + event.target.offsetWidth, "px)");
          this.dropdowns[column.searchField].open();
        }
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
      this.options.model.applyPatches(patchDefs, true);
    }
  }, {
    key: "handleVirtualScrollX",
    value: function handleVirtualScrollX(startPoint) {
      var handleWidth = this.columnParams.scrollableWidth * (this.columnParams.scrollableWidth / this.totalWidth); // let withoutScroll = this.columnParams.scrollableWidth - handleWidth
      // let realLeft = startPoint / withoutScroll * (this.totalWidth - handleWidth)

      var realLeft = startPoint / this.columnParams.scrollableWidth * this.totalWidth;
      var accWidth = 0;
      var leftDims = this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims;
      this.leftDataCol = 0;

      for (var i = leftDims; i < this.fullColumnList.length; i++) {
        if (realLeft >= +this.fullColumnList[i].width.replace('px', '') + accWidth) {
          accWidth += +this.fullColumnList[i].width.replace('px', '');
          this.leftDataCol = i; // - leftDims
        } else {
          break;
        }
      }

      if (this.fullColumnList.length - this.leftDataCol < this.columnsToRender) {
        this.leftDataCol = this.fullColumnList.length - this.columnsToRender + 1;
      } // console.log('col', startPoint / withoutScroll, realLeft, this.totalWidth, this.leftDataCol)


      this.resize();
    }
  }, {
    key: "prepDropdowns",
    value: function prepDropdowns() {
      var _this25 = this;

      // this.table.options.columns.forEach((c, i) => {
      //   if (c.searchable === true && c.searchField && this.layout[c.searchField] && this.layout[c.searchField].qListObject) {
      //     this.dropdowns[c.searchField] = new WebsyDesigns.QlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
      //       model: this.options.model,
      //       path: `${c.searchField}`
      //     })
      //   }
      // })
      this.layout.qHyperCube.qDimensionInfo.forEach(function (d, i) {
        if (!_this25.dropdowns["dim".concat(i)]) {
          _this25.dropdowns["dim".concat(i)] = new WebsyDesignsQlikPlugins.Dropdown("".concat(_this25.elementId, "_columnSearch_").concat(i), {
            model: _this25.options.model,
            path: "dim".concat(i)
          });
        }
      });
    }
  }, {
    key: "prepSearch",
    value: function prepSearch() {
      var _this26 = this;

      this.busy = true;
      this.options.model.getProperties().then(function (props) {
        console.log('props', props);
        var patches = [];
        props.qHyperCubeDef.qDimensions.forEach(function (d, i) {
          patches.push({
            qOp: 'add',
            qPath: "/dim".concat(i),
            qValue: JSON.stringify({
              qListObjectDef: {
                qDef: d.qDef,
                qLibraryId: d.qLibraryId
              }
            })
          });
        });

        _this26.options.model.applyPatches(patches, true).then(function () {
          _this26.busy = false;
          _this26.searchPrepped = true;

          _this26.render();
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this27 = this;

      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.searchPrepped === false) {
        this.prepSearch();
        return;
      }

      this.table.showLoading({
        message: 'Loading...'
      });
      this.options.model.getLayout().then(function (layout) {
        _this27.layout = layout;
        console.log('table layout', layout);
        _this27.rowCount = pageNum * _this27.options.pageSize;

        if (_this27.layout.qHyperCube.qPivotDataPages[0]) {
          _this27.layout.qHyperCube.qPivotDataPages = [];
        }

        _this27.errorCount = 0;
        _this27.pageNum = pageNum;
        _this27.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / _this27.options.pageSize);
        _this27.table.options.pageNum = _this27.pageNum;

        if (_this27.layout.qHyperCube.qNoOfLeftDims) {
          _this27.table.options.leftColumns = _this27.options.freezeColumns || _this27.layout.qHyperCube.qNoOfLeftDims;
        }

        _this27.table.options.pageCount = _this27.pageCount;

        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          _this27.table.hideLoading();

          _this27.table.showError({
            message: _this27.options.customError || layout.qHyperCube.qCalcCondMsg
          });

          return;
        }

        _this27.table.hideError();

        _this27.dataWidth = _this27.layout.qHyperCube.qSize.qcx;
        _this27.columnOrder = _this27.layout.qHyperCube.qColumnOrder;

        if (typeof _this27.columnOrder === 'undefined') {
          _this27.columnOrder = new Array(_this27.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        _this27.layout.qHyperCube.qDimensionInfo = _this27.layout.qHyperCube.qDimensionInfo.map(function (c, i) {
          if (_this27.options.columnOverrides[i]) {
            c = _objectSpread(_objectSpread({}, c), _this27.options.columnOverrides[i]);
          }

          c.searchable = true;
          c.searchField = "dim".concat(i);
          c.onSearch = _this27.handleSearch.bind(_this27);
          return c;
        });
        _this27.layout.qHyperCube.qMeasureInfo = _this27.layout.qHyperCube.qMeasureInfo.map(function (c, i) {
          if (_this27.options.columnOverrides[_this27.layout.qHyperCube.qDimensionInfo.length + i]) {
            c = _objectSpread(_objectSpread({}, c), _this27.options.columnOverrides[_this27.layout.qHyperCube.qDimensionInfo.length + i]);
          }

          return c;
        });

        var columns = _this27.layout.qHyperCube.qDimensionInfo.concat(_this27.layout.qHyperCube.qMeasureInfo);

        var activeSort = _this27.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
        columns = columns.map(function (c, i) {
          c.colIndex = _this27.columnOrder.indexOf(i);
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
          } // if (this.options.columnOverrides[i]) {
          //   c = {...c, ...this.options.columnOverrides[i]}
          // }


          if (c.searchable === true) {
            if (!c.onSearch) {
              c.onSearch = _this27.handleSearch.bind(_this27);
            }
          }

          return c;
        });
        columns.sort(function (a, b) {
          return a.colIndex - b.colIndex;
        });

        if (_this27.layout.qHyperCube.qMode === 'P') {
          columns = columns.filter(function (c, i) {
            return i < _this27.layout.qHyperCube.qNoOfLeftDims;
          });
        }

        columns = columns.filter(function (c) {
          return !c.qError;
        });
        _this27.table.options.columns = columns;

        var activeDimensions = _this27.layout.qHyperCube.qDimensionInfo.filter(function (c) {
          return !c.qError;
        });

        var columnParamValues = activeDimensions.filter(function (c, i) {
          return _this27.layout.qHyperCube.qMode === 'S' || i < _this27.layout.qHyperCube.qNoOfLeftDims;
        }).map(function (c) {
          return {
            value: new Array(c.qApprMaxGlyphCount).fill('x').join(''),
            width: c.width || null
          };
        });
        var measureLabel = activeDimensions.pop(); // const maxMValue = this.layout.qHyperCube.qMeasureInfo.reduce((a, b) => a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b)
        // columnParamValues.push({ value: new Array(maxMValue.qApprMaxGlyphCount).fill('x').join(''), width)

        columnParamValues = columnParamValues.concat(_this27.layout.qHyperCube.qMeasureInfo.filter(function (c) {
          return !c.qError;
        }).map(function (c) {
          return {
            value: new Array(_this27.layout.qHyperCube.qMode === 'S' ? c.qApprMaxGlyphCount : Math.max(c.qApprMaxGlyphCount, measureLabel.qApprMaxGlyphCount)).fill('x').join(''),
            width: _this27.layout.qHyperCube.qMode === 'S' ? c.width || null : c.width || measureLabel.width || null
          };
        }));
        _this27.columnParams = _this27.table.getColumnParameters(columnParamValues);

        for (var i = 0; i < columns.length; i++) {
          columns[i].width = "".concat(_this27.columnParams.cellWidths[i] || _this27.columnParams.cellWidths[_this27.columnParams.cellWidths.length - 1], "px");
        } // this.columnsToRender = Math.ceil(this.columnParams.availableWidth / this.columnParams.cellWidth)


        _this27.rowsToRender = Math.ceil(_this27.columnParams.availableHeight / _this27.columnParams.cellHeight);

        _this27.getData(function (page) {
          _this27.table.options.activeSort = activeSort;

          _this27.table.hideLoading();

          if (_this27.layout.qHyperCube.qMode === 'S') {
            _this27.table.render();

            _this27.prepDropdowns();
          }

          if (page.err) {
            var tableEl = document.getElementById("".concat(_this27.elementId, "_foot"));
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          } else {
            _this27.fullData = page;

            _this27.resize();
          }
        });
      }, function (err) {
        // try again      
        var e = err;

        if (_this27.errorCount < 50) {
          _this27.errorCount++;
          console.log('error getting layout, attempt', _this27.errorCount);
          clearTimeout(_this27.retryFn);
          _this27.retryFn = setTimeout(function () {
            _this27.render();
          }, 300);
        }
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.appendRows(this.transformData(this.fullData));
    }
  }, {
    key: "setPageNum",
    value: function setPageNum(page) {
      this.render(page);
    }
  }, {
    key: "setPageSize",
    value: function setPageSize(size) {
      this.options.pageSize = size;
      this.render();
    }
  }, {
    key: "transformData",
    value: function transformData(page) {
      var _this28 = this;

      if (this.layout.qHyperCube.qMode === 'S') {
        return page.map(function (r) {
          return r.map(function (c, i) {
            if (_this28.table.options.columns[i].showAsLink === true || _this28.table.options.columns[i].showAsNavigatorLink === true) {
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

            if (c.qAttrExps && c.qAttrExps.qValues) {
              var t = 'qDimensionInfo';
              var tIndex = i;

              if (i > _this28.layout.qHyperCube.qDimensionInfo.length - 1) {
                t = 'qMeasureInfo';
                tIndex -= _this28.layout.qHyperCube.qDimensionInfo.length;
              }

              c.qAttrExps.qValues.forEach(function (a, aI) {
                if (a.qText && a.qText !== '') {
                  if (_this28.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this28.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                    c.backgroundColor = a.qText;
                  }
                }
              });
            }

            return c;
          });
        });
      } else {
        var data = this.transformPivotTable(page); // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
        // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
        // this.table.options.columns = columns   

        this.fullColumnList = data.shift();
        var visibleColumns = [];
        var visibleStart = this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims;

        for (var i = 0; i < this.fullColumnList.length; i++) {
          if (i < visibleStart) {
            visibleColumns.push(this.fullColumnList[i]);
          } else if (i >= visibleStart + this.leftDataCol && i < visibleStart + this.leftDataCol + this.columnsToRender) {
            visibleColumns.push(this.fullColumnList[i]);
          }
        }

        this.table.options.columns = visibleColumns;
        var renderedWidth = 0;
        visibleColumns.forEach(function (c) {
          renderedWidth += +c.width.toString().replace('px', '');
        });
        this.table.setWidth(renderedWidth);
        this.table.render();
        this.prepDropdowns();
        return data; // let rows = []
        // page.qData.forEach((r, i) => {
        //   rows.push([{ value: page.qLeft[i].qText, ...page.qLeft[i] }, ...r.map(c => {
        //     c.value = c.qText || '-'        
        //     if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
        //       c.backgroundColor = c.qAttrExps.qValues[0].qText
        //       let colorParts
        //       let red
        //       let green
        //       let blue
        //       if (c.backgroundColor.indexOf('#') !== -1) {
        //         // hex color
        //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '')
        //         colorParts = colorParts.split('')
        //         red = parseInt(colorParts[0] + colorParts[1], 16)
        //         green = parseInt(colorParts[2] + colorParts[3], 16)
        //         blue = parseInt(colorParts[4] + colorParts[5], 16)
        //       }
        //       else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
        //         // rgb color
        //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '')
        //         colorParts = colorParts.split(',')
        //         red = colorParts[0]
        //         green = colorParts[1]
        //         blue = colorParts[2]
        //       }
        //       c.color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
        //     }
        //     return c
        //   })])
        // })
        // return rows  
      }
    }
  }, {
    key: "transformPivotTable",
    value: function transformPivotTable(page) {
      var _this29 = this;

      var output = [];
      var leftNodes = [];
      var topNodes = [];
      var topNodesTransposed = [];
      var topCounter = 0;
      var accCellSpan = 0;
      var visibleLeftCount = 0;
      var visibleTopCount = 0;
      var visibleColCount = 0;
      var tempNode = [];

      for (var i = 0; i < page.qLeft.length; i++) {
        expandLeft.call(this, page.qLeft[i], 0, 0, null, []);
      }

      for (var _i8 = 0; _i8 < page.qTop.length; _i8++) {
        expandTop.call(this, page.qTop[_i8], 0, _i8);
      }

      leftNodes[0] && leftNodes[0].forEach(function (c, i) {
        c.width = _this29.columnParams.cellWidths[i];
      });
      var scrollableColumns = this.layout.qHyperCube.qSize.qcx; // - (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)

      this.totalWidth = 0;
      var accWidth = 0;
      this.columnsToRender = 0;

      for (var _i9 = 0; _i9 < scrollableColumns; _i9++) {
        if (_i9 >= this.leftDataCol && accWidth < this.columnParams.scrollableWidth) {
          accWidth += this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + _i9] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1];
          this.columnsToRender++;
        }

        this.totalWidth += this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + _i9] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1];
      }

      this.table.setHorizontalScroll({
        width: this.columnParams.scrollableWidth * (this.columnParams.scrollableWidth / this.totalWidth),
        left: 0
      });
      topNodesTransposed[topNodesTransposed.length - 1].forEach(function (c, i) {
        c.width = "".concat(_this29.columnParams.cellWidths[(_this29.options.freezeColumns || _this29.layout.qHyperCube.qNoOfLeftDims) + i] || _this29.columnParams.cellWidths[_this29.columnParams.cellWidths.length - 1], "px");
      });

      for (var r = 0; r < page.qData.length; r++) {
        var row = [];

        for (var _i10 = this.leftDataCol; _i10 < this.leftDataCol + this.columnsToRender; _i10++) {
          row.push(page.qData[r][_i10]);
        }

        for (var c = 0; c < row.length; c++) {
          row[c].pos = 'Data';
          row[c].width = "".concat(this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + c] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1], "px");

          if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
            row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText;
            row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText);
          }

          if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
            row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText);
          }

          var lastTop = topNodesTransposed[topNodesTransposed.length - 1][c];

          if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
            row[c].qType = 'T';
          }

          row[c].value = row[c].qText;
        }

        if (leftNodes[r]) {
          row = leftNodes[r].concat(row);
        }

        output.push(row);
      }

      var additionalTopCells = [];
      var additionalCellCount = visibleLeftCount;

      for (var _i11 = 0; _i11 < additionalCellCount; _i11++) {
        additionalTopCells.push({
          rowspan: 1,
          colSpan: 1,
          level: 0,
          qText: '',
          qType: 'V'
        });
      }

      if (visibleLeftCount !== 0) {
        for (var _i12 = 0; _i12 < topNodesTransposed.length; _i12++) {
          if (_i12 === topNodesTransposed.length - 1) {
            topNodesTransposed[_i12] = this.layout.qHyperCube.qDimensionInfo.filter(function (d) {
              return !d.qError;
            }).filter(function (d, dI) {
              return dI < visibleLeftCount;
            }).map(function (d, dI) {
              return _extends({}, d, {
                name: d.qFallbackTitle,
                width: "".concat(_this29.columnParams.cellWidths[dI] || _this29.columnParams.cellWidths[_this29.columnParams.cellWidths.length - 1], "px")
              });
            }).concat(topNodesTransposed[_i12]);
          } else {
            topNodesTransposed[_i12] = additionalTopCells.concat(topNodesTransposed[_i12]);
          }
        }
      }

      visibleColCount = topNodesTransposed[topNodesTransposed.length - 1];
      output = topNodesTransposed.concat(output); // This function is used to convert the qLeft structure from a parent/child hierarchy
      // into a 2 dimensions array    

      function expandLeft(input, level, index, parent, chain) {
        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Left';
        o.value = o.qText;
        input.value = input.qText;
        visibleLeftCount = Math.max(visibleLeftCount, level + 1);
        o.childCount = o.qSubNodes.length;

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
          o.backgroundColor = o.qAttrExps.qValues[0].qText;
          o.color = this.getFontColor(o.qAttrExps.qValues[0].qText);
        }

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
          o.color = this.getFontColor(o.qAttrExps.qValues[1].qText);
        }

        delete o.qSubNodes;

        if (typeof o.qText === 'undefined') {
          if (o.qElemNo === -1) {
            o.qText = 'Totals??';
          } else if (o.qElemNo === -4) {
            o.qText = '';
            o.qType = 'T';
          }
        }

        o.rowspan = Math.max(1, input.qSubNodes.length);
        input.rowspan = Math.max(1, input.qSubNodes.length);

        if (input.qSubNodes.length === 0) {
          leftNodes.push(tempNode.concat([o]));
          tempNode = [];
        } else {
          tempNode.push(o);

          for (var _i13 = 0; _i13 < input.qSubNodes.length; _i13++) {
            expandLeft.call(this, input.qSubNodes[_i13], level + 1, _i13, input, [].concat(_toConsumableArray(chain), [o]));
          }

          var s = 0;

          for (var _i14 = 0; _i14 < input.qSubNodes.length; _i14++) {
            s += input.qSubNodes[_i14].rowspan;
          }

          input.rowspan = s;
          o.rowspan = s;
        }
      } // This function is used to convert the qTop structure from a parent/child hierarchy
      // into a 2 dimensions array


      function expandTop(input, level, index, parent) {
        var _topNodesTransposed$l2;

        if (typeof topNodesTransposed[level] === 'undefined') {
          topNodesTransposed[level] = [];
        }

        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Top';
        o.rowIndex = topCounter;
        o.topNode = true;
        o.isHeader = true;
        o.name = o.qText;

        if (!o.font) {
          o.font = {};
        }

        input.value = input.qText;

        if (o.qType === 'P') {
          o.qElemNo = -99;
        }

        o.childCount = o.qSubNodes.length;
        visibleTopCount = Math.max(visibleTopCount, level + 1);

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
          o.backgroundColor = o.qAttrExps.qValues[0].qText;
          o.color = this.getFontColor(o.qAttrExps.qValues[0].qText);
        }

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
          o.color = this.getFontColor(o.qAttrExps.qValues[1].qText);
        }

        delete o.qSubNodes;

        if (['T', 'E'].indexOf(o.qType) === -1) {
          o.qType = 'B';
        }

        if (typeof parent !== 'undefined') {
          if (parent.qType === 'T') {
            o.qType = parent.qType;
            input.qType = parent.qType;
          }
        }

        if (typeof o.qText === 'undefined') {
          if (o.qElemNo === -1) {
            o.qText = this.layout.tableTotalsLabel;
          } else if (o.qElemNo === -4) {
            o.qText = '';
            o.qType = 'T';
            input.qType = 'T';
          }
        }

        o.colSpan = Math.max(1, input.qSubNodes.length);
        input.colSpan = Math.max(1, input.qSubNodes.length);

        if (input.qSubNodes.length === 0) {
          if (o.qElemNo === -99 && o.qCanCollapse === true) {
            accCellSpan++;
          }
        } else {
          for (var _i15 = 0; _i15 < input.qSubNodes.length; _i15++) {
            expandTop.call(this, input.qSubNodes[_i15], level + 1, _i15, input);
          }

          var s = 0;

          for (var _i16 = 0; _i16 < input.qSubNodes.length; _i16++) {
            s += input.qSubNodes[_i16].colSpan;
          }

          o.rowIndex = topCounter;
          topCounter += s;
          o.colSpan = s;
          input.colSpan = s;

          if (o.qType === 'T' && o.qElemNo === -1) {
            accCellSpan += s;
          }

          if (o.qElemNo === -99) {
            accCellSpan++;
          }

          if (input.qCanExpand === true || input.qCanCollapse === true) {
            if (input.qSubNodes.length > 0 && input.qCanCollapse === true && typeof input.qSubNodes[0].rowIndex !== 'undefined') {
              input.rowIndex = input.qSubNodes[0].rowIndex;
              o.rowIndex = input.qSubNodes[0].rowIndex;
            } else {
              input.rowIndex = accCellSpan;
              o.rowIndex = accCellSpan;
              accCellSpan += o.colSpan;
            }
          }
        }

        var toPush = [o];

        if (o.colSpan > 1) {
          toPush = new Array(o.colSpan).fill(_objectSpread({}, o));
        }

        (_topNodesTransposed$l2 = topNodesTransposed[level]).push.apply(_topNodesTransposed$l2, _toConsumableArray(toPush));
      }

      return output;
    }
  }]);

  return Table2;
}();

var WebsyDesignsQlikPlugins = {
  Chart: Chart,
  Table: Table,
  Table2: Table2,
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
      retryCount: 5,
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
      var _this30 = this;

      return new Promise(function (resolve, reject) {
        _this30.prep('global');

        _this30.connectToApp().then(function () {
          _this30.executeAction(0, _this30.options.initialActions, function () {
            _this30.selectFromUrl(function () {
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
      var _this31 = this;

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
        var el = document.getElementById(_this31.options.actions[a].elementId);

        if (el) {
          el.addEventListener(_this31.options.actions[a].event, function () {
            var _loop2 = function _loop2(i) {
              var item = _this31.options.actions[a].items[i];

              if (typeof item.params === 'undefined') {
                item.params = [];
              }

              if (item.field) {
                _this31.app.getField(item.field).then(function (field) {
                  field[item.method].apply(field, _toConsumableArray(item.params));
                });
              } else {
                var _this31$app;

                (_this31$app = _this31.app)[item.method].apply(_this31$app, _toConsumableArray(item.params));
              }
            };

            for (var i = 0; i < _this31.options.actions[a].items.length; i++) {
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
      var _this32 = this;

      return new Promise(function (resolve, reject) {
        // check for enigma.js      
        var originalId = _this32.options.enigmaConfig.app;

        if (_this32.options.enigmaConfig.app) {
          _this32.options.enigmaConfig.app = _this32.normalizeId(_this32.options.enigmaConfig.app);
        }

        if (typeof enigma === 'undefined') {
          reject({
            error: 'Enigma.js not found.'
          });
          return;
        }

        if (typeof _this32.options.enigmaSchema === 'undefined') {
          reject({
            error: 'enigmaSchema property not found.'
          });
          return;
        }

        var url = _this32.options.enigmaConfig.url;

        if (_this32.options.enigmaConfig.ticket) {
          if (url.indexOf('?') === -1) {
            url += '?';
          } else {
            url += '&';
          }

          url += "qlikTicket=".concat(_this32.options.enigmaConfig.ticket);
        }

        var config = {
          schema: _this32.options.enigmaSchema,
          url: url
        };
        var session = enigma.create(config);
        _this32.session = session;
        session.open().then(function (global) {
          _this32.global = global;
          global.getActiveDoc().then(function (app) {
            if (app) {
              _this32.app = app;

              if (_this32.options.views.global) {
                _this32.executeActions('global').then(function () {
                  resolve();
                });
              } else {
                resolve();
              }
            } else {
              return _this32.openApp(originalId).then(function () {
                resolve();
              });
            }
          }, function (err) {
            var e = err;

            if (originalId) {
              return _this32.openApp(originalId).then(function () {
                resolve();
              }, function (err) {
                _this32.sessionOnNotification({
                  err: err
                });
              });
            } else {
              resolve();
            }
          });

          if (_this32.options.keepAlive === true) {
            _this32.keepAlive();
          }
        }, function (err) {
          reject(err);
        });
        session.on('traffic:received', function (data) {
          if (typeof data.suspend !== 'undefined') {
            _this32.sessionSuspended();
          }
        });
        session.on('notification:*', function (eventName, data) {
          if (eventName === 'OnAuthenticationInformation') {
            if (data.mustAuthenticate === true) {
              if (_this32.options.enigmaConfig.authUrl) {
                window.location = _this32.options.enigmaConfig.authUrl + window.location.search.replace('?', '%3F').replace('=', '%3D');
              } else if (_this32.options.enigmaConfig.onMustAuthenticate) {
                _this32.options.enigmaConfig.onMustAuthenticate();
              } else if (data.loginUri) {
                window.location = data.loginUri;
              }
            } else if (data.mustAuthenticate === false) {
              _this32.user = {
                userDirectory: data.userDirectory,
                userId: data.userId
              };
            }
          } else {
            _this32.sessionOnNotification(data, eventName);
          }
        });
        session.on('suspended', _this32.sessionSuspended.bind(_this32));
        session.on('resumed', _this32.sessionResumed.bind(_this32));
        session.on('closed', _this32.sessionClosed.bind(_this32));
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
      var _this33 = this;

      this.global.engineVersion();
      setTimeout(function () {
        _this33.keepAlive();
      }, 59000);
    }
  }, {
    key: "openApp",
    value: function openApp(appId) {
      var _this34 = this;

      return new Promise(function (resolve, reject) {
        _this34.global.openDoc(appId).then(function (app) {
          _this34.app = app;

          if (_this34.options.views.global) {
            _this34.executeActions('global').then(function () {
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
      var _this35 = this;

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
          _this35.options.views[view].initialized = true;

          if (_this35.options.views[view].prepped !== true) {
            _this35.prep(view);
          }

          _this35.executeActions(view).then(function () {
            if ((_this35.globalObjectsLoaded === false || _this35.options.alwaysLoadGlobal === true) && view !== 'global') {
              _this35.loadObjects('global', force);

              _this35.globalObjectsLoaded = true;
            }

            _this35.loadObjects(view, force);

            if (view === 'global') {
              _this35.globalObjectsLoaded = true;
            }
          });
        });
      } else {
        if (this.options.views[view].prepped !== true) {
          this.prep(view);
        }

        console.log('Running Actions', view);
        this.executeActions(view).then(function () {
          console.log('Actions complete', view);

          if ((_this35.globalObjectsLoaded === false || _this35.options.alwaysLoadGlobal === true) && view !== 'global') {
            _this35.loadObjects('global', force);

            _this35.globalObjectsLoaded = true;
          }

          _this35.loadObjects(view, force);

          if (view === 'global') {
            _this35.globalObjectsLoaded = true;
          }
        });
      }
    }
  }, {
    key: "executeAction",
    value: function executeAction(index, actionList, callbackFn) {
      var _this36 = this;

      var item = actionList[index];

      if (typeof item.params === 'undefined') {
        item.params = [];
      }

      if (item.field) {
        this.app.getField(item.field).then(function (field) {
          field[item.method].apply(field, _toConsumableArray(item.params)).then(function () {
            if (item.lock === true) {
              field.lock().then(function () {
                index++;

                if (index === actionList.length) {
                  callbackFn();
                } else {
                  _this36.executeAction(index, actionList, callbackFn);
                }
              });
            } else {
              index++;

              if (index === actionList.length) {
                callbackFn();
              } else {
                _this36.executeAction(index, actionList, callbackFn);
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
            _this36.executeAction(index, actionList, callbackFn);
          }
        });
      }
    }
  }, {
    key: "executeActions",
    value: function executeActions(view) {
      var _this37 = this;

      return new Promise(function (resolve, reject) {
        if (!_this37.options.views[view] || !_this37.options.views[view].actions || _this37.options.views[view].actions.length === 0) {
          resolve();
        }

        _this37.executeAction(0, _this37.options.views[view].actions, resolve);
      });
    }
  }, {
    key: "loadObjects",
    value: function loadObjects(view, force) {
      var _this38 = this;

      console.log('Loading objects', view);

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
              _this38.request('GET', objList[i].definition).then(function (def) {
                objList[i].definition = def;

                _this38.createObjectFromDefinition(objList[i]);
              });
            } else {
              _this38.createObjectFromDefinition(objList[i]);
            }
          } else {
            _this38.createObjectFromDefinition(objList[i]);
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
      this.closeView(view);
    }
  }, {
    key: "closeView",
    value: function closeView(view) {
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
      var _this39 = this;

      if (objectConfig.retries) {
        objectConfig.retries = 0;
      }

      if (objectConfig.definition && this.app) {
        console.log('Creating object', objectConfig.definition.qInfo);
        var method = 'createSessionObject';
        var params = objectConfig.definition;

        if (objectConfig.definition.qField) {
          method = 'getField';
          params = objectConfig.definition.qField;
        }

        this.app[method](params).then(function (model) {
          objectConfig.objectId = model.id;
          objectConfig.attached = true;

          if (_this39.supportedChartTypes.indexOf(objectConfig.definition.qInfo.qType) !== -1) {
            var options = _extends({}, objectConfig.options, {
              model: model,
              def: objectConfig.definition,
              app: _this39.app
            });

            objectConfig.vis = new _this39.chartLibrary[objectConfig.definition.qInfo.qType]("".concat(objectConfig.elementId, "_vis"), options);
            model.on('changed', function () {
              if (objectConfig.attached === true && _this39.paused === false) {
                objectConfig.vis.render();
              }
            });
          } else if (objectConfig.render && typeof objectConfig.render === 'function') {
            objectConfig.vis = {};
            objectConfig.attached = true;
            objectConfig.model = model;
            objectConfig.render(objectConfig, model);
            model.on('changed', function () {
              if (objectConfig.attached === true && _this39.paused === false) {
                objectConfig.render(objectConfig, model);
              }
            });
          }
        }, function (err) {
          console.log('Error creating object', err);

          if (objectConfig.retries < _this39.options.retryCount) {
            console.log('retrying');
            objectConfig.retries++;

            _this39.createObjectFromDefinition(objectConfig);
          } else {
            console.log('Max retries reached.');
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
    value: function sessionOnNotification(data, eventName) {
      if (this.options.sessionOnNotification) {
        this.options.sessionOnNotification(data, eventName);
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
      var _this40 = this;

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
                  qNumber: _websyDesignsEs["default"].Utils.toQlikDate(dateRep),
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

            _this40.select(index, selections, callbackFn);
          });
        }, function (err) {
          console.log('field for selection not found', err);
          index++;

          _this40.select(index, selections, callbackFn);
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

WebsyDesignsQlikPlugins.QlikObjectManager = ObjectManager;
var _default = WebsyDesignsQlikPlugins;
exports["default"] = _default;
