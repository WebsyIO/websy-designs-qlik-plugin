/* global
  include
  WebsyDesigns
  Bookmarks
  Chart
  CurrentSelections
  Table
  Table2
  GeoMap
  Dropdown
  DatePicker
  KPI
  ObjectManager
*/ 
/* global Bookmark */ 
class Bookmarks {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      dock: 'left'
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('change', this.handleChange.bind(this))
      el.addEventListener('contextmenu', this.handleContextMenu.bind(this))
      let html = `
        <div class='websy-bookmark'>
          <div class='bookmarkBtn'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>        
              <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'
                stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />
            </svg>
          </div>
          <div class='bookmark-mask' id='${this.elementId}_bookmarkPopup'></div>
          <div class='bookmarkContainer dock-${this.options.dock}' id='bookmarkContainer'>
            <div class='bookmark-topline'>
              <span class="heading">Bookmarks</span><button class='createNew'>Create new bookmark</button>
            </div>            
            <div style='position: relative;'>
              <input class='search-input' type='text' id="${this.elementId}_search" placeholder="Search">
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Search</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/></svg>            
            </div>            
            <div class='public'>
              <div class="public-heading-caret">
                <svg class='public-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
                  <title>Caret Down</title>
                  <path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
                </svg>
                <span class="heading">Public bookmarks <span id="publicCount">(0)</span></span>
              </div>
              <div id="public-placeholder" class="active"><p class='public-text'>You have no public bookmarks</p>
                <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>              
              </div>
            </div>
            <div class='my-bookmarks'>
              <div class="heading-caret">
                <svg class='myBookmarks-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
                  <title>Caret Down</title>
                  <path
                    d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
                </svg>
                <span class="heading">My bookmarks <span id="myBookmarksCount">(0)</span></span>
              </div>
              <div id="myBookmarks-placeholder" class="active"></div>
            </div>
          </div> 
          <div class='bookmark-mask-dark' id='bookmarkNewPopup'></div>       
          <div class='createNewPopup' id='createForm'>
            <div class='createTopline'>
              <span class="heading">Create bookmark</span>
              <span class='closeCreate'>
                <svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>    
                  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'
                    d='M368 368L144 144M368 144L144 368' />
                </svg>
              </span>
            </div>
            <div class="create-input">
              <label for='bookmarkName' class="title">Title</label>
              <input type='text' class="bookmark-name" id='bookmarkName' name='bookmarkName'>
              <label for='bookmarkDescription' class="description">Description <span class='optional'>(optional)</span></label>
              <textarea type='text' id='${this.elementId}_bookmarkDescription' name='bookmarkDescription'></textarea>
              <div class="create-flex">
                <button type="button" disabled class='create-submit' id='createSubmit'>Create</button>
            </div>
          </div>
        </div>
      </div>
    `
      el.innerHTML = html
      this.options.app.createSessionObject(
        {
          'qInfo': {
            'qId': 'BookmarkList',
            'qType': 'BookmarkList'
          },
          'qBookmarkListDef': {
            'qType': 'bookmark',
            'qData': {
              'title': '/qMetaDef/title',
              'description': '/qMetaDef/description',
              'sheetId': '/sheetId',
              'selectionFields': '/selectionFields',
              'creationDate': '/creationDate'
            }
          }
        }
      )
        .then((model) => {
          this.options.model = model
          this.render()
        })
    }    
  }
  createBookmarkHtml (bookmark, bookmarkType) {
    let html = `
      <div class="public-li" id="public-li" data-bookmark="${bookmark.qInfo.qId}">
        <span class="bookmark-text" data-bookmark="${bookmark.qInfo.qId}">${bookmark.qMeta.title}</span>
        <div class="date-and-i">
          <span class="bookmark-text">${new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10)}</span>
          <span class="infoBtn">
            <svg data-bookmark="${bookmark.qInfo.qId}" class="i-icon-public" id="i-icon-public" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 
              56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 
              16v104h28a16 16 0 010 32z"/>
            </svg>
          </span>
        </div>
      </div>          
      <div class="info-popup" id="info-popup-${bookmark.qInfo.qId}">
        <div class="info-topline" id="info-topline-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}">
          <span class="description-heading" id="description-heading">${bookmark.qMeta.description}</span>
        </div>`
      
    if (bookmark.qMeta.privileges.indexOf('update') !== -1) { 
      html += `
        <svg xmlns="http://www.w3.org/2000/svg" data-bookmark="${bookmark.qInfo.qId}" class="edit-info" id="edit-info-${bookmark.qInfo.qId}" viewBox="0 0 512 512">
          <path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
          fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34
          0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91
            0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/>
        </svg>              
        <div class="edit-topline">
          <svg xmlns="http://www.w3.org/2000/svg" class="tick-icon" id="tick-icon" viewBox="0 0 512 512">
            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
              stroke-width="32" d="M352 176L217.6 336 160 272"/>
          </svg>`
      if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
        html += `
          <svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" data-bookmark="${bookmark.qInfo.qId}" id="trashIcon-${bookmark.qInfo.qId}" viewBox="0 0 512 512"><title>Trash</title>
            <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/>
            <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42
              26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 
              01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132
              0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 
              399.43l8-224a16 16 0 1132 1.14z"/>
          </svg>               
        `
      }
      html += `
        </div>
        <div id="edit-inputs-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}" class="edit-inputs">
          <input type="text" id="edit-title-${bookmark.qInfo.qId}" placeholder="Bookmark title"  value="${bookmark.qMeta.title}"/>
          <input type="text" id="edit-description-${bookmark.qInfo.qId}" placeholder="Bookmark description" value="${bookmark.qMeta.description}"  />
        </div>`
    }
    html += `
      <span class="selections">Selections: ${bookmark.qData.selectionFields}</span>
    `
    html += bookmark.qData.qBookmark.qStateData.map((s, i) => `
      <div class="info-copy">
        <span class="set-expression">${s.qStateName}</span>
        <input type="text" READONLY class="info-input" value="" id="${bookmark.qInfo.qId}_i_set" />
        <div class="flex">
          <div class="copied" data-bookmark="${bookmark.qInfo.qId}" id="copied"><h5>copied to clipboard</h5></div>
          <button class="copy" data-bookmark="${bookmark.qInfo.qId}" id="copyBtn-${bookmark.qInfo.qId}_i" >Copy</button>          
        </div>
      </div>
    `).join('')
    if (bookmark.qMeta.published === true && (bookmark.qMeta.privileges.indexOf('publish') !== -1)) {
      html += `
        <div class="right-click-popup" id="rightClickPopup-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}">
          <div class="right-click-menu">
            <p class="unpublish-btn" id="unpublishBtn-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}">Unpublish</p>
          </div>
        </div>
        `
    }
    if (bookmark.qMeta.published !== true && (bookmark.qMeta.privileges.indexOf('publish') !== -1)) {
      html += `
        <div class="right-click-popup" id="rightClickPopup-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}">
          <div class="right-click-menu">
            <p class="publish-btn" id="publishBtn-${bookmark.qInfo.qId}" data-bookmark="${bookmark.qInfo.qId}">Publish</p>
          </div>
        </div>
        `
    }
    html += `</div>`
    return html
  }
  render (searchText) {
    let publicCount = document.getElementById('publicCount')
    this.publicBookmarks = []
    let myBookmarksCount = document.getElementById('myBookmarksCount')
    this.myBookmarks = []    
    this.options.model.getLayout().then(layout => {
      layout.qBookmarkList.qItems.forEach(d => {
        if (d.qMeta.published === true) {
          if (searchText) {
            if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
              this.publicBookmarks.push(d)
            }
          } 
          else {
            this.publicBookmarks.push(d)
          }
        } 
        else {
          if (searchText) {
            if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
              this.myBookmarks.push(d)
            }
          } 
          else {
            this.myBookmarks.push(d)
          }
        }
      })
      let publicHtml = `<div id="info-popup-mask" class="info-popup-mask"></div>`
      this.publicBookmarks.forEach(bookmark => {
        if (this.options.hidePrefix && bookmark.qMeta.title.indexOf(this.options.hidePrefix) === 0) {
          return 
        }
        console.log('public', bookmark)
        publicHtml += this.createBookmarkHtml(bookmark)        
      })
      console.log('publicHtml', publicHtml)
      let bookmarkHtml = ''
      this.myBookmarks.forEach(bookmark => {
        console.log('my bookmark', bookmark)
        let createDate = new Date()
        if (bookmark.qMeta.createdDate) {
          createDate = new Date(bookmark.qMeta.createdDate)
        }
        bookmarkHtml += this.createBookmarkHtml(bookmark)
      })
      const publicPlaceholder = document.getElementById('public-placeholder')
      publicPlaceholder.innerHTML = publicHtml
      const myBookmarksPlaceholder = document.getElementById('myBookmarks-placeholder')
      myBookmarksPlaceholder.innerHTML = bookmarkHtml 
      publicCount.textContent = `(` + this.publicBookmarks.length + `)`
      myBookmarksCount.textContent = `(` + this.myBookmarks.length + `)`
    })      
  }
  handleKeyUp (event) {
    const bookmarkName = document.getElementById('bookmarkName').value
    if (event.target.classList.contains('search')) {
      this.searchFunction()
    }
    if (event.target.classList.contains('bookmark-name')) {
      if (bookmarkName.length === 0) {
        this.disableCreate()
      }
      else {
        this.enableCreate()
      }
    } 
  }
  handleClick (event) {  
    const bookmarkTitle = document.getElementById('bookmarkName')
    const bookmarkDescription = document.getElementById('bookmarkDescription')
    if (event.target.classList.contains('bookmarkBtn')) {
      this.openForm() 
    } 
    if (event.target.classList.contains('bookmark-mask')) {
      this.closeForm()
      this.closeBookmark()
      const infoList = Array.from(document.getElementsByClassName('info-popup'))
      infoList.forEach(e => {
        e.classList.remove('active')
      })
      const mask = document.getElementById('info-popup-mask')
      mask.classList.remove('active')
    } 
    if (event.target.classList.contains('createNew')) {
      this.createNewBookmark()
    }
    if (event.target.classList.contains('closeCreate')) {
      const bookmarkBackground = document.getElementById(`${this.elementId}_bookmarkPopup`)
      bookmarkBackground.style.backgroundColor = 'transparent'
      this.closeBookmark()
    }
    if (event.target.classList.contains('public-heading-caret')) {
      this.closePublicUL()
      event.target.classList.toggle('closed')
    }
    if (event.target.classList.contains('heading-caret')) {
      this.closeMyBookmarksUL()
      event.target.classList.toggle('closed')
    }
    if (event.target.classList.contains('createSubmit')) {
      const bookmarkBackground = document.getElementById(`${this.elementId}_bookmarkPopup`)
      bookmarkBackground.style.backgroundColor = 'transparent'
      this.options.app.createBookmark(
        {
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: `${bookmarkTitle.value}`,
            description: `${bookmarkDescription.value}`
          }
        }
      )
        .then(() => {
          document.getElementById('bookmarkName').value = ''
          this.render()
        })
      this.closeBookmark()
    }
    if (event.target.classList.contains('trash-icon')) {
      const bookmarkId = event.target.getAttribute('data-bookmark')
      this.options.app.destroyBookmark(bookmarkId)
        .then(() => {
          this.render()
        })
    }
    if (event.target.classList.contains('i-icon-public')) {
      this.toggleInfo(event)
    }
    if (event.target.classList.contains('i-icon-my')) {
      this.toggleInfo(event)
    }
    if (event.target.classList.contains('info-popup-mask')) {
      const infoList = Array.from(document.getElementsByClassName('info-popup'))
      infoList.forEach(e => {
        e.classList.remove('active')
      })
      const mask = document.getElementById('info-popup-mask')
      mask.classList.remove('active')
    }
    if (event.target.classList.contains('edit-info')) {
      this.editInfo(event)
      this.hideInfoTopline(event)
      this.showTickIcon(event)
      this.showTrashIcon(event)
    }
    if (event.target.classList.contains('tick-icon')) {
      const bookmarkId = event.target.getAttribute('data-bookmark')
      const editTitle = document.getElementById(`edit-title-${bookmarkId}`)
      const editDescription = document.getElementById(`edit-description-${bookmarkId}`)
      this.options.app.getBookmark(bookmarkId).then((result) => { 
        result.getProperties().then((props) => {
          props.qMetaDef.title = editTitle.value
          props.qMetaDef.description = editDescription.value
          result.setProperties(props)
          this.render()
        })
      })
    }
    if (event.target.classList.contains('public-li') || (event.target.classList.contains('myBookmarks-li'))) {
      const bookmarkId = event.target.getAttribute('data-bookmark')
      this.options.app.applyBookmark(bookmarkId)
      this.closeForm()
    }
    if (event.target.classList.contains('copy')) {
      this.copyToClipboard(event)
      this.toggleCopied(event)
    }
    if (event.target.classList.contains('publish-btn')) {
      this.publish(event)
      this.handleContextMenu(event)
    }
    if (event.target.classList.contains('unpublish-btn')) {
      this.unpublish(event)
      this.handleContextMenu(event)
    }
  }
  handleChange (event) {
    if (event.target.classList.contains('search')) {
      this.render(event.target.value)
    }
  }
  searchFunction () {
    const input = document.getElementById(`${this.elementId}_search`)
    const filter = input.value.toLowerCase()
    this.render(filter)
  }
  publish (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    this.options.app.getBookmark(bookmarkId)
      .then((result) => {
        result.publish()
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  unpublish (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    this.options.app.getBookmark(bookmarkId)
      .then((result) => {
        result.unpublish()
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  openForm () {
    const myForm = document.getElementById(`${this.elementId}_bookmarkPopup`)
    if (myForm) { 
      myForm.style.display = 'block'
    }
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    if (bookmarkContainer) { 
      bookmarkContainer.style.display = 'block'
    }
  }
  closeForm () {
    const myForm = document.getElementById(`${this.elementId}_bookmarkPopup`)
    myForm.style.display = 'none'
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    if (bookmarkContainer) { 
      bookmarkContainer.style.display = 'none'
    }
    const infoList = Array.from(document.getElementsByClassName('info-popup'))
    infoList.forEach(e => {
      e.classList.remove('active')
    })
    const publicForm = Array.from(document.getElementsByClassName('right-click-popup'))
    publicForm.forEach(e => {
      e.classList.remove('active')
    })
    const editOptions = document.querySelectorAll('.edit-topline svg')
    editOptions.forEach(e => {
      e.classList.remove('active')
    })
    const inputOptions = document.querySelectorAll('.edit-topline svg')
    editOptions.forEach(e => {
      e.classList.remove('active')
    })
  }
  createNewBookmark () {
    const createNew = document.getElementById('createForm')
    const maskEl = document.getElementById('bookmarkNewPopup')
    createNew.classList.add('active')
    maskEl.classList.add('active')
  }
  copyToClipboard (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const copyText = document.getElementById('infoInput')
    const copyBtn = document.getElementById(`copyBtn-${bookmarkId}`)
    copyText.select()
    navigator.clipboard.writeText(copyText.value)
  }
  toggleCopied (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const inputBox = document.getElementById(`copied-${bookmarkId}`)
    inputBox.classList.toggle('active')
    setTimeout(this.toggleCopied, 3000)
  }
  closeBookmark () {
    const createNew = document.getElementById('createForm')
    createNew.classList.remove('active')
    const maskEl = document.getElementById('bookmarkNewPopup')
    maskEl.classList.remove('active')
  }
  closePublicUL () {
    const publicItem = document.getElementById('public-placeholder')
    publicItem.classList.toggle('active')
  }
  closeMyBookmarksUL () {
    const myBookmarksItem = document.getElementById('myBookmarks-placeholder')
    myBookmarksItem.classList.toggle('active')
  }
  toggleInfo (event) {
    const infoList = Array.from(document.getElementsByClassName('info-popup'))
    infoList.forEach(e => {
      e.classList.remove('active')
    })
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const toggleInfo = document.getElementById(`info-popup-${bookmarkId}`)
    toggleInfo.classList.add('active')
    const mask = document.getElementById('info-popup-mask')
    mask.classList.add('active')
  }
  enableCreate () {
    document.getElementById('createSubmit').disabled = false
  }
  disableCreate () {
    document.getElementById('createSubmit').disabled = true
  }
  editInfo (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const toggleEdit = document.getElementById(`edit-info-${bookmarkId}`)
    const editInputs = document.getElementById(`edit-inputs-${bookmarkId}`)
    toggleEdit.classList.add('active')
    editInputs.classList.toggle('active')
    this.hideInfoTopline(event)
  }
  hideInfoTopline (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const hideInfoTop = document.getElementById(`info-topline-${bookmarkId}`)
    hideInfoTop.classList.toggle('active')
  }
  showTickIcon (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const showTick = document.getElementById(`tick-icon-${bookmarkId}`)
    showTick.classList.toggle('active')
  }
  showTrashIcon (event) {
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const showTrash = document.getElementById(`trashIcon-${bookmarkId}`)
    showTrash.classList.toggle('active')
  }
  handleContextMenu (event) {
    if (event.target.classList.contains('public-li') || (event.target.classList.contains('myBookmarks-li'))) {
      event.preventDefault()
      const infoList = Array.from(document.getElementsByClassName('right-click-popup'))
      infoList.forEach(e => {
        e.classList.remove('active')
      })
      let clientX = event.clientX
      const bookmarkId = event.target.getAttribute('data-bookmark')
      const rightClickMenu = document.getElementById(`rightClickPopup-${bookmarkId}`)
      if (rightClickMenu) {
        rightClickMenu.classList.toggle('active')
        rightClickMenu.style.left = `${clientX}px`
      }
    }
  }  
}

/* global WebsyDesigns createIdentity d3 */ 
class Chart {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.optionDefaults = {
      data: {
        left: { min: 0, max: 0 },
        right: { min: 0, max: 0 },
        bottom: { min: 0, max: 0 },
        top: { min: 0, max: 0 },
        series: []
      }      
    }
    this.chart = new WebsyDesigns.WebsyChart(elementId)
    window.addEventListener('resize', () => this.chart.render())
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
    }
    this.render()
  }
  addOptions (input, options) {
    for (const key in options) {
      input[key] = options[key]
    }
  }
  checkForData () {
    return new Promise((resolve, reject) => {
      if (this.layout.qHyperCube.qDataPages[0] && this.layout.qHyperCube.qDataPages[0].qMatrix) {
        resolve()
      }
      else {
        this.options.model.getHyperCubeData('/qHyperCubeDef', [{
          qTop: 0,
          qLeft: 0,
          qWidth: this.layout.qHyperCube.qSize.qcx,
          qHeight: Math.floor(10000 / this.layout.qHyperCube.qSize.qcx)
        }]).then(pages => {
          this.layout.qHyperCube.qDataPages = pages
          resolve()
        })
      }
    })
  }
  close () {
    this.chart.close()
  }
  createSeriesKey (title) {
    return title.replace(/ /g, '_')
  }
  formatValue (d, options = {}) {
    console.log('formatting', d, options)
    let decimals = 0
    let isPercentage = false    
    if (options.decimals) {
      decimals = options.decimals
    }
    if (options.showAsPercentage === true) {
      isPercentage = options.showAsPercentage
    }
    if ((options || {}).scale === 'Time' && d.getDate) {
      d = `${d.getDate()} ${this.monthMap[d.getMonth()]} ${d.getFullYear()}`
    }    
    else if (!isNaN(d)) {      
      // if (d.toReduced(decimals, isPercentage, true) % 1 === 0) {
      //   decimals = 0
      // }
      d = WebsyDesigns.Utils.toReduced(d, decimals, isPercentage, false, options.max)
      if (options.showAsCurrency === true) {
        d = d.toCurrency()
      }
    }    
    return d
  }
  fromQlikDate (d) {    
    let output = new Date(Math.round((d - 25569) * 86400000))    
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000)
    return output
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.checkForData().then(() => {
        let options = {}
        if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {        
          options = this.transformMultiMeasure()
        }
        else if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length > 1) {
          options = this.transformMultiMeasure()
        }
        else if (layout.qHyperCube.qDimensionInfo.length > 1) {
          options = this.transformMultiDimensions()
        }
        else if (layout.qHyperCube.qDimensionInfo.length === 0 && layout.qHyperCube.qMeasureInfo.length > 0) {
          options = this.transformNoDimensions()
        }
        this.chart.render(options)
      })      
    })
  }
  resize () {
    this.chart.render()
  }
  transformBasic () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)    
    this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    // options.data.left = Object.assign({}, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin 
    options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[0].options || {})
    // options.data.bottom = Object.assign({}, this.layout.qHyperCube.qDimensionInfo[0].options || {})
    options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
    options.data.bottom.data = []    
    options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    options.data.left.formatter = d => {          
      return this.formatValue(d, (this.layout.qHyperCube.qMeasureInfo[0].options || {}))
    }
    let series = this.layout.qHyperCube.qMeasureInfo[0].options || {}
    series.data = []
    series.key = this.createSeriesKey(this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle)
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      r[0].value = r[0].qText
      r[1].value = isNaN(r[1].qNum) ? 0 : r[1].qNum
      r[1].tooltipValue = r[1].qText
      options.data.bottom.data.push(r[0])
      series.data.push({
        x: r[0],
        y: r[1]
      })
    })    
    options.data.series = [series]
    return options
  }
  transformMultiDimensions () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    // options.data.left = Object.assign({}, options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin 
    options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax    
    options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})
    // options.data.bottom = Object.assign({}, options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})
    options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[1].qFallbackTitle
    options.data.bottom.data = []    
    options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle
    options.data.left.formatter = d => {          
      return this.formatValue(d, this.layout.qHyperCube.qMeasureInfo[0].options || {})
    }
    const series = []
    const seriesKeys = []
    const bottomKeys = []
    this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
      let seriesIndex = seriesKeys.indexOf(r[0].qText)
      let bottomIndex = bottomKeys.indexOf(r[1].qText)
      let v = r[1].qText
      if ((this.layout.qHyperCube.qDimensionInfo[1].options || {}).scale === 'Time') {
        v = this.fromQlikDate(r[1].qNum)
      }
      if (bottomIndex === -1) {        
        bottomKeys.push(v)
        r[1].value = v
        options.data.bottom.data.push(r[1])
      }
      if (seriesIndex === -1) {
        seriesKeys.push(r[0].qText)
        seriesIndex = seriesKeys.length - 1
        series.push({
          key: `series_${seriesIndex}`,
          type: options.type || 'bar',   
          label: r[0].qText,
          // color: this.layout.options.color,
          data: []
        })
      }
      let c = r[2]
      c.value = isNaN(c.qNum) ? 0 : c.qNum
      c.tooltipLabel = r[0].qText
      c.tooltipValue = c.qText
      series[seriesIndex].data.push({
        x: { value: v },
        y: c
      })      
    })
    options.data.series = series
    options.data.bottom.min = options.data.bottom.data[0].value
    options.data.bottom.max = options.data.bottom.data[options.data.bottom.data.length - 1].value
    console.log('multi dimension options', options)
    return options   
  }
  transformNoDimensions () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    let xAxis = 'bottom'
    let yAxis = 'left'
    let xScale = 'Band'
    let yScale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      yAxis = 'bottom'
      xScale = 'Linear'
      yScale = 'Band'
    }
    options.data[xAxis].scale = xScale
    options.data[yAxis].scale = yScale    
    options.data[xAxis].padding = options.padding || 0
    options.data[xAxis].data = []
    if (options.xTitle) {
      options.data[xAxis].title = options.xTitle
      options.data[xAxis].showTitle = true
      options.data[xAxis].titlePosition = 1
    }    
    options.data[yAxis].formatter = d => {          
      return this.formatValue(d, options || {})
    }
    this.layout.qHyperCube.qMeasureInfo.forEach(m => {
      options.data[xAxis].data.push({value: m.qFallbackTitle})
      options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)      
      options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)            
    })    
    if (options.yMinOverride) {
      options.data[yAxis].min = options.yMinOverride
    }
    if (options.yMaxOverride) {
      options.data[yAxis].max = options.yMaxOverride
    }
    if (this.layout.qHyperCube.qDataPages[0]) {
      options.data.series = [{
        key: this.layout.qInfo.qId,
        type: options.type || 'bar',   
        color: options.color,
        data: this.layout.qHyperCube.qDataPages[0].qMatrix.map(r => r.map((c, i) => {
          c.value = isNaN(c.qNum) ? 0 : c.qNum
          if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
            c.label = c.qAttrExps.qValues[0].qText
          }
          return {
            x: { value: this.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle },
            y: c
          }
        }))[0]
      }] 
    } 
    return options   
  }
  transformMultiMeasure () {
    const options = Object.assign({}, this.optionDefaults, this.layout.options)
    let xAxis = 'bottom'
    let x2Axis = 'bottom'
    let yAxis = 'left'
    let y2Axis = 'right'
    let xScale = 'Band'
    let x2Scale = 'Band'
    let yScale = 'Linear'
    let y2Scale = 'Linear'
    if (options.orientation === 'horizontal') {
      xAxis = 'left'
      x2Axis = 'right'
      yAxis = 'bottom'
      y2Axis = 'top'     
    }
    options.data[yAxis].min = 0
    options.data[yAxis].max = 0
    options.data[y2Axis].min = 0
    options.data[y2Axis].max = 0
    options.data.series = this.layout.qHyperCube.qMeasureInfo.map((m, i) => {
      let series = Object.assign({}, m.options)
      series.key = this.createSeriesKey(m.qFallbackTitle)
      series.data = []
      series.type = (m.options || {}).type || options.type || 'bar'      
      series.accumulative = 0
      if (m.axis === 'secondary') { // right hand axis
        this.addOptions(options.data[y2Axis], m.options || {})
        // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        
        if (options.grouping !== 'stacked') {          
          options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin)
          options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax)
        }        
        options.data[y2Axis].scale = (m.options || {}).scale || y2Scale
        options.data[y2Axis].title = m.qFallbackTitle
        options.data[y2Axis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[y2Axis]))
        }
      }
      else {
        this.addOptions(options.data[yAxis], m.options || {})
        // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)
        if (options.grouping !== 'stacked') {
          options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin)
          options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax)
        }
        console.log('max', options.data[yAxis].max)
        options.data[yAxis].scale = (m.options || {}).scale || yScale
        options.data[yAxis].title = m.qFallbackTitle
        options.data[yAxis].formatter = d => {          
          return this.formatValue(d, Object.assign({}, m.options, options.data[yAxis]))
        }
      }
      return series
    })        
    this.addOptions(options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options || {})
    // options.data[xAxis] = Object.assign({}, options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[0].options)
    if (options.data[xAxis].ticks && options.data[xAxis].ticks.indexOf('d3.time') !== -1) {
      let t = options.data[xAxis].ticks.split('.').pop()
      options.data[xAxis] = d3.time[t]
    }
    options.data[xAxis].title = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle    
    options.data[xAxis].data = []
    options.data[xAxis].min = this.layout.qHyperCube.qDimensionInfo[0].qMin
    options.data[xAxis].max = this.layout.qHyperCube.qDimensionInfo[0].qMax
    options.data[xAxis].scale = (this.layout.qHyperCube.qDimensionInfo[0].options || {}).scale || xScale
    if (options.data[xAxis].scale !== 'Time') {
      options.data[xAxis].formatter = d => {          
        return this.formatValue(d, this.layout.qHyperCube.qDimensionInfo[0].options || {})
      } 
    } 
    else {
      options.data[xAxis].min = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMin)
      options.data[xAxis].max = this.fromQlikDate(this.layout.qHyperCube.qDimensionInfo[0].qMax)
    }   
    const xKeys = []
    const xTotals = []
    const xAcc = []
    this.layout.qHyperCube.qDataPages[0].qMatrix.map(r => {  
      r.forEach((c, cIndex) => {
        if (cIndex === 0) {
          if (options.data[xAxis].scale !== 'Time') {
            options.data[xAxis].min = options.data[xAxis].min.length < c.qText.length ? options.data[xAxis].min : c.qText
            options.data[xAxis].max = options.data[xAxis].max.length > c.qText.length ? options.data[xAxis].max : c.qText
          }
          return
        }        
        let x = r[0]
        x.value = x.qText        
        if ((this.layout.qHyperCube.qDimensionInfo[0].options || {}).scale === 'Time') {
          x.value = this.fromQlikDate(x.qNum)
        }
        // else {
        //   if (xKeys.indexOf(x.value) === -1) {
        //     xKeys.push(x.value)
        //     options.data[xAxis].data.push(x)  
        //   }
        // }
        if (xKeys.indexOf(x.qElemNumber) === -1) {
          xKeys.push(x.qElemNumber)
          xAcc.push(0)
          xTotals.push(0)
          options.data[xAxis].data.push(x)  
        }
        c.value = isNaN(c.qNum) ? 0 : c.qNum            
        xTotals[xKeys.indexOf(x.qElemNumber)] += c.value
        c.tooltipLabel = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle   
        c.tooltipValue = c.qText        
        // if (this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options) {
        // c.color = this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options.color 
        // }        
        c.index = cIndex        
        c.accumulative = xAcc[xKeys.indexOf(x.qElemNumber)]
        xAcc[xKeys.indexOf(x.qElemNumber)] += c.value
        // console.log('accu is', options.data.series[cIndex - 1].key, options.data.series[cIndex - 1].accumulative)
        // options.data.series[cIndex - 1].accumulative += c.value
        x.index = xKeys.indexOf(x.value)
        options.data.series[cIndex - 1].data.push({
          x,
          y: c
        })
      })
    })
    if (options.grouping === 'stacked') {
      options.data[yAxis].min = 0 // may need to revisit this to think about negative numbers
      options.data[yAxis].max = Math.max(...xTotals)
      options.data[y2Axis].min = 0 // may need to revisit this to think about negative numbers
      options.data[y2Axis].max = Math.max(...xTotals)
    }
    console.log('multi measure options', options, xTotals)  
    return options
  }
}

/* global SelectionBar WebsyDesignsQlikPlugins WebsyDropdown */ 
class CurrentSelections {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      def: {
        qInfo: {qType: 'currentSelections'},
        qSelectionObjectDef: {}
      }

    }
    this.options = Object.assign({}, DEFAULTS, options)    
    this.hasOpenDropdown = false
    this.dropdowns = {}
    this.current = []
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html = `
      <div class="websy-selection-bar">
        <div class="left-group">
          <div class="back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448,440a16,16,0,0,1-12.61-6.15c-22.86-29.27-44.07-51.86-73.32-67C335,352.88,301,345.59,256,344.23V424A16,16,0,0,1,229,435.57l-176-168a16,16,0,0,1,0-23.14l176-168A16,16,0,0,1,256,88v80.36c74.14,3.41,129.38,30.91,164.35,81.87C449.32,292.44,464,350.9,464,424a16,16,0,0,1-16,16Z"/></svg>
          </div>
          <div class="forward">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M58.79,439.13A16,16,0,0,1,48,424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16,0,0,1,27.05-11.57l176,168a16,16,0,0,1,0,23.14l-176,168A16,16,0,0,1,256,424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16,0,0,1-17.82,5.28Z"/></svg>
          </div>
          <div class="clear-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
          </div>
        </div>
        <div class="no-selections" id="${this.elementId}_noselections">No Selections</div>
        <div class="selections-group" id="${this.elementId}_selections"></div>    
      </div>
      `
      el.innerHTML = html
    }    
    this.options.app.createSessionObject(this.options.def)
      .then(model => {
        model.on('changed', this.render.bind(this))
        this.options.model = model
        this.render()
      })
  }
  onDropdownOpen () {
    this.hasOpenDropdown = true
  }
  onDropdownClose () {
    this.hasOpenDropdown = false
  }
  render () {
    const el = document.getElementById(`${this.elementId}_selections`)
    const noEl = document.getElementById(`${this.elementId}_noselections`)
    this.options.model.getLayout()
      .then(layout => {
        console.log(layout)
        this.current = []
        if (layout.qSelectionObject.qSelections.length > 0) {
          el.classList.add('active')
          noEl.classList.remove('active')                     
          layout.qSelectionObject.qSelections.forEach((selection, index) => {  
            if (selection.qIsHidden === true) {
              return
            }            
            let id = selection.qField.toLowerCase().replace(/ /g, '_')
            this.current.push(id)
            if (!this.dropdowns[id]) {
              selection.id = id                 
              let newEl = document.createElement('div')
              newEl.id = `${this.elementId}_${id}`
              newEl.classList.add('selection-tabs')              
              el.appendChild(newEl)          
              const def = {
                qInfo: { qType: 'filter' },
                qListObjectDef: {
                  qDef: {
                    qFieldDefs: [selection.qField],
                    qSortCriterias: [{qSortByState: 1, qSortByAscii: 1}]
                  },
                  options: {
                    closeAfterSelection: false
                  }
                }
              }
              this.options.app.createSessionObject(def).then(model => {
                this.dropdowns[id] = {
                  instance: new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_${id}`, {
                    model,
                    multiSelect: true,
                    closeAfterSelection: false
                    // onOpen: this.onDropdownOpen.bind(this),
                    // onClose: this.onDropdownClose.bind(this)
                  }),
                  model
                }
                // model.on('changed', () => {
                //   this.dropdowns[id].instance.render()
                // })
              }) 
            }           
          })                  
        }
        else {
          el.classList.remove('active')
          noEl.classList.add('active')
        }
        // Cleanup unused selections
        for (const key in this.dropdowns) {
          if (this.current.indexOf(key) === -1) {
            const sEl = document.getElementById(`${this.elementId}_${key}`)
            if (sEl) {
              el.removeChild(sEl) 
            }            
            this.options.app.destroySessionObject(this.dropdowns[key].model.id)
            delete this.dropdowns[key]
          }
        }
      })
  }
  backSelection () {
    this.options.app.back()
    this.render()
  }
  forwardSelection () {
    this.options.app.forward()
    this.render()
  }
  clearSelection () {
    this.options.app.clearAll()
    this.render()
  }
  handleClick (event) {  
    if (event.target.classList.contains('back')) {
      this.backSelection()
    } 
    if (event.target.classList.contains('forward')) {
      this.forwardSelection()
    } 
    if (event.target.classList.contains('clear-all')) {
      this.clearSelection()
    } 
  }
}

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
    this.monthYearIsDate = true  
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
    if (typeof d === 'number') {
      d = new Date(d)
    }
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
    this.options.model.searchListObjectFor('/qListObjectDef', query).then(() => {
      this.options.model.acceptListObjectSearch('/qListObjectDef', false).then()
    })
    // })    
    // })    
  }
  render () {
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      console.log(layout)
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
              // 
            }             
          })
          const completeDateListArr = Object.values(completeDateList)
          completeDateListArr.forEach(d => {
            if (d.qState === 'S') {
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
              else {
                disabledDates.push(d.qNum)
              }
            }
          })
          this.picker.setDateBounds([min, max])
          if (selectedRange.length === layout.qListObject.qDataPages[0].qMatrix.length) {
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

/*
  global
  WebsyDesigns
*/
class Dropdown {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      pageSize: 100,
      path: '',
      useVariable: false
    }
    this.options = Object.assign({}, DEFAULTS, options)
    if (!options.def) {
      options.def = { options: {} }
    }
    this.busy = false
    this.dropdownOptions = Object.assign({}, options, options.def.options || {}, {
      onItemSelected: this.itemSelected.bind(this),
      onClearSelected: this.clearSelected.bind(this),
      onSearch: this.search.bind(this),      
      onCancelSearch: this.cancelSearch.bind(this),
      onScroll: this.handleScroll.bind(this),
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      customActions: [
        {
          label: 'Select All',
          fn: () => {
            this.options.model.selectListObjectAll(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Possible',
          fn: () => {
            this.options.model.selectListObjectPossible(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Alternative',
          fn: () => {
            this.options.model.selectListObjectAlternative(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        },
        {
          label: 'Select Excluded',
          fn: () => {
            this.options.model.selectListObjectExcluded(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')).then(() => {
              this.render()
            })
          }
        }
      ]
    })
    this.dropdown = new WebsyDesigns.WebsyDropdown(elementId, this.dropdownOptions)
    this.render()
  }
  cancelSearch (value) {
    this.options.model.abortListObjectSearch(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'))
  }  
  checkForData () {
    return new Promise((resolve, reject) => {
      if (this.busy === false) {
        this.busy = true
        this.options.model.getListObjectData(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), [{
          qTop: this.rowsLoaded,
          qLeft: 0,
          qWidth: 1,
          qHeight: this.options.pageSize
        }]).then(pages => {
          if (this.options.path !== '') {
            this.layout[this.options.path].qListObject.qDataPages[0].qMatrix = this.layout[this.options.path].qListObject.qDataPages[0].qMatrix.concat((pages[0] || {qMatrix: []}).qMatrix)
            this.rowsLoaded = this.layout[this.options.path].qListObject.qDataPages[0].qMatrix.length
          }                           
          else {
            if (!this.layout.qListObject.qDataPages[0]) {
              this.layout.qListObject.qDataPages[0] = {
                qMatrix: []
              }
            }
            this.layout.qListObject.qDataPages[0].qMatrix = this.layout.qListObject.qDataPages[0].qMatrix.concat((pages[0] || {qMatrix: []}).qMatrix)
            this.rowsLoaded = this.layout.qListObject.qDataPages[0].qMatrix.length
          }          
          this.busy = false 
          resolve()
        }, err => {
          this.busy = false
          reject(err)
        })
      }
    })    
  }
  checkForVariable () {
    return new Promise((resolve, reject) => {
      if (this.options.useVariable === true && this.options.variable && this.options.app) {
        this.options.app.getVariableByName(this.options.variable).then(v => {
          v.getLayout().then(layout => {            
            resolve(layout)
          })
        })
      }
      else {
        resolve()
      }
    })
  }
  clearSelected () {
    this.options.model.clearSelections(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'))
  }
  onClose (elementId) {
    this.options.model.endSelections(true)
  }
  handleScroll (event) {    
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.checkForData().then(() => {
        this.dropdown.data = this.transformData()
      })
    }
  }
  itemSelected (item, selectedIndexes, items) {    
    if (this.options.useVariable === true && this.options.variable && this.options.app) {
      this.options.app.getVariableByName(this.options.variable).then(v => {
        if (item.qNum === 'NaN') {
          v.setStringValue(item.qText).then(() => {
            if (this.options.onItemSelected) {
              this.options.onItemSelected(item, selectedIndexes, items)
            }
          })
        }
        else {
          v.setNumValue(item.qNum).then(() => {
            if (this.options.onItemSelected) {
              this.options.onItemSelected(item, selectedIndexes, items)
            }
          })
        }
      })
    }
    else {
      this.options.model.selectListObjectValues(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), [item.qElemNumber], this.dropdown.options.multiSelect === true).then(() => {
        if (this.options.onItemSelected) {
          this.options.onItemSelected(item, selectedIndexes, items)
        }
      })
    }
  }
  onOpen () {
    console.log('dropdown open')    
    this.options.model.beginSelections([`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/')])
  }
  open () {    
    this.dropdown.open()
  }
  render () {
    this.rowsLoaded = 0    
    this.options.model.getLayout().then(layout => {
      this.layout = layout
      this.checkForVariable().then(variableValue => {
        let listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject
        if (!listObject.qDataPages || listObject.qDataPages.length === 0) {
          listObject.qDataPages = [{qMatrix: []}]
        }
        this.rowsLoaded = listObject.qDataPages[0].qMatrix.length
        this.checkForData().then(() => {        
          if (listObject.qDataPages[0]) {
            this.dropdown.options.label = listObject.qDimensionInfo.qFallbackTitle                                
            this.dropdown.data = this.transformData(variableValue)
          }
        })
      })      
    })
  }
  search (value) {
    this.options.model.searchListObjectFor(`/${this.options.path}/qListObjectDef`.replace(/\/\//g, '/'), `*${value}*`)
  }
  transformData (variableValue) {
    const indexes = {}
    let listObject = this.options.path !== '' ? this.layout[this.options.path].qListObject : this.layout.qListObject
    const flatList = listObject.qDataPages[0].qMatrix.map(r => r[0].qText)
    if (this.options.hideExcluded === true) {
      listObject.qDataPages[0].qMatrix = listObject.qDataPages[0].qMatrix.filter(r => ['X', 'XS', 'XL'].indexOf(r[0].qState) === -1) 
    }
    if (variableValue) {
      const index = flatList.indexOf(variableValue.qText)
      if (index !== -1) {
        this.dropdown.selectedItems = [index]
      }
    }
    else {
      listObject.qDataPages[0].qMatrix.forEach((r, i) => {
        if (!indexes[r[0].qState]) {
          indexes[r[0].qState] = []
        }
        indexes[r[0].qState].push(i)
      })        
      if (indexes.S && indexes.S.length > 0) {
        this.dropdown.selectedItems = indexes.S
      }
      else if (indexes.S && indexes.S.length === 0 && indexes.O && indexes.O.length === 1) {
        this.dropdown.selectedItems = indexes.O 
      }
      else {
        this.dropdown.selectedItems = []
      }       
    }   
    return listObject.qDataPages[0].qMatrix.map(r => (Object.assign(r[0], {label: r[0].qText || '-', classes: [`state-${r[0].qState}`]})))                    
  }
}

/* global WebsyDesigns */ 
class KPI {
  constructor (elementId, options) {
    this.elementId = elementId
    this.options = Object.assign({}, options)
    this.kpiOptions = {}
    this.kpi = new WebsyDesigns.WebsyKPI(elementId, this.kpiOptions)
    this.render()
  }
  close () {
    this.kpiOptions.value = { value: '-' }
    this.kpiOptions.subValue = { value: '' }
    this.kpi.render(this.kpiOptions)
  }
  render () {
    this.options.model.getLayout().then(layout => {
      let decimals = 2
      let v = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][0].qText
      this.kpiOptions.value = {
        value: v
      }        
      this.kpiOptions.label = {
        value: layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle
      }
      if (layout.icon) {
        this.kpiOptions.icon = `${window.location.origin}/resources/svg/${layout.icon}.svg`
      }
      if (layout.tooltip && layout.tooltip.value) {
        this.kpiOptions.tooltip = {
          value: layout.tooltip.value
        }
        if (layout.tooltip.classes) {
          this.kpiOptions.tooltip.classes = layout.tooltip.classes
        }
      } 
      this.kpiOptions.subValue = {
        value: ''
      }     
      if (layout.kpi.qHyperCube.qMeasureInfo[1]) {
        let decimals = 2
        if (typeof layout.kpi.qHyperCube.qMeasureInfo[1].decimals !== 'undefined') {
          decimals = layout.kpi.qHyperCube.qMeasureInfo[1].decimals
        }
        let v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText
        this.kpiOptions.subValue = {
          value: `${layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle} ${v1}`
        }        
      }      
      this.kpi.render(this.kpiOptions)
    })    
  }
  resize () {
    this.kpi.resize()
  }
}

/* global WebsyDesigns coreService */ 
class GeoMap {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      geoFillColor: '#783c96',
      geoAutoFill: true,
      geoShowTooltip: true
    }
    this.options = Object.assign({}, DEFAULTS, options, options.def.options)    
    if (this.options.geoJSON && typeof this.options.geoJSON === 'string') {
      WebsyDesigns.service.get(this.options.geoJSON).then(geoJSON => {
        this.geoJSON = geoJSON        
        delete this.options.geoJSON
        this.map = new WebsyDesigns.WebsyMap(elementId, this.options)
        this.render()
      })      
    }   
    else {
      this.map = new WebsyDesigns.WebsyMap(elementId, this.options)
      this.render()
    }    
  }
  findGeoJsonByProperty (province) {
    for (let i = 0; i < this.geoJSON.features.length; i++) {
      if (this.geoJSON.features[i].properties.name.toLowerCase() === province.toLowerCase()) {
        return this.geoJSON.features[i]
      }
    }
    return null
  }
  render () {   
    const el = document.getElementById(this.elementId)     
    if (el.parentElement) {
      el.parentElement.classList.add('loading')
    } 
    this.options.model.getLayout().then(layout => {
      if (layout.options) {
        this.options = Object.assign({}, this.options, layout.options)
        // this.map.options = Object.assign({}, this.options, this.map.options, layout.options)
      }
      if (layout.qHyperCube.qDataPages[0]) {
        if (this.geoJSON) {
          let geoJSON = {
            type: 'FeatureCollection',
            features: []
          }
          layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {          
            let p = this.findGeoJsonByProperty(r[0].qText)          
            if (p) {       
              if (this.options.geoAutoFill === true) {
                p.fillColor = this.options.geoFillColor
                p.fillOpacity = 0.4 + ((r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax) * 0.6)
              }
              if (r[1].qAttrExps && r[1].qAttrExps.qValues && r[1].qAttrExps.qValues[0] && r[1].qAttrExps.qValues[0].qText) {
                p.fillColor = r[1].qAttrExps.qValues[0].qText
              }                     
              if (this.options.geoShowTooltip === true) {
                p.tooltip = `${r[1].qText}<br>${p.properties.label}`
                p.tooltipClass = 'websy-map-tooltip' 
              }              
              geoJSON.features.push(p)
            }            
          })
          this.map.options.geoJSON = geoJSON          
        }
        const data = {}
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(r => {
          r.forEach((c, cIndex) => {
            if (cIndex === 0) {
              return
            }
            if ((layout.qHyperCube.qMeasureInfo[cIndex - 1].options || {}).type === 'polygon') {
              if (!data.polygons) {
                data.polygons = []
              }
              let latLng = JSON.parse(`[${c.qText}]`)
              data.polygons.push({
                label: r[0].qText,
                data: latLng.map(l => l.map(l2 => ({ Latitude: l2[1], Longitude: l2[0] })))
              })
            }
            else {
              // add a marker
            }
          })
        })        
        this.map.options.data = data        
        if (el.parentElement) {
          el.parentElement.classList.remove('loading')
        }
        this.map.render()
      }
    })
  }
}

/* global WebsyDesigns getAllData */ 
class Table {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 50
    }
    this.elementId = elementId    
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.pageNum = 0
    this.pageCount = 0
    this.errorCount = 0    
    this.retryFn = null
    this.pivotIndent = false
    this.busy = false
    this.table = new WebsyDesigns.WebsyTable(this.elementId, Object.assign({}, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),      
      onSort: this.handleSort.bind(this),
      onChangePageSize: this.setPageSize.bind(this),
      onSetPage: this.setPageNum.bind(this)
    }, this.options))
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
    }
    this.render()
  }
  appendRows (data) {
    this.table.appendRows(data)
  }
  getData (callbackFn) {
    if (this.busy === false) {
      this.busy = true
      if (this.options.getAllData === true) {
        getAllData('qHyperCube', this.options.model, this.layout, layout => {
          this.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length
          this.busy = false
          if (callbackFn) {
            callbackFn(layout.qHyperCube.qDataPages[0].qMatrix)  
          }
        })
      }
      else {
        const pageDefs = [{
          qTop: this.rowCount,
          qLeft: 0,
          qWidth: this.dataWidth,
          qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
        }]
        if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
          let method = 'getHyperCubeData'
          if (this.layout.qHyperCube.qMode === 'P') {
            method = 'getHyperCubePivotData'
          }
          this.options.model[method]('/qHyperCubeDef', pageDefs).then(pages => {
            if (pages && pages[0]) {
              if (this.layout.qHyperCube.qMode === 'P') {
                this.layout.qHyperCube.qPivotDataPages.push(pages[0])
                this.rowCount += pages[0].qData.length
              }
              else {
                pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')
                this.layout.qHyperCube.qDataPages.push(pages[0])
                this.rowCount += pages[0].qMatrix.length
              }
              this.busy = false
              if (callbackFn) {
                if (this.layout.qHyperCube.qMode === 'P') {
                  callbackFn(pages[0])  
                }
                else {
                  callbackFn(pages[0].qMatrix)  
                }
              }
            }
          }, err => {
            let e = err          
            if (this.errorCount < 50) {
              this.errorCount++
              console.log('error getting data, attempt', this.errorCount)
              clearTimeout(this.retryFn)
              this.retryFn = setTimeout(() => {
                this.getData(callbackFn)
              }, 300)        
            } 
            // callbackFn({err})
          })
        } 
        else {
          this.busy = false
        }
      }
    }
  }
  getFontColor (c) {
    let colorParts
    let red
    let green
    let blue
    if (c.indexOf('#') !== -1) {
      // hex color
      colorParts = c.toLowerCase().replace('#', '')
      colorParts = colorParts.split('')
      red = parseInt(colorParts[0] + colorParts[1], 16)
      green = parseInt(colorParts[2] + colorParts[3], 16)
      blue = parseInt(colorParts[4] + colorParts[5], 16)
    }
    else if (c.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = c.toLowerCase().replace('rgb(', '').replace(')', '')
      colorParts = colorParts.split(',')
      red = colorParts[0]
      green = colorParts[1]
      blue = colorParts[2]
    }
    return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
  }
  handleClick (event, cell, row, column) {
    if (event.target.classList.contains('table-try-again')) {
      this.render()
    }
    else if (cell && cell.qElemNumber) {
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false)
    }
  }
  handleScroll (event) {    
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.getData(page => {
        this.appendRows(this.transformData(page))
      })
    }
  }
  handleSort (event, column, colIndex) {
    const reverse = column.reverseSort === true
    const patchDefs = [{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([colIndex])
    }]
    let sortType = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? 'qDimensions' : 'qMeasures'
    let sortIndex = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? colIndex : colIndex - this.layout.qHyperCube.qDimensionInfo.length    
    patchDefs.push({
      qOp: 'replace',
      qPath: `/qHyperCubeDef/${sortType}/${sortIndex}/qDef/qReverseSort`,
      qValue: JSON.stringify(reverse)
    })
    this.options.model.applyPatches(patchDefs, true)
  }
  render (pageNum = 0) {    
    this.table.showLoading({message: 'Loading...'})
    this.options.model.getLayout().then(layout => {     
      console.log(layout)
      this.layout = layout
      this.rowCount = pageNum * this.options.pageSize
      this.errorCount = 0
      this.pageNum = pageNum      
      this.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / this.options.pageSize)
      this.table.options.pageNum = this.pageNum
      this.table.options.pageCount = this.pageCount
      if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
        this.table.hideLoading()
        this.table.showError({message: this.options.customError || layout.qHyperCube.qCalcCondMsg})
        return
      }
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder
      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
      }
      let columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
      let activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
      columns = columns.map((c, i) => {
        c.colIndex = this.columnOrder.indexOf(i)
        c.name = c.qFallbackTitle
        if (c.tooltip) {
          c.name += `
          <div class="websy-info websy-info-dock-right" data-info="${c.tooltip}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>
          `
        }
        c.reverseSort = activeSort === i && c.qReverseSort !== true
        c.activeSort = activeSort === i
        if (c.qSortIndicator === 'A') {
          c.sort = 'asc'
        }
        else if (c.qSortIndicator === 'D') {
          c.sort = 'desc'
        }
        return c
      })
      columns.sort((a, b) => {
        return a.colIndex - b.colIndex
      })            
      this.getData(page => {
        this.table.options.columns = columns
        this.table.options.activeSort = activeSort
        this.table.hideLoading()
        this.table.render()
        if (page.err) {
          const tableEl = document.getElementById(`${this.elementId}_foot`)
          tableEl.innerHTML = `
            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>
          ` 
        }
        else {
          this.appendRows(this.transformData(page))          
        }
      })
    }, err => {
      // try again      
      let e = err      
      if (this.errorCount < 50) {
        this.errorCount++
        console.log('error getting layout, attempt', this.errorCount)
        clearTimeout(this.retryFn)
        this.retryFn = setTimeout(() => {
          this.render()
        }, 300)               
      }      
    })
  }
  setPageNum (page) {
    this.render(page)
  }
  setPageSize (size) {
    this.options.pageSize = size
    this.render()
  }
  transformData (page) {
    console.log('page', page)
    if (this.layout.qHyperCube.qMode === 'S') {      
      return page.map(r => {
        return r.map((c, i) => {
          if (this.table.options.columns[i].showAsLink === true || this.table.options.columns[i].showAsNavigatorLink === true) {
            if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
              c.value = c.qAttrExps.qValues[0].qText
              if (c.value.indexOf('https://') === -1) {
                c.value = `https://${c.value}`
              }
              c.displayText = c.qText || '-'
            }
            else {
              c.value = c.qText || '-'
            }
          } 
          else {
            c.value = c.qText || '-'
          }        
          if (c.qAttrExps && c.qAttrExps.qValues) {
            let t = 'qDimensionInfo'
            let tIndex = i
            if (i > this.layout.qHyperCube.qDimensionInfo.length - 1) {
              t = 'qMeasureInfo'
              tIndex -= this.layout.qHyperCube.qDimensionInfo.length
            }
            c.qAttrExps.qValues.forEach((a, aI) => {
              if (a.qText && a.qText !== '') {
                if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  c.color = a.qText
                }
                else if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  c.backgroundColor = a.qText
                }
              }
            })
          }
          return c
        })
      })
    }
    else {
      let data = this.transformPivotTable(page)
      // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
      // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
      // this.table.options.columns = columns        
      this.table.options.columns = data.shift()
      this.table.render()
      return data
      // let rows = []
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
  transformPivotTable (page) {    
    let output = []
    let leftNodes = []
    let topNodes = []
    let topNodesTransposed = []
    let topCounter = 0
    let accCellSpan = 0
    let visibleLeftCount = 0    
    let visibleTopCount = 0   
    let visibleColCount = 0 
    let tempNode = []
    for (let i = 0; i < page.qLeft.length; i++) {
      expandLeft.call(this, page.qLeft[i], 0, 0, null, [])
    }              
    for (let i = 0; i < page.qTop.length; i++) {
      expandTop.call(this, page.qTop[i], 0, i)
    }
    for (let r = 0; r < page.qData.length; r++) {
      let row = page.qData[r]
      for (let c = 0; c < row.length; c++) {
        row[c].pos = 'Data'          
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
          row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText)
        }
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText)
        }
        let lastTop = topNodesTransposed[topNodesTransposed.length - 1][c]
        if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
          row[c].qType = 'T'
        }                           
        row[c].value = row[c].qText                
      }
      if (leftNodes[r]) {
        row = leftNodes[r].concat(row)
      }
      output.push(row)
    }
    let additionalTopCells = []
    let additionalCellCount = visibleLeftCount
    for (let i = 0; i < additionalCellCount; i++) {
      additionalTopCells.push({
        rowspan: 1,
        colSpan: 1,
        level: 0,
        qText: '',
        qType: 'V'
      })
    }
    if (visibleLeftCount !== 0) {                
      for (let i = 0; i < topNodesTransposed.length; i++) {
        if (i === topNodesTransposed.length - 1) {
          topNodesTransposed[i] = (this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).filter((d, dI) => dI < visibleLeftCount).map(d => {
            return {
              name: d.qFallbackTitle
            }
          })).concat(topNodesTransposed[i])
        } 
        else {
          topNodesTransposed[i] = additionalTopCells.concat(topNodesTransposed[i])
        }
      }
    }
    visibleColCount = topNodesTransposed[topNodesTransposed.length - 1]
    output = topNodesTransposed.concat(output)
    // This function is used to convert the qLeft structure from a parent/child hierarchy
    // into a 2 dimensions array    
    function expandLeft (input, level, index, parent, chain) {
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Left'
      o.value = o.qText
      input.value = input.qText
      visibleLeftCount = Math.max(visibleLeftCount, level + 1)
      o.childCount = o.qSubNodes.length      
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes  
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = 'Totals??'
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
        }
      }
      o.rowspan = Math.max(1, input.qSubNodes.length)
      input.rowspan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {        
        leftNodes.push(tempNode.concat([o])) 
        tempNode = []
      } 
      else {
        tempNode.push(o)                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandLeft.call(this, input.qSubNodes[i], level + 1, i, input, [...chain, o])
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].rowspan
        }
        input.rowspan = s
        o.rowspan = s
      }                
    }
    // This function is used to convert the qTop structure from a parent/child hierarchy
    // into a 2 dimensions array
    function expandTop (input, level, index, parent) {
      if (typeof topNodesTransposed[level] === 'undefined') {
        topNodesTransposed[level] = []
      }
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Top'
      o.rowIndex = topCounter
      o.topNode = true
      o.isHeader = true
      o.name = o.qText
      if (!o.font) {
        o.font = {}
      }
      input.value = input.qText
      if (o.qType === 'P') {
        o.qElemNo = -99
      }
      o.childCount = o.qSubNodes.length
      visibleTopCount = Math.max(visibleTopCount, level + 1)      
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes
      if (['T', 'E'].indexOf(o.qType) === -1) {
        o.qType = 'B'
      }
      if (typeof parent !== 'undefined') {
        if (parent.qType === 'T') {
          o.qType = parent.qType
          input.qType = parent.qType
        }
      }
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = this.layout.tableTotalsLabel
          o.name = this.layout.tableTotalsLabel
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
          input.qType = 'T'
        }
      }      
      o.colSpan = Math.max(1, input.qSubNodes.length)
      input.colSpan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {                  
        if (o.qElemNo === -99 && o.qCanCollapse === true) {
          accCellSpan++
        }
      } 
      else {                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandTop.call(this, input.qSubNodes[i], level + 1, i, input)
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].colSpan
        }
        o.rowIndex = topCounter
        topCounter += s
        o.colSpan = s
        input.colSpan = s
        if (o.qType === 'T' && o.qElemNo === -1) {
          accCellSpan += s
        }
        if (o.qElemNo === -99) {
          accCellSpan++
        }
        if (input.qCanExpand === true || input.qCanCollapse === true) {
          if (input.qSubNodes.length > 0 && input.qCanCollapse === true && typeof input.qSubNodes[0].rowIndex !== 'undefined') {
            input.rowIndex = input.qSubNodes[0].rowIndex
            o.rowIndex = input.qSubNodes[0].rowIndex
          } 
          else {
            input.rowIndex = accCellSpan
            o.rowIndex = accCellSpan
            accCellSpan += o.colSpan
          }
        }
      }
      let toPush = [o]
      if (o.colSpan > 1) {
        toPush = new Array(o.colSpan).fill({ ...o })
      }
      topNodesTransposed[level].push(...toPush)   
    }
    return output
  }
}

/* global WebsyDesigns WebsyDesignsQlikPlugins:true Dropdown getAllData */ 
class Table2 {
  constructor (elementId, options) {
    const DEFAULTS = {
      pageSize: 50,
      cellHeight: 35,
      virtualScroll: false,
      columnOverrides: []
    }
    if (Dropdown) {
      if (!WebsyDesignsQlikPlugins) {
        WebsyDesignsQlikPlugins = {}
      }
      WebsyDesignsQlikPlugins.Dropdown = Dropdown
    }
    this.elementId = elementId    
    this.options = Object.assign({}, DEFAULTS, options)
    this.rowCount = 0
    this.pageNum = 0
    this.pageCount = 0
    this.errorCount = 0
    this.leftDataCol = 0
    this.topDataRow = 0
    this.retryFn = null
    this.pivotIndent = false
    this.busy = false
    this.dimensionWidth = 0
    this.dropdowns = []
    this.searchPrepped = false
    this.table = new WebsyDesigns.WebsyTable2(this.elementId, Object.assign({}, {
      onClick: this.handleClick.bind(this),
      onScroll: this.handleScroll.bind(this),      
      onSort: this.handleSort.bind(this),
      onChangePageSize: this.setPageSize.bind(this),
      onSetPage: this.setPageNum.bind(this),
      onScrollX: this.handleVirtualScrollX.bind(this)
    }, this.options))
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
    }
    this.render()
  }
  appendRows (data) {    
    this.table.appendRows(data)
  }
  getData (callbackFn) {
    if (this.busy === false) {
      this.busy = true
      if (this.options.getAllData === true) {
        getAllData('qHyperCube', this.options.model, this.layout, layout => {
          this.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length
          this.busy = false
          if (callbackFn) {
            callbackFn(layout.qHyperCube.qDataPages[0].qMatrix)  
          }
        })
      }
      else {
        const pageDefs = [{
          qTop: this.rowCount,
          qLeft: 0,
          qWidth: this.dataWidth,
          qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
        }]
        if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
          let method = 'getHyperCubeData'
          if (this.layout.qHyperCube.qMode === 'P') {
            method = 'getHyperCubePivotData'
          }
          this.options.model[method]('/qHyperCubeDef', pageDefs).then(pages => {
            if (pages && pages[0]) {
              if (this.layout.qHyperCube.qMode === 'P') {
                this.layout.qHyperCube.qPivotDataPages.push(pages[0])
                this.rowCount += pages[0].qData.length
              }
              else {
                pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')
                this.layout.qHyperCube.qDataPages.push(pages[0])
                this.rowCount += pages[0].qMatrix.length
              }
              this.busy = false
              if (callbackFn) {
                if (this.layout.qHyperCube.qMode === 'P') {
                  callbackFn(pages[0])  
                }
                else {
                  callbackFn(pages[0].qMatrix)  
                }
              }
            }
          }, err => {
            let e = err          
            if (this.errorCount < 50) {
              this.errorCount++
              console.log('error getting data, attempt', this.errorCount)
              clearTimeout(this.retryFn)
              this.retryFn = setTimeout(() => {
                this.getData(callbackFn)
              }, 300)        
            } 
            // callbackFn({err})
          })
        } 
        else {
          this.busy = false
        }
      }
    }
  }
  getFontColor (c) {
    let colorParts
    let red
    let green
    let blue
    if (c.indexOf('#') !== -1) {
      // hex color
      colorParts = c.toLowerCase().replace('#', '')
      colorParts = colorParts.split('')
      red = parseInt(colorParts[0] + colorParts[1], 16)
      green = parseInt(colorParts[2] + colorParts[3], 16)
      blue = parseInt(colorParts[4] + colorParts[5], 16)
    }
    else if (c.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = c.toLowerCase().replace('rgb(', '').replace(')', '')
      colorParts = colorParts.split(',')
      red = colorParts[0]
      green = colorParts[1]
      blue = colorParts[2]
    }
    return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
  }
  handleClick (event, cell, row, column) {
    if (event.target.classList.contains('table-try-again')) {
      this.render()
    }
    else if (cell && cell.qElemNumber) {
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false)
    }
  }
  handleScroll (event) {    
    if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
      this.getData(page => {
        this.appendRows(this.transformData(page))
      })
    }
  }
  handleSearch (event, column) {
    console.log(event, column)
    if (this.dropdowns[column.searchField]) {
      let el = document.getElementById(`${this.elementId}_columnSearch_${event.target.getAttribute('data-col-index')}`)
      if (el) {
        el.classList.toggle('active')
        el.style.top = `${event.pageY}px`
        el.style.right = `calc(100vw - ${event.pageX + event.target.offsetWidth}px)`
        this.dropdowns[column.searchField].open()
      }
    }
  }
  handleCloseSearch (id) {
    let el = document.getElementById(id)
    el.classList.remove('active')
  }
  handleSort (event, column, colIndex) {
    const reverse = column.reverseSort === true
    const patchDefs = [{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([colIndex])
    }]
    let sortType = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? 'qDimensions' : 'qMeasures'
    let sortIndex = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? colIndex : colIndex - this.layout.qHyperCube.qDimensionInfo.length    
    patchDefs.push({
      qOp: 'replace',
      qPath: `/qHyperCubeDef/${sortType}/${sortIndex}/qDef/qReverseSort`,
      qValue: JSON.stringify(reverse)
    })
    this.options.model.applyPatches(patchDefs, true)
  }
  handleVirtualScrollX (startPoint) {
    let handleWidth = (this.columnParams.scrollableWidth) * (this.columnParams.scrollableWidth / this.totalWidth)
    // let withoutScroll = this.columnParams.scrollableWidth - handleWidth
    // let realLeft = startPoint / withoutScroll * (this.totalWidth - handleWidth)
    let realLeft = (startPoint / this.columnParams.scrollableWidth) * this.totalWidth
    let accWidth = 0
    let leftDims = (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)
    this.leftDataCol = 0
    for (let i = leftDims; i < this.fullColumnList.length; i++) {      
      if (realLeft >= (+this.fullColumnList[i].width.replace('px', '') + accWidth)) {
        accWidth += +this.fullColumnList[i].width.replace('px', '')
        this.leftDataCol = i // - leftDims
      }
      else {
        break
      }            
    }
    if (this.fullColumnList.length - this.leftDataCol < this.columnsToRender) {
      this.leftDataCol = (this.fullColumnList.length - this.columnsToRender) + 1
    }
    // console.log('col', startPoint / withoutScroll, realLeft, this.totalWidth, this.leftDataCol)
    this.resize()
  }
  prepDropdowns () {
    // this.table.options.columns.forEach((c, i) => {
    //   if (c.searchable === true && c.searchField && this.layout[c.searchField] && this.layout[c.searchField].qListObject) {
    //     this.dropdowns[c.searchField] = new WebsyDesigns.QlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
    //       model: this.options.model,
    //       path: `${c.searchField}`
    //     })
    //   }
    // })
    this.layout.qHyperCube.qDimensionInfo.forEach((d, i) => {
      if (!this.dropdowns[`dim${i}`]) {
        this.dropdowns[`dim${i}`] = new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
          model: this.options.model,
          path: `dim${i}`,
          onClose: this.handleCloseSearch
        }) 
      }      
    })
  }
  prepSearch () {
    this.busy = true
    this.options.model.getProperties().then(props => {
      console.log('props', props)
      const patches = []
      props.qHyperCubeDef.qDimensions.forEach((d, i) => {
        patches.push({
          qOp: 'add',
          qPath: `/dim${i}`,
          qValue: JSON.stringify({
            qListObjectDef: {
              qDef: {...d.qDef, qSortCriterias: [{qSortByState: 1, qSortByAscii: 1}]},
              qLibraryId: d.qLibraryId
            }
          })
        })
      })
      this.options.model.applyPatches(patches, true).then(() => {
        this.busy = false
        this.searchPrepped = true
        this.render()
      })
    }) 
  }
  render (pageNum = 0) {    
    if (this.searchPrepped === false) {
      this.prepSearch()
      return 
    }
    this.table.showLoading({message: 'Loading...'})    
    this.options.model.getLayout().then(layout => {    
      this.layout = layout      
      this.rowCount = pageNum * this.options.pageSize
      if (this.layout.qHyperCube.qPivotDataPages[0]) {
        this.layout.qHyperCube.qPivotDataPages = []
      }
      this.errorCount = 0
      this.pageNum = pageNum      
      this.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / this.options.pageSize)
      this.table.options.pageNum = this.pageNum
      if (this.layout.qHyperCube.qNoOfLeftDims) {
        this.table.options.leftColumns = (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)
      }
      this.table.options.pageCount = this.pageCount
      if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
        this.table.hideLoading()
        this.table.showError({message: this.options.customError || layout.qHyperCube.qCalcCondMsg})
        return
      }
      this.table.hideError()
      this.dataWidth = this.layout.qHyperCube.qSize.qcx
      this.columnOrder = this.layout.qHyperCube.qColumnOrder
      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = (new Array(this.layout.qHyperCube.qSize.qcx)).fill({}).map((r, i) => i)
      }
      this.layout.qHyperCube.qDimensionInfo = this.layout.qHyperCube.qDimensionInfo.map((c, i) => {
        c.searchable = true
        if (this.options.columnOverrides[i]) {
          c = {
            ...c,             
            onSearch: this.handleSearch.bind(this),
            onCloseSearch: this.handleCloseSearch.bind(this),
            ...this.options.columnOverrides[i]
          }
        }        
        c.searchField = `dim${i}`
        
        return c
      })
      this.layout.qHyperCube.qMeasureInfo = this.layout.qHyperCube.qMeasureInfo.map((c, i) => {
        if (this.options.columnOverrides[this.layout.qHyperCube.qDimensionInfo.length + i]) {
          c = {...c, ...this.options.columnOverrides[this.layout.qHyperCube.qDimensionInfo.length + i]}
        }
        return c
      })
      let columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo)
      let activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0]      
      columns = columns.map((c, i) => {
        c.colIndex = this.columnOrder.indexOf(i)
        c.name = c.qFallbackTitle
        if (c.tooltip) {
          c.name += `
          <div class="websy-info websy-info-dock-right" data-info="${c.tooltip}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z"/></svg>
          </div>
          `
        }
        c.reverseSort = activeSort === i && c.qReverseSort !== true
        c.activeSort = activeSort === i
        if (this.layout.qHyperCube.qMode === 'S') {
          if (c.qSortIndicator === 'A') {
            c.sort = 'asc'
          }
          else if (c.qSortIndicator === 'D') {
            c.sort = 'desc'
          }
        }        
        // if (this.options.columnOverrides[i]) {
        //   c = {...c, ...this.options.columnOverrides[i]}
        // }
        if (c.searchable === true) {
          if (!c.onSearch) {
            c.onSearch = this.handleSearch.bind(this)
          }
        }
        return c
      })
      columns.sort((a, b) => {
        return a.colIndex - b.colIndex
      })       
      if (this.layout.qHyperCube.qMode === 'P') {
        columns = columns.filter((c, i) => i < this.layout.qHyperCube.qNoOfLeftDims)
      }
      columns = columns.filter(c => !c.qError)
      this.table.options.columns = columns
      let activeDimensions = this.layout.qHyperCube.qDimensionInfo        
        .filter(c => !c.qError)        
      let columnParamValues = activeDimensions
        .filter((c, i) => (this.layout.qHyperCube.qMode === 'S' || i < this.layout.qHyperCube.qNoOfLeftDims))
        .map((c, i) => ({ 
          value: new Array(Math.max(c.qApprMaxGlyphCount, this.layout.qHyperCube.qDimensionInfo[i].qFallbackTitle.length)).fill('X').join(''),
          width: c.width || null
        }))
      let measureLabel = activeDimensions.pop()
      // const maxMValue = this.layout.qHyperCube.qMeasureInfo.reduce((a, b) => a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b)
      // columnParamValues.push({ value: new Array(maxMValue.qApprMaxGlyphCount).fill('x').join(''), width)
      columnParamValues = columnParamValues.concat(this.layout.qHyperCube.qMeasureInfo        
        .filter(c => !c.qError)
        .map(c => ({ 
          value: new Array(this.layout.qHyperCube.qMode === 'S' ? c.qApprMaxGlyphCount : Math.max(c.qApprMaxGlyphCount, measureLabel.qApprMaxGlyphCount)).fill('X').join(''),
          width: this.layout.qHyperCube.qMode === 'S' ? c.width || null : c.width || measureLabel.width || null
        })))
      this.columnParams = this.table.getColumnParameters(columnParamValues)     
      for (let i = 0; i < columns.length; i++) {        
        columns[i].width = `${this.columnParams.cellWidths[i] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`                           
      }      
      // this.columnsToRender = Math.ceil(this.columnParams.availableWidth / this.columnParams.cellWidth)
      this.rowsToRender = Math.ceil(this.columnParams.availableHeight / this.columnParams.cellHeight)      
      this.getData(page => {        
        this.table.options.activeSort = activeSort
        this.table.hideLoading()
        if (this.layout.qHyperCube.qMode === 'S') {
          this.table.render()
          this.prepDropdowns()
        }        
        if (page.err) {
          const tableEl = document.getElementById(`${this.elementId}_foot`)
          tableEl.innerHTML = `
            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>
          ` 
        }
        else {
          this.fullData = page
          this.resize()          
        }
      })
    }, err => {
      // try again      
      let e = err      
      if (this.errorCount < 50) {
        this.errorCount++
        console.log('error getting layout, attempt', this.errorCount)
        clearTimeout(this.retryFn)
        this.retryFn = setTimeout(() => {
          this.render()
        }, 300)               
      }      
    })
  }
  resize () {
    this.appendRows(this.transformData(this.fullData))
  }
  setPageNum (page) {
    this.render(page)
  }
  setPageSize (size) {
    this.options.pageSize = size
    this.render()
  }
  transformData (page) {
    if (this.layout.qHyperCube.qMode === 'S') {      
      return page.map(r => {
        return r.map((c, i) => {
          if (this.table.options.columns[i].showAsLink === true || this.table.options.columns[i].showAsNavigatorLink === true) {
            if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
              c.value = c.qAttrExps.qValues[0].qText
              if (c.value.indexOf('https://') === -1) {
                c.value = `https://${c.value}`
              }
              c.displayText = c.qText || '-'
            }
            else {
              c.value = c.qText || '-'
            }
          } 
          else {
            c.value = c.qText || '-'
          }
          if (c.qAttrExps && c.qAttrExps.qValues) {
            let t = 'qDimensionInfo'
            let tIndex = i
            if (i > this.layout.qHyperCube.qDimensionInfo.length - 1) {
              t = 'qMeasureInfo'
              tIndex -= this.layout.qHyperCube.qDimensionInfo.length
            }
            c.qAttrExps.qValues.forEach((a, aI) => {
              if (a.qText && a.qText !== '') {
                if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                  c.color = a.qText
                }
                else if (this.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                  c.backgroundColor = a.qText
                }
              }
            })
          }        
          return c
        })
      })
    }
    else {
      let data = this.transformPivotTable(page)      
      // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
      // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
      // this.table.options.columns = columns   
      this.fullColumnList = data.shift()
      let visibleColumns = []
      let visibleStart = (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)
      for (let i = 0; i < this.fullColumnList.length; i++) {
        if (i < visibleStart) {
          visibleColumns.push(this.fullColumnList[i])
        }
        else if (i >= visibleStart + this.leftDataCol && i < (visibleStart + this.leftDataCol + this.columnsToRender)) {
          visibleColumns.push(this.fullColumnList[i])
        }        
      }      
      this.table.options.columns = visibleColumns      
      let renderedWidth = 0
      visibleColumns.forEach(c => {
        renderedWidth += +(c.width.toString()).replace('px', '')
      })
      this.table.setWidth(renderedWidth)
      this.table.render()
      this.prepDropdowns()
      return data
      // let rows = []
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
  transformPivotTable (page) {    
    let output = []
    let leftNodes = []
    let topNodes = []
    let topNodesTransposed = []
    let topCounter = 0
    let accCellSpan = 0
    let visibleLeftCount = 0    
    let visibleTopCount = 0   
    let visibleColCount = 0 
    let tempNode = []
    for (let i = 0; i < page.qLeft.length; i++) {
      expandLeft.call(this, page.qLeft[i], 0, 0, null, [])
    }              
    for (let i = 0; i < page.qTop.length; i++) {
      expandTop.call(this, page.qTop[i], 0, i)
    }
    leftNodes[0] && leftNodes[0].forEach((c, i) => {
      c.width = this.columnParams.cellWidths[i]
    })
    let scrollableColumns = this.layout.qHyperCube.qSize.qcx // - (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)
    this.totalWidth = 0    
    let accWidth = 0
    this.columnsToRender = 0
    for (let i = 0; i < scrollableColumns; i++) {      
      if (i >= this.leftDataCol && accWidth < this.columnParams.scrollableWidth) {
        accWidth += this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + i] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]
        this.columnsToRender++
      }
      this.totalWidth += this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + i] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]
    }    
    this.table.setHorizontalScroll({
      width: this.columnParams.scrollableWidth * (this.columnParams.scrollableWidth / this.totalWidth),
      left: 0
    })
    topNodesTransposed[topNodesTransposed.length - 1].forEach((c, i) => {
      c.width = `${this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + i] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
    })
    for (let r = 0; r < page.qData.length; r++) {
      let row = []
      for (let i = this.leftDataCol; i < (this.leftDataCol + this.columnsToRender); i++) {
        row.push(page.qData[r][i])
      }      
      for (let c = 0; c < row.length; c++) {
        row[c].pos = 'Data'  
        row[c].style = 'text-align: right;'       
        row[c].width = `${this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + c] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
          row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText)
        }
        if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
          row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText)
        }
        let lastTop = topNodesTransposed[topNodesTransposed.length - 1][c]
        if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
          row[c].qType = 'T'
        }                           
        row[c].value = row[c].qText || ''            
      }
      if (leftNodes[r]) {
        row = leftNodes[r].concat(row)
      }
      output.push(row)
    }    
    let additionalTopCells = []
    let additionalCellCount = visibleLeftCount
    for (let i = 0; i < additionalCellCount; i++) {
      additionalTopCells.push({
        rowspan: 1,
        colSpan: 1,
        level: 0,
        qText: '',
        qType: 'V'
      })
    }
    if (visibleLeftCount !== 0) {                
      for (let i = 0; i < topNodesTransposed.length; i++) {
        if (i === topNodesTransposed.length - 1) {
          topNodesTransposed[i] = (this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).filter((d, dI) => dI < visibleLeftCount).map((d, dI) => {
            return Object.assign({}, d, {
              name: d.qFallbackTitle,
              width: `${this.columnParams.cellWidths[dI] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
            })
          })).concat(topNodesTransposed[i])
        } 
        else {
          topNodesTransposed[i] = additionalTopCells.concat(topNodesTransposed[i])
        }
      }
    }
    visibleColCount = topNodesTransposed[topNodesTransposed.length - 1]
    output = topNodesTransposed.concat(output)
    // This function is used to convert the qLeft structure from a parent/child hierarchy
    // into a 2 dimensions array    
    function expandLeft (input, level, index, parent, chain) {
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Left'
      o.value = o.qText || ''
      input.value = input.qText || ''
      visibleLeftCount = Math.max(visibleLeftCount, level + 1)
      o.childCount = o.qSubNodes.length      
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes  
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = 'Totals'
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
        }
      }
      o.rowspan = Math.max(1, input.qSubNodes.length)
      input.rowspan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {        
        leftNodes.push(tempNode.concat([o])) 
        tempNode = []
      } 
      else {
        tempNode.push(o)                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandLeft.call(this, input.qSubNodes[i], level + 1, i, input, [...chain, o])
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].rowspan
        }
        input.rowspan = s
        o.rowspan = s
      }                
    }
    // This function is used to convert the qTop structure from a parent/child hierarchy
    // into a 2 dimensions array
    function expandTop (input, level, index, parent) {
      if (typeof topNodesTransposed[level] === 'undefined') {
        topNodesTransposed[level] = []
      }
      let o = Object.assign({}, input)
      o.level = level
      o.pos = 'Top'
      o.rowIndex = topCounter
      o.topNode = true
      o.isHeader = true
      o.style = 'text-align: center;'       
      o.name = o.qText || ''
      if (!o.font) {
        o.font = {}
      }
      input.value = input.qText
      if (o.qType === 'P') {
        o.qElemNo = -99
      }
      o.childCount = o.qSubNodes.length
      visibleTopCount = Math.max(visibleTopCount, level + 1)      
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
        o.backgroundColor = o.qAttrExps.qValues[0].qText
        o.color = this.getFontColor(o.qAttrExps.qValues[0].qText)
      }
      if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
        o.color = this.getFontColor(o.qAttrExps.qValues[1].qText)
      }
      delete o.qSubNodes
      if (['T', 'E'].indexOf(o.qType) === -1) {
        o.qType = 'B'
      }
      if (typeof parent !== 'undefined') {
        if (parent.qType === 'T') {
          o.qType = parent.qType
          input.qType = parent.qType
        }
      }
      if (typeof o.qText === 'undefined') {
        if (o.qElemNo === -1) {
          o.qText = this.layout.tableTotalsLabel
        } 
        else if (o.qElemNo === -4) {
          o.qText = ''
          o.qType = 'T'
          input.qType = 'T'
        }
      }      
      o.colSpan = Math.max(1, input.qSubNodes.length)
      input.colSpan = Math.max(1, input.qSubNodes.length)
      if (input.qSubNodes.length === 0) {                  
        if (o.qElemNo === -99 && o.qCanCollapse === true) {
          accCellSpan++
        }
      } 
      else {                  
        for (let i = 0; i < input.qSubNodes.length; i++) {
          expandTop.call(this, input.qSubNodes[i], level + 1, i, input)
        }
        let s = 0
        for (let i = 0; i < input.qSubNodes.length; i++) {
          s += input.qSubNodes[i].colSpan
        }
        o.rowIndex = topCounter
        topCounter += s
        o.colSpan = s
        input.colSpan = s
        if (o.qType === 'T' && o.qElemNo === -1) {
          accCellSpan += s
        }
        if (o.qElemNo === -99) {
          accCellSpan++
        }
        if (input.qCanExpand === true || input.qCanCollapse === true) {
          if (input.qSubNodes.length > 0 && input.qCanCollapse === true && typeof input.qSubNodes[0].rowIndex !== 'undefined') {
            input.rowIndex = input.qSubNodes[0].rowIndex
            o.rowIndex = input.qSubNodes[0].rowIndex
          } 
          else {
            input.rowIndex = accCellSpan
            o.rowIndex = accCellSpan
            accCellSpan += o.colSpan
          }
        }
      }
      let toPush = [o]
      if (o.colSpan > 1) {
        toPush = new Array(o.colSpan).fill({ ...o })
      }
      topNodesTransposed[level].push(...toPush)   
    }
    return output
  }
}


if (typeof WebsyDesigns !== 'undefined') {
  WebsyDesigns.QlikPlugins = {
    Bookmarks,
    Chart,
    CurrentSelections,
    Table,
    Table2,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
  window.WebsyDesignsQlikPlugins = {
    Bookmarks,
    Chart,
    CurrentSelections,
    Table,
    Table2,
    GeoMap,
    Dropdown,
    DatePicker,
    KPI
  }
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
class ObjectManager {
  constructor (options) {
    const defaults = {      
      helpEvent: 'mouseover',
      applySelections: false,
      actions: [],
      retryCount: 5,
      initialActions: [],
      visualisationPlugins: [
        {
          id: 'kpi',
          definition: KPI
        },
        {
          id: 'table',
          definition: Table
        },
        {
          id: 'chart',
          definition: Chart 
        },
        {
          id: 'map',
          definition: GeoMap 
        },
        {
          id: 'dropdown',
          definition: Dropdown
        },
        {
          id: 'datepicker',
          definition: DatePicker
        }
      ]
    }
    this.app = null
    this.paused = false
    this.supportedChartTypes = []
    this.activeViews = []
    this.chartLibrary = {}
    this.globalObjectsLoaded = false    
    this.options = this.mergeObjects({}, defaults, options)            
    // this.options = Object.assign({}, defaults, options)            
    if (this.options.visualisationPlugins && this.options.visualisationPlugins.length > 0) {
      for (let i = 0; i < this.options.visualisationPlugins.length; i++) {
        this.registerVisualisation(this.options.visualisationPlugins[i].id, this.options.visualisationPlugins[i].definition)
      }
    }    
  }
  buildChildElement (elementId, text) {
    let el = document.getElementById(`${elementId}_vis`)
    if (el) {
      return ''
    }
    let html = `
      <article id='${elementId}_vis' class='websy-vis-article'></article>
      <div id='${elementId}_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>
    `
    if (text && text !== '') {
      html += `
        <i class='websy-vis-help-listener' data-element='${elementId}'></i>
        <div id='${elementId}_help' class='websy-vis-help'><span>${text || ''}</span></div>        
      `
    }
    return html
  }  
  mergeObjects () {    
    // Variables
    let extended = {}
    let deep = false
    let i = 0

    // Check if a deep merge
    if (typeof arguments[0] === 'boolean') {
      deep = arguments[0]
      i++
    }

    // Merge the object into the extended object
    let merge = function (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            // If we're doing a deep merge and the property is an object
            extended[prop] = this.mergeObjects(true, extended[prop], obj[prop])
          } 
          else {
            // Otherwise, do a regular merge
            if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
              extended[prop] = extended[prop].concat(obj[prop])
            }
            else {
              extended[prop] = obj[prop]  
            }            
          }
        }
      }
    }
    // Loop through each object and conduct a merge
    for (; i < arguments.length; i++) {
      merge(arguments[i])
    }
    return extended
  }
  init () {
    return new Promise((resolve, reject) => {      
      this.prep('global')        
      this.connectToApp().then(() => {                          
        this.executeAction(0, this.options.initialActions, () => {
          this.selectFromUrl(() => {
            resolve()
          })
        })          
      }, reject)
    })
  }
  pause () {
    this.paused = true
  }
  play (resume, excludeViews) {
    if (typeof excludeViews === 'undefined') {
      excludeViews = []
    }
    this.paused = false
    if (resume === true) {
      if (excludeViews.indexOf('global') === -1) {
        this.loadObjects('global') 
      }      
      for (let i = 0; i < this.activeViews.length; i++) {
        if (excludeViews.indexOf(this.activeViews[i]) === -1) {
          this.loadObjects(this.activeViews[i])
        }
      }
    }        
  }
  request (method, url, data, responseType) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)		
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.responseType = 'text'
      if (responseType) {
        xhr.responseType = responseType
      }
      xhr.withCredentials = true
      xhr.onload = () => {        
        let response = xhr.responseType === 'text' ? xhr.responseText : xhr.response
        if (response !== '' && response !== 'null') {
          try {
            response = JSON.parse(response)
          }
          catch (e) {
            // Either a bad Url or a string has been returned
          }
        }
        else {
          response = null
        }      
        if (response.err) {					
          reject(JSON.stringify(response))
        }
        else {					
          resolve(response)	
        }				
      }
      xhr.onerror = () => reject(xhr.statusText)
      if (data) {
        xhr.send(JSON.stringify(data))	
      }
      else {
        xhr.send()
      }			
    })
  }
  prep (view) {
    // for (let view in this.options.views) {
    // sort out the elements in each view
    for (let o = 0; o < this.options.views[view].objects.length; o++) {
      let config = this.options.views[view].objects[o]
      let el = document.getElementById(config.elementId)
      if (el) {
        el.innerHTML += this.buildChildElement(config.elementId, config.help)
        if (config.help && config.help !== '') {
          el.addEventListener(this.options.helpEvent, this.handleEvent.bind(this))
          el.addEventListener('mouseout', this.handleEvent.bind(this))
        }
      }
    }
    // }    
    // setup  the event listeners for the actions
    // actions should not have a visualisation in the same property structure
    for (let a = 0; a < this.options.actions.length; a++) {      
      let el = document.getElementById(this.options.actions[a].elementId)
      if (el) {
        el.addEventListener(this.options.actions[a].event, () => {                                
          for (let i = 0; i < this.options.actions[a].items.length; i++) {
            let item = this.options.actions[a].items[i]
            if (typeof item.params === 'undefined') {
              item.params = []
            }
            if (item.field) {
              this.app.getField(item.field).then(field => {                
                field[item.method](...item.params)
              })
            }
            else {
              this.app[item.method](...item.params)
            }
          }          
        })
      }
    }
    this.options.views[view].prepped = true
  }
  connectToApp () {
    return new Promise((resolve, reject) => {
      // check for enigma.js      
      const originalId = this.options.enigmaConfig.app
      if (this.options.enigmaConfig.app) {
        this.options.enigmaConfig.app = this.normalizeId(this.options.enigmaConfig.app) 
      }      
      if (typeof enigma === 'undefined') {
        reject({
          error: 'Enigma.js not found.'
        })
        return
      }
      if (typeof this.options.enigmaSchema === 'undefined') {
        reject({
          error: 'enigmaSchema property not found.'
        })
        return
      }
      let url = this.options.enigmaConfig.url
      if (this.options.enigmaConfig.ticket) {
        if (url.indexOf('?') === -1) {
          url += '?'
        }
        else {
          url += '&'
        }
        url += `qlikTicket=${this.options.enigmaConfig.ticket}`
      }
      let config = {
        schema: this.options.enigmaSchema,
        url
      }
      let session = enigma.create(config)
      this.session = session
      session.open().then(global => {
        this.global = global
        global.getActiveDoc().then(app => {          
          if (app) {
            this.app = app
            if (this.options.views.global) {
              this.executeActions('global').then(() => {
                resolve()
              })            
            }
            else {
              resolve()  
            }
          }
          else {
            return this.openApp(originalId).then(() => {
              resolve()
            })
          }
        }, err => {  
          const e = err        
          if (originalId) {
            return this.openApp(originalId).then(() => {
              resolve()
            }, err => {
              this.sessionOnNotification({err})
            }) 
          }          
          else {
            resolve()
          }
        })
        if (this.options.keepAlive === true) {                    
          this.keepAlive()
        }
      }, err => {
        reject(err)
      })
      session.on('traffic:received', (data) => {
        if (typeof data.suspend !== 'undefined') {
          this.sessionSuspended()
        }        
      })
      session.on('notification:*', (eventName, data) => {        
        if (eventName === 'OnAuthenticationInformation') {
          if (data.mustAuthenticate === true) {
            if (this.options.enigmaConfig.authUrl) {
              window.location = this.options.enigmaConfig.authUrl + window.location.search.replace('?', '%3F').replace('=', '%3D') 
            } 
            else if (this.options.enigmaConfig.onMustAuthenticate) {
              this.options.enigmaConfig.onMustAuthenticate()
            }           
            else if (data.loginUri) {
              window.location = data.loginUri
            }
          }
          else if (data.mustAuthenticate === false) {
            this.user = {
              userDirectory: data.userDirectory,
              userId: data.userId
            }
          }
        }
        else {
          this.sessionOnNotification(data, eventName)
        }
      })
      session.on('suspended', this.sessionSuspended.bind(this))
      session.on('resumed', this.sessionResumed.bind(this))
      session.on('closed', this.sessionClosed.bind(this))
    })        
  }
  closeApp () {
    this.session.close()
    this.app = null
    for (let view in this.options.views) {
      this.options.views[view].objects.forEach(o => {
        delete o.objectId
        delete o.vis
        o.attached = false
      })
      delete this.options.views[view]      
    }
  } 
  keepAlive () {
    this.global.engineVersion()
    setTimeout(() => {
      this.keepAlive()
    }, 59000)
  } 
  openApp (appId) {
    return new Promise((resolve, reject) => {
      this.global.openDoc(appId).then(app => {        
        this.app = app 
        if (this.options.views.global) {
          this.executeActions('global').then(() => {
            resolve()
          })            
        }
        else {
          resolve()  
        }
      }, err => {
        reject(err)
      })
    })
  }
  loadView (view, force) {
    if (typeof force === 'undefined') {
      force = false
    }
    if (this.paused === true && force === false) {
      return
    }
    if (view === '' || !this.options.views[view]) {
      return
    }    
    if (this.activeViews.indexOf(view) === -1 && view !== 'global') {
      this.activeViews.push(view)
    }  
    if (this.options.views[view].controller && this.options.views[view].initialized !== true) {
      this.options.views[view].controller.init(() => {
        this.options.views[view].initialized = true
        if (this.options.views[view].prepped !== true) {
          this.prep(view)
        }
        this.executeActions(view).then(() => {    
          if ((this.globalObjectsLoaded === false || this.options.alwaysLoadGlobal === true) && view !== 'global') {
            this.loadObjects('global', force)
            this.globalObjectsLoaded = true
          }
          this.loadObjects(view, force)
          if (view === 'global') {
            this.globalObjectsLoaded = true
          }
        })
      })
    }  
    else {
      if (this.options.views[view].prepped !== true) {
        this.prep(view)
      }
      console.log('Running Actions', view)
      this.executeActions(view).then(() => {    
        console.log('Actions complete', view)
        if ((this.globalObjectsLoaded === false || this.options.alwaysLoadGlobal === true) && view !== 'global') {
          this.loadObjects('global', force)
          this.globalObjectsLoaded = true
        }
        this.loadObjects(view, force)
        if (view === 'global') {
          this.globalObjectsLoaded = true
        }
      })
    }    
  }
  executeAction (index, actionList, callbackFn) {
    let item = actionList[index]
    if (typeof item.params === 'undefined') {
      item.params = []
    }
    if (item.field) {
      this.app.getField(item.field).then(field => {
        field[item.method](...item.params).then(() => {
          if (item.lock === true) {
            field.lock().then(() => {
              index++
              if (index === actionList.length) {
                callbackFn()
              }
              else {
                this.executeAction(index, actionList, callbackFn)
              }
            })
          }
          else {
            index++
            if (index === actionList.length) {
              callbackFn()
            }
            else {
              this.executeAction(index, actionList, callbackFn)
            }
          }          
        })
      })
    }
    else {
      this.app[item.method](...item.params).then(() => {
        index++
        if (index === actionList.length) {
          callbackFn()
        }
        else {
          this.executeAction(index, actionList, callbackFn)
        }
      })
    }
  }
  executeActions (view) {    
    return new Promise((resolve, reject) => {
      if (!this.options.views[view] || !this.options.views[view].actions || this.options.views[view].actions.length === 0) {
        resolve()
      }
      this.executeAction(0, this.options.views[view].actions, resolve)
    })
  }
  loadObjects (view, force) {
    console.log('Loading objects', view)
    if (typeof force === 'undefined') {
      force = false
    }
    if (this.paused === true && force === false) {
      return
    }    
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {                
        if (objList[i].objectId) {
          objList[i].attached = true
          if (objList[i].vis && objList[i].vis.render) {
            objList[i].vis.render()  
          }
          else if (objList[i].render) {
            objList[i].render(objList[i], objList[i].model)
          }          
        }
        else if (objList[i].definition) {
          if (typeof objList[i].definition === 'string' && objList[i].definition.toLowerCase().indexOf('.json') !== -1) {
            this.request('GET', objList[i].definition).then(def => {
              objList[i].definition = def
              this.createObjectFromDefinition(objList[i])
            })
          }
          else {
            this.createObjectFromDefinition(objList[i])
          }          
        }
        else {
          this.createObjectFromDefinition(objList[i])
        }       
      }
    }
  }
  closeObjects (view) {
    this.closeView(view)
  }
  closeView (view) {
    if (view === '' || !this.options.views[view]) {
      return
    }
    const viewIsActive = this.activeViews.indexOf(view)
    if (viewIsActive !== -1) {
      this.activeViews.splice(viewIsActive, 1)
    }
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {
        if (objList[i].vis) {
          objList[i].attached = false
          if (objList[i].vis.close) {
            objList[i].vis.close()  
          }
        }
        else if (objList[i].objectId) {
          if (objList[i].close) {
            objList[i].close()  
          }
          this.destroyObjectFromId(objList[i])          
        }
      }
    }
  }  
  handleEvent (event) {
    if (event.target.classList.contains('websy-vis-help-listener')) {
      let elementId = event.target.attributes['data-element']
      if (elementId.value) {
        this.toggleHelp(`${elementId.value}_help`)
      }
    }
  }
  createObjectFromDefinition (objectConfig) {
    if (objectConfig.retries) {
      objectConfig.retries = 0
    }    
    if (objectConfig.definition && this.app) {
      console.log('Creating object', objectConfig.definition.qInfo)
      let method = 'createSessionObject'
      let params = objectConfig.definition
      if (objectConfig.definition.qField) {
        method = 'getField'
        params = objectConfig.definition.qField
      }
      this.app[method](params).then(model => {
        objectConfig.objectId = model.id
        objectConfig.attached = true
        if (this.supportedChartTypes.indexOf(objectConfig.definition.qInfo.qType) !== -1) {
          let options = Object.assign({}, objectConfig.options, {
            model, 
            def: objectConfig.definition,
            app: this.app
          })
          objectConfig.vis = new this.chartLibrary[objectConfig.definition.qInfo.qType](`${objectConfig.elementId}_vis`, options)
          model.on('changed', () => {
            if (objectConfig.attached === true && this.paused === false) {
              objectConfig.vis.render()
            }
          })
        }
        else if (objectConfig.render && typeof objectConfig.render === 'function') {
          objectConfig.vis = {}
          objectConfig.attached = true
          objectConfig.model = model
          objectConfig.render(objectConfig, model)
          model.on('changed', () => {
            if (objectConfig.attached === true && this.paused === false) {
              objectConfig.render(objectConfig, model)
            }
          })
        }
      }, err => {
        console.log('Error creating object', err)
        if (objectConfig.retries < this.options.retryCount) {
          console.log('retrying')
          objectConfig.retries++
          this.createObjectFromDefinition(objectConfig) 
        }        
        else {
          console.log('Max retries reached.')
        }
      })
    }
    else if (objectConfig.type) {
      objectConfig.objectId = objectConfig.elementId
      objectConfig.attached = true
      objectConfig.vis = new this.chartLibrary[objectConfig.type](`${objectConfig.elementId}_vis`, objectConfig.options || {})
    }    
  }  
  destroyObjectFromId (objectConfig) {
    let hostEl = document.getElementById(`${objectConfig.elementId}_vis`)
    if (hostEl) {
      hostEl.innerHTML = ''
    }
    this.app.destroySessionObject(objectConfig.objectId)
  }
  detachObject (objectConfig) {
    objectConfig.attached = false
  }
  normalizeId (id) {
    return id.replace(/\s:\\\//, '-')
  }
  sessionOnNotification (data, eventName) {    
    if (this.options.sessionOnNotification) {
      this.options.sessionOnNotification(data, eventName)
    }
  }
  sessionOnTraffic (event) {    
    if (this.options.sessionOnTraffic) {
      this.options.sessionOnTraffic(event)
    }
  }
  sessionResumed (event) {        
    if (this.options.sessionResumed) {
      this.options.sessionResumed(event)
    }
  }
  sessionSuspended (event) {    
    if (this.options.sessionSuspended) {
      this.options.sessionSuspended(event)
    }
  }
  sessionClosed (event) {    
    if (this.options.sessionClosed) {
      this.options.sessionClosed(event)
    }
  }
  showHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.add('active')
    }
  }
  hideHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.remove('active')
    }
  }
  toggleHelp (elementId) {
    let el = document.getElementById(elementId)
    if (el) {
      el.classList.toggle('active')
    }
  }
  onError (err) {
    console.log(err)
  }
  onClose (msg) {}
  resize () {
    for (let i = 0; i < this.activeViews.length; i++) {
      this.resizeObjects(this.activeViews[i])
    }
  }
  resizeObjects (view) {
    if (view === '') {
      return
    }    
    let objList = this.options.views[view].objects
    if (objList && objList.length > 0) {
      for (let i = 0; i < objList.length; i++) {                
        if (objList[i].objectId) {          
          if (objList[i].vis && objList[i].vis.resize) {
            objList[i].vis.resize()  
          }
          else if (objList[i].resize) {
            objList[i].resize()
          }          
        }                
      }
    }
  }
  registerVisualisation (name, classDef) {
    if (name.indexOf(/\s/) !== -1) {
      console.log('Failed to register Chart Extension. Chart name must not contain spaces.')
      return
    }
    if (this.supportedChartTypes.indexOf(name) !== -1) {
      console.log('Failed to register Chart Extension. Chart name already exists.')
      return
    }
    this.supportedChartTypes.push(name)
    this.chartLibrary[name] = classDef
  }
  select (index, selections, callbackFn) {
    if (index === selections.length) {
      callbackFn()
      return 
    }
    if (selections[index].param === 'select') {
      this.app
        .getField(selections[index].field, selections[index].state)
        .then(
          f => {
            let values = selections[index].values.map(v => {
              let numRep = +v
              if (!isNaN(numRep)) {
                return {
                  qNumber: numRep,
                  qIsNumeric: true
                }
              } 
              else {
                let dateRep = new Date(v)
                if (!isNaN(dateRep.getDate())) {
                  return {
                    qNumber: WebsyDesigns.Utils.toQlikDate(dateRep),
                    qIsNumeric: true
                  }
                } 
                else {
                  return {
                    qText: decodeURI(v)
                  }
                }
              }
            })
            f.selectValues(values).then(() => {
              index++
              this.select(index, selections, callbackFn)
            })
          },
          err => {
            console.log('field for selection not found', err)
            index++
            this.select(index, selections, callbackFn)
          }
        )
    }
  }
  selectFromUrl (callbackFn) {
    if (this.options.applySelections === true && location.search !== '') {
      let selections = location.search.replace('?', '').split('&')
      selections = selections
        .map(s => {
          let parts = s.split('=')
          let parts2 = parts[1].split(',')
          let field = parts2.shift().replace(/%20/g, ' ')
          let state = '$'
          if (field.indexOf('::') !== -1) {
            // selection has a defined state
            state = field.split('::')[0]
            field = field.split('::')[1]
          }
          return {
            param: parts[0],
            field,
            state,
            values: parts2
          }
        })
        .filter(s => s.param === 'select' || s.param === 'setvariable')
      this.select(0, selections, callbackFn)
    }
    else {
      callbackFn()
    }
  }
}

  WebsyDesigns.QlikObjectManager = ObjectManager
}
