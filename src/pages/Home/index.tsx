import { Box, Container, Grid, Pagination } from "@mui/material";
import { Card } from "../Card/Index";
import { useEffect, useState } from "react";
import { getSearchData } from "../../Service/SearchService";
import gitLogo from "../../assets/gitLogo.png";
import CardSkeleton from "../Skeloton";
import { DropDownOption, cardData, dropDownJson } from "../../types/data";
import useDebounce from "../../utils/useDebounce";

const Home = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchItemList, setSearchItemList] = useState<cardData[]>([]);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sortedItem, setSortedItem] = useState<DropDownOption>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageLimit = 10;
  const debouncedValue = useDebounce(searchItem, 1000);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setIsLoading(true);
    searchItem &&
      getSearchData(debouncedValue || "", page, pageLimit, sortedItem)
        .then((response) => {
          setSearchItemList(response?.data?.items);
          setTotalResult(response?.data?.total_count);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(true);
        });
  }, [debouncedValue, page, sortedItem]);

  const sortItemById = (item: DropDownOption) => {
    setSortedItem(item);
    setIsOpen(false);
  };

  return (
    <>
      <Box className="mainHeader">
        <img src={gitLogo} alt="github" className="gitLogo" />
        <div className="searchInput">
          <input
            type="text"
            placeholder={"Search....."}
            onChange={(e) => setSearchItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
      </Box>
      {/* ===========================Main Container============================ */}
      <Container maxWidth="xl">
        {searchItem === "" ? (
          <Box display={"flex"} width={"100%"} justifyContent={"center"}>
            <div>
              <div>
                <img src={gitLogo} alt="" />
              </div>
              <h1 style={{ textAlign: "center" }}>Search for repos</h1>
            </div>
          </Box>
        ) : (
          <Grid container columnSpacing={2} rowGap={2}>
            {totalResult && (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <div>
                  <p className="totalCount">{totalResult} results</p>
                </div>
                <Box position={"relative"}>
                  <div
                    className="sortDropdown"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Sort by : {sortedItem?.label}
                  </div>
                  {isOpen && (
                    <div className={"dropDownList"}>
                      {dropDownJson?.map((item, index) => (
                        <div
                          key={index}
                          className={
                            sortedItem?.id === item?.id
                              ? "activeSort"
                              : "sortItem"
                          }
                          onClick={() => sortItemById(item)}
                        >
                          {item?.label}
                        </div>
                      ))}
                    </div>
                  )}
                </Box>
              </Box>
            )}

            {isLoading ? (
              <CardSkeleton />
            ) : (
              <>
                {searchItemList?.map((item: cardData, index) => (
                  <Grid item md={12} lg={12} sm={12} xs={12} key={index}>
                    <Card
                      name={item?.name}
                      avatar={item?.owner?.avatar_url}
                      language={item?.language}
                      description={item?.description}
                      stars={item?.stargazers_count}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        )}

        {/* ===================Pagination================== */}
        {searchItem && (
          <Box className="pageNation-container">
            <Pagination
              count={Math.ceil(totalResult / 10)}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;
