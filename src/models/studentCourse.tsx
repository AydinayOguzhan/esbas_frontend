import { Course } from "./course"
import { Student } from "./student"

export interface StudentCourse{
    id:number
    student:Student
    courses:Course[]
}