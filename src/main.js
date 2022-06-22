/* global
  include
  WebsyDesigns
  Chart
  Table
  Table2
  GeoMap
  Dropdown
  DatePicker
  KPI
  ObjectManager
*/ 

include('./components/chart/index.js')
include('./components/datepicker/index.js')
include('./components/dropdown/index.js')
include('./components/kpi/index.js')
include('./components/map/index.js')
include('./components/table/index.js')
include('./components/table2/index.js')

if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Chart,
    Table,
    Table2,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
  window.WebsyDesignsQlikPlugins = {
    Chart,
    Table,
    Table2,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
  include('./components/object-manager/index.js')
  WebsyDesigns.QlikObjectManager = ObjectManager
}
