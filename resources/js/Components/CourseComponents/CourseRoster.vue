<template>
    <div class="form-group">
        <button @click="studentView()" class="btn btn-danger btn-block">
            Student View
        </button>
        <label for="Course Roster" class="course-edit-label">Course Roster</label>
        <ul>
            <li v-for="student in students" :key="student.id">
                {{ student.name }} {{ student.fsc_user.fsc_id }} {{ student.email }}
                {{
                Math.floor(
                    (JSON.parse(course.gradebook).grades[student.fsc_user.fsc_id] /
                    course.worth) *
                    100 *
                    100
                ) / 100
                }}%
                <!-- <a @click="removeStudent(student, key)">X</a> -->
            </li>
        </ul>
        <div class="roster">
            <table class="table roster">
                <thead class="roster-head">
                    <tr>
                        <th>Name</th>
                        <th>FSC-ID</th>
                        <th>Email</th>
                        <th>Course Grade</th>
                        <!-- <th></th> -->
                    </tr>
                </thead>
                <tbody>
                    <template v-for="student in students" :key="student.id">
                        <tr class="roster-row">
                            <td>{{ student.name }}</td>
                            <td>{{ student.fsc_user.fsc_id }}</td>
                            <td>{{ student.email }}</td>
                            <td>{{ Math.floor((JSON.parse(course.gradebook).grades[student.fsc_user.fsc_id] /course.worth) *100 *100) / 100 }}%</td>
                            <!-- <td>
                                <a @click="removeStudent(student, key)" title="Drop Student From Course">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td> -->
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import * as API from "../../services/API";
export default {
    props: ["course"],
    data() {
        return {
            students: [],
            rosterIDs: [],
        }
    },
    methods: {
        async fetchStudents() {
            console.log(this.course.roster)
            this.rosterIDs = JSON.parse(this.course.roster).roster;
            for (let i = 0; i < this.rosterIDs.length; i++) {
                const res = await API.apiClient.get(`/students/${this.rosterIDs[i]}`);
                this.students.push(res.data.data);
            }
        },
        async getStudent() {
            console.log("fix getStudent")
            // return await API.apiClient.get(`/students/${this.studentID}`);
        },
        async addStudent() {
            console.log("fix addStudent")
            // try {
            //     const stud = await this.getStudent();
            //     this.courseForm.roster.push(this.studentID);
            //     const res = await this.updateRoster();
            //     var courses = JSON.parse(stud.data.data.fsc_user.courses).courses;
            //     courses.push(this.courseID);
            //     const res2 = await this.updateStudentCourses(courses);
            //     //at end add to the students list
            //     this.students.push(stud.data.data);
            // } catch (error) {
            // }
        },
        async removeStudent(student, index) {
            //remove student ID from course's roster list
            console.log("fix remove student")
            // var roster = JSON.parse(this.course.roster).roster;
            // for (let i = 0; i < roster.length; i++) {
            //     if (roster[i] == student.fsc_user.fsc_id) {
            //         roster.splice(i, 1);
            //         break;
            //     }
            // }
            // const res = await this.updateRoster();
            // //remove course ID from student's courses list
            // var courses = JSON.parse(student.fsc_user.courses).courses;
            // for (let i = 0; i < courses.length; i++) {
            //     if (courses[i] == this.course.id) {
            //         courses.splice(i, 1);
            //         break;
            //     }
            // }
            // const res2 = await this.updateStudentCourses(courses);
            // //remove student object from list
            // this.students = this.students.filter((user, i) => i != index);
        },
        studentView() {
            //adjust to new route version
            console.log("fix this studentView")
            // this.$emit("studentView", [this.courseID, this.course.name]);
        },
        async updateRoster() {
            console.log("fix updateRoster")
            // var payload = {
            //     roster: JSON.stringify({ roster: this.courseForm.roster }),
            // };
            // return await API.apiClient.put(`/courses/${this.courseID}`, payload);
        },
        async updateStudentCourses(courses) {
            console.log("Fix student courses")
            // payload = {
            //     courses: JSON.stringify({ courses: courses }),
            // };
            // return await API.apiClient.put(`/students/${stud.data.data.fsc_user.fsc_id}`, payload);
        },
    },
    async mounted() {
        await this.fetchStudents();
    }

}
</script>

<style>

</style>