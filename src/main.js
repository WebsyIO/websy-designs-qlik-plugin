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

include('./components/chart/index.js')
include('./components/datepicker/index.js')
include('./components/dropdown/index.js')
include('./components/kpi/index.js')
include('./components/map/index.js')
include('./components/table/index.js')

if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Chart,
    Table,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
  include('./components/object-manager/index.js')
  WebsyDesigns.QlikObjectManager = ObjectManager
}
