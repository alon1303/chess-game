import {JSX} from "react";
import MainPage from "./components/MainPage.tsx";
import GamePage from "./components/GamePage.tsx";
import WaitingForOpponent from "./components/WaitingForOpponent.tsx";

type RouteI = {
    path: string,
    element:JSX.Element
}
const routes: RouteI[] = [
    {path: "/", element:<MainPage/>},
    {path: "/game-page", element:<GamePage/>},
    {path: '/waiting-for-opponent', element:<WaitingForOpponent/>}
]
export default routes;