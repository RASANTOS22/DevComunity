import styles from './Search.module.css'


//Hooks
import { useFatcheDocument } from '../../hooks/useFatcheDocument';
import { useQuery } from '../../hooks/useQuery';

//Components
import PostInfo from '../../components/PostInfo';
import { Link } from 'react-router-dom';



const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFatcheDocument("posts", search)

    return (
        <div className={styles.search_container}>
            <h1>Resultados encontrados para: {search}</h1>
            <div className='posts-list'>
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </>
                )}
                {posts && posts.map((post) => <PostInfo key={post.id} post={post} />)}
            </div>
        </div>
    );
};
export default Search;