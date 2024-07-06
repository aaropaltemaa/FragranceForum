import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddReviewForm from '../../Forms/AddReviewForm';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

const FragranceModal = () => {
    const [open, setOpen] = useState(false);
    const loggedInUser = useSelector((state) => {
        const loggedInUserId = state.login.user?.id;
        return state.users.find(user => user.id === loggedInUserId);
    });
    const user = useSelector(state => state.login.user) || loggedInUser;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {user ? (
                <>
                    <Button variant="outlined" onClick={handleClickOpen} sx={{ marginLeft: "950px", marginTop: "-70px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", elevation: 2 }}>
                        Add Review
                        <LocalFloristIcon sx={{ marginLeft: 2.5 }} />
                    </Button>
                    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: 500 } }}>
                        <DialogTitle>Add Review</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please fill out the form below to add a review.
                            </DialogContentText>
                            <AddReviewForm
                                onClose={() => setOpen(false)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                <Typography
                    sx={{
                        fontWeight: 'fontWeightBold', // Bold text for emphasis
                        fontSize: '1.5rem', // Slightly larger text
                        marginLeft: '950px', // Maintain original left margin
                        marginTop: '-80px', // Adjust top margin for alignment
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)', // Subtle shadow for depth
                        textTransform: 'uppercase', // UPPERCASE for a distinct look
                        padding: '40px 0', // Add some vertical padding
                    }}
                >
                    Log in to add review
                </Typography>
            )}
        </div>
    );
}

export default FragranceModal;