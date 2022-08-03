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
                            <td>{{ localDate(k.expire_date)}}</td>
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
        <div class="create-key flex">
            <div class="key-options flex-row">
                <div class="flex-nowrap flex-row" style="margin-bottom: 1rem;">
                    <div>
                        <label class="keygen-label">Enroll Key</label>
                        <br>
                        <input
                            placeholder="Random"
                            type="text"
                            v-model="enrollKey.key"
                            class="profile-field course-edit-field"
                        />
                    </div>
                    <div style="display: flex; padding-top: 1.5rem;">
                        <label class="switch" style="align-self:center;margin-right:3px;">
                            <input type="checkbox" v-model="enrollKey.perm" @click="togglePerm()"/>
                            <span class="slider round"></span>
                        </label>
                        <label class="keygen-label-perm" style="margin-top: -1rem;">Permanent Key</label>
                    </div>
                </div>
               
                <div class="flex flex-row" style="margin-bottom: 1rem;">
                    <div class="flex flex-row" style="margin-bottom: 1rem;">
                        <div class="flex-50">
                            <label class="keygen-label" :class="{ dull : enrollKey.perm }">Expire Date</label>
                            <br>
                            <input type="date" class="date-field" id="expireDate" name="expireDate" :class="{ dull : enrollKey.perm }" :disabled="enrollKey.perm" v-model="enrollKey.datetime" />
                        </div>
                        <div class="flex-50">
                            <label class="keygen-label" :class="{ dull : enrollKey.perm }">Expire Time</label>
                            <br>
                            <input type="time" class="time-field" id="expireTime" name="expireTime" :class="{ dull : enrollKey.perm }" :disabled="enrollKey.perm" v-model="enrollKey.time" />
                        </div>
                    </div>                    
                    
                    <div class="flex-row">
                        <label class="keygen-label">Max Uses</label>
                        <br>
                        <input
                            placeholder="0 for unlimited use"
                            type="text"
                            v-model="enrollKey.uses"
                            class="profile-field course-edit-field"
                        />
                    </div>
                </div>
                <div class="gen-button flex-row">
                    <button type="button" @click="generateKey" class="btn btn-danger btn-block gen-button">
                        Generate Key
                    </button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import * as API from "../../services/API";
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
        togglePerm() {
            this.enrollKey.perm = !this.enrollKey.perm;
        },
        localDate(date) {
            if(!date || !date.includes('-')) return date
            date = date.split(" ")[0]
            const [y, m, d] = date.toString().split('-')
            return m + '/' + d + '/' + y;
        }
    },
    async mounted() {
        await this.fetchKeys();
    }
}
</script>

<style>

</style>