<template>
  <div>
	  <div class="profile">
		    <img class="pfp" src="this.user.pfp" alt="Profile" id="pfp"/>
			<label for="Name">Name</label>
            <input type="text" v-model="user.name" id=Name disabled>
            <label for="ScreenName">ScreenName</label>
            <input type="text" v-model="user.screen_name" id="ScreenName" disabled>
			<label for="pronouns">Preferred Pronouns</label>
            <input type="text" name="pronouns" id="pronouns" v-model="user.pronouns" disabled>

			<!-- Professor Only-->
			<div class="Professor-Only" v-if="isProf">
				<label for="email">Email</label>
				<input type="email" v-model="user.email" id="email" disabled>
				<label for="FSCID">FSC ID</label>
				<input type="number" v-model="user.fsc_id" id="FSCID" disabled>
				<button class="btn btn-danger btn-block">Upgrade User</button>
				<button class="btn btn-danger btn-block">DownGrade User</button>
				<button class="btn btn-danger btn-block">Delete User</button>
			</div>
	  </div>
  </div>
</template>

<script>
import * as API from "../services/API";
import AuthService from "../services/AuthService";
import store from "../Store/index";
import { useRoute } from "vue-router";
export default {
	data() {
		return {
			user: {
				pfp: "",
				name: "",
				screen_name: "",
				pronouns: "",
				email: "",
				fsc_id: "",
			},
			currentUser: {},
			studentID: "",
		}
	},
	methods: {
		async upgradeUser() {
			console.log("upgrade User");
			//post request
			// var id = this.changeGradeUser;
			// const res = await API.apiClient.post(`/users/elevate/${id}`);
		},
		async downgradeUser() {
			console.log("downgrade User");
		},
		async deleteUser() {
			console.log("delete User");
		},
		async getUser() {
			//api call to get currentUser
			const res = await API.apiClient.get(`/users/${this.studentID}`);
			console.log(res);

			//check if its empty
			if(this.authUser.settings == null) {
				const res = await API.apiClient.post(`/profile/init`);
			}

			// this.user.name = this.currentUser.name;
			// this.user.email = this.currentUser.email;
			// this.user.screen_name = this.currentUser.fsc_user.screen_name;
			// this.user.fsc_id = this.currentUser.fsc_user.fsc_id;
			// this.user.pronouns = this.currentUser.fsc_user.pronouns;

			// this.user.pfp = this.currentUser.pfp_path;
			// if(this.user.pfp == undefined || this.user.pfp == null || this.user.pfp == "") {
			// 	this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
			// }
			// document.getElementById("pfp").src = this.user.pfp;
			//write to check if the picture is loaded...if not then change back to default pfp
		},
	},
	computed: {
		isProf: function () {
			if (store.getters["auth/isProf"] == null) {
				return false;
			} else {
				return store.getters["auth/isProf"];
			}
		},
	},
	async beforeMounted() {
		console.log("route params: " + this.$route.params.fsc_id);
		this.studentID = this.$route.params.fsc_id;
		await this.getUser();
	},
}
</script>

<style>

</style>