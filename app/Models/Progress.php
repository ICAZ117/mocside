<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use Hasfactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'fsc_id',
        'labs',
        'assignments',
        'progress',
    ];

    protected $hidden = [
        'id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'fsc_id', 'fsc_id');
    }

    public function touchDate($assignment_id)
    {
        $labs_book = json_decode($this->labs, true);
        $assignments_book = json_decode($this->assignments, true);
        $progress_book = json_decode($this->progress, true);
        $assignment = Assignment::find($assignment_id);

        // check first for prior inclusion in problems
        $hasAssignmentProgress = false;
        $hasLabProgress = false;
        for ($i = 0; $i < count($progress_book); $i++) {
            if ($progress_book[$i]['assignment_id'] == $assignment_id) {
                // these must go hand in hand
                $offset1 = $i;
                $hasAssignmentProgress = true;
                $hasLabProgress = true;
                break;
            }
        }
        // check first for prior inclusion in lab
        // need offset
        for ($i = 0; $i < count($labs_book); $i++) {
            if ($labs_book[$i]['lab_id'] == $assignment->lab_id) {
                $offset3 = $i;
                $hasLabProgress = true;
                break;
            }
        }

        // check for prior completion
        if ($hasAssignmentProgress) {
            for ($i = 0; $i < count($assignments_book); $i++) {
                if ($assignments_book[$i]['assignment_id'] == $assignment_id) {
                    $offset2 = $i;
                    $assignments_book[$i]['last_progress'] = date('Y-m-d');
                    $labs_book[$offset3]['last_progress'] = date('Y-m-d');
                    $this->progress = json_encode($progress_book);
                    $this->assignments = json_encode($assignments_book);
                    $this->labs = json_encode($labs_book);
                    $this->save();
                    return True;
                }
            }
        }

        // if just has lab progress, we need to update lab
        if ($hasLabProgress) {
            $labs_book[$offset3]['last_progress'] = date('Y-m-d');
            $this->labs = json_encode($labs_book);
        } else {
            // otherwise we need a new entry
            $tempLab = array(
                'num_completed' => 0,
                'lab_id' => $assignment->lab_id,
                'completed' => false,
                'last_progress' => date('Y-m-d')
            );
            array_push($labs_book, $tempLab);
            $this->labs = json_encode($labs_book);
        }

        // if we've made it this far, we need to create some objects.
        $tempAssignment = array(
            'assignment_id' => $assignment->id,
            'cases_passed' => 0,
            'completed' => false,
            'last_progress' => date('Y-m-d')
        );
        $tempProgress = array(
            'assignment_id' => $assignment->id,
            'cases_passed' => [],
            'chosen_lang' => '' // this will get overwritten fast 
        );
        array_push($assignments_book, $tempAssignment);
        array_push($progress_book, $tempProgress);
        $this->assignments = json_encode($assignments_book);
        $this->progress = json_encode($progress_book);
        $this->save();
        return False;
    }
}