<template>
  <div class="create-assignment">
    <table class="table gradebook">
      <thead class="gradebook">
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Grade</th>
          <th>Letter Grade</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id" class="student" style="cursor: pointer">
          <td>{{ student.name }}</td>
          <td>{{ student.ID }}</td>
          <td>{{ student.grade }}</td>
          <td>{{ student.letterGrade }}</td>
          <td><a :href="'mailto:' + student.email">{{ student.email }}</a></td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [{
        name: "Darth Vader",
        ID: "6666666",
        grade: "83%",
        letterGrade: "B",
        email: "UnicornKitty22@gmail.com"
      },
      {
        name: "Bruh",
        ID: "0000000",
        grade: "100%",
        letterGrade: "A",
        email: "bruh@gmail.com"
      }]
    }
  },
};
</script>

<style></style>
