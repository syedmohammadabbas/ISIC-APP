import React from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import RNFS from "react-native-fs";
import ExcelJS from "exceljs";

export default function AnalyzePressure({ route }) {
  const { allPressureData, formData } = route.params;

  const processPressureData = (pressureData) => {
    if (pressureData.length === 0) {
      return { mip: [], mep: [], graphData: [] };
    }

    const timeData = pressureData.map((d) => d.timestamp);
    const values = pressureData.map((d) => d.pressure);
    const threshold = values[0];

    const invertedData = values.map((value) =>
      value < 1000 ? 2000 - value : 1000 - (value - 1000)
    );

    const peaks = [];
    const valleys = [];
    for (let i = 1; i < invertedData.length - 1; i++) {
      if (invertedData[i - 1] < invertedData[i] && invertedData[i] > invertedData[i + 1]) {
        peaks.push({ index: i, value: invertedData[i] });
      } else if (invertedData[i - 1] > invertedData[i] && invertedData[i] < invertedData[i + 1]) {
        valleys.push({ index: i, value: invertedData[i] });
      }
    }

    const mip = peaks.slice(0, 3);
    const mep = valleys.slice(0, 3);

    const graphData = mip.map((entry, i) => {
      const inspirationTime = timeData[entry.index] - timeData[entry.index - 1];
      const breadthHoldTime = 1.0; // Placeholder for logic (use real calculation if needed)
      const expirationTime = timeData[entry.index + 1] - timeData[entry.index];
      return {
        data: i + 1,
        MIP: entry.value,
        InspirationTime: inspirationTime,
        BreadthHoldTime: breadthHoldTime,
        ExpirationTime: expirationTime,
        MEP: mep[i]?.value || 0,
      };
    });

    return { mip, mep, graphData };
  };

  const { mip, mep, graphData } = processPressureData(allPressureData);

  const saveDataToFile = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Pressure Data");

      // Add Form Data to the Excel Sheet
      worksheet.addRow(["Form Data"]);
      for (const [key, value] of Object.entries(formData)) {
        worksheet.addRow([key, value]);
      }
      worksheet.addRow([]);

      // Add Pressure Data to the Excel Sheet
      worksheet.addRow(["Timestamp", "Pressure (hPa)"]);
      allPressureData.forEach((data) => {
        worksheet.addRow([data.timestamp, data.pressure]);
      });

      worksheet.addRow([]);

      // Add Calculated Data
      worksheet.addRow(["MIP Points", JSON.stringify(mip)]);
      worksheet.addRow(["MEP Points", JSON.stringify(mep)]);
      worksheet.addRow([]);

      // Add Graph Data
      worksheet.addRow(["---GRAPH DATA---"]);
      graphData.forEach((entry) => {
        worksheet.addRow([
          `DATA ---> ,${entry.data}`,
          `MIP,${entry.MIP}`,
          `Inspiration time,${entry.InspirationTime}`,
          `Breadth hold time,${entry.BreadthHoldTime}`,
          `Expiration time,${entry.ExpirationTime}`,
          `MEP,${entry.MEP}`,
        ]);
        worksheet.addRow([]); // Add empty row for better readability
      });

      // Save to File
      const fileName = `Assessment_${Date.now()}.xlsx`;
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const buffer = await workbook.xlsx.writeBuffer();
      await RNFS.writeFile(filePath, buffer.toString("base64"), "base64");

      Alert.alert("Success", `File saved at ${filePath}`);
    } catch (error) {
      Alert.alert("Error", "Failed to save file: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assessment Done</Text>
      <Button title="Download File" onPress={saveDataToFile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});
