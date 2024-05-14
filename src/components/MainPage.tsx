
import {socket} from "../socket.ts";
import {useNavigate} from "react-router";

const MainPage = () =>{

    const navigate = useNavigate();

    function joinRoom(e: any){

        const room = e.target.id

        socket.emit('join room', room)

        socket.on('waiting for opponent', ()=>{
            navigate('/waiting-for-opponent')
        })

        socket.on('start game', ()=>{
            navigate('/game-page')
        })


    }
    return (
        <div>
            <div className="title-container">
                <h1 className={"title"}>Select Room</h1>
                <div className={"rooms-container"}>
                    <button id={"room1"} className={"room-button"} onClick={joinRoom}>Room 1</button>
                    <button id={"room2"} className={"room-button"} onClick={joinRoom}>Room 2</button>
                    <button id={"room3"} className={"room-button"} onClick={joinRoom}>Room 3</button>
                </div>
            </div>
        </div>
)
}


export default MainPage;
