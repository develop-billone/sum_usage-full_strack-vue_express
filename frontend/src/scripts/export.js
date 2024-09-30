export default function Export() {
  const exportToCsv = async (data, filename) => {
    const titleKeys = [
      "MSISDN",
      "Start Date",
      "End Date",
      "Voice Usage",
      "SMS Usage",
      "Data Usage",
      "Debit Usage",
    ];
    const refinedData = [];
    refinedData.push(titleKeys);

    data.forEach((item) => {
      const values = Object.values(item);
      refinedData.push(values);
    });

    let csvContent = "";
    refinedData.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8," });
    const objUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", objUrl);
    link.setAttribute("download", filename);
    link.click();

    URL.revokeObjectURL(objUrl);
  };

  return { exportToCsv };
}
