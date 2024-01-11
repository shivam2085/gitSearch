import api from "../pages/Intercepter/Axiosinterceptor";
import { DropDownOption } from "../types/data";

export const getSearchData = async (
  searchText: string,
  page: number,
  pageLimit: number,
  sortedItem?: DropDownOption
) => {
  let URL = `search/repositories`;
  if (searchText) {
    URL += `?q=${searchText}&page=${page}&per_page=${pageLimit}`;
  } else if (sortedItem) {
    URL += `&sort=${sortedItem?.id}&order=desc`;
  }
  try {
    const response = await api.get(URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};
