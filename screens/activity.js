import React, { Component } from "react";

import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  Modal,
  AsyncStorage,
  TouchableHighlight,
  FlatList,
  Animated,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MyTextInput from "../components/myTextInut";

import Proxy from "../components/proxy";

import {ListItem, Separator} from "../components/listItem";

class Activity extends Component {
  state = {
    proxy: new Proxy(),
    registers: [],
    showInputModal: false,
    amount: 0,
    description: undefined,
    _id: undefined,
    show: {},
    expand: false
  };

  componentDidMount() {
    this.setState({ show: this.state.show });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.loadTransactions();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  loadTransactions() {
    this.state.proxy.loadTransactions(transactions => {
      this.setState({ registers: transactions });
    });
  }

  createRegister(register) {
    return (
      <View style={css.row} key={register._id}>
        <View style={css.threeContainer}>
          <Text style={{ padding: 5, color: "#757575", fontWeight: "bold" }}>
            {register.description}
          </Text>
          <Text style={{ padding: 5, color: "#757575" }}>
            Created at {register.createdAt.toLocaleTimeString()}
          </Text>
          {register.updatedAt && (
            <Text style={{ padding: 5, color: "#757575", textAlign: "center" }}>
              Updated on {register.updatedAt.toString().split("G")[0]}
            </Text>
          )}
        </View>

        <View style={css.threeContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {register.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </Text>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              width: 150
            }}
          >
            <Ionicons
              name="md-close"
              style={{ color: "#D32F2F", fontSize: 40 }}
              onPress={() => this.del(register)}
            />

            <Ionicons
              name="md-create"
              style={{ color: "#FBC02D", fontSize: 40 }}
              onPress={() => this.edit(register)}
            />
          </View>
        </View>
      </View>
    );
  }

  createRegisterDay(day, dayKey, monthKey) {
    return (
      <View style={css.day} key={day[0].createdAt.toDateString()}>
        <View style={css.total}>
          <TouchableOpacity
            onPress={() => {
              this.state.show[`${monthKey}-${dayKey}`] = !this.state.show[
                `${monthKey}-${dayKey}`
              ];
              this.setState({ show: this.state.show });
            }}
          >
            <Text
              style={{
                color: "#757575",
                fontSize: 14,
                fontWeight: "bold",
                paddingLeft: 20
              }}
            >
              Total on {day[0].createdAt.toDateString()}
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 50 }}>
            {day.length != 0 &&
              day
                .map(d => d.amount)
                .reduce((a, b) => a + b)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </Text>
        </View>
        {this.state.show[`${monthKey}-${dayKey}`] && (
          <FlatList
            data={day}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ListItem
                register={item}
                onSwipeFromLeft={() => this.edit(item)}
                onRightPress={() => this.del(item)}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
        )}
      </View>
    );
  }

  //{day.map(r=>this.createRegister(r))}

  createRegistersDays(month, monthKey) {
    let jsx = [];
    for (let [dayKey, day] of Object.entries(month)) {
      if (this.state.show[`${monthKey}-${dayKey}`] == undefined) {
        this.state.show[`${monthKey}-${dayKey}`] = true;
      }
      if (Array.isArray(day.data)) {
        jsx.push(this.createRegisterDay(day.data, dayKey, monthKey));
      }
    }
    return jsx;
  }

  createRegistersMonths(year, yearKey) {
    let jsx = [];
    for (let [monthKey, month] of Object.entries(year)) {
      if (month.total == undefined) break;
      let d = new Date();
      d.setMonth(parseInt(monthKey));
      let date = d.toDateString().split(" ");
      if (this.state.show[`${yearKey}-${monthKey}`] == undefined) {
        this.state.show[`${yearKey}-${monthKey}`] = true;
      }

      let out = (
        <View style={css.month} key={monthKey}>
          <View style={css.total}>
            <TouchableOpacity
              onPress={() => {
                this.state.show[`${yearKey}-${monthKey}`] = !this.state.show[
                  `${yearKey}-${monthKey}`
                ];
                this.setState({ show: this.state.show });
              }}
            >
              <Text
                style={{
                  color: "#757575",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingLeft: 20
                }}
              >
                Total on {date[1]} {date[3]}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 30, fontWeight: "bold", paddingLeft: 50 }}>
              {parseInt(month.total)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Text>
          </View>

          {this.state.show[`${yearKey}-${monthKey}`] &&
            this.createRegistersDays(month, monthKey)}
        </View>
      );
      jsx.push(out);
    }
    return jsx;
  }

  fillScrollView(data) {
    let jsx = [];
    for (let [yearKey, year] of Object.entries(data)) {
      let out = (
        <View style={css.year} key={yearKey}>
          <View style={css.total}>
            <Text
              style={{
                color: "#EAEAEA",
                fontSize: 30,
                fontWeight: "bold",
                paddingLeft: 20
              }}
            >
              Total on {yearKey}
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                paddingLeft: 50,
                color: "white"
              }}
            >
              {parseInt(year.total)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Text>
            {this.state.expand && (
              <View
                style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}
              >
                <View style={{ width: 100 }}>
                  <Button
                    title="expand"
                    color={"red"}
                    onPress={() => this.expand()}
                  />
                </View>
              </View>
            )}
          </View>

          {this.createRegistersMonths(year, yearKey)}
        </View>
      );
      jsx.push(out);
    }
    return jsx;
  }

  expand() {
    let { show } = this.state;
    for (e in show) {
      show[e] = !show[e];
    }
    //alert(JSON.stringify(show, null, 2))
    this.setState({ show, expand: !this.state.expand });
  }

  add() {
    let { amount, description, proxy } = this.state;
    let register = { amount, description, createdAt: new Date() };

    proxy.save(register, () => {
      this.setState({ showInputModal: false, description: "", amount: 0 });
      this.loadTransactions();
    });
  }

  edited() {
    let { _id, amount, description, owner, proxy } = this.state;
    let register = { amount, description, owner, updatedAt: new Date() };

    proxy.editTransaction(_id, register, () => {
      this.setState({
        showInputModal: false,
        description: "",
        amount: 0,
        _id: undefined
      });
      this.loadTransactions();
    });
  }

  edit(register) {
    this.setState({ showInputModal: true, ...register });
  }

  del(register) {
    this.state.proxy.deleteTransactions(register._id, () => {
      this.loadTransactions();
    });
  }

  render() {
    let { _id, amount, description, registers } = this.state;

    let sort = {};

    if (registers.length != 0) {
      registers.sort((a, b) => a.createdAt - b.createdAt);

      registers.forEach(r => {
        let year = r.createdAt.getFullYear();
        let month = r.createdAt.getMonth();
        let day = r.createdAt.getDate();

        if (!sort[`${year}`]) sort[`${year}`] = { total: 0 };

        if (!sort[`${year}`][`${month}`])
          sort[`${year}`][`${month}`] = { total: 0 };

        if (!sort[`${year}`][`${month}`][`${day}`])
          sort[`${year}`][`${month}`][`${day}`] = { total: 0, data: [r] };
        else sort[`${year}`][`${month}`][`${day}`].data.push(r);
      });

      for (const [yearKey, yearObj] of Object.entries(sort)) {
        let monthSum = 0;
        for (const [monthKey, monthObj] of Object.entries(yearObj)) {
          let daySum = 0;
          for (const [dayKey, dayObj] of Object.entries(monthObj)) {
            dayObj.total = Array.isArray(dayObj.data)
              ? dayObj.data.map(r => r.amount).reduce((a, b) => a + b)
              : 0;
            daySum += dayObj.total != undefined ? dayObj.total : 0;
          }
          monthObj.total = daySum;
          monthSum += monthObj.total != undefined ? monthObj.total : 0;
        }
        yearObj.total = monthSum;
      }

      //Alert.alert("day",`${JSON.stringify(sort,null,2)}`)
    }

    return (
      <View style={css.screen}>
        <View style={css.registerContainer}>
          <ScrollView
            ref="scrollView"
            onContentSizeChange={(width, height) =>
              this.refs.scrollView.scrollTo({ y: height })
            }
          >
            {registers.length != 0 && this.fillScrollView(sort)}

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                marginRight: 10,
                flexDirection: "row",
                margin: 20
              }}
            >
              <View style={{ width: 200 }}>
                <Button
                  title="ADD NEW REGISTERS"
                  onPress={() =>
                    this.setState({
                      showInputModal: true,
                      _id: undefined,
                      description: undefined
                    })
                  }
                ></Button>
              </View>
              {!this.state.expand && (
                <View style={{ width: 100 }}>
                  <Button
                    title="collapse"
                    color={"red"}
                    onPress={() => this.expand()}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        <Modal visible={this.state.showInputModal}>
          <View style={css.dafault}>
            <Text>{this.state._id ? "Edit Register" : "New Register"}</Text>

            <MyTextInput
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={text => this.setState({ amount: text })}
              value={amount.toString()}
            />

            <MyTextInput
              placeholder="Description"
              onChangeText={text => this.setState({ description: text })}
              value={description}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100
              }}
            >
              <Button
                title="Back"
                onPress={() => this.setState({ showInputModal: false })}
              />
              <Button
                title={this.state._id ? "edit" : "add"}
                onPress={() => (_id ? this.edited() : this.add())}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  add: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  total: {
    flex: 1
  },
  description: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  header: {
    flex: 0.3,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#D32F2F",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9
  },
  row: {
    backgroundColor: "#FAFAFA",

    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5
  },
  threeContainer: {
    flex: 1,
    alignItems: "center"
  },
  day: {
    margin: 15,
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff"
  },
  month: {
    margin: 10,
    backgroundColor: "#ECECEC",
    borderBottomColor: "gray",
    borderBottomWidth: 0.9,

    borderWidth: 1,
    borderColor: "#fff"
  },
  year: {
    margin: 10,
    backgroundColor: "#757575",
    borderBottomColor: "gray",
    borderBottomWidth: 0.9,

    borderWidth: 1,
    borderColor: "#fff"
  },
  registerContainer: {
    flex: 8
  },
  dafault: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Activity;
