import React from 'react'
import * as styled from './Modal.styled'

function CommonModal(props) {
    if(!props.show){
        return null;
    }
    return (
    <styled.modalOverlay>
        <styled.modalDialog>

        <styled.modalDialogcontent>
            <styled.modalDialogTitle>{props.title}</styled.modalDialogTitle>
            <styled.modalDialogDescription>{props.description}</styled.modalDialogDescription>
        </styled.modalDialogcontent>

        <hr />

        <styled.modalDialogFooter>
            <styled.modalDialogOk onClick={props.close}>Ok</styled.modalDialogOk>
        </styled.modalDialogFooter>

        </styled.modalDialog>

    </styled.modalOverlay>
    )
}

export default CommonModal
