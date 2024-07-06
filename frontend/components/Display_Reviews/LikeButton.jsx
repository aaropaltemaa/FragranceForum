import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const LikeButton = ({ fragrance, handleLike }) => {
    return (
        <Button
            variant="outlined"
            size="medium"
            style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", elevation: 2 }}

            onClick={() => handleLike(fragrance)}
        >
            {fragrance.likes.length} {fragrance.likes.length === 0 ? 'likes' : (fragrance.likes.length > 1 ? 'likes' : 'like')}
            <ThumbUpIcon sx={{ marginLeft: 2.5 }} />
        </Button>
    );
};

LikeButton.propTypes = {
    fragrance: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired
};

export default LikeButton;
