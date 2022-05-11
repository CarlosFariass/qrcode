import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not scanned yet')

  const askForCameraPermission = () => {
    (async () => {
      const { status }  = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  //request for camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //If allowed, here whats happen after
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
  }

  //check permission and return the screen
  if (hasPermission === null) {
    return(
      <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return(
      <View style={styles.container}>
        <Text style={{margin: 10, color: '#fff'}}>No access to camera</Text>
          <TouchableOpacity 
            style={styles.btnQR} 
            onPress={() => askForCameraPermission()}>
            <Text style={styles.btntext}>Allow Camera</Text>
          </TouchableOpacity>
      </View>
    )
  }

  //return view
  return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}} />
      </View>
          <ScrollView style={styles.scrollText}>
          <Text   
            style={styles.maintext}>{text}
          </Text>
          </ScrollView>
        {scanned && <TouchableOpacity
                      onPress={() => setScanned(false)} 
                      style={styles.btnQR}>
                        <Text style={styles.btntext}>Scan again</Text>
                    </TouchableOpacity>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnQR: {
    backgroundColor: '#00875F',
    width: '50%',
    padding: 10,
    marginTop: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold' 
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#101010'
  },
  scrollText: {
    maxHeight: '25%',
    marginTop: 30
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#fff',
    borderWidth: 1,
    borderRadius: 4,
  }
})