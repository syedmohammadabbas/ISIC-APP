import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LivePressureGraph({route}) {
  const {pressure} = route.params;
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [pressureData, setPressureData] = useState([pressure]); // Initial pressure value
  const [timestamps, setTimestamps] = useState(['0']); // Initial timestamps
  const [maxPressure, setMaxPressure] = useState(300);
  const [minPressure, setMinPressure] = useState(300);
  const [isUpwards, setIsUpwards] = useState(false); // Track if pressure is increasing
  const [startTime, setStartTime] = useState(null); // Track when upward trend starts
  const [power, setPower] = useState(0); // Store calculated power

  const screenWidth = Dimensions.get('window').width; // Dynamic screen width

  // useEffect(() => {
  //   // Update the time every second
  //   const clockInterval = setInterval(() => {
  //     setTime(new Date().toLocaleTimeString());
  //   }, 1000);

    // Simulate live pressure data updates
  //   const dataInterval = setInterval(() => {
  //     const newPressure = Math.floor(Math.random() * 800) + 100; // Simulated pressure value
  //     const newTimestamp = (timestamps.length + 1).toString(); // Incrementing time for the graph

  //     setPressureData((prevData) =>
  //       prevData.length >= 20 ? [...prevData.slice(1), newPressure] : [...prevData, newPressure]
  //     );

  //     setTimestamps((prevTimestamps) =>
  //       prevTimestamps.length >= 20
  //         ? [...prevTimestamps.slice(1), newTimestamp]
  //         : [...prevTimestamps, newTimestamp]
  //     );

  //     // Calculate max and min pressures
  //     setMaxPressure((prevMax) => Math.max(prevMax, newPressure));
  //     setMinPressure((prevMin) => Math.min(prevMin, newPressure));

  //     // Update the upward trend status
  //     if (!isUpwards && prevData.length > 1 && prevData[prevData.length - 1] < newPressure) {
  //       setIsUpwards(true);
  //       setStartTime(new Date().getTime()); // Record the start time of the upward trend
  //     }

  //     // Calculate power if there's an upward trend
  //     if (isUpwards && startTime) {
  //       const timeInterval = (new Date().getTime() - startTime) / 1000; // In seconds
  //       const calculatedPower = calculatePower(prevData);
  //       setPower(calculatedPower);
  //     }

  //   }, 1000);

  //   return () => {
  //     clearInterval(clockInterval);
  //     clearInterval(dataInterval);
  //   };
  // }, [timestamps]);

  // Function to calculate power based on pressure values
  const calculatePower = (data) => {
    let power = 0;
    // Apply trapezoidal rule on the upward trend
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i] < data[i + 1]) {
        power += (data[i] + data[i + 1]) / 2;
      }
    }
    return power;
  };

  const data = {
    labels: timestamps,
    datasets: [
      {
        data: pressureData,
        color: (opacity = 1) => `rgba(0, 43, 91, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: new Array(timestamps.length).fill(300), // Constant baseline
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.graphContainer}>
        <Text style={styles.verticalLabel}>Pressure (cm water)</Text>
        <LineChart
          data={data}
          width={screenWidth - 32} // Dynamic width with some padding
          height={300}
          chartConfig={{
            backgroundColor: '#002B5B',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 43, 91, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 43, 91, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#002B5B',
            },
          }}
          bezier
          style={styles.chart}
        />
        <Text style={styles.horizontalLabel}>Time (s)</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Clock{'\n'}{time}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Max Pressure{'\n'}{maxPressure}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Min Pressure{'\n'}{minPressure}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Power{'\n'}{power.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5B',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  verticalLabel: {
    paddingBottom: 20,
    color: 'white',
    position: 'absolute',
    left: 0,
    transform: [{ rotate: '-90deg' }],
    width: 150,
    textAlign: 'center',
  },
  horizontalLabel: {
    color: 'white',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  button: {
    backgroundColor: '#002B5B',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'white',
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
