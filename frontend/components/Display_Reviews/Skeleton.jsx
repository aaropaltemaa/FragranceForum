import Skeleton from '@mui/material/Skeleton';

const FragranceCardSkeleton = () => {
    return (
        <div>
            <Skeleton variant="rectangular" width={345} height={20} style={{ marginBottom: 6 }} />
            <Skeleton variant="text" width={215} />
            <Skeleton variant="text" width={345} />
            <Skeleton variant="text" width={345} />
            <Skeleton variant="rectangular" width={345} height={118} />
        </div>
    );
}

export default FragranceCardSkeleton;