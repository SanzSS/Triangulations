import React from "react";
import "../ExploreStyles/Popup.css";



const Popup = (props) => {
    // const handleKeyPress = document.addEventListener("keyup", function (e) {
    //     if (e.key === "Escape") {
    //         // hide modal code
    //         props.handleClose;
    //     }
    // });

    const handlePopupClose = () => {
        props.handleClose(props.id);
    }
    return (
        // <div className='popup-box'>
        //     <div className='box'>
        //         <span className='close-icon' onClick={props.handleClose}>
        //             x
        //         </span>
                // <dialog open>
        <div className="popup">
            <article>
                <header>
                    More info
                    <a
                        href='#close'
                        aria-label='Close'
                        className='close'
                        onClick={handlePopupClose}
                    >x</a>
                    
                </header>
                {props.content}
            {/* </div>
        </div> */}
          </article>
        </div>
    );
};

export default Popup;
