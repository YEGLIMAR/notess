import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const ModalComponent = ({ open, onClose, note, onSave, onChangeTitle, onChangeContent }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': { borderRadius: '20px', padding: '15px' }
      }}
    >
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        Edit Note
      </DialogTitle>
      
      <DialogContent sx={{ paddingTop: '50px' }}>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={note.title}
          onChange={(e) => onChangeTitle(e.target.value)}
          variant="standard"
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={5}
          margin="dense"
          value={note.content}
          onChange={(e) => onChangeContent(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: '10px' }}
        />
      </DialogContent>

      <DialogActions sx={{ padding: '10px 24px', justifyContent: 'space-between' }}>
        <Button onClick={onClose} sx={{ color: "white", fontWeight: 'normal', backgroundColor:'orange' }}>CANCEL</Button>
        <Button onClick={onSave} sx={{  color: 'white', fontWeight: 'normal', backgroundColor:'purple' }}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;

