import styles from "./Dashboard.module.css"

import { Link } from 'react-router-dom'


//hooks
import { useAuthValue } from '../../Context/AuthContext'
import { useFatcheDocument } from '../../hooks/useFatcheDocument'
import { useDeleteDocument } from "../../hooks/useDeleteDocument"


const Dashboard = () => {

    const { user } = useAuthValue();
    const uid = user.uid

    //publicações do usuario
    const { documents: posts, loading } = useFatcheDocument("posts", null, uid)
    const {deleteDocument} = useDeleteDocument ("posts");
    
    if (loading) {
        return <p>Crregando...</p>;
    }


    return (
        <div className={styles.dashboard}>
            <h2>Todas as Publicações</h2>
            <p>Gerencie suas Publicações</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Não foram encontradas Publicações</p>
                    <Link to='/posts/create' className="btn">
                        Nova Publicação
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Título</span>
                        <span>Ações</span>

                    </div>

                    {posts && posts.map((post) => (
                    <div key={post.id} className={styles.post_row}>
                        <p>{post.title}</p>
                        <div>
                            <Link to={`/posts/${post.id}`} className="btn btn-outline">
                                Ver
                                </Link>
                                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                                Editar
                                </Link>
                                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
                                    Excluir
                                </button>
                        </div>
                    </div>                 

                    ))}
                </>
            )}
        </div>
    );
};

export default Dashboard;
