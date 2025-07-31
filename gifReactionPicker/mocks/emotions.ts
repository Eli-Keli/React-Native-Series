// List of emotions with matching GIFs
import { Emotion } from "@/types";

export const emotions: Emotion[] = [
    {
        id: "excited",
        name: "Excited",
        emoji: "🤩",
        color: "#FFD166",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "happy",
        name: "Happy",
        emoji: "😊",
        color: "#6C63FF",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "sad",
        name: "Sad",
        emoji: "😢",
        color: "#74C0FC",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "angry",
        name: "Angry",
        emoji: "😡",
        color: "#FA5252",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "confused",
        name: "Confused",
        emoji: "🤔",
        color: "#20C997",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "bored",
        name: "Bored",
        emoji: "😴",
        color: "#ADB5BD",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "surprised",
        name: "Surprised",
        emoji: "😲",
        color: "#FF922B",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
    {
        id: "love",
        name: "Love",
        emoji: "❤️",
        color: "#F06595",
        gifs: [], // Will be populated dynamically from GIPHY API
    },
];