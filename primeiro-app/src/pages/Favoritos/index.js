import { useEffect, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function removerFilme(id){
        let filtro = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtro);

        localStorage.setItem("@primeflix", JSON.stringify(filtro));
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='minha-lista'>
            <h1>Minha lista</h1>
            {filmes.length === 0 && <span>Não há filmes salvos :(</span>}
            <ul>
                {filmes.map((filme) =>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => removerFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;