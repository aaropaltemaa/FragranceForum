import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const longevityLabels = {
    0.5: '0-1 hours',
    1: '1-2 hours',
    1.5: '2-3 hours',
    2: '3-4 hours',
    2.5: '4-5 hours',
    3: '5-6 hours',
    3.5: '6-8 hours',
    4: '8-10 hours',
    4.5: '10-12 hours',
    5: '12+ hours',
};

const sillageLabels = {
    0.5: 'Barely Noticeable',
    1: 'Faint',
    1.5: 'Subtle',
    2: 'Mild',
    2.5: 'Moderate',
    3: 'Noticeable',
    3.5: 'Strong',
    4: 'Very Strong',
    4.5: 'Potent',
    5: 'Overwhelming',
};

function getLongevityLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${longevityLabels[value]}`;
}

function getSillageLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${sillageLabels[value]}`;
}

export function LongevityRatingForm({ rating, setRating }) {
    const [hover, setHover] = React.useState(-1);

    const handleChange = (_, newValue) => {
        setRating(newValue);
    };

    const handleChangeActive = (_, newHover) => {
        setHover(newHover);
    };

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Typography component="legend">Longevity</Typography>
            <Rating
                name="hover-feedback"
                value={rating}
                precision={0.5}
                getLabelText={getLongevityLabelText}
                onChange={handleChange}
                onChangeActive={handleChangeActive}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 2 }}>{longevityLabels[hover !== -1 ? hover : rating]}</Box>
            )}
        </Box>
    );
}

LongevityRatingForm.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
};

export function SillageRatingForm({ rating, setRating }) {
    const [hover, setHover] = React.useState(-1);

    const handleChange = (_, newValue) => {
        setRating(newValue);
    };

    const handleChangeActive = (_, newHover) => {
        setHover(newHover);
    };

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Typography component="legend">Sillage</Typography>
            <Rating
                name="hover-feedback"
                value={rating}
                precision={0.5}
                getLabelText={getSillageLabelText}
                onChange={handleChange}
                onChangeActive={handleChangeActive}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 2 }}>{sillageLabels[hover !== -1 ? hover : rating]}</Box>
            )}
        </Box>
    );
}

SillageRatingForm.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
};