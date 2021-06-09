<template>
  <div>
	  <ul class='tabs__header'>
		  <li v-for="tab in tabs" :key='tab.title'>
			  {{ tab.title }}
		  </li>
	  </ul>
	  <slot></slot>
  </div>
</template>

<script>
export default {
	data() {
		return {
			selectedIndex: 0,
			tabs: [],
		}
	},
	created() {
		this.tabs = this.$children;
	}

}
</script>

<style>

</style>