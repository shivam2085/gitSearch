import "../Card/cardstyle.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { Box } from "@mui/material";

interface cardData {
  name: string;
  avatar: string | undefined;
  language: string;
  description: string;
  stars: number;
}

export const Card = (cardDataList: cardData) => {
  return (
    <>
      <div className="mainCard">
        <div className="name-avatar">
          <div className="avatar">
            <img src={cardDataList.avatar} alt="" />
          </div>
          <div>
            <h3>{cardDataList?.name}</h3>
          </div>
        </div>
        <div
          className="cardDescription"
          dangerouslySetInnerHTML={{ __html: cardDataList?.description }}
        ></div>
        <Box display={"flex"} alignItems={"center"} mt={2}>
          {cardDataList?.language && (
            <Box display={"flex"} alignItems={"center"} mr={2}>
              <FiberManualRecordIcon
                sx={{ color: "rgb(101, 109, 118)", paddingRight: "4px" }}
                fontSize="small"
              />
              <div>{cardDataList?.language}</div>
            </Box>
          )}
          <Box display={"flex"} alignItems={"center"}>
            <StarBorderRoundedIcon />
            <div className="star">{cardDataList?.stars}</div>
          </Box>
        </Box>
      </div>
    </>
  );
};
