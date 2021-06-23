import { useAuth } from '../hooks/useAuth';

// Hook that makes the redirect
import { useHistory } from 'react-router-dom';

// Importing the images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import loginImg from '../assets/images/log-in.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {

    // Defining a const thats a hook
    const history = useHistory();

    // Calling the auth hook
    const { user, signInWithGoogle } = useAuth();

    // Creating the function that auth and redirects
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    return (
        <div id="page-auth">

            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <h1>Toda pergunta tem uma resposta</h1>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            
            <main>
                <section className="main-content">

                    <img src={logoImg} alt="Logo do Let me ask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            <img src={loginImg} alt="Entrar na sala" />
                            Entrar na sala
                        </Button>
                    </form>
                </section>
            </main>
        </div>
    )
}