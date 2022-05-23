import React from "react";


const Modal = props => {
    return (

        // <div class="modal" tabindex="-1" role="dialog">
        //     <div class="modal-dialog" role="document">
        //         <div class="modal-content">
        //             <div class="modal-header">
        //                 <h5 class="modal-title">Modal title</h5>
        //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={props.handleClose}>
        //                     <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div class="modal-body">
        //                 {props.content}
        //             </div>
        //             <div class="modal-footer">
        //                 <button type="button" class="btn btn-primary">Save changes</button>
        //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default Modal;
