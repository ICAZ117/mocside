async getCourses() {
	this.courses = [];
	for (let i = 0; i < this.enrolledCourses.length; i++) {
	  var cur = this.enrolledCourses[i];
	  const course = await API.apiClient.get(`/courses/${cur}`);
	  this.courses.push(course.data.data);
	  this.courses[i].labs = await this.getLabs(this.courses[i].id);
	  this.labs.push(this.courses[i]);
	  this.courses[i].publishedLabs = await this.getPublishedList(); // list of booleans for each assignment on whether they are published or not
	  this.courses[i].addedLabs = await this.getLabIDs(); //list of all lab ids(from any course) that have the problem in them
	  this.courses[i].currentLab = "";
	  this.courses[i].publishDueDate = "";
	  this.courses[i].isAdded = false;
	  this.courses[i].isPublished = false;

	}
  },
  async getLabs(courseID) {
	const rawLabs = await API.apiClient.get(`/labs/${courseID}`);
	return rawLabs.data.data;
  },
  getDueDate() {

	return Date.now();
  },
  async getLabIDs() {
	const res = await API.apiClient.get(`/problems/copies/${this.problemID}`);
	var copies = res.data.data;
	var temp = [];
	for(let i = 0; i < copies.length; i++) {
	  temp.push(copies[i].lab_id);
	}
	return temp;
  },
  async getPublishedList() {
	const res = await API.apiClient.get(`/problems/copies/${this.problemID}`);
	var copies = res.data.data;
	var temp = [];
	for(let i = 0; i < copies.length; i++) {
	  temp.push(copies[i].isPublished);
	}
	return temp;
  },
  getIsAdded(course, lab) {
	for(let i = 0; i < course.addedLabs.length; i++) {
	  if(course.addedLabs[i] == lab.id) {
		return true;
	  }
	}
	return false;
  },
  getIsPublished(course, lab) {
	// for(let i = 0; i < course.publishedLabs.length; i++) {
	//   if(course.publishedLabs[i] == lab.id) {
	//     return true;
	//   }
	// }
	// return false;

	var index;

	return course.publishedLabs[index];

  },
  async publish(course) {
	if(course.currentLab != "") {
	  console.log("published or unpublished");
	  var payload = {
		"published": !course.isPublished,
	  }
	  //api call
	}
  },
  async toggleToCourse(course) {
	if(course.currentLab != "") {
	  console.log("added/removed to " + course.name + " " + course.currentLab);
	}
	else {
	  console.log("must choose lab");
	}
  },
  removeAdded(course, id) {
	for(let i = 0; i < course.addedLabs.length; i++) {
	  if(course.addedLabs[i] == id) {
		course.addedLabs.splice(i, 1);
	  }
	}
  },
  removePublished(course, id) {
	for(let i = 0; i < course.publishedLabs.length; i++) {
	  if(course.publishedLabs[i] == id) {
		course.publishedLabs.splice(i, 1);
	  }
	}
  },
  extendAdded(course, id) {
	course.addedLabs.push(id);
  },
  extendPublished(course, id) {
	course.publishedLabs.push(id);
  },
  switchLab(course) {
	// for addding or removing/publishing unpublishing to a course
	// if(course.currentLab == "" || course.currentLab == undefined) {
	//   console.log("must choose lab");
	// }
	// else {
	//   //remove or add to lists
	//   if(course.isAdded == true) {
	//     removeAdded(course, course.currentlab.id);
	//   }
	//   else {
	//     extendeAdded(course, course.currentlab.id);
	//   }
	//   if(course.isPublished == true) {
	//     removePublished(course, course.currentlab.id);
	//   }
	//   else {
	//     extendePublished(course, course.currentlab.id);
	//   }

	//   //change quick value
	//   course.isAdded = !course.isAdded;
	//   course.isPublished = !course.isPublished;

	//   //change in database

	// }

	course.isAdded = this.getIsAdded(course, course.currentLab);
	course.isPublished = this.getIsPublished(course, course.currentLab);
  },