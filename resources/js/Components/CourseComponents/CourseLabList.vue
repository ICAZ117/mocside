<template>
    <div class="lablist">
        <label for="Course Labs" class="course-edit-label flex-100">Course Labs</label>
        <table class="table courselab">
            <thead class="labtable-head">
                <tr>
                    <th>Title</th>
                    <th># Problems</th>
                    <th>Due Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(lab, key) in labs" :key="lab.id">
                    <tr
                        class="lab-row"
                        @click.prevent="goToProblems(lab.id, lab.name)"
                    >
                        <td>
                            <a>{{ lab.name }}</a>
                        </td>
                        <td>{{ lab.num_problems }}</td>
                        <td>{{ lab.due_date }}</td>
                        <td>
                            <a @click="editLab(lab.id, lab.name)">...</a>
                            <a @click="deleting(lab.id, lab, key)">X</a>
                        </td>
                        <td>
                            <a @click="editLab(lab.id, lab.name)" class="courselaunch text-primary mx-2 my-1 no-decor pointer" title="Edit Lab">
                                <i class="fas fa-copy"></i>
                            </a>
                            <a @click="deleting(lab.id, lab, key)" class="courselaunch text-danger mx-2 my-1 no-decor pointer" title="Delete Lab">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </td>
                    </tr>
                </template>
                <tr class="lab-row" @click="addLab">
                    <td colspan="5">Add Lab</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import * as API from "../../services/API";
import { sort } from "../../services/Sort";
export default {
    props: ["courseID"],
    data() {
        return {
            labs: [],
        }
    },
    methods: {
        async fetchLabs() {
            const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
            // this.labs = rawLabs.data.data;
            this.labs = rawLabs.data.data;
            await this.sortLabs();
        },
        sortLabs() {
            this.labs = sort(4, this.labs);
        },
        goToProblems(id, name) {
            this.$router.push({
                name: "Problems",
                params: {
                    courseID: this.courseID,
                    labID: id,
                    labName: name,
                }
            });
        },
        editLab() {
            console.log("add edit lab")
        },
        deleting() {
            console.log("add deleting code")
        },
        addLab() {
            console.log("add adding lab code")
        }
    },
    async mounted() {
        await this.fetchLabs();
    }
}
</script>

<style>

</style>