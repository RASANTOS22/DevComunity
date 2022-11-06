import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../Context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocuments("posts", id);



    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tag, setTags] = useState([])
    const [formError, setFormError] = useState("");

    // fill form data
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    },
        [post]);



    const { updateDocument, response } = useUpdateDocument("posts")

    const { user } = useAuthValue()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        //validação de urls
        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL!")

        }

        //criar o array
        const tagsArray = tag.split(",").map((tag) => tag.trim().toLowerCase());

        //checar os valores
        if (!title || !image || !tag || !body) {
            setFormError("Preencha todos os campos!")
        }
        if (formError) return;
        
        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            EditdBy: user.displayName
            }

        updateDocument(id,data);
        

        //redirect to
        navigate("/dashboard");

    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando: {post.title}</h2>
                    <p>Altere os dados da sua Publicação</p>

                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Titulo</span>
                            <input
                                type="text"
                                name='title'
                                required
                                placeholder='O que você está pensando?'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}></input>
                        </label>
                        <label>
                            <span>URL da Imagem</span>
                            <input
                                type="text"
                                name='image'
                                required placeholder='Insira uma Imagem'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}></input>
                        </label>
                        <p className={styles.preview_title}>Imagem</p>
                        <img className={styles.image_preview}
                            src={post.image}
                            alt={post.title} />
                        <label>
                            <span>Conteúdo</span>
                            <textarea
                                name="body"
                                required placeholder='Insira o conteudo do post'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}>
                            </textarea>
                        </label>
                        <label>
                            <span>Tags</span>
                            <input
                                type="text"
                                name='tags'
                                required placeholder='Insira as Tags'
                                onChange={(e) => setTags(e.target.value)}
                                value={tag}></input>
                        </label>


                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError.error && <p className="error">{formError}</p>}

                    </form>

                </>

            )}
        </div>
    );
}

export default EditPost