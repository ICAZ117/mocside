<template>
    <div class="roster form-group">
        <label for="Course Roster" class="course-edit-label flex-100">Course Roster</label>
        <div class="roster-list flex-row">
            <table class="table roster">
                <thead class="roster-head">
                    <tr>
                        <th>Name</th>
                        <th>FSC-ID</th>
                        <th>Email</th>
                        <th>Course Grade</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="student in students" :key="student.id">
                        <tr class="roster-row">
                            <td>{{ student.name }}</td>
                            <td>{{ student.fsc_user.fsc_id }}</td>
                            <td>{{ student.email }}</td>
                            <td>{{ Math.floor((JSON.parse(course.gradebook).grades[student.fsc_user.fsc_id] /course.worth) *100 *100) / 100 }}%</td>
                            <td>
                                <a @click="removeStudent(student, key)" title="Drop Student From Course">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="student-view-btn flex-row" style="display: flex; justify-content: space-between;">
            
			<div>
				<input type="text" v-model="newStudentID" id="newStudent" name="newStudent" class="profile-field course-edit-field" style="margin-right:1rem;">
				<button type="button" @click="addStudent()" class="btn btn-danger btn-block add-student-btn">
					Add Student
				</button>
			</div>
            <button type="button" @click="studentView()" class="btn btn-danger btn-block student-view-btn">
                Student View
            </button>
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
			newStudentID: null,
        }
    },
    methods: {
        async fetchStudents() {
            this.rosterIDs = JSON.parse(this.course.roster).roster;
            for (let i = 0; i < this.rosterIDs.length; i++) {
                const res = await API.apiClient.get(`/students/${this.rosterIDs[i]}`);
                this.students.push(res.data.data);
            }
        },
        async getStudent() {
            return await API.apiClient.get(`/students/${this.newStudentID}`);
        },
        async addStudent() {
            try {
				var payload = {
					course_id: this.course.id,
				}
				const res = await API.apiClient.post(`/invite/add/${this.newStudentID}`, payload);

                if(res.status == 200) {
                    const stud = await this.getStudent();

                    if(stud == null) return;

                    //add to student list
                    this.students.push(stud.data.data);
                    this.newStudentID = null;

                } else {
                    console.log("Error adding student")
                }
            } catch (error) {
				console.log(error);
            }
        },
        async removeStudent(student, index) {
            //remove student ID from course's roster list
            for (let i = 0; i < this.rosterIDs.length; i++) {
                if (this.rosterIDs[i] == student.fsc_user.fsc_id) {
                    this.rosterIDs.splice(i, 1);
                    break;
                }
            }
            //remove the student from the roster list
            const res = await this.updateRoster();

            //remove course ID from student's courses list
            var courses = JSON.parse(student.fsc_user.courses).courses;
            for (let i = 0; i < courses.length; i++) {
                if (courses[i] == this.course.id) {
                    courses.splice(i, 1);
                    break;
                }
            }
            //remove the course id from the student
            const res2 = await this.updateStudentCourses(courses, student);

            //remove student object from list
            this.students = this.students.filter((user) => user.id != student.id);
        },
        studentView() {
            this.$router.push({name: 'Labs', params: {courseID: this.course.id, courseName: this.course.name, studentView: true }});
        },
        async updateRoster() {
            var payload = {
                roster: JSON.stringify({ roster: this.rosterIDs }),
            };
            return await API.apiClient.put(`/courses/${this.course.id}`, payload);
        },
        async updateStudentCourses(courses, student) {
            var payload = {
                courses: JSON.stringify({ courses: courses }),
            };
            return await API.apiClient.put(`/students/${student.fsc_user.fsc_id}`, payload);
        },
    },
    async mounted() {
        await this.fetchStudents();
    }

}
</script>

<style>

</style>