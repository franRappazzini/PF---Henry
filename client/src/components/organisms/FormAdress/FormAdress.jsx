import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

export default function FormAdress ({handleAdressChange, onClickBuy, input, handleCloseAdress}) {
    return (
        <Dialog open={input} onClose={handleCloseAdress}>
            <DialogTitle>Adress</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter a valid address to send the purchased products
            </DialogContentText>
            <TextField
                onChange={(e)=>handleAdressChange(e)}
                margin="dense"
                id="adress"
                label="Address"
                placeholder="Calle Falsa 123, Rosario, Santa Fe, Argentina"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseAdress}>Cancel</Button>
            <Button onClick={onClickBuy}>Pay purchase</Button>
            </DialogActions>
        </Dialog>
    )
}