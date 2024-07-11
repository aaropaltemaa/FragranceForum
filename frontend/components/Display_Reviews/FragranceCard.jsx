import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Typography, CardActions, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { removeFragrance, likeFragrance } from "../../reducers/fragranceReducer";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from "react";
import LikeButton from "./LikeButton";

const ShowReviews = ({ fragrance }) => {
    const [showReviews, setShowReviews] = useState(false);
    const toggleShowReviews = () => setShowReviews(!showReviews); // Toggle showReviews state
    const hideWhenVisible = { display: showReviews ? 'none' : '' };
    const showWhenVisible = { display: showReviews ? '' : 'none' };

    return (
        <div>
            <div style={{ ...hideWhenVisible, marginBottom: "-30px" }}>
                <Button variant="outlined" size="medium" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", elevation: 2 }}
                    onClick={toggleShowReviews}
                >
                    {fragrance.reviews.length} {fragrance.reviews.length === 0 ? 'comments' : (fragrance.reviews.length > 1 ? 'comments' : 'comment')}
                    <VisibilityIcon sx={{ marginLeft: 2.5 }} />
                </Button>
            </div>
            <div style={{ ...showWhenVisible, marginBottom: "16px" }}>
                <Button variant="outlined" size="medium" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", elevation: 2 }}
                    onClick={toggleShowReviews}
                >
                    Hide Comments
                    <VisibilityIcon sx={{ marginLeft: 2.5 }} />
                </Button>
                <div>
                    {fragrance.reviews.map(review => (
                        <Card key={review._id} sx={{ marginBottom: 2, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", backgroundColor: "#f5f5f5" }}>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {review.comment} - {new Date(review.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

ShowReviews.propTypes = {
    fragrance: PropTypes.object.isRequired,
};

const FragranceCard = ({ fragrance }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user)
    const staticFilesBaseUrl = import.meta.env.VITE_REACT_APP_STATIC_FILES_BASE_URL

    const handleDelete = (id) => {
        dispatch(removeFragrance(id));
    };

    const handleLike = async (fragrance) => {
        dispatch(likeFragrance(fragrance, user));
    };

    return (
        <div>
            <Card elevation={3}>
                <CardHeader
                    action={
                        (user && fragrance.user && fragrance.user.username === user.username) &&
                        <IconButton onClick={() => (handleDelete(fragrance.id))}>
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={fragrance.name}
                    subheader={<Typography variant="subtitle2" color="tertiary" sx={{ color: "turquoise" }}>{fragrance.brand}</Typography>}
                />
                <span style={{ fontSize: 'large', marginLeft: 15 }}>{new Date(fragrance.createdAt).toLocaleString()}</span>
                <CardContent>
                    {fragrance.imageUrl && (
                        <img src={`${staticFilesBaseUrl}${fragrance.imageUrl}`} alt={fragrance.name} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    )}
                    <Typography>{fragrance.likes} likes </Typography>
                    <Typography variant="body3">
                        <strong>{fragrance.user.username}</strong> {fragrance.description}
                        <br />
                        <br />
                        <b>Longevity:</b> {fragrance.longevityRating}
                        <br />
                        <b>Sillage: </b> {fragrance.sillageRating}
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <ShowReviews fragrance={fragrance} />
                </CardActions>
                <Card style={{ marginTop: '50px', }}>
                    <div style={{ position: 'absolute', marginTop: '-10px', marginLeft: '5px' }}>
                        <LikeButton fragrance={fragrance} handleLike={handleLike} />
                    </div>
                </Card>
                <AddCommentIcon sx={{ marginLeft: 50 }} />
            </Card>
        </div>
    );
}

FragranceCard.propTypes = {
    fragrance: PropTypes.object.isRequired,
};

export default FragranceCard;