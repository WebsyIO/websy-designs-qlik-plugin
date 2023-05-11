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

/* global Bookmark */
var Bookmarks = /*#__PURE__*/function () {
  function Bookmarks(elementId, options) {
    var _this = this;

    _classCallCheck(this, Bookmarks);

    this.elementId = elementId;
    var DEFAULTS = {
      dock: 'left',
      bookmarkIcon: "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /></svg>",
      closeIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      searchIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 512 512\"><path d=\"M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z\" fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"32\" d=\"M338.29 338.29L448 448\"/></svg>",
      editIcon: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n          <path d=\"M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48\"\n          fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/>\n          <path d=\"M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34\n          0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91\n            0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z\"/>\n        </svg>\n      ",
      deleteIcon: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><title>Trash</title>\n          <path d=\"M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z\" fill=\"none\"/>\n          <path d=\"M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42\n            26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 \n            01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132\n            0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 \n            399.43l8-224a16 16 0 1132 1.14z\"/>\n        </svg>               \n      ",
      copyIcon: "Copy",
      tickIcon: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n          <path d=\"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z\" fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\"\n            stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" \n            stroke-width=\"32\" d=\"M352 176L217.6 336 160 272\"/>\n        </svg>\n      ",
      crossIcon: "",
      infoIcon: "\n        <svg class=\"i-icon-public\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n          <path d=\"M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 \n          56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 \n          16v104h28a16 16 0 010 32z\"/>\n        </svg>\n      "
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
      el.addEventListener('change', this.handleChange.bind(this));
      el.addEventListener('contextmenu', this.handleContextMenu.bind(this));
      var html = "\n        <div class='websy-bookmark'>\n          <div class='bookmarkBtn'>\n            ".concat(this.options.bookmarkIcon, "\n          </div>\n          <div class='bookmark-mask' id='").concat(this.elementId, "_bookmarkPopup'></div>\n          <div class='bookmarkContainer dock-").concat(this.options.dock, "' id='bookmarkContainer'>\n            <div class='bookmark-topline'>\n              <span class=\"heading\">").concat(this.options.title || 'Bookmarks', "</span>\n              <button class='createNew'>Create new bookmark</button>\n              <button class=\"closeButton close-panel\">\n                ").concat(this.options.closeIcon, "\n              </button>\n            </div>            \n            <div style='position: relative;' class='websy-bookmark-search'>              \n              <input class='search-input' type='text' id=\"").concat(this.elementId, "_search\" placeholder=\"Search\">\n              ").concat(this.options.searchIcon, "\n            </div>            \n            <div class='public'>\n              <div class=\"public-heading-caret\">\n                <svg class='public-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n                  <title>Caret Down</title>\n                  <path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n                </svg>\n                <span class=\"heading\">Public bookmarks <span id=\"publicCount\">(0)</span></span>\n              </div>\n              <div id=\"public-placeholder\" class=\"active\"><p class='public-text'>You have no public bookmarks</p>\n                <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>              \n              </div>\n            </div>\n            <div class='my-bookmarks'>\n              <div class=\"heading-caret\">\n                <svg class='myBookmarks-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n                  <title>Caret Down</title>\n                  <path\n                    d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n                </svg>\n                <span class=\"heading\">My bookmarks <span id=\"myBookmarksCount\">(0)</span></span>\n              </div>\n              <div id=\"myBookmarks-placeholder\" class=\"active\"></div>\n            </div>\n          </div> \n          <div class='bookmark-mask-dark' id='bookmarkNewPopup'></div>       \n          <div class='createNewPopup' id='createForm'>\n            <div class='createTopline'>\n              <span class=\"heading\">Create bookmark</span>\n              <span class='closeCreate'>\n                <svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>    \n                  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'\n                    d='M368 368L144 144M368 144L144 368' />\n                </svg>\n              </span>\n            </div>\n            <div class=\"create-input\">\n              <label for='bookmarkName' class=\"title\">Title</label>\n              <input type='text' class=\"bookmark-name\" id='bookmarkName' name='bookmarkName'>\n              <label for='bookmarkDescription' class=\"description\">Description <span class='optional'>(optional)</span></label>\n              <textarea type='text' id='").concat(this.elementId, "_bookmarkDescription' name='bookmarkDescription'></textarea>\n              <div class=\"create-flex\">\n                <button type=\"button\" disabled class='create-submit' id='createSubmit'>Create</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    ");
      el.innerHTML = html;
      this.options.app.createSessionObject({
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
      }).then(function (model) {
        _this.options.model = model;

        _this.render();
      });
    }
  }

  _createClass(Bookmarks, [{
    key: "createBookmarkHtml",
    value: function createBookmarkHtml(bookmark, bookmarkType) {
      var html = "\n      <div class=\"public-li\" id=\"public-li\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\">\n        <span class=\"bookmark-text\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">").concat(bookmark.qMeta.title, "</span>\n        <div class=\"date-and-i\">\n          <span class=\"bookmark-text\">").concat(new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10), "</span>\n          <span class=\"info-button\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n            ").concat(this.options.infoIcon, "\n          </span>\n        </div>\n      </div>          \n      <div class=\"info-popup\" id=\"info-popup-").concat(bookmark.qInfo.qId, "\">\n        <div class=\"info-topline\" id=\"info-topline-").concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n          <span class=\"description-heading\" id=\"description-heading\">").concat(bookmark.qMeta.description, "</span>\n        </div>");

      if (bookmark.qMeta.privileges.indexOf('update') !== -1) {
        html += "\n        <div class=\"edit-topline\">\n          <div data-bookmark=\"".concat(bookmark.qInfo.qId, "\" class=\"edit-info active\" id=\"edit-info-").concat(bookmark.qInfo.qId, "\">\n            ").concat(this.options.editIcon, "\n          </div> \n          <div class=\"tick-icon\" id=\"tick-icon-").concat(bookmark.qInfo.qId, "\">\n            ").concat(this.options.tickIcon, "\n          </div>                             \n      ");

        if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
          html += "\n          <div class=\"trash-icon\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\" id=\"deleteIcon-").concat(bookmark.qInfo.qId, "\">\n            ").concat(this.options.deleteIcon, "\n          </div>\n        ");
        }

        html += "        \n        </div>\n        <div id=\"edit-inputs-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"edit-inputs\">\n          <input type=\"text\" id=\"edit-title-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark title\"  value=\"").concat(bookmark.qMeta.title, "\"/>\n          <input type=\"text\" id=\"edit-description-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark description\" value=\"").concat(bookmark.qMeta.description, "\"  />\n        </div>");
      }

      html += "\n      <span class=\"selections\">Selections: ".concat(bookmark.qData.selectionFields, "</span>\n    ");
      html += bookmark.qData.qBookmark.qStateData.map(function (s, i) {
        return "\n      <div class=\"info-copy\">\n        <span class=\"set-expression\">".concat(s.qStateName, "</span>\n        <input type=\"text\" READONLY class=\"info-input\" value=\"\" id=\"").concat(bookmark.qInfo.qId, "_i_set\" />\n        <div class=\"flex\">\n          <div class=\"copied\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copied\"><h5>copied to clipboard</h5></div>\n          <button class=\"copy\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copyBtn-").concat(bookmark.qInfo.qId, "_i\" >Copy</button>          \n        </div>\n      </div>\n    ");
      }).join('');

      if (bookmark.qMeta.published === true && bookmark.qMeta.privileges.indexOf('publish') !== -1) {
        html += "\n        <div class=\"right-click-popup\" id=\"rightClickPopup-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n          <div class=\"right-click-menu\">\n            <p class=\"unpublish-btn\" id=\"unpublishBtn-").concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">Unpublish</p>\n          </div>\n        </div>\n        ");
      }

      if (bookmark.qMeta.published !== true && bookmark.qMeta.privileges.indexOf('publish') !== -1) {
        html += "\n        <div class=\"right-click-popup\" id=\"rightClickPopup-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n          <div class=\"right-click-menu\">\n            <p class=\"publish-btn\" id=\"publishBtn-").concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">Publish</p>\n          </div>\n        </div>\n        ");
      }

      html += "</div>";
      return html;
    }
  }, {
    key: "render",
    value: function render(searchText) {
      var _this2 = this;

      var publicCount = document.getElementById('publicCount');
      this.publicBookmarks = [];
      var myBookmarksCount = document.getElementById('myBookmarksCount');
      this.myBookmarks = [];
      this.options.model.getLayout().then(function (layout) {
        layout.qBookmarkList.qItems.forEach(function (d) {
          if (d.qMeta.published === true) {
            if (searchText) {
              if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                _this2.publicBookmarks.push(d);
              }
            } else {
              _this2.publicBookmarks.push(d);
            }
          } else {
            if (searchText) {
              if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                _this2.myBookmarks.push(d);
              }
            } else {
              _this2.myBookmarks.push(d);
            }
          }
        });
        var publicHtml = "<div id=\"info-popup-mask\" class=\"info-popup-mask\"></div>";
        _this2.publicBookmarks = _this2.publicBookmarks.filter(function (bookmark) {
          return !(_this2.options.hidePrefix && bookmark.qMeta.title.indexOf(_this2.options.hidePrefix) === 0);
        });

        _this2.publicBookmarks.forEach(function (bookmark) {
          // console.log('public', bookmark)
          publicHtml += _this2.createBookmarkHtml(bookmark);
        }); // console.log('publicHtml', publicHtml)


        var bookmarkHtml = '';

        _this2.myBookmarks.forEach(function (bookmark) {
          // console.log('my bookmark', bookmark)
          var createDate = new Date();

          if (bookmark.qMeta.createdDate) {
            createDate = new Date(bookmark.qMeta.createdDate);
          }

          bookmarkHtml += _this2.createBookmarkHtml(bookmark);
        });

        var publicPlaceholder = document.getElementById('public-placeholder');
        publicPlaceholder.innerHTML = publicHtml;
        var myBookmarksPlaceholder = document.getElementById('myBookmarks-placeholder');
        myBookmarksPlaceholder.innerHTML = bookmarkHtml;
        publicCount.textContent = "(" + _this2.publicBookmarks.length + ")";
        myBookmarksCount.textContent = "(" + _this2.myBookmarks.length + ")";
      });
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      var bookmarkName = document.getElementById('bookmarkName').value;

      if (event.target.classList.contains('search')) {
        this.searchFunction();
      }

      if (event.target.classList.contains('bookmark-name')) {
        if (bookmarkName.length === 0) {
          this.disableCreate();
        } else {
          this.enableCreate();
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var _this3 = this;

      var bookmarkTitle = document.getElementById('bookmarkName');
      var bookmarkDescription = document.getElementById('bookmarkDescription');

      if (event.target.classList.contains('bookmarkBtn')) {
        this.openForm();
      }

      if (event.target.classList.contains('bookmark-mask') || event.target.classList.contains('close-panel')) {
        this.closeForm();
        this.closeBookmark();
        var infoList = Array.from(document.getElementsByClassName('info-popup'));
        infoList.forEach(function (e) {
          e.classList.remove('active');
        });
        var mask = document.getElementById('info-popup-mask');
        mask.classList.remove('active');
      }

      if (event.target.classList.contains('createNew')) {
        this.createNewBookmark();
      }

      if (event.target.classList.contains('closeCreate')) {
        var bookmarkBackground = document.getElementById("".concat(this.elementId, "_bookmarkPopup"));
        bookmarkBackground.style.backgroundColor = 'transparent';
        this.closeBookmark();
      }

      if (event.target.classList.contains('public-heading-caret')) {
        this.closePublicUL();
        event.target.classList.toggle('closed');
      }

      if (event.target.classList.contains('heading-caret')) {
        this.closeMyBookmarksUL();
        event.target.classList.toggle('closed');
      }

      if (event.target.classList.contains('create-submit')) {
        var _bookmarkBackground = document.getElementById("".concat(this.elementId, "_bookmarkPopup"));

        _bookmarkBackground.style.backgroundColor = 'transparent';
        this.options.app.createBookmark({
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: "".concat(bookmarkTitle.value),
            description: "".concat((bookmarkDescription || {}).value || '')
          }
        }).then(function () {
          document.getElementById('bookmarkName').value = '';

          _this3.render();
        });
        this.closeBookmark();
      }

      if (event.target.classList.contains('trash-icon')) {
        var bookmarkId = event.target.getAttribute('data-bookmark');
        this.options.app.destroyBookmark(bookmarkId).then(function () {
          _this3.render();
        });
      }

      if (event.target.classList.contains('info-button')) {
        this.toggleInfo(event);
      }

      if (event.target.classList.contains('i-icon-my')) {
        this.toggleInfo(event);
      }

      if (event.target.classList.contains('info-popup-mask')) {
        var _infoList = Array.from(document.getElementsByClassName('info-popup'));

        _infoList.forEach(function (e) {
          e.classList.remove('active');
        });

        var _mask = document.getElementById('info-popup-mask');

        _mask.classList.remove('active');
      }

      if (event.target.classList.contains('edit-info')) {
        this.editInfo(event);
        this.hideInfoTopline(event);
        this.showTickIcon(event);
        this.showdeleteIcon(event);
      }

      if (event.target.classList.contains('tick-icon')) {
        var _bookmarkId = event.target.getAttribute('data-bookmark');

        var editTitle = document.getElementById("edit-title-".concat(_bookmarkId));
        var editDescription = document.getElementById("edit-description-".concat(_bookmarkId));
        this.options.app.getBookmark(_bookmarkId).then(function (result) {
          result.getProperties().then(function (props) {
            props.qMetaDef.title = editTitle.value;
            props.qMetaDef.description = editDescription.value;
            result.setProperties(props);

            _this3.render();
          });
        });
      }

      if (event.target.classList.contains('public-li') || event.target.classList.contains('myBookmarks-li')) {
        var _bookmarkId2 = event.target.getAttribute('data-bookmark');

        this.options.app.applyBookmark(_bookmarkId2);
        this.closeForm();
      }

      if (event.target.classList.contains('copy')) {
        this.copyToClipboard(event);
        this.toggleCopied(event);
      }

      if (event.target.classList.contains('publish-btn')) {
        this.publish(event);
        this.handleContextMenu(event);
      }

      if (event.target.classList.contains('unpublish-btn')) {
        this.unpublish(event);
        this.handleContextMenu(event);
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      if (event.target.classList.contains('search')) {
        this.render(event.target.value);
      }
    }
  }, {
    key: "searchFunction",
    value: function searchFunction() {
      var input = document.getElementById("".concat(this.elementId, "_search"));
      var filter = input.value.toLowerCase();
      this.render(filter);
    }
  }, {
    key: "publish",
    value: function publish(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      this.options.app.getBookmark(bookmarkId).then(function (result) {
        result.publish();
      })["catch"](function (error) {
        console.log('error', error);
      });
    }
  }, {
    key: "unpublish",
    value: function unpublish(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      this.options.app.getBookmark(bookmarkId).then(function (result) {
        result.unpublish();
      })["catch"](function (error) {
        console.log('error', error);
      });
    }
  }, {
    key: "openForm",
    value: function openForm() {
      var myForm = document.getElementById("".concat(this.elementId, "_bookmarkPopup"));

      if (myForm) {
        myForm.style.display = 'block';
      }

      var bookmarkContainer = document.getElementById('bookmarkContainer');

      if (bookmarkContainer) {
        bookmarkContainer.style.display = 'block';
      }
    }
  }, {
    key: "closeForm",
    value: function closeForm() {
      var myForm = document.getElementById("".concat(this.elementId, "_bookmarkPopup"));
      myForm.style.display = 'none';
      var bookmarkContainer = document.getElementById('bookmarkContainer');

      if (bookmarkContainer) {
        bookmarkContainer.style.display = 'none';
      }

      var infoList = Array.from(document.getElementsByClassName('info-popup'));
      infoList.forEach(function (e) {
        e.classList.remove('active');
      });
      var publicForm = Array.from(document.getElementsByClassName('right-click-popup'));
      publicForm.forEach(function (e) {
        e.classList.remove('active');
      });
      var editOptions = document.querySelectorAll('.edit-topline svg');
      editOptions.forEach(function (e) {
        e.classList.remove('active');
      });
      var inputOptions = document.querySelectorAll('.edit-topline svg');
      editOptions.forEach(function (e) {
        e.classList.remove('active');
      });
    }
  }, {
    key: "createNewBookmark",
    value: function createNewBookmark() {
      var createNew = document.getElementById('createForm');
      var maskEl = document.getElementById('bookmarkNewPopup');
      createNew.classList.add('active');
      maskEl.classList.add('active');
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var copyText = document.getElementById('infoInput');
      var copyBtn = document.getElementById("copyBtn-".concat(bookmarkId));
      copyText.select();
      navigator.clipboard.writeText(copyText.value);
    }
  }, {
    key: "toggleCopied",
    value: function toggleCopied(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var inputBox = document.getElementById("copied-".concat(bookmarkId));
      inputBox.classList.toggle('active');
      setTimeout(this.toggleCopied, 3000);
    }
  }, {
    key: "closeBookmark",
    value: function closeBookmark() {
      var createNew = document.getElementById('createForm');
      createNew.classList.remove('active');
      var maskEl = document.getElementById('bookmarkNewPopup');
      maskEl.classList.remove('active');
    }
  }, {
    key: "closePublicUL",
    value: function closePublicUL() {
      var publicItem = document.getElementById('public-placeholder');
      publicItem.classList.toggle('active');
    }
  }, {
    key: "closeMyBookmarksUL",
    value: function closeMyBookmarksUL() {
      var myBookmarksItem = document.getElementById('myBookmarks-placeholder');
      myBookmarksItem.classList.toggle('active');
    }
  }, {
    key: "toggleInfo",
    value: function toggleInfo(event) {
      var infoList = Array.from(document.getElementsByClassName('info-popup'));
      infoList.forEach(function (e) {
        e.classList.remove('active');
      });
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var toggleInfo = document.getElementById("info-popup-".concat(bookmarkId));
      toggleInfo.classList.add('active');
      var mask = document.getElementById('info-popup-mask');
      mask.classList.add('active');
    }
  }, {
    key: "enableCreate",
    value: function enableCreate() {
      document.getElementById('createSubmit').disabled = false;
    }
  }, {
    key: "disableCreate",
    value: function disableCreate() {
      document.getElementById('createSubmit').disabled = true;
    }
  }, {
    key: "editInfo",
    value: function editInfo(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var toggleEdit = document.getElementById("edit-info-".concat(bookmarkId));
      var editInputs = document.getElementById("edit-inputs-".concat(bookmarkId));
      toggleEdit.classList.add('active');
      editInputs.classList.toggle('active');
      this.hideInfoTopline(event);
    }
  }, {
    key: "hideInfoTopline",
    value: function hideInfoTopline(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var hideInfoTop = document.getElementById("info-topline-".concat(bookmarkId));
      hideInfoTop.classList.toggle('active');
    }
  }, {
    key: "showTickIcon",
    value: function showTickIcon(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var showTick = document.getElementById("tick-icon-".concat(bookmarkId));
      showTick.classList.toggle('active');
      var showEdit = document.getElementById("edit-info-".concat(bookmarkId));
      showEdit.classList.toggle('active');
    }
  }, {
    key: "showdeleteIcon",
    value: function showdeleteIcon(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var showTrash = document.getElementById("deleteIcon-".concat(bookmarkId));
      showTrash.classList.toggle('active');
    }
  }, {
    key: "handleContextMenu",
    value: function handleContextMenu(event) {
      if (event.target.classList.contains('public-li') || event.target.classList.contains('myBookmarks-li')) {
        event.preventDefault();
        var infoList = Array.from(document.getElementsByClassName('right-click-popup'));
        infoList.forEach(function (e) {
          e.classList.remove('active');
        });
        var clientX = event.clientX;
        var bookmarkId = event.target.getAttribute('data-bookmark');
        var rightClickMenu = document.getElementById("rightClickPopup-".concat(bookmarkId));

        if (rightClickMenu) {
          rightClickMenu.classList.toggle('active');
          rightClickMenu.style.left = "".concat(clientX, "px");
        }
      }
    }
  }]);

  return Bookmarks;
}();
/* global WebsyDesigns createIdentity d3 */


var Chart = /*#__PURE__*/function () {
  function Chart(elementId, options) {
    var _this4 = this;

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
      return _this4.chart.render();
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
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var location = 'qDataPages';
        var method = 'getHyperCubeData';
        var dataProp = 'qMatrix';

        if (_this5.layout.qHyperCube.qMode === 'K') {
          location = 'qStackedDataPages';
          method = 'getHyperCubeStackData';
          dataProp = 'qData';
        }

        if (_this5.layout.qHyperCube[location][0] && _this5.layout.qHyperCube[location][0][dataProp]) {
          if (_this5.layout.qHyperCube.qMode === 'K') {
            _this5.layout.qHyperCube.qDataPages = [{
              qMatrix: _this5.transformDataToMatrix(_this5.layout.qHyperCube[location][0][dataProp][0].qSubNodes)
            }];
          }

          resolve();
        } else {
          _this5.options.model[method]('/qHyperCubeDef', [{
            qTop: 0,
            qLeft: 0,
            qWidth: _this5.layout.qHyperCube.qSize.qcx,
            qHeight: Math.floor(10000 / _this5.layout.qHyperCube.qSize.qcx)
          }]).then(function (pages) {
            _this5.layout.qHyperCube[location] = pages;

            if (_this5.layout.qHyperCube.qMode === 'K') {
              _this5.layout.qHyperCube.qDataPages = [{
                qMatrix: _this5.transformDataToMatrix(pages[0].qData[0].qSubNodes)
              }];
            }

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
      var rgx = new RegExp('[^a-zA-Z0-9 -]', 'g');
      return title.replace(rgx, '_').replace(/ /g, '_');
    }
  }, {
    key: "formatValue",
    value: function formatValue(d) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var qlikSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var decimals = 0;
      var isPercentage = false;

      if (typeof options.max === 'undefined' && qlikSettings.qMax) {
        options.max = qlikSettings.qMax;
      }

      if (options.decimals) {
        decimals = options.decimals;
      } else if (qlikSettings.qNumFormat && qlikSettings.qNumFormat.qnDec) {
        decimals = qlikSettings.qNumFormat.qnDec;
      }

      if (options.showAsPercentage === true) {
        isPercentage = options.showAsPercentage;
      } else if (qlikSettings.qNumFormat && qlikSettings.qNumFormat.qFmt) {
        isPercentage = qlikSettings.qNumFormat.qFmt.indexOf('%') !== -1;
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
    key: "getColor",
    value: function getColor(cell, dimCell, dimension, measure, colorProps) {
      var colors = this.layout.options.colors || this.chart.options.colors;

      if (colorProps) {
        if (!colorProps.auto) {
          if (colorProps.mode === 'byDimension') {
            if (dimension.qAttrDimInfo && dimension.qAttrDimInfo[0] && dimension.qAttrDimInfo[0].id === 'colorByAlternative') {
              if (this.options.legendKeys.indexOf(dimCell.qAttrDims.qValues[0].qText) === -1) {
                this.options.legendKeys.push(dimCell.qAttrDims.qValues[0].qText);
                this.options.legendData.push({
                  value: dimCell.qAttrDims.qValues[0].qText,
                  color: colors[dimCell.qAttrDims.qValues[0].qElemNo % colors.length]
                });
              }

              return colors[dimCell.qAttrDims.qValues[0].qElemNo % colors.length];
            } else {
              return colors[dimCell.qElemNumber % colors.length];
            }
          } else if (measure.qAttrExprInfo && measure.qAttrExprInfo[0] && measure.qAttrExprInfo[0].id === 'colorByExpression') {
            if (cell.qAttrExps && cell.qAttrExps.qValues && cell.qAttrExps.qValues[0] && cell.qAttrExps.qValues[0].qText) {
              return cell.qAttrExps.qValues[0].qText;
            }
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      this.options.legendData = [];
      this.options.legendKeys = [];
      this.options.model.getLayout().then(function (layout) {
        _this6.layout = layout;
        _this6.chart.brushBarsInitialized = {};
        _this6.chart.brushLinesInitialized = {};
        _this6.chart.brushInitialized = false;
        _this6.chart.brushedDomain = [];

        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          _this6.chart.hideLoading();

          _this6.chart.showError({
            message: _this6.options.customError || layout.qHyperCube.qCalcCondMsg
          });

          return;
        }

        if (layout.qHyperCube.qSize.qcy === 0 || layout.qHyperCube.qSize.qcx === 0) {
          _this6.chart.showError({
            message: 'No data to display'
          });

          return;
        } else {
          _this6.chart.hideError();
        }

        console.log('layout', layout);

        _this6.checkForData().then(function () {
          var options = {};

          if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length === 1) {
            options = _this6.transformMultiMeasure();
          } else if (layout.qHyperCube.qDimensionInfo.length === 1 && layout.qHyperCube.qMeasureInfo.length > 1) {
            options = _this6.transformMultiMeasure();
          } else if (layout.qHyperCube.qDimensionInfo.length > 1) {
            options = _this6.transformMultiDimensions();
          } else if (layout.qHyperCube.qDimensionInfo.length === 0 && layout.qHyperCube.qMeasureInfo.length > 0) {
            options = _this6.transformNoDimensions();
          }

          if (_this6.options.legendData.length > 0) {
            options.legendData = _this6.options.legendData;
          }

          if (layout.refLine && layout.refLine.refLines && layout.refLine.refLines.length > 0) {
            options.refLines = layout.refLine.refLines.filter(function (r) {
              return r.show !== false;
            }).map(function (r) {
              return {
                value: r.refLineExpr.value,
                displayValue: r.refLineExpr.label,
                label: r.showLabel ? r.label : '',
                color: (r.paletteColor || {
                  color: '#000000'
                }).color || '#000000',
                lineWidth: (r.style || {
                  lineThickness: 1
                }).lineThickness || 1,
                lineStyle: (r.style || {
                  lineType: ''
                }).lineType || ''
              };
            });
          }

          layout.qHyperCube.qMeasureInfo.forEach(function (m) {
            if (m.qTrendLines && m.qTrendLines.length > 0) {
              // currently only support straight lines
              if (!options.refLines) {
                options.refLines = [];
              }

              m.qTrendLines.forEach(function (t) {
                options.refLines.push({
                  value: t.qCoeff[0],
                  displayValue: t.label,
                  label: t.label,
                  color: (t.style.paletteColor || {
                    color: '#000000'
                  }).color || '#000000',
                  lineWidth: 1,
                  lineStyle: t.style.lineDash.replace(',', '')
                });
              });
            }
          });

          _this6.chart.render(options);
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
      var _this7 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options, this.options.chartOptions);

      this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {}); // options.data.left = Object.assign({}, this.layout.qHyperCube.qMeasureInfo[0].options || {})

      options.data.left.min = this.layout.qHyperCube.qMeasureInfo[0].qMin;
      options.data.left.max = this.layout.qHyperCube.qMeasureInfo[0].qMax;
      options.data.left.label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
      this.addOptions(options.data.bottom, this.layout.qHyperCube.qDimensionInfo[0].options || {}); // options.data.bottom = Object.assign({}, this.layout.qHyperCube.qDimensionInfo[0].options || {})

      options.data.bottom.label = this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
      options.data.bottom.data = [];
      options.data.left.title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

      options.data.left.formatter = function (d) {
        return _this7.formatValue(d, _this7.layout.qHyperCube.qMeasureInfo[0].options || {}, _this7.layout.qHyperCube.qMeasureInfo[0]);
      };

      var series = this.layout.qHyperCube.qMeasureInfo[0].options || {};
      series.data = [];
      series.key = this.createSeriesKey(this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
      this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
        r[0].value = r[0].qText || '-';
        r[1].value = isNaN(r[1].qNum) ? 0 : r[1].qNum;
        r[1].tooltipValue = r[1].qText;
        r[1].label = r[1].qText || '-';
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
      var _this8 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options, this.options.chartOptions);

      var xAxis = 'bottom';
      var yAxis = 'left';
      var xScale = 'Band';
      var yScale = 'Linear';

      if (options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom'; // xScale = 'Linear'
        // yScale = 'Band'
      }

      this.addOptions(options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {}); // options.data.left = Object.assign({}, options.data.left, this.layout.qHyperCube.qMeasureInfo[0].options || {})

      options.data[xAxis].scale = xScale;
      options.data[yAxis].scale = yScale;
      options.data[yAxis].label = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
      this.addOptions(options.data[xAxis], this.layout.qHyperCube.qDimensionInfo[1].options || {}); // options.data.bottom = Object.assign({}, options.data.bottom, this.layout.qHyperCube.qDimensionInfo[1].options || {})

      options.data[xAxis].label = this.layout.qHyperCube.qDimensionInfo[1].qFallbackTitle;
      options.data[xAxis].data = [];
      options.data[yAxis].title = this.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

      options.data[yAxis].formatter = function (d) {
        return _this8.formatValue(d, _this8.layout.qHyperCube.qMeasureInfo[0].options || {}, _this8.layout.qHyperCube.qMeasureInfo[0]);
      };

      var series = [];
      var seriesKeys = [];
      var bottomKeys = [];
      var bottomAcc = [];
      var bottomTotals = [];
      var groupCounts = {};
      this.layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
        var seriesIndex = seriesKeys.indexOf(r[0].qText || '-');
        var bottomIndex = bottomKeys.indexOf(r[1].qText || '-');
        var v = r[1].qText || '-';

        if ((_this8.layout.qHyperCube.qDimensionInfo[1].options || {}).scale === 'Time') {
          v = _this8.fromQlikDate(r[1].qNum);
        }

        if (bottomIndex === -1) {
          bottomKeys.push(v);
          bottomAcc.push(0);
          bottomTotals.push(0);
          r[1].value = v;
          r[1].valueCount = 0;
          groupCounts[v] = r[1];
          options.data[xAxis].data.push(r[1]);
          bottomIndex = bottomKeys.length - 1;
        }

        groupCounts[v].valueCount++;

        if (seriesIndex === -1) {
          seriesKeys.push(r[0].qText || '-');
          seriesIndex = seriesKeys.length - 1;
          series.push(_extends({}, _this8.layout.qHyperCube.qMeasureInfo[0].options, {
            key: "series_".concat(seriesIndex),
            type: (_this8.layout.qHyperCube.qMeasureInfo[0].options || {}).type || options.type || 'bar',
            accumulative: 0,
            label: r[0].qText || '-',
            // color: this.layout.options.color,
            data: []
          }));
        }

        var c = r[2]; // c.value = isNaN(c.qNum) ? 0 : c.qNum

        c.value = c.qNum;
        c.label = c.qText || '-';

        if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
          c.label = c.qAttrExps.qValues[0].qText;
        }

        c.color = _this8.getColor(c, r[1], _this8.layout.qHyperCube.qDimensionInfo[1], _this8.layout.qHyperCube.qMeasureInfo[0], _this8.layout.qHyperCube.color);
        c.tooltipLabel = r[0].qText;
        c.tooltipValue = c.qText || '-';
        c.accumulative = bottomAcc[bottomIndex];

        if (c.value !== 'NaN') {
          bottomTotals[bottomIndex] += c.value;
          bottomAcc[bottomIndex] += c.value;
        }

        !isNaN(c.value) && series[seriesIndex].data.push({
          x: {
            value: v
          },
          y: c
        });
      });
      options.data.series = series;
      options.data[yAxis].min = this.layout.qHyperCube.qMeasureInfo[0].qMin; // options.data[yAxis].max = this.layout.qHyperCube.qMeasureInfo[0].qMax    

      if (this.options.grouping === 'stacked') {
        options.data[yAxis].max = Math.max.apply(Math, bottomTotals);
      } else {
        options.data[yAxis].max = this.layout.qHyperCube.qMeasureInfo[0].qMax;
      } // options.data[xAxis].min = options.data[xAxis].data[0].value
      // options.data[xAxis].max = options.data[xAxis].data[options.data[xAxis].data.length - 1].value


      return options;
    }
  }, {
    key: "transformNoDimensions",
    value: function transformNoDimensions() {
      var _this9 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options, this.options.chartOptions);

      var xAxis = 'bottom';
      var yAxis = 'left';
      var xScale = 'Band';
      var yScale = 'Linear';

      if (options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom'; // xScale = 'Linear'
        // yScale = 'Band'
      }

      options.data[xAxis].scale = xScale;
      options.data[yAxis].scale = yScale;
      options.data[xAxis].padding = options.padding || 0;
      options.data[xAxis].data = [];
      options.data[yAxis].min = 0;
      options.data[yAxis].max = 0;

      if (options.xTitle) {
        options.data[xAxis].title = options.xTitle;
        options.data[xAxis].showTitle = true;
        options.data[xAxis].titlePosition = 1;
      }

      options.data[yAxis].formatter = function (d) {
        return _this9.formatValue(d, options || {});
      };

      this.layout.qHyperCube.qMeasureInfo.forEach(function (m) {
        options.data[xAxis].data.push({
          value: m.qFallbackTitle
        });

        if (m.qMin !== 'NaN') {
          options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin);
        }

        if (m.qMax !== 'NaN') {
          options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax);
        }
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
              c.index = i;

              if (c.qAttrExps && c.qAttrExps.qValues[0] && c.qAttrExps.qValues[0].qText) {
                c.label = c.qAttrExps.qValues[0].qText;
              }

              return {
                x: {
                  value: _this9.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle
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
      var _this10 = this;

      var options = _extends({}, this.optionDefaults, this.layout.options, this.options.chartOptions);

      var xAxis = 'bottom';
      var x2Axis = 'bottom';
      var yAxis = 'left';
      var y2Axis = 'right';
      var xScale = 'Band';
      var x2Scale = 'Band';
      var yScale = 'Linear';
      var y2Scale = 'Linear';
      var hasyAxis = false;
      var hasy2Axis = false;

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
      options.data[xAxis].padding = options.padding || 0;
      options.data.series = this.layout.qHyperCube.qMeasureInfo.map(function (m, i) {
        var series = _extends({}, m.options);

        series.key = _this10.createSeriesKey(m.qFallbackTitle);
        series.data = [];
        series.type = (m.options || {}).type || options.type || 'bar';
        series.accumulative = 0;

        if (m.axis === 'secondary') {
          // right hand axis
          hasy2Axis = true;

          _this10.addOptions(options.data[y2Axis], m.options || {}); // options.data[y2Axis] = Object.assign({}, options.data[y2Axis], m.options)        


          if (options.grouping !== 'stacked') {
            options.data[y2Axis].min = Math.min(options.data[y2Axis].min, m.qMin);
            options.data[y2Axis].max = Math.max(options.data[y2Axis].max, m.qMax);
          }

          options.data[y2Axis].scale = (m.options || {}).scale || y2Scale;
          options.data[y2Axis].title = m.qFallbackTitle;

          options.data[y2Axis].formatter = function (d) {
            return _this10.formatValue(d, _extends({}, m.options, options.data[y2Axis]), m);
          };
        } else {
          hasyAxis = true;

          _this10.addOptions(options.data[yAxis], m.options || {}); // options.data[yAxis] = Object.assign({}, options.data[yAxis], m.options)


          if (options.grouping !== 'stacked') {
            options.data[yAxis].min = Math.min(options.data[yAxis].min, m.qMin);
            options.data[yAxis].max = Math.max(options.data[yAxis].max, m.qMax);
          }

          console.log('max', options.data[yAxis].max);
          options.data[yAxis].scale = (m.options || {}).scale || yScale;
          options.data[yAxis].title = m.qFallbackTitle;

          options.data[yAxis].formatter = function (d) {
            return _this10.formatValue(d, _extends({}, m.options, options.data[yAxis]), m);
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
          return _this10.formatValue(d, _this10.layout.qHyperCube.qDimensionInfo[0].options || {}, _this10.layout.qHyperCube.qMeasureInfo[0]);
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
              options.data[xAxis].min = (options.data[xAxis].min || '').length < (c.qText || '').length ? options.data[xAxis].min || '' : c.qText || '';
              options.data[xAxis].max = (options.data[xAxis].max || '').length > (c.qText || '').length ? options.data[xAxis].max || '' : c.qText || '';
            }

            return;
          }

          var x = r[0];
          x.value = x.qText || '-';

          if ((_this10.layout.qHyperCube.qDimensionInfo[0].options || {}).scale === 'Time') {
            x.value = _this10.fromQlikDate(x.qNum);
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
          c.tooltipLabel = _this10.layout.qHyperCube.qMeasureInfo[cIndex - 1].qFallbackTitle;
          c.tooltipValue = c.qText || '-';
          c.label = c.qText || '-';
          c.color = _this10.getColor(c, r[0], _this10.layout.qHyperCube.qDimensionInfo[0], _this10.layout.qHyperCube.qMeasureInfo[cIndex - 1], _this10.layout.qHyperCube.color); // if (this.layout.qHyperCube.qMeasureInfo[cIndex - 1].options) {
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
        if (hasyAxis) {
          options.data[yAxis].min = 0; // may need to revisit this to think about negative numbers

          options.data[yAxis].max = Math.max.apply(Math, xTotals);
        }

        if (hasy2Axis) {
          options.data[y2Axis].min = 0; // may need to revisit this to think about negative numbers

          options.data[y2Axis].max = Math.max.apply(Math, xTotals);
        }
      }

      console.log('multi measure options', options, xTotals);
      return options;
    }
  }, {
    key: "transformDataToMatrix",
    value: function transformDataToMatrix(dataInput) {
      var matrix = [];
      dataInput.forEach(function (node, nIndex) {
        if (node.qSubNodes.length > 0) {
          node.qSubNodes.forEach(function (s) {
            var row = [{
              qText: node.qText || '-',
              qElemNumber: node.qElemNo
            }];
            var dimCell2 = {
              qText: s.qText || '-',
              qElemNumber: s.qElemNo
            };

            if (s.qAttrExps) {
              dimCell2.qAttrExps = s.qAttrExps;
            }

            row.push(dimCell2);

            if (s.qSubNodes && s.qSubNodes.length > 0) {
              var expCell = {
                qText: s.qSubNodes[0].qText || '-',
                qNum: s.qSubNodes[0].qValue
              };

              if (s.qSubNodes[0].qAttrExps) {
                expCell.qAttrExps = s.qSubNodes[0].qAttrExps;
              }

              row.push(expCell);
            }

            matrix.push([row[1], row[0], row[2]]);
          });
        }
      });
      return matrix;
    }
  }]);

  return Chart;
}();
/* global SelectionBar WebsyDesignsQlikPlugins WebsyDropdown */


var CurrentSelections = /*#__PURE__*/function () {
  function CurrentSelections(elementId, options) {
    var _this11 = this;

    _classCallCheck(this, CurrentSelections);

    this.elementId = elementId;
    var DEFAULTS = {
      def: {
        qInfo: {
          qType: 'currentSelections'
        },
        qSelectionObjectDef: {}
      },
      backIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M448,440a16,16,0,0,1-12.61-6.15c-22.86-29.27-44.07-51.86-73.32-67C335,352.88,301,345.59,256,344.23V424A16,16,0,0,1,229,435.57l-176-168a16,16,0,0,1,0-23.14l176-168A16,16,0,0,1,256,88v80.36c74.14,3.41,129.38,30.91,164.35,81.87C449.32,292.44,464,350.9,464,424a16,16,0,0,1-16,16Z\"/></svg>",
      forwardIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M58.79,439.13A16,16,0,0,1,48,424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16,0,0,1,27.05-11.57l176,168a16,16,0,0,1,0,23.14l-176,168A16,16,0,0,1,256,424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16,0,0,1-17.82,5.28Z\"/></svg>",
      clearIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>"
    };
    this.options = _extends({}, DEFAULTS, options);
    this.hasOpenDropdown = false;
    this.dropdowns = {};
    this.current = [];
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      var html = "\n      <div class=\"websy-selection-bar\">\n        <div class=\"left-group\">\n          <div class=\"back\">\n            ".concat(this.options.backIcon, "\n          </div>\n          <div class=\"forward\">\n            ").concat(this.options.forwardIcon, "\n          </div>\n          <div class=\"clear-all\">\n            ").concat(this.options.clearIcon, "\n          </div>\n        </div>\n        <div class=\"no-selections\" id=\"").concat(this.elementId, "_noselections\">No Selections</div>\n        <div class=\"selections-group\" id=\"").concat(this.elementId, "_selections\"></div>    \n      </div>\n      ");
      el.innerHTML = html;
    }

    this.options.app.createSessionObject(this.options.def).then(function (model) {
      model.on('changed', _this11.render.bind(_this11));
      _this11.options.model = model;

      _this11.render();
    });
  }

  _createClass(CurrentSelections, [{
    key: "onDropdownOpen",
    value: function onDropdownOpen() {
      this.hasOpenDropdown = true;
    }
  }, {
    key: "onDropdownClose",
    value: function onDropdownClose() {
      this.hasOpenDropdown = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this12 = this;

      var el = document.getElementById("".concat(this.elementId, "_selections"));
      var noEl = document.getElementById("".concat(this.elementId, "_noselections"));
      this.options.model.getLayout().then(function (layout) {
        console.log(layout);
        _this12.current = [];

        if (layout.qSelectionObject.qSelections.length > 0) {
          el.classList.add('active');
          noEl.classList.remove('active');
          layout.qSelectionObject.qSelections.forEach(function (selection, index) {
            if (selection.qIsHidden === true) {
              return;
            }

            var id = selection.qField.toLowerCase().replace(/ /g, '_');

            _this12.current.push(id);

            if (!_this12.dropdowns[id]) {
              selection.id = id;
              var newEl = document.createElement('div');
              newEl.id = "".concat(_this12.elementId, "_").concat(id);
              newEl.classList.add('selection-tabs');
              el.appendChild(newEl);
              var def = {
                qInfo: {
                  qType: 'filter'
                },
                qListObjectDef: {
                  qDef: {
                    qFieldDefs: [selection.qField],
                    qSortCriterias: [{
                      qSortByState: 1,
                      qSortByAscii: 1
                    }]
                  },
                  options: {
                    closeAfterSelection: false
                  }
                }
              };
              var additionalOptions = {};

              if (typeof _this12.options.clearIcon !== 'undefined') {
                additionalOptions.clearIcon = _this12.options.clearIcon;
              }

              if (typeof _this12.options.searchIcon !== 'undefined') {
                additionalOptions.searchIcon = _this12.options.searchIcon;
              }

              if (typeof _this12.options.arrowIcon !== 'undefined') {
                additionalOptions.arrowIcon = _this12.options.arrowIcon;
              }

              _this12.options.app.createSessionObject(def).then(function (model) {
                _this12.dropdowns[id] = {
                  instance: new WebsyDesignsQlikPlugins.Dropdown("".concat(_this12.elementId, "_").concat(id), _extends({}, additionalOptions, {
                    model: model,
                    multiSelect: true,
                    closeAfterSelection: false // onOpen: this.onDropdownOpen.bind(this),
                    // onClose: this.onDropdownClose.bind(this)

                  })),
                  model: model
                };
                model.on('changed', function () {
                  _this12.dropdowns[id].instance.render();
                });
              });
            }
          });
        } else {
          el.classList.remove('active');
          noEl.classList.add('active');
        } // Cleanup unused selections


        for (var key in _this12.dropdowns) {
          if (_this12.current.indexOf(key) === -1) {
            var sEl = document.getElementById("".concat(_this12.elementId, "_").concat(key));

            if (sEl) {
              sEl.remove();
            }

            _this12.options.app.destroySessionObject(_this12.dropdowns[key].model.id);

            delete _this12.dropdowns[key];
          }
        }
      });
    }
  }, {
    key: "backSelection",
    value: function backSelection() {
      this.options.app.back();
      this.render();
    }
  }, {
    key: "forwardSelection",
    value: function forwardSelection() {
      this.options.app.forward();
      this.render();
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.options.app.clearAll();
      this.render();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('back')) {
        this.backSelection();
      }

      if (event.target.classList.contains('forward')) {
        this.forwardSelection();
      }

      if (event.target.classList.contains('clear-all')) {
        this.clearSelection();
      }
    }
  }]);

  return CurrentSelections;
}();
/*
  global
  WebsyDesigns
  d3
*/


var DatePicker = /*#__PURE__*/function () {
  function DatePicker(elementId, options) {
    _classCallCheck(this, DatePicker);

    var DEFAULTS = {
      mode: 'date',
      pageSize: 1000,
      dateFormat: '%_m/%_d/%Y',
      softLock: false
    };
    this.elementId = elementId;
    this.monthYearIsDate = true;
    this.options = _extends({}, DEFAULTS, options);
    this.picker = new _websyDesignsEs["default"].WebsyDatePicker(elementId, _extends({}, options, {
      onChange: this.onChange.bind(this),
      onClear: this.onClear.bind(this)
    }));
    this.listening = true;
    this.dateList = [];
    this.selectedRangeIndex = 0;
    this.hourList = new Array(24).fill(0).map(function (d, i) {
      return (i < 10 ? '0' : '') + i + ':00';
    });
    this.altHourList = new Array(24).fill(0).map(function (d, i) {
      return i + ':00';
    });

    if (typeof d3 !== 'undefined') {
      if (d3.timeFormat) {
        this.formatDate = d3.timeFormat(this.options.dateFormat);
      } else if (d3.time && d3.time.format) {
        this.formatDate = d3.time.format(this.options.dateFormat);
      } else {
        this.formatDate = function (d) {
          return d;
        };
      }
    } else {
      this.formatDate = function (d) {
        return d;
      };
    }

    this.render();
  }

  _createClass(DatePicker, [{
    key: "checkForData",
    value: function checkForData() {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        if (_this13.listening === true) {
          _this13.listening = false;

          _this13.options.model.getListObjectData('/qListObjectDef', [{
            qTop: 0,
            qLeft: 0,
            qWidth: 1,
            qHeight: _this13.options.pageSize
          }]).then(function (pages) {
            _this13.layout.qListObject.qDataPages = [pages[0]];
            _this13.listening = true;
            resolve();
          }, function (err) {
            _this13.listening = true;
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
      } // d.setTime(d.getTime() + d.getTimezoneOffset() * 60000)


      return new Date(d.setUTCHours(12, 0, 0, 0));
    }
  }, {
    key: "fromQlikDate",
    value: function fromQlikDate(d) {
      var output = new Date(Math.round((d - 25569) * 86400000));
      return this.floorDate(output);
    }
  }, {
    key: "getField",
    value: function getField(f) {
      var _this14 = this;

      return new Promise(function (resolve, reject) {
        if (_this14.field) {
          resolve(_this14.field);
        } else {
          _this14.options.app.getField(f).then(function (field) {
            if (field) {
              _this14.field = field;
              resolve(_this14.field);
            }
          }, reject);
        }
      });
    }
  }, {
    key: "toQlikDate",
    value: function toQlikDate(d) {
      if (typeof d === 'number') {
        d = new Date(d);
      }

      return this.formatDate(d).replace(/ /g, '');
    }
  }, {
    key: "toQlikDateNum",
    value: function toQlikDateNum(d) {
      if (typeof d === 'number') {
        return Math.floor(d / 86400000 + 25569);
      } else {
        return Math.floor(d.getTime() / 86400000 + 25569);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(data, isRange, selectedRangeIndex) {
      var _this15 = this;

      var start;
      var end;
      this.selectedRangeIndex = selectedRangeIndex;
      var valueList = data.map(function (d) {
        if (_this15.options.mode === 'date') {
          if (typeof d === 'number') {
            return d;
          }

          return d.getTime(); // return this.toQlikDate(d)
        } else if (_this15.options.mode === 'monthyear') {
          if (_this15.monthYearIsDate === true) {
            return _this15.toQlikDate(d);
          } else {
            if (!d.getFullYear) {
              d = new Date(d);
            }

            return +"".concat(d.getFullYear()).concat(d.getMonth() < 9 ? '0' : '').concat(d.getMonth() + 1);
          }
        } else {
          return d;
        }
      });
      var query = '';
      var elemNums = [];

      if (isRange) {
        if (this.options.mode === 'date') {
          if (valueList.length === 2 && valueList[0] !== valueList[1]) {
            // let diff = (valueList[1] - valueList[0]) / (1000 * 60 * 60 * 24)     
            var qlikStart = this.toQlikDateNum(valueList[0]);
            var qlikEnd = this.toQlikDateNum(valueList[1]);

            for (var i = qlikStart; i < qlikEnd + 1; i++) {
              if (this.completeQlikDateList[i] && typeof this.completeQlikDateList[i].qElemNumber !== 'undefined') {
                elemNums.push(this.completeQlikDateList[i].qElemNumber);
              }
            } // for (let i = valueList[0]; i < (valueList[1] + 1); i += (1000 * 60 * 60 * 24)) {
            //   if (this.completeDateList[i] && this.completeDateList[i].qElemNumber) {
            //     elemNums.push(this.completeDateList[i].qElemNumber)
            //   }
            // }

          } else {
            if (this.completeDateList[valueList[0]] && typeof this.completeDateList[valueList[0]].qElemNumber !== 'undefined') {
              elemNums.push(this.completeDateList[valueList[0]].qElemNumber);
            }
          }
        } else {
          query = "".concat(valueList[0]);

          if (valueList.length > 1) {
            query = ">=".concat(valueList[0], "<=").concat(valueList[valueList.length - 1]);
          }
        }
      } else {
        if (this.options.mode === 'date') {
          elemNums = valueList.map(function (d) {
            return _this15.completeDateList[d].qElemNumber;
          });
        } else {
          query = valueList.join(' ');
        }
      } // this.getField(this.options.selectField).then(field => {
      // set listening to false to stop Qlik from updating the state of the datepicker
      // this.listening = false
      // this.options.model.beginSelections('/qListObjectDef').then(() => {


      if (this.options.mode === 'hour') {
        this.options.model.selectListObjectValues('/qListObjectDef', data.map(function (v) {
          return v.qElemNumber;
        }), false, this.options.softLock);
      } else if (this.options.mode === 'date') {
        if (elemNums.length === 0) {// we should always be selecting something if we arrive in the onchange function
          // not true any more
          // this.picker.selectRange(0, true)
        } else {
          this.options.model.selectListObjectValues('/qListObjectDef', elemNums, false, this.options.softLock);
        }
      } else {
        this.options.model.searchListObjectFor('/qListObjectDef', query).then(function () {
          _this15.options.model.acceptListObjectSearch('/qListObjectDef', false, _this15.options.softLock);
        });
      } // })    
      // })    

    }
  }, {
    key: "onClear",
    value: function onClear() {
      if (this.options.onClear) {
        this.options.onClear();
      } else {
        this.options.model.clearSelections('/qListObjectDef');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this16 = this;

      this.options.model.getLayout().then(function (layout) {
        _this16.layout = layout;

        _this16.checkForData().then(function () {
          var disabledDates = [];
          var min;
          var max;
          var selectedMin;
          var selectedMax;
          var selectedRange = [];

          if (layout.qListObject.qDataPages[0] && _this16.listening === true) {
            // ensure we have a complete calendar
            _this16.completeDateList = {};
            _this16.completeQlikDateList = {};
            var oneDay = 1000 * 60 * 60 * 24;
            var start;
            var end;

            if (_this16.options.mode === 'date') {
              // start = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[0][0].qNum).getTime()
              // end = this.fromQlikDate(layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum).getTime()
              start = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum;
              end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum;
            } else if (_this16.options.mode === 'year') {
              start = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum;
              end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum;

              if (start > end) {
                end = layout.qListObject.qDataPages[0].qMatrix[0][0].qNum;
                start = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0].qNum;
                _this16.options.sortDirection = 'desc';
                _this16.picker.options.sortDirection = 'desc';
              }

              min = start;
              max = end;
              _this16.picker.options.minAllowedYear = start;
              _this16.picker.options.maxAllowedYear = end;
            } else if (_this16.options.mode === 'monthyear') {
              start = layout.qListObject.qDataPages[0].qMatrix[0][0];
              end = layout.qListObject.qDataPages[0].qMatrix[layout.qListObject.qDataPages[0].qMatrix.length - 1][0];

              if (start.qNum.toString().length === 5) {
                _this16.monthYearIsDate = true;
                start = _this16.fromQlikDate(start.qNum);
                end = _this16.fromQlikDate(end.qNum);
              } else {
                _this16.monthYearIsDate = false;
                var startYear = +start.qNum.toString().substring(0, 4);
                var startMonth = +start.qNum.toString().substring(4, 6) - 1;
                var endYear = +end.qNum.toString().substring(0, 4);
                var endMonth = +end.qNum.toString().substring(4, 6) - 1;
                start = new Date(new Date(new Date(new Date().setDate(1)).setMonth(startMonth)).setFullYear(startYear));
                end = new Date(new Date(new Date(new Date().setDate(1)).setMonth(endMonth)).setFullYear(endYear));
              }
            } else if (_this16.options.mode === 'hour') {// 
            }

            var diff = end - start; // if (this.options.mode === 'date') {
            //   diff = Math.floor(diff / oneDay)
            // }

            if (_this16.options.mode === 'monthyear') {
              var yearDiff = (end.getFullYear() - start.getFullYear()) * 12;
              diff = Math.floor(end.getMonth() - start.getMonth()) + yearDiff;
            }

            for (var i = 0; i < diff + 1; i++) {
              if (_this16.options.mode === 'date') {
                var temp = _this16.fromQlikDate(start + i); // temp.setUTCHours(0, 0, 0)      


                _this16.completeDateList[temp.getTime()] = {
                  qNum: start + i,
                  qState: 'Z'
                };
                _this16.completeQlikDateList[start + i] = {
                  qNum: start + i,
                  qState: 'Z'
                };
              } else if (_this16.options.mode === 'year') {
                _this16.completeDateList[start + i] = {
                  qNum: start + i,
                  qState: 'Z'
                };
              } else if (_this16.options.mode === 'monthyear') {
                var _temp = _this16.floorDate(new Date(new Date(start.getTime()).setMonth(start.getMonth() + i))); // temp.setUTCHours(0, 0, 0)


                _this16.completeDateList[_temp.getTime()] = {
                  qNum: _this16.monthYearIsDate === true ? _this16.toQlikDateNum(_temp) : "".concat(_temp.getFullYear()).concat(_temp.getMonth() < 9 ? '0' : '').concat(_temp.getMonth() + 1),
                  qState: 'Z'
                };
              } else if (_this16.options.mode === 'hour') {// 
              }
            }

            var hours = [];
            layout.qListObject.qDataPages[0].qMatrix.forEach(function (r, i, arr) {
              if (_this16.options.mode === 'date') {
                if (_this16.completeDateList[_this16.fromQlikDate(r[0].qNum).getTime()]) {
                  _this16.completeDateList[_this16.fromQlikDate(r[0].qNum).getTime()] = r[0];
                }

                if (_this16.completeQlikDateList[r[0].qNum]) {
                  _this16.completeQlikDateList[r[0].qNum] = r[0];
                }

                if (i === 0) {
                  min = _this16.fromQlikDate(r[0].qNum);
                } else if (i === arr.length - 1) {
                  max = _this16.fromQlikDate(r[0].qNum);
                }
              } else if (_this16.options.mode === 'year') {
                if (_this16.completeDateList[r[0].qNum]) {
                  _this16.completeDateList[r[0].qNum] = r[0];
                } // if (i === 0) {
                //   min = r[0].qNum
                // }
                // if (i === arr.length - 1) {
                //   max = r[0].qNum
                // } 

              } else if (_this16.options.mode === 'monthyear') {
                if (_this16.monthYearIsDate === true) {
                  if (_this16.completeDateList[_this16.fromQlikDate(r[0].qNum).getTime()]) {
                    _this16.completeDateList[_this16.fromQlikDate(r[0].qNum).getTime()] = r[0];
                  }

                  if (_this16.completeQlikDateList[r[0].qNum]) {
                    _this16.completeQlikDateList[r[0].qNum] = r[0];
                  }

                  if (i === 0) {
                    min = _this16.fromQlikDate(r[0].qNum);
                  } else if (i === arr.length - 1) {
                    max = _this16.fromQlikDate(r[0].qNum);
                  }
                } else {
                  var d = r[0];

                  var _startYear = +d.qNum.toString().substring(0, 4);

                  var _startMonth = +d.qNum.toString().substring(4, 6) - 1;

                  d = _this16.floorDate(new Date(new Date(new Date(new Date().setDate(1)).setMonth(_startMonth)).setFullYear(_startYear)));

                  if (_this16.completeDateList[d.getTime()]) {
                    _this16.completeDateList[d.getTime()] = r[0];
                  }

                  if (i === 0) {
                    min = d;
                  } else if (i === arr.length - 1) {
                    max = d;
                  }
                }
              } else if (_this16.options.mode === 'hour') {
                hours.push(_extends({}, r[0], {
                  text: r[0].qText,
                  num: r[0].qNum
                }));
              }
            });
            var completeDateListArr = Object.values(_this16.completeDateList);

            if (_this16.options.mode === 'hour') {
              completeDateListArr = hours;
            }

            completeDateListArr.forEach(function (d) {
              if (['S', 'L', 'XS', 'XL'].indexOf(d.qState) !== -1) {
                if (_this16.options.mode === 'date') {
                  selectedRange.push(_this16.fromQlikDate(d.qNum));
                } else if (_this16.options.mode === 'monthyear') {
                  if (_this16.monthYearIsDate === true) {
                    selectedRange.push(_this16.fromQlikDate(d.qNum));
                  } else {
                    var year = +d.qNum.toString().substring(0, 4);
                    var month = +d.qNum.toString().substring(4, 6) - 1;
                    d = _this16.floorDate(new Date(new Date(new Date(new Date().setDate(1)).setMonth(month)).setFullYear(year)));
                    selectedRange.push(d);
                  }
                } else if (_this16.options.mode === 'hour') {
                  var hourIndex = _this16.hourList.indexOf(d.qText);

                  if (hourIndex !== -1) {
                    selectedRange.push(hourIndex);
                  } else {
                    hourIndex = _this16.altHourList.indexOf(d.qText);

                    if (hourIndex !== -1) {
                      selectedRange.push(hourIndex);
                    }
                  }
                } else {
                  selectedRange.push(d.qNum);
                }
              } // if (['X', 'XS', 'XL'].indexOf(d.qState) !== -1) {


              if (['Z'].indexOf(d.qState) !== -1) {
                if (_this16.options.mode === 'date') {
                  disabledDates.push(_this16.fromQlikDate(d.qNum));
                } else if (_this16.options.mode === 'monthyear') {
                  if (_this16.monthYearIsDate === true) {
                    disabledDates.push(_this16.fromQlikDate(d.qNum));
                  } else {
                    disabledDates.push(d.qNum);
                  }
                } else if (_this16.options.mode === 'hour') {
                  disabledDates.push(d.qText);
                } else {
                  disabledDates.push(d.qNum);
                }
              }
            });

            if (_this16.options.minAllowedDate || _this16.options.maxAllowedDate) {
              min = _this16.options.minAllowedDate;
              max = _this16.options.maxAllowedDate;
            }

            if (_this16.options.mode === 'hour') {
              _this16.picker.options.hours = completeDateListArr;
            }

            _this16.picker.setDateBounds([min, max]);

            if (_this16.selectedRangeIndex < 0) {
              if (selectedRange.length === layout.qListObject.qDataPages[0].qMatrix.length) {// do nothing because all values are selected
              } else if (selectedRange.length > 0) {
                _this16.picker.selectCustomRange(selectedRange);
              } else if (selectedRange.length === 0) {
                _this16.picker.selectRange(0, false);
              }
            } else if (selectedRange.length !== layout.qListObject.qDataPages[0].qMatrix.length && selectedRange.length > 0) {
              _this16.picker.selectCustomRange(selectedRange);
            } else if (_this16.selectedRangeIndex === 0 && selectedRange.length === 0) {
              _this16.picker.selectRange(0, false);
            }

            _this16.picker.render(disabledDates);

            _this16.listening = true;
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
    var _this17 = this;

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
      onScroll: this.handleScroll.bind(this),
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      customActions: [{
        label: 'Clear All',
        fn: function fn() {
          _this17.options.model.clearSelections("/".concat(_this17.options.path, "/qListObjectDef").replace(/\/\//g, '/')).then(function () {
            _this17.render();
          });
        }
      }, {
        label: 'Select All',
        fn: function fn() {
          _this17.options.model.selectListObjectAll("/".concat(_this17.options.path, "/qListObjectDef").replace(/\/\//g, '/')).then(function () {
            _this17.render();
          });
        }
      }, {
        label: 'Select Possible',
        fn: function fn() {
          _this17.options.model.selectListObjectPossible("/".concat(_this17.options.path, "/qListObjectDef").replace(/\/\//g, '/')).then(function () {
            _this17.render();
          });
        }
      }, {
        label: 'Select Alternative',
        fn: function fn() {
          _this17.options.model.selectListObjectAlternative("/".concat(_this17.options.path, "/qListObjectDef").replace(/\/\//g, '/')).then(function () {
            _this17.render();
          });
        }
      }, {
        label: 'Select Excluded',
        fn: function fn() {
          _this17.options.model.selectListObjectExcluded("/".concat(_this17.options.path, "/qListObjectDef").replace(/\/\//g, '/')).then(function () {
            _this17.render();
          });
        }
      }]
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
      var _this18 = this;

      return new Promise(function (resolve, reject) {
        if (_this18.busy === false) {
          _this18.busy = true;

          _this18.options.model.getListObjectData("/".concat(_this18.options.path, "/qListObjectDef").replace(/\/\//g, '/'), [{
            qTop: _this18.rowsLoaded,
            qLeft: 0,
            qWidth: 1,
            qHeight: _this18.options.pageSize
          }]).then(function (pages) {
            if (_this18.options.path !== '') {
              _this18.layout[_this18.options.path].qListObject.qDataPages[0].qMatrix = _this18.layout[_this18.options.path].qListObject.qDataPages[0].qMatrix.concat((pages[0] || {
                qMatrix: []
              }).qMatrix);
              _this18.rowsLoaded = _this18.layout[_this18.options.path].qListObject.qDataPages[0].qMatrix.length;
            } else {
              if (!_this18.layout.qListObject.qDataPages[0]) {
                _this18.layout.qListObject.qDataPages[0] = {
                  qMatrix: []
                };
              }

              _this18.layout.qListObject.qDataPages[0].qMatrix = _this18.layout.qListObject.qDataPages[0].qMatrix.concat((pages[0] || {
                qMatrix: []
              }).qMatrix);
              _this18.rowsLoaded = _this18.layout.qListObject.qDataPages[0].qMatrix.length;
            }

            _this18.busy = false;
            resolve();
          }, function (err) {
            _this18.busy = false;
            reject(err);
          });
        }
      });
    }
  }, {
    key: "checkForVariable",
    value: function checkForVariable() {
      var _this19 = this;

      return new Promise(function (resolve, reject) {
        if (_this19.options.useVariable === true && _this19.options.variable && _this19.options.app) {
          _this19.options.app.getVariableByName(_this19.options.variable).then(function (v) {
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
    key: "onClose",
    value: function onClose(elementId) {
      var _this20 = this;

      this.options.model.endSelections(true).then(function () {
        if (_this20.options.onClose) {
          _this20.options.onClose(elementId);
        }
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var _this21 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.checkForData().then(function () {
          _this21.dropdown.data = _this21.transformData();
        });
      }
    }
  }, {
    key: "itemSelected",
    value: function itemSelected(item, selectedIndexes, items) {
      var _this22 = this;

      if (this.options.useVariable === true && this.options.variable && this.options.app) {
        this.options.app.getVariableByName(this.options.variable).then(function (v) {
          if (item.qNum === 'NaN') {
            v.setStringValue(item.qText).then(function () {
              if (_this22.options.onItemSelected) {
                _this22.options.onItemSelected(item, selectedIndexes, items);
              }
            });
          } else {
            v.setNumValue(item.qNum).then(function () {
              if (_this22.options.onItemSelected) {
                _this22.options.onItemSelected(item, selectedIndexes, items);
              }
            });
          }
        });
      } else {
        this.options.model.selectListObjectValues("/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/'), [item.qElemNumber], this.dropdown.options.multiSelect === true).then(function () {
          if (_this22.options.onItemSelected) {
            _this22.options.onItemSelected(item, selectedIndexes, items);
          }
        });
      }
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      console.log('dropdown open');
      this.options.model.beginSelections(["/".concat(this.options.path, "/qListObjectDef").replace(/\/\//g, '/')]);
    }
  }, {
    key: "open",
    value: function open() {
      this.dropdown.open();
    }
  }, {
    key: "render",
    value: function render() {
      var _this23 = this;

      if (!this.options.model) {
        return;
      }

      this.rowsLoaded = 0;
      this.options.model.getLayout().then(function (layout) {
        _this23.layout = layout;

        _this23.checkForVariable().then(function (variableValue) {
          var listObject = _this23.options.path !== '' ? _this23.layout[_this23.options.path].qListObject : _this23.layout.qListObject;

          if (!listObject.qDataPages || listObject.qDataPages.length === 0) {
            listObject.qDataPages = [{
              qMatrix: []
            }];
          }

          if (listObject.qDimensionInfo.qLocked) {
            _this23.dropdown.options.allowClear = false;
          } else {
            _this23.dropdown.options.allowClear = typeof _this23.options.allowClear === 'undefined' ? true : _this23.options.allowClear;
          }

          _this23.rowsLoaded = listObject.qDataPages[0].qMatrix.length;

          _this23.checkForData().then(function () {
            if (listObject.qDataPages[0]) {
              _this23.dropdown.options.label = listObject.qDimensionInfo.qFallbackTitle;
              _this23.dropdown.data = _this23.transformData(variableValue);
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
        } else if (indexes.L && indexes.L.length > 0) {
          this.dropdown.selectedItems = indexes.L;
        } else if ((indexes.L && indexes.L.length === 0 || indexes.S && indexes.S.length === 0) && indexes.O && indexes.O.length === 1) {
          this.dropdown.selectedItems = indexes.O;
        } else {
          this.dropdown.selectedItems = [];
        }
      }

      return listObject.qDataPages[0].qMatrix.map(function (r, i) {
        return _extends(r[0], {
          index: i,
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
      var _this24 = this;

      this.options.model.getLayout().then(function (layout) {
        var decimals = 2;
        var v = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
        _this24.kpiOptions.value = {
          value: v
        };
        _this24.kpiOptions.label = {
          value: layout.kpi.qHyperCube.qMeasureInfo[0].qFallbackTitle
        };

        if (layout.icon) {
          _this24.kpiOptions.icon = "".concat(window.location.origin, "/resources/svg/").concat(layout.icon, ".svg");
        }

        if (layout.tooltip && layout.tooltip.value) {
          _this24.kpiOptions.tooltip = {
            value: layout.tooltip.value
          };

          if (layout.tooltip.classes) {
            _this24.kpiOptions.tooltip.classes = layout.tooltip.classes;
          }
        }

        _this24.kpiOptions.subValue = {
          value: ''
        };

        if (layout.kpi.qHyperCube.qMeasureInfo[1]) {
          var _decimals = 2;

          if (typeof layout.kpi.qHyperCube.qMeasureInfo[1].decimals !== 'undefined') {
            _decimals = layout.kpi.qHyperCube.qMeasureInfo[1].decimals;
          }

          var v1 = layout.kpi.qHyperCube.qDataPages[0].qMatrix[0][1].qText;
          _this24.kpiOptions.subValue = {
            value: "".concat(layout.kpi.qHyperCube.qMeasureInfo[1].qFallbackTitle, " ").concat(v1)
          };
        }

        _this24.kpi.render(_this24.kpiOptions);
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
    var _this25 = this;

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
        _this25.geoJSON = geoJSON;
        delete _this25.options.geoJSON;
        _this25.map = new _websyDesignsEs["default"].WebsyMap(elementId, _this25.options);

        _this25.render();
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
      var _this26 = this;

      var el = document.getElementById(this.elementId);

      if (el.parentElement) {
        el.parentElement.classList.add('loading');
      }

      this.options.model.getLayout().then(function (layout) {
        if (layout.options) {
          _this26.options = _extends({}, _this26.options, layout.options); // this.map.options = Object.assign({}, this.options, this.map.options, layout.options)
        }

        if (layout.qHyperCube.qDataPages[0]) {
          if (_this26.geoJSON) {
            var geoJSON = {
              type: 'FeatureCollection',
              features: []
            };
            layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (r) {
              var p = _this26.findGeoJsonByProperty(r[0].qText);

              if (p) {
                if (_this26.options.geoAutoFill === true) {
                  p.fillColor = _this26.options.geoFillColor;
                  p.fillOpacity = 0.4 + r[1].qNum / layout.qHyperCube.qMeasureInfo[0].qMax * 0.6;
                }

                if (r[1].qAttrExps && r[1].qAttrExps.qValues && r[1].qAttrExps.qValues[0] && r[1].qAttrExps.qValues[0].qText) {
                  p.fillColor = r[1].qAttrExps.qValues[0].qText;
                }

                if (_this26.options.geoShowTooltip === true) {
                  p.tooltip = "".concat(r[1].qText, "<br>").concat(p.properties.label);
                  p.tooltipClass = 'websy-map-tooltip';
                }

                geoJSON.features.push(p);
              }
            });
            _this26.map.options.geoJSON = geoJSON;
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
          _this26.map.options.data = data;

          if (el.parentElement) {
            el.parentElement.classList.remove('loading');
          }

          _this26.map.render();
        }
      });
    }
  }]);

  return GeoMap;
}();
/* global WebsyDesigns pubSub */


var SimpleSearch = /*#__PURE__*/function () {
  function SimpleSearch(elementId, options) {
    _classCallCheck(this, SimpleSearch);

    this.elementId = elementId;
    this.options = _extends({}, options);
    this.paused = false;
    this.searchText = '';
    var el = document.getElementById(this.elementId);

    if (el) {
      this.search = new _websyDesignsEs["default"].Search(this.elementId, {
        placeholder: this.options.placeholder,
        onSubmit: this.handleSearchSubmit.bind(this),
        onClear: this.handleSearchClear.bind(this)
      });
    }
  }

  _createClass(SimpleSearch, [{
    key: "handleSearchClear",
    value: function handleSearchClear() {
      this.options.model.clearSelections('/qListObjectDef');
      this.searchText = '';

      if (this.options.onClear) {
        this.options.onClear();
      }
    }
  }, {
    key: "handleSearchSubmit",
    value: function handleSearchSubmit(text) {
      var _this27 = this;

      this.searchText = text;
      this.paused = true;
      this.options.model.searchListObjectFor('/qListObjectDef', "*".concat(text, "*")).then(function (response) {
        _this27.options.model.acceptListObjectSearch('/qListObjectDef', false).then(function () {
          _this27.paused = false;

          _this27.render();
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this28 = this;

      if (this.paused === true) {
        return;
      }

      this.options.model.getLayout().then(function (layout) {
        if (_this28.options.onResults) {
          _this28.options.onResults(_this28.searchText.length === 0 || layout.qListObject.qDimensionInfo.qStateCounts.qSelected !== 0 && _this28.searchText.length > 0);
        }
      });
    }
  }]);

  return SimpleSearch;
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
      var _this29 = this;

      if (this.busy === false) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            _this29.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length;
            _this29.busy = false;

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
                if (_this29.layout.qHyperCube.qMode === 'P') {
                  _this29.layout.qHyperCube.qPivotDataPages.push(pages[0]);

                  _this29.rowCount += pages[0].qData.length;
                } else {
                  pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                    return r[0].qText !== '-';
                  });

                  _this29.layout.qHyperCube.qDataPages.push(pages[0]);

                  _this29.rowCount += pages[0].qMatrix.length;
                }

                _this29.busy = false;

                if (callbackFn) {
                  if (_this29.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              var e = err;

              if (_this29.errorCount < 50) {
                _this29.errorCount++;
                console.log('error getting data, attempt', _this29.errorCount);
                clearTimeout(_this29.retryFn);
                _this29.retryFn = setTimeout(function () {
                  _this29.getData(callbackFn);
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
      var _this30 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this30.appendRows(_this30.transformData(page));
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
      var _this31 = this;

      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.table.showLoading({
        message: 'Loading...'
      });
      this.options.model.getLayout().then(function (layout) {
        console.log(layout);
        _this31.layout = layout;
        _this31.rowCount = pageNum * _this31.options.pageSize;
        _this31.errorCount = 0;
        _this31.pageNum = pageNum;
        _this31.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / _this31.options.pageSize);
        _this31.table.options.pageNum = _this31.pageNum;
        _this31.table.options.pageCount = _this31.pageCount;

        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          _this31.table.hideLoading();

          _this31.table.showError({
            message: _this31.options.customError || layout.qHyperCube.qCalcCondMsg
          });

          return;
        }

        _this31.dataWidth = _this31.layout.qHyperCube.qSize.qcx;
        _this31.columnOrder = _this31.layout.qHyperCube.qColumnOrder;

        if (typeof _this31.columnOrder === 'undefined') {
          _this31.columnOrder = new Array(_this31.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        var columns = _this31.layout.qHyperCube.qDimensionInfo.concat(_this31.layout.qHyperCube.qMeasureInfo);

        var activeSort = _this31.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
        columns = columns.map(function (c, i) {
          c.colIndex = _this31.columnOrder.indexOf(i);
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

        _this31.getData(function (page) {
          _this31.table.options.columns = columns;
          _this31.table.options.activeSort = activeSort;

          _this31.table.hideLoading();

          _this31.table.render();

          if (page.err) {
            var tableEl = document.getElementById("".concat(_this31.elementId, "_foot"));
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          } else {
            _this31.appendRows(_this31.transformData(page));
          }
        });
      }, function (err) {
        // try again      
        var e = err;

        if (_this31.errorCount < 50) {
          _this31.errorCount++;
          console.log('error getting layout, attempt', _this31.errorCount);
          clearTimeout(_this31.retryFn);
          _this31.retryFn = setTimeout(function () {
            _this31.render();
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
      var _this32 = this;

      console.log('page', page);

      if (this.layout.qHyperCube.qMode === 'S') {
        return page.map(function (r) {
          return r.map(function (c, i) {
            if (_this32.table.options.columns[i].showAsLink === true || _this32.table.options.columns[i].showAsNavigatorLink === true) {
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

              if (i > _this32.layout.qHyperCube.qDimensionInfo.length - 1) {
                t = 'qMeasureInfo';
                tIndex -= _this32.layout.qHyperCube.qDimensionInfo.length;
              }

              c.qAttrExps.qValues.forEach(function (a, aI) {
                if (a.qText && a.qText !== '') {
                  if (_this32.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this32.layout.qHyperCube[t][tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
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
            o.name = this.layout.tableTotalsLabel;
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
      var _this33 = this;

      if (this.busy === false) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            _this33.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length;
            _this33.busy = false;

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
                if (_this33.layout.qHyperCube.qMode === 'P') {
                  _this33.layout.qHyperCube.qPivotDataPages.push(pages[0]);

                  _this33.rowCount += pages[0].qData.length;
                } else {
                  pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                    return r[0].qText !== '-';
                  });

                  _this33.layout.qHyperCube.qDataPages.push(pages[0]);

                  _this33.rowCount += pages[0].qMatrix.length;
                }

                _this33.busy = false;

                if (callbackFn) {
                  if (_this33.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              var e = err;

              if (_this33.errorCount < 50) {
                _this33.errorCount++;
                console.log('error getting data, attempt', _this33.errorCount);
                clearTimeout(_this33.retryFn);
                _this33.retryFn = setTimeout(function () {
                  _this33.getData(callbackFn);
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
      var _this34 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this34.appendRows(_this34.transformData(page));
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
    key: "handleCloseSearch",
    value: function handleCloseSearch(id) {
      var el = document.getElementById(id);
      el.classList.remove('active');
    }
  }, {
    key: "handleSort",
    value: function handleSort(event, column, colIndex, sortIndex) {
      this.table.showLoading({
        message: 'Loading...'
      });
      var reverse = column.reverseSort === true;
      var patchDefs = [{
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([this.columnOrder[sortIndex]])
      }];
      var sortType = colIndex < this.layout.qHyperCube.qDimensionInfo.length ? 'qDimensions' : 'qMeasures';
      var realIndex = this.columnOrder[sortIndex] < this.layout.qHyperCube.qDimensionInfo.length ? this.columnOrder[sortIndex] : this.columnOrder[sortIndex] - this.layout.qHyperCube.qDimensionInfo.length;
      patchDefs.push({
        qOp: 'replace',
        qPath: "/qHyperCubeDef/".concat(sortType, "/").concat(realIndex, "/qDef/qReverseSort"),
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
      var _this35 = this;

      // this.table.options.columns.forEach((c, i) => {
      //   if (c.searchable === true && c.searchField && this.layout[c.searchField] && this.layout[c.searchField].qListObject) {
      //     this.dropdowns[c.searchField] = new WebsyDesigns.QlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
      //       model: this.options.model,
      //       path: `${c.searchField}`
      //     })
      //   }
      // })
      this.layout.qHyperCube.qDimensionInfo.forEach(function (d, i) {
        if (!_this35.dropdowns["dim".concat(i)]) {
          _this35.dropdowns["dim".concat(i)] = new WebsyDesignsQlikPlugins.Dropdown("".concat(_this35.elementId, "_columnSearch_").concat(i), {
            model: _this35.options.model,
            multiSelect: true,
            closeAfterSelection: false,
            path: "dim".concat(i),
            onClose: _this35.handleCloseSearch
          });
        }
      });
    }
  }, {
    key: "prepSearch",
    value: function prepSearch() {
      var _this36 = this;

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
                qDef: _objectSpread(_objectSpread({}, d.qDef), {}, {
                  qSortCriterias: [{
                    qSortByState: 1,
                    qSortByAscii: 1
                  }]
                }),
                qLibraryId: d.qLibraryId
              }
            })
          });
        });

        _this36.options.model.applyPatches(patches, true).then(function () {
          _this36.busy = false;
          _this36.searchPrepped = true;

          _this36.render();
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this37 = this;

      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.searchPrepped === false) {
        this.prepSearch();
        return;
      }

      this.table.showLoading({
        message: 'Loading...'
      });
      this.options.model.getLayout().then(function (layout) {
        _this37.layout = layout;
        _this37.rowCount = pageNum * _this37.options.pageSize;

        if (_this37.layout.qHyperCube.qPivotDataPages[0]) {
          _this37.layout.qHyperCube.qPivotDataPages = [];
        }

        _this37.errorCount = 0;
        _this37.pageNum = pageNum;
        _this37.pageCount = Math.ceil(layout.qHyperCube.qSize.qcy / _this37.options.pageSize);
        _this37.table.options.pageNum = _this37.pageNum;

        if (_this37.layout.qHyperCube.qNoOfLeftDims) {
          _this37.table.options.leftColumns = _this37.options.freezeColumns || _this37.layout.qHyperCube.qNoOfLeftDims;
        }

        _this37.table.options.pageCount = _this37.pageCount;

        if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
          _this37.table.hideLoading();

          _this37.table.showError({
            message: _this37.options.customError || layout.qHyperCube.qCalcCondMsg
          });

          return;
        }

        _this37.table.hideError();

        _this37.dataWidth = _this37.layout.qHyperCube.qSize.qcx;
        _this37.columnOrder = _this37.layout.qHyperCube.qColumnOrder;

        if (typeof _this37.columnOrder === 'undefined') {
          _this37.columnOrder = new Array(_this37.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        _this37.layout.qHyperCube.qDimensionInfo = _this37.layout.qHyperCube.qDimensionInfo.map(function (c, i) {
          c.searchable = true;

          if (_this37.options.columnOverrides[i]) {
            c = _objectSpread(_objectSpread({}, c), {}, {
              onSearch: _this37.handleSearch.bind(_this37),
              onCloseSearch: _this37.handleCloseSearch.bind(_this37)
            }, _this37.options.columnOverrides[i]);
          }

          c.searchField = "dim".concat(i);
          return c;
        });
        _this37.layout.qHyperCube.qMeasureInfo = _this37.layout.qHyperCube.qMeasureInfo.map(function (c, i) {
          if (_this37.options.columnOverrides[_this37.layout.qHyperCube.qDimensionInfo.length + i]) {
            c = _objectSpread(_objectSpread({}, c), _this37.options.columnOverrides[_this37.layout.qHyperCube.qDimensionInfo.length + i]);
          }

          return c;
        });

        var columns = _this37.layout.qHyperCube.qDimensionInfo.concat(_this37.layout.qHyperCube.qMeasureInfo);

        _this37.orderedColumns = columns.map(function (c, i, a) {
          return a[_this37.columnOrder[i]];
        }).filter(function (c) {
          return !c.qError;
        });
        _this37.dimensions = _this37.layout.qHyperCube.qDimensionInfo.filter(function (d) {
          return !d.qError;
        });
        _this37.measures = _this37.layout.qHyperCube.qMeasureInfo.filter(function (d) {
          return !d.qError;
        });
        var activeSort = _this37.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
        columns = columns.map(function (c, i) {
          c.colIndex = _this37.columnOrder.indexOf(i);
          c.sortIndex = _this37.columnOrder.indexOf(i);
          c.name = c.qFallbackTitle;

          if (c.tooltip) {
            c.name += "\n          <div class=\"websy-info websy-info-dock-right\" data-info=\"".concat(c.tooltip, "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n          </div>\n          ");
          }

          c.reverseSort = activeSort === c.colIndex && c.qReverseSort !== true;
          c.activeSort = activeSort === c.colIndex;

          if (_this37.layout.qHyperCube.qMode === 'S') {
            if (c.qSortIndicator === 'A') {
              c.sort = 'asc';
            } else if (c.qSortIndicator === 'D') {
              c.sort = 'desc';
            }
          } // if (this.options.columnOverrides[i]) {
          //   c = {...c, ...this.options.columnOverrides[i]}
          // }


          if (c.searchable === true) {
            if (!c.onSearch) {
              c.onSearch = _this37.handleSearch.bind(_this37);
            }
          }

          return c;
        });
        columns.sort(function (a, b) {
          return a.colIndex - b.colIndex;
        });

        if (_this37.layout.qHyperCube.qMode === 'P') {
          columns = columns.filter(function (c, i) {
            return i < _this37.layout.qHyperCube.qNoOfLeftDims;
          });
        }

        columns = columns.filter(function (c) {
          return !c.qError;
        });
        _this37.table.options.columns = columns;

        var activeDimensions = _this37.layout.qHyperCube.qDimensionInfo.filter(function (c) {
          return !c.qError;
        });

        var columnParamValues = activeDimensions.filter(function (c, i) {
          return _this37.layout.qHyperCube.qMode === 'S' || i < _this37.layout.qHyperCube.qNoOfLeftDims;
        }).map(function (c, i) {
          return {
            value: new Array(Math.max(c.qApprMaxGlyphCount, _this37.layout.qHyperCube.qDimensionInfo[i].qFallbackTitle.length)).fill('X').join(''),
            width: c.width || null
          };
        });
        var measureLabel = activeDimensions.pop(); // const maxMValue = this.layout.qHyperCube.qMeasureInfo.reduce((a, b) => a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b)
        // columnParamValues.push({ value: new Array(maxMValue.qApprMaxGlyphCount).fill('x').join(''), width)

        columnParamValues = columnParamValues.concat(_this37.layout.qHyperCube.qMeasureInfo.filter(function (c) {
          return !c.qError;
        }).map(function (c) {
          return {
            value: new Array(_this37.layout.qHyperCube.qMode === 'S' ? c.qApprMaxGlyphCount : Math.max(c.qApprMaxGlyphCount, measureLabel.qApprMaxGlyphCount)).fill('X').join(''),
            width: _this37.layout.qHyperCube.qMode === 'S' ? c.width || null : c.width || measureLabel.width || null
          };
        }));
        _this37.columnParams = _this37.table.getColumnParameters(columnParamValues);

        for (var i = 0; i < columns.length; i++) {
          columns[i].width = "".concat(_this37.columnParams.cellWidths[i] || _this37.columnParams.cellWidths[_this37.columnParams.cellWidths.length - 1], "px");
        } // this.columnsToRender = Math.ceil(this.columnParams.availableWidth / this.columnParams.cellWidth)


        _this37.rowsToRender = Math.ceil(_this37.columnParams.availableHeight / _this37.columnParams.cellHeight);

        _this37.getData(function (page) {
          _this37.table.options.activeSort = activeSort;

          _this37.table.hideLoading();

          if (_this37.layout.qHyperCube.qMode === 'S') {
            _this37.table.render();

            _this37.prepDropdowns();
          }

          if (page.err) {
            var tableEl = document.getElementById("".concat(_this37.elementId, "_foot"));
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          } else {
            _this37.fullData = page;

            _this37.resize();
          }
        });
      }, function (err) {
        // try again      
        var e = err;

        if (_this37.errorCount < 50) {
          _this37.errorCount++;
          console.log('error getting layout, attempt', _this37.errorCount);
          clearTimeout(_this37.retryFn);
          _this37.retryFn = setTimeout(function () {
            _this37.render();
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
      var _this38 = this;

      if (this.layout.qHyperCube.qMode === 'S') {
        return page.map(function (r) {
          return r.map(function (c, i) {
            if (_this38.table.options.columns[i].showAsLink === true) {
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
              // let t = 'dimensions'
              var tIndex = i; // if (i > this.dimensions.length - 1) {
              //   t = 'measures'
              //   tIndex -= this.dimensions.length
              // }

              c.qAttrExps.qValues.forEach(function (a, aI) {
                if (a.qText && a.qText !== '') {
                  if (_this38.orderedColumns[tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this38.orderedColumns[tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
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
      var _this39 = this;

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
        c.width = _this39.columnParams.cellWidths[i];
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
        c.width = "".concat(_this39.columnParams.cellWidths[(_this39.options.freezeColumns || _this39.layout.qHyperCube.qNoOfLeftDims) + i] || _this39.columnParams.cellWidths[_this39.columnParams.cellWidths.length - 1], "px");
      });

      for (var r = 0; r < page.qData.length; r++) {
        var row = [];

        for (var _i10 = this.leftDataCol; _i10 < this.leftDataCol + this.columnsToRender; _i10++) {
          row.push(page.qData[r][_i10]);
        }

        for (var c = 0; c < row.length; c++) {
          row[c].pos = 'Data';
          row[c].style = 'text-align: right;';
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

          row[c].value = row[c].qText || '';
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
                width: "".concat(_this39.columnParams.cellWidths[dI] || _this39.columnParams.cellWidths[_this39.columnParams.cellWidths.length - 1], "px")
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
        o.value = o.qText || '';
        input.value = input.qText || '';
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
            o.qText = 'Totals';
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
        o.style = 'text-align: center;';
        o.name = o.qText || '';

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
/* global WebsyDesigns WebsyDesignsQlikPlugins:true Dropdown getAllData */


var Table3 = /*#__PURE__*/function () {
  function Table3(elementId, options) {
    var _this40 = this;

    _classCallCheck(this, Table3);

    var DEFAULTS = {
      pageSize: 200,
      cellHeight: 35,
      virtualScroll: true,
      columnOverrides: [],
      maxColWidth: '50%',
      allowPivoting: false,
      pivotPanel: 'docked',
      pivotButtonText: 'Pivot',
      dropdownOptions: {},
      forceRenderAfterSelect: false,
      maxPlaceholderRows: 1000,
      allowCellSelections: true,
      resizeTimeout: 200,
      confirmIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><polyline points=\"416 128 192 384 96 288\" style=\"stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      cancelIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>"
    }; // if (Dropdown) {
    //   if (!WebsyDesignsQlikPlugins) {
    //     WebsyDesignsQlikPlugins = {}
    //   }
    //   WebsyDesignsQlikPlugins.Dropdown = Dropdown
    // }

    this.elementId = elementId;
    this.inSelections = false;
    this.options = _extends({}, DEFAULTS, options);
    this.fullData = [];
    this.rowIndexList = [];
    this.resizeTimeoutFn = null; // this.rowCount = 0

    this.pageNum = 0;
    this.pageCount = 0;
    this.errorCount = 0;
    this.leftDataCol = 0;
    this.topDataRow = 0;
    this.retryFn = null;
    this.pivotIndent = false;
    this.busy = false;
    this.dimensionWidth = 0;
    this.dropdowns = {};
    this.searchPrepped = false;
    this.qlikColumnOrder = [];
    this.pinnedColumns = 0;
    this.startCol = 0;
    this.endCol = 0;
    this.startRow = 0;
    var el = document.getElementById(this.elementId);

    if (el) {
      var html = '';
      var tableStyle = 'height: 100%';

      if (this.options.allowPivoting === true) {
        if (this.options.pivotPanel === 'docked') {
          tableStyle = 'height: calc(100% - 100px);';
        } else {
          tableStyle = 'height: calc(100% - 30px);';
          html += "\n            <div class=\"pivot-button-container\">\n              <button class=\"toggle-pivot-panel\">".concat(this.options.pivotButtonText, "</button>\n            </div>\n          ");
        }

        html += "\n          <div id='".concat(this.elementId, "_pivotContainer' class='websy-designs-pivot-container ").concat(this.options.pivotPanel, "'>\n            <div>\n              <h3>Rows</h3>\n              <div id='").concat(this.elementId, "_pivotRows'></div>\n            </div>\n            <div>\n              <h3>Columns</h3>\n              <div id='").concat(this.elementId, "_pivotColumns'></div>\n            </div>\n          </div>       \n        ");
      }

      html += "\n        <div id='".concat(this.elementId, "_cellSelectMask' class='websy-cell-select-mask'></div>\n        <div id='").concat(this.elementId, "_tableContainer' style='").concat(tableStyle, "'></div>        \n        <div id='").concat(this.elementId, "_cellSelectMaskLeft' class='websy-cell-select-mask-side'></div>\n        <div id='").concat(this.elementId, "_cellSelectMaskRight' class='websy-cell-select-mask-side'></div>\n        <div id='").concat(this.elementId, "_cellSelectButtons' class='websy-cell-select-buttons'>\n          <div class='websy-cell-select-cancel'>\n            ").concat(this.options.cancelIcon, "\n          </div>\n          <div class='websy-cell-select-confirm'>\n            ").concat(this.options.confirmIcon, "\n          </div>\n        </div>\n      ");
      el.innerHTML = html;
      this.table = new _websyDesignsEs["default"].WebsyTable3("".concat(this.elementId, "_tableContainer"), _extends({}, {
        onClick: this.handleClick.bind(this),
        onCellSelect: this.handleCellSelect.bind(this),
        onScroll: this.handleScroll.bind(this),
        onSort: this.handleSort.bind(this),
        onChangePageSize: this.setPageSize.bind(this),
        onSetPage: this.setPageNum.bind(this),
        onScrollX: this.handleVirtualScrollX.bind(this),
        onExpandCell: this.handleExpand.bind(this),
        onCollapseCell: this.handleCollapse.bind(this)
      }, this.options));

      if (this.options.allowPivoting === true) {
        this.rowList = new _websyDesignsEs["default"].DragDrop("".concat(this.elementId, "_pivotRows"), {
          group: this.elementId,
          items: [],
          onItemAdded: function onItemAdded() {
            _this40.updatePivotStructure();
          }
        });
        this.columnList = new _websyDesignsEs["default"].DragDrop("".concat(this.elementId, "_pivotColumns"), {
          group: this.elementId,
          items: [],
          onItemAdded: function onItemAdded() {
            _this40.updatePivotStructure();
          }
        });
      }

      el.addEventListener('click', this.handleClick.bind(this));
      window.addEventListener('resize', function () {
        if (_this40.resizeTimeoutFn) {
          clearTimeout(_this40.resizeTimeoutFn);
        }

        _this40.resizeTimeoutFn = setTimeout(function () {
          _this40.resize();
        }, _this40.options.resizeTimeout);
      });
      this.render();
    }
  }

  _createClass(Table3, [{
    key: "abortModal",
    value: function abortModal() {
      var _this41 = this;

      return new Promise(function (resolve, reject) {
        if (_this41.options.app) {
          _this41.options.app.abortModal(true).then(function () {
            resolve();
          });
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "appendRows",
    value: function appendRows(data) {
      this.table.appendRows(data);
    }
  }, {
    key: "buildPivotColumns",
    value: function buildPivotColumns() {
      var _this42 = this;

      if (!this.layout.qHyperCube.qPivotDataPages[0]) {
        return;
      }

      var pData = this.transformPivotTable(this.layout.qHyperCube.qPivotDataPages[0]); // this.pinnedColumns = this.layout.qHyperCube.qIndentMode === true ? 1 : this.layout.qHyperCube.qNoOfLeftDims

      this.columns = pData.columns;
      this.startCol = 0; // if (this.layout.qHyperCube.qIndentMode !== true) {
      //   this.startCol = this.pinnedColumns
      // }

      if (this.columns.length === 0) {
        return;
      }

      this.endCol = this.columns[this.columns.length - 1].length;
      this.table.options.columns = this.columns;
      var maxMValue = this.layout.qHyperCube.qMeasureInfo.filter(function (m) {
        return !m.qError;
      }).reduce(function (a, b) {
        return a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b;
      }).qApprMaxGlyphCount;
      var maxMLabel = this.layout.qHyperCube.qMeasureInfo.filter(function (m) {
        return !m.qError;
      }).reduce(function (a, b) {
        return a.qFallbackTitle.length > b.qFallbackTitle.length ? a : b;
      }).qFallbackTitle;
      var maxMLength = maxMLabel.length > maxMValue ? maxMLabel : new Array(maxMValue).fill('X').join('');
      var effectiveOrder = this.layout.qHyperCube.qEffectiveInterColumnSortOrder;
      var possibleExpandCollapse = this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qAlwaysFullyExpanded !== true;
      var measureLengths = this.layout.qHyperCube.qMeasureInfo.reduce(function (a, b) {
        return Math.max(a, b.qApprMaxGlyphCount);
      }, 0);
      var dimensionLengths = this.layout.qHyperCube.qDimensionInfo.filter(function (d) {
        return !d.qError;
      }).map(function (d) {
        var out = possibleExpandCollapse ? 'xxx' : '';

        if (d.qApprMaxGlyphCount > d.qFallbackTitle.length) {
          out += new Array(d.qApprMaxGlyphCount).fill('X').join('');
        } else {
          out += d.qFallbackTitle;
        }

        return out;
      });

      if (dimensionLengths.length > this.pinnedColumns) {
        // we have a top column
        measureLengths = Math.max(measureLengths, dimensionLengths.reduce(function (a, b) {
          return Math.max(a, b.length);
        }, 0));
        maxMLength = measureLengths > maxMLength.length ? new Array(measureLengths).fill('X').join('') : maxMLength;
      }

      var activeColumns = [];
      var rows = [];
      var columns = [];

      for (var i = 0; i < effectiveOrder.length; i++) {
        if (effectiveOrder[i] < this.layout.qHyperCube.qDimensionInfo.length) {
          if (effectiveOrder[i] >= 0) {
            var dim = this.properties.qHyperCubeDef.qDimensions[effectiveOrder[i]];

            if (i < this.pinnedColumns) {
              rows.push(dim);
            } else {
              columns.push(dim);
            }
          }
        }

        if (this.layout.qHyperCube.qIndentMode === true) {
          if (i < this.pinnedColumns) {
            if (effectiveOrder[i] === -1) {
              activeColumns.push(new Array(measureLengths).fill('X')); // activeColumns.push(maxMLength)
            }

            if (!activeColumns[0]) {
              activeColumns.push(dimensionLengths[i]);
            } else if (dimensionLengths[i] && dimensionLengths[i].length > activeColumns[0].length) {
              activeColumns[0] = dimensionLengths[i];
            }
          }
        } else if (i < this.pinnedColumns) {
          activeColumns.push(dimensionLengths[i]);
        }
      }

      if (effectiveOrder.indexOf(-1) >= (this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns)) {
        for (var _i17 = this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns; _i17 < this.columns[this.columns.length - 1].length; _i17++) {
          // activeColumns.push(Math.max(maxMLength, maxMLabel))
          activeColumns.push(maxMLength);
        }
      } else if (effectiveOrder.indexOf(-1) === -1) {
        // only a single measure has been defined
        if (this.pinnedColumns <= 0) {
          // we have no left dimensions so all columns should be sized according to the measure
          activeColumns = [];
        }

        for (var _i18 = activeColumns.length; _i18 < this.columns[this.columns.length - 1].length; _i18++) {
          activeColumns.push(maxMLength);
        }
      }

      for (var _i19 = activeColumns.length; _i19 < this.columns[this.columns.length - 1].length; _i19++) {
        // activeColumns.push(Math.max(maxMLength, maxMLabel))
        activeColumns.push(maxMLength);
      }

      var columnParamValues = activeColumns.map(function (d) {
        return {
          value: d,
          width: null
        };
      });
      this.tableSizes = this.table.calculateSizes(columnParamValues, this.layout.qHyperCube.qSize.qcy, this.layout.qHyperCube.qSize.qcx, this.pinnedColumns);
      var rowsWidth = 0;

      if (this.options.allowPivoting === true && this.options.app) {
        var rEl = document.getElementById("".concat(this.elementId, "_pivotRows"));
        var count = this.layout.qHyperCube.qIndentMode === true ? 1 : this.pinnedColumns;

        for (var _i20 = 0; _i20 < count; _i20++) {
          rowsWidth += this.columns[this.columns.length - 1][_i20].actualWidth;
        }

        if (this.options.pivotPanel === 'docked') {
          rEl.style.width = rowsWidth + 'px';
          rEl.style.maxWidth = rowsWidth + 'px';
        }

        this.rowList.options.items = rows.map(function (dim, dimIndex) {
          var dimId = dim.qLibraryId || dim.qDef.qFieldLabels[0] || dim.qDef.qFieldDefs[0];
          return {
            component: 'Dropdown',
            isQlikPlugin: true,
            dim: dim,
            dimId: dimId,
            options: _extends({}, _this42.options.dropdownOptions)
          };
        });
        this.rowList.render();
        this.rowList.options.items.forEach(function (d, i) {
          if (!_this42.dropdowns[d.dimId]) {
            var ddDef = {
              qInfo: {
                qType: 'table-dropdown'
              },
              qListObjectDef: d.dim
            };
            ddDef.qListObjectDef.qDef.qSortCriterias = [{
              qSortByState: 1,
              qSortByAscii: 1,
              qSortByNumeric: 1
            }];

            _this42.options.app.createSessionObject(ddDef).then(function (model) {
              _this42.dropdowns[d.dimId] = model;
              d.instance.options.model = model;
              d.instance.render();
            });
          } else {
            d.instance.options.model = _this42.dropdowns[d.dimId];
            d.instance.render();
          }
        });
        this.columnList.options.items = columns.map(function (dim, dimIndex) {
          var dimId = dim.qLibraryId || dim.qDef.qFieldLabels[0] || dim.qDef.qFieldDefs[0];
          return {
            component: 'Dropdown',
            isQlikPlugin: true,
            dim: dim,
            dimId: dimId,
            options: _extends({}, _this42.options.dropdownOptions)
          };
        });
        this.columnList.render();
        this.columnList.options.items.forEach(function (d, i) {
          if (!_this42.dropdowns[d.dimId]) {
            if (!d.dim.qDef) {
              d.dim.qDef = {};
            }

            d.dim.qDef.qSortCriterias = [{
              qSortByAscii: 1,
              qSortByState: 1,
              qSortByNumeric: 1
            }];
            var ddDef = {
              qInfo: {
                qType: 'table-dropdown'
              },
              qListObjectDef: d.dim
            };
            ddDef.qListObjectDef.qDef.qSortCriterias = [{
              qSortByState: 1,
              qSortByAscii: 1,
              qSortByNumeric: 1
            }];

            _this42.options.app.createSessionObject(ddDef).then(function (model) {
              _this42.dropdowns[d.dimId] = model;
              d.instance.options.model = model;
              d.instance.render();
            });
          } else {
            d.instance.options.model = _this42.dropdowns[d.dimId];
            d.instance.render();
          }
        });
      } else {
        var tableEl = document.getElementById("".concat(this.elementId, "_tableContainer"));

        if (tableEl) {
          tableEl.style.height = '100%';
        }
      }
    }
  }, {
    key: "buildStraightColumnsAndTotals",
    value: function buildStraightColumnsAndTotals() {
      var _this43 = this;

      // used for straight tables
      this.columns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo.map(function (m) {
        m.isMeasure = true;
        return m;
      })); // append the column definitions

      this.properties.qHyperCubeDef.qDimensions.concat(this.properties.qHyperCubeDef.qMeasures).forEach(function (cDef, i) {
        _this43.columns[i].def = cDef;
      });
      var activeSort = this.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];
      this.columns = this.columns.map(function (c, i) {
        c.colIndex = _this43.columnOrder.indexOf(i);
        c.classes = ["".concat(c.isMeasure ? 'measure' : 'dimension')];
        c.name = c.qFallbackTitle;

        if (c.tooltip) {
          c.name += "\n        <div class=\"websy-info websy-info-dock-right\" data-info=\"".concat(c.tooltip, "\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n        </div>\n        ");
        }

        c.reverseSort = activeSort === i && c.qReverseSort !== true;
        c.activeSort = activeSort === i;

        if (_this43.layout.qHyperCube.qMode === 'S') {
          if (c.qSortIndicator === 'A') {
            c.sort = 'asc';
          } else if (c.qSortIndicator === 'D') {
            c.sort = 'desc';
          }
        } // if (this.options.columnOverrides[i]) {
        //   c = {...c, ...this.options.columnOverrides[i]}
        // }


        if (c.searchable !== false && i < _this43.layout.qHyperCube.qDimensionInfo.length) {
          c.searchable = true;

          if (!c.onSearch) {
            c.isExternalSearch = true;
            var dimId = c.def.qLibraryId || c.def.qDef.qFieldLabels[0] || c.def.qDef.qFieldDefs[0];
            c.dimId = c.cId || dimId;
            c.onSearch = _this43.handleSearch.bind(_this43);
            c.onCloseSearch = _this43.handleCloseSearch.bind(_this43);
          }
        }

        return c;
      });
      this.columns.sort(function (a, b) {
        return a.colIndex - b.colIndex;
      });
      this.columns = this.columns.filter(function (c) {
        return !c.qError;
      });
      this.table.options.columns = [this.columns]; // set up the Totals

      this.totals = [];

      if (this.layout.qHyperCube.qGrandTotalRow && this.layout.totals && this.layout.totals.show === true) {
        if (this.layout.qHyperCube.qMode === 'S') {
          this.totals = this.layout.qHyperCube.qDimensionInfo.filter(function (d) {
            return !d.qError;
          }).map(function (d) {
            return {
              value: '',
              classes: ['dimension']
            };
          }).concat(this.layout.qHyperCube.qGrandTotalRow.map(function (t) {
            return _extends({}, t, {
              value: t.qText,
              classes: ['measure']
            });
          }));
          this.totals.splice(0, 1, {
            value: this.layout.totals.label || this.totals
          });
        }
      }

      this.table.options.totals = this.totals;
      var activeDimensions = this.layout.qHyperCube.qDimensionInfo.filter(function (c) {
        return !c.qError;
      });
      this.columnParamValues = activeDimensions.filter(function (c, i) {
        return _this43.layout.qHyperCube.qMode === 'S' || i < _this43.pinnedColumns;
      }).map(function (c, i) {
        return {
          value: new Array(Math.max(c.showAsLink ? 0 : c.qApprMaxGlyphCount, activeDimensions[i].qFallbackTitle.length)).fill('X').join(''),
          width: c.width || null
        };
      });
      var measureLabel = activeDimensions.pop();
      var maxMValue = this.layout.qHyperCube.qMeasureInfo.filter(function (m) {
        return !m.qError;
      }).reduce(function (a, b) {
        return a.qApprMaxGlyphCount > b.qApprMaxGlyphCount ? a : b;
      }, {
        qApprMaxGlyphCount: 0
      });
      var maxMLabel = this.layout.qHyperCube.qMeasureInfo.filter(function (m) {
        return !m.qError;
      }).reduce(function (a, b) {
        return a > b.qFallbackTitle.length ? a : b.qFallbackTitle.length;
      }, 0);
      this.columnParamValues = this.columnParamValues.concat(new Array(this.layout.qHyperCube.qSize.qcx).fill(new Array(Math.max(maxMValue.qApprMaxGlyphCount, maxMLabel)).fill('X').join('')).map(function (d) {
        return {
          value: d,
          width: null
        };
      }));

      if (this.layout.scrolling && this.layout.scrolling.keepFirstColumnInView === true) {
        this.pinnedColumns = 1;
      }

      this.tableSizes = this.table.calculateSizes(this.columnParamValues, this.layout.qHyperCube.qSize.qcy, this.layout.qHyperCube.qSize.qcx, this.pinnedColumns);
      this.columns.forEach(function (c, i) {
        if (c.searchable !== false) {
          if (c.isExternalSearch === true) {
            if (!_this43.dropdowns[c.dimId]) {
              var ddDef = {
                qInfo: {
                  qType: 'table-dropdown'
                },
                qListObjectDef: c.def
              };
              ddDef.qListObjectDef.qDef.qSortCriterias = [{
                qSortByState: 1,
                qSortByAscii: 1,
                qSortByNumeric: 1
              }];

              _this43.options.app.createSessionObject(ddDef).then(function (model) {
                _this43.dropdowns[c.dimId] = new WebsyDesignsQlikPlugins.Dropdown("".concat(_this43.elementId, "_tableContainer_columnSearch_").concat(c.dimId || i), {
                  model: model,
                  multiSelect: true,
                  closeAfterSelection: false,
                  onClose: _this43.handleCloseSearch
                });
                model.on('changed', function () {
                  _this43.dropdowns[c.dimId].render();
                }); // d.instance.options.model = model
                // d.instance.render()
              });
            } else {// d.instance.options.model = this.dropdowns[d.dimId]
              // d.instance.render()
            }
          }
        }
      });
      this.table.options.activeSort = activeSort; // console.log('column params', this.columnParamValues)
    }
  }, {
    key: "buildDataStructure",
    value: function buildDataStructure() {
      this.fullData = [];
      this.rowIndexList = [];
      this.buildEmptyRows(0);
    }
  }, {
    key: "buildEmptyRows",
    value: function buildEmptyRows(start) {
      if (!this.layout) {
        return;
      }

      if (this.layout.qHyperCube.qMode === 'S' || this.layout.qHyperCube.qIndentMode === true) {
        for (var r = start; r < Math.min(this.layout.qHyperCube.qSize.qcy, start + this.options.maxPlaceholderRows); r++) {
          if (!this.fullData[r]) {
            var row = [];

            for (var c = 0; c < this.layout.qHyperCube.qSize.qcx; c++) {
              row.push({});
            }

            this.fullData.push(row);
          }
        }
      }
    }
  }, {
    key: "checkDataExists",
    value: function checkDataExists(start, end) {
      var _this44 = this;

      return new Promise(function (resolve, reject) {
        if (_this44.layout.qHyperCube.qMode === 'P' && _this44.layout.qHyperCube.qIndentMode !== true) {
          _this44.getData(start, function () {
            resolve();
          });
        } else {
          var top = -1;

          for (var i = start; i < end; i++) {
            if (_this44.rowIndexList.indexOf(i) === -1) {
              top = i;
              break;
            }
          } // console.log('slicing pre', top)


          _this44.buildEmptyRows(top);

          if (top < end && top !== -1) {
            _this44.getData(top, function () {
              // console.log('if callback for', top)
              resolve();
            }, true);
          } else if (top !== -1) {
            _this44.getData(top, function () {
              // console.log('else if callback for', top)
              resolve();
            }, true);
          } else {
            // console.log('else callback for', top)
            resolve();
          }
        }
      });
    }
  }, {
    key: "confirmCancelSelections",
    value: function confirmCancelSelections(confirm) {
      var _this45 = this;

      this.inSelections = false;
      this.options.model.endSelections(confirm).then(function () {
        var maskEl = document.getElementById("".concat(_this45.elementId, "_cellSelectMask"));
        var maskLeftEl = document.getElementById("".concat(_this45.elementId, "_cellSelectMaskLeft"));
        var maskRightEl = document.getElementById("".concat(_this45.elementId, "_cellSelectMaskRight"));
        var maskButtonsEl = document.getElementById("".concat(_this45.elementId, "_cellSelectButtons"));

        if (maskEl) {
          maskEl.classList.remove('active');
        }

        if (maskLeftEl) {
          maskLeftEl.classList.remove('active');
        }

        if (maskRightEl) {
          maskRightEl.classList.remove('active');
        }

        if (maskButtonsEl) {
          maskButtonsEl.classList.remove('active');
        }

        if (_this45.options.forceRenderAfterSelect === true) {
          _this45.render();
        }
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this46 = this;

      var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var callbackFn = arguments.length > 1 ? arguments[1] : undefined;
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.busy === false || force === true) {
        this.busy = true;

        if (this.options.getAllData === true) {
          getAllData('qHyperCube', this.options.model, this.layout, function (layout) {
            // this.rowCount = layout.qHyperCube.qDataPages[0].qMatrix.length
            _this46.busy = false;

            if (callbackFn) {
              callbackFn(layout.qHyperCube.qDataPages[0].qMatrix);
            }
          });
        } else {
          var qHeight = this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize;

          if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true && this.tableSizes) {
            qHeight = this.tableSizes.rowsToRender;
          }

          var pageDefs = [{
            qTop: top,
            qLeft: 0,
            qWidth: this.dataWidth,
            qHeight: qHeight
          }];

          if ((this.rowIndexList || []).length < this.layout.qHyperCube.qSize.qcy) {
            var method = 'getHyperCubeData';

            if (this.layout.qHyperCube.qMode === 'P') {
              method = 'getHyperCubePivotData';
            }

            this.options.model[method]('/qHyperCubeDef', pageDefs).then(function (pages) {
              if (pages) {
                if (_this46.layout.qHyperCube.qMode === 'P') {
                  var pData = _this46.transformPivotTable(pages[0]);

                  pages[0].qMatrix = pData.data; // this.fullData.push(pages[0])
                  // this.rowCount += pages[0].qData.length
                } // else {
                // pages[0].qMatrix = pages[0].qMatrix.filter(r => r[0].qText !== '-')              


                if (_this46.layout.qHyperCube.qMode === 'S' || _this46.layout.qHyperCube.qIndentMode === true) {
                  var _this46$fullData;

                  (_this46$fullData = _this46.fullData).splice.apply(_this46$fullData, [pages[0].qArea.qTop, pages[0].qArea.qHeight].concat(_toConsumableArray(pages[0].qMatrix)));

                  for (var i = 0; i < pages[0].qArea.qHeight; i++) {
                    if (_this46.rowIndexList.indexOf(pages[0].qArea.qTop + i) === -1) {
                      _this46.rowIndexList.push(pages[0].qArea.qTop + i);
                    }
                  }

                  _this46.rowIndexList.sort(function (a, b) {
                    return a - b;
                  });
                } else {
                  _this46.fullData = pages[0].qMatrix;
                } // }


                _this46.busy = false;

                if (callbackFn) {
                  if (_this46.layout.qHyperCube.qMode === 'P') {
                    callbackFn(pages[0]);
                  } else {
                    callbackFn(pages[0].qMatrix);
                  }
                }
              }
            }, function (err) {
              console.log('error getting data', err);
            });
          } else {
            this.busy = false;
            callbackFn();
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
    key: "handleCellSelect",
    value: function handleCellSelect(event, data) {
      var _this47 = this;

      if (this.options.allowCellSelections === true) {
        var elemNum = -1;
        var colIndex = this.qlikColumnOrder[data.colIndex];

        if (typeof colIndex === 'undefined' || colIndex === null) {
          colIndex = data.colIndex;
        }

        if (colIndex < 0) {
          return;
        }

        if (typeof data.cell.qElemNo !== 'undefined') {
          elemNum = data.cell.qElemNo; // return
        } else if (typeof data.cell.qElemNumber !== 'undefined') {
          elemNum = data.cell.qElemNumber;
        }

        if (elemNum < 0 || data.column.isMeasure === true) {
          return;
        }

        this.inSelections = true;
        this.abortModal().then(function () {});
        this.options.model.beginSelections(['/qHyperCubeDef']).then(function () {
          var maskEl = document.getElementById("".concat(_this47.elementId, "_cellSelectMask"));
          var maskLeftEl = document.getElementById("".concat(_this47.elementId, "_cellSelectMaskLeft"));
          var maskRightEl = document.getElementById("".concat(_this47.elementId, "_cellSelectMaskRight"));
          var maskButtonsEl = document.getElementById("".concat(_this47.elementId, "_cellSelectButtons"));
          var cellEl = null;

          if (event.target.classList.contains('websy-table-cell')) {
            cellEl = event.target;
          } else {
            cellEl = event.target.parentElement;
          }

          if (maskEl) {
            maskEl.classList.add('active');
          }

          if (maskLeftEl) {
            maskLeftEl.classList.add('active');
            maskLeftEl.style.left = '0px';
            maskLeftEl.style.width = "".concat(cellEl.offsetLeft, "px");
            maskLeftEl.style.top = "0px";
            maskLeftEl.style.bottom = '0px';
          }

          if (maskRightEl) {
            maskRightEl.classList.add('active');
            maskRightEl.style.left = "".concat(cellEl.offsetLeft + cellEl.offsetWidth, "px");
            maskRightEl.style.right = '0px';
            maskRightEl.style.top = "0px";
            maskRightEl.style.bottom = '0px';
          }

          if (maskButtonsEl) {
            maskButtonsEl.classList.add('active');
            maskButtonsEl.style.top = '0px';
            maskButtonsEl.style.left = "".concat(cellEl.offsetLeft, "px");
            maskButtonsEl.style.width = "".concat(cellEl.offsetWidth, "px");
            maskButtonsEl.style.height = "".concat(_this47.table.sizes.header.height, "px");
          }

          cellEl.classList.add('websy-cell-selected');

          _this47.options.model.selectHyperCubeValues('/qHyperCubeDef', colIndex, [elemNum], true);
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event, cell, row, column) {
      if (event.target.classList.contains('table-try-again')) {
        this.render();
      } else if (cell && cell.qElemNumber) {
        this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [cell.qElemNumber], false);
      } else if (event.target.classList.contains('toggle-pivot-panel')) {
        var el = document.getElementById("".concat(this.elementId, "_pivotContainer"));

        if (el) {
          event.target.classList.toggle('active');
          el.classList.toggle('active');
        }
      } else if (event.target.classList.contains('websy-cell-select-mask')) {
        this.confirmCancelSelections(true);
      } else if (event.target.classList.contains('.websy-cell-select-mask-side')) {
        this.confirmCancelSelections(true);
      } else if (event.target.classList.contains('websy-cell-select-confirm')) {
        this.confirmCancelSelections(true);
      } else if (event.target.classList.contains('websy-cell-select-cancel')) {
        this.confirmCancelSelections(false);
      }
    }
  }, {
    key: "handleCollapse",
    value: function handleCollapse(event, row, column) {
      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.options.model.collapseLeft('/qHyperCubeDef', this.startRow + row, this.startCol + column, all);
    }
  }, {
    key: "handleExpand",
    value: function handleExpand(event, row, column) {
      var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.options.model.expandLeft('/qHyperCubeDef', this.startRow + row, this.startCol + column, all);
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(direction, startRow, endRow, startCol, endCol) {
      var _this48 = this;

      this.startCol = startCol;
      this.endCol = endCol; // if (this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {
      //   this.startCol = Math.max(0, startCol - this.pinnedColumns)
      //   this.endCol = Math.max(0, endCol - this.pinnedColumns)
      // }

      this.startRow = startRow;
      this.checkDataExists(startRow, endRow).then(function () {
        if (_this48.columns && _this48.columns.length > 0) {
          if (_this48.layout.qHyperCube.qMode === 'S') {
            var columnsInView = _this48.columns.filter(function (c, i) {
              return i < _this48.pinnedColumns || i >= startCol && i <= endCol;
            });

            _this48.table.columns = [columnsInView];
          } else {
            var _columnsInView = _this48.columns.map(function (cP) {
              var acc = 0;
              var adjAcc = 0;
              var firstColTrimmed = false;
              var newRow = cP.map(function (cC, i) {
                var c = _extends({}, cC);

                if (i < _this48.pinnedColumns) {
                  acc += c.colspan || 1;
                  adjAcc += c.colspan || 1;
                  c.inView = true;
                  return c;
                }

                if (c.colspan > 1) {
                  // not last level of column headers
                  if (acc < startCol && acc + c.colspan > startCol && firstColTrimmed === false) {
                    c.colspan = c.colspan - (startCol - acc);
                    c.inView = true;
                    firstColTrimmed = true;
                  } else if (acc >= startCol) {
                    c.inView = true;
                  } // else if (acc >= startCol && acc + c.colspan <= endCol) {                  
                  //   c.inView = true
                  // }
                  // else if (acc <= endCol && acc + c.colspan >= endCol) {
                  //   // c.colspan = c.colspan - (endCol - acc)
                  //   c.inView = true
                  // }
                  else {
                    c.inView = false;
                  }
                } else {
                  c.inView = i >= startCol + _this48.pinnedColumns && i <= endCol + _this48.pinnedColumns;
                }

                acc += cC.colspan || 1;
                adjAcc += c.colspan || 1;
                return c;
              });
              return newRow.filter(function (d) {
                return d.inView === true;
              });
            });

            _this48.table.columns = _columnsInView;
          }
        }

        if (_this48.totals && _this48.totals.length > 0) {
          var totalsInView = _this48.totals.filter(function (c, i) {
            return i < _this48.pinnedColumns || i >= startCol && i <= endCol;
          });

          _this48.table.totals = totalsInView;
        }

        var start = _this48.layout.qHyperCube.qMode === 'S' || _this48.layout.qHyperCube.qIndentMode === true ? startRow : 0;
        var end = _this48.layout.qHyperCube.qMode === 'S' || _this48.layout.qHyperCube.qIndentMode === true ? endRow : endRow - startRow;

        _this48.appendRows(_this48.transformData(_toConsumableArray(_this48.fullData).slice(start, end + 1).map(function (row) {
          // console.log(row)
          return row.filter(function (c, i) {
            if (_this48.layout.qHyperCube.qMode === 'P' && _this48.layout.qHyperCube.qIndentMode !== true) {
              return c.level < _this48.pinnedColumns || c.dataIndex >= startCol && c.dataIndex <= endCol; // return c.level < this.pinnedColumns || (c.level >= startCol && c.level <= endCol)
            } else {
              return i < _this48.pinnedColumns || i >= startCol + _this48.pinnedColumns && i <= endCol + _this48.pinnedColumns;
            }
          }).map(function (c, i, arr) {
            if (_this48.layout.qHyperCube.qMode === 'P') {
              // && this.layout.qHyperCube.qIndentMode !== true) {            
              c.level = c.level > _this48.pinnedColumns - 1 ? _this48.table.options.columns[_this48.table.options.columns.length - 1].length - (arr.length - i) : c.level;
            }

            return c;
          });
        })));
      });
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(event, column) {
      // console.log(event, column)
      if (this.dropdowns[column.dimId]) {
        var el = document.getElementById("".concat(this.elementId, "_tableContainer_columnSearch_").concat(column.dimId));

        if (el) {
          el.classList.toggle('active');
          el.style.top = "".concat(event.pageY, "px");
          el.style.right = "calc(100vw - ".concat(event.pageX + event.target.offsetWidth, "px)");
          this.dropdowns[column.dimId].open();
        }
      }
    }
  }, {
    key: "handleCloseSearch",
    value: function handleCloseSearch(id) {
      var el = document.getElementById(id);
      el.classList.remove('active');
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
      var leftDims = this.options.pinnedColumns || this.layout.qHyperCube.qNoOfLeftDims;
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
    value: function prepDropdowns() {// this.table.options.columns.forEach((c, i) => {
      //   if (c.searchable === true && c.searchField && this.layout[c.searchField] && this.layout[c.searchField].qListObject) {
      //     this.dropdowns[c.searchField] = new WebsyDesigns.QlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
      //       model: this.options.model,
      //       path: `${c.searchField}`
      //     })
      //   }
      // })
      // this.layout.qHyperCube.qDimensionInfo.forEach((d, i) => {
      //   if (!this.dropdowns[`dim${i}`]) {
      //     this.dropdowns[`dim${i}`] = new WebsyDesignsQlikPlugins.Dropdown(`${this.elementId}_columnSearch_${i}`, {
      //       model: this.options.model,
      //       path: `dim${i}`,
      //       onClose: this.handleCloseSearch
      //     }) 
      //   }      
      // })
    }
  }, {
    key: "prepSearch",
    value: function prepSearch() {// this.busy = true
      // this.options.model.getProperties().then(props => {
      //   console.log('props', props)
      //   const patches = []
      //   props.qHyperCubeDef.qDimensions.forEach((d, i) => {
      //     patches.push({
      //       qOp: 'add',
      //       qPath: `/dim${i}`,
      //       qValue: JSON.stringify({
      //         qListObjectDef: {
      //           qDef: {...d.qDef, qSortCriterias: [{qSortByState: 1, qSortByAscii: 1}]},
      //           qLibraryId: d.qLibraryId
      //         }
      //       })
      //     })
      //   })
      //   this.options.model.applyPatches(patches, true).then(() => {
      //     this.busy = false
      //     this.searchPrepped = true
      //     this.render()
      //   })
      // }) 
    }
  }, {
    key: "render",
    value: function render() {
      var _this49 = this;

      var pageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // if (this.searchPrepped === false) {
      //   this.prepSearch()
      //   return 
      // }
      if (this.inSelections === false) {
        this.table.showLoading({
          message: 'Loading...'
        });
      }

      this.options.model.getLayout().then(function (layout) {
        _this49.layout = layout;

        if (_this49.inSelections === true) {
          if (layout.qSelectionInfo.qInSelections === true) {
            return;
          } else {
            _this49.confirmCancelSelections(true);
          }
        }

        _this49.dataWidth = _this49.layout.qHyperCube.qSize.qcx;
        _this49.columnOrder = _this49.layout.qHyperCube.qColumnOrder;
        _this49.pageNum = pageNum;

        _this49.getData(0, function (page) {
          _this49.layout.qHyperCube.qDataPages = [page];

          if (layout.qHyperCube.qError && layout.qHyperCube.qCalcCondMsg) {
            _this49.table.hideLoading();

            _this49.table.showError({
              message: _this49.options.customError || layout.qHyperCube.qCalcCondMsg
            });

            return;
          }

          if (_this49.options.forcedRowLimit && layout.qHyperCube.qSize.qcy > _this49.options.forcedRowLimit) {
            _this49.table.hideLoading();

            _this49.table.showError({
              message: _this49.options.forcedRowLimitError || _this49.options.customError || layout.qHyperCube.qCalcCondMsg
            });

            return;
          }

          if (_this49.options.forcedColLimit && layout.qHyperCube.qSize.qcx > _this49.options.forcedColLimit) {
            _this49.table.hideLoading();

            _this49.table.showError({
              message: _this49.options.forcedColLimitError || _this49.options.customError || layout.qHyperCube.qCalcCondMsg
            });

            return;
          }

          _this49.table.hideError();

          _this49.options.model.getEffectiveProperties().then(function (props) {
            _this49.properties = props;

            if (_this49.options.onUpdate) {
              _this49.options.onUpdate(props, layout);
            }

            _this49.endCol = layout.qHyperCube.qSize.qcx + (_this49.pinnedColumns || layout.qHyperCube.qNoOfLeftDims); // this.layout = layout

            if (_this49.layout.qHyperCube.qMode === 'P') {
              _this49.qlikColumnOrder = _this49.layout.qHyperCube.qEffectiveInterColumnSortOrder;
            } else {
              _this49.qlikColumnOrder = _this49.layout.qHyperCube.qColumnOrder;
            }

            _this49.resize();
          });
        });
      }, function (err) {
        console.log('error getting layout', err);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this50 = this;

      this.buildDataStructure(); // this.rowCount = pageNum * this.options.pageSize
      // if (this.layout.qHyperCube.qPivotDataPages[0]) {
      //   this.layout.qHyperCube.qPivotDataPages = []
      // }

      this.errorCount = 0;
      this.pageCount = Math.ceil(this.layout.qHyperCube.qSize.qcy / this.options.pageSize);
      this.table.options.pageNum = this.pageNum;
      this.table.options.pageCount = this.pageCount; // this.dataWidth = this.layout.qHyperCube.qSize.qcx
      // this.columnOrder = this.layout.qHyperCube.qColumnOrder

      if (typeof this.columnOrder === 'undefined') {
        this.columnOrder = new Array(this.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
          return i;
        });
      }

      this.layout.qHyperCube.qDimensionInfo = this.layout.qHyperCube.qDimensionInfo.map(function (c, i) {
        c.searchable = true;

        if (_this50.options.columnOverrides[i]) {
          c = _objectSpread(_objectSpread({}, c), _this50.options.columnOverrides[i]);
        }

        c.searchField = "dim".concat(i);
        return c;
      });
      this.layout.qHyperCube.qMeasureInfo = this.layout.qHyperCube.qMeasureInfo.map(function (c, i) {
        if (_this50.options.columnOverrides[_this50.layout.qHyperCube.qDimensionInfo.length + i]) {
          c = _objectSpread(_objectSpread({}, c), _this50.options.columnOverrides[_this50.layout.qHyperCube.qDimensionInfo.length + i]);
        }

        return c;
      });

      if (this.layout.qHyperCube.qMode === 'S') {
        this.buildStraightColumnsAndTotals();
      } else {
        this.buildPivotColumns();
      } // let dataStart = this.startRow


      if (this.startRow > 0 && this.startRow + this.table.sizes.rowsToRender > this.layout.qHyperCube.qSize.qcy) {
        this.startRow = this.layout.qHyperCube.qSize.qcy - this.table.sizes.rowsToRender;
      }

      this.getData(this.startRow, function (page) {
        _this50.table.hideLoading(); // if (this.layout.qHyperCube.qMode === 'S') {


        _this50.table.render([], false);

        _this50.prepDropdowns(); // }        


        if (!page || page.err) {
          var tableEl = document.getElementById("".concat(_this50.elementId, "_foot"));

          if (_this50.tableEl) {
            tableEl.innerHTML = "\n            <div class='request-abort-error'>Could not fetch data. Click <strong class='table-try-again'>here</strong> to try again</div>\n          ";
          }
        } else {
          // this.fullData = page
          _this50.appendRows(_this50.transformData(_this50.fullData));
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
      var _this51 = this;

      return page.map(function (r) {
        return r.map(function (c, i) {
          if (_this51.layout.qHyperCube.qMode === 'S') {
            c.level = i;
          }

          if (_this51.table.options.columns[_this51.table.options.columns.length - 1][i] && (_this51.table.options.columns[_this51.table.options.columns.length - 1][i].showAsLink === true || _this51.table.options.columns[_this51.table.options.columns.length - 1][i].showAsNavigatorLink === true)) {
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
            // let t = 'qDimensionInfo'
            var tIndex = i + (_this51.startCol || 0); // if (i > this.layout.qHyperCube.qDimensionInfo.length - 1) {
            //   t = 'qMeasureInfo'
            //   tIndex -= this.layout.qHyperCube.qDimensionInfo.length
            // }

            c.qAttrExps.qValues.forEach(function (a, aI) {
              if (a.qText && a.qText !== '') {
                // if (sourceColumns[tIndex] && sourceColumns[tIndex].qAttrExprInfo && sourceColumns[tIndex].qAttrExprInfo[aI] && sourceColumns[tIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                //   c.color = a.qText
                // }
                // else if (sourceColumns[tIndex] && sourceColumns[tIndex].qAttrExprInfo && sourceColumns[tIndex].qAttrExprInfo[aI] && sourceColumns[tIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                //   c.backgroundColor = a.qText
                // }
                if (c.level < _this51.layout.qHyperCube.qDimensionInfo.length) {
                  if (_this51.layout.qHyperCube.qDimensionInfo[c.level] && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI] && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this51.layout.qHyperCube.qDimensionInfo[c.level] && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI] && _this51.layout.qHyperCube.qDimensionInfo[c.level].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                    c.backgroundColor = a.qText;
                  }
                } else {
                  var measureIndex = (c.level - _this51.layout.qHyperCube.qDimensionInfo.length) % _this51.layout.qHyperCube.qMeasureInfo.length;

                  if (_this51.layout.qHyperCube.qMeasureInfo[measureIndex] && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                    c.color = a.qText;
                  } else if (_this51.layout.qHyperCube.qMeasureInfo[measureIndex] && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI] && _this51.layout.qHyperCube.qMeasureInfo[measureIndex].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                    c.backgroundColor = a.qText;
                  }
                }
              }
            });
          }

          return c;
        });
      }); // }
      // else {
      //   let {columns, data} = this.transformPivotTable(page)      
      //   // let columns = [{ name: this.layout.qHyperCube.qDimensionInfo[0].qFallbackTitle }]
      //   // columns = columns.concat(page.qTop.map(c => ({ name: c.qText ? c.qText : c.qType === 'T' ? 'Total' : '-' })))
      //   // this.table.options.columns = columns   
      //   // this.fullColumnList = data.shift()
      //   // let visibleColumns = []
      //   // let visibleStart = (this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims)
      //   // for (let i = 0; i < this.fullColumnList.length; i++) {
      //   //   if (i < visibleStart) {
      //   //     visibleColumns.push(this.fullColumnList[i])
      //   //   }
      //   //   else if (i >= visibleStart + this.leftDataCol && i < (visibleStart + this.leftDataCol + this.columnsToRender)) {
      //   //     visibleColumns.push(this.fullColumnList[i])
      //   //   }        
      //   // }            
      //   this.table.options.columns = columns
      //   if (this.columnParamValues) {
      //     this.table.calculateSizes(this.columnParamValues, this.layout.qHyperCube.qSize.qcy, this.layout.qHyperCube.qSize.qcx, 0)
      //   }
      //   let renderedWidth = 0
      //   // visibleColumns.forEach(c => {
      //   //   renderedWidth += +(c.width.toString()).replace('px', '')
      //   // })
      //   // this.table.setWidth(renderedWidth)
      //   this.table.render()
      //   this.prepDropdowns()
      //   return data
      //   // let rows = []
      //   // page.qData.forEach((r, i) => {
      //   //   rows.push([{ value: page.qLeft[i].qText, ...page.qLeft[i] }, ...r.map(c => {
      //   //     c.value = c.qText || '-'        
      //   //     if (c.qAttrExps && c.qAttrExps.qValues && c.qAttrExps.qValues[0].qText) {
      //   //       c.backgroundColor = c.qAttrExps.qValues[0].qText
      //   //       let colorParts
      //   //       let red
      //   //       let green
      //   //       let blue
      //   //       if (c.backgroundColor.indexOf('#') !== -1) {
      //   //         // hex color
      //   //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('#', '')
      //   //         colorParts = colorParts.split('')
      //   //         red = parseInt(colorParts[0] + colorParts[1], 16)
      //   //         green = parseInt(colorParts[2] + colorParts[3], 16)
      //   //         blue = parseInt(colorParts[4] + colorParts[5], 16)
      //   //       }
      //   //       else if (c.backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
      //   //         // rgb color
      //   //         colorParts = c.qAttrExps.qValues[0].qText.toLowerCase().replace('rgb(', '').replace(')', '')
      //   //         colorParts = colorParts.split(',')
      //   //         red = colorParts[0]
      //   //         green = colorParts[1]
      //   //         blue = colorParts[2]
      //   //       }
      //   //       c.color = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff'
      //   //     }
      //   //     return c
      //   //   })])
      //   // })
      //   // return rows  
      // }
    }
  }, {
    key: "transformPivotTable",
    value: function transformPivotTable(page) {
      var _this52 = this;

      var output = [];
      var leftNodes = [];
      var topNodesTransposed = [];
      var topCounter = 0;
      var accCellSpan = 0;
      var visibleLeftCount = 0;
      var visibleTopCount = 0;
      var visibleColCount = 0;
      var tempNode = [];
      var sourceColumns = this.layout.qHyperCube.qDimensionInfo.concat(this.layout.qHyperCube.qMeasureInfo);

      for (var i = 0; i < page.qLeft.length; i++) {
        expandLeft.call(this, page.qLeft[i], 0, 0, null, []);
      }

      for (var _i21 = 0; _i21 < page.qTop.length; _i21++) {
        expandTop.call(this, page.qTop[_i21], 0, _i21);
      }

      this.pinnedColumns = visibleLeftCount;

      for (var r = 0; r < page.qData.length; r++) {
        var row = page.qData[r];

        for (var c = 0; c < row.length; c++) {
          if (!row[c].classes) {
            row[c].classes = [];
          }

          row[c].pos = 'Data';
          row[c].style = 'text-align: right;'; // row[c].level = this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).length + c

          row[c].dataIndex = c; // row[c].level = this.pinnedColumns

          row[c].level = this.pinnedColumns + c; // row[c].width = `${this.columnParams.cellWidths[(this.options.freezeColumns || this.layout.qHyperCube.qNoOfLeftDims) + c] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
          // if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[0] && row[c].qAttrExps.qValues[0].qText) {
          //   row[c].backgroundColor = row[c].qAttrExps.qValues[0].qText
          //   row[c].color = this.getFontColor(row[c].qAttrExps.qValues[0].qText)
          // }
          // if (row[c].qAttrExps && row[c].qAttrExps.qValues && row[c].qAttrExps.qValues[1] && row[c].qAttrExps.qValues[1].qText) {
          //   row[c].color = this.getFontColor(row[c].qAttrExps.qValues[1].qText)
          // }

          var lastTop = topNodesTransposed[topNodesTransposed.length - 1][c];

          if (['T', 'E'].indexOf(row[c].qType) !== -1 || ['T'].indexOf(lastTop.qType) !== -1) {
            row[c].qType = 'T';
          }

          if (leftNodes[r] && leftNodes[r][leftNodes[r].length - 1].qType === 'T') {
            if (!leftNodes[r][leftNodes[r].length - 1].classes) {
              leftNodes[r][leftNodes[r].length - 1].classes = [];
            }

            leftNodes[r][leftNodes[r].length - 1].classes.push('total-cell');
            row[c].classes.push('total-cell');
          }

          row[c].value = row[c].qText || '';
        }

        if (leftNodes[r]) {
          row = leftNodes[r].concat(row);
        }

        output.push(row);
      }

      var additionalTopCells = [];
      var additionalCellCount = visibleLeftCount;

      if (this.layout.qHyperCube.qIndentMode === true) {
        additionalCellCount = 1;
      }

      for (var _i22 = 0; _i22 < additionalCellCount; _i22++) {
        additionalTopCells.push({
          rowspan: 1,
          colspan: 1,
          level: 0,
          qText: '',
          name: '',
          qType: 'V'
        });
      }

      if (visibleLeftCount !== 0) {
        for (var _i23 = 0; _i23 < topNodesTransposed.length; _i23++) {
          if (_i23 === topNodesTransposed.length - 1 && this.layout.qHyperCube.qMode === 'P' && this.layout.qHyperCube.qIndentMode !== true) {
            (function () {
              var columns = _this52.layout.qHyperCube.qDimensionInfo.filter(function (d) {
                return !d.qError;
              });

              var labelledTopCells = additionalTopCells.map(function (d, i) {
                d.name = (columns[i] || {}).qFallbackTitle || '';
                return d;
              });
              topNodesTransposed[_i23] = labelledTopCells.concat(topNodesTransposed[_i23]);
            })();
          } else {
            // if (i === topNodesTransposed.length - 1) {          
            // topNodesTransposed[i] = (this.layout.qHyperCube.qDimensionInfo.filter(d => !d.qError).filter((d, dI) => dI < visibleLeftCount).map((d, dI) => {
            //   return Object.assign({}, d, {
            //     name: d.qFallbackTitle || 'Review this'
            //     // width: `${this.columnParams.cellWidths[dI] || this.columnParams.cellWidths[this.columnParams.cellWidths.length - 1]}px`
            //   })
            // }).filter((d, i) => {
            //   if (this.layout.qHyperCube.qIndentMode === true && i === 0) {
            //     return true
            //   }
            //   else if (this.layout.qHyperCube.qIndentMode === false) {
            //     return true
            //   }
            //   return false
            // })).concat(topNodesTransposed[i])
            // } 
            // else {
            topNodesTransposed[_i23] = additionalTopCells.concat(topNodesTransposed[_i23]);
          }
        }
      }

      visibleColCount = topNodesTransposed[topNodesTransposed.length - 1]; // output = topNodesTransposed.concat(output)
      // This function is used to convert the qLeft structure from a parent/child hierarchy
      // into a 2 dimensions array    

      function expandLeft(input, level, index, parent, chain) {
        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Left';
        o.style = '';
        o.value = o.qText || '';
        input.value = input.qText || '';
        visibleLeftCount = Math.max(visibleLeftCount, level + 1);
        o.childCount = o.qSubNodes.length; // TODO add id mapping to attribute exressions here

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[0] && o.qAttrExps.qValues[0].qText) {
          o.backgroundColor = o.qAttrExps.qValues[0].qText;
          o.color = this.getFontColor(o.qAttrExps.qValues[0].qText);
        }

        if (o.qAttrExps && o.qAttrExps.qValues && o.qAttrExps.qValues[1] && o.qAttrExps.qValues[1].qText) {
          o.color = this.getFontColor(o.qAttrExps.qValues[1].qText);
        }

        delete o.qSubNodes;

        if (o.qElemNo < 0 && this.layout.qHyperCube.qIndentMode === true && level > 0) {
          return;
        }

        if (typeof o.qText === 'undefined') {
          if (o.qElemNo === -1) {
            o.qText = 'Totals';
          } else if (o.qElemNo === -4) {
            o.qText = ''; // o.qType = 'T'
          }
        }

        o.expandable = o.qCanExpand;
        o.collapsable = o.qCanCollapse;
        o.rowspan = Math.max(1, input.qSubNodes.length);

        if (o.qAttrExps && o.qAttrExps.qValues) {
          o.qAttrExps.qValues.forEach(function (a, aI) {
            if (a.qText && a.qText !== '') {
              if (sourceColumns[o.level] && sourceColumns[o.level].qAttrExprInfo && sourceColumns[o.level].qAttrExprInfo[aI] && sourceColumns[o.level].qAttrExprInfo[aI].id === 'cellForegroundColor') {
                o.color = a.qText;
              } else if (sourceColumns[o.level] && sourceColumns[o.level].qAttrExprInfo && sourceColumns[o.level].qAttrExprInfo[aI] && sourceColumns[o.level].qAttrExprInfo[aI].id === 'cellBackgroundColor') {
                o.backgroundColor = a.qText;
              }
            }
          });
        }

        input.rowspan = Math.max(1, input.qSubNodes.length);

        if (this.layout.qHyperCube.qIndentMode === true) {
          o.rowspan = 1;
          o.indent = level;

          if (level > 0) {
            o.style = "padding-left: ".concat(level * 20, "px;");
          }

          if (o.qType !== 'E') {
            leftNodes.push([o]);
          }

          tempNode = [];

          for (var _i24 = 0; _i24 < input.qSubNodes.length; _i24++) {
            expandLeft.call(this, input.qSubNodes[_i24], level + 1, _i24, input, [].concat(_toConsumableArray(chain), [o]));
          }
        } else if (input.qSubNodes.length === 0) {
          leftNodes.push(tempNode.concat([o]));
          tempNode = [];
        } else {
          tempNode.push(o);

          for (var _i25 = 0; _i25 < input.qSubNodes.length; _i25++) {
            expandLeft.call(this, input.qSubNodes[_i25], level + 1, _i25, input, [].concat(_toConsumableArray(chain), [o]));
          }

          var s = 0;

          for (var _i26 = 0; _i26 < input.qSubNodes.length; _i26++) {
            s += input.qSubNodes[_i26].rowspan;
          }

          input.rowspan = s;
          o.rowspan = s;
        }
      } // This function is used to convert the qTop structure from a parent/child hierarchy
      // into a 2 dimensions array


      function expandTop(input, level, index, parent) {
        var _topNodesTransposed$l3;

        if (typeof topNodesTransposed[level] === 'undefined') {
          topNodesTransposed[level] = [];
        }

        var o = _extends({}, input);

        o.level = level;
        o.pos = 'Top';
        o.rowIndex = topCounter;
        o.topNode = true;
        o.isHeader = true;
        o.style = 'text-align: center;';
        o.name = o.qText || '';

        if (!o.font) {
          o.font = {};
        }

        input.value = input.qText;

        if (o.qType === 'P') {
          o.qElemNo = -99;
        }

        o.childCount = o.qSubNodes.length;
        visibleTopCount = Math.max(visibleTopCount, level + 1); // TODO add id mapping to attribute exressions here

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

        o.colspan = Math.max(1, input.qSubNodes.length);
        input.colspan = Math.max(1, input.qSubNodes.length); // if (level === this.layout.qHyperCube.qEffectiveInterColumnSortOrder.length - this.layout.qHyperCube.qNoOfLeftDims) {
        //   o.inView = topNodesTransposed[level].length >= this.startCol && topNodesTransposed[level].length <= this.endCol
        //   input.inView = topNodesTransposed[level].length >= this.startCol && topNodesTransposed[level].length <= this.endCol
        // }      

        if (input.qSubNodes.length === 0) {
          // if (o.qElemNo === -99 && o.qCanCollapse === true) {
          if (index >= this.startCol && index <= this.endCol) {
            o.inView = true;
            input.inView = true;
            accCellSpan++;
          } // }

        } else {
          for (var _i27 = 0; _i27 < input.qSubNodes.length; _i27++) {
            expandTop.call(this, input.qSubNodes[_i27], level + 1, _i27, input);
          }

          var s = 0;
          var inView = false;

          for (var _i28 = 0; _i28 < input.qSubNodes.length; _i28++) {
            // if (input.qSubNodes[i].inView === true) {
            // inView = true
            s += input.qSubNodes[_i28].colspan; // }
          } // o.inView = inView
          // input.inView = inView


          o.rowIndex = topCounter;
          topCounter += s;
          o.colspan = s;
          input.colspan = s;

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
              accCellSpan += o.colspan;
            }
          }
        }

        var toPush = [o]; // if (o.colspan > 1) {
        //   toPush = new Array(o.colspan).fill({ ...o })
        // }

        (_topNodesTransposed$l3 = topNodesTransposed[level]).push.apply(_topNodesTransposed$l3, toPush);
      }

      return {
        columns: topNodesTransposed,
        data: output
      };
    }
  }, {
    key: "updatePivotStructure",
    value: function updatePivotStructure() {
      var dims = this.rowList.options.items.concat(this.columnList.options.items).map(function (d) {
        return d.dim;
      });
      var leftDims = this.rowList.options.items.length;
      var patchDefs = [{
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qNoOfLeftDims',
        qValue: JSON.stringify(leftDims)
      }, {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qDimensions',
        qValue: JSON.stringify(dims)
      }];

      if (this.options.onPivot) {
        this.options.onPivot();
      }

      this.options.model.applyPatches(patchDefs, true);
    }
  }]);

  return Table3;
}();

var WebsyDesignsQlikPlugins = {
  Bookmarks: Bookmarks,
  Chart: Chart,
  CurrentSelections: CurrentSelections,
  SimpleSearch: SimpleSearch,
  Table: Table,
  Table2: Table2,
  Table3: Table3,
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
  Table3
  GeoMap
  Dropdown
  DatePicker
  KPI
*/

var ObjectManager = /*#__PURE__*/function () {
  function ObjectManager(options) {
    var _this53 = this;

    _classCallCheck(this, ObjectManager);

    var defaults = {
      helpEvent: 'mouseover',
      applySelections: false,
      actions: [],
      retryCount: 5,
      initialActions: []
    };
    var defaultVisualisationPlugins = [{
      id: 'kpi',
      definition: KPI
    }, {
      id: 'table',
      definition: Table3
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
    }];
    this.app = null;
    this.paused = false;
    this.supportedChartTypes = [];
    this.activeViews = [];
    this.chartLibrary = {};
    this.globalObjectsLoaded = false; // this.options = this.mergeObjects({}, defaults, options)            

    this.options = _extends({}, defaults, options);

    if (options.visualisationPlugins && options.visualisationPlugins.length > 0) {
      var visKeys = options.visualisationPlugins.map(function (d) {
        return d.id;
      });
      defaultVisualisationPlugins.forEach(function (p) {
        if (visKeys.indexOf(p.id) === -1) {
          _this53.options.visualisationPlugins.push(p);
        }
      });
    } else {
      this.options.visualisationPlugins = _extends({}, defaultVisualisationPlugins);
    }

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
      var _this54 = this;

      // Variables
      var extended = {};
      var deep = true;
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
              extended[prop] = _this54.mergeObjects(extended, extended[prop], obj[prop]);
            } else {
              // Otherwise, do a regular merge
              if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
                if (obj[prop].length > 0) {
                  // try {
                  extended[prop] = [].concat(_toConsumableArray(extended[prop]), _toConsumableArray(obj[prop])); // } 
                  // catch (error) {
                  //   console.log('prop', prop)
                  //   console.log(extended[prop])
                  //   console.log(obj[prop])
                  //   console.log(error)
                  // }                
                }
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
      var _this55 = this;

      return new Promise(function (resolve, reject) {
        _this55.prep('global');

        _this55.connectToApp().then(function () {
          _this55.executeAction(0, _this55.options.initialActions, function () {
            _this55.selectFromUrl(function () {
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
      var _this56 = this;

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
        var el = document.getElementById(_this56.options.actions[a].elementId);

        if (el) {
          el.addEventListener(_this56.options.actions[a].event, function () {
            var _loop2 = function _loop2(i) {
              var item = _this56.options.actions[a].items[i];

              if (typeof item.params === 'undefined') {
                item.params = [];
              }

              if (item.field) {
                _this56.app.getField(item.field, item.state || '$').then(function (field) {
                  field[item.method].apply(field, _toConsumableArray(item.params));
                });
              } else {
                var _this56$app;

                (_this56$app = _this56.app)[item.method].apply(_this56$app, _toConsumableArray(item.params));
              }
            };

            for (var i = 0; i < _this56.options.actions[a].items.length; i++) {
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
      var _this57 = this;

      return new Promise(function (resolve, reject) {
        // check for enigma.js      
        var originalId = _this57.options.enigmaConfig.app;

        if (_this57.options.enigmaConfig.app) {
          _this57.options.enigmaConfig.app = _this57.normalizeId(_this57.options.enigmaConfig.app);
        }

        if (typeof enigma === 'undefined') {
          reject({
            error: 'Enigma.js not found.'
          });
          return;
        }

        if (typeof _this57.options.enigmaSchema === 'undefined') {
          reject({
            error: 'enigmaSchema property not found.'
          });
          return;
        }

        var url = _this57.options.enigmaConfig.url;

        if (_this57.options.enigmaConfig.ticket) {
          if (url.indexOf('?') === -1) {
            url += '?';
          } else {
            url += '&';
          }

          url += "qlikTicket=".concat(_this57.options.enigmaConfig.ticket);
        }

        var MAX_RETRIES = 5;
        var config = {
          schema: _this57.options.enigmaSchema,
          url: url,
          onRejected: function onRejected(sessionReference, request, error) {
            if (error.code === this.options.enigmaSchema.enums.LocalizedErrorCode.LOCERR_GENERIC_ABORTED) {
              request.tries = (request.tries || 0) + 1;

              if (request.tries <= MAX_RETRIES) {
                return request.retry();
              }
            }

            return this.Promise.reject(error);
          }
        };
        var session = enigma.create(config);
        _this57.session = session;
        session.open().then(function (global) {
          _this57.global = global;
          global.getActiveDoc().then(function (app) {
            if (app) {
              app.abortModal(true).then(function () {
                _this57.app = app;

                if (_this57.options.views.global) {
                  _this57.executeActions('global').then(function () {
                    resolve();
                  });
                } else {
                  resolve();
                }
              });
            } else {
              return _this57.openApp(originalId).then(function () {
                resolve();
              });
            }
          }, function (err) {
            var e = err;

            if (originalId) {
              return _this57.openApp(originalId).then(function () {
                resolve();
              }, function (err) {
                _this57.sessionOnNotification({
                  err: err
                });
              });
            } else {
              resolve();
            }
          });

          if (_this57.options.keepAlive === true) {
            _this57.keepAlive();
          }
        }, function (err) {
          reject(err);
        });
        session.on('traffic:received', function (data) {
          if (typeof data.suspend !== 'undefined') {
            _this57.sessionSuspended();
          }
        });
        session.on('notification:*', function (eventName, data) {
          if (eventName === 'OnAuthenticationInformation') {
            if (data.mustAuthenticate === true) {
              if (_this57.options.enigmaConfig.authUrl) {
                window.location = _this57.options.enigmaConfig.authUrl + window.location.search.replace('?', '%3F').replace('=', '%3D');
              } else if (_this57.options.enigmaConfig.onMustAuthenticate) {
                _this57.options.enigmaConfig.onMustAuthenticate();
              } else if (data.loginUri) {
                window.location = data.loginUri;
              }
            } else if (data.mustAuthenticate === false) {
              _this57.user = {
                userDirectory: data.userDirectory,
                userId: data.userId
              };
            }
          } else {
            _this57.sessionOnNotification(data, eventName);
          }
        });
        session.on('suspended', _this57.sessionSuspended.bind(_this57));
        session.on('resumed', _this57.sessionResumed.bind(_this57));
        session.on('closed', _this57.sessionClosed.bind(_this57));
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
      var _this58 = this;

      this.global.engineVersion();
      setTimeout(function () {
        _this58.keepAlive();
      }, 59000);
    }
  }, {
    key: "openApp",
    value: function openApp(appId) {
      var _this59 = this;

      return new Promise(function (resolve, reject) {
        _this59.global.openDoc(appId).then(function (app) {
          app.abortModal(true).then(function () {
            _this59.app = app;

            if (_this59.options.views.global) {
              _this59.executeActions('global').then(function () {
                resolve();
              });
            } else {
              resolve();
            }
          });
        }, function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "loadView",
    value: function loadView(view, force) {
      var _this60 = this;

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
          _this60.options.views[view].initialized = true;

          if (_this60.options.views[view].prepped !== true) {
            _this60.prep(view);
          }

          _this60.executeActions(view).then(function () {
            if ((_this60.globalObjectsLoaded === false || _this60.options.alwaysLoadGlobal === true) && view !== 'global') {
              _this60.loadObjects('global', force);

              _this60.globalObjectsLoaded = true;
            }

            _this60.loadObjects(view, force);

            if (view === 'global') {
              _this60.globalObjectsLoaded = true;
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

          if ((_this60.globalObjectsLoaded === false || _this60.options.alwaysLoadGlobal === true) && view !== 'global') {
            _this60.loadObjects('global', force);

            _this60.globalObjectsLoaded = true;
          }

          _this60.loadObjects(view, force);

          if (view === 'global') {
            _this60.globalObjectsLoaded = true;
          }
        });
      }
    }
  }, {
    key: "executeAction",
    value: function executeAction(index, actionList, callbackFn) {
      var _this61 = this;

      var item = actionList[index];

      if (typeof item === 'undefined') {
        callbackFn();
        return;
      }

      if (typeof item.params === 'undefined') {
        item.params = [];
      }

      if (item.field) {
        this.app.getField(item.field, item.state || '$').then(function (field) {
          field[item.method].apply(field, _toConsumableArray(item.params)).then(function () {
            if (item.lock === true) {
              field.lock().then(function () {
                index++;

                if (index === actionList.length) {
                  callbackFn();
                } else {
                  _this61.executeAction(index, actionList, callbackFn);
                }
              });
            } else {
              index++;

              if (index === actionList.length) {
                callbackFn();
              } else {
                _this61.executeAction(index, actionList, callbackFn);
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
            _this61.executeAction(index, actionList, callbackFn);
          }
        });
      }
    }
  }, {
    key: "executeActions",
    value: function executeActions(view) {
      var _this62 = this;

      return new Promise(function (resolve, reject) {
        if (!_this62.options.views[view] || !_this62.options.views[view].actions || _this62.options.views[view].actions.length === 0) {
          resolve();
        }

        _this62.executeAction(0, _this62.options.views[view].actions, resolve);
      });
    }
  }, {
    key: "loadObjects",
    value: function loadObjects(view, force) {
      var _this63 = this;

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
              _this63.request('GET', objList[i].definition).then(function (def) {
                objList[i].definition = def;

                _this63.createObjectFromDefinition(objList[i]);
              });
            } else {
              _this63.createObjectFromDefinition(objList[i]);
            }
          } else {
            _this63.createObjectFromDefinition(objList[i]);
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
      var _this64 = this;

      if (objectConfig.retries) {
        objectConfig.retries = 0;
      }

      if (objectConfig.definition && this.app) {
        var method = 'createSessionObject';
        var params = objectConfig.definition;

        if (objectConfig.definition.qField) {
          method = 'getField';
          params = objectConfig.definition.qField;
        }

        if (!objectConfig.definition.qInfo) {
          // assume we have an objectId
          method = 'getObject';
        }

        this.app[method](params).then(function (model) {
          objectConfig.objectId = model.id;
          objectConfig.attached = true;
          var chartType = objectConfig.type || objectConfig.definition.qInfo.qType;

          if (_this64.supportedChartTypes.indexOf(chartType) !== -1) {
            var options = _extends({}, objectConfig.options, {
              model: model,
              def: objectConfig.definition,
              app: _this64.app
            });

            objectConfig.vis = new _this64.chartLibrary[chartType]("".concat(objectConfig.elementId, "_vis"), options);
            model.on('changed', function () {
              if (objectConfig.attached === true && _this64.paused === false) {
                objectConfig.vis.render();
              }
            });
          } else if (objectConfig.render && typeof objectConfig.render === 'function') {
            objectConfig.vis = {};
            objectConfig.attached = true;
            objectConfig.model = model;
            objectConfig.render(objectConfig, model);
            model.on('changed', function () {
              if (objectConfig.attached === true && _this64.paused === false) {
                objectConfig.render(objectConfig, model);
              }
            });
          }
        }, function (err) {
          console.log('Error creating object', err);

          if (objectConfig.retries < _this64.options.retryCount) {
            console.log('retrying');
            objectConfig.retries++;

            _this64.createObjectFromDefinition(objectConfig);
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
    value: function select(index, selections, locks, callbackFn) {
      var _this65 = this;

      if (index === selections.length) {
        this.play();
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
          f.selectValues(values, false).then(function () {
            if (locks.indexOf(selections[index].field) !== -1) {
              f.lock().then(function () {
                index++;

                _this65.select(index, selections, locks, callbackFn);
              });
            } else {
              index++;

              _this65.select(index, selections, locks, callbackFn);
            }
          });
        }, function (err) {
          console.log('field for selection not found', err);
          index++;

          _this65.select(index, selections, locks, callbackFn);
        });
      }
    }
  }, {
    key: "selectFromUrl",
    value: function selectFromUrl(callbackFn) {
      if (this.options.applySelections === true && location.search !== '') {
        this.pause();
        var params = location.search.replace('?', '').split('&');
        params = params.map(function (s) {
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
        });
        var selections = params.filter(function (s) {
          return s.param === 'select' || s.param === 'setvariable';
        });
        var locks = params.filter(function (s) {
          return s.param === 'lock';
        }).map(function (d) {
          return d.field;
        });
        this.select(0, selections, locks, callbackFn);
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
