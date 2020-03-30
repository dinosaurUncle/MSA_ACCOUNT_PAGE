import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  accountId? : string
  accountName? : string
  password? : string
  gender? : string
  email? : string
  phone? : string
  targetAccountId? : string
}



export interface AccountManageProps {
  session?: any
}
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
      { title: 'Id', field: 'accountId', editable: "never" },
      { title: 'Name', field: 'accountName' },
      { title: 'Password', field: 'password', hidden: true},
      { title: 'Gender', field: 'gender', lookup: { 'MALE': 'male', 'FEMALE': 'female' }},
      { title: 'Email', field: 'email'},
      { title: 'Phone', field: 'phone'},
    ],
    dataList : []
  }

    render() {  
      const {session} = this.props;
      const tableContent = (
        <MaterialTable
          title="Account Management Page"
          columns={this.state.columns}
          data={this.state.dataList}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState:AccountManageStates) => {
                      newData.targetAccountId = session.account.accountId;
                      let jsonData = {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            
                        },
                        body: JSON.stringify(newData)};
                        fetch('/accountUpdate', jsonData)
                        .then(res => {
                          res.json().then(
                            data => {
                              let result = JSON.stringify(data);
                              let updateAccountList = JSON.parse(result);
                              this.setState({
                                dataList : updateAccountList.accounts
                              })
                            }
                          )
                        })
                        .then(json => console.log(json))
                        .catch(err => console.log(err));
                        
                      const data = [...this.state.dataList]; 
                      data[data.indexOf(oldData)] = newData;
                      this.setState({
                        dataList : data
                      })
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState:AccountManageStates) => {
                    oldData.targetAccountId = session.account.accountId;
                    let jsonData = {
                      method: 'DELETE',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                          
                      },
                      body: JSON.stringify(oldData)};
                      fetch('/accountDelete', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            let deleteAfterAccountList = JSON.parse(result);
                            this.setState({
                              dataList : deleteAfterAccountList.accounts
                            })
                          }
                        )
                      })
                      .then(json => console.log(json))
                      .catch(err => console.log(err));
                      const data = [...this.state.dataList]; 
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({
                      dataList : data
                    })
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