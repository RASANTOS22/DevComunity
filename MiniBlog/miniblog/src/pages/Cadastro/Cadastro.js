import styles from "./Cadastro.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";


const Cadastro = () => {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        const user = {
            displayName,
            email,
            password
        };

        if (password !== confirmpassword) {
            setError("Digite a senhas iguais!")
            return
        };

        const res = await createUser(user);

        console.log(res);

    };

    useEffect(() => {
        if(authError){
            setError(authError);
        }
    }, [authError]);


    return (
        <div className={styles.cadastro}>
            <h1>Realize seu Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome: </span>
                    <input
                        type="text"
                        name="displayname"
                        required
                        placeholder="Nome do Usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}></input>
                </label>
                <label>
                    <span>E-mail: </span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do Usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua Senha"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}></input>
                </label>
                <label>
                    <span>Confirmação de Senha: </span>
                    <input
                        type="password"
                        name="confirmpassword"
                        required
                        placeholder="Confirme sua Senha"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </label>
                {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
                <button className="btn" disabled>
                    Aguarde...</button>
                )};
                {error && <p className="error">{error}</p>}

            </form>

        </div>
    );
};

export default Cadastro