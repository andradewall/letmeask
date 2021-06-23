import { useAuth } from '../hooks/useAuth';

import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useAuth();

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <h1>Toda pergunta tem uma resposta</h1>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <section className="main-content">
                    <img src={logoImg} alt="Logo" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                    </form>
                </section>
            </main>
        </div>
    )
}