<template>
    <div class=" keygen form-group">
        <div class="key-list">
            <table class="table keygen">
                <thead class="keygen-head">
                    <tr>
                        <th>Key</th>
                        <th>Uses</th>
                        <th>Expire Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(k, id) in joinKeys" :key="k">
                        <tr class="key-row">
                            <td>{{ k.join_key }}</td>
                            <td>{{ k.max_uses == 0 ? '∞' : k.max_uses - k.uses }}</td>
                            <td>{{ k.expire_date }}</td>
                            <td>
                                <a @click="copyKey(k)" class="courselaunch text-primary mx-2 my-1 no-decor pointer" title="Copy Key">
                                    <i class="fas fa-copy"></i>
                                </a>
                                <a @click="deleteKey(k, id)" class="courselaunch text-danger mx-2 my-1 no-decor pointer" title="Delete Key">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="create-key">
            <div class="key-options">
            <label class="course-edit-label">Enroll Key</label>
            <input
                placeholder="Random"
                type="text"
                v-model="enrollKey.key"
                class="profile-field course-edit-field"
            />
            <br />
            <label class="course-edit-label">Permanent Key</label>
            <label class="switch">
                <input type="checkbox" v-model="enrollKey.perm" />
                <span class="slider round"></span>
            </label>
            <br />
            <label class="course-edit-label">Expire Date</label>
            <input type="date" :disabled="enrollKey.perm" v-model="enrollKey.datetime" />
            <br />
            <label>Expire Time</label>
            <input type="time" :disabled="enrollKey.perm" v-model="enrollKey.time" />
            <br />
            <label class="course-edit-label">Max Uses</label>
            <input
                placeholder="0 for unlimited use"
                type="text"
                v-model="enrollKey.uses"
                class="profile-field course-edit-field"
            />
            </div>
            <button type="button" @click="generateKey" class="btn btn-danger btn-block">
            Generate Course Enroll Key
            </button>
        </div>
    </div>
</template>

<script>
import * as API from "../services/API";
export default {
    props: ["courseID", "courseEnd"],
    data() {
        return {
            enrollKey: {
                key: "",
                perm: true,
                datetime: "",
                time: "",
                uses: "",
            },
            joinKeys: [],
            keyURL: "",
        }
    },
    methods: {
        async fetchKeys() {
            const res = await API.apiClient.get(`/invite/course/${this.courseID}`);
            var myArr = res.data.data;
            for (let i = 0; i < myArr.length; i++) {
                this.joinKeys.push(myArr[i]);
            }
        },
        copyKey(key) {
            this.keyURL = "http://mocside.com:8000/" + key.join_key + "/enroll";
            //copy to clipboard
            var copyText = this.keyURL;
            const textarea = document.createElement("textarea");
            textarea.value = copyText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        },
        async deleteKey(key, id) {
            //call delete api method
            const res = await API.apiClient.delete(`/invite/${key.id}`);
            //filter from front end
            this.joinKeys = this.joinKeys.filter((k, i) => i != id);
        },
        async generateKey() {
            var payload = {};
            if (this.enrollKey.key == "") {
                this.enrollKey.key = "random";
            }
            payload["join_key"] = this.enrollKey.key;
            payload["course_id"] = this.courseID;
            const res = await API.apiClient.post(`/invite`, payload);
            var keyCode = res.data.data.id;
            payload["join_key"] = res.data.data.join_key;
            if (this.enrollKey.perm) {
                //get end time of course
                payload["expire_date"] = this.courseEnd;
            } else {
                //expire date is set to datetime
                payload["expire_date"] = this.enrollKey.datetime + " " + this.enrollKey.time;
            }
            if (this.enrollKey.uses == "") {
                this.enrollKey.uses = 0;
            }
            payload["max_uses"] = this.enrollKey.uses;
            const res2 = await API.apiClient.put(`/invite/${keyCode}`, payload);
            this.joinKeys.push(res2.data.data);
        },
    },
    async mounted() {
        await this.fetchKeys();
    }
}
</script>

<style>

</style>