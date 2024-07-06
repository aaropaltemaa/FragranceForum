import { useState } from 'react';
import { TextField, Stack, Button, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFragrances } from '../../reducers/fragranceReducer';
import fragranceService from '../../services/fragrances';
import { LongevityRatingForm, SillageRatingForm } from '../Display_Reviews/Rating';
import { fragranceTypes, fragranceBrands, allNotes } from '../../types';
import PropTypes from 'prop-types';

const AddReviewForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState([]);
    const [longevityRating, setLongevityRating] = useState(0.5);
    const [sillageRating, setSillageRating] = useState(0.5);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => {
        const loggedInUserId = state.login.user?.id;
        return state.users.find(user => user.id === loggedInUserId);
    });
    const user = useSelector(state => state.login.user) || loggedInUser;

    const fragrances = useSelector(state => state.fragrances);

    const addReview = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('notes', notes);
        formData.append('longevityRating', longevityRating);
        formData.append('sillageRating', sillageRating);

        if (image) {
            formData.append('image', image);
        }

        try {
            const returnedReview = await fragranceService.create(formData);

            returnedReview.user = {
                username: user.username,
                name: user.name,
                id: user.id
            };

            dispatch(setFragrances(fragrances.concat(returnedReview)));

            setName('');
            setBrand('');
            setType('');
            setDescription('');
            setNotes([]);
            setLongevityRating(0);
            setSillageRating(0);
            setImage(null);
            onClose();
        } catch (error) {
            console.error("Error adding review", error);
        }
    };

    return (
        <form onSubmit={addReview}>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                <Autocomplete
                    id="brand-autocomplete"
                    options={fragranceBrands}
                    renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
                    value={brand}
                    onChange={(_, newBrandValue) => setBrand(newBrandValue)}
                    isOptionEqualToValue={(option, value) => option === value}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <Autocomplete
                    id="type-autocomplete"
                    options={fragranceTypes}
                    renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                    value={type}
                    onChange={(_, newTypeValue) => setType(newTypeValue)}
                    isOptionEqualToValue={(option, value) => option === value}
                />
                <Autocomplete
                    id="notes-autocomplete"
                    multiple
                    options={allNotes}
                    renderInput={(params) => <TextField {...params} label="Notes" variant="outlined" />}
                    value={notes}
                    onChange={(_, newNotesValue) => setNotes(newNotesValue)}
                    isOptionEqualToValue={(option, value) => option === value}
                />
                <LongevityRatingForm rating={longevityRating} setRating={setLongevityRating} />
                <SillageRatingForm rating={sillageRating} setRating={setSillageRating} />
                <TextField
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Stack>
            <Button type="submit">Add Review</Button>
        </form>
    );
};

AddReviewForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddReviewForm;
