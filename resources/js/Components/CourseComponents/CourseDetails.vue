<template>
    <div class="course-create-form">
        <form @submit.prevent="handleSubmit" class="course-form">
            <div class="flex-100 form-group">
                <label
                for="Course Name"
                class="course-edit-label"
                style="width: 21% !important"
                >Course Name:</label
                >
                <input
                type="text"
                v-model="courseForm.name"
                id="courseName"
                name="courseName"
                class="profile-field course-edit-field"
                style="width: 79% !important"
                />
            </div>
            <br />

            <div class="flex-100 form-group">
                <label
                for="Course Description"
                class="course-edit-label"
                style="width: 29% !important"
                >Course Description:</label
                >
                <input
                type="text"
                v-model="courseForm.description"
                id="courseDescription"
                name="courseDescription"
                class="profile-field course-edit-field"
                style="width: 71% !important"
                />
            </div>
            <br />

            <div class=" flex-100 form-group">
                <label for="Course Dates" class="course-edit-label">Course Dates:</label>
                <div class="row">
                <div class="col-6">
                    <label for="courseDateStart" style="color: darkgray !important"
                    >Start date:&nbsp;</label
                    >
                    <input
                    type="Date"
                    v-model="courseForm.dateStart"
                    id="courseDateStart"
                    name="courseDateStart"
                    class="profile-field course-edit-field"
                    />
                </div>
                <div class="col-6">
                    <label for="courseDateEnd" style="color: darkgray !important"
                    >End date:&nbsp;</label
                    >
                    <input
                    type="Date"
                    v-model="courseForm.dateEnd"
                    id="courseDateEnd"
                    name="courseDateEnd"
                    class="profile-field course-edit-field"
                    />
                </div>
                </div>
            </div>
            <br />
            
            <div class="flex-100" style="display:flex;flex-direction:row;">
                <div class=" flex-50 form-group">
                    <div class="mb-4">
                    <label for="file" class="course-edit-label">Upload Course Image:</label>
                    <br />
                    <input type="file" :accept="['image/*']" @change="fileChange" id="file" />
                    </div>
                </div>

                <div class="flex-50 form-group" style="display:flex;justify-content:end;align-items:center;">
                    <button type="submit" class="btn btn-success btn-block">
                    Save Changes
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import * as API from "../../services/API";
import { getError } from "../../utils/helpers";
import FileService from "../../services/FileService";
import FlashMessage from "../../Components/FlashMessage";
import FileUpload from "../../Components/FileUpload";
export default {
    props: ["course"],
    components: {
        FlashMessage,
        FileUpload,
    },
    data() {
        return {
            error: null,
            message: null,
            isSubmitted: false,
            file: null,
            endpoint: "/images/store",
            courseForm: {
                name: "",
                description: "",
                img: "",
                dateStart: "",
                dateEnd: "",
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.isSubmitted = true;
            await this.uploadImage();
            var payload = {
                name: this.courseForm.name,
                description: this.courseForm.description,
                img_loc: this.courseForm.img,
                start_date: this.courseForm.dateStart,
                end_date: this.courseForm.dateEnd,
            };
            const res = await API.apiClient.put(`/courses/${this.course.id}`, payload);
            this.$router.push({
                name: "Courses",
            });
        },
        fileChange(event) {
            this.clearMessage();
            this.file = event.target.files[0];
        },
        clearMessage() {
            this.error = null;
            this.message = null;
        },
        async uploadImage() {
            if (this.file != null) {
                const payload = {};
                const formData = new FormData();
                formData.append("file", this.file);
                payload.file = formData;
                payload.endpoint = this.endpoint;
                this.clearMessage();
                try {
                    const response = await FileService.uploadFile(payload);
                    this.message = "File uploaded.";
                    this.courseForm.img = response.data.asset_link;
                } catch (error) {
                    this.error = getError(error);
                }
            }
        },
    },
    mounted() {
        this.courseForm.name = this.course.name;
        this.courseForm.description = this.course.description;
        this.courseForm.img = this.course.img_loc;
        this.courseForm.dateStart = this.course.start_date;
        this.courseForm.dateEnd = this.course.end_date;
    },
}
</script>

<style>

</style>