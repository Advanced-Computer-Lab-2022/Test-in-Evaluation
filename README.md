# Test-in-Evaluation

## Project Title

An Online Learning and Teaching Platform

## Motivation

This project was created part of the course `CSEN704 Advanced Computer lab` in the German University in Cairo.

## Build Status

Project builds successfully and is fully functional. However, project is currently in development and improvements could be made.

## Code Style

We used a prettier config file to ensure professional code formatting. The config we used is the default standard one.

## Screenshots

![HomePage](screenshots/HomePage.png)
![Login](screenshots/Login.png)
![FilterCourses](screenshots/FilterCourses.png)
![AdminDashboard](screenshots/AdminDashboard.png)

## Frameworks Used

We used the MERN (Mongo-Express-React-Nodejs) framework. We also used typescript for both the backend and the frontend

We also used:

-   MUI for UI components.
-   Axios for requests management between client and server.
-   nodemailer for emails.
-   Mongoose as an ORM.

## Features

-   Guests are allowed to use the site with limited functionality
-   Signup to the website
-   Receive a password reset email
-   Corporations can use the platform with features tailored to corporate trainees to teach their employees
-   Report, follow-up and resolve a problem all on the platform
-   Rate courses and see other people'es ratings
-   Filter courses by custom criteria
-   Solve exercises on the platform and receive a grade
-   Get a certificate when you complete a course
-   View your wallet balance
-   Set promotions as an admin or an instructor
-   Create multiple choice exams as an instructor
-   Add videos to your courses as an instructor

## Code Examples

API endpoints for example are created as follows where every endpoint has a unique file:

```js
const path = "/api/create_course" as const;

const section = Record({
    title: String,
    description: String,
    totalHours: Number,
    videoUrl: String,
    exam: Record({
        exercises: Array(
            Record({
                question: String,
                answers: Array(String),
                correctAnswer: Number,
            }).withConstraint(
                (excercise) =>
                    excercise.answers.length > 1 &&
                    typeof excercise.answers[excercise.correctAnswer] ===
                        "string"
            )
        ),
    }),
});

const Input = Record({
    title: String,
    subject: String,
    summary: String,
    price: Number,
    sections: Array(section).withConstraint((sections) => sections.length > 0),
    videoPreviewUrl: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            if (req.session.data.userType !== UserTypes.instructor)
                return res.status(400).send({ error: "unauthorized" });

            const {
                price,
                sections,
                subject,
                summary,
                title,
                videoPreviewUrl,
            } = req.body;
            const totalHours = sections
                .map((v) => v.totalHours)
                .reduce((a, b) => a + b);
            const instructorId = await User.findOne({
                username: req.session.data.username,
            }).then((v) => v?._id);
            const subjectId = subject
                ? await Subject.findOneAndUpdate(
                      { Name: subject },
                      { Name: subject },
                      { upsert: true, new: true }
                  ).then((v) => v?._id)
                : undefined;
            const course = await Course.create({
                price,
                subjectId: subjectId,
                summary,
                title,
                totalHours,
                instructor: instructorId!,
                videoPreviewUrl,
            });

            await Promise.all(
                sections.map(
                    (
                        { description, title, totalHours, videoUrl, exam },
                        index
                    ) =>
                        Section.create({
                            description,
                            name: title,
                            parentCourse: course._id,
                            totalHours,
                            videoUrl: videoUrl,
                            exam: exam,
                            index,
                        })
                )
            );

            return res.send({ ok: true });
        }
    );
};
```

## Installation

1. Make sure you have `npm` and `node` installed

2. Go into the `server` directory and run `npm i`

3. Create a `.env` file, using `.env.example` as a template

4. Run `node .`

5. From the parent directory, go into the `client` directory and run `npm i`

6. Run `npm start`

## API reference


### `POST /api/accept_refund`

#### Params

```js
{
    enrollmentId: String,
}
```

#### Description

Allows an admin to accept a refund requested by a trainee for a specific course

### `POST /api/set_subtitle_exercise`

#### Params

```js
{
    courseId: String,
    sectionId: String,
    exercises: Array(
        Record({
            question: String,
            answers: Array(String),
            correctAnswer: Number,
        })
    ),
}
```

### `POST /api/add_student_to_course`

#### Params

```js
{
    studentId: String,
    courseId: String,
}
```

#### Description

Allows an admin to add a trainee to a course

### `POST /api/change_current_password`

#### Params

```js
{
    currentPassword: String,
    newPassword: String,
}
```

#### Description

Allows a user to change their current password

### `POST /api/change_my_profile`

#### Params

```js
{
    email: String.optional(),
    bio: String.optional(),
}
```

#### Description

Allows a user to change their own bio

### `POST /api/create_course`

#### Params

```js
{
    title: String,
    subject: String,
    summary: String,
    price: Number,
    sections: Array(section).withConstraint((sections) => sections.length > 0),
    videoPreviewUrl: String,
}
```

#### Description

Allows an instructor to create a course

### `POST /api/create_subject`

#### Params

```js
{
    Name: String,
}
```

#### Description

Allows an admin to create a new subject ( categories for courses )

### `POST /api/create_user`

#### Params

```js
{
    username: String.withConstraint((s) => s.length > 5),
    password: String.withConstraint((s) => s.length > 8),
    firstName: String.withConstraint((s) => s.length > 0),
    lastName: String.withConstraint((s) => s.length > 0),
    email: String.withConstraint((s) => s.length > 0),
    gender: Union(Literal("male"), Literal("female")),
    type: String,
}
```

#### Description

Allows an admin to create a new user

### `POST /api/contract`

#### Params

```js
{}
```

#### Description

Allows an instructor to accept their contract

### `POST /api/enroll_in_course`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a trainee to enroll in a course

### `POST /api/follow_up_on_reported_problem`

#### Params

```js
{
    reportedProblemId: String,
    newComment: String,
    userId: String,
}
```

#### Description

Allows a user(including admins) to follow up on a reported problem

### `POST /api/forgot_password`

#### Params

```js
{
    email: String,
}
```

#### Description

Allows a user to request a password reset

### `POST /api/gen_notes_pdf`

#### Params

```js
{
    notes: String,
}
```

#### Description

Allows a user to generate a pdf file from their notes

### `GET /api/get_corp_users`

#### Params

```js
{}
```

#### Description

Allows an admin to get all corporate trainees

### `GET /api/get_all_instructors`

#### Params

```js
{}
```

#### Description

Allows an user to get all instructors

### `GET /api/get_all_reported_problems`

#### Params

```js
{}
```

#### Description

Allows a user to get all reported problems

### `POST /api/get_all_reviews`

#### Params

```js
{
    reviewed: String,
}
```

#### Description

Allows a user to get all reviews for a specific entity

### `GET /api/get_all_subjects`

#### Params

```js
{}
```

#### Description

Allows a user to get all subjects

### `GET /api/get_certificate`

#### Params

```js
{
    enrollmentId: String,
}
```

#### Description

Allows a user to get their certificate

### `POST /api/get_completed_course_ratio`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a user to get the completion ratio of a course

### `POST /api/get_course`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a user to get a detailed course

### `POST /api/get_course_preview`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a user to get a preview of a course

### `POST /api/get_enrollment_aggregation`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a user to get the number of enrollments and the sum of the prices of all enrollments for a specific course

### `POST /api/get_is_enrolled`

#### Params

```js
{
    courseId: String,
}
```

#### Description

Allows a user to get their enrollment status for a specific course

### `GET /api/get_my_enrollments`

#### Params

```js
{}
```

#### Description

Allows a user to get all their enrollments

### `GET /api/getMyReportedProblems/:id`

#### Params

```js
{}
```

#### Description

Allows a user to get all their reported problems

### `GET /api/get_pending_enrollments`

#### Params

```js
{}
```

#### Description

Allows an admin to get all pending enrollments

### `GET /api/get_pending_refunds`

#### Params

```js
{}
```

#### Description

Allows an admin to get all pending refunds

### `POST /api/get_user`

#### Params

```js
{
    userId: String,
}
```

#### Description

Allows an admin to get a user

### `POST /api/login`

#### Params

```js
{
    username: String,
    password: String,
}
```

#### Description

Allows a user to login

### `POST /api/logout`

#### Params

```js
{}
```

#### Description

Allows a user to logout

### `POST /api/mark_reported_problem`

#### Params

```js
{
    reportedProblemId: String,
    newStatus: String,
}
```

#### Description

Allows an admin to mark a reported problem as solved

### `POST /api/pay_to_wallet`

#### Params

```js
{
    amount: Number,
}
```

#### Description

Allows a user to pay to their wallet

### `POST /api/record_completed_exercise`

#### Params

```js
{
    sectionId: String,
}
```

#### Description

Allows a trainee to record that they have completed an exercise

### `POST /api/record_completed_video`

#### Params

```js
{
    sectionId: String,
}
```

#### Description

Allows a trainee to record that they have completed a video

### `POST /api/report_problem`

#### Params

```js
{
    courseId: String,
    title: String,
    description: String,
    category: String,
}
```

#### Description

Allows a user to report a problem

### `POST /api/request_refund`

#### Params

```js
{
    enrollmentId: String,
}
```

#### Description

Allows a user to request a refund if 50% of the course has not been completed

### `POST /api/resolve_pending_enrollment`

#### Params

```js
{
    enrollmentId: String,
    accepted: Boolean,
}
```

#### Description

Allows an admin to resolve a pending enrollment

### `POST /api/search_courses`

#### Params

```js
{
    subject: String.optional(),
    title: String.optional(),
    instructor: String.optional(),

    // inclusive,inclusive
    ratingLow: Number.optional(),
    ratingHigh: Number.optional(),

    //inclusive,inclusive
    priceLow: Number.optional(),
    priceHigh: Number.optional(),
}
```

#### Description

Allows a user to search for courses

### `POST /api/set_country`

#### Params

```js
{
    country: String,
}
```

#### Description

Allows a user to set their country

### `POST /api/set_course_discount`

#### Params

```js
{
    discount: Number.withConstraint((n) => n >= 0 && n <= 1, {
        name: "discount must be between 0 and 1",
    }),
    endDateTimestamp: Number, // timestamp in milliseconds
    startDateTimestamp: Number, // timestamp in milliseconds
    courseId: String,
}
```

#### Description

Allows an admin or instructor to set a discount for a course

### `POST /api/sign_up`

#### Params

```js
{
    username: String,
    password: String.withConstraint((s) => s.length > 8),
    firstName: String.withConstraint((s) => s.length > 0),
    lastName: String.withConstraint((s) => s.length > 0),
    email: String.withConstraint((s) => s.length > 0),
    gender: Union(Literal("male"), Literal("female")),
}
```

#### Description

Allows a user to sign up as an individual trainee

### `POST /api/solve_exercise`

#### Params

```js
{
    sectionId: String,
    answers: Array(Number),
}
```

#### Description

Allows a trainee to solve an exercise

### `POST /api/view_exercise_result`

#### Params

```js
{
    sectionId: String,
}
```

#### Description

Allows a trainee to view the result of an exercise

### `GET /api/who_am_i`

#### Params

```js
{}
```

#### Description

Allows a user to get their user info

### `POST /api/write_review`

#### Params

```js
{
    reviewed: String,
    score: Number,
    text: String,
}
```

#### Description

Allows a user to write a review

## Tests

We had a peer review system where changes are done in branches and then is reviewed by others before being merged to master.

## How to use

After preforming the installation, simply navigate to the URL return by the `npm start` command

## Contribute

Contributions are always welcome!
Please fork the project, do your additions then open a pull request!

## Credits

-   Ahmed Mamdouh
-   Akram Fahim
-   Karim Mohamed
-   Mahmoud Gaber
-   Noureldin Hesham

## License

[GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.txt)
