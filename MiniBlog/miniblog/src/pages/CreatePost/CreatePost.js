import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../Context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tag, setTags] = useState([])
    const [formError, setFormError] = useState("");

    const { insertDocument, response } = useInsertDocument("posts")

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
        if(!title || !image || !tag || !body){
            setFormError("Preencha todos os campos!")
        }
            if(formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        //redirect to home page
        navigate("/");

    };

    return (
        <div className={styles.create_post}>
            <h2>Criar uma Publicação </h2>

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


                {!response.loading && <button className="btn">Criar post!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {response.error &&  <p className="error">{response.error}</p>}
                {formError.error &&  <p className="error">{formError}</p>}

            </form>
        </div>
    );
}

export default CreatePost