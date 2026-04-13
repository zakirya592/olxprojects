import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../utils/NewRequest";

async function fetchCategoryProducts() {
  const response = await NewRequest.get("/product/getcategoryproduct");
  return response?.data;
}

export function useCategoryNavigation() {
  const navigate = useNavigate();
  const { data: productsdata } = useQuery(
    "productgetcategoryss",
    fetchCategoryProducts
  );

  const goToCategory = (categoryItem) => {
    const name = categoryItem?.name ?? categoryItem;
    if (!name) return;
    const selected = productsdata?.find(
      (item) => item.category.name === name
    );
    if (selected) {
      sessionStorage.setItem("productmore", JSON.stringify(selected));
      navigate(`/moreproduct/${selected.category.name}`);
    }
  };

  return { goToCategory, productsdata };
}
