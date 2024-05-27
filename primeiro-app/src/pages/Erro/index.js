import { Link } from 'react-router-dom';
import './style.css';

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Pagina nao encontrada</h2>
            <Link to="/">Veja todos os filmes!</Link>
        </div>
        
    )
}

export default Erro;