import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbarComponent";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { StudentCourse } from '../../models/studentCourse';
import Table from 'react-bootstrap/Table';

const sc: StudentCourse = {} as StudentCourse;

function CourseSelection() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [studentCourses, setStudentCourses] = useState<StudentCourse>(sc);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getAllStudentCourses();
  }, [])

  const getAllStudentCourses = () => {
    axios.get(`https://localhost:44309/api/StudentCourses/GetStudentCoursesByStudentId?studentId=${studentId}`).then(response => {
      console.log(response);
      if (response.data.success) {
        if (response.data.data == null) {
          navigate(`studentCourseAdd/${studentId}`);
      }

        setStudentCourses(response.data.data);
        setLoad(true);
      } else {
        alert(response.data.message);
        setLoad(false);
      }
    }).catch(error => {
      console.log(error);
      alert("Something went wrong :(");
      setLoad(false);
    });
  }

  const deleteStudentCourse = (id:number, courseId:number) => {
    const data = {id:id, studentId:studentId, courseId:courseId};
    console.log(data)
    axios.delete(`https://localhost:44309/api/StudentCourses/Delete`, {data: data}).then(response => {
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

      {load &&
        <>
          <div className='d-flex'>
            <Button variant='success' className='m-2' onClick={() => navigate(`/studentCourseAdd/${studentId}`)}>Add New Course</Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {studentCourses.courses.length > 0 && studentCourses.courses.map(course => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td><Button variant='danger' onClick={() => {deleteStudentCourse(studentCourses.id, course.id)}} >Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      }

    </div>
  );
}

export default CourseSelection;
