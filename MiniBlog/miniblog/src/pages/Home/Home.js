//CSS
import styles from "./Home.module.css";

//HOOKS
import { useNavigate, Link, } from "react-router-dom";
import { useState } from "react";
import { useFatcheDocument } from "../../hooks/useFatcheDocument";

//componenents
import PostInfo from "../../components/PostInfo";

const Home = () => {
    const [query, setQuery] = useState("");
    const {documents: posts, loading} = useFatcheDocument("posts");
    const navigate = useNavigate ();

    const handleSubmit = (e) => {
        e.preventDefault()

        if(query){
            return navigate (`/search?q=${query}`);
        }
    }

    return (
        <div className={styles.home}>
            <h1>Confira suas Publicações</h1>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)} />
                <button className="btn a">Pesquisar</button>
            </form>

            <div>
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post)=> <PostInfo key={post.id} post={post} />)}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foi encontrado nenhuma publicação</p>
                        <Link to="/posts/create" className="btn">
                            Nova publicação</Link>
                    </div>

                )}


            </div>
        </div>
    )
}

export default Home