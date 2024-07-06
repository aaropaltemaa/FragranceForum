import Skeleton from '@mui/material/Skeleton';

const BrandCardSkeleton = () => {
    return (
        <div style={{ border: '1px solid transparent', borderRadius: '5px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <Skeleton variant="text" width={250} height={150} />
        </div>
    );
};

const FragranceBrandsPageSkeleton = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
            {Array.from(new Array(10)).map((_, index) => (
                <BrandCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default FragranceBrandsPageSkeleton;