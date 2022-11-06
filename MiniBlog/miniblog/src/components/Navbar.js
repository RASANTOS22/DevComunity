import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../Context/AuthContext";

const Navbar = () => {

  const { logout } = useAuthentication();
  const { user } = useAuthValue();


  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Dev <span>Community</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>


        {!user && (
          <>
            <li>
              <NavLink to="/Login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/Cadastro" className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
            </li>
          </>

        )}

        {user && (
          <>
            <li>
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>Nova Publicação</NavLink>
            </li>
            <li>
              <NavLink to="/Dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Gerenciamento</NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/About">Sobre</NavLink>
        </li>
        {user &&(
          <li>
          <button onClick={logout}>Sair</button>
        </li>


        )}
        

      </ul>

    </nav>
  )
}

export default Navbar