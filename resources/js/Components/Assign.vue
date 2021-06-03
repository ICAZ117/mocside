<template>
  <div class="create-assignment">
    <div class="container">
      <button class="btn btn-primary btn-md publish-all">PUBLISH TO ALL</button>
      <br />
      <div class="no-decor">
        <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div class="card coursecard w-100">
            <div class="courses card-content">
              <h4 class="card-title my-3 mx-2 mb-0">
                CSC 2290: Object Oriented Programming
              </h4>

              <hr class="courses my-0" />

              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>

              <br />

              <label for="dueDate">Due Date</label>
              <input type="date" id="dueDate" />

              <hr class="courses my-0" />

              <div class="row">
                <div class="col-6">
                  <a href="">Student Preview</a>
                </div>
                <div class="col-6">
                  <a href="">Gradebook & Submissions</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
