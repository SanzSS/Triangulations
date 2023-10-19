import React from "react";
import "../ExploreStyles/Popup.css";

const Popup = (props) => {
    // const handleKeyPress = document.addEventListener("keyup", function (e) {
    //     if (e.key === "Escape") {
    //         // hide modal code
    //         props.handleClose;
    //     }
    // });
    return (
        // <div className='popup-box'>
        //     <div className='box'>
        //         <span className='close-icon' onClick={props.handleClose}>
        //             x
        //         </span>
                <dialog open>
            <article>
                <header>
                    <a
                        href='#close'
                        aria-label='Close'
                        class='close'
                        onClick={props.handleClose}
                    ></a>
                    More info
                </header>
                {props.content}
            {/* </div>
        </div> */}
          </article>
        </dialog>
    );
};

export default Popup;
