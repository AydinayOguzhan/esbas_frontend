import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbarComponent";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../models/course';
import Table from 'react-bootstrap/Table';


function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getAllCourses();
  }, [])

  const getAllCourses = () => {
    axios.get("https://localhost:44309/api/Courses/GetAll").then(response => {
      console.log(response);
      if (response.data.success) {
        setCourses(response.data.data);
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
    });
  }

  const deleteCourse = (course:Course) => {
    axios.delete("https://localhost:44309/api/Courses/Delete", {data: course}).then(response => {
      console.log(response);
      if (response.data.success) {
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
    });
  }

  return (
    <div>
      <Navbar></Navbar>

      
      <div className='d-flex'>
        <Button variant='success' className='m-2' onClick={() => navigate("/courseAdd")}>Add New Course</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 && courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td><Button variant='primary' onClick={() => navigate(`/courseUpdate/${course.id}`)}>Update</Button></td>
              <td><Button variant='danger' onClick={() => deleteCourse(course)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>



    </div>
  );
}

export default Courses;
