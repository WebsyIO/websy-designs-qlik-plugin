/* global
  include
  WebsyDesigns
  Bookmarks
  Chart
  Pie
  CurrentSelections
  SimpleSearch
  Table
  Table2
  Table3
  GeoMap
  Dropdown
  DatePicker
  KPI
  ObjectManager
*/ 
include('./components/bookmarks/index.js')
include('./components/chart/index.js')
include('./components/pie/index.js')
include('./components/current-selections/index.js')
include('./components/datepicker/index.js')
include('./components/dropdown/index.js')
include('./components/kpi/index.js')
include('./components/map/index.js')
include('./components/simple-search/index.js')
include('./components/table/index.js')
include('./components/table2/index.js')
include('./components/table3/index.js')

if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Bookmarks,
    Chart,
    Pie,
    CurrentSelections,
    SimpleSearch,
    Table,
    Table2,
    Table3,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
  window.WebsyDesignsQlikPlugins = {
    Bookmarks,
    Chart,
    Pie,
    CurrentSelections,
    SimpleSearch,
    Table,
    Table2,
    Table3,
    GeoMap,
    Dropdown,    
    DatePicker,
    KPI
  }
  include('./components/object-manager/index.js')
  WebsyDesigns.QlikObjectManager = ObjectManager
}
