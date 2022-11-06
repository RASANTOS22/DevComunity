import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                Sobre o Dev <span>Community</span>
            </h2>
            <p>
                Este projeto consiste em um projeto da cadeira de HTM-CSS-JS do Professor Henrique, feito com React, junto com o Firebase.
            </p>
           <h3>Intrucões</h3>
           <p>
               Projeto consiste em um "MiniRede", onde o usuário possa executar o Login se tiver uma conta autenticada. 
               Se não possuir, pode ser realizado o cadastro do novo usuário.
            </p>    
            <p>Dentro do site, você poderá publicar, alterar, excluir, pesquisar e ver suas publicações mais recentes.</p>
            <Link to="/posts/create" className="btn">
                Nova Publicação
            </Link>
        </div>
    );
};

export default About