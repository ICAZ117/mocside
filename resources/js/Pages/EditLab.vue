<template>
  
</template>

<script>
export default {
	props: ['labID'],
	emits: ["unmounting"],
	data() {
		return {
			error: null,
		}
	},
	methods: {

	},
	mounted() {
		console.log("mounted edit lab");
	},
	beforeUnmount() {
		this.$emit("unmounting");
	},

}
</script>

<style>

</style>