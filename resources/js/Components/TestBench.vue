<template>
  <div class="create-assignment">
    <div class="row test-cases">
      <div v-for="i in 12" :key="i" class="card col-1">
        <div class="card-title tc-card-title">
          <p>tc{{ i }}</p>
        </div>

        <hr />

        <div class="card-body">
          <p>
            Input/Output Comparison
            <br />
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
