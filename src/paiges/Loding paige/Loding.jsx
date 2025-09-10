import React from 'react';
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react"; 

const Loding = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-black px-4 sm:px-6">
            
            {/* Animated Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                }}
                className="mb-6"
            >
                <BookOpen className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
            </motion.div>

            {/* Loading Text */}
            <motion.h1
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Please wait, your question will be ready soon...
            </motion.h1>

            {/* Animated Dots */}
            <motion.div
                className="flex space-x-2 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[0, 1, 2].map((dot) => (
                    <motion.span
                        key={dot}
                        className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: dot * 0.2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default Loding;
