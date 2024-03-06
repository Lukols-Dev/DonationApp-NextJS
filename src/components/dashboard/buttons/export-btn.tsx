"use client";

import { formatTimestamp } from "@/lib/utils";
import React from "react";

interface Column {
  accessorKey: string;
  header: string;
}

interface Props {
  data: any[];
  columns: Column[];
}

// export const ExportBtn: React.FC<Props> = ({ data, columns }) => {
//   const exportJsonToCSV = () => {
//     // Generate CSV headers from columns titles
//     const csvHeaders = columns.map((column) => column.header).join(",");

//     // Map each object in the data array to a CSV string using columns keys
//     const csvRows = data.map((row) =>
//       columns
//         .map(
//           (column) => `"${String(row[column.accessorKey]).replace(/"/g, '""')}"` // Handle values containing commas or quotes
//         )
//         .join(",")
//     );

//     // Combine headers and rows, and add newline characters
//     const csvString = [csvHeaders, ...csvRows].join("\n");

//     // Create a Blob with the CSV data
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

//     // Create a link and trigger the download
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "export.csv");
//     document.body.appendChild(link);
//     link.click();

//     // Clean up
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <button
//       className="px-3 py-2 border rounded-md my-2 text-sm font-normal"
//       onClick={exportJsonToCSV}
//     >
//       Export
//     </button>
//   );
// };

export const ExportBtn: React.FC<Props> = ({ data, columns }) => {
  const exportJsonToCSV = () => {
    // Generate CSV headers from columns titles
    const csvHeaders = columns.map((column) => column.header).join(",");

    // Map each object in the data array to a CSV string using columns keys
    const csvRows = data.map((row) =>
      columns
        .map((column) => {
          // Sprawdź, czy kolumna zawiera timestamp i wymaga konwersji
          const value = row[column.accessorKey];
          const formattedValue =
            column.accessorKey === "create_at" ? formatTimestamp(value) : value; // Dla 'create_at' stosuj konwersję
          return `"${String(formattedValue).replace(/"/g, '""')}"`; // Handle values containing commas or quotes
        })
        .join(",")
    );

    // Combine headers and rows, and add newline characters
    const csvString = [csvHeaders, ...csvRows].join("\n");

    // Create a Blob with the CSV data
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    // Create a link and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="px-3 py-2 border rounded-md my-2 text-sm font-normal"
      onClick={exportJsonToCSV}
    >
      Export
    </button>
  );
};
