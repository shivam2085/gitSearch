import { Box, Card, Skeleton } from "@mui/material";

const CardSkeleton = () => {
  return [...Array(10)]?.map((_, index) => {
    return (
      <Card
        sx={{ width: "100%", padding: "12px 20px", marginBottom: "20px" }}
        key={index}
      >
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", marginLeft: "20px" }}
            width={400}
            height={40}
          />
        </Box>
        <Skeleton /> <Skeleton /> <Skeleton />
        <Box display={"flex"} alignItems={"center"} mt={1}>
          <Box display={"flex"} alignItems={"center"} mr={3}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton width={80} height={22} sx={{ marginLeft: "10px" }} />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton width={50} height={22} sx={{ marginLeft: "10px" }} />
          </Box>
        </Box>
      </Card>
    );
  });
};
export default CardSkeleton;
