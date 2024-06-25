import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .required('Password length is required')
    .min(6, 'Password length must be at least 6 characters')
    .max(20, 'Password length must be at most 20 characters'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characters = '';

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%&*';

    if (lowerCase) {
      characters += lowerCaseChars;
    }
    if (upperCase) {
      characters += upperCaseChars;
    }
    if (numbers) {
      characters += numberChars;
    }
    if (symbols) {
      characters += symbolChars;
    }

    const passwordResult = createPassword(characters, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.headingText}>Password Generator</Text>
        </View>
        <View>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputCard}>
                  <Text style={styles.labelText}>Password Length :</Text>
                  <View>
                    <TextInput
                      style={styles.inputLength}
                      placeholder="Ex: 8"
                      placeholderTextColor="#d3d3d3"
                      onChangeText={handleChange('passwordLength')}
                      value={values.passwordLength}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                {errors.passwordLength && touched.passwordLength ? (
                  <Text style={styles.errorText}>{errors.passwordLength}</Text>
                ) : null}

                <View style={styles.checkboxContainer}>
                  <Text style={styles.labelText}>Include uppercase :</Text>
                  <View>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      size={25}
                      fillColor="green"
                      unfillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      onPress={() => setUpperCase(!upperCase)}
                    />
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.labelText}>Include lowercase : </Text>
                  <View>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      size={25}
                      fillColor="green"
                      unfillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      onPress={() => setLowerCase(!lowerCase)}
                    />
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.labelText}>Include numbers</Text>
                  <View>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      size={25}
                      fillColor="green"
                      unfillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      onPress={() => setNumbers(!numbers)}
                    />
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.labelText}>Include symbols</Text>
                  <View>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      size={25}
                      fillColor="green"
                      unfillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      onPress={() => setSymbols(!symbols)}
                    />
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.generateButton}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={{color: 'white'}}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      resetPasswordState();
                      handleReset();
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.resultContainer}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Generated Password :
          </Text>
          <Text selectable={true} style={styles.resultText}>
            {isPassGenerated ? password : ''}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000456',
    height: '100%',
  },
  headingText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
  },
  inputCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  inputLength: {
    width: 150,
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffaaee',
    borderRadius: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    paddingHorizontal: 10,
  },
  generateButton: {
    width: 150,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  resetButton: {
    width: 150,
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  resultContainer: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  resultText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600',
  },
});
