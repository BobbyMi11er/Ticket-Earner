import "../styles/Opening.scss";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";

export default function Opening({ playable, setLoadGame }) {

    const [btnClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setLoadGame(true);
        setButtonClicked(true);
    };

    useEffect(() => {
        if (btnClicked) {
            const game = document.getElementById("game");
            if (game) {
                game.scrollIntoView({ behavior: "smooth" });
                console.log("scrolling");
            }
        }
    })

    return (
        <div className="Opening">
            <Container maxWidth="md">
                <h1 style={{ background: 'rgba(0, 0, 0, 0.45)' }}>
                    Earn the Chance to Buy Zach Bryan Tickets
                </h1>
                <Container className="textContainer">
                    <h3>
                        You will have 5 chances to name the album and song from
                        which the generated lyric is from.{" "}
                    </h3>
                    <h3>
                        {" "}
                        If you get a score of 60% or better, you will be
                        directed to Zach Bryan's TicketMaster page where you
                        will be given the opportunity to purchase tickets.{" "}
                    </h3>
                    <h3>
                        If not, the chance to purchase tickets will go to a true
                        fan.
                    </h3>
                    <h2>Good Luck!</h2>
                </Container>
                {playable === true ? (
                    <div>
                        <LoadingButton
                            className="loadingBtn"
                            onClick={handleClick}
                            loading={false}
                            variant="contained"
                            size="large"
                        >
                            {" "}
                            Earn Ticket{" "}
                        </LoadingButton>
                    </div>
                ) : (
                    <div>
                        <h1>
                            You have already lost! Listen to more of Zach
                            Bryan's music and maybe you'll be able to get
                            tickets for his next tour
                        </h1>
                    </div>
                )}
            </Container>
        </div>
    );
}
