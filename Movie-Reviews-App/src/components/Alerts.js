import React, { useState } from "react";
import { Alert } from "react-bootstrap"

function Alerts({show, success, message, setShow = f => f}) {
    if (show) {
        if(!success){
            return (
                <>
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{message}</Alert.Heading>
                    </Alert>
                </>
            );
        }else{
            return (
                <>
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{message}</Alert.Heading>
                    </Alert>
                </>
            );
        }
    }else{
        return;
    }
}

export default Alerts;