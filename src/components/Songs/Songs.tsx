import React from 'react';
import Song from './Song/Song';

interface SongsProps {
    songs: song[];
    onSelect: (id: string) => void;
    selectedSongId: string | undefined;
    doLike: (id: string) => void;
}

export const Songs: React.FC<SongsProps> = ({ songs, onSelect, selectedSongId, doLike }) => {
    return (
        <div className="overflow-y-auto flex-grow">
            {songs.map((song, index) => (
                <Song
                    index={index}
                    key={song.id}
                    id={song.id}
                    liked={song.liked}
                    imageAlt={song.name}
                    imageSrc={song.cover_image_path}
                    title={song.name}
                    onSelect={onSelect}
                    doLike={doLike}
                    selectedSongId={selectedSongId}
                />
            ))}
        </div>
    );
};
