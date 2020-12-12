import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { getTodaysDate } from "../../../utility/utility";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function HikeLogModal({
  setOpenLogModal,
  openLogModal,
  setHikeDate,
  handleAddToLog,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleCloseLogModal = () => {
    setOpenLogModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Hike to Log</h2>
      {/* <TextField
        id="standard-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="outlined"
      /> */}
      <TextField
        required
        id="date"
        label="Date of Hike"
        type="date"
        className={classes.textField}
        onChange={(e) => setHikeDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <button onClick={handleAddToLog}>Add</button>

      <HikeLogModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={openLogModal}
        onClose={handleCloseLogModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
