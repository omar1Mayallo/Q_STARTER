import React from "react";

export default function useSelectRows<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { id: number; [key: string]: any },
>(data: T[]) {
  const [selected, setSelected] = React.useState<number[]>([]);
  const handleSelectAllClick = (
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event?.target.checked) {
      const newSelected = data.map((n) => n.id)!;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  return { selected, handleSelectAllClick, isSelected, handleClick };
}
