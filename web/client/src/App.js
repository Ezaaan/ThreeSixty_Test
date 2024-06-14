import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'; // Import the CookiesProvider
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

function App() {
  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin(user) {
    setCookie('user', user, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  }

  function handleLogout() {
    setCookie('user', '', { path: '/', expires: new Date(0) });
  }

  return (
    <BrowserRouter>
      <CookiesProvider> {/* Wrap your Routes with the CookiesProvider */}
        <Routes>
          <Route path="/" element={cookies.user ? <HomePage user={cookies.user} onLogout={handleLogout}/> : <LoginPage onLogin={handleLogin} />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;