import { useEffect, useState } from "react";
import axios from "axios";

export function usePlayable() {
    const [playable, setPlayable] = useState("");

    useEffect(() => {
        axios.get(`/playable`).then((response) => {
            setPlayable(response.data);
        });
    }, [playable]);
    return playable;
}
