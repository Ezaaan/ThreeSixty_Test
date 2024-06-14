
import React, {useState, useEffect} from "react";

function StudentPage({user}) {
    const [message, setMessage] = useState('');
    const [teacher, setTeacher] = useState(null);
    const [student, setStudent] = useState(null);

    const fetchTeacher = async () => {
        const response = await fetch('http://localhost:3500/teachers/' + student.teacher, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data) {
            setTeacher(data);
            setMessage('');
        } else {
            setMessage("error");
        }
    };

    const fetchStudent = async () => {
        const response = await fetch('http://localhost:3500/students/' + user.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        if (data) {
            setStudent(data);
            setMessage('');
        } else {
            setMessage("error");
        }
    };

    useEffect(()=>{
        fetchStudent();
    }, []);

    useEffect(()=>{
        student && student.teacher && fetchTeacher();
    }, [student]);
    
  
    return (
        <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", borderRadius: "5px", marginBottom: "10px", width: "50vw", padding: "100px"}}>
            <p style={{textAlign: "center", color: "green"}}>Teacher: {teacher ? teacher.name : "Guru"}</p>
            <p style={{textAlign: "center", color: "green"}}>Name: {student ? student.name : "Student"}</p>
            <p style={{textAlign: "center", color: "green"}}>Grade: {student ? student.grade : 999}</p>
            <p style={{textAlign: "center", color: "green"}}>{message}</p>
        </div>
    );
}

export default StudentPage;