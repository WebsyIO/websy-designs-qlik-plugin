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
      this.publicBookmarks = this.publicBookmarks.filter(bookmark => !(this.options.hidePrefix && bookmark.qMeta.title.indexOf(this.options.hidePrefix) === 0))
      this.publicBookmarks.forEach(bookmark => {        
        // console.log('public', bookmark)
        publicHtml += this.createBookmarkHtml(bookmark)        
      })
      // console.log('publicHtml', publicHtml)
      let bookmarkHtml = ''
      this.myBookmarks.forEach(bookmark => {
        // console.log('my bookmark', bookmark)
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
