import { useEffect, useState } from "react";
import axiosInstance from "../axios";

export function usePlayable() {
    const [playable, setPlayable] = useState("");

    useEffect(() => {
        axiosInstance.get(`/api/playable`).then((response) => {
            setPlayable(response.data);
        });
    }, [playable]);
    return playable;
}
