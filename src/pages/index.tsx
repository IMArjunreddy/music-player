import React, { createRef, useState, useEffect } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { Loading } from '../components/Loading/Loading';
import { Songs } from '../components/Songs/Songs';
import { motion } from 'framer-motion';

function App() {
    const [songs, setSongs] = useState<song[]>([]);
    const [selectedSong, setSelectedSong] = useState<song>();
    const [loading, setLoading] = useState(false);
    const audioRef = createRef<AudioPlayer>();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setSongs([]);
                let response = await fetch(`https://api-stg.jam-community.com/song/trending`);
                let data: song[] = await response.json();
                data = data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    cover_image_path: item.cover_image_path,
                    liked: false,
                }));
                setSongs(data);
                setLoading(false);
                setSelectedSong(undefined);
            } catch (err) {
                alert(err.message);
            }
        })();
    }, []);

    const playSong = (id: string) => {
        let song = songs.find((song) => song.id === id);
        setSelectedSong(song);
    };

    const likeSong = async (id: string) => {
        try {
            let likeData = new FormData();
            likeData.append('id', id);
            let response = await fetch(
                `https://api-stg.jam-community.com/interact/like?apikey=___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8`,
                {
                    method: 'POST',
                    body: likeData,
                }
            );
            if (response) {
                let newSongs = songs.reduce((list: song[], song) => {
                    if (song.id === id)
                        list.push({
                            ...song,
                            liked: true,
                        });
                    else list.push({ ...song });
                    return list;
                }, []);
                setSongs(newSongs);
            } else throw new Error();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-600 via-teal-7 to-gray-800 p-3">
            <div className="w-full h-full bg-white rounded-md flex flex-col">
                {songs.length > 0 && (
                    <Songs
                        doLike={likeSong}
                        songs={songs}
                        onSelect={playSong}
                        selectedSongId={selectedSong?.id}
                    />
                )}

                {loading && <Loading />}

                {selectedSong && songs.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="bottom-0 flex-grow-0 border-t-2 border-gray-700 rounded-t-md"
                        role="audio-player"
                        transition={{ duration: 0.4 }}
                        variants={{
                            hidden: {
                                opacity: 0.2,
                                bottom: -20,
                            },
                            visible: {
                                opacity: 1,
                                bottom: 0,
                            },
                        }}
                    >
                        <AudioPlayer
                            ref={audioRef}
                            autoPlay={true}
                            className="rounded-md"
                            layout="stacked"
                            customProgressBarSection={[
                                RHAP_UI.PROGRESS_BAR,
                                RHAP_UI.MAIN_CONTROLS,
                                RHAP_UI.VOLUME,
                            ]}
                            customAdditionalControls={[]}
                            showJumpControls={false}
                            autoPlayAfterSrcChange={true}
                            customControlsSection={[]}
                            src={
                                'https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-8-22/832c03d7-8303-ed17-ffbf-26feaf3066e8.m4a'
                            }
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default App;
