import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  roleId? : string
  roleName? : string
  targetAccountId? : string
}
export interface RoleManageProps {
  session?: any
}
export interface RoleManageStates {
  columns: Array<Column<Row>>
  dataList: Row[];
}

class RoleManage extends Component<RoleManageProps>{
  componentDidMount () {
    let jsonData = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }};
      fetch('/roleList', jsonData)
      .then(res => {
        res.json().then(
          data => {
            let result = JSON.stringify(data);
            console.log(JSON.parse(result));
            let responseroleList = JSON.parse(result);
            this.setState({
              dataList : responseroleList.roles
            })
          }
        )
      })
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }
  state : RoleManageStates = {
    columns : [
      { title: 'RoleId', field: 'roleId'},
      { title: 'RoleName', field: 'roleName' },
    ],
    dataList : []
  }

    render() {  
      const {session} = this.props;
      const tableContent = (
        <MaterialTable
          title="페이지관리"
          columns={this.state.columns}
          data={this.state.dataList}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                resolve();
                  this.setState((prevState:RoleManageStates) => {
                  newData.targetAccountId = session.account.accountId;
                  let jsonData = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify(newData)};
                    fetch('/roleCreate', jsonData)
                    .then(res => {
                      res.json().then(
                        data => {
                          let result = JSON.stringify(data);
                          let updateroleList = JSON.parse(result);
                          this.setState({
                            dataList : updateroleList.roles
                          })
                        }
                      )
                    })
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
                  const data = [...this.state.dataList];
                  data.push(newData);
                  this.setState({
                    dataList : data
                  })
              });
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                resolve();
                if (oldData) {
                  this.setState((prevState:RoleManageStates) => {
                    newData.targetAccountId = session.account.accountId;
                    let jsonData = {
                      method: 'PUT',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                          
                      },
                      body: JSON.stringify(newData)};
                      fetch('/roleUpdate', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            let updateRoleList = JSON.parse(result);
                            this.setState({
                              dataList : updateRoleList.roles
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
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                  resolve();
                  this.setState((prevState:RoleManageStates) => {
                    oldData.targetAccountId = session.account.accountId;
                    let jsonData = {
                      method: 'DELETE',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                          
                      },
                      body: JSON.stringify(oldData)};
                      fetch('/roleDelete', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            let deleteAfterRoleList = JSON.parse(result);
                            this.setState({
                              dataList : deleteAfterRoleList.roles
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
  
  export default RoleManage;