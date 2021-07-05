import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

export function useRoom(roomId: string) {
    const { user } = useAuth(); 
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    // This useEffect is executed everytime the roomId is changed
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // Listen to an event on realtime, getting all the values from room
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {} ).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            // Remove (unsubscribe) all references to value
            roomRef.off('value');
        }
    
    // user.id is an external information, which isn't inside this useEffect, so, this useEffect depends on user.id
    // every dependency have to be defined on the useEffect's second parameter
    // in the app case, if the user.id changes, we have to reload all the questions to know which questions the user liked
    }, [roomId, user?.id]);

    return {questions, title}
}
