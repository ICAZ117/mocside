(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Labs_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store/index */ "./resources/js/Store/index.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var tabs = ["Labs", "Grades"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_3__.defineComponent)({
  props: ["courseID", "courseName"],
  emits: ["unmounting", "courseEdited"],
  name: "Course",
  data: function data() {
    return {
      labs: [],
      unfilteredLabs: [],
      childisOpen: false,
      labID: null,
      labName: null,
      authUser: null,
      fscID: null,
      progress: [],
      username: "",
      rightClickID: "",
      student: {},
      grades: {},
      problems: {},
      expandedProblem: null,
      sort: "0"
    };
  },
  setup: function setup() {
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_4__.useRoute)();
    var currentDirectory = (0,vue__WEBPACK_IMPORTED_MODULE_3__.computed)(function () {
      return route.path;
    });
    var state = (0,vue__WEBPACK_IMPORTED_MODULE_3__.reactive)({
      selectedTab: tabs[0]
    });
    return _objectSpread({
      currentDirectory: currentDirectory,
      tabs: tabs
    }, (0,vue__WEBPACK_IMPORTED_MODULE_3__.toRefs)(state));
  },
  methods: {
    isExpanded: function isExpanded(key) {
      // return this.expandedProblem.indexOf(key) !== -1;
      return this.expandedProblem == key;
    },
    toggleExpansion: function toggleExpansion(key) {
      // Close
      if (this.isExpanded(key)) {
        // this.expandedProblem.splice(this.expandedProblem.indexOf(key), 1);
        this.lang = "";
        this.expandedProblem = null;
      } // Open
      else {
          // this.expandedProblem.push(key);
          this.expandedProblem = key;
        }
    },
    getStudentObject: function getStudentObject() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(_this.authUser);
                _context.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/students/".concat(_this.authUser.fsc_user.fsc_id));

              case 3:
                res = _context.sent;
                _this.student = res.data;
                console.log(res.data);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getGrades: function getGrades() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var grades, labIDs, problemIDs, studentLabs, i, problemsInLab, problems, j, payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Initiallize local student gradebook
                grades = {
                  grade: 0,
                  labs: []
                }; // Create logging lists for payload later in method

                labIDs = [], problemIDs = []; // Get total grade for course

                grades.grade = JSON.parse(_this2.student.gradebook_courses).grades[_this2.courseID]; // Get all labs the student is in

                studentLabs = JSON.parse(_this2.student.gradebook_labs);
                console.log("BEFORE FOR LOOP");
                console.log(_this2.labs.length); // Loop over all of the labs in the current course

                i = 0;

              case 7:
                if (!(i < _this2.labs.length)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 10;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/gradebook/".concat(_this2.labs[i].id));

              case 10:
                problemsInLab = _context2.sent;
                problemsInLab = problemsInLab.data.data; // Log labID for later usage

                labIDs.push(_this2.labs[i].id); // Initialize problems list

                problems = []; // Loop over all problems within current lab

                for (j = 0; j < problemsInLab.problems.length; j++) {
                  // Fill problems list with objects containing problemID's and grades
                  problems.push({
                    problemID: problemsInLab.problems[j],
                    grade: problemsInLab.grades[problemsInLab.problems[j]]
                  }); // Log problemID for later usage

                  problemIDs.push(problemsInLab.problems[j]);
                } // Add the current lab to the local student gradebook


                grades.labs.push({
                  grade: studentLabs.grades[_this2.labs[i].id],
                  labID: _this2.labs[i].id,
                  name: _this2.labs[i].name,
                  numProblems: _this2.labs[i].num_problems,
                  percentComplete: _this2.labs[i].percent,
                  dueDate: _this2.labs[i].due_date,
                  total_points: _this2.labs[i].total_points,
                  problems: problems
                });

              case 16:
                i++;
                _context2.next = 7;
                break;

              case 19:
                // Set data value to local gradebook
                _this2.grades = grades; // Create payload to get total lab/problem values

                payload = {
                  problems: problemIDs,
                  labs: labIDs
                }; // Make API call and send payload to get said values

                _context2.next = 23;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/gradebook/worth/", payload);

              case 23:
                res = _context2.sent;
                // Save total point values into data object
                _this2.problems = res.data.data.problems;

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    showMenu: function showMenu(course_id) {
      if (this.isProf) {
        this.rightClickID = String(course_id);
        var menu = document.getElementById(this.rightClickID).childNodes[0];
        var outClick = document.getElementById("out-click");
        menu.style.top = "".concat(window.event.clientY, "px");
        menu.style.left = "".concat(window.event.clientX, "px");
        menu.classList.add("show");
        outClick.style.display = "block";
      }
    },
    closeMenu: function closeMenu() {
      try {
        document.getElementById(this.rightClickID).childNodes[0].classList.remove("show");
      } catch (e) {}

      document.getElementById("out-click").style.display = "none";
      this.rightClickID = "";
    },
    goToProblems: function goToProblems(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({
        name: "Problems",
        params: {
          lab_id: id
        }
      });
    },
    getLabs: function getLabs() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var rawLabs, prog, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/labs/".concat(_this3.courseID));

              case 2:
                rawLabs = _context3.sent;
                // this.labs = rawLabs.data.data;
                _this3.unfilteredLabs = rawLabs.data.data;
                _context3.next = 6;
                return _this3.getStudent();

              case 6:
                prog = _context3.sent;

                if (_this3.isProf) {
                  _context3.next = 19;
                  break;
                }

                i = 0;

              case 9:
                if (!(i < _this3.unfilteredLabs.length)) {
                  _context3.next = 19;
                  break;
                }

                _context3.next = 12;
                return _this3.getPercent(_this3.unfilteredLabs[i]);

              case 12:
                _this3.unfilteredLabs[i]["percent"] = _context3.sent;
                _context3.next = 15;
                return _this3.getActivity(_this3.unfilteredLabs[i]);

              case 15:
                _this3.unfilteredLabs[i]["activity"] = _context3.sent;

              case 16:
                i++;
                _context3.next = 9;
                break;

              case 19:
                console.log("get labs");
                _context3.next = 22;
                return _this3.sortLabs();

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    Unmounting: function Unmounting() {
      this.childisOpen = false;
      this.labID = null;
      this.labName = null;
      var flag = this.refreshPage();
      console.log("unmounting the problems page");
      console.log(flag);

      if (flag) {
        this.$router.push({
          name: "Labs",
          params: {
            course_id: this.courseID
          }
        });
      }
    },
    labEdited: function labEdited() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var lab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ///update the list of courses
                _this4.labs = _this4.labs.filter(function (l) {
                  return l.id != _this4.labID;
                });
                _context4.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/labs/full/".concat(_this4.labID));

              case 3:
                lab = _context4.sent;

                _this4.labs.push(lab.data.data);

                _this4.Unmounting();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    addLab: function addLab() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var payload, lab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                payload = {
                  name: "New Lab",
                  description: "New Lab",
                  course_id: _this5.courseID,
                  due_date: "2021-06-03"
                };
                _context5.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/labs/", payload);

              case 3:
                lab = _context5.sent;

                _this5.labs.push(lab.data.data);

                _this5.unfilteredLabs.push(lab.data.data);

                _this5.sortLabs();

                console.log(lab.data.data);
                _this5.labID = lab.data.data.id;
                _this5.labName = lab.data.data.name;
                console.log(_this5.labID);
                _this5.childisOpen = true;

                _this5.$router.push({
                  name: "EditLab",
                  params: {
                    lab_id: _this5.labID
                  }
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    editLab: function editLab(id, name) {
      this.childisOpen = true;
      this.labID = id;
      this.labName = name;
      this.$router.push({
        name: "EditLab",
        params: {
          lab_id: this.labID
        }
      });
    },
    removeLab: function removeLab(lab, key) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var flag, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                flag = confirm("Are you Sure you want to remove " + lab.name + " from this Course?");

                if (!flag) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.delete("/labs/".concat(lab));

              case 4:
                res = _context6.sent;
                //filter from labs
                _this6.labs = _this6.labs.filter(function (l, i) {
                  return i != key;
                }); //filter from unfiltered labs

                _this6.unfilteredLabs = _this6.unfilteredLabs.filter(function (l) {
                  return l.id != lab.id;
                });

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getStudent: function getStudent() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this7.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];
                _this7.fscID = _this7.authUser.fsc_user.fsc_id;

                if (_this7.isProf) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/progress/".concat(_this7.fscID));

              case 5:
                res = _context7.sent;
                _this7.progress = res.data.data;
                return _context7.abrupt("return", _this7.progress);

              case 8:
                return _context7.abrupt("return", {});

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    getPercent: function getPercent(lab) {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var d, c, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                d = JSON.parse(_this8.progress.labs);
                i = 0;

              case 2:
                if (!(i < d.length)) {
                  _context8.next = 9;
                  break;
                }

                if (!(d[i].lab_id == lab.id)) {
                  _context8.next = 6;
                  break;
                }

                c = d[i];
                return _context8.abrupt("break", 9);

              case 6:
                i++;
                _context8.next = 2;
                break;

              case 9:
                if (!(lab.numProblems == 0)) {
                  _context8.next = 13;
                  break;
                }

                return _context8.abrupt("return", "0%");

              case 13:
                if (c) {
                  _context8.next = 17;
                  break;
                }

                return _context8.abrupt("return", "0%");

              case 17:
                return _context8.abrupt("return", parseInt(c.num_completed / lab.num_problems * 100) + "%");

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    getActivity: function getActivity(lab) {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var d, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                d = JSON.parse(_this9.progress.labs);
                i = 0;

              case 2:
                if (!(i < d.length)) {
                  _context9.next = 8;
                  break;
                }

                if (!(d[i].lab_id == lab.id)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return", d[i].last_progress);

              case 5:
                i++;
                _context9.next = 2;
                break;

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    routeToChild: function routeToChild() {
      var r = window.location.pathname;
      var sub = "/courses/" + this.courseID + "/labs";
      var c = r.substring(sub.length);

      if (c == "") {
        console.log("just on the labs page");
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var lID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else

        var name = "";

        for (var i = 0; i < this.labs.length; i++) {
          if (this.labs[i].id == lID) {
            name = this.labs[i].name;
            break;
          }
        }

        if (path == "problems") {
          this.goToProblems(lID, name);
        } else if (path == "edit") {
          this.editLab(lID, name);
        } else {
          console.log(path);
        }
      }
    },
    filterByPublish: function filterByPublish() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
        var i, _i;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log("filter by publish"); //grabs only the courses that are currently in session
                //empty the courses list just in case

                _this10.labs = [];

                if (!_this10.isProf) {
                  console.log("student"); //is student don't show unpublished

                  for (i = 0; i < _this10.unfilteredLabs.length; i++) {
                    console.log("\n\n\n\n" + i);

                    if (_this10.published(_this10.unfilteredLabs[i])) {
                      console.log("Lab is published. Checking if it has problems...");

                      if (_this10.unfilteredLabs[i].num_problems > 0) {
                        console.log("Lab does have problems"); //if within date && at least 1 problem

                        _this10.labs.push(_this10.unfilteredLabs[i]);
                      }
                    }
                  }
                } else {
                  console.log("professor"); //grab all labs including unpublished

                  for (_i = 0; _i < _this10.unfilteredLabs.length; _i++) {
                    _this10.labs.push(_this10.unfilteredLabs[_i]);
                  }
                }

                return _context10.abrupt("return", "Hi");

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    published: function published(lab) {
      //return true if the lab is published
      //false otherwise
      var now = new Date(Date.now());

      if (lab.publish_date == "" || lab.publish_date == null) {
        return false;
      }

      var pd = lab.publish_date.split("-")[2];
      var pm = lab.publish_date.split("-")[1] - 1;
      var py = lab.publish_date.split("-")[0];
      var published = new Date(py, pm, pd, 0, 0, 0, 0);

      if (published < now) {
        return true;
      }

      return false;
    },
    sortLabs: function sortLabs() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee11() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(_this11.sort == 0)) {
                  _context11.next = 5;
                  break;
                }

                _context11.next = 3;
                return _this11.sortByDueDate();

              case 3:
                _context11.next = 12;
                break;

              case 5:
                if (!(_this11.sort == 1)) {
                  _context11.next = 10;
                  break;
                }

                _context11.next = 8;
                return _this11.sortByName();

              case 8:
                _context11.next = 12;
                break;

              case 10:
                _context11.next = 12;
                return _this11.sortByID();

              case 12:
                console.log(_this11.unfilteredLabs); //call the filter after sorting

                _context11.next = 15;
                return _this11.filterByPublish();

              case 15:
                return _context11.abrupt("return", "");

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    sortByDueDate: function sortByDueDate() {
      var _this12 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee12() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                //sorts the unfiltered results by start date
                _this12.unfilteredLabs.sort(function (a, b) {
                  //if a should be first return -1, 0 for tie, -1 if b first
                  var la = a.due_date.split("-");
                  var lb = b.due_date.split("-");
                  var fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
                  var fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);

                  if (fa < fb) {
                    return -1;
                  }

                  if (fa > fb) {
                    return 1;
                  }

                  return 0;
                });

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    sortByName: function sortByName() {
      var _this13 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee13() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                //sorts the unfiltered results by the lab name
                _this13.unfilteredLabs.sort(function (a, b) {
                  var fa = a.name.toLowerCase();
                  var fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return -1;
                  }

                  if (fa > fb) {
                    return 1;
                  }

                  return 0;
                });

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    sortByID: function sortByID() {
      var _this14 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee14() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                //sorts the unfiltered results by ID of the lab
                //default
                _this14.unfilteredLabs.sort(function (a, b) {
                  return a.id - b.id;
                });

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    refreshPage: function refreshPage() {
      var r = window.location.pathname;
      var sub = "/courses";
      var c = r.substring(sub.length);
      console.log(c);

      if (c == "") {
        console.log("just on the courses page");
        return false; //don't allow the page to refresh to stop it from overriding the courses nav button push
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var cID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else

        return true;
      }
    }
  },
  computed: {
    isProf: function isProf() {
      if (_Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/isProf"] == null) {
        return false;
      } else {
        return _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/isProf"];
      }
    }
  },
  mounted: function mounted() {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee15() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              console.log("Mounted");

            case 1:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  },
  beforeMount: function beforeMount() {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee16() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              console.log("Before Mount");
              _this15.childisOpen = false;
              _context16.next = 4;
              return _this15.getLabs();

            case 4:
              _context16.next = 6;
              return _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];

            case 6:
              _this15.authUser = _context16.sent;
              _this15.username = _this15.authUser.username;

              _this15.routeToChild();

              if (_this15.isProf) {
                _context16.next = 14;
                break;
              }

              _context16.next = 12;
              return _this15.getStudentObject();

            case 12:
              _context16.next = 14;
              return _this15.getGrades();

            case 14:
              console.log("HELLO");

            case 15:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  beforeUnmount: function beforeUnmount() {
    //labs
    this.$emit("unmounting");
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 0
};
var _hoisted_2 = {
  "class": "courses header"
};
var _hoisted_3 = {
  "class": "heading"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_5 = {
  "class": "navigation"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "sort"
}, "Sort By: ", -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "0"
}, "Due Date", -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "1"
}, "Name", -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "2"
}, "Unsorted", -1
/* HOISTED */
);

var _hoisted_14 = {
  style: {
    "border": "1px solid #9e9e9e !important",
    "padding": "0 !important",
    "width": "min-content !important",
    "margin": "2rem 2rem 2rem 2rem !important"
  }
};
var _hoisted_15 = {
  "class": "table labtable",
  style: {
    "margin": "0 !important"
  }
};
var _hoisted_16 = {
  "class": "labtable"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Title", -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Problems", -1
/* HOISTED */
);

var _hoisted_19 = {
  key: 0
};

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Due Date", -1
/* HOISTED */
);

var _hoisted_21 = {
  key: 1
};
var _hoisted_22 = {
  key: 0
};
var _hoisted_23 = {
  key: 1
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", {
  colspan: "5"
}, "Add Lab", -1
/* HOISTED */
);

var _hoisted_25 = {
  style: {
    "border": "1px solid #9e9e9e !important",
    "padding": "0 !important",
    "width": "min-content !important",
    "margin": "2rem 2rem 2rem 2rem !important"
  }
};
var _hoisted_26 = {
  "class": "table problemtable",
  style: {
    "margin": "0 !important"
  }
};

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", {
  "class": "problemtable",
  style: {
    "border": "none !important"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-grin-alt spacer"
})]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Lab Name"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Problems"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "% Complete"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Due Date"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Points Earned"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Points Possible"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Grade Percentage")])], -1
/* HOISTED */
);

var _hoisted_28 = {
  key: 0
};

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-chevron-right"
}, null, -1
/* HOISTED */
);

var _hoisted_30 = {
  key: 1
};

var _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-chevron-down"
}, null, -1
/* HOISTED */
);

var _hoisted_32 = {
  key: 0
};
var _hoisted_33 = {
  "class": "description-data",
  colspan: "8"
};
var _hoisted_34 = {
  style: {
    "border": "1px solid #9e9e9e !important",
    "border-right": "none !important",
    "padding": "0 !important",
    "margin": "0 0 0rem 1rem !important"
  }
};
var _hoisted_35 = {
  "class": "table",
  style: {
    "margin": "0",
    "width": "-webkit-fill-available"
  }
};

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", {
  "class": "labtable"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Title"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Test Cases"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Test Cases Passed"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Due Date"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Points Earned"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Points Possible"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Grade Percentage")])], -1
/* HOISTED */
);

var _hoisted_37 = {
  style: {
    "border-bottom": "0 !important"
  }
};
var _hoisted_38 = {
  key: 2
};
var _hoisted_39 = {
  id: "menu"
};
var _hoisted_40 = {
  "class": "menu-item"
};
var _hoisted_41 = {
  "class": "menu-item"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_tab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab");

  var _component_tabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tabs");

  var _component_tab_panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panel");

  var _component_tab_panels = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panels");

  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [!_ctx.childisOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Page"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.courseName), 1
  /* TEXT */
  ), _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tabs, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.selectedTab = $event;
    })
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.tabs, function (tab, i) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_tab, {
          "class": "tab",
          key: "t".concat(i),
          val: tab,
          label: tab,
          indicator: true
        }, null, 8
        /* PROPS */
        , ["val", "label"]);
      }), 128
      /* KEYED_FRAGMENT */
      ))];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.username) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentDirectory), 1
  /* TEXT */
  ), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    "class": "pointer underline",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _this.$emit('unmounting');
    })
  }, "↩ Return to Courses")]), _hoisted_7, _hoisted_8, _hoisted_9, _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
    id: "sort",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.sort = $event;
    }),
    onChange: _cache[4] || (_cache[4] = function () {
      return _ctx.sortLabs && _ctx.sortLabs.apply(_ctx, arguments);
    })
  }, [_hoisted_11, _hoisted_12, _hoisted_13], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.sort]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panels, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.selectedTab = $event;
    }),
    animate: true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Labs'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [_hoisted_17, _hoisted_18, !_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("th", _hoisted_19, "% Complete")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_20, !_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("th", _hoisted_21, "Last Activity")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.labs, function (lab) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: lab.id
            }, [!_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
              key: 0,
              "class": "lab pointer",
              onClick: function onClick($event) {
                return _ctx.goToProblems(lab.id, lab.name);
              }
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.name), 1
            /* TEXT */
            )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.num_problems), 1
            /* TEXT */
            ), !_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.percent), 1
            /* TEXT */
            )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>69%</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.due_date), 1
            /* TEXT */
            ), !_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.activity), 1
            /* TEXT */
            )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>4/20/0420</td> ")], 8
            /* PROPS */
            , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
              key: 1,
              "class": "lab pointer",
              onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
                return _ctx.goToProblems(lab.id, lab.name);
              }, ["prevent"]),
              onContextmenu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
                return _ctx.showMenu(lab.id);
              }, ["prevent"])
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.name), 1
            /* TEXT */
            )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.num_problems), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>69%</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.due_date), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>4/20/0420</td> ")], 40
            /* PROPS, HYDRATE_EVENTS */
            , ["onClick", "onContextmenu"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
            /* STABLE_FRAGMENT */
            );
          }), 128
          /* KEYED_FRAGMENT */
          )), _ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
            key: 0,
            "class": "lab pointer",
            onClick: _cache[5] || (_cache[5] = function () {
              return _ctx.addLab && _ctx.addLab.apply(_ctx, arguments);
            })
          }, [_hoisted_24])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <tr\n            class=\"lab\"\n            style=\"cursor: pointer\"\n          >\n            <td><a>Lab 2: Printing & I/O</a></td>\n            <td>5</td>\n            <td>100%</td>\n            <td>1/31/2021</td>\n            <td>1/31/2021</td>\n          </tr> ")])])])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Grades'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_26, [_hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loop over all LABS "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.grades.labs, function (lab, index) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: index
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Regular table row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", {
              "class": "problem pointer",
              onClick: function onClick($event) {
                return _ctx.toggleExpansion(lab.labID);
              }
            }, [!_ctx.isExpanded(lab.labID) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_28, [_hoisted_29])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isExpanded(lab.labID) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_30, [_hoisted_31])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.name), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.numProblems), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.percentComplete), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.dueDate), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.grade == undefined ? "--" : lab.grade), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.total_points), 1
            /* TEXT */
            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.total_points == 0 ? 0 : lab.grade == undefined ? 0 : parseInt(lab.grade / lab.total_points * 10000) * 0.01) + "% ", 1
            /* TEXT */
            )], 8
            /* PROPS */
            , ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dropdown table row "), _ctx.isExpanded(lab.labID) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_35, [_hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.grades.labs[index].problems, function (problem, key) {
              return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
                key: key,
                "class": "lab pointer"
              }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].name), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].test_cases), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].passed), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].due_date), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.grade), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].worth), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.problems[problem.problemID].worth == 0 ? 0 : problem.grade == undefined ? 0 : parseInt(problem.grade / _ctx.problems[problem.problemID].worth * 10000) * 0.01) + "% ", 1
              /* TEXT */
              )]);
            }), 128
            /* KEYED_FRAGMENT */
            ))])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
            /* STABLE_FRAGMENT */
            );
          }), 128
          /* KEYED_FRAGMENT */
          ))])])])];
        }),
        _: 1
        /* STABLE */

      })];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.childisOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_view, {
    key: 1,
    onUnmounting: _cache[7] || (_cache[7] = function ($event) {
      return _ctx.Unmounting();
    }),
    onLabEdited: _cache[8] || (_cache[8] = function ($event) {
      return _ctx.labEdited();
    }),
    labID: _ctx.labID,
    labName: _ctx.labName
  }, null, 8
  /* PROPS */
  , ["labID", "labName"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !_ctx.childisOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.labs, function (lab, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      key: lab.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      id: lab.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("ul", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_40, [_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 0,
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return _ctx.editLab(lab.id, lab.name);
      }
    }, "Edit", 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_41, [_ctx.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 0,
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return _ctx.removeLab(lab.id, key);
      }
    }, "Delete", 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 8
    /* PROPS */
    , ["id"])]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
    id: "out-click",
    onClick: _cache[9] || (_cache[9] = function () {
      return _ctx.closeMenu && _ctx.closeMenu.apply(_ctx, arguments);
    })
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Labs.vue":
/*!*************************************!*\
  !*** ./resources/js/Pages/Labs.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Labs.vue?vue&type=template&id=135154af */ "./resources/js/Pages/Labs.vue?vue&type=template&id=135154af");
/* harmony import */ var _Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Labs.vue?vue&type=script&lang=js */ "./resources/js/Pages/Labs.vue?vue&type=script&lang=js");



_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Labs.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Labs.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./resources/js/Pages/Labs.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Labs.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Labs.vue?vue&type=template&id=135154af":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Labs.vue?vue&type=template&id=135154af ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Labs_vue_vue_type_template_id_135154af__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Labs.vue?vue&type=template&id=135154af */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Labs.vue?vue&type=template&id=135154af");


/***/ })

}]);