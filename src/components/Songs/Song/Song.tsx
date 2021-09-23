import React from 'react';
import { Icon } from '../../Icon';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import Image from 'next/image';

interface SongProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    id: string;
    onSelect: (id: string) => void;
    selectedSongId: string | undefined;
    index: number;
    liked?: boolean;
    doLike: (id: string) => void;
}

const Song: React.FC<SongProps> = ({
    imageSrc,
    imageAlt,
    title,
    id,
    selectedSongId,
    onSelect,
    liked,
    doLike,
    index,
}) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="end"
            className="w-full"
            transition={{ delay: index * 0.2 }}
            variants={{
                hidden: {
                    opacity: 0,
                    top: -20,
                },
                visible: {
                    top: 0,
                    opacity: 1,
                },
                end: {},
            }}
        >
            <div className="flex flex-row cursor-pointer m-1 rounded-md border border-gray-200">
                <Image
                    className="block w-16 h-16 bg-cover rounded-l-md"
                    src={imageSrc}
                    alt={imageAlt}
                    width={64}
                    height={64}
                />
                <div className="bg-gray-100 p-2 w-full  rounded-r-md flex flex-row align-middle justify-between">
                    <p
                        data-testid={id}
                        onClick={() => onSelect(id)}
                        className={classnames(
                            'font-bold text-lg leading-tight mb-0 w-full hover:text-green-600 transition-colors self-center',
                            {
                                'text-black': id !== selectedSongId,
                                'text-green-600': id === selectedSongId,
                            }
                        )}
                    >
                        {title}
                    </p>

                    {liked ? (
                        <Icon
                            icon="heartF"
                            role="liked"
                            className="text-green-600 w-8 self-center"
                        />
                    ) : (
                        <button onClick={() => doLike(id)} role="like" className="self-center">
                            <Icon icon="heart" className="text-green-600 w-8" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Song;
