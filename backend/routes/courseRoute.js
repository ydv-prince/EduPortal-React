const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure the destination folder

// Route to add a new course
router.post('/add', upload.single('image'), courseController.addCourse);

// Route to fetch all courses
router.get('/', courseController.getCourses);

// Route to fetch a single course by ID
router.get('/get/:id', courseController.getCourseById);
router.get('/instructor/:id', courseController.getInstructorCourses);

// Route to edit a course
router.put('/edit/:id', upload.single('image'), courseController.editCourse);

// Route to delete a course
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;