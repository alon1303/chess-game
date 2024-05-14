import {Route, Routes} from "react-router";
import MainPage from "./components/MainPage.tsx";
import GamePage from "./components/GamePage.tsx";
import NavBar from "./components/Navbar.tsx";
import WaitingForOpponent from "./components/WaitingForOpponent.tsx";




function App() {


    return (
        <div>
            <NavBar></NavBar>

            <div className="">

                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/game-page" element={<GamePage/>}></Route>
                    <Route path="/waiting-for-opponent" element={<WaitingForOpponent/>}></Route>
                </Routes>

            </div>
        </div>

    );
}

export default App
