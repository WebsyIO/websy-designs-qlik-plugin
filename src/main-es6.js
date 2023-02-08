/* global
  include
  WebsyDesigns
  Bookmarks
  Chart
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

import WebsyDesigns from '@websy/websy-designs/dist/websy-designs-es6'
include('./components/bookmarks/index.js')
include('./components/chart/index.js')
include('./components/current-selections/index.js')
include('./components/datepicker/index.js')
include('./components/dropdown/index.js')
include('./components/kpi/index.js')
include('./components/map/index.js')
include('./components/simple-search/index.js')
include('./components/table/index.js')
include('./components/table2/index.js')
include('./components/table3/index.js')

const WebsyDesignsQlikPlugins = {
  Bookmarks,
  Chart,
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
WebsyDesignsQlikPlugins.QlikObjectManager = ObjectManager

export default WebsyDesignsQlikPlugins
