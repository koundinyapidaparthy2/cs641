import Main from "../components/Main";
import Home from "../components/Home";
import Mood from "../components/Mood";
import Analytics from "../components/Analytics";

export const PublicRoutes = [
    {
        name: "Main",
        component: Main,
    },
];

export const TabRoutes = [
    {
        name: "Home",
        component: Home,
        icon: 'home-outline',
        headerShow: false
    },
    {
        name: "Mood",
        component: Mood,
        icon: 'happy-outline',
        title: "Emotions Journal",
        headerShow: true
    }
];