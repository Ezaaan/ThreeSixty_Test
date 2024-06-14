
import AdminPage from "./AdminPage";
import TeacherPage from "./TeacherPage";
import StudentPage from "./StudentPage";
function HomePage({ user, onLogout}) {

    const handleLogoutButton = () => {
        
    };
  
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}>
            <h1>Welcome, {user.username}!</h1>
            {user.role === "admin" && (
                <AdminPage />
            )}

            {user.role === "guru" && (
                <TeacherPage user={user}/>
            )}

            {user.role === "siswa" && (
                <StudentPage user={user}/>
            )}
            <button 
                onClick={onLogout}
                style={{ padding: "10px", borderRadius: "10px", border: "none", margin: "10px", backgroundColor: "red", color: "white", alignSelf: "flex-end", cursor: "pointer", alignSelf: "center", width: "50%"}}
            >
                Logout
            </button>
        </div>
    );
}

export default HomePage;