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
                            <a @click.stop="editLab(lab.id)" class="courselaunch text-primary mx-2 my-1 no-decor pointer" title="Edit Lab">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a @click.stop="deleting(lab.id, lab, key)" class="courselaunch text-danger mx-2 my-1 no-decor pointer" title="Delete Lab">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </td>
                    </tr>
                </template>
                <tr class="lab-row add-row" @click="addLab">
                    <td colspan="5">Add Lab</td>
                </tr>
            </tbody>
        </table>
    </div>
    <vue-final-modal
      v-model="showDeleteModal"
      classes="modal-container"
      content-class="modal-content"
      :esc-to-close="true"
    >
      <button class="modal-close" @click="closeDeleting()">x</button>
      <div class="delete Course">
        <p>Are you sure you would like to delete {{ deletingLab.lab.name }}</p>
        <button class="btn btn-md btn-danger" @click="closeDeleting()">Cancel</button>
        <button class="btn btn-md btn-danger" @click="removeLab()">Delete</button>
      </div>
    </vue-final-modal>
</template>

<script>
import * as API from "../../services/API";
import { sort } from "../../services/Sort";
export default {
    props: ["courseID"],
    data() {
        return {
            labs: [],
            showDeleteModal: false,
            reloadDeleteModal: 0,
            deletingLab: {
                id: "",
                lab: "",
                key: "",
            },
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
        async editLab(labID) {
            this.$router.push({ name: "EditLab", params: { courseID: this.courseID, labID: labID } });
        },
        closeDeleting() {
            this.showDeleteModal = false;
        },
        deleting(id, lab, key) {
            this.showDeleteModal = true;
            this.deletingLab.id = id;
            this.deletingLab.lab = lab;
            this.deletingLab.key = key;
        },
        async removeLab() {
            var id = this.deletingLab.id;
            var key = this.deletingLab.key;

            const res = await API.apiClient.delete(`/labs/${id}`);

            //filter from labs
            this.labs = this.labs.filter((l, i) => i != key);
            this.closeDeleting();
        },
        async addLab() {
            var today = new Date(Date.now())
            var payload = {
                name: "New Lab",
                description: "New Lab",
                course_id: this.courseID,
                due_date: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
            };
            const lab = await API.apiClient.post(`/labs`, payload);
            this.labs.push(lab.data.data);
            this.sortLabs();
        }
    },
    watch: {
        showDeleteModal: function() {
            if(!this.showDeleteModal) {
                this.reloadDeleteModal++;
            }
        }
    },
    async mounted() {
        await this.fetchLabs();
    }
}
</script>

<style>

</style>