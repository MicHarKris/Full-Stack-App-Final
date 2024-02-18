const express = require("express");

// Construct a router instance.
const router = express.Router();

// Import the middleware
const { authenticateUser } = require("./middleware/auth-user");
const { asyncHandler } = require("./middleware/async-handler");

// Pull in the models
const { User, Course } = require("./models");

// Test route handler
router.get("/greetings", (req, res) => {
  console.log("Hello");
});

// ROUTES FOR USERS

// Route that returns the current authenticated user.
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;

    // Define the user properties to be returned
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  })
);

// Route that creates a new user.
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// ROUTES FOR COURSES

// Route that returns a list of all courses, including the User that owns each course.
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
      ],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "emailAddress"],
        },
      ],
    });
    res.status(200).json(courses);
  })
);

// Route that returns the course for the provided course ID, including the User that owns the course.
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
      ],
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName", "emailAddress"],
      },
    });
    if (course) {
      res.status(200).json(course);
    } else {
      res.sendStatus(404);
    }
  })
);

// Route that creates a new course, sets the Location header to the URI for the newly created course, and returns no content.
router.post(
  "/courses",
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.create(req.body);
      res.status(201).location(`/courses/${course.id}`).end();
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Route that updates the course for the provided course ID and returns no content.
router.put(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      if (course) {
        const courseOwner = course.userId;
        if (courseOwner == req.currentUser.id) {
          await course.update(req.body);
          res.status(204).location(`/courses/${course.id}`).end();
        } else {
          res.status(403).end();
        }
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Route that deletes the course for the provided course ID and returns no content.
router.delete(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const courseOwner = course.userId;
      if (courseOwner == req.currentUser.id) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
