//Css
import './App.css'

// React Router Config 
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './Context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Search from './pages/Search/Search';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';


//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              {/*Rotas Publicas*/}
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/Search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />
              
              {/*Rotas Privadas*/}
              <Route path='/Login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/Cadastro' element={!user ? <Cadastro /> : <Navigate to="/" />} />
              <Route path='posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route path='posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path='/Dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
