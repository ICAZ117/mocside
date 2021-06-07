<template>
  <div class="create-assignment">
    <div class="container">
      <button class="btn btn-primary btn-md publish-all">PUBLISH TO ALL</button>
      <br />
      <div class="no-decor">
        <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div class="card editcoursecard w-100">
            <div class="courses card-content">
              <h4 class="card-title my-3 mx-2 mb-0">
                CSC 2290: Object Oriented Programming
              </h4>

              <hr class="courses my-0" />

              <div class="card-body center">
                <div class="row">
                  <div class="col-4">Publish:</div>
                  <div class="col-8">
                    <label class="switch">
                      <input type="checkbox" v-model="publish"/>
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>

                <br />

                <label for="dueDate">Due Date: </label>
                <input type="date" id="dueDate" v-model="dueDate"/>
              </div>

              <hr class="courses my-0" />
              
              <div class="card-footer">
                <div class="row center">
                  <div class="col-6">
                    <small><a href="" class="no-decor">Student Preview</a></small>
                  </div>
                  <div class="col-6">
                    <small
                      ><a href="" class="no-decor">Gradebook &<br />Submissions</a></small
                    >
                  </div>
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
export default {
  data() {
    return {
      publish: "",
      dueDate: "",
    }
  },
};
</script>

<style></style>
