export function sort(type, arr) {
    if (type == 0 || type == "startDate") {
        return sortByStartDate(arr, 1);
    } 
    else if (type == 1 || type == "endDate") {
        return sortByEndDate(arr, -1);
    }
    else if (type == 2 || type == "nextDueProblem") {
        return sortByNextProblemDue(arr);
    }
    else if (type == 3 || type == "name") {
        return sortByName(arr);
    }
    else if (type == 4 || type == "dueDate") {
        return sortByDueDate(arr);
    }
    else {
    //    default sort by CourseID
    return sortByID(arr);
    }
}
export function sortByStartDate(arr) {
    arr.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.start_date.split("-");
        let lb = b.start_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
        return -1;
        }
        if (fa > fb) {
        return 1;
        }
        return 0;
    });
    return arr;
}
export function sortByEndDate(arr) {
    arr.sort((a,b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.end_date.split("-");
        let lb = b.end_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
        return -1;
        }
        if (fa > fb) {
        return 1;
        }
        return 0;
    });
    return arr;
}
export function sortByNextProblemDue(arr) {
    // arr.sort();
    // not sure how to accomplish yet
    return arr;
}
export function sortByName(arr) {
    arr.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
        return -1;
        }
        if (fa > fb) {
        return 1;
        }
        return 0;
    });
    return arr;
}
export function sortByDueDate(arr) {
    arr.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.due_date.split("-");
        let lb = b.due_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
        return -1;
        }
        if (fa > fb) {
        return 1;
        }
        return 0;
    });
    return arr;
}
export function sortByID(arr) {
    arr.sort((a, b) => {
        return a.id - b.id;
    });
    return arr;
}
