
import React, {useState, useEffect} from "react";
import Select from 'react-select';

function TeacherPage({user}) {
    const [message, setMessage] = useState('');
    const [grade, setGrade] = useState(null);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState(null);
    const [studentOptions, setStudentOptions] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        const response = await fetch('http://localhost:3500/students/teacher/' + user.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data) {
            const options = data.map((student) => ({
                label: student.name,
                value: student.username
            }));
            setStudents(data);
            setStudentOptions(options);
        } else {
            setMessage("error");
        }
    };

    useEffect(()=>{
        fetchStudents();
    }, []);
    
    useEffect(()=>{
        setStudent(students.find(student => student.username === selectedStudent.value));
        setGrade(students.find(student => student.username === selectedStudent.value) ? students.find(student => student.username === selectedStudent.value).grade : null);
    }, [selectedStudent]);

    const handleSimpanButton = () => {
        if(grade < 0 || grade > 100 || grade === "" || grade === null){
            setMessage("Nilai harus diantara 0 dan 100");
            return;
        }

        fetch('http://localhost:3500/students/' + student.username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: student.name, teacher: student.teacher, grade: grade})
        }).then(response => response.json())
        .then(data => {
            if(data){
                setMessage("Data berhasil disimpan");
            }else{
                setMessage("Data gagal disimpan");
            }
        });
    };
  
    return (
        <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", borderRadius: "5px", marginBottom: "10px", width: "50vw", padding: "100px"}}>
            <p style={{textAlign: "center"}}>Student: </p>
            
            <Select
                style={{textAlign: "right"}}
                value={selectedStudent}
                onChange={setSelectedStudent}
                options={studentOptions}
            />

            {selectedStudent && student && (
                <>
                    <p style={{textAlign: "center"}}>Grade: </p>

                    <input
                        type="number"
                        value={grade || ""}
                        min={0}
                        max={100}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder={student.grade}
                        style={{ padding: "15px", borderRadius: "5px", border: "solid", marginTop: "10px", marginBottom: "10px"}}
                    />
                </>
            )}

            {selectedStudent && student && grade && (
                <>
                    <button 
                        onClick={handleSimpanButton}
                        style={{ padding: "10px", borderRadius: "10px", border: "none", margin: "10px", backgroundColor: "black", color: "white", alignSelf: "flex-end", cursor: "pointer", alignSelf: "center", width: "50%"}}
                    >
                        Simpan
                    </button>
                </>
            )}
            
            
            <p style={{textAlign: "center", color: "green"}}>{message}</p>
        </div>
    );
}

export default TeacherPage;