import { useEffect, useState } from "react";

export default function useFilter(filterOptions, data) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let allData = data;

    if (filterOptions.productName) {
      allData = allData.filter((item) =>
        item.product[0].name
          .toLowerCase()
          .includes(filterOptions.productName.toLowerCase())
      );
    }

    if (filterOptions.amount) {
      allData = allData.filter((item) => item.amount === filterOptions.amount);
    }

    if (filterOptions.date) {
      allData = allData.filter(
        (item) =>
          new Date(item.date).toISOString().split("T")[0] ===
          new Date(filterOptions.date).toISOString().split("T")[0]
      );
    }

    setFilteredData(allData);
  }, [filterOptions]);

  return filteredData;
}
