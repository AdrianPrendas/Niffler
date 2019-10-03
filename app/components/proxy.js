import {
    Alert,
    AsyncStorage,
  } from 'react-native';

class Proxy{

    state = {
        host: "niffler-rest-api.herokuapp.com"
    }

    retrieveToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            return token;
          }
        } catch (error) {
          Alert.alert('Error', `${error}`, [{text: 'Okay'}]);
        }
    };

    storeToken = async (token) => {
        try {
          await AsyncStorage.setItem('token', token);
        } catch (error) {
          Alert.alert('Error', `Cannot storage token in AsyncStorage`, [{text: 'Okay'}]);
        }
    };

    logout = async(callback)=>{
        try {
          await AsyncStorage.removeItem('token',(err)=>{
            if(err)
              Alert.alert('Error', `Can not remove token from AsyncStorage: ${err}`, [{text: 'Okay'}]);
            else{
                callback()
            }
          });
        } catch (error) {
          Alert.alert('Error', `Can not remove Token from AsyncStorage: ${error}`, [{text: 'Okay'}]);
        }
    };

    loadUser(callback){
        let {host} = this.state

        this.retrieveToken().then(token => {

        fetch(`http://${host}/api/who-i-am`, {
            headers: {
               'Content-Type': 'application/json',
                Authorization: token,
            },
            method: 'GET',
        })
        .then(res =>res.json())
        .then(json => {
           let {user} = json;
           callback(user)
        })
        .catch(err => {
            Alert.alert('Error', `Username/Password mismatch: ${err}`, [{text: 'Okay'}]);
        });

          
        }).catch(err => Alert.alert('Error', `${err}`, [{text: 'Okay'}]));
    
    }
    
    save(register,callback){
        
        let {host} = this.state

        this.retrieveToken().then(token => {

            fetch(`http://${host}/api/save-transaction`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'POST',
                body: JSON.stringify(register),
            })
            .then(res => res.json())
            .then(json => {
                let {transaction, message} = json
                if(message)
                  throw message
                callback()
            })
            .catch(err => {
                Alert.alert('Error', `${err}`, [{text: 'Okay'}]);
            });

        })
        .catch(err => Alert.alert('Error', `${err}`, [{text: 'Okay'}]));
    }

    loadTransactions(callback){
        let {host} = this.state

        this.retrieveToken().then(token => {

            fetch(`http://${host}/api/find-all-transactions`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'GET',
            })
            .then(res => res.json())
            .then(json => {
                let {transactions} = json;
                transactions = transactions.map(t => {
                    t.createdAt = new Date(t.createdAt);
                    t.updatedAt = (t.updatedAt? new Date(t.updatedAt):undefined)
                    return t;
                });

                callback(transactions)
            })
            .catch(err => {
                Alert.alert('Error', `${err}`, [{text: 'Okay'}]);
            });

        })
        .catch(err => Alert.alert('Error', `${err}`, [{text: 'Okay'}]));
    }

    editTransaction(_id, register, callback){
        let {host} = this.state

        this.retrieveToken().then(token => {

            fetch(`http://${host}/api/update-transaction/${_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'PUT',
                body: JSON.stringify(register),
            })
            .then(res => res.json())
            .then(json => {    
                callback()
              })
              .catch(err => {
                Alert.alert('edited err', `${err}`, [{text: 'Okay'}]);
              });
          });
    }

    deleteTransactions(_id, callback){
        let {host} = this.state
        
        this.retrieveToken().then(token => {

            fetch(`http://${host}/api/delete-transaction/${_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(json => {
                callback()
            })
            .catch(err => {
                Alert.alert('del err', `${err}`, [{text: 'Okay'}]);
            });

        });
    }

    getSymbols(callback){
        let {host} = this.state

        this.retrieveToken().then(token => {

            fetch(`http://${host}/api/get-symbols`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'GET',
            })
            .then(res => res.json())
            .then(json => {
                let {symbols} = json;

                callback(symbols)
            })
            .catch(err => {
                Alert.alert('Error', `${err}`, [{text: 'Okay'}]);
            });

        })
        .catch(err => Alert.alert('Error', `${err}`, [{text: 'Okay'}]));
    }
  
}
 
export default Proxy;