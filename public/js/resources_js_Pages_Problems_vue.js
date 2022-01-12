(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Problems_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["labID", "labName"],
  emits: ["unmounting", "labEdited"],
  data: function data() {
    return {
      problems: [],
      unfilteredProblems: [],
      childIsOpen: false,
      problemID: null,
      expandedProblem: null,
      lang: "",
      progress: [],
      authUser: null,
      fscID: null,
      deletedMe: false,
      username: "",
      sort: "1",
      showDeleteModal: false,
      reloadDeleteModal: 0,
      deletingProblem: {
        id: "",
        problem: {},
        key: ""
      }
    };
  },
  setup: function setup() {
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_4__.useRoute)();
    var currentDirectory = (0,vue__WEBPACK_IMPORTED_MODULE_3__.computed)(function () {
      return route.path;
    });
    return {
      currentDirectory: currentDirectory
    };
  },
  methods: {
    convertDate: function convertDate(numericalDate) {
      // Input: 2021-06-04
      // Output: Jun 4
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var dateList = numericalDate.split("-");
      console.log("\n\n\n");
      console.log(dateList);
      var month = months[Number(dateList[1]) - 1];
      var day = Number(dateList[2].split(" ")[0]);
      console.log(day);
      return month + " " + day;
    },
    addProblem: function addProblem() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var date, month, day, year, ymd, payload, problem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                date.setDate(date.getDate() + 7);
                month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                ymd = [year, month, day].join('-');
                payload = {
                  name: "New Problem",
                  description: JSON.stringify({
                    ops: [{
                      insert: "New Problem"
                    }]
                  }),
                  lab_id: _this.labID,
                  due_date: ymd + " 23:59:59",
                  copy_id: _this.labID,
                  java_starter: "public class Main{\n\tpublic static void main(String[] args){\n\t\t\n\t}\n}",
                  python_starter: 'def main():\n\t// Your code here\n\n\nif __name__ == "__main__":\n\tmain()'
                };
                _context.next = 9;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.post("/problems", payload);

              case 9:
                problem = _context.sent;
                _this.problemID = problem.data.data.id;

                _this.problems.push(problem.data.data);

                _this.childIsOpen = true;

                _this.$router.push({
                  name: "EditAssignment",
                  params: {
                    problem_id: _this.problemID
                  }
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    editProblem: function editProblem(id) {
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({
        name: "EditAssignment",
        params: {
          problem_id: this.problemID
        }
      });
    },
    closeDeleting: function closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting: function deleting(id, problem, key) {
      this.showDeleteModal = true;
      this.deletingProblem.id = id;
      this.deletingProblem.problem = problem;
      this.deletingProblem.key = key;
    },
    deleteProblem: function deleteProblem() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var id, problem, key, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("deleting problem");
                id = _this2.deletingProblem.id;
                problem = _this2.deletingProblem.problem;
                key = _this2.deletingProblem.key; // remove this problem from the current lab

                _context2.next = 6;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.delete("/problems/".concat(problem.id));

              case 6:
                res = _context2.sent;
                //filter the problems list
                _this2.problems = _this2.problems.filter(function (p, i) {
                  return i != key;
                }); //remove from the unfiltered list

                _this2.unfilteredProblems = _this2.unfilteredProblems.filter(function (p, i) {
                  return i != key;
                });

                _this2.closeDeleting();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    deleteMe: function deleteMe(id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("deleteMe " + id); //set variable to be used when problemEdited event is called

                _this3.deletedMe = true;

                _this3.$router.push({
                  name: "Problems",
                  params: {
                    lab_id: _this3.labID
                  }
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    goToProblem: function goToProblem(id) {
      console.log("go to problem");
      this.childIsOpen = true;
      this.problemID = id;
      this.$router.push({
        name: "Assignment",
        params: {
          problem_id: id
        }
      });
    },
    getProblems: function getProblems() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var rawProblems, prog, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                console.log("gotToProblem");
                _context4.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/".concat(_this4.labID));

              case 4:
                rawProblems = _context4.sent;
                // this.problems = rawProblems.data.data;
                _this4.unfilteredProblems = rawProblems.data.data;
                _context4.next = 8;
                return _this4.getStudent();

              case 8:
                prog = _context4.sent;
                _context4.next = 13;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);

              case 13:
                if (_this4.isProf) {
                  _context4.next = 25;
                  break;
                }

                i = 0;

              case 15:
                if (!(i < _this4.unfilteredProblems.length)) {
                  _context4.next = 25;
                  break;
                }

                _context4.next = 18;
                return _this4.getPercent(_this4.unfilteredProblems[i]);

              case 18:
                _this4.unfilteredProblems[i]["percent"] = _context4.sent;
                _context4.next = 21;
                return _this4.getActivity(_this4.unfilteredProblems[i]);

              case 21:
                _this4.unfilteredProblems[i]["activity"] = _context4.sent;

              case 22:
                i++;
                _context4.next = 15;
                break;

              case 25:
                _context4.next = 27;
                return _this4.sortProblems();

              case 27:
                _context4.next = 29;
                return _this4.getColors();

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }))();
    },
    getStudent: function getStudent() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];
                _this5.fscID = _this5.authUser.fsc_user.fsc_id;
                _context5.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/progress/".concat(_this5.fscID));

              case 4:
                res = _context5.sent;
                _this5.progress = res.data.data;
                return _context5.abrupt("return", _this5.progress);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    getPercent: function getPercent(problem) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var d, c, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log("in percent");
                d = JSON.parse(_this6.progress.assignments);
                console.log(d);
                i = 0;

              case 4:
                if (!(i < d.length)) {
                  _context6.next = 11;
                  break;
                }

                if (!(d[i].assignment_id == problem.id)) {
                  _context6.next = 8;
                  break;
                }

                c = d[i];
                return _context6.abrupt("break", 11);

              case 8:
                i++;
                _context6.next = 4;
                break;

              case 11:
                console.log(c);

                if (!(problem.test_cases == 0)) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("return", "0%");

              case 16:
                if (c) {
                  _context6.next = 20;
                  break;
                }

                return _context6.abrupt("return", "0%");

              case 20:
                console.log(parseInt(c.cases_passed / problem.test_cases * 100) + "%");
                return _context6.abrupt("return", parseInt(c.cases_passed / problem.test_cases * 100) + "%");

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getActivity: function getActivity(problem) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var d, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                d = JSON.parse(_this7.progress.assignments);
                i = 0;

              case 2:
                if (!(i < d.length)) {
                  _context7.next = 8;
                  break;
                }

                if (!(d[i].assignment_id == problem.id)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", d[i].last_progress);

              case 5:
                i++;
                _context7.next = 2;
                break;

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    getColors: function getColors() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var i, element;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                for (i = 0; i < _this8.unfilteredProblems.length; i++) {
                  console.log(_this8.unfilteredProblems[i].id + " " + _this8.unfilteredProblems[i]["percent"]);

                  if (_this8.unfilteredProblems[i]["percent"] == "100%") {
                    //green background
                    console.log("green background");
                    element = document.getElementById("p" + _this8.unfilteredProblems[i].id);
                    console.log("element: ");
                    console.log(element);
                    element != null ? element.classList.add("complete") : console.log("element is null");
                  } else if (_this8.unfilteredProblems[i]["percent"] != "0%") {
                    //red background
                    console.log("red background");
                    element = document.getElementById("p" + _this8.unfilteredProblems[i].id);
                    element != null ? element.classList.add("incomplete") : console.log("element is null");
                  } else {
                    //standard background
                    console.log("blank color background");
                  }
                }

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    problemEdited: function problemEdited() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var tempID, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                tempID = _this9.problemID; //check if the problem was deleted from child

                if (!_this9.deletedMe) {
                  _context9.next = 7;
                  break;
                }

                console.log("inside the problem edited deletedMe"); //child deleted button was pressed
                // remove this problem from the current lab

                _context9.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.delete("/problems/".concat(tempID));

              case 5:
                res = _context9.sent;
                //filter the problems list
                _this9.problems = _this9.problems.filter(function (p) {
                  return p.id != tempID;
                });

              case 7:
                _context9.next = 9;
                return _this9.getColors();

              case 9:
                _context9.next = 11;
                return _this9.Unmounting();

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    Unmounting: function Unmounting() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
        var problem, res, flag;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this10.unfilteredProblems = _this10.unfilteredProblems.filter(function (p) {
                  return p.id != _this10.problemID;
                }); // check if problem is deleted if not then add back in

                if (_this10.deletedMe) {
                  _context10.next = 12;
                  break;
                }

                _context10.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/full/".concat(_this10.problemID));

              case 4:
                problem = _context10.sent;
                _context10.next = 7;
                return _this10.getPercent(problem.data.data);

              case 7:
                problem.data.data["percent"] = _context10.sent;
                _context10.next = 10;
                return _this10.getActivity(problem.data.data);

              case 10:
                problem.data.data["activity"] = _context10.sent;

                _this10.unfilteredProblems.push(problem.data.data);

              case 12:
                _context10.next = 14;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/progress/".concat(_this10.fscID));

              case 14:
                res = _context10.sent;
                _this10.progress = res.data.data; //set expanded problem to null

                _this10.expandedProblem = null; //recall sort method

                _context10.next = 19;
                return _this10.sortProblems();

              case 19:
                _this10.childIsOpen = false;
                _this10.problemID = null;
                flag = _this10.refreshPage();
                console.log("unmounting workspace page");
                console.log(flag);

                if (flag) {
                  _this10.$router.push({
                    name: "Problems",
                    params: {
                      lab_id: _this10.labID
                    }
                  });
                }

                _context10.next = 27;
                return _this10.getColors();

              case 27:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
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
    filterByPublish: function filterByPublish() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee11() {
        var i, _i;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log("filter by publish"); //grabs only the courses that are currently in session
                //empty the courses list just in case

                _this11.problems = [];

                if (!_this11.isProf) {
                  console.log("student"); //is student don't show unpublished

                  for (i = 0; i < _this11.unfilteredProblems.length; i++) {
                    if (_this11.unfilteredProblems[i].isPublished) {
                      if (_this11.unfilteredProblems[i].test_cases > 0) {
                        //if within date && at least 1 test case
                        _this11.problems.push(_this11.unfilteredProblems[i]);
                      }
                    }
                  }
                } else {
                  console.log("professor"); //grab all labs including unpublished

                  for (_i = 0; _i < _this11.unfilteredProblems.length; _i++) {
                    _this11.problems.push(_this11.unfilteredProblems[_i]);
                  }
                }

                return _context11.abrupt("return", "Hi");

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    sortProblems: function sortProblems() {
      var _this12 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee12() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(_this12.sort == 0)) {
                  _context12.next = 5;
                  break;
                }

                _context12.next = 3;
                return _this12.sortByDueDate();

              case 3:
                _context12.next = 12;
                break;

              case 5:
                if (!(_this12.sort == 1)) {
                  _context12.next = 10;
                  break;
                }

                _context12.next = 8;
                return _this12.sortByName();

              case 8:
                _context12.next = 12;
                break;

              case 10:
                _context12.next = 12;
                return _this12.sortByID();

              case 12:
                _context12.next = 14;
                return _this12.filterByPublish();

              case 14:
                return _context12.abrupt("return", "");

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    sortByDueDate: function sortByDueDate() {
      var _this13 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee13() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                //sorts the unfiltered results by start date
                _this13.unfilteredProblems.sort(function (a, b) {
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
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    sortByName: function sortByName() {
      var _this14 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee14() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                //sorts the unfiltered results by the problem name
                _this14.unfilteredProblems.sort(function (a, b) {
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
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    sortByID: function sortByID() {
      var _this15 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee15() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                //sorts the unfiltered results by id of the problem
                _this15.unfilteredProblems.sort(function (a, b) {
                  return a.id - b.id;
                });

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }))();
    },
    refreshPage: function refreshPage() {
      var r = window.location.pathname;
      var sub = "/courses";
      var c = r.substring(sub.length);

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
  watch: {
    showDeleteModal: function showDeleteModal() {
      if (!this.showDeleteModal) {
        this.reloadDeleteModal++;
      }
    }
  },
  beforeMount: function beforeMount() {
    var _this16 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee16() {
      var i;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              console.log("BeforeMount");
              _this16.childIsOpen = false;
              _context16.next = 4;
              return _this16.getProblems().then(_this16.getColors());

            case 4:
              console.log("\n\nBefore date convert");
              console.log(_this16.problems);
              i = 0;

            case 7:
              if (!(i < _this16.problems.length)) {
                _context16.next = 14;
                break;
              }

              _context16.next = 10;
              return _this16.convertDate(_this16.problems[i].due_date);

            case 10:
              _this16.problems[i].due_date = _context16.sent;

            case 11:
              i++;
              _context16.next = 7;
              break;

            case 14:
              console.log("\n\nAfter date convert");
              console.log(_this16.problems);

            case 16:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  },
  beforeUnmount: function beforeUnmount() {
    console.log("BeforeUnmount"); //problems

    this.$emit("unmounting");
  },
  mounted: function mounted() {
    var _this17 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee17() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              console.log("Mounted");
              _context17.next = 3;
              return _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];

            case 3:
              _this17.authUser = _context17.sent;
              _this17.username = _this17.authUser.username;
              _context17.next = 7;
              return _this17.getColors();

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=template&id=54794346":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=template&id=54794346 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "delete Course"
};
var _hoisted_2 = {
  "class": "delete-buttons"
};
var _hoisted_3 = {
  "class": "courses header"
};
var _hoisted_4 = {
  "class": "heading"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_6 = {
  "class": "navigation"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "sort"
}, "Sort By: ", -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "0"
}, "Due Date", -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "1"
}, "Name", -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "2"
}, "Unsorted", -1
/* HOISTED */
);

var _hoisted_15 = {
  style: {
    "border": "1px solid #9e9e9e !important",
    "padding": "0 !important",
    "width": "min-content !important",
    "margin": "4rem 2rem 2rem 2rem !important"
  }
};
var _hoisted_16 = {
  "class": "table problemtable",
  style: {
    "margin": "0 !important"
  }
};
var _hoisted_17 = {
  "class": "problemtable"
};

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-grin-alt spacer"
})], -1
/* HOISTED */
);

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Title", -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "# Test Cases", -1
/* HOISTED */
);

var _hoisted_21 = {
  key: 0
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Due Date", -1
/* HOISTED */
);

var _hoisted_23 = {
  key: 1
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-chevron-right"
}, null, -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-chevron-down"
}, null, -1
/* HOISTED */
);

var _hoisted_26 = {
  key: 0
};
var _hoisted_27 = {
  key: 1
};
var _hoisted_28 = {
  "class": "description-data"
};
var _hoisted_29 = {
  colspan: "5",
  "class": "description-data"
};
var _hoisted_30 = {
  "class": "problem-description"
};
var _hoisted_31 = {
  "class": "row"
};
var _hoisted_32 = {
  "class": "col-11"
};
var _hoisted_33 = {
  "class": "right col-1"
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-edit"
}, null, -1
/* HOISTED */
);

var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("i", {
  "class": "fas fa-trash-alt"
}, null, -1
/* HOISTED */
);

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_39 = {
  style: {
    "width": "50% !important"
  }
};
var _hoisted_40 = {
  "class": "row"
};
var _hoisted_41 = {
  "class": "col-9"
};

var _hoisted_42 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "",
  selected: "",
  disabled: "",
  hidden: ""
}, " Select a language... ", -1
/* HOISTED */
);

var _hoisted_43 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Java"
}, "Java", -1
/* HOISTED */
);

var _hoisted_44 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Python"
}, "Python", -1
/* HOISTED */
);

var _hoisted_45 = {
  "class": "col-3 ml-1"
};

var _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", {
  colspan: "5"
}, "Add Problem", -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_vue_final_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-final-modal");

  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Problems Page"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
    modelValue: $data.showDeleteModal,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.showDeleteModal = $event;
    }),
    classes: "modal-container",
    "content-class": "modal-content delete-modal",
    "esc-to-close": true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "modal-close",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.closeDeleting();
        })
      }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, " Are you sure you would like to delete " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.deletingProblem.problem.name) + " from this Lab ", 1
      /* TEXT */
      ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.closeDeleting();
        })
      }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $options.deleteProblem();
        })
      }, " Delete ")])])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.labName), 1
  /* TEXT */
  ), _hoisted_5])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.username) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentDirectory), 1
  /* TEXT */
  ), _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    "class": "pointer underline",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return _this.$emit('unmounting');
    })
  }, "↩ Return to Labs")]), _hoisted_8, _hoisted_9, _hoisted_10, _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
    id: "sort",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.sort = $event;
    }),
    onChange: _cache[7] || (_cache[7] = function () {
      return $options.sortProblems && $options.sortProblems.apply($options, arguments);
    })
  }, [_hoisted_12, _hoisted_13, _hoisted_14], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sort]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [_hoisted_18, _hoisted_19, _hoisted_20, !$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("th", _hoisted_21, "% Successful")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_22, !$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("th", _hoisted_23, "Last Activity")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.problems, function (problem, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: problem.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", {
      "class": "problem pointer",
      id: 'p' + problem.id,
      onClick: function onClick($event) {
        return $options.toggleExpansion(problem.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [_hoisted_24], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.isExpanded(problem.id)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [_hoisted_25], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isExpanded(problem.id)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.name), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.test_cases), 1
    /* TEXT */
    ), !$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.percent), 1
    /* TEXT */
    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.due_date.split(" ")[0]) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.due_date.split(" ")[1]), 1
    /* TEXT */
    ), !$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("td", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.activity), 1
    /* TEXT */
    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8
    /* PROPS */
    , ["id", "onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.name), 1
    /* TEXT */
    )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_33, [$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 0,
      onClick: function onClick($event) {
        return $options.editProblem(problem.id);
      },
      "class": "courselaunch text-danger mx-2 my-1 no-decor pointer"
    }, [_hoisted_34], 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h5>•••</h5> "), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("a", {
      key: 1,
      onClick: function onClick($event) {
        return $options.deleting(problem.id, problem, key);
      },
      "class": "courselaunch text-danger mx-2 my-1 no-decor pointer"
    }, [_hoisted_35], 8
    /* PROPS */
    , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h5>×</h5> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" get text from .description object "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ problem.description }} "), _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Due Date: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.due_date.split(" ")[0]) + " ", 1
    /* TEXT */
    ), _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Test Cases: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(problem.test_cases) + " ", 1
    /* TEXT */
    ), _hoisted_38]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
      "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
        return $data.lang = $event;
      }),
      id: "lang",
      "class": "form-select"
    }, [_hoisted_42, _hoisted_43, _hoisted_44], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.lang]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
      type: "launch",
      name: "launch",
      "class": "launch-workspace btn btn-success",
      disabled: !$data.lang.length,
      onClick: function onClick($event) {
        return $options.goToProblem(problem.id);
      }
    }, " Launch in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lang), 9
    /* TEXT, PROPS */
    , ["disabled", "onClick"])])])])])])], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isExpanded(problem.id)]])], 64
    /* STABLE_FRAGMENT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  )), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
    key: 0,
    "class": "lab pointer",
    onClick: _cache[9] || (_cache[9] = function () {
      return $options.addProblem && $options.addProblem.apply($options, arguments);
    })
  }, [_hoisted_46])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.childIsOpen]]), $data.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_view, {
    key: 0,
    onUnmounting: _cache[10] || (_cache[10] = function ($event) {
      return $options.Unmounting();
    }),
    onProblemEdited: _cache[11] || (_cache[11] = function ($event) {
      return $options.problemEdited();
    }),
    onDeleteMe: _cache[12] || (_cache[12] = function ($event) {
      return $options.deleteMe();
    }),
    problemID: $data.problemID,
    lang: $data.lang,
    labID: $props.labID
  }, null, 8
  /* PROPS */
  , ["problemID", "lang", "labID"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Problems.vue":
/*!*****************************************!*\
  !*** ./resources/js/Pages/Problems.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Problems_vue_vue_type_template_id_54794346__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Problems.vue?vue&type=template&id=54794346 */ "./resources/js/Pages/Problems.vue?vue&type=template&id=54794346");
/* harmony import */ var _Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Problems.vue?vue&type=script&lang=js */ "./resources/js/Pages/Problems.vue?vue&type=script&lang=js");



_Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Problems_vue_vue_type_template_id_54794346__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Problems.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Problems.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/Problems.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Problems_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Problems.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Problems.vue?vue&type=template&id=54794346":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Problems.vue?vue&type=template&id=54794346 ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Problems_vue_vue_type_template_id_54794346__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Problems_vue_vue_type_template_id_54794346__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Problems.vue?vue&type=template&id=54794346 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Problems.vue?vue&type=template&id=54794346");


/***/ })

}]);