// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../App";

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// type HomeScreenProps = {
//   navigation: HomeScreenNavigationProp;
// };

// interface FormData {
//   name: string;
//   age: string;
//   gender: string;
//   height: string;
//   weight: string;
//   smokingHabit: string;
//   mobileNo: string;
//   emailId: string;
//   diagnosis: string;
// }

// const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     smokingHabit: "",
//     mobileNo: "",
//     emailId: "",
//     diagnosis: "",
//   });

//   const handleChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Enter your details:</Text>

//         <View style={styles.row}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Name:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.name}
//               onChangeText={(value) => handleChange("name", value)}
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Age:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.age}
//               onChangeText={(value) => handleChange("age", value)}
//               keyboardType="numeric"
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//         </View>

//         <View style={styles.row}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Gender:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.gender}
//               onChangeText={(value) => handleChange("gender", value)}
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Height (cm):</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.height}
//               onChangeText={(value) => handleChange("height", value)}
//               keyboardType="numeric"
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//         </View>

//         <View style={styles.row}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Weight (kg):</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.weight}
//               onChangeText={(value) => handleChange("weight", value)}
//               keyboardType="numeric"
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Smoking Habit:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.smokingHabit}
//               onChangeText={(value) => handleChange("smokingHabit", value)}
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//         </View>

//         <View style={styles.row}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Mobile No:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.mobileNo}
//               onChangeText={(value) => handleChange("mobileNo", value)}
//               keyboardType="phone-pad"
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email Id:</Text>
//             <TextInput
//               style={styles.input}
//               value={formData.emailId}
//               onChangeText={(value) => handleChange("emailId", value)}
//               keyboardType="email-address"
//               placeholder=""
//               placeholderTextColor="#666"
//             />
//           </View>
//         </View>

//         <View style={styles.fullWidth}>
//           <Text style={styles.label}>Diagnosed Clinical Condition:</Text>
//           <TextInput
//             style={[styles.input, styles.largeInput]}
//             value={formData.diagnosis}
//             onChangeText={(value) => handleChange("diagnosis", value)}
//             multiline
//             placeholder=""
//             placeholderTextColor="#666"
//           />
//         </View>

//         <TouchableOpacity
//         //   onPress={() => navigation.navigate("ConnectDevice")}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Start Assessment</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//         //   onPress={() => navigation.navigate("BluetoothConnection")}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Start Training</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#002B5B",
//     paddingTop: 100,
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   title: {
//     color: "white",
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   inputGroup: {
//     flex: 1,
//     marginRight: 10,
//   },
//   label: {
//     color: "white",
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: "white",
//     borderRadius: 5,
//     padding: 8,
//     height: 40,
//   },
//   fullWidth: {
//     marginBottom: 15,
//   },
//   largeInput: {
//     height: 60,
//     textAlignVertical: "top",
//   },
//   button: {
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#002B5B",
//     fontWeight: "500",
//   },
// });

// export default HomeScreen;


import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView 
} from 'react-native';

export default function DetailsForm({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    smokingHabit: '',
    mobileNo: '',
    emailId: '',
    diagnosis: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    smokingHabit: '',
    mobileNo: '',
    emailId: '',
    diagnosis: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setErrors(prev => ({
      ...prev,
      [field]: '' // Reset the error when the user starts typing
    }));
  };

  // const validateForm = () => {
  //   let isValid = true;
  //   let errorMessages = {};

  //   // Name Validation
  //   if (!formData.name) {
  //     isValid = false;
  //     errorMessages.name = 'Name is required';
  //   }

  //   // Age Validation (should be numeric)
  //   if (!formData.age) {
  //     isValid = false;
  //     errorMessages.age = 'Age is required';
  //   } else if (isNaN(formData.age)) {
  //     isValid = false;
  //     errorMessages.age = 'Age must be a number';
  //   }

  //   // Gender Validation
  //   if (!formData.gender) {
  //     isValid = false;
  //     errorMessages.gender = 'Gender is required';
  //   }

  //   // Height Validation (should be numeric)
  //   if (!formData.height) {
  //     isValid = false;
  //     errorMessages.height = 'Height is required';
  //   } else if (isNaN(formData.height)) {
  //     isValid = false;
  //     errorMessages.height = 'Height must be a number';
  //   }

  //   // Weight Validation (should be numeric)
  //   if (!formData.weight) {
  //     isValid = false;
  //     errorMessages.weight = 'Weight is required';
  //   } else if (isNaN(formData.weight)) {
  //     isValid = false;
  //     errorMessages.weight = 'Weight must be a number';
  //   }

  //   // Mobile No Validation (should be a valid phone number)
  //   if (!formData.mobileNo) {
  //     isValid = false;
  //     errorMessages.mobileNo = 'Mobile number is required';
  //   }

  //   // Email Validation (should be a valid email)
  //   if (!formData.emailId) {
  //     isValid = false;
  //     errorMessages.emailId = 'Email ID is required';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
  //     isValid = false;
  //     errorMessages.emailId = 'Invalid email address';
  //   }

  //   // Diagnosis Validation
  //   if (!formData.diagnosis) {
  //     isValid = false;
  //     errorMessages.diagnosis = 'Diagnosis is required';
  //   }

  //   setErrors(errorMessages);
  //   return isValid;
  // };

  const handleSubmit = () => {
    // if (validateForm()) {
      navigation.replace("ConnectDevice", { formData });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gap}></View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Enter your details :</Text>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(value) => handleChange('age', value)}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={(value) => handleChange('gender', value)}
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm):</Text>
            <TextInput
              style={styles.input}
              value={formData.height}
              onChangeText={(value) => handleChange('height', value)}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.height && <Text style={styles.error}>{errors.height}</Text>}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg):</Text>
            <TextInput
              style={styles.input}
              value={formData.weight}
              onChangeText={(value) => handleChange('weight', value)}
              keyboardType="numeric"
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Smoking Habit:</Text>
            <TextInput
              style={styles.input}
              value={formData.smokingHabit}
              onChangeText={(value) => handleChange('smokingHabit', value)}
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.smokingHabit && <Text style={styles.error}>{errors.smokingHabit}</Text>}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile No:</Text>
            <TextInput
              style={styles.input}
              value={formData.mobileNo}
              onChangeText={(value) => handleChange('mobileNo', value)}
              keyboardType="phone-pad"
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.mobileNo && <Text style={styles.error}>{errors.mobileNo}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Id:</Text>
            <TextInput
              style={styles.input}
              value={formData.emailId}
              onChangeText={(value) => handleChange('emailId', value)}
              keyboardType="email-address"
              placeholder=""
              placeholderTextColor="#666"
            />
            {errors.emailId && <Text style={styles.error}>{errors.emailId}</Text>}
          </View>
        </View>

        <View style={styles.fullWidth}>
          <Text style={styles.label}>Diagnosed Clinical Condition:</Text>
          <TextInput
            style={[styles.input, styles.largeInput]}
            value={formData.diagnosis}
            onChangeText={(value) => handleChange('diagnosis', value)}
            multiline
            placeholder=""
            placeholderTextColor="#666"
          />
          {errors.diagnosis && <Text style={styles.error}>{errors.diagnosis}</Text>}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Start Assessment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B5B',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
  fullWidth: {
    position: 'relative',
    marginBottom: 15,
  },
  largeInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#002B5B',
    fontWeight: '500',
  },
  error: {
    color: '#FF9999',
    fontSize: 12,
    position: 'absolute',
    bottom: -20,
  },
});
