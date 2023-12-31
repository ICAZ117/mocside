// Can we deduce "in progress" from "completed" and "last_progress"?


var payload = {
    'labs': [{
        'lab_id': 1,
        'completed': false,
        'num_completed': 0,
        'last_progress': '2021-06-01',
    }, {
        'lab_id': 1,
        // 'in_progress': false,
        'completed': true,
        'num_completed': 1,
        'last_progress': '2021-06-01',
    } ],
    'assignments': [{
        'assignment_id': 0,
        // 'in_progress': true,
        'completed': true,
        'cases_passed': 1,
        'last_progress': '2021-06-02',
    }, {
        'assignment_id': 1,
        'completed': false,
        'cases_passed': 1,
        'last_progress': '2021-06-01',
    }],
    'progress': [{
        'assignment_id': 0,
        'cases_passed': [0, 1],
        'code_snapshot': '// Print "Hello World" to the console\nprint("Hello world")',
        'chosen_lang': 'python',
    }],
};

[{'lab_id': 1, 'completed': false, 'num_completed': 0, 'last_progress': '2021-06-01'}, 0]
{'assignment_id': 1, 'completed': false, 'cases_passed': 1, 'last_progress': '2021-06-01'}
{'assignment_id': 1, 'cases_passed': [0], 'code_snapshot': '// Print "Hello World" to the console\nprint("Hello world")', 'chosen_lang': 'python'}

// this gradebook will be the same for courses and assignments.
var gradebook_for_labs = {
    students: [1257777, 1237419],
    grades: {
        // I would prefer to store in here a "total points earned"
        // and have each parent type assist in calculation by
        // counting it's children.
        '1257419': '5', // 4/5
        '1257777': '5', // 5/5
    }
}

var payload = { 
    "gradebook": JSON.stringify(gradebook_for_labs),
}

var gradebook_for_students_for_courses = {
    courses: [2280, 2290],
    grades: {
        '2280': "5",
        '2290': "5",
    }
}

var gradebook_for_students_for_labs = {
    labs: [1, 2, 3],
    grades: {
        '1': "3",
        '2': "9",
        '3': "5"
    }
}

var gradebook_for_students_for_problems = {
    problems: [1, 2, 3],
    grades: {
        '1': "101",
        '2': "2",
        '3': "1"
    }
}

var payload2 = { 
    "gradebook": JSON.stringify(gradebook_for_students),
}

// what if I gave each object a gradebook column, structured like this?
// I'd need one in Courses, Labs, Assignments, and Students
// That idea works, adding now.
// I'd like to store a "total points earned" kind of number in the gradebook, I think it's the
// most helpful thing for however we choose to format and save. This means, though, that each
// parent resource must have some count that can represent "total points to be earned".
// For assignments, this number is test_cases as returned in the resource.
// For courses, this number is the num_labs as returned in the resource.
// For labs, this is num_problems.




var worth_array = { 
    'problems': {
        '28': {
            // object from db
        },
        '17': {
            
        },
    }
}

var foo = {
    "type": "doc", 
    "content": [
        {
            "type": "heading", 
            "attrs": {"level": 3}, 
            "content": [
                {
                    "text": "Problem Statement", 
                    "type": "text"
                }
            ]
        }, {
            "type": "paragraph", 
            "content": [
                {
                    "text": "Read two integers, a and b, and then print their sum.",
                    "type": "text"
                }
            ]
        }, {
            "type": "heading", 
            "attrs": {"level": 3}, 
            "content": [
                {
                    "text": "Input Description", 
                    "type": "text"
                }
            ]
        }, {
            "type": "paragraph", 
            "content": [
                {
                    "text": "There is one line of input, consisting of two integer values, a and b, such that 0 <= a, b <= 1000.",
                    "type": "text"
                }
            ]
        }, {
            "type": "heading", 
            "attrs": {
                "level": 3
            }, 
            "content": [
                {
                    "text": "Output Description", 
                    "type": "text"
                }
            ]
        }, {
            "type": "paragraph", 
            "content": [
                {
                    "text": "A single integer value, c, the sum of the two input integer values.", 
                    "type": "text"
                }
            ]
        }, {
            "type": "heading", 
            "attrs": {
                "level": 3
            }, 
            "content": [
                {
                    "text": "Sample Input", 
                    "type": "text"
                }
            ]
        }, {
            "type": "codeBlock",
            "attrs": {
                "language": null
            }, "content": [
                {
                    "text": "5 8", 
                    "type": "text"
                }
            ]
        }, {
            "type": "heading", 
            "attrs": {
                "level": 3
            }, 
            "content": [
                {
                    "text": "Sample Output", 
                    "type": "text"
                }
            ]
        }, {
            "type": "codeBlock", 
            "attrs": {
                "language": null
            }, 
            "content": [
                {
                    "text": "13", 
                    "type": "text"
                }
            ]
        }, {
            "type": "paragraph"
        }
    ]
}

var prefs = {
    'consoleOptions': {'foreground': '', 'background': ''},
    'ideOptions': {'theme': '', 'defaultLang': ''},
}