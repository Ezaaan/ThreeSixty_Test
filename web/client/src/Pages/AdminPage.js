
import React, {useState, useEffect} from "react";
import Select from 'react-select';

function AdminPage() {
    const [name, setName] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedMainTeacher, setSelectedMainTeacher] = useState(null);
    const [user, setUser] = useState(null);


    const fetchTeachers = async () => {
        const response = await fetch('http://localhost:3500/teachers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data) {
            const options = data.map((teacher) => ({
                label: teacher.name,
                value: teacher.username
            }));
            setTeachers(data);
            setTeacherOptions(options);
        } else {
            setMessage("error");
        }
    };

    const fetchStudents = async () => {
        const response = await fetch('http://localhost:3500/students', {
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
        fetchTeachers();
        fetchStudents();
      }, []);

    const data = [
        { label: 'Guru', value: 'guru' },
        { label: 'Siswa', value: 'siswa' },
    ];
    

    useEffect(()=>{
        if(selectedOption === null) return;
        setRole(selectedOption.value);
        setSelectedUser(null);
        setSelectedMainTeacher(null);
      }, [selectedOption]);

    useEffect(()=>{
        if(selectedUser === null) return;
        if(role === "guru") {
            const teacher = teachers.find(user => user.username === selectedUser.value);
            setUser(teacher);
            setName(teacher.name);
        } else {
            const student = students.find(user => user.username === selectedUser.value);
            setUser(student);
            setName(student.name);
        }
        setSelectedMainTeacher(null);
    }, [selectedUser]);

    const handleSimpanButton = () => {
        if(role === "guru") {
            const teacher = teachers.find(user => user.username === selectedUser.value);
            fetch('http://localhost:3500/teachers/' + teacher.username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name? name : teacher.name})
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                setMessage("Data berhasil diubah");
            });
        } else {
            const student = students.find(user => user.username === selectedUser.value);
            fetch('http://localhost:3500/students/' + student.username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name? name : student.name, teacher: selectedMainTeacher ? selectedMainTeacher.value : student.teacher})
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                setMessage("Data berhasil diubah");
            });
        }
    };

    const handleRoleSelection = (selectedOption) => {
        if(selectedOption === null) return;
        setSelectedOption(selectedOption);
        setSelectedUser(null);
        fetchTeachers();
        fetchStudents();
    };
  
    return (
        <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", borderRadius: "5px", marginBottom: "10px", width: "50vw", padding: "100px"}}>
                <p style={{textAlign: "center"}}>Role: </p>
                <Select
                    style={{textAlign: "right"}}
                    value={selectedOption}
                    onChange={handleRoleSelection}
                    options={data}
                />

                {selectedOption &&  
                    (
                        <>
                            <p style={{textAlign: "center"}}>User: </p>

                            <Select
                                style={{textAlign: "right"}}
                                value={selectedUser}
                                onChange={setSelectedUser}
                                options={role === "guru" ? teacherOptions : studentOptions}
                            />
                        </>
                        
                    )
                }

                {selectedOption && selectedUser && (
                    <>
                        <p style={{textAlign: "center"}}>Name: </p>

                        <input
                            type="text"
                            value={name ? name : ''}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={name}
                            style={{ padding: "15px", borderRadius: "5px", border: "solid", marginTop: "10px", marginBottom: "10px"}}
                        />
                    </>
                )}

                {selectedOption && role === "siswa" && selectedUser && (
                    <>
                        <p style={{textAlign: "center"}}>Teacher: </p>

                        <Select
                            style={{textAlign: "right"}}
                            placeholder={user && user.teacher ? teachers.find(teacher => teacher.username === user.teacher).name : "Guru Pengampu"}
                            value={selectedMainTeacher}
                            onChange={setSelectedMainTeacher}
                            options={teacherOptions}
                        />
                    </>
                )}

                {selectedOption && selectedUser && (
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

export default AdminPage;