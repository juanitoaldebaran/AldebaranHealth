import { useEffect, useState } from "react";

interface TypingWordProps {
    word: string;
    classStyle: string;
}

const TypingWord: React.FC<TypingWordProps> = ({word, classStyle}) => {
    const [isTyping, setIsTyping] = useState(true);
    const [newWord, setNewWord] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalTime = isTyping ? 200 : 180;
        if (currentIndex < word.length && isTyping) {
            const timeOut = setTimeout(() => {
                setNewWord(prev => prev + word.charAt(currentIndex));
                setCurrentIndex(currentIndex + 1);
            }, intervalTime);

            return () => clearTimeout(timeOut);
        } else if (currentIndex > 0 && !isTyping) {
            const timeOut = setTimeout(() => {
                setNewWord(prev => prev.slice(0, -1));
                setCurrentIndex(currentIndex - 1);
            }, intervalTime);

            return () => clearTimeout(timeOut);
        } else if (currentIndex === word.length) {
            setIsTyping(false);
        } else if (currentIndex === 0) {
            setIsTyping(true);
        }   
    }, [isTyping, newWord, currentIndex]);

    return (
        <div className="flex items-center">
            <p className={`${classStyle}`}>
                {newWord}
            </p>
            <span className="animate-pulse text-blue-500">
                |
            </span>
        </div>
    )
}

export default TypingWord;