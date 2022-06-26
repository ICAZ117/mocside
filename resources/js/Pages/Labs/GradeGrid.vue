<template>
    <div
        style="
        border: 1px solid #9e9e9e !important;
        padding: 0 !important;
        width: min-content !important;
        margin: 2rem 2rem 2rem 2rem !important;
        "
    >
        <table class="table problemtable" style="margin: 0 !important">
        <thead class="problemtable" style="border: none !important">
            <tr>
            <th><i class="fas fa-grin-alt spacer"></i></th>
            <th>Lab Name</th>
            <th># Problems</th>
            <th>% Complete</th>
            <th>Due Date</th>
            <th>Points Earned</th>
            <th>Points Possible</th>
            <th>Grade Percentage</th>
            </tr>
        </thead>
        <tbody>
            <!-- Loop over all LABS -->
            <template v-for="(lab, index) in grades.labs" :key="index">
            <!-- Regular table row -->
            <tr class="problem pointer" :id="'gl' + lab.labID" @click="toggleExpansion(lab.labID)">
                <td v-if="!isExpanded(lab.labID)">
                <i class="fas fa-chevron-right"></i>
                </td>
                <td v-if="isExpanded(lab.labID)">
                <i class="fas fa-chevron-down"></i>
                </td>
                <td>{{ lab.name }}</td>
                <td>{{ lab.numProblems }}</td>
                <td>{{ lab.percentComplete }}</td>
                <td>{{ lab.dueDate }}</td>
                <td>{{ lab.grade == undefined ? "--" : lab.grade }}</td>
                <td>{{ lab.total_points }}</td>
                <td>
                {{
                    lab.total_points == 0
                    ? 0
                    : lab.grade == undefined
                    ? 0
                    : parseInt((lab.grade / lab.total_points) * 10000) *
                        0.01
                }}%
                </td>
            </tr>

            <!-- Dropdown table row -->
            <tr class="lab-tableDrop" v-show="isExpanded(lab.labID)">
                <td class="description-data" colspan="8">
                <div
                    style="
                    border: 1px solid #9e9e9e !important;
                    border-right: none !important;
                    padding: 0 !important;
                    margin: 0.5rem 1rem 0.5rem 1rem !important;
                    "
                >
                    <table
                    class="table"
                    style="margin: 0; width: -webkit-fill-available"
                    >
                    <thead class="labtable">
                        <tr>
                        <th>Title</th>
                        <th># Test Cases</th>
                        <th># Test Cases Passed</th>
                        <th>Due Date</th>
                        <th>Points Earned</th>
                        <th>Points Possible</th>
                        <th>Grade Percentage</th>
                        </tr>
                    </thead>
                    <tbody style="border-bottom: 0 !important">
                        <tr v-for="(problem, key) in grades.labs[index].problems" :key="key" class="lab pointer" :id="'gp' + problem.problemID">
                        <td>{{ problem.name }}</td>
                        <td>
                            {{ problem.test_cases }}
                        </td>
                        <td>{{ problem.passed }}</td>
                        <td>{{ problem.due_date }}</td>
                        <td>{{ problem.grade }}</td>
                        <td>{{ problem.worth }}</td>
                        <td>
                            {{
                            problem.worth == 0
                                ? 0
                                : problem.grade == undefined
                                ? 0
                                : parseInt(
                                    (problem.grade /
                                    problem.worth) *
                                    10000
                                ) * 0.01
                            }}%
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </td>
            </tr>
            </template>
        </tbody>
        </table>
    </div>
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
export default {
    props: ["courseID", "labs"],
    emits: [],
    data() {
        return {
            expandedProblem: null,
            student: {},
            grades: {},
            problems: {},
        }
    },
    methods: {

        //labs list work
        async getAllGradeColors() {
            this.grades.labs.forEach(lab => {
                var element = document.getElementById("gl" + lab.labID);
                if(lab.percentComplete == "100%") {
                    //green background
                    element.classList.add("complete");
                } else if (lab.percentComplete != "0%") {
                    //red background
                    element.classList.add("incomplete");
                } else {
                    //white background
                    element.classList.remove("complete");
                    element.classList.remove("incomplete");
                }


                //get colors for each labs list of problems
                lab.problems.forEach(problem => {
                    var elementp = document.getElementById("gp" + problem.problemID);
                    if(problem.grade == 100){
                        //green background
                        elementp.classList.add("complete");
                    } else if(problem.grade != 0) {
                        //red background
                        elementp.classList.add("incomplete");
                    } else {
                        //white background
                        elementp.classList.remove("complete");
                        elementp.classList.remove("incomplete");
                    }
                });
            });
        },


        //user related functions
        async getGrades() {
			console.log("get grades")
            // initialize local student gradebook
            var grades = { grade: 0, labs: [] };

            //logging lists for payload later
            var labIDs = [], problemIDs = [];

            //get total grade for course
			let tmp = (JSON.parse(this.student.gradebook_courses).grades)
			console.log(this.courseID)
			console.log(tmp[this.courseID])
            grades.grade = JSON.parse(this.student.gradebook_courses).grades[this.courseID];
			console.log(grades.grade)

            //get all labs the student is in
            var studentLabs = JSON.parse(this.student.gradebook_labs);
			console.log(studentLabs)


            //loop over all of the labs in the current course
			console.log(this.labs)
            await this.labs.forEach(async l => {
                //get all problems in current lab
                const problemsInLabres = await API.apiClient.get(`/gradebook/${l.id}`);
                var problemsInLab = problemsInLabres.data.data;

                //keep labID for later usage
                labIDs.push(l.id);

                //init problems list
                var problems = [];

                //loop over all problems within current lab
                problemsInLab.problems.forEach(p => {
                    //fill problems list with objects containing problemID's and grades
                    problems.push({ 
                        problemID: p,
                        grade: problemsInLab.grades[p]
                    });

                    //keep problemID for later usage
                    problemIDs.push(p);
                });

                //add current lab to the local student gradebook
                grades.labs.push({
                    grade: studentLabs.grades[l.id],
                    labID: l.id,
                    name: l.name,
                    numProblems: l.num_problems,
                    percentComplete: l.percent,
                    dueDate: l.due_date,
                    total_points: l.total_points,
                    problems: problems,
                });
            });

            //set the vue data value
            this.grades = grades;

            //create payload to get total lab/problem values
            var payload = {
                problems: problemIDs,
                labs: labIDs,
            };
            if (problemIDs.length == 0 || labID.length == 0) {
                this.problems = {};
                return;
            }

            //make API call and send payload to get said values
            const res = await API.apiClient.post(`/gradebook/worth`, payload);


            //save the total point values into data object
            this.problems = res.data.data.problems;
        },

        async getStudentObject() {
            const res = await API.apiClient.get(`/students/${this.authUser.fsc_user.fsc_id}`);
            this.student = res.data;
        },


        //individual lab work
        //toggling the expanded list of problems
        toggleExpansion(key) {
            if(this.isExapanded(key)) {
                //close
                this.lang = "";
                this.expandedProblem = null;
            } else {
                //open
                this.expandedProblem = key;
            }
        },
        isExapanded(key) {
            return this.expandedProblem == key;
        },
    },
    computed: {
        authUser: function() {
            return store.getters["auth/authUser"];
        },
        isProf: function() {
            if (store.getters["auth/isProf"] == null) {
                return false;
            } else {
                return store.getters["auth/isProf"];
            }
        },
    },
    async mounted() {
		console.log("mounted")
        //set the colors of all the graded labs and problems
        await this.getStudentObject();
        await this.getGrades();
        await this.getAllGradeColors();
    },
}
</script>

<style>

</style>