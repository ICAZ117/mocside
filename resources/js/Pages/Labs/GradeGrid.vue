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
    props: ["grades"],
    emits: [],
    data() {
        return {
            expandedProblem: null,
        }
    },
    methods: {

        //labs list work
        async getAllGradeColors() {
            console.log(this.grades);
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
        //set the colors of all the graded labs and problems
        await this.getAllGradeColors();
    },
}
</script>

<style>

</style>