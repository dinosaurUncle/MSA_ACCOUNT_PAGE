import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';

const getAccountList = () =>{
  console.log("getAccountList");
  let jsonData = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }};
    fetch('/getAccountList', jsonData)
    .then(res => {
      res.json().then(
        data => {
          let result = JSON.stringify(data);
          console.log(JSON.parse(result));
          let responseAccountList = JSON.parse(result);
          console.log(responseAccountList);
          return responseAccountList
        }
      )
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

interface Row {
  accountId? : string
  accountName? : string
  gender? : string
  email? : string
  phone? : string
}



export interface AccountManageProps {}
export interface AccountManageStates {
  columns: Array<Column<Row>>
  dataList: Row[];
}

class AccountManage extends Component<AccountManageProps>{
  componentWillMount () {
    let jsonData = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }};
      fetch('/getAccountList', jsonData)
      .then(res => {
        res.json().then(
          data => {
            let result = JSON.stringify(data);
            console.log(JSON.parse(result));
            let responseAccountList = JSON.parse(result);
            this.setState({
              dataList : responseAccountList.accounts
            })
          }
        )
      })
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }
  state : AccountManageStates = {
    columns : [
      { title: 'Id', field: 'accountId' },
      { title: 'Name', field: 'accountName' },
      { title: 'Gender', field: 'gender', lookup: { 'MALE': 'male', 'FEMALE': 'female' }},
      { title: 'Email', field: 'email'},
      { title: 'Phone', field: 'phone'},
    ],
    dataList : []
  }

    render() {  
      
      const tableContent = (
        <MaterialTable
          title="Account Management Page"
          columns={this.state.columns}
          data={this.state.dataList}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState:AccountManageStates) => {
                    const data = [...prevState.dataList];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState:AccountManageStates) => {
                      const data = [...prevState.dataList];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState:AccountManageStates) => {
                    const data = [...prevState.dataList];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      );
      
      return (
        <div> 
            {tableContent}
        </div>
      );
    }
  }
  
  export default AccountManage;