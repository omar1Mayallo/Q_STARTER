import { FileDownload } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import IconButtonTooltip from "./IconButtonTooltip";
import i18next from "i18next";

interface ExportToExcelButtonProps {
  fileName?: string;
  data: unknown[];
}

const ExportToExcelButton = ({
  data,
  fileName = "data-excel-sheet",
}: ExportToExcelButtonProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <IconButtonTooltip
      tooltip={i18next.t("export", {
        ns: "labels",
      })}
      Icon={FileDownload}
      variant={blue[500]}
      hover={blue[700]}
      onClick={exportToExcel}
    />
  );
};

export default ExportToExcelButton;
