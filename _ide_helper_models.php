<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Assignment
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $description
 * @property mixed|null $sample sample code
 * @property string|null $due_date
 * @property int $lab_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\Lab $lab
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TestCase[] $test_cases
 * @property-read int|null $test_cases_count
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereLabId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereSample($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereUpdatedAt($value)
 */
	class Assignment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Course
 *
 * @property int $id
 * @property int $owner_id
 * @property mixed|null $roster
 * @property string $name
 * @property string|null $description
 * @property string|null $img_loc
 * @property string|null $start_date
 * @property string|null $end_date
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Lab[] $labs
 * @property-read int|null $labs_count
 * @property-read \App\Models\Professor $owner
 * @method static \Illuminate\Database\Eloquent\Builder|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereImgLoc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereRoster($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereUpdatedAt($value)
 */
	class Course extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Lab
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $due_date
 * @property int|null $course_id
 * @property string|null $publish_date
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Assignment[] $assignments
 * @property-read int|null $assignments_count
 * @property-read \App\Models\Course|null $course
 * @method static \Illuminate\Database\Eloquent\Builder|Lab newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lab newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lab query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab wherePublishDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lab whereUpdatedAt($value)
 */
	class Lab extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Professor
 *
 * @property int $id
 * @property int $fsc_id
 * @property string|null $screen_name
 * @property string|null $pronouns
 * @property mixed|null $courses
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Course[] $ownedCourses
 * @property-read int|null $owned_courses_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Professor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Professor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Professor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereCourses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereFscId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor wherePronouns($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereScreenName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professor whereUpdatedAt($value)
 */
	class Professor extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Progress
 *
 * @property int $id
 * @property int $fsc_id
 * @property mixed|null $labs
 * @property mixed|null $assignments
 * @property mixed|null $progress
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * @method static \Illuminate\Database\Eloquent\Builder|Progress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Progress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Progress query()
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereAssignments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereFscId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereLabs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Progress whereUpdatedAt($value)
 */
	class Progress extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Student
 *
 * @property int $id
 * @property int $fsc_id
 * @property string|null $screen_name
 * @property string|null $pronouns
 * @property mixed|null $courses
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\Progress|null $progress
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCourses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFscId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student wherePronouns($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereScreenName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 */
	class Student extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TestCase
 *
 * @property int $id
 * @property int $assignment_id
 * @property string|null $input
 * @property string|null $output
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\Assignment $assignment
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase query()
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereAssignmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereInput($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereOutput($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TestCase whereUpdatedAt($value)
 */
	class TestCase extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $username
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property bool|null $is_admin
 * @property int $fsc_id
 * @property string $fsc_role
 * @property-read \App\Models\Student|null $fscUser
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFscId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFscRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 */
	class User extends \Eloquent {}
}

