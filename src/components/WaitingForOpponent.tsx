import {useEffect} from "react";
import {socket} from "../socket.ts";
import {useNavigate} from "react-router";

const waitingForOpponent = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        socket.on('start game', ()=>{
            navigate('/game-page')
        })
    },[])
    return (
        <div className={"waiting-room-container"}>
            <h1 className={"title"}>Waiting For Opponent...</h1>
            <div className={"loader"}></div>
        </div>
    )
}
export default waitingForOpponent;