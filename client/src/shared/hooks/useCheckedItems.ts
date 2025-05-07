import React from "react";
import { useLocation } from "react-router-dom";

const useCheckedItems = (
  paramKey: string,
  handleParam: (param: string) => void,
) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramItem = params.get(paramKey);
  const defaultStatus = paramItem
    ? paramItem.split(",").filter((element) => element !== "")
    : ["ALL"];

  const [checkedItems, setCheckedItems] =
    React.useState<string[]>(defaultStatus);

  const handleMenuItemClick = (value: string) => {
    if (value === "ALL") {
      setCheckedItems(["ALL"]);
    } else {
      if (checkedItems.includes("ALL")) {
        setCheckedItems([
          ...checkedItems.filter((val) => val !== "ALL"),
          value,
        ]);
      } else {
        const itemExist = checkedItems.includes(value);
        itemExist
          ? setCheckedItems([...checkedItems.filter((val) => val !== value)])
          : setCheckedItems([...checkedItems, value]);
      }
    }
  };

  React.useEffect(() => {
    if (paramItem === null) {
      setCheckedItems(["ALL"]);
    }
  }, [paramItem]);

  React.useEffect(() => {
    if (checkedItems.filter((item) => item !== "ALL").length) {
      handleParam(checkedItems.join(","));
    } else {
      handleParam("");
    }
  }, [checkedItems]);

  return { handleMenuItemClick, checkedItems };
};

export default useCheckedItems;
