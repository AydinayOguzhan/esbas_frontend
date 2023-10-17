import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HomeComponent from "./components/students/homeComponent";
import CoursesComponent from "./components/courses/coursesComponent";
import CourseSelectionComponent from "./components/courseSelections/courseSelectionComponent";
import CourseUpdateComponent from "./components/courses/courseUpdateComponent";
import CourseAddComponent from "./components/courses/courseAddComponent";
import StudentCourseAddComponent from "./components/courseSelections/studentCourseAddComponent";
import StudentUpdateComponent from "./components/students/studentUpdateComponent";
import StudentAddComponent from "./components/students/studentAddComponent";
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CourseSelection from './components/courseSelections/courseSelectionComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/home",
    element: <HomeComponent></HomeComponent>,
  },
  {
    path: "/studentUpdate/:studentId",
    element: <StudentUpdateComponent></StudentUpdateComponent>,
  },
  {
    path: "/studentAdd",
    element: <StudentAddComponent></StudentAddComponent>,
  },
  {
    path: "/courses",
    element: <CoursesComponent></CoursesComponent>,
  },
  {
    path: "/courseUpdate/:courseId",
    element: <CourseUpdateComponent></CourseUpdateComponent>,
  },
  {
    path: "/courseAdd",
    element: <CourseAddComponent></CourseAddComponent>,
  },
  {
    path: "/courseSelection/:studentId",
    element: <CourseSelectionComponent></CourseSelectionComponent>,
  },
  {
    path: "/studentCourseAdd/:studentId",
    element: <StudentCourseAddComponent></StudentCourseAddComponent>,
  },
]);



root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
