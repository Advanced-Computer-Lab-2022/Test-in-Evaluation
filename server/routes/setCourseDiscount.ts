import { Express } from "express";
import { Number, Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Course, User } from "../mongo";
import { Request, Response } from "../types/express";

const path = "/api/set_course_discount" as const;

const Input = Record({
  discount: Number.withConstraint((n) => n >= 0 && n <= 1, {
    name: "discount must be between 0 and 1",
  }),
  endDateTimestamp: Number, // timestamp in milliseconds
  startDateTimestamp: Number, // timestamp in milliseconds
  courseId: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
  app.post(
    path,
    validateInput(Input),
    async (req: Request<Input>, res: Response) => {
      const { discount, endDateTimestamp, courseId, startDateTimestamp } =
        req.body;

      const client = req.session.data;

      if (client.userType !== "instructor")
        return res.status(400).send({ error: "unauthorized" });

      const [course, user] = await Promise.all([
        Course.findById(courseId),
        User.findOne({ username: client.username }),
      ]);

      if (!course) return res.status(400).send({ error: "course not found" });
      if (!user) return res.status(400).send({ error: "user not found" });

      if (course.instructor !== user?._id)
        return res.status(400).send({ error: "unauthorized" });

      const startDate = new Date(startDateTimestamp);
      const endDate = new Date(endDateTimestamp);

      await Course.findOneAndUpdate({
        _id: courseId,
        discount: { rate: discount, startDate, endDate },
      });

      res.send({ success: true });
    }
  );
};
