import { ReactNode } from 'react';

import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
}

export function Question({content, author, children}: QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <p className="question-footer">
                <div className="user-info">
                    <img src={author.avatar} alt="Foto de {author.name}" />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </p>
        </div>
    );
}