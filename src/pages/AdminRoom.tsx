import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import '../styles/popup.scss';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);

    function handleDeleteQuestion(questionId: string) {
        toast((t) => (
            <div className="popup">
                Tem certeza que você deseja excluir essa pergunta?
                <div className="popup__footer">
                    <Button
                        className="popup__button"
                        onClick={() => {
                            toast.dismiss(t.id);
                        } }>
                        Cancelar
                    </Button>
                    <Button
                        className="popup__button popup__button--danger"
                        onClick={() => {
                            toast.dismiss(t.id);
                            toast.promise(
                                deleteQuestion(questionId),
                                {
                                loading: 'Excluindo...',
                                success: <b>Pergunta excluída!</b>,
                                error: <b>Não foi possível excluir sua pergunta. Por favor, tente novamente.</b>,
                                }
                            );
                        }}>
                        Excluir
                    </Button>
                </div>
            </div>
        ));
    }

    async function deleteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    return (
        <div id="page-room">
            <Toaster />
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {/* if, then */}
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDeleteQuestion(question.id)
                                    }}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}