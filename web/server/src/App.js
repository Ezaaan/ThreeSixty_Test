
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const users = require("./data/users.json");
const teachers = require("./data/teachers.json");
const students = require("./data/students.json");
const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());
app.get("/api", (req, res) => {
  res.send({ message: "Hello from Express!" });
});

app.post("/login", (req, res) => {
  const data = req.body;
  const user = users.find(user => user.username === data.username && user.password === data.password);
  if (user) {
    res.send({ status: "success", message: "Login successful!", role: user.role });
  } else {
    res.status(401).send({ status: "fail", message: "Invalid username or password" });
  }
});

app.get("/teachers", (req, res) => {
  res.send(teachers);
});

app.get("/teachers/:username", (req, res) => {
  const username = req.params.username;
  const teacher = teachers.find(teacher => teacher.username === username);
  if(teacher){
    res.send(teacher);
  }else{
    res.status(404).send({ message: "Teacher not found" });
  }
});

app.put("/teachers/:username", (req, res) => {
  const username = req.params.username;
  const teacher = teachers.find(teacher => teacher.username === username);
  if(teacher){
    // Update the teacher data
    teacher.name = req.body.name;
    // Save the updated data to teachers.json
    fs.writeFileSync("src/data/teachers.json", JSON.stringify(teachers, null, 2));
    res.send(teacher);
  }else{
    res.status(404).send({ message: "Teacher not found" });
  }
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/students/:username", (req, res) => {
  const username = req.params.username;
  const student = students.find(student => student.username === username);
  if(student){
    res.send(student);
  }else{
    res.status(404).send({ message: "Student not found" });
  }
});

app.get("/students/teacher/:teacherUsername", (req, res) => {
  const username = req.params.teacherUsername;
  const studentsFiltered = students.filter(student => student.teacher === username);
  if(studentsFiltered){
    res.send(studentsFiltered);
  }else{
    res.status(404).send({ message: "Student not found" });
  }
});

app.put("/students/:username", (req, res) => {
  const username = req.params.username;
  const student = students.find(student => student.username === username);
  if(student){
    student.name = req.body.name;
    student.teacher = req.body.teacher;
    student.grade = req.body.grade;

    fs.writeFileSync("src/data/students.json", JSON.stringify(students, null, 2));
    res.send(student);
  }else{
    res.status(404).send({ message: "Student not found" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));