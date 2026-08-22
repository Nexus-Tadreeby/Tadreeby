import React, { useState, useEffect } from 'react';

const DEFAULT_PHRASES = [
    'Creating your account...',
    'Setting up your profile...',
    'Securing your data...',
    'Connecting to your university...',
    'Almost there!'
];

const Loader = ({
    phrases = DEFAULT_PHRASES,
    typingSpeed = 45,
    deletingSpeed = 30,
    pauseDuration = 600
}) => {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];

        if (!currentPhrase) return;

        if (!isDeleting && displayText === currentPhrase) {
            const pauseTimer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseDuration);

            return () => clearTimeout(pauseTimer);
        }

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const nextText = currentPhrase.slice(0, displayText.length + 1);
                setDisplayText(nextText);

                if (nextText === currentPhrase) {
                    setIsDeleting(true);
                }
            } else {
                if (displayText === '') {
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                    setIsDeleting(false);
                    return;
                }

                const nextText = currentPhrase.slice(0, displayText.length - 1);
                setDisplayText(nextText);
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60 flex items-center justify-center px-4 py-8">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/10 blur-[100px] pointer-events-none animate-pulse-subtle" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-[#1677FF]/20 border-t-[#1677FF] animate-spin shadow-[0_0_16px_rgba(22,119,255,0.18)]" />
                </div>

                <div className="mt-8 flex items-center justify-center text-xl font-semibold text-slate-700 sm:text-2xl">
                    <span aria-live="polite">{displayText}</span>
                    <span className="ml-1 inline-block h-6 w-0.5 rounded-full bg-[#1677FF] animate-pulse sm:h-7" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-400 sm:text-base">
                    Please wait, this may take a moment...
                </p>
            </div>
        </div>
    );
};

export default Loader;