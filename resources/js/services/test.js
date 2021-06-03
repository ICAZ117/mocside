// Can we deduce "in progress" from "completed" and "last_progress"?


var payload = {
    'labs': [{
        'lab_id': 0,
        // 'in_progress': true,
        'completed': false,
        'num_completed': 1,
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