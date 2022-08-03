<template>
  <div class="darkBG">
	  <div class="row h-100">
		  <div class="col-3" style="border-right: 1px var(--FSCgrey) solid !important">
			  <div class="profile-picture">
				  <img src="this.user.pfp" alt="Profile" class="large-pfp" id="pfp">
				  <br>
			  </div>
		  </div>
		  <div class="col-9 settings" style="padding: 50px !important; height: 100%; color: #888">
			  <div class="profile-section">
				  <div class="editable">
					  <h3>Profile Options</h3>
					  <div class="row">
						  <div class="col-6">
							  <label for="Name">Name: </label>
							  <input class="profile-field" type="text" v-model="user.name" id="Name"/>
							  <br /><br />
							  <label for="pronouns">Preferred Pronouns: </label>
							  <input type="text" class="profile-field" name="pronouns" id="pronouns" v-model="user.pronouns">
						  </div>
						  <div class="col-6">
							  <label for="ScreenName">ScreenName: </label>
							  <input class="profile-field" type="text" v-model="user.screen_name" id="ScreenName">
							  <br /><br />
						  </div>
					  </div>
				  </div>
			  </div>
			  <br /><br />
			  <hr>
			  <br /><br />
			  <div v-if="isProf" class="professor-section">
				  <h3>Edit Student</h3>
				  <div class="row">
					  <div class="col-6">
						  <label for="FSCID">FSC ID: </label>
						  <input class="profile-field" type="number" v-model="user.fsc_id" id="FSCID" disabled>
						  <br /><br />
					  </div>
					  <div class="col-6">
						  <label for="email">Email: </label>
						  <input class="profile-field" type="email" v-model="user.email" name="email" id="email" disabled>
						  <br /><br />
					  </div>
				  </div>
				  <br><br>
				  <hr>
				  <br><br>
				  <div class="row">
					  <div class="col-6 justify-content-between">
						  <button @click="upgradeUser()" class="btn btn-danger btn-block">Upgrade User</button>
						  <button @click="downgradeUser()" class="btn btn-danger btn-block">DownGrade User</button>
					  </div>
					  <div class="col-6">
						  <button @click="deleteUser()" class="btn btn-danger btn-block">Delete User</button>
					  </div>
				  </div>
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
import * as API from "../services/API";
import AuthService from "../services/AuthService";
import store from "../Store/index";

export default {
	props: ['fsc_id'],
	data() {
		return {
			currentUser: {},
			userDisplay: {
				pfp: "",
				name: "",
				screen_name: "",
				pronouns: "",
				email: "",
				fsc_id: "",
			}
		}
	},
	methods: {
		//get User Profile
		async fetchUser() {
			const res = await API.apiClient.get(`/users/profile/${this.fsc_id}`);
			this.currentUser = res.data.data;

			await this.setupSettings();
		},
		//check if new profile
		async setupSettings() {
			if(this.currentUser.settings == null) {
				const res = await API.apiClient.post(`/profile/init`);

				this.currentUser = await API.apiClient.get(`/users/profile/${this.fsc_id}`).data.data;
			}

			this.setDisplayUser();
		},
		//set display user
		setDisplayUser() {
			this.userDisplay.name = this.currentUser.name;
			this.userDisplay.email = this.currentUser.email
			this.userDisplay.screen_name = this.currentUser.fsc_user.screen_name;
			this.user.fsc_id = this.currentUser.fsc_user.fsc_id;
			this.user.pronouns = this.currentUser.fsc_user.pronouns;

			this.user.pfp = this.currentUser.pfp_path;
			if(this.user.pfp == undefined || this.user.pfp == null || this.user.pfp == "") {
				this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
			}

			document.getElementById("pfp").src = this.user.pfp;

			//TODO: check if picture loaded, otherwise set back to default pfp

		},


		//USER control Level
		//upgrade user to professor
		async upgradeUser() {
			const res = await API.apiClient.post(`/users/elevate/${this.fsc_id}`);
		},
		//downgrade user to student
		async downgradeUser() {
			const res = await API.apiClient.post(`/users/downgrade/${this.fsc_id}`);
		},

		//delete User
		async deleteUser() {
		},
	},
	computed: {
		isProf: function() {
			if(store.getters["auth/isProf"] == null) return false;
			return store.getters["auth/isProf"];
		}
	},
	mounted() {
		this.fetchUser();
	},
}
</script>

<style>

</style>