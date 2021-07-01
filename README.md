===============> MocsIDE<===============

Completed:

* Created Laravel project (currently at /home/max/mocside)
* Set up a Github repository that we can upload to from our local devices and pull from from the server
* Summer schedule
* Transition html/php home page into laravel project using vue components
* Created Basic Login Page
* Created Basic Register Page
* Fixed Home Page Carousel links to point to Login and Register
* Added Static Course Page with Static courses
* Added Static Lab Page with Static labs
* Sign Up Validation works
* Sign Up creates a new User in the Database
* Log in works, and signs in the user
* Log Out button works, and logs out the user
* certain pages are unaccesible to non logged in users(example: courses)
* Upon opening the site if you have a valid csrf-token then it will log you in
* Course Page is now Dynamic
* Navbar now properly shows login only when not logged in, and logout only when logged in
* Labs page properly opens and closes upon browser back button and clicking course nav button
* added problems and workspace pages
* labs and problems now grab some dynamic info
* labs, problems, and courses grab dynamic info
* labs, problems, and courses can be created deleted or edited
* the edit, add, & delete buttons and paths are protected by checking if the user is a prof
* any code you type into the workspace saves for use later
* the add problem page saves everything as its typed, and loads properly



Todo:
* Finish up the grading of student code and returning it to front and save on back end
* Double Check everything is still working


Bug Fixes:
* Fix Url when switching from a child back to home or courses through nav bar
* enable url to take me to a child route, instead of redirecting....perhaps give 404 when not found...ie i should be able to refresh the page i am on and not return to courses when i do so
* upon returning from workspace make way for switching languages
* fix carousel
* Add profile Page
* Add default profile pictures/profile picture upload
* Find way to increase loading speed of pictures
* Change implementation from dates to datetimes

* Navbar
	* Style Navbar
	* Combine Logout and profile picture into dropdown with link to logout, and got to user settings, and maybe user grades...archives?

* Home Page
	* Style Home Page
	* fix carousel
	* fill homepage with any necessary information

* Login Page
	* Style Login Page
	* Add Sign Up Button to Login Page

* Register Page
	* Style Register Page
	* Check if Registering User is a new or not...if already in database...throw error...on username, email, or id

* Logout Button
	* Style Button

* Course Page
	* Style Course Page
	* perhaps make another middle page for professors to go to before labs, which shows the course details, and overview as well as student overview (maybe create this as a child of courses, and a sibling of labs)
	* Add Sorting Button
	* Filter Button

* Lab Page
	* Style Lab Page
	* confirm delete message
	* Add Sorting Button
	* Filter Button

* Problems Page
	* Style Problems Page
	* confirm delete message
	* Add Sorting Button

* Workspace Page
	* perhaps return and create a real front terminal, instead of fake version, otherwise perhaps add clear command to fake terminal
	* save the results of the student when they choose to submit after completing the submit run of their code
	* users cannot submit their code if it is passed the due date for said problem....problem duedate or lab duedate?
	* Users can still test their code against the test cases but cannot submit
	* Upon Submitting their code users can no longer resubmit,...ie they keep their current grade for said problem
	* upon submitting their code users can inspect the model solution

* Edit/Add Course
	* styling
	* confirm delete message

* Edit/Add Lab
	* styling
	* confirm delete message

* Edit/Add Problem
	* styling
	* confirm delete message
	* do not allow unadding problem from the only course it is in, must delete problem from the overview tab
	* On Template & Model Solution add the save status functionality/or remove it

* Docker
	* Finish up returning grade results to front end
