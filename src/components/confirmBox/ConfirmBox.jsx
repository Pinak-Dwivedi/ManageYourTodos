import "./ConfirmBox.css";
import { useEffect , useContext } from "react";
import AuthContext from "../../index";

export default function ConfirmBox({ confirmBoxRef, deleteFunction})
{   
    const {loading} = useContext(AuthContext);

    useEffect( () => {

        if(confirmBoxRef.current == null)
        return;

            const timerId = setTimeout(() => {
                confirmBoxRef.current.classList.remove("active");
            }, 5000)
    
            return () => {
                clearTimeout(timerId)
            }

    }, [confirmBoxRef])

    return(
    <div className="confirmBox-overlay">

        <div ref = {confirmBoxRef} className="confirmBox-container">

            <div className="confirmBox-message">⚠️ Are you sure! you want to delete this todo</div>

            <div className="confirmBox-buttonsContainer">
                <button className="confirmBox-button confirmBox-yesButton" onClick = { () =>
                { 
                    if(loading)
                    return false;

                    deleteFunction(); 
                    confirmBoxRef.current.classList.remove("active");

                }}>Yes</button>
                <button className="confirmBox-button confirmBox-noButton" onClick={ () => confirmBoxRef.current.classList.remove("active") }>No</button>
            </div>
        </div>
    </div>
    )
}