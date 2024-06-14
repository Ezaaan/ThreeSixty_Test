import React, {useState} from "react";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLoginButton = () => {
        // onLogin({ username, password })
        fetchResponse();
    };

    const fetchResponse = async () => {
        const response = await fetch('http://localhost:3500/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
        if(data.status === "success") {
            onLogin({ username, password, role: data.role});
            setMessage('');
        }else{
            setMessage(data.message);
        }
      };
  
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}>
            <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", borderRadius: "5px", marginBottom: "10px", width: "50vw", padding: "100px"}}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{ padding: "15px", borderRadius: "5px", border: "solid"}}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ padding: "15px", borderRadius: "5px", border: "solid", marginTop: "10px"}}
                />
                <button 
                    onClick={handleLoginButton}
                    style={{ padding: "10px", borderRadius: "10px", border: "none", margin: "10px", backgroundColor: "black", color: "white", alignSelf: "flex-end", cursor: "pointer", alignSelf: "center", width: "50%"}}
                >
                    Login
                </button>
                <p style={{textAlign: "center", color: "red"}}>{message}</p>
            </div>
        </div>
    );
}

export default LoginPage;