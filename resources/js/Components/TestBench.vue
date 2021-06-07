<template>
  <div class="create-assignment">
    <div class="row test-cases">
      <div v-for="i in 12" :key="i" class="tc-card col-1">
        <div class="tc-card-title">
          <p>tc{{ i }}</p>
        </div>

        <div class="tc-card-body">
          <p>
            Input/Output Comparison
            <br /><br />
            100 Points
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
