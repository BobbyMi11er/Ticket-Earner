import "../styles/Game.scss";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Modal, message } from "antd";

import Form from "./Form";
import axios from "axios";
import axiosInstance from "../axios";

export default function Game() {
    const [percent, setPercent] = useState(0);
    const [lyric, setLyic] = useState("");

    // need to element i to burnt orange after getting it correct, black if wrong
    const [strokeColor, setStrokeColor] = useState([]);

    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [selectedSong, setSelectedSong] = useState("");

    const [data, setData] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [songList, setSongList] = useState([]);

    const [correctAns, setCorrectAns] = useState({});
	const [numIncorrect, setNumIncorrect] = useState(0);
    const [numGuesses, setNumGuesses] = useState(0);
    var alreadyRun = false; // whether or not correctAns has been set yet

    const [winModalOpen, setWinModalOpen] = useState(false);
	const [lossModalOpen, setlossModalOpen] = useState(false);


    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        axiosInstance.get(`/getData`).then((response) => {
            setData(response.data);
            const tempData = response.data;
            let albums = [];
            tempData.forEach((element) => {
                albums.push(element.album_name);
            });
            setAlbumList(albums);

            getLyric(tempData);
        });
    }, []); // dependency array so getData only fetched once

    const getLyric = (tempData) => {
        if (!alreadyRun) {
            alreadyRun = true;
            // get a random object from data[]
            var randObject = getRandomElement(tempData);
            let randAlbum = randObject.album_name;
            var randomSong = getRandomElement(randObject.songs);

            setCorrectAns({
                album_name: randAlbum,
                track_name: randomSong.track_name,
            });
		
	    console.log(randomSong);
            axiosInstance
                .get(`/random-lyric/${randomSong.track_id}`)
                .then((response) => {
                    setLyic(response.data);
                });
        }
    };

    // get song from Form
    const selectSong = (songValue) => {
        setSelectedSong(songValue);
    };

    // get album from Form
    const selectAlbum = (albumValue) => {
        setSelectedAlbum(albumValue);

        data.forEach((element) => {
            if (element.album_name === albumValue) {
                // set songlist to be array of all track_names in element.songs[{}]
                setSongList(element.songs.map((song) => song.track_name));
            }
        });
    };

    const submitGuess = () => {
        if (selectedAlbum !== "" && selectedSong !== "") {
            if (
                selectedSong === correctAns.track_name &&
                selectedAlbum === correctAns.album_name
            ) {
                // guess is correct
                messageApi.open({
                    type: "success",
                    content: "Correct!",
                    duration: 5,
                });
                setStrokeColor((strokeColor) => [
                    ...strokeColor,
                    palate.primary,
                ]);
            } else {
                // guess is incorrect
                const string = `Incorrect. The correct answer was "${correctAns.track_name}" from ${correctAns.album_name}`;
                messageApi.open({
                    type: "error",
                    content: string,
                    duration: 5,
                });
                setStrokeColor((strokeColor) => [...strokeColor, "black"]);
				setNumIncorrect(numIncorrect + 1);
            }
            setNumGuesses(numGuesses + 1);
            setPercent(percent + 20);

            // keep playing
			console.log(numIncorrect);
            if (numIncorrect < 2 && numGuesses < 5) {
                alreadyRun = false;
                getLyric(data);
            } else if (numGuesses === 5) {
				// Win
                setWinModalOpen(true);
            } else {
                // Lost
				setlossModalOpen(true);
            }
        } else {
            // alert that need to select album and song
            messageApi.open({
                type: "warning",
                content: "Warning: You need to select an album and song",
                duration: 5,
            });
        }
    };

    return (
        <div id="game">
            {contextHolder}
            <div className="wrapper">
				<script type="text/javascript" src="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP" />
                <Modal
                    centered
                    open={winModalOpen}
                    onOk={() => setWinModalOpen(false)}
                    width={"60vw"}
					footer=''
					closeIcon={false}
                >
					<div style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
						<h1>Congratulations! You Won!</h1>
						<h2>Click the button below to purchase tickets!</h2>
						<Button
							variant="contained"
							href="https://www.ticketmaster.com/zach-bryan-tickets/artist/2811359"
							target="_blank"
						>
							Go to TicketMaster
						</Button>
					</div>
                </Modal>
				<Modal
                    centered
                    open={lossModalOpen}
                    width={"60vw"}
					footer=''
					closeIcon={false}
                >
					<div style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
						<h1>Unfortunately you have lost the chance to buy tickets.</h1>
						<h2>Better luck for the next tour!</h2>
					</div>
                </Modal>


                <div style={{ flex: "0 1 auto", marginTop: "5vh" }}>
                    <h1
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        What album and song is this lyric from?
                    </h1>
                </div>
                <div className="center">
                    <div>
                        <h2>"{lyric}"</h2>
                    </div>
                    <div className="forms">
                        <Form
                            formName={"Album"}
                            onSelect={selectAlbum}
                            items={albumList}
                        />
                        <Form
                            formName={"Song"}
                            onSelect={selectSong}
                            items={songList}
                        />
                    </div>
                    <div>
                        <Button variant="contained" onClick={submitGuess}>
                            Submit my Guess
                        </Button>
                    </div>
                    <div>
                        <Progress
                            percent={percent}
                            steps={5}
                            strokeColor={strokeColor}
                            size={[40, 20]}
                            showInfo={false}
                        />
                    </div>
                    <p>Lyrics powered by www.musiXmatch.com</p>
                </div>
            </div>
        </div>
    );
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
