===============> MocsIDE<===============

IMPORTANT
* Fix Student Run Button
* Complete Grade Process
* Add the course enroll link stuff
* Course Edit, and Delete do not work currently because of the menu



NEXT UP
* replace the student id add in courses, with the create link to join course
* Fixing the url routing issue
* deleting some problems has not reset their copies copy id when needed...ie delete 14 when it has copies should make the first copy switch copy id to itself, ie 45's copy id becomes 45
* some test cases have the wrong assignment id....where did this happen....perhaps when deleting the original/copies?
* when typing in url past courses...an incorrect url will direct user to fake page...switch to 404 not found maybe...or redirect
* Add Sign Up Button to Login Page
* Check if Registering User is a new or not...if already in database...throw error...on username, email, or id
* Add Sorting for the courses, labs, and problems
* Add Filter for the courses, labs, and problems



STYLE FIXES
* Home
* Navbar
* Courses
* Course Edit
* Labs
* Lab Edit
* Problems
* Problem Edit
* Workspace
* Confirm Delete style message on courses, labs, and problems
* Fix Carousel
* Combine Logout, with profile pic, and link to profile page

ADD PAGES
* Add profile Page
* Add contact us page
* perhaps make another middle page for professors to go to before labs, which shows the course details, and overview as well as student overview (maybe create this as a child of courses, and a sibling of labs)



FINAL
* change implementation from dates to date times
* speed up load time by adjusting picture size
* Fill Homepage with necessary information
* complete bug fixing and Testing