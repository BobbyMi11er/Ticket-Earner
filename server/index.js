const express = require("express");
const keys = require('./keys')
require("dotenv").config();


const PORT = process.env.PORT || 8000;
var api_url = "http://api.musixmatch.com/ws/1.1/";
var api_key = "YOUR_API_KEY_HERE";
const app = express();
const axios = require("axios");
const cors = require('cors')

const allowedOrigins = [
    `http://localhost:3000`,
]

const corsOptions = {
    origin: allowedOrigins
}

app.use(cors(corsOptions))

// Zach Bryan Musixmatch ID
var artist_id  = 39897162;
var artist_name = "zach%20bryan";
// YYYYMMDD
var date_cutoff = 20220101;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/playable", (req, res) => {
    res.send(true);
});

app.get("/random-lyric/:trackID", async (req, res) => {
    // use track.lyrics.get
    try {
        const trackID = req.params.trackID;

        var lyricSearchURL = api_url+"track.lyrics.get?track_id="+trackID+"&apikey="+api_key;
        var response = await axios.get(lyricSearchURL);
        if (response.data.message.header.status_code == 404) {
            lyricSearchURL = api_url+"track.snippet.get?track_id="+trackID+"&apikey="+api_key
            response = await axios.get(lyricSearchURL);
            if (response.data.message.header.status_code == 404) {
                res.send("Error: Musixmatch Lyric Fetch Not Working");
            }
            res.send(response.data.message.body.snippet.snippet_body)
        }
        else {
            const lyricsStr = response.data.message.body.lyrics.lyrics_body;
            const lyricsArray = lyricsStr.split("\n");
            let lyricsArrayCleaned = [];

            for (let i = 0; i < lyricsArray.length; i += 2) {
                if (validLyric(lyricsArray[i]) && validLyric(lyricsArray[i + 1])) {
                    lyricsArrayCleaned.push(
                        lyricsArray[i] + "\n" + lyricsArray[i + 1]
                    );
                }
            }

            let randLyric = getRandomElement(lyricsArrayCleaned);
            res.send(randLyric);
        }
    } catch (err) {
        console.log(err);
    }
    // get body.lyrics.lyrics_body
    // split into array at \n
    // get random element from array
    // return lyric
});

app.get("/getData", async (req, res) => {
    // returns top 100 songs from zach bryan
    // search for tracks from before DATE_CUTOFF - DATE_CUTOFF and 2 calls allows us to get up to 200 songs instead of 100
    // need to use this because other musixmatch api calls are deprecated
    try {
        // var trackSearchURL = `${API_URL}track.search?q_artist=${ARTIST_NAME}&f_artist_id=${ARTIST_ID}&page_size=100&apikey=${API_KEY}&f_track_release_group_first_release_date_max=${DATE_CUTOFF}`;
        
	var trackSearchURL = api_url+"track.search?q_artist="+artist_name+"&f_artist_id="+artist_id;
	trackSearchURL += "&page_size=100&apikey="+api_key+"&f_track_release_group_first_release_date_max="+date_cutoff;

	var response = await axios.get(trackSearchURL);

        var trackList = response.data.message.body.track_list;

        var data = [];
        var albums = [];

        processData(data, albums, trackList);

        // search for tracks from after DATE_CUTOFF
        // trackSearchURL = `${API_URL}track.search?q_artist=${ARTIST_NAME}&f_artist_id=${ARTIST_ID}&page_size=100&apikey=${API_KEY}&f_track_release_group_first_release_date_min=${DATE_CUTOFF}`;
        
	trackSearchURL = api_url+"track.search?q_artist="+artist_name+"&f_artist_id="+artist_id;
        trackSearchURL += "&page_size=100&apikey="+api_key+"&f_track_release_group_first_release_date_min="+date_cutoff;
	
	response = await axios.get(trackSearchURL);
	
	trackList = response.data.message.body.track_list;

        processData(data, albums, trackList);

        // remove any albums that don't have at least 4 songs
        for (let i = 0; i < data.length; ++i) {
            if (data[i].songs.length < 4) {
                data.splice(i, 1);
                --i;
            }
        }
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

function validLyric(lyric) {
    let char = lyric.charAt(0);
    return (
        lyric.length > 0 &&
        char.toLowerCase() !== char.toUpperCase() &&
        lyric.includes(" ")
    );
}

function processData(data, albums, trackList) {
    trackList.forEach((element) => {
        var index = albums.indexOf(element.track.album_name);
        var albumName = element.track.album_name;

        if (!element.track.track_name.includes("Live")) {
            // new album
            if (index == -1) {
                albums.push(albumName);
                data.push({
                    album_name: albumName,
                    album_id: element.track.album_id,
                    songs: [
                        {
                            track_name: element.track.track_name,
                            track_id: element.track.track_id,
                        },
                    ],
                });
            } else {
                // album already exists in data, so add song to album song list
                data[index].songs.push({
                    track_name: element.track.track_name,
                    track_id: element.track.track_id,
                });
            }
        }
    });
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
