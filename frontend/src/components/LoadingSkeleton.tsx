import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function LoadingSkeleton() {

  return (
    <div className="card card-body">
        <SkeletonTheme baseColor="#808080" highlightColor="#FFFFFF">
            <h3>
                <Skeleton count={1} />
            </h3>
        </SkeletonTheme>
        <SkeletonTheme baseColor="#808080" highlightColor="#FFFFFF">
            <p>
            <Skeleton count={4} />
            </p>
        </SkeletonTheme>
    </div>
  )
}

export default LoadingSkeleton;
