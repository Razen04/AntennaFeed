import { useEffect, useRef } from 'react';

const TextToSpeechWithHighlight = ({ content }) => {
    const synth = window.speechSynthesis;
    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const wordElementsRef = useRef([]);

    useEffect(() => {
        const utterance = utteranceRef.current;
        utterance.text = content;
        utterance.rate = 1;
        wordElementsRef.current = document.querySelectorAll('.word');

        utterance.onboundary = (event) => {
            const charIndex = event.charIndex;
            highlightWord(charIndex);
        };

        return () => {
            synth.cancel();
        };
    }, [content]);

    const highlightWord = (charIndex) => {
        let totalLength = 0;

        wordElementsRef.current.forEach((el, i) => {
            const wordLength = el.textContent.length;
            if (totalLength <= charIndex && charIndex < totalLength + wordLength) {
                el.classList.add('highlight');
            } else {
                el.classList.remove('highlight');
            }
            totalLength += wordLength;
        });
    };

    const startSpeaking = () => {
        synth.speak(utteranceRef.current);
    };

    const stopSpeaking = () => {
        synth.cancel();
    };

    const wrapWordsWithSpans = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const walk = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const words = child.textContent.match(/\S+|\s/g).map((word, index) =>
                        `<span class="word" id="word-${index}">${word}</span>`
                    ).join('');
                    const spanWrapper = document.createElement('span');
                    spanWrapper.innerHTML = words;
                    node.replaceChild(spanWrapper, child);
                } else {
                    walk(child);
                }
            });
        };

        walk(doc.body);
        return doc.body.innerHTML;
    };


    const wrappedContent = wrapWordsWithSpans(content)

    return (
        <div>
            <button onClick={startSpeaking}>Start Reading</button>
            <button onClick={stopSpeaking}>Stop Reading</button>
            <div
                className='mt-4 mb-20 full-text leading-relaxed'
                dangerouslySetInnerHTML={{ __html: wrappedContent }}
            ></div>
            
        </div>
    );
};

export default TextToSpeechWithHighlight;
