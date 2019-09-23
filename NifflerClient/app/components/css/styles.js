import {StyleSheet} from 'react-native';

const MyStyleSheet = StyleSheet.create({
  dafault: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputScreen: {
    flex: 1,
  },
  header: {
    flex: 0.3,
    padding: 10,
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems:"center"
  },
  textHeader: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  registerContainer: {
    flex: 8,
  },
  result:{
    flex:1,
    flexDirection: "row",
    justifyContent:"center",
    alignContent: "center",
    backgroundColor: '#F44336',
},
  row: {
    paddingVertical: 5,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  col:{
    height: 30,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  col1: {
    width: 20
  },
  col2: {
    width: 70
  },
  col3: {
    width: 170
  },
  col4: {
    width: 60
  },
  col5: {
    width: 40
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  }
  
});

export default MyStyleSheet;
