import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { BleManager } from "react-native-ble-plx";
import { decode as atob } from "base-64";

const PRESSURE_SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const PRESSURE_CHARACTERISTIC_UUID = "beefcafe-36e1-4688-b7f5-00000000000c";

const bleManager = new BleManager();

export default function ConnectDevice({ route, navigation }) {
  const { formData } = route.params;
  const [device, setDevice] = useState(null);
  const [dataPoints, setDataPoints] = useState([]); // Data for the graph
  const [allPressureData, setAllPressureData] = useState([]); // Full pressure data with timestamps
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showingGraph, setShowingGraph] = useState(false);

  const [maxPressure, setMaxPressure] = useState(0);
  const [minPressure, setMinPressure] = useState(1024);
  const [power, setPower] = useState(0);

  const pressureRef = useRef(null); // Store live pressure
  const dataBufferRef = useRef([]); // Buffer for throttled updates
  const startTimeRef = useRef(null); // Track the start time of streaming
  const updateInterval = useRef(null);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    scanAndConnect();

    return () => {
      bleManager.stopDeviceScan();
      bleManager.destroy();
    };
  }, []);


  const scanAndConnect = async () => {
    setError(null);
    setIsScanning(true);

    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        setError(`Scan error: ${error.message}`);
        setIsScanning(false);
        return;
      }

      if (scannedDevice && scannedDevice.name === "Pressure-Sense") {
        bleManager.stopDeviceScan();
        setDevice(scannedDevice);
        setIsScanning(false);
      }
    });
  };

  const startStreamingData = async (connectedDevice) => {
    try {
      startTimeRef.current = Date.now(); // Set the start time
      await connectedDevice.discoverAllServicesAndCharacteristics();
      connectedDevice.monitorCharacteristicForService(
        PRESSURE_SERVICE_UUID,
        PRESSURE_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            setError(`Monitoring error: ${error.message}`);
            return;
          }

          if (characteristic?.value) {
            const decodedValue = atob(characteristic.value);
            const parsedPressure = parseFloat(decodedValue);
            if (!isNaN(parsedPressure)) {
              handleNewPressure(parsedPressure);
            } else {
              setError("Invalid pressure value received.");
            }
          }
        }
      );
    } catch (error) {
      setError(`Error starting to stream data: ${error.message}`);
    }
  };

  const handleNewPressure = (pressure) => {
    const timestamp = Date.now() - startTimeRef.current; // Calculate elapsed time in milliseconds
  
    // Update pressure reference
    pressureRef.current = pressure;
  
    // Update state in real time
    setDataPoints((prev) => {
      const newPoints = [...prev, pressure].slice(-1000); // Limit to last 2000 data points for the graph
      return newPoints;
    });
  
    setAllPressureData((prevData) => [
      ...prevData,
      { pressure, timestamp }, // Include timestamp for further analysis
    ]);
  
    // Update metrics
    setMaxPressure((prev) => Math.max(prev, pressure));
    setMinPressure((prev) => Math.min(prev, pressure));
  
    // Calculate power (or any other metrics)
    calculatePower();
  };
  
  const calculatePower = () => {
    if (dataPoints.length > 1) {
      const avgPressure = dataPoints.reduce((sum, val) => sum + val, 0) / dataPoints.length;
      setPower(avgPressure); // Simplified power calculation
    }
  };

  const handleConnect = async () => {
    if (device) {
      try {
        await device.connect();
        setIsConnected(true);
        startStreamingData(device);
      } catch (connectionError) {
        setError(`Connection error: ${connectionError.message}`);
        setIsConnected(false);
      }
    }
  };

  const handleDisconnect = () => {
    if (device) {
      device.cancelConnection().finally(() => {
        setDevice(null);
        setIsConnected(false);
        console.log("Pressure Data with Timestamps:", allPressureData);
        navigation.replace("AnalyzePressure", { allPressureData, formData });
      });
    }
  };

  const handleNavigateToGraph = () => {
    setShowingGraph(true);
  };

  if (!showingGraph) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Connect Device</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          {isScanning && <Text style={styles.status}>Scanning for devices...</Text>}
          {!isScanning && !device && <Text style={styles.status}>No device found</Text>}
          {device && !isConnected && (
            <View>
              <Text style={styles.connectionStatus}>Found: {device.name}</Text>
              <Button title="Connect" onPress={handleConnect} />
            </View>
          )}
          {isConnected && (
            <View>
              <Text style={styles.connectionStatus}>Connected to: {device.name}</Text>
              <Button title="Go to Graph" onPress={handleNavigateToGraph} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* <Text style={styles.title}>Pressure </Text> */}
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <>
              {/* <Text style={styles.pressureValue}>
                Pressure: {pressureRef.current !== null ? `${pressureRef.current.toFixed(2)} hPa` : "Waiting for data..."}
              </Text> */}
              <View style={styles.cover}>
              <Text style={styles.verticalLabel}> (cm) in Water</Text>
                <LineChart
                  data={{
                    labels: [],
                    datasets: [{ data: dataPoints }],
                  }}
                  width={screenWidth - 300}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: "0" },
                  }}
                  bezier
                  style={styles.chart}
                />
                 <Text style={styles.horizontalLabel}>Time (s)</Text>
                <View style={styles.inner}>
                  <Text style={styles.stats}>Max Pressure: {maxPressure}</Text>
                  <Text style={styles.stats}>Min Pressure: {minPressure}</Text>
                  <Text style={styles.stats}>Power: {power.toFixed(2)} W</Text>
                </View>
              </View>
              <Button title="Disconnect" onPress={handleDisconnect} />
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A237E",
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cover: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalLabel: {
    transform: [{ rotate: "-90deg" }],
    position: "absolute",
    left: -70,
    // right: 40,
    top: 135,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  horizontalLabel: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 255,
    right: 250,
   
  },
  chart: {
    marginLeft: 20,
    marginTop: 20,
  },
  inner: {
    marginTop: 20,
  },
  stats: {
    width: 120,
    height: 80,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    fontSize: 16,
    color: "#fff",
    marginVertical: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
});
