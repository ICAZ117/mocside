(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Courses_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************/
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
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      authUser: null,
      enrolledCourses: [],
      courses: [],
      //all courses
      unfilteredCourses: [],
      //the filtered courses
      childIsOpen: false,
      courseID: null,
      username: "",
      rightClickID: "",
      courseName: "",
      filter: true,
      sort: "4",
      showOldCourses: false,
      showDeleteModal: false,
      showEnrollModal: false,
      reloadDeleteModal: 0,
      deletingCourse: {
        id: "",
        course: {},
        key: ""
      },
      ignoreUnmount: false,
      enrollCode: ""
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
    enroll: function enroll() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res, course, currentTime, expirationDate;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/invite/".concat(_this.enrollCode));

              case 2:
                res = _context.sent;
                course = res.data.data;
                console.log(course);

                if (course == null) {
                  console.log("Course not found!");

                  _this.$notify({
                    type: "error",
                    text: "That course enroll code is invalid!"
                  });
                } else {
                  if (course.max_uses != 0 && course.uses >= course.max_uses) {
                    _this.$notify({
                      type: "error",
                      text: "The maximum number of uses for that course enroll code has already been reached!"
                    });
                  } else {
                    currentTime = new Date(new Date().toISOString().split("T")[0] + " " + new Date().toISOString().split("T")[1].split(".")[0]);
                    expirationDate = new Date(course.expire_date);

                    if (currentTime > expirationDate) {
                      _this.$notify({
                        type: "error",
                        text: "That course enroll code has expired!"
                      });
                    } else {
                      _this.$router.push("/" + _this.enrollCode + "/enroll");
                    }
                  }
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    showMenu: function showMenu(course_id) {
      if (this.isProf) {
        this.rightClickID = String(course_id);
        var menu = document.getElementById(this.rightClickID).childNodes[0];
        var outClick = document.getElementById("out-click");
        menu.style.top = "".concat(window.event.pageY, "px");
        menu.style.left = "".concat(window.event.pageX, "px");
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
    addCourse: function addCourse() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var payload, course, gradebook;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = {
                  name: "New Course",
                  description: "New Course",
                  owner_id: _this2.authUser.fsc_user.fsc_id
                };
                _context2.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.post("/courses", payload);

              case 3:
                course = _context2.sent;
                _this2.courseID = course.data.data.id;

                _this2.enrolledCourses.push(_this2.courseID);

                _this2.addProfessor();

                _this2.childIsOpen = true;

                _this2.courses.currentCourses.push(course.data.data);

                _this2.unfilteredCourses.push(course.data.data);

                _this2.sortCourses(4); // init gradebook


                _context2.next = 13;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.post("/gradebook/init/".concat(_this2.courseID), {
                  scope: "course"
                });

              case 13:
                gradebook = _context2.sent;

                _this2.$router.push({
                  name: "EditCourse",
                  params: {
                    course_id: _this2.courseID
                  }
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    addProfessor: function addProfessor() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var payload, prof;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                payload = {
                  courses: JSON.stringify({
                    courses: _this3.enrolledCourses
                  })
                };
                _context3.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.put("/professors/".concat(_this3.authUser.fsc_user.fsc_id), payload);

              case 3:
                prof = _context3.sent;
                return _context3.abrupt("return", prof);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    editCourse: function editCourse(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({
        name: "EditCourse",
        params: {
          course_id: this.courseID
        }
      });
    },
    closeDeleting: function closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting: function deleting(id, course, key) {
      document.getElementById("out-click").style.display = "none";
      this.showDeleteModal = true;
      this.deletingCourse.id = id;
      this.deletingCourse.course = course;
      this.deletingCourse.key = key;
    },
    deleteCourse: function deleteCourse() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var id, course, key, res, i, ind;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _this4.deletingCourse.id;
                course = _this4.deletingCourse.course;
                key = _this4.deletingCourse.key;
                _this4.childIsOpen = false;
                document.getElementById("out-click").style.display = "none"; //delete the course

                _context4.next = 7;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.delete("/courses/".concat(id));

              case 7:
                res = _context4.sent;
                console.log(res);
                console.log("delete Course: " + id);
                ind = null;

                for (i = 0; i <= _this4.enrolledCourses.length; i++) {
                  if (_this4.enrolledCourses[i] == id) {
                    ind = i;
                  }
                }

                _this4.enrolledCourses.splice(ind, 1);

                _this4.addProfessor();

                delete _this4.courses.course;
                _this4.courseID = null; // this.getCourses();
                //delete from unfiltered

                _this4.unfilteredCourses = _this4.unfilteredCourses.filter(function (c) {
                  return c.id != id;
                }); //reset courses lists

                _this4.separateCourses();

                _this4.closeDeleting();

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    goToLabs: function goToLabs(id, name) {
      if (this.rightClickID == "") {
        this.childIsOpen = true;
        this.courseID = id;
        this.courseName = name;
        this.$router.push({
          name: "Labs",
          params: {
            course_id: this.courseID
          }
        });
      }
    },
    pushToLabs: function pushToLabs(params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      var id = params[2];
      var name = params[3];
      this.routeToLabs(courseID, id);
    },
    routeToLabs: function routeToLabs(courseID, labID) {
      //first go to labs page
      console.log("routeToLabs");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs/" + labID + "/problems");
    },
    pushToLabEdit: function pushToLabEdit(params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      var id = params[2];
      var name = params[3];
      this.routeToLabEdit(courseID, id);
    },
    routeToLabEdit: function routeToLabEdit(courseID, labID) {
      console.log("route to lab edit");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs/" + labID + "/edit");
    },
    pushToCourses: function pushToCourses(params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      this.routeToCourses(courseID);
    },
    routeToCourses: function routeToCourses(courseID) {
      console.log("routeToCourses");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs");
    },
    getCourses: function getCourses() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var i, cur, course;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.courses = [];
                _this5.unfilteredCourses = [];
                i = 0;

              case 3:
                if (!(i < _this5.enrolledCourses.length)) {
                  _context5.next = 12;
                  break;
                }

                cur = _this5.enrolledCourses[i];
                _context5.next = 7;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/courses/".concat(cur));

              case 7:
                course = _context5.sent;

                _this5.unfilteredCourses.push(course.data.data); // this.courses.push(course.data.data);


              case 9:
                i++;
                _context5.next = 3;
                break;

              case 12:
                _this5.sortCourses(4);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    filterByDate: function filterByDate() {
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      this.courses = [];

      if (this.filter) {
        //true if the filter is on
        for (var i = 0; i < this.unfilteredCourses.length; i++) {
          if (this.withinDate(this.unfilteredCourses[i])) {
            //if within date
            this.courses.push(this.unfilteredCourses[i]);
          }
        }
      } else {
        //filter is not on...therefore grab all courses
        for (var _i = 0; _i < this.unfilteredCourses.length; _i++) {
          this.courses.push(this.unfilteredCourses[_i]);
        }
      }
    },
    separateCourses: function separateCourses() {
      console.log("HERE"); //grabs only the courses that are currently in session
      //empty the courses list just in case

      var currentCourses = [],
          oldCourses = [];

      for (var i = 0; i < this.unfilteredCourses.length; i++) {
        console.log("Inside for-loop");

        if (this.withinDate(this.unfilteredCourses[i])) {
          //if within date
          console.log("current");
          currentCourses.push(this.unfilteredCourses[i]);
        } else {
          console.log("old");
          oldCourses.push(this.unfilteredCourses[i]);
        }
      }

      console.log(currentCourses);
      console.log(oldCourses);
      this.courses = {
        currentCourses: currentCourses,
        oldCourses: oldCourses
      };
      console.log(this.courses);
    },
    withinDate: function withinDate(course) {
      //return true if the course is still in session
      //false otherwise
      var now = new Date(Date.now());

      if (course.start_date == undefined) {
        return false;
      }

      if (course.end_date == undefined) {
        return false;
      }

      var sd = course.start_date.split("-")[2];
      var sm = course.start_date.split("-")[1] - 1;
      var sy = course.start_date.split("-")[0];
      var ed = course.end_date.split("-")[2];
      var em = course.end_date.split("-")[1] - 1;
      var ey = course.end_date.split("-")[0];
      var start = new Date(sy, sm, sd, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      var end = new Date(ey, em, ed, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

      if (end >= now) {
        //before end of course, day of the end
        if (start <= now) {
          //after start of course, day of start
          return true;
        } else {
          return false;
        }
      } else {
        //after end of course
        return false;
      }
    },
    sortCourses: function sortCourses(type) {
      this.sort = type; //get sort method and call it

      if (this.sort == 0) {
        //startDate
        this.sortByStartDate();
      } else if (this.sort == 1) {
        //endDate
        this.sortByEndDate();
      } else if (this.sort == 2) {
        //nextDueProblem
        this.sortByNextProblemDue();
      } else if (this.sort == 3) {
        //name
        this.sortByName();
      } else {
        //default
        //course ID
        this.sortByID();
      } //call the filter after sorting


      this.separateCourses();
    },
    sortByStartDate: function sortByStartDate() {
      //sorts the filtered results by start date
      this.unfilteredCourses.sort(function (a, b) {
        //if a should be first return -1, 0 for tie, -1 if b first
        var la = a.start_date.split("-");
        var lb = b.start_date.split("-");
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
    },
    sortByEndDate: function sortByEndDate() {
      //sorts the filtered results by end date
      this.unfilteredCourses.sort(function (a, b) {
        //if a should be first return -1, 0 for tie, -1 if b first
        var la = a.end_date.split("-");
        var lb = b.end_date.split("-");
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
    },
    sortByNextProblemDue: function sortByNextProblemDue() {//sorts the filtered results by showing the course with the earliest due problem being first
      //this one is gonna be hard to add
    },
    sortByName: function sortByName() {
      //sorts the filtered results by the course name
      this.unfilteredCourses.sort(function (a, b) {
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
    },
    sortByID: function sortByID() {
      //sorts the filtered results by ID of the course
      //default
      this.unfilteredCourses.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    Unmounting: function Unmounting() {
      if (!this.ignoreUnmount) {
        this.childIsOpen = false;
        this.courseID = null;
        var flag = this.refreshPage();
        console.log("unmounting the labs page");

        if (flag) {
          this.$router.push({
            name: "Courses"
          });
        } else {
          this.routeToChild();
        }
      }

      this.ignoreUnmount = false;
    },
    courseEdited: function courseEdited() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        var course;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ///update the list of courses
                _this6.unfilteredCourses = _this6.unfilteredCourses.filter(function (c) {
                  return c.id != _this6.courseID;
                });
                _context6.next = 3;
                return _services_API__WEBPACK_IMPORTED_MODULE_2__.apiClient.get("/courses/".concat(_this6.courseID));

              case 3:
                course = _context6.sent;

                _this6.unfilteredCourses.push(course.data.data);

                _this6.separateCourses();

                _this6.Unmounting();

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    hasLabAccess: function hasLabAccess(cID) {
      for (var i = 0; i < this.enrolledCourses.length; i++) {
        if (this.enrolledCourses[i] == cID) {
          return true;
        }
      }

      return false;
    },
    hasEditAccess: function hasEditAccess(cID) {
      if (this.isProf) {
        return this.hasLabAccess(cID);
      } else {
        return false;
      }
    },
    routeToChild: function routeToChild() {
      var r = window.location.pathname;
      var sub = "/courses";
      var c = r.substring(sub.length);

      if (c == "") {
        console.log("just on the courses page");
        return true;
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var cID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else

        if (path == "labs") {
          //check if can go there
          if (this.hasLabAccess(cID)) {
            this.goToLabs(cID, "");
          }
        } else if (path == "edit") {
          //check if can go there
          if (this.hasEditAccess(cID)) {
            this.editCourse(cID);
          }
        } else {
          console.log(path);
        }

        return false;
      }
    },
    refreshPage: function refreshPage() {
      var r = window.location.pathname;
      var sub = "/courses";

      if (r == "/") {
        console.log("on home page");
        return false;
      } else if (r == "/profile") {
        return false;
      } else {
        // var c = r.substring(sub.length);
        // if(c != "") {
        //   return false;
        // }
        // causes problem when the user wants to go from says labs back to courses
        return true;
      }
    }
  },
  computed: {
    isProf: function isProf() {
      if (_Store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["auth/isProf"] == null) {
        return false;
      } else {
        return _Store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["auth/isProf"];
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
  mounted: function mounted() {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              console.log("mounted course page");
              _this7.childIsOpen = false;
              _context7.next = 4;
              return _Store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["auth/authUser"];

            case 4:
              _this7.authUser = _context7.sent;
              _this7.username = _this7.authUser.username;
              console.log(_this7.authUser);

              if (_this7.authUser.fsc_user.courses) {
                _this7.enrolledCourses = JSON.parse(_this7.authUser.fsc_user.courses).courses;
              } // var temp = this.enrolledCourses[0];
              // this.enrolledCourses[0] = this.enrolledCourses[1];
              // this.enrolledCourses[1] = temp;


              _context7.next = 10;
              return _this7.getCourses();

            case 10:
              _this7.separateCourses();

              _this7.routeToChild(); // // test of laravel-echo on 10/16/21
              // Echo.channel(`term.${this.authUser.fsc_user.fsc_id}`)
              //   .listen(".console_out", (e) => {
              //     console.log(e);
              //   });


            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2 ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "delete Course"
};
var _hoisted_3 = {
  "class": "delete-buttons"
};
var _hoisted_4 = {
  "class": "enrollModal"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", {
  "for": "enrollCode"
}, "Course Enroll Code:  ", -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "courses header"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "heading"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h2", null, "My Courses"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr")])], -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "navigation"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_10 = {
  "class": "filterSettings"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, "Display Archived Courses: ", -1
/* HOISTED */
);

var _hoisted_12 = {
  "class": "switch"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
  "class": "slider round"
}, null, -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_15 = {
  "class": "dropdown"
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
  "class": "dropbtn fas fa-filter"
}, null, -1
/* HOISTED */
);

var _hoisted_17 = {
  "class": "dropdown-content"
};

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_19 = {
  "class": "coursecontainer"
};
var _hoisted_20 = {
  "class": "courserow row mb-5"
};
var _hoisted_21 = {
  id: "menu"
};
var _hoisted_22 = {
  "class": "menu-item"
};
var _hoisted_23 = {
  "class": "menu-item"
};
var _hoisted_24 = {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
};
var _hoisted_25 = {
  "class": "card coursecard w-100"
};
var _hoisted_26 = {
  "class": "courses card-content"
};
var _hoisted_27 = {
  "class": "card-title my-3 mx-2 mb-0"
};

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "courses my-0"
}, null, -1
/* HOISTED */
);

var _hoisted_29 = {
  key: 0,
  "class": "add-course fixed-course-width"
};

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "card coursecard w-100",
  style: {
    "background-color": "transparent !important"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "courses card-img-add"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"courses card-content\">\n                    <h6 class=\"card-title my-3 mx-2 mb-0\">Add Course</h6>\n                    <hr class=\"courses my-0\" />\n\n                    <a class=\"courselaunch text-danger mx-2 my-1 no-decor\"></a\n                    >\n                  </div> ")])], -1
/* HOISTED */
);

var _hoisted_31 = {
  key: 1,
  "class": "add-course fixed-course-width"
};

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "card coursecard w-100",
  style: {
    "background-color": "transparent !important"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "courses card-img-add"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"courses card-content\">\n                    <h6 class=\"card-title my-3 mx-2 mb-0\">Add Course</h6>\n                    <hr class=\"courses my-0\" />\n\n                    <a class=\"courselaunch text-danger mx-2 my-1 no-decor\"></a\n                    >\n                  </div> ")])], -1
/* HOISTED */
);

var _hoisted_33 = {
  key: 2
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h1", null, "No Registered Courses", -1
/* HOISTED */
);

var _hoisted_35 = {
  key: 0,
  id: "archived-courses",
  style: {
    "width": "100%"
  }
};

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
  "class": "oldCourseHeader"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h4", null, "Archived Courses"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr")], -1
/* HOISTED */
);

var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_38 = {
  id: "course-container",
  "class": "coursecontainer"
};
var _hoisted_39 = {
  "class": "courserow row mb-5"
};
var _hoisted_40 = {
  id: "menu"
};
var _hoisted_41 = {
  "class": "menu-item"
};
var _hoisted_42 = {
  "class": "menu-item"
};
var _hoisted_43 = {
  "class": "width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
};
var _hoisted_44 = {
  "class": "card coursecard w-100"
};
var _hoisted_45 = {
  "class": "courses card-content"
};
var _hoisted_46 = {
  "class": "card-title my-3 mx-2 mb-0"
};

var _hoisted_47 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("hr", {
  "class": "courses my-0"
}, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_vue_final_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("vue-final-modal");

  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Page"), !_ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
    "class": "delete-modal",
    modelValue: _ctx.showDeleteModal,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return _ctx.showDeleteModal = $event;
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
      }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("p", null, "Are you sure you would like to delete " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.deletingCourse.course.name), 1
      /* TEXT */
      ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.closeDeleting();
        })
      }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-md btn-danger delete-button",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $options.deleteCourse();
        })
      }, " Delete ")])])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_vue_final_modal, {
    "class": "delete-modal",
    modelValue: _ctx.showEnrollModal,
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return _ctx.showEnrollModal = $event;
    }),
    classes: "modal-container",
    "content-class": "modal-content delete-modal",
    "esc-to-close": true
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "modal-close",
        onClick: _cache[5] || (_cache[5] = function ($event) {
          return _ctx.showEnrollModal = false;
        })
      }, "x"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_4, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
        id: "enrollCode",
        name: "enrollCode",
        type: "text",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          return _ctx.enrollCode = $event;
        })
      }, null, 512
      /* NEED_PATCH */
      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.enrollCode]]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("button", {
        "class": "btn btn-success btn-md",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $options.enroll();
        })
      }, "Enroll")])];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["modelValue"]), _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.username) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentDirectory), 1
  /* TEXT */
  )]), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_10, [_hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("label", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <input type=\"checkbox\" @change=\"filterByDate()\" v-model=\"filter\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
      return _ctx.showOldCourses = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, _ctx.showOldCourses]]), _hoisted_13]), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_15, [_hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.sortCourses(0);
    }),
    "class": _ctx.sort == 0 ? 'selected' : ''
  }, "Start", 2
  /* CLASS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    onClick: _cache[11] || (_cache[11] = function ($event) {
      return $options.sortCourses(1);
    }),
    "class": _ctx.sort == 1 ? 'selected' : ''
  }, "End", 2
  /* CLASS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    onClick: _cache[12] || (_cache[12] = function ($event) {
      return $options.sortCourses(2);
    }),
    "class": _ctx.sort == 2 ? 'selected' : ''
  }, "Next Problem Due", 2
  /* CLASS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    onClick: _cache[13] || (_cache[13] = function ($event) {
      return $options.sortCourses(3);
    }),
    "class": _ctx.sort == 3 ? 'selected' : ''
  }, "Name", 2
  /* CLASS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $options.sortCourses(4);
    }),
    "class": _ctx.sort == 4 ? 'selected' : ''
  }, "Unsorted", 2
  /* CLASS */
  )])])])]), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_20, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.courses.currentCourses, function (course, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      "class": "fixed-course-width",
      key: course.id,
      course: course
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
      id: course.id,
      onContextmenu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $options.showMenu(course.id);
      }, ["prevent"]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $options.goToLabs(course.id, course.name);
      }, ["prevent"]),
      "class": "no-decor pointer"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("ul", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.editCourse(course.id);
      }
    }, "Edit", 8
    /* PROPS */
    , ["onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isProf]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.deleting(course.id, course, key);
      }
    }, "Delete", 8
    /* PROPS */
    , ["onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isProf]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" :to=\"{ name: 'Labs', params: { id: course.id } }\" "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "courses card-img-top",
      style: {
        backgroundImage: "url(".concat(course.img_loc, ")")
      }
    }, null, 4
    /* STYLE */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h6", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.name), 1
    /* TEXT */
    ), _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <a href=\"Labs.vue\" class=\"courselaunch text-danger mx-2 my-1 no-decor\"\n                      >Get Started</a\n                    > ")])])])], 40
    /* PROPS, HYDRATE_EVENTS */
    , ["id", "onContextmenu", "onClick"])], 8
    /* PROPS */
    , ["course"]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Create New Course as Professor "), $options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
    onClick: _cache[15] || (_cache[15] = function ($event) {
      return $options.addCourse();
    }),
    "class": "no-decor pointer"
  }, [_hoisted_30])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enroll in course as student "), !$options.isProf ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
    onClick: _cache[16] || (_cache[16] = function ($event) {
      return _ctx.showEnrollModal = true;
    }),
    "class": "no-decor pointer"
  }, [_hoisted_32])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.courses.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_33, [_hoisted_34])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), _ctx.showOldCourses ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", _hoisted_35, [_hoisted_36, _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_39, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.courses.oldCourses, function (course, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
      "class": "fixed-course-width",
      key: course.id,
      course: course
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("span", {
      id: course.id,
      onContextmenu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $options.showMenu(course.id);
      }, ["prevent"]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $options.goToLabs(course.id, course.name);
      }, ["prevent"]),
      "class": "no-decor pointer"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("ul", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.editCourse(course.id);
      }
    }, "Edit", 8
    /* PROPS */
    , ["onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isProf]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("li", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("a", {
      "class": "pointer no-decor",
      onClick: function onClick($event) {
        return $options.deleting(course.id, course, key);
      }
    }, "Delete", 8
    /* PROPS */
    , ["onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isProf]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" :to=\"{ name: 'Labs', params: { id: course.id } }\" "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", {
      "class": "courses card-img-top",
      style: {
        backgroundImage: "url(".concat(course.img_loc, ")")
      }
    }, null, 4
    /* STYLE */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)("h6", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(course.name), 1
    /* TEXT */
    ), _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <a href=\"Labs.vue\" class=\"courselaunch text-danger mx-2 my-1 no-decor\"\n                      >Get Started</a\n                    > ")])])])], 40
    /* PROPS, HYDRATE_EVENTS */
    , ["id", "onContextmenu", "onClick"])], 8
    /* PROPS */
    , ["course"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_router_view, {
    key: 1,
    onUnmounting: _cache[17] || (_cache[17] = function ($event) {
      return $options.Unmounting();
    }),
    onCourseEdited: $options.courseEdited,
    onPushToLabs: $options.pushToLabs,
    onStudentView: $options.pushToCourses,
    onEditLab: $options.pushToLabEdit,
    courseID: _ctx.courseID,
    courseName: _ctx.courseName
  }, null, 8
  /* PROPS */
  , ["onCourseEdited", "onPushToLabs", "onStudentView", "onEditLab", "courseID", "courseName"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !_ctx.childIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)("div", {
    key: 0,
    id: "out-click",
    onClick: _cache[18] || (_cache[18] = function () {
      return $options.closeMenu && $options.closeMenu.apply($options, arguments);
    })
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Courses.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Courses.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Courses.vue?vue&type=template&id=38da3fc2 */ "./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2");
/* harmony import */ var _Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Courses.vue?vue&type=script&lang=js */ "./resources/js/Pages/Courses.vue?vue&type=script&lang=js");



_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.render = _Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__.render
/* hot reload */
if (false) {}

_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default.__file = "resources/js/Pages/Courses.vue"

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./resources/js/Pages/Courses.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./resources/js/Pages/Courses.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Courses.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2 ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Courses_vue_vue_type_template_id_38da3fc2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Courses.vue?vue&type=template&id=38da3fc2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Courses.vue?vue&type=template&id=38da3fc2");


/***/ })

}]);