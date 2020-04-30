/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/View */ \"./src/view/View.ts\");\n\r\nvar view = new _view_View__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.body);\r\nview.render();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/models/CharacterDb.ts":
/*!***********************************!*\
  !*** ./src/models/CharacterDb.ts ***!
  \***********************************/
/*! exports provided: fetchCharacter, createCharacter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchCharacter\", function() { return fetchCharacter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCharacter\", function() { return createCharacter; });\n/* harmony import */ var _util_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/paths */ \"./src/util/paths.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\nfunction fetchCharacter(id) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            return [2 /*return*/, fetch(_util_paths__WEBPACK_IMPORTED_MODULE_0__[\"CHARACTER_PATH\"] + (\"/\" + id)).then(function (res) { return res.json(); })];\r\n        });\r\n    });\r\n}\r\nfunction createCharacter(character) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            return [2 /*return*/, fetch(_util_paths__WEBPACK_IMPORTED_MODULE_0__[\"CHARACTER_PATH\"], {\r\n                    method: \"POST\",\r\n                    headers: {\r\n                        \"Content-Type\": \"application/json\",\r\n                    },\r\n                    body: JSON.stringify(character),\r\n                })];\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/models/CharacterDb.ts?");

/***/ }),

/***/ "./src/models/Race.ts":
/*!****************************!*\
  !*** ./src/models/Race.ts ***!
  \****************************/
/*! exports provided: getRaces */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRaces\", function() { return getRaces; });\n/* harmony import */ var _util_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/paths */ \"./src/util/paths.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\nfunction getRaces() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            return [2 /*return*/, fetch(_util_paths__WEBPACK_IMPORTED_MODULE_0__[\"RACE_PATH\"]).then(function (res) { return res.json(); })];\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/models/Race.ts?");

/***/ }),

/***/ "./src/util/paths.ts":
/*!***************************!*\
  !*** ./src/util/paths.ts ***!
  \***************************/
/*! exports provided: RACE_PATH, WEAPON_PATH, ARMOR_PATH, CHARACTER_PATH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RACE_PATH\", function() { return RACE_PATH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEAPON_PATH\", function() { return WEAPON_PATH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ARMOR_PATH\", function() { return ARMOR_PATH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHARACTER_PATH\", function() { return CHARACTER_PATH; });\nvar RACE_PATH = \"http://localhost:3000/races/\";\r\nvar WEAPON_PATH = \"http://localhost:3000/weapons/\";\r\nvar ARMOR_PATH = \"http://localhost:3000/armors/\";\r\nvar CHARACTER_PATH = \"http://localhost:3000/characters/\";\r\n\n\n//# sourceURL=webpack:///./src/util/paths.ts?");

/***/ }),

/***/ "./src/view/View.ts":
/*!**************************!*\
  !*** ./src/view/View.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ViewCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewCreator */ \"./src/view/ViewCreator.ts\");\n/* harmony import */ var _ViewHome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewHome */ \"./src/view/ViewHome.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\nvar View = /** @class */ (function () {\r\n    function View(parent) {\r\n        //Kontejner div\r\n        this.container = document.createElement(\"div\");\r\n        this.container.className = \"container\";\r\n        parent.appendChild(this.container);\r\n        //Default stranica\r\n        this.currentPage = \"Create\" /* Create */;\r\n        //Home\r\n        this.home = new _ViewHome__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.container);\r\n        //Character creator\r\n        this.creator = new _ViewCreator__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.container);\r\n        //Character cards\r\n    }\r\n    View.prototype.render = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (this.currentPage) {\r\n                    case \"Home\" /* Home */:\r\n                        this.home.render();\r\n                        break;\r\n                    case \"Create\" /* Create */:\r\n                        this.creator.render();\r\n                        break;\r\n                    default:\r\n                        break;\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    return View;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\r\n\n\n//# sourceURL=webpack:///./src/view/View.ts?");

/***/ }),

/***/ "./src/view/ViewCreator.ts":
/*!*********************************!*\
  !*** ./src/view/ViewCreator.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_Race__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Race */ \"./src/models/Race.ts\");\n/* harmony import */ var _models_CharacterDb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/CharacterDb */ \"./src/models/CharacterDb.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\nvar ViewCreator = /** @class */ (function () {\r\n    function ViewCreator(parent) {\r\n        var row = document.createElement(\"div\");\r\n        row.className = \"row\";\r\n        parent.appendChild(row);\r\n        this.container = document.createElement(\"div\");\r\n        this.container.className = \"d-flex flex-column\";\r\n        this.container.innerHTML = \"<h1>Loading...</h1>\";\r\n        row.appendChild(this.container);\r\n        this.racesPromise = Object(_models_Race__WEBPACK_IMPORTED_MODULE_0__[\"getRaces\"])();\r\n    }\r\n    ViewCreator.prototype.render = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var races, header, nameContainer, nameLabel, nameInput, raceContainer, raceLabel, raceInput, button;\r\n            var _this = this;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, this.racesPromise.catch(function (err) {\r\n                            return console.log(err.message);\r\n                        })];\r\n                    case 1:\r\n                        races = _a.sent();\r\n                        this.container.innerHTML = \"\";\r\n                        header = document.createElement(\"h3\");\r\n                        header.className = \"text-center\";\r\n                        header.innerHTML = \"Create character\";\r\n                        this.container.appendChild(header);\r\n                        nameContainer = document.createElement(\"div\");\r\n                        nameContainer.className = \"input-group mb-3\";\r\n                        this.container.appendChild(nameContainer);\r\n                        nameLabel = document.createElement(\"div\");\r\n                        nameLabel.className = \"input-group-prepend\";\r\n                        nameLabel.innerHTML = '<span class=\"input-group-text\">name</span>';\r\n                        nameContainer.appendChild(nameLabel);\r\n                        nameInput = document.createElement(\"input\");\r\n                        nameInput.placeholder = \"Character name\";\r\n                        nameInput.className = \"form-control\";\r\n                        nameContainer.appendChild(nameInput);\r\n                        raceContainer = document.createElement(\"div\");\r\n                        raceContainer.className = \"input-group mb-3\";\r\n                        this.container.appendChild(raceContainer);\r\n                        raceLabel = document.createElement(\"label\");\r\n                        raceLabel.className = \"input-group-prepend\";\r\n                        raceLabel.innerHTML =\r\n                            '<label class=\"input-group-text\" for=\"inputGroupSelect01\">race</label>';\r\n                        raceContainer.appendChild(raceLabel);\r\n                        raceInput = document.createElement(\"select\");\r\n                        raceInput.className = \"custom-select\";\r\n                        //@ts-ignore\r\n                        races.forEach(function (race) {\r\n                            var option = document.createElement(\"option\");\r\n                            option.text = race.name;\r\n                            option.value = race.id.toString();\r\n                            raceInput.add(option);\r\n                        });\r\n                        raceContainer.appendChild(raceInput);\r\n                        button = document.createElement(\"button\");\r\n                        button.className = \"btn btn-primary\";\r\n                        button.innerHTML = \"Submit\";\r\n                        button.onclick = function (ev) { return _this.handleSubmit(nameInput, raceInput); };\r\n                        this.container.appendChild(button);\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ViewCreator.prototype.handleSubmit = function (nameInput, raceInput) {\r\n        var character = {\r\n            name: nameInput.value,\r\n            raceId: parseInt(raceInput.value),\r\n            gold: 0,\r\n            armorId: 1,\r\n            weaponId: 1,\r\n        };\r\n        Object(_models_CharacterDb__WEBPACK_IMPORTED_MODULE_1__[\"createCharacter\"])(character).catch(function (err) {\r\n            return console.log(\"Error occured while inserting character in database\", err.message);\r\n        });\r\n    };\r\n    return ViewCreator;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewCreator);\r\n\n\n//# sourceURL=webpack:///./src/view/ViewCreator.ts?");

/***/ }),

/***/ "./src/view/ViewHome.ts":
/*!******************************!*\
  !*** ./src/view/ViewHome.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ViewHome = /** @class */ (function () {\r\n    function ViewHome(parent) {\r\n        this.container = document.createElement(\"div\");\r\n        this.container.className = \"card\";\r\n        parent.appendChild(this.container);\r\n    }\r\n    ViewHome.prototype.render = function () { };\r\n    return ViewHome;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ViewHome);\r\n\n\n//# sourceURL=webpack:///./src/view/ViewHome.ts?");

/***/ })

/******/ });