(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_CreateAssignment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Store/index */ "./resources/js/Store/index.js");
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  emits: ["delete-problem"],
  props: ["problemID"],
  data: function data() {
    return {
      authUser: null,
      problem: {},
      copies: [],
      enrolledCourses: [],
      courses: [],
      labs: [] //list of lists

    };
  },
  watch: {
    courses: {
      deep: true,
      handler: function handler() {
        console.log("something in the courses list changed");
      }
    }
  },
  methods: {
    // Getter Methods
    getCourses: function getCourses() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var i, currentCourse, course, labs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < _this.enrolledCourses.length)) {
                  _context.next = 17;
                  break;
                }

                currentCourse = _this.enrolledCourses[i];
                _context.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/courses/".concat(currentCourse));

              case 5:
                course = _context.sent;

                _this.courses.push(course.data.data);

                _context.next = 9;
                return _this.getLabs(_this.courses[i].id);

              case 9:
                labs = _context.sent;

                _this.labs.push(labs);

                _this.courses[i].DDate = "", _this.courses[i].TDate = "", _this.courses[i].isAdded = false;
                _this.courses[i].isPublished = false;
                _this.courses[i].currentLab = {};

              case 14:
                i++;
                _context.next = 1;
                break;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getLabs: function getLabs(courseID) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var rawLabs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/labs/".concat(courseID));

              case 2:
                rawLabs = _context2.sent;
                return _context2.abrupt("return", rawLabs.data.data);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    //Setter Methods
    updateDate: function updateDate(course) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var lab, tempID, i, dateList, year, month, day, timeList, hour, minute, payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                lab = course.currentLab;

                if (!(lab != undefined && JSON.stringify(lab) != JSON.stringify({}))) {
                  _context3.next = 25;
                  break;
                }

                tempID = "";
                i = 0;

              case 4:
                if (!(i < _this2.copies.length)) {
                  _context3.next = 11;
                  break;
                }

                if (!(_this2.copies[i].lab_id == lab.id)) {
                  _context3.next = 8;
                  break;
                }

                tempID = _this2.copies[i].id;
                return _context3.abrupt("break", 11);

              case 8:
                i++;
                _context3.next = 4;
                break;

              case 11:
                //combine due date and due time and send to database
                dateList = course.DDate.split("-");
                year = Number(dateList[0]);
                month = Number(dateList[1]) - 1;
                day = Number(dateList[2]);
                timeList = course.TDate.split(":");
                hour = Number(timeList[0]);
                minute = Number(timeList[1]) + new Date().getTimezoneOffset();
                payload = {
                  due_date: course.DDate + " " + course.TDate,
                  due_date_utc: Date.UTC(year, month, day, hour, minute, 0, 0)
                };
                console.log(payload);
                _context3.next = 22;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/problems/unique/".concat(tempID), payload);

              case 22:
                res = _context3.sent;
                _context3.next = 28;
                break;

              case 25:
                console.log("can't change date to undefined lab");
                course.DDate = "";
                course.TDate = "";

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    //Functional Methods
    switchedLab: function switchedLab(course) {
      var ind; //isAdded needs to be set

      course.isAdded = false;

      for (var i = 0; i < this.copies.length; i++) {
        if (this.copies[i].lab_id == course.currentLab.id) {
          course.isAdded = true;
          ind = i;
          break;
        }
      }

      if (ind != undefined) {
        //ispublished needs to be set
        course.isPublished = this.copies[ind].isPublished; //due date needs to be set

        course.DDate = this.copies[ind].due_date.split(" ")[0];
        course.TDate = this.copies[ind].due_date.split(" ")[1];
      } else {
        course.isPublished = false;
        course.DDate = "";
        course.TDate = "";
      }
    },
    //Adder Methods
    toggleToCourse: function toggleToCourse(course) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var lab, flag;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                lab = course.currentLab;

                if (!(lab != undefined && JSON.stringify(lab) != JSON.stringify({}))) {
                  _context4.next = 24;
                  break;
                }

                if (course.isAdded) {
                  _context4.next = 6;
                  break;
                }

                //add to course/lab
                _this3.addToCourse(lab);

                _context4.next = 22;
                break;

              case 6:
                if (!(_this3.copies.length > 1)) {
                  _context4.next = 10;
                  break;
                }

                //enough copies can just delete
                _this3.deleteFromCourse(course, lab);

                _context4.next = 22;
                break;

              case 10:
                //give message on screen saying we are deleting the last copy
                flag = confirm("This is the last copy of this assignment, are you sure you want to delete it forever");

                if (!flag) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 14;
                return _this3.$emit("delete-problem");

              case 14:
                _context4.next = 22;
                break;

              case 16:
                //not deleted change back the isAdded
                console.log("should have changed back the isAdded");
                console.log(course); // this.switchedLab(course);
                //this had to be added because the checkbox was being changed back to quickly....however this is 1/100th of a second..not noticeable at all

                _context4.next = 20;
                return _this3.sleep(10);

              case 20:
                course.isAdded = true;
                console.log(course);

              case 22:
                _context4.next = 26;
                break;

              case 24:
                console.log("can't add/delete to undefined lab");
                course.isAdded = false;

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    sleep: function sleep(ms) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve) {
                  return setTimeout(resolve, ms);
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    addToCourse: function addToCourse(lab) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var payload, res, co;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                //create a copy with a lab id of lab.id, and a copy id of problemID and post to database
                payload = {
                  lab_id: lab.id
                };
                _context6.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.post("/problems/copies/".concat(_this4.problemID), payload);

              case 3:
                res = _context6.sent;
                _context6.next = 6;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/problems/copies/".concat(_this4.problemID));

              case 6:
                co = _context6.sent;
                _this4.copies = co.data.data;
                return _context6.abrupt("return", res);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    deleteFromCourse: function deleteFromCourse(course, lab) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var tempID, i, res, co;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                //get assignment id of the one i want to remove
                tempID = "";
                i = 0;

              case 2:
                if (!(i < _this5.copies.length)) {
                  _context7.next = 9;
                  break;
                }

                if (!(_this5.copies[i].lab_id == lab.id)) {
                  _context7.next = 6;
                  break;
                }

                tempID = _this5.copies[i].id;
                return _context7.abrupt("break", 9);

              case 6:
                i++;
                _context7.next = 2;
                break;

              case 9:
                _context7.next = 11;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.delete("/problems/".concat(tempID));

              case 11:
                res = _context7.sent;
                console.log(res.data.message); //reset copies list

                _context7.next = 15;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/problems/copies/".concat(_this5.problemID));

              case 15:
                co = _context7.sent;
                _this5.copies = co.data.data; //change isPublished just in case on front end

                course.isPublished = false; //remove date showing on front end

                course.DDate = "";
                course.TDate = "";

              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    togglePublish: function togglePublish(course) {
      var lab = course.currentLab;

      if (lab != undefined && JSON.stringify(lab) != JSON.stringify({})) {
        if (!course.isPublished) {
          //add to course/lab
          this.addPublish(course, lab);
        } else {
          //delete from course/lab
          this.deletePublish(course, lab);
        }
      } else {
        console.log("can't publish/unpublish to undefined lab");
        course.isPublished = false;
      }
    },
    addPublish: function addPublish(course, lab) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var flag, tempID, i, _res, payload, res;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                //call addToCourse(lab) if necessary
                flag = true;
                i = 0;

              case 2:
                if (!(i < _this6.copies.length)) {
                  _context8.next = 10;
                  break;
                }

                if (!(_this6.copies[i].lab_id == lab.id)) {
                  _context8.next = 7;
                  break;
                }

                flag = false;
                tempID = _this6.copies[i].id;
                return _context8.abrupt("break", 10);

              case 7:
                i++;
                _context8.next = 2;
                break;

              case 10:
                if (!flag) {
                  _context8.next = 15;
                  break;
                }

                _context8.next = 13;
                return _this6.addToCourse(lab);

              case 13:
                _res = _context8.sent;
                tempID = _res.data.data.id;

              case 15:
                //then change boolean on front and back end
                course.isAdded = true;
                payload = {
                  published: true
                };
                _context8.next = 19;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/problems/unique/".concat(tempID), payload);

              case 19:
                res = _context8.sent;

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    deletePublish: function deletePublish(course, lab) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var tempID, i, payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                //change boolean
                tempID = "";
                i = 0;

              case 2:
                if (!(i < _this7.copies.length)) {
                  _context9.next = 9;
                  break;
                }

                if (!(_this7.copies[i].lab_id == lab.id)) {
                  _context9.next = 6;
                  break;
                }

                tempID = _this7.copies[i].id;
                return _context9.abrupt("break", 9);

              case 6:
                i++;
                _context9.next = 2;
                break;

              case 9:
                payload = {
                  published: false
                };
                _context9.next = 12;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/problems/unique/".concat(tempID), payload);

              case 12:
                res = _context9.sent;

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    addToAll: function addToAll() {
      for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].currentLab != undefined && JSON.stringify(this.courses[i].currentLab) != JSON.stringify({})) {
          if (!this.courses[i].isAdded) {
            //add to course/lab
            this.addToCourse(this.courses[i].currentLab);
            this.courses[i].isAdded = true;
          }
        } else {
          console.log("No Selected Lab for this course");
        }
      }
    },
    publishToAll: function publishToAll() {
      for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].currentLab != undefined && JSON.stringify(this.courses[i].currentLab) != JSON.stringify({})) {
          if (!this.courses[i].isPublished) {
            //add to course/lab
            this.addPublish(this.courses[i], this.courses[i].currentLab);
            this.courses[i].isPublished = true;
          }
        } else {
          console.log("No Selected Lab for this course");
        }
      }
    }
  },
  mounted: function mounted() {
    var _this8 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
      var pro, co;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _this8.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["auth/authUser"];
              _context10.next = 3;
              return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/problems/full/".concat(_this8.problemID));

            case 3:
              pro = _context10.sent;
              _this8.problem = pro.data.data;
              _context10.next = 7;
              return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/problems/copies/".concat(_this8.problemID));

            case 7:
              co = _context10.sent;
              _this8.copies = co.data.data;

              if (_this8.authUser.fsc_user.courses) {
                _this8.enrolledCourses = JSON.parse(_this8.authUser.fsc_user.courses).courses;
              }

              _this8.getCourses();

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  }
}); // when publishing to a lab that does not have the problem it adds and publishes properly, but the front end button "ADD" does not turn on like it should

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
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


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['problemID'],
  data: function data() {
    return {
      authUser: {},
      gradebook: {},
      students: [],
      worth: 0
    };
  },
  methods: {
    getStudents: function getStudents() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res, student_ids, curr, i, res2, student, points, calcGrades;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.isProf == true)) {
                  _context.next = 21;
                  break;
                }

                _context.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/full/".concat(_this.problemID));

              case 3:
                res = _context.sent;
                _this.gradebook = JSON.parse(res.data.data.gradebook);
                _this.worth = res.data.data.worth; // this logic is populating front-end gradebook

                student_ids = _this.gradebook.students; // list of ids in gradebook 

                i = 0;

              case 8:
                if (!(i < student_ids.length)) {
                  _context.next = 21;
                  break;
                }

                curr = student_ids[i];
                _context.next = 12;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/students/".concat(curr));

              case 12:
                res2 = _context.sent;
                // this will return USER objects that contain student
                student = res2.data.data;
                console.log(student.fsc_id);
                points = _this.gradebook.grades[curr];
                calcGrades = _this.calcGrade(res.data.data, points);

                _this.students.push({
                  name: student.name,
                  ID: curr,
                  grade: calcGrades[1],
                  percent: calcGrades[2],
                  letterGrade: calcGrades[0],
                  email: student.email
                });

              case 18:
                i++;
                _context.next = 8;
                break;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    calcGrade: function calcGrade(assignment, points) {
      // calc numbers
      var worth = assignment.worth;
      var percent;
      percent = points * 100;
      percent = percent / worth * 100;
      percent = Math.floor(percent);
      percent = percent / 100; // calc letters

      var letterGrade;

      if (percent > 90) {
        letterGrade = 'A';
      } else if (percent > 80) {
        letterGrade = 'B';
      } else if (percent > 70) {
        letterGrade = 'C';
      } else if (percent > 60) {
        letterGrade = 'D';
      } else {
        letterGrade = "F";
      }

      return [letterGrade, points, percent];
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
    this.authUser = _Store_index__WEBPACK_IMPORTED_MODULE_2__.default.getters["auth/authUser"];
    this.getStudents();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["problemID", "tab"],
  data: function data() {
    return {
      saveStatus: "",
      lang: "",
      showEditor: false,
      content: "",
      template_j: "",
      template_p: "",
      windowWidth: window.innerWidth
    };
  },
  watch: {
    tab: function tab(newVal, oldVal) {
      if (newVal != "Model Solution") {
        this.showEditor = false;
      }
    },
    content: function content(val) {
      this.saveStatus = "Saving...";
      this.timeout(this.problemID);
    }
  },
  methods: {
    launchEditor: function launchEditor() {
      this.showEditor = true; // this.$forceUpdate();
    },
    changeLanguage: function changeLanguage() {
      this.showEditor = false;
    },
    updateContent: function updateContent(e) {
      this.content = e.code;
    },
    timeout: _.debounce( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(assignmentID) {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {};

                if (this.lang == "Java") {
                  payload = {
                    java_model: this.content
                  };
                } else {
                  payload = {
                    python_model: this.content
                  };
                }

                _context.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.put("/problems/".concat(assignmentID), payload);

              case 4:
                res = _context.sent;
                this.saveStatus = "All changes have been saved";

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 500),
    getStarter: function getStarter() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res, templates;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_1__.apiClient.get("/problems/full/".concat(_this.problemID));

              case 2:
                res = _context2.sent;
                templates = res.data.data;
                _this.template_j = templates.java_starter;
                _this.template_p = templates.python_starter;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  beforeMount: function beforeMount() {
    this.getStarter();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  emits: ["delete-problem"],
  props: {
    overview: {
      type: Object,
      required: true
    },
    problemID: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      assignmentID: this.problemID,
      newText: {},
      childIsOpen: false,
      showDeleteModal: false,
      reloadDeleteModal: 0
    };
  },
  methods: {
    timeout: lodash__WEBPACK_IMPORTED_MODULE_1___default().debounce( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(assignmentID) {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {
                  description: this.newText
                };
                _context.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/problems/".concat(assignmentID), payload);

              case 3:
                res = _context.sent;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 3000),
    save: function save(e) {
      this.newText = e;
      this.timeout(this.assignmentID);
    },
    deleteProblem: function deleteProblem() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.childIsOpen = false;

                _this.closeDeleting();

                _context2.next = 4;
                return _this.$emit("delete-problem", _this.problemID);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    closeDeleting: function closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting: function deleting() {
      this.showDeleteModal = true;
    }
  },
  beforeMount: function beforeMount() {},
  beforeUnmount: function beforeUnmount() {
    //overview
    console.log("overview unmount");
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["problemID", "tab"],
  data: function data() {
    return {
      saveStatus: "",
      lang: "",
      showEditor: false,
      content: "",
      template_j: "",
      template_p: "",
      windowWidth: window.innerWidth
    };
  },
  watch: {
    tab: function tab(newVal, oldVal) {
      if (newVal != "Template") {
        this.showEditor = false;
      }
    },
    content: function content(val) {
      this.saveStatus = "Saving...";
      console.log("Change status to saving");
      this.timeout(this.problemID);
    }
  },
  methods: {
    launchEditor: function launchEditor() {
      this.showEditor = true; // this.$forceUpdate();
    },
    changeLanguage: function changeLanguage() {
      this.showEditor = false;
    },
    updateContent: function updateContent(e) {
      this.content = e.code;
    },
    timeout: lodash__WEBPACK_IMPORTED_MODULE_1___default().debounce( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(assignmentID) {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = {};

                if (this.lang == "Java") {
                  payload = {
                    java_starter: this.content
                  };
                } else {
                  payload = {
                    python_starter: this.content
                  };
                }

                console.log(payload);
                _context.next = 5;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/problems/".concat(assignmentID), payload);

              case 5:
                res = _context.sent;
                this.saveStatus = "All changes have been saved";

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 500),
    getStarter: function getStarter() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res, templates;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/problems/full/".concat(_this.problemID));

              case 2:
                res = _context2.sent;
                templates = res.data.data;
                _this.template_j = templates.java_starter;
                _this.template_p = templates.python_starter;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  beforeMount: function beforeMount() {
    this.getStarter();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue3_ace_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue3-ace-editor */ "./node_modules/vue3-ace-editor/index.js");
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    problemID: Number
  },
  data: function data() {
    return {
      currentTC: 0,
      tc: {
        id: "",
        Title: "",
        Points: 0,
        Feedback: {},
        CompareMethod: "",
        Input: "",
        Output: ""
      },
      feedback: {},
      cases: []
    };
  },
  components: {
    VAceEditor: vue3_ace_editor__WEBPACK_IMPORTED_MODULE_1__.VAceEditor
  },
  // watch: {
  //   tc: {
  //     deep: true,
  //     handler() {
  //       if (this.tc.id != "") {
  //         // this.timeout(this.problemID);
  //         console.log("something changed");
  //       }
  //     },
  //   },
  // },
  methods: {
    getCases: function getCases() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var res, rawCases;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/test-cases/".concat(_this.problemID));

              case 2:
                res = _context2.sent;
                rawCases = res.data;

                /*#__PURE__*/
                _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this.cases = rawCases;

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                if (_this.cases.length != 0) {
                  _this.setCurrent(0);
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    addTest: function addTest() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("addTest");
                payload = {
                  assignment_id: _this2.problemID,
                  feedback: JSON.stringify({}),
                  input: "New Input",
                  output: "New Output"
                };
                _context3.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.post("/test-cases", payload);

              case 4:
                res = _context3.sent;

                _this2.cases.push(res.data);

                _this2.setCurrent(_this2.cases.length - 1);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    deleteTest: function deleteTest() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var key, i, temp, idx, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                for (i = 0; i < _this3.cases.length; i++) {
                  if (_this3.tc.id == _this3.cases[i].id) {
                    key = i;
                  }
                }

                _this3.cases = _this3.cases.filter(function (c, i) {
                  return i != key;
                });
                temp = _this3.tc.id; //set current to null

                if (_this3.currentTC != 1 && _this3.currentTC.length != 0) {
                  _this3.currentTC--;
                }

                ;

                if (_this3.currentTC.length != 0) {
                  idx = _this3.currentTC - 1;
                  _this3.tc.id = _this3.cases[idx].id;
                  _this3.tc.Title = _this3.cases[idx].title;
                  _this3.tc.Points = _this3.cases[idx].points;
                  _this3.tc.Feedback = _this3.cases[idx].feedback;
                  _this3.tc.CompareMethod = _this3.cases[idx].compare_method;
                  _this3.tc.Input = _this3.cases[idx].input;
                  _this3.tc.Output = _this3.cases[idx].output;
                } else {
                  _this3.currentTC = 0;
                  _this3.tc.id = "";
                  _this3.tc.Title = "";
                  _this3.tc.Points = "";
                  _this3.tc.Feedback = "";
                  _this3.tc.CompareMethod = "";
                  _this3.tc.Input = "";
                  _this3.tc.Output = "";
                } // I do this after to ensure that it doesn't try to repost to the test case after it has been deleted


                _context4.next = 8;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.delete("/test-cases/".concat(temp));

              case 8:
                res = _context4.sent;

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    setCurrent: function setCurrent(idx) {
      this.currentTC = idx + 1;
      console.log(this.tc);
      console.log(this.cases[idx]);
      this.tc.id = this.cases[idx].id;
      this.tc.Title = this.cases[idx].title;
      this.tc.Points = this.cases[idx].points;
      this.tc.Feedback = this.cases[idx].feedback;
      this.tc.CompareMethod = this.cases[idx].compare_method;
      this.tc.Input = this.cases[idx].input;
      this.tc.Output = this.cases[idx].output;
    },
    // timeout: _.debounce(async function (problemID) {
    //   var payload = {
    //     // title: this.tc.Title,
    //     // points: this.tc.Points,
    //     feedback: this.tc.Feedback,
    //     // compare_method: this.tc.CompareMethod,
    //     // input: this.tc.Input,
    //     // output: this.tc.Output,
    //   };
    //   const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
    //   for (let i = 0; i < this.cases.length; i++) {
    //     if (this.cases[i].id == res.data.id) {
    //       this.cases[i] = res.data;
    //     }
    //   }
    // }, 500),
    changeTitle: function changeTitle() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                payload = {
                  title: _this4.tc.Title
                };
                _context5.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this4.tc.id), payload);

              case 3:
                res = _context5.sent;

                for (i = 0; i < _this4.cases.length; i++) {
                  if (_this4.cases[i].id == res.data.id) {
                    _this4.cases[i] = res.data;
                  }
                }

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    changePoints: function changePoints() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                payload = {
                  points: _this5.tc.Points
                };
                _context6.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this5.tc.id), payload);

              case 3:
                res = _context6.sent;

                for (i = 0; i < _this5.cases.length; i++) {
                  if (_this5.cases[i].id == res.data.id) {
                    _this5.cases[i] = res.data;
                  }
                }

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    changeFeedback: function changeFeedback(e) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this6.tc.Feedback = e;
                payload = {
                  feedback: _this6.tc.Feedback
                };
                _context7.next = 4;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this6.tc.id), payload);

              case 4:
                res = _context7.sent;

                for (i = 0; i < _this6.cases.length; i++) {
                  if (_this6.cases[i].id == res.data.id) {
                    _this6.cases[i] = res.data;
                  }
                }

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    changeCompare: function changeCompare() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                payload = {
                  compare_method: _this7.tc.CompareMethod
                };
                _context8.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this7.tc.id), payload);

              case 3:
                res = _context8.sent;

                for (i = 0; i < _this7.cases.length; i++) {
                  if (_this7.cases[i].id == res.data.id) {
                    _this7.cases[i] = res.data;
                  }
                }

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    changeInput: function changeInput() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                payload = {
                  input: _this8.tc.Input
                };
                _context9.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this8.tc.id), payload);

              case 3:
                res = _context9.sent;

                for (i = 0; i < _this8.cases.length; i++) {
                  if (_this8.cases[i].id == res.data.id) {
                    _this8.cases[i] = res.data;
                  }
                }

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    changeOutput: function changeOutput() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee10() {
        var payload, res, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                payload = {
                  output: _this9.tc.Output
                };
                _context10.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/test-cases/".concat(_this9.tc.id), payload);

              case 3:
                res = _context10.sent;

                for (i = 0; i < _this9.cases.length; i++) {
                  if (_this9.cases[i].id == res.data.id) {
                    _this9.cases[i] = res.data;
                  }
                }

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    }
  },
  mounted: function mounted() {
    this.getCases();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _Components_Overview_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Overview.vue */ "./resources/js/Components/Overview.vue");
/* harmony import */ var _Components_Assign_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/Assign.vue */ "./resources/js/Components/Assign.vue");
/* harmony import */ var _Components_Template_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/Template.vue */ "./resources/js/Components/Template.vue");
/* harmony import */ var _Components_TestBench_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/TestBench.vue */ "./resources/js/Components/TestBench.vue");
/* harmony import */ var _Components_ModelSolution_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Components/ModelSolution.vue */ "./resources/js/Components/ModelSolution.vue");
/* harmony import */ var _Components_GradeBook_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Components/GradeBook.vue */ "./resources/js/Components/GradeBook.vue");
/* harmony import */ var _services_API__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/API */ "./resources/js/services/API.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Imports for tab functionality. Note: VScode is wrong, there's no error here smh
 // Assignment components









var tabs = ["Overview", "Assign", "Template", "Test Bench", "Model Solution", "Grade Book", "Save & Exit"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  props: ["problemID"],
  emits: ["unmounting", "problemEdited", "deleteMe"],
  components: {
    Overview: _Components_Overview_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    Assign: _Components_Assign_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    Template: _Components_Template_vue__WEBPACK_IMPORTED_MODULE_4__.default,
    TestBench: _Components_TestBench_vue__WEBPACK_IMPORTED_MODULE_5__.default,
    ModelSolution: _Components_ModelSolution_vue__WEBPACK_IMPORTED_MODULE_6__.default,
    GradeBook: _Components_GradeBook_vue__WEBPACK_IMPORTED_MODULE_7__.default
  },
  name: "Create Assignment",
  setup: function setup() {
    var state = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
      selectedTab: tabs[0]
    });
    return _objectSpread({
      tabs: tabs
    }, (0,vue__WEBPACK_IMPORTED_MODULE_1__.toRefs)(state));
  },
  data: function data() {
    return {
      childIsOpen: true,
      assignmentID: this.problemID,
      assignmentTitle: "",
      overview: {},
      problem: {}
    };
  },
  watch: {
    assignmentTitle: function assignmentTitle(val) {
      if (this.assignmentTitle != "") {
        this.timeout(this.problemID);
      }
    }
  },
  methods: {
    pressTab: function pressTab() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("pressed a tab");
                console.log(_this.selectedTab);

                if (_this.selectedTab == "Save & Exit") {
                  _this.childIsOpen = false;

                  _this.$emit("problemEdited");
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    handleSubmit: function handleSubmit() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //perhaps later replace this with a debounce method for autosaving
                //save information before returning to the problems page
                // var payload = {
                //   name: this.title,
                //   // "description": this.overview,
                // };
                // const res = await API.apiClient.put(`/problems/${this.problemID}`, payload);
                _this2.childIsOpen = false;

                _this2.$emit("problemEdited");

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    updateOverview: function updateOverview(e) {
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEE"); //will be removing this in place of using debounce on each specific tab and then saving only that tab at a time

      this.overview = e;
    },
    getInfo: function getInfo() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var rawproblem;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("get info");
                _context3.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_8__.apiClient.get("/problems/full/".concat(_this3.problemID));

              case 3:
                rawproblem = _context3.sent;
                _this3.problem = rawproblem.data.data;
                _this3.assignmentTitle = _this3.problem.name;
                _this3.overview = _this3.problem.description;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    timeout: lodash__WEBPACK_IMPORTED_MODULE_9___default().debounce( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(assignmentID) {
        var payload, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                payload = {
                  name: this.assignmentTitle
                };
                _context4.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_8__.apiClient.put("/problems/unique/".concat(assignmentID), payload);

              case 3:
                res = _context4.sent;

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), 500),
    deleteProblem: function deleteProblem(id) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log("create-assignment problemid " + id);
                _context5.next = 3;
                return _this4.$emit("deleteMe", id);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  },
  beforeMount: function beforeMount() {
    this.getInfo();
  },
  beforeUnmount: function beforeUnmount() {
    //create assignment
    this.childIsOpen = false;
    this.$emit("problemEdited");
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-assignment"
};
var _hoisted_2 = {
  "class": "container"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "no-decor"
};
var _hoisted_5 = {
  "class": "row"
};
var _hoisted_6 = {
  "class": "card editcoursecard w-100"
};
var _hoisted_7 = {
  "class": "courses card-content"
};
var _hoisted_8 = {
  "class": "card-title my-3 mx-2 mb-0"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "courses my-0"
}, null, -1
/* HOISTED */
);

var _hoisted_10 = {
  "class": "card-body center"
};
var _hoisted_11 = {
  "class": "row"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "col-4"
}, "Publish:", -1
/* HOISTED */
);

var _hoisted_13 = {
  "class": "col-8"
};
var _hoisted_14 = {
  "class": "switch"
};

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
  "class": "slider round"
}, null, -1
/* HOISTED */
);

var _hoisted_16 = {
  "class": "row"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "col-4"
}, "Add:", -1
/* HOISTED */
);

var _hoisted_18 = {
  "class": "col-8"
};
var _hoisted_19 = {
  "class": "switch"
};

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
  "class": "slider round"
}, null, -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "lab-select"
}, "Lab:", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "",
  selected: "",
  hidden: "",
  disabled: ""
}, "Select a lab...", -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "dueDate"
}, "Due Date: ", -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "dueTime"
}, "Time Due: ", -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<hr class=\"courses my-0\"><div class=\"card-footer\"><div class=\"row center\"><div class=\"col-6\"><small><a href=\"\" class=\"no-decor\">Student Preview</a></small></div><div class=\"col-6\"><small><a href=\"\" class=\"no-decor\">Gradebook &amp;<br>Submissions</a></small></div></div></div>", 2);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.publishToAll();
    }),
    "class": "btn btn-primary btn-md publish-all"
  }, " PUBLISH TO ALL SELECTED LABS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.addToAll();
    }),
    "class": "btn btn-primary btn-md publish-all"
  }, " ADD TO ALL SELECTED LABS "), _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.courses, function (course, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      key: course.id,
      "class": "margin width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.name), 1
    /* TEXT */
    ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_11, [_hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
      type: "checkbox",
      onClick: function onClick($event) {
        return $options.togglePublish(course);
      },
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return course.isPublished = $event;
      }
    }, null, 8
    /* PROPS */
    , ["onClick", "onUpdate:modelValue"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, course.isPublished]]), _hoisted_15])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
      type: "checkbox",
      onClick: function onClick($event) {
        return $options.toggleToCourse(course);
      },
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return course.isAdded = $event;
      }
    }, null, 8
    /* PROPS */
    , ["onClick", "onUpdate:modelValue"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, course.isAdded]]), _hoisted_20])])]), _hoisted_21, _hoisted_22, _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
      id: "lab-select",
      onChange: function onChange($event) {
        return $options.switchedLab(course);
      },
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return course.currentLab = $event;
      }
    }, [_hoisted_24, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.labs[index], function (lab) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("option", {
        key: lab.id,
        value: lab
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lab.name), 9
      /* TEXT, PROPS */
      , ["value"]);
    }), 128
    /* KEYED_FRAGMENT */
    ))], 40
    /* PROPS, HYDRATE_EVENTS */
    , ["onChange", "onUpdate:modelValue"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, course.currentLab]])]), _hoisted_25, _hoisted_26, _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
      type: "date",
      id: "dueDate",
      onChange: function onChange($event) {
        return $options.updateDate(course);
      },
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return course.DDate = $event;
      }
    }, null, 40
    /* PROPS, HYDRATE_EVENTS */
    , ["onChange", "onUpdate:modelValue"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, course.DDate]]), _hoisted_28, _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
      type: "time",
      id: "timeDate",
      onChange: function onChange($event) {
        return $options.updateDate(course);
      },
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return course.TDate = $event;
      }
    }, null, 40
    /* PROPS, HYDRATE_EVENTS */
    , ["onChange", "onUpdate:modelValue"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, course.TDate]])]), _hoisted_30])])]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-assignment"
};
var _hoisted_2 = {
  "class": "table gradebook"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("thead", {
  "class": "gradebook"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Name"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "FSC ID"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Percent"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Grade"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Letter Grade"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("th", null, "Email")])], -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("table", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.students, function (student) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("tr", {
      key: student.id,
      "class": "student",
      style: {
        "cursor": "pointer"
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.name), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.ID), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.percent) + "%", 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.grade) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.worth), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.letterGrade), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      href: 'mailto:' + student.email
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(student.email), 9
    /* TEXT, PROPS */
    , ["href"])])]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-assignment",
  style: {
    "padding": "0 !important"
  }
};
var _hoisted_2 = {
  key: 0,
  "class": "lang-select"
};
var _hoisted_3 = {
  "class": "row"
};
var _hoisted_4 = {
  "class": "col-9"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "",
  selected: "",
  disabled: "",
  hidden: ""
}, "Select a language...", -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Java"
}, "Java", -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Python"
}, "Python", -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "col-3 ml-1"
};
var _hoisted_9 = {
  key: 1,
  "class": "template-workspace"
};
var _hoisted_10 = {
  "class": "save-model"
};
var _hoisted_11 = {
  "class": "row"
};
var _hoisted_12 = {
  "class": "col-8 saveStatus"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_IDE = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("IDE");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [!$data.showEditor ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.lang = $event;
    }),
    id: "lang",
    "class": "form-select"
  }, [_hoisted_5, _hoisted_6, _hoisted_7], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.lang]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    type: "launch",
    name: "launch",
    "class": "launch-workspace btn btn-success",
    disabled: !$data.lang.length,
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.launchEditor();
    })
  }, " Launch in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lang), 9
  /* TEXT, PROPS */
  , ["disabled"])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.showEditor ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    "class": "btn btn-primary btn-md col-4",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.changeLanguage();
    })
  }, " CHANGE LANGUAGE "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <small class=\"col-8 saveStatus\">{{ saveStatus }}</small> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.saveStatus), 1
  /* TEXT */
  )])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_IDE, {
    offsetTop: 197.8,
    width: $data.windowWidth,
    lang: $data.lang,
    problemID: $props.problemID,
    showSubmit: false,
    saved_j: $data.template_j,
    "onUpdate:saved_j": _cache[4] || (_cache[4] = function ($event) {
      return $data.template_j = $event;
    }),
    saved_p: $data.template_p,
    "onUpdate:saved_p": _cache[5] || (_cache[5] = function ($event) {
      return $data.template_p = $event;
    }),
    onUpdate: $options.updateContent
  }, null, 8
  /* PROPS */
  , ["offsetTop", "width", "lang", "problemID", "saved_j", "saved_p", "onUpdate"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=template&id=7a277644":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=template&id=7a277644 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-assignment"
};
var _hoisted_2 = {
  "class": "delete Course"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, "Are you sure you would like to delete this problem", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "delete-buttons"
};
var _hoisted_5 = {
  "class": "container"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, "Description:", -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h5", null, "Proceed with caution!", -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_vue_final_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-final-modal");

  var _component_Tiptap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tiptap");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
    "class": "delete-modal",
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
      }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.closeDeleting();
        })
      }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $options.deleteProblem();
        })
      }, "Delete")])])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tiptap, {
    savedText: JSON.parse($props.overview),
    onInput: $options.save,
    showMenuBar: true,
    isDark: false
  }, null, 8
  /* PROPS */
  , ["savedText", "onInput"]), _hoisted_7, _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    "class": "btn btn-danger btn-lg",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.deleting();
    })
  }, "DELETE ASSIGNMENT")])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=template&id=cc602676":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=template&id=cc602676 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-assignment",
  style: {
    "padding": "0 !important"
  }
};
var _hoisted_2 = {
  key: 0,
  "class": "lang-select"
};
var _hoisted_3 = {
  "class": "row"
};
var _hoisted_4 = {
  "class": "col-9"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "",
  selected: "",
  disabled: "",
  hidden: ""
}, "Select a language...", -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Java"
}, "Java", -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "Python"
}, "Python", -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "col-3 ml-1"
};
var _hoisted_9 = {
  key: 1,
  "class": "template-workspace"
};
var _hoisted_10 = {
  "class": "save-template"
};
var _hoisted_11 = {
  "class": "row"
};
var _hoisted_12 = {
  "class": "col-8 saveStatus"
};
var _hoisted_13 = {
  "class": "template-IDE"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_IDE = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("IDE");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [!$data.showEditor ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.lang = $event;
    }),
    id: "lang",
    "class": "form-select"
  }, [_hoisted_5, _hoisted_6, _hoisted_7], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.lang]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    type: "launch",
    name: "launch",
    "class": "launch-workspace btn btn-success",
    disabled: !$data.lang.length,
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.launchEditor();
    })
  }, " Launch in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lang), 9
  /* TEXT, PROPS */
  , ["disabled"])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.showEditor ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    "class": "btn btn-primary btn-md col-4",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.changeLanguage();
    })
  }, " CHANGE LANGUAGE "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <small class=\"col-8 saveStatus\">{{ saveStatus }}</small> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.saveStatus), 1
  /* TEXT */
  )])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_IDE, {
    offsetTop: 197.8,
    width: $data.windowWidth,
    lang: $data.lang,
    problemID: $props.problemID,
    showSubmit: false,
    saved_j: $data.template_j,
    "onUpdate:saved_j": _cache[4] || (_cache[4] = function ($event) {
      return $data.template_j = $event;
    }),
    saved_p: $data.template_p,
    "onUpdate:saved_p": _cache[5] || (_cache[5] = function ($event) {
      return $data.template_p = $event;
    }),
    onUpdate: $options.updateContent
  }, null, 8
  /* PROPS */
  , ["offsetTop", "width", "lang", "problemID", "saved_j", "saved_p", "onUpdate"])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-test-cases create-assignment"
};
var _hoisted_2 = {
  "class": "row test-cases"
};
var _hoisted_3 = {
  "class": "tc-card-title"
};
var _hoisted_4 = {
  "class": "tc-card-body"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "tc-card-title"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, "Add Test Case"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, "+")], -1
/* HOISTED */
);

var _hoisted_8 = {
  key: 0,
  "class": "container"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "tcTitle"
}, "Title: ", -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "tcPoints"
}, "Points: ", -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h6", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("b", null, "Feedback on test failure")], -1
/* HOISTED */
);

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "compareMethod"
}, "Compare Method: ", -1
/* HOISTED */
);

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "flexible"
}, " Flexible equality (ignores: case, whitespace, and special characters) ", -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "exact",
  selected: ""
}, "Equals exactly", -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "contains"
}, "Contains an exact value (at least once)", -1
/* HOISTED */
);

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("option", {
  value: "regex"
}, "Regex (Write a regular expression to match outputs)", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "tcInput"
}, "Input (Will be passed into the student's program's stdin)", -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "tcOutput"
}, "Output (Will be matched against the output of the student's program)", -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Tiptap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tiptap");

  var _component_VAceEditor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("VAceEditor");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ---------------------------------------- "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" --------------- TC CARDS --------------- "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ---------------------------------------- "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cases, function (tc, idx) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      key: tc.id,
      tc: tc,
      "class": "tc-card col-1",
      onClick: function onClick($event) {
        return $options.setCurrent(idx);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p>tc{{ i }}</p> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tc.title), 1
    /* TEXT */
    )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tc.compareType) + " ", 1
    /* TEXT */
    ), _hoisted_5, _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tc.points) + " Points ", 1
    /* TEXT */
    )])])], 8
    /* PROPS */
    , ["tc", "onClick"]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.addTest();
    }),
    "class": "tc-card col-1"
  }, [_hoisted_7])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ---------------------------------------- "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" -------------- TC FIELDS --------------- "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ---------------------------------------- "), $data.currentTC != '' && $data.currentTC != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- Header ----------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, "Test Case (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentTC) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.cases.length) + ")", 1
  /* TEXT */
  ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Title ----------"), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "text",
    id: "tcTitle",
    onChange: _cache[2] || (_cache[2] = function () {
      return $options.changeTitle && $options.changeTitle.apply($options, arguments);
    }),
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.tc.Title = $event;
    })
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.tc.Title]]), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Points ----------"), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "number",
    id: "tcPoints",
    onChange: _cache[4] || (_cache[4] = function () {
      return $options.changePoints && $options.changePoints.apply($options, arguments);
    }),
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.tc.Points = $event;
    })
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.tc.Points]]), _hoisted_13, _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Feedback ----------"), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tiptap, {
    savedText: JSON.parse($data.tc.Feedback),
    onInput: $options.changeFeedback,
    showMenuBar: true,
    isDark: false
  }, null, 8
  /* PROPS */
  , ["savedText", "onInput"]), _hoisted_16, _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Compare Method ----------"), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("select", {
    "class": "form-select",
    name: "compareMethod",
    id: "compareMethod",
    onChange: _cache[6] || (_cache[6] = function () {
      return $options.changeCompare && $options.changeCompare.apply($options, arguments);
    }),
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.tc.CompareMethod = $event;
    })
  }, [_hoisted_19, _hoisted_20, _hoisted_21, _hoisted_22], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.tc.CompareMethod]]), _hoisted_23, _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Input ----------"), _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_VAceEditor, {
    "class": "tc-editor",
    id: "tcInput",
    onChange: $options.changeInput,
    value: $data.tc.Input,
    "onUpdate:value": _cache[8] || (_cache[8] = function ($event) {
      return $data.tc.Input = $event;
    })
  }, null, 8
  /* PROPS */
  , ["onChange", "value"]), _hoisted_26, _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- TC Output ----------"), _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_VAceEditor, {
    "class": "tc-editor",
    id: "tcOutput",
    onChange: $options.changeOutput,
    value: $data.tc.Output,
    "onUpdate:value": _cache[9] || (_cache[9] = function ($event) {
      return $data.tc.Output = $event;
    })
  }, null, 8
  /* PROPS */
  , ["onChange", "value"]), _hoisted_29, _hoisted_30, _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("---------- DELETE TC ----------"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.deleteTest();
    }),
    "class": "btn btn-md btn-danger"
  }, "Delete"), _hoisted_32])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "assignment header"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "assignment navbar-nav"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_tab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab");

  var _component_tabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tabs");

  var _component_Overview = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Overview");

  var _component_tab_panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panel");

  var _component_Assign = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Assign");

  var _component_Template = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Template");

  var _component_TestBench = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TestBench");

  var _component_ModelSolution = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ModelSolution");

  var _component_GradeBook = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("GradeBook");

  var _component_tab_panels = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tab-panels");

  return _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    id: "assignment-title",
    type: "text",
    "class": "assignment-title form-control",
    name: "assignment-title",
    placeholder: "Assignment Title",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.assignmentTitle = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.assignmentTitle]]), _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tabs, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
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
          indicator: true,
          onClick: _ctx.pressTab
        }, null, 8
        /* PROPS */
        , ["val", "label", "onClick"]);
      }), 128
      /* KEYED_FRAGMENT */
      ))];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panels, {
    modelValue: _ctx.selectedTab,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.selectedTab = $event;
    }),
    animate: true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Overview'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Overview, {
            onUpdate: _ctx.updateOverview,
            onDeleteProblem: _ctx.deleteProblem,
            overview: _ctx.overview,
            problemID: _ctx.assignmentID
          }, null, 8
          /* PROPS */
          , ["onUpdate", "onDeleteProblem", "overview", "problemID"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Assign'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Assign, {
            problemID: _ctx.problemID,
            onDeleteProblem: _ctx.deleteProblem
          }, null, 8
          /* PROPS */
          , ["problemID", "onDeleteProblem"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Template'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Template, {
            problemID: _ctx.problemID,
            tab: _ctx.selectedTab
          }, null, 8
          /* PROPS */
          , ["problemID", "tab"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Test Bench'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TestBench, {
            problemID: _ctx.problemID
          }, null, 8
          /* PROPS */
          , ["problemID"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Model Solution'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ModelSolution, {
            problemID: _ctx.problemID,
            tab: _ctx.selectedTab
          }, null, 8
          /* PROPS */
          , ["problemID", "tab"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Grade Book'
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_GradeBook, {
            problemID: _ctx.problemID
          }, null, 8
          /* PROPS */
          , ["problemID"])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tab_panel, {
        val: 'Save & Exit'
      })];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./resources/js/Components/Assign.vue":
/*!********************************************!*\
  !*** ./resources/js/Components/Assign.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Assign_vue_vue_type_template_id_24816f7a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assign.vue?vue&type=template&id=24816f7a */ "./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a");
/* harmony import */ var _Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Assign.vue?vue&type=script&lang=js */ "./resources/js/Components/Assign.vue?vue&type=script&lang=js");



_Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Assign_vue_vue_type_template_id_24816f7a__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/Assign.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/GradeBook.vue":
/*!***********************************************!*\
  !*** ./resources/js/Components/GradeBook.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GradeBook_vue_vue_type_template_id_39ea6cb6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GradeBook.vue?vue&type=template&id=39ea6cb6 */ "./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6");
/* harmony import */ var _GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GradeBook.vue?vue&type=script&lang=js */ "./resources/js/Components/GradeBook.vue?vue&type=script&lang=js");



_GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _GradeBook_vue_vue_type_template_id_39ea6cb6__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/GradeBook.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/ModelSolution.vue":
/*!***************************************************!*\
  !*** ./resources/js/Components/ModelSolution.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModelSolution_vue_vue_type_template_id_3ab3f287__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModelSolution.vue?vue&type=template&id=3ab3f287 */ "./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287");
/* harmony import */ var _ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModelSolution.vue?vue&type=script&lang=js */ "./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js");



_ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _ModelSolution_vue_vue_type_template_id_3ab3f287__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/ModelSolution.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/Overview.vue":
/*!**********************************************!*\
  !*** ./resources/js/Components/Overview.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Overview_vue_vue_type_template_id_7a277644__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Overview.vue?vue&type=template&id=7a277644 */ "./resources/js/Components/Overview.vue?vue&type=template&id=7a277644");
/* harmony import */ var _Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overview.vue?vue&type=script&lang=js */ "./resources/js/Components/Overview.vue?vue&type=script&lang=js");



_Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Overview_vue_vue_type_template_id_7a277644__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/Overview.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/Template.vue":
/*!**********************************************!*\
  !*** ./resources/js/Components/Template.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Template_vue_vue_type_template_id_cc602676__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Template.vue?vue&type=template&id=cc602676 */ "./resources/js/Components/Template.vue?vue&type=template&id=cc602676");
/* harmony import */ var _Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Template.vue?vue&type=script&lang=js */ "./resources/js/Components/Template.vue?vue&type=script&lang=js");



_Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Template_vue_vue_type_template_id_cc602676__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/Template.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/TestBench.vue":
/*!***********************************************!*\
  !*** ./resources/js/Components/TestBench.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TestBench_vue_vue_type_template_id_0588affa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TestBench.vue?vue&type=template&id=0588affa */ "./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa");
/* harmony import */ var _TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TestBench.vue?vue&type=script&lang=js */ "./resources/js/Components/TestBench.vue?vue&type=script&lang=js");



_TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _TestBench_vue_vue_type_template_id_0588affa__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Components/TestBench.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/CreateAssignment.vue":
/*!*************************************************!*\
  !*** ./resources/js/Pages/CreateAssignment.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateAssignment_vue_vue_type_template_id_12c98212__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateAssignment.vue?vue&type=template&id=12c98212 */ "./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212");
/* harmony import */ var _CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateAssignment.vue?vue&type=script&lang=ts */ "./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts");



_CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.default.render = _CreateAssignment_vue_vue_type_template_id_12c98212__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/CreateAssignment.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Components/Assign.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/Components/Assign.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Assign_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Assign.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/GradeBook.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/Components/GradeBook.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GradeBook_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GradeBook.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ModelSolution_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ModelSolution.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Overview.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/Components/Overview.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Overview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Overview.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/Template.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/Components/Template.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Template_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Template.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/TestBench.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/Components/TestBench.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TestBench_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TestBench.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateAssignment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateAssignment.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Assign_vue_vue_type_template_id_24816f7a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Assign_vue_vue_type_template_id_24816f7a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Assign.vue?vue&type=template&id=24816f7a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Assign.vue?vue&type=template&id=24816f7a");


/***/ }),

/***/ "./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6":
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6 ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GradeBook_vue_vue_type_template_id_39ea6cb6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GradeBook_vue_vue_type_template_id_39ea6cb6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GradeBook.vue?vue&type=template&id=39ea6cb6 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/GradeBook.vue?vue&type=template&id=39ea6cb6");


/***/ }),

/***/ "./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287 ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ModelSolution_vue_vue_type_template_id_3ab3f287__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ModelSolution_vue_vue_type_template_id_3ab3f287__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ModelSolution.vue?vue&type=template&id=3ab3f287 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ModelSolution.vue?vue&type=template&id=3ab3f287");


/***/ }),

/***/ "./resources/js/Components/Overview.vue?vue&type=template&id=7a277644":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Overview.vue?vue&type=template&id=7a277644 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Overview_vue_vue_type_template_id_7a277644__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Overview_vue_vue_type_template_id_7a277644__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Overview.vue?vue&type=template&id=7a277644 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Overview.vue?vue&type=template&id=7a277644");


/***/ }),

/***/ "./resources/js/Components/Template.vue?vue&type=template&id=cc602676":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Template.vue?vue&type=template&id=cc602676 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Template_vue_vue_type_template_id_cc602676__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Template_vue_vue_type_template_id_cc602676__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Template.vue?vue&type=template&id=cc602676 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/Template.vue?vue&type=template&id=cc602676");


/***/ }),

/***/ "./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa":
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TestBench_vue_vue_type_template_id_0588affa__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TestBench_vue_vue_type_template_id_0588affa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TestBench.vue?vue&type=template&id=0588affa */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/TestBench.vue?vue&type=template&id=0588affa");


/***/ }),

/***/ "./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateAssignment_vue_vue_type_template_id_12c98212__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateAssignment_vue_vue_type_template_id_12c98212__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateAssignment.vue?vue&type=template&id=12c98212 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateAssignment.vue?vue&type=template&id=12c98212");


/***/ })

}]);