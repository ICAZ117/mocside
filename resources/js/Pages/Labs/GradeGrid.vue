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
                        <tr v-for="(problem, key) in grades.labs[index].problems" :key="key" class="lab pointer" :id="'gp' + problem.problemID" :class="problemGradeColor(problem)">
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
	props: ["courseID", "labs", "studentView"],
    emits: [],
    data() {
        return {
            expandedProblem: null,
            student: {},
            grades: {
				grade: 0,
				labs: [],
			},
            problems: {},
			labIDs: [],
			problemIDs: [],
        }
    },
    methods: {
		//lab list work
		async getLabGrades() {
			//get the total grade of the course
			this.grades.grade = JSON.parse(this.student.gradebook_courses).grades[this.courseID];

			//get the ids of the labs the student has worked on/completed
			var studentLabs = JSON.parse(this.student.gradebook_labs)

			//loop over each lab in current course
			for(let i = 0; i < this.labs.length; i++) {
				let l = this.labs[i];

				this.labIDs.push(l.id)

				//add current lab to the local student gradebook
                this.grades.labs.push({
                    grade: studentLabs.grades[l.id],
                    labID: l.id,
                    name: l.name,
                    numProblems: l.num_problems,
                    percentComplete: l.percent,
                    dueDate: l.due_date,
                    total_points: l.total_points,
                });
			}
		},

		//individual lab work
		async getLabProblems(labID) {
			const res = await API.apiClient.get(`/gradebook/${labID}`);
			var labProblems = res.data.data;

			var problems = [];

			this.problemsIDs = labProblems.problems;

			var probs = await this.getProblems(labProblems.problems);


			for(let i = 0; i < labProblems.problems.length; i++) {
				let p = labProblems.problems[i];
				let prob = probs[p];

				problems.push({
					problemID: p,
					name: prob.name,
					test_cases: prob.test_cases,
					passed: prob.passed,
					due_date: prob.due_date,
					worth: prob.worth,
                    grade: labProblems.grades[p]
				});

			}

			//add problems to the lab in grades
			var lab = this.grades.labs.filter(x => x.labID == labID)[0];
			lab.problems = problems;
		},

		async getProblems(problemIDs) {
			var payload = {
				problems: problemIDs,
				labs: this.labIDs
			};
			if(problemIDs.length == 0 || this.labIDs.length == 0) {
				this.problems = {};
				return;
			}

			//make API call and send payload to get said values
			const res = await API.apiClient.post(`/gradebook/worth`, payload);

			//save the total point values into data object
			this.problems = res.data.data.problems;

			return this.problems;
		},


        //labs list work
        async getLabGradeColors() {
            this.grades.labs.forEach(lab => {
                var element = document.getElementById("gl" + lab.labID);
                if(lab.percentComplete == "100%") {
                    //green background
                    element?.classList.add("complete");
                } else if (lab.percentComplete != "0%") {
                    //red background
                    element?.classList.add("incomplete");
                } else {
                    //white background
                    element?.classList.remove("complete");
                    element?.classList.remove("incomplete");
                }
            });
        },

        problemGradeColor(problem) {
            let grade = parseInt((problem.grade /problem.worth) * 10000) * 0.01
            if(grade == 100) return "complete"
            else if(grade != 0) return "incomplete"
            else return ''
        },


		//get the students grades and what not
        async getStudentObject() {
            const res = await API.apiClient.get(`/students/${this.authUser.fsc_user.fsc_id}`);
            this.student = res.data;
        },


        //individual lab work
        //toggling the expanded list of problems
        toggleExpansion(key) {
            if(this.isExpanded(key)) {
                //close
                this.lang = "";
                this.expandedProblem = null;
            } else {
				//get lab's problem details
				this.getLabProblems(key);
                //open
                this.expandedProblem = key;
            }
        },
        isExpanded(key) {
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
                return store.getters["auth/isProf"] && !this.studentView;
            }
        },
    },
    async mounted() {
        await this.getStudentObject();
		await this.getLabGrades();
        await this.getLabGradeColors();
    },
}
</script>

<style>

</style>