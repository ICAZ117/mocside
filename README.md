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
* Fix routing bug going from the edit assignment page to anywhere else

* Navbar
	* Add active element to highlight the active element
	* add a red background instead of white when anywhere except the home page
	* Style Navbar

* Home Page
	* Style Home Page
	* fix carousel
	* fill homepage with any necessary information

* Login Page
	* Style Login Page
	* Add Sign Up Button to Login Page

* Register Page
	* Style Register Page
	* Check if Registering User is a new or not

* Logout Button
	* Style Button

* Course Page
	* Style Course Page
	* add the professor version of the page, ie. the add, delete, publish buttons for courses
	* perhaps make another middle page for professors to go to before labs, which shows the course details, and overview as well as student overview

* Lab Page
	* Style Lab Page
	* add button in top left to return to courses page
	* Add the Professor version of this page, ie. the add, delete, publish buttons for labs
	* complete dynamic labs info
	* confirm delete message

* Problems Page
	* Style Problems Page
	* add button in top left to return to courses page
	* add the professor version of this page, ie. the add, delete, publish buttons for labs
	* complete dynamic problems info
	* confirm delete message
	* on template and model solution add the save status functionality/or remove it

* Workspace Page
	* Style Workspace Page
	* Get Codemirror working properly
	* add button in top left to return to courses page

* Edit/Add Course
	* styling

* Edit/Add Lab
	* styling

* Edit/Add Problem
	*styling
	* confirm delete message
	* do not allow unadding problem from the only course it is in, must delete problem from the overview tab

* Docker
	* get started
