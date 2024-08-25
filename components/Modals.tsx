import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FileUploadDemo } from './FileUploadDemo';
import { PlaceholdersAndVanishInputDemo } from './PlaceholdersAndVanishInputDemo';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Modal({ open, setOpen, handleClose, handleClickOpen, title, fileUploadTrue }: any) {
  
  const handleCloseWithReload = () => {
    handleClose(); // Close the modal
    window.location.reload(); // Trigger a hard reload
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseWithReload} // Use the modified close handler
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseWithReload}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {fileUploadTrue ? (
            <FileUploadDemo />
          ) : (
            <PlaceholdersAndVanishInputDemo />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseWithReload}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
