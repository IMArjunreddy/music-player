import React from 'react';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
    let originFetch;
    window.alert = () => {};

    beforeEach(() => {
        originFetch = (global as any).fetch;
    });
    afterEach(() => {
        (global as any).fetch = originFetch;
    });

    it('should show songs', async () => {
        const fakeSongsResponse = [
            {
                id: 'ad8',
                name: 'test song',
                cover_image_path: 'https://api-stg.jam-community.com/img/song_default_image.png',
            },
        ];
        const mRes = { json: jest.fn().mockResolvedValueOnce(fakeSongsResponse) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
        (global as any).fetch = mockedFetch;

        const { getByTestId } = render(<Home />);
        const p = await waitFor(() => getByTestId('ad8'));
        expect(p.textContent).toEqual('test song');
        expect(mockedFetch).toBeCalledTimes(1);
        expect(mRes.json).toBeCalledTimes(1);
    });

    it('click on song name should show audio player', async () => {
        const fakeSongsResponse = [
            {
                id: 'ad8',
                name: 'test song',
                cover_image_path: 'https://api-stg.jam-community.com/img/song_default_image.png',
            },
        ];
        const songsRes = { json: jest.fn().mockResolvedValueOnce(fakeSongsResponse) };
        const mockedFetch = jest.fn().mockResolvedValueOnce(songsRes as any);
        (global as any).fetch = mockedFetch;

        const { getByTestId, getByRole } = render(<Home />);
        const p = await waitFor(() => getByTestId('ad8'));
        p.click();
        const group = await waitFor(() => getByRole('audio-player'));
        expect(group).toBeTruthy();
    });

    it('should like song', async () => {
        const fakeSongsResponse = [
            {
                id: 'ad8',
                name: 'test song',
                cover_image_path: 'https://api-stg.jam-community.com/img/song_default_image.png',
            },
        ];
        const fakeLikeResponse = {
            id: 7383,
        };
        const songsRes = { json: jest.fn().mockResolvedValueOnce(fakeSongsResponse) };
        const likeRes = { json: jest.fn().mockResolvedValueOnce(fakeLikeResponse) };
        const mockedFetch = jest
            .fn()
            .mockResolvedValueOnce(songsRes as any)
            .mockResolvedValueOnce(likeRes as any);
        (global as any).fetch = mockedFetch;

        const { getByTestId, getByRole } = render(<Home />);
        await waitFor(() => getByTestId('ad8'));
        const likeButton = await waitFor(() => getByRole('like'));
        await likeButton.click();
        const likedIcon = await waitFor(() => getByRole('liked'));
        expect(likedIcon).toBeTruthy();
    });
});
