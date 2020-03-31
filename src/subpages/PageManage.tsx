import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  pageId? : string
  pageName? : string
  pageUrl? : string
  description? : string
  targetAccountId? : string
}

export interface PageManageProps {
  session?: any
}
export interface PageManageStates {
  columns: Array<Column<Row>>
  dataList: Row[];
}

class PageManage extends Component<PageManageProps>{
  componentDidMount () {
    let jsonData = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }};
      fetch('/pageList', jsonData)
      .then(res => {
        res.json().then(
          data => {
            let result = JSON.stringify(data);
            console.log(JSON.parse(result));
            let responsePageList = JSON.parse(result);
            this.setState({
              dataList : responsePageList.pages
            })
          }
        )
      })
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }
  state : PageManageStates = {
    columns : [
      { title: 'PageId', field: 'pageId', editable: "never" },
      { title: 'PageName', field: 'pageName' },
      { title: 'PageUrl', field: 'pageUrl'},
      { title: 'Description', field: 'description'},
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
                  this.setState((prevState:PageManageStates) => {
                  newData.targetAccountId = session.account.accountId;
                  let jsonData = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify(newData)};
                    fetch('/pageCreate', jsonData)
                    .then(res => {
                      res.json().then(
                        data => {
                          let result = JSON.stringify(data);
                          let updatePageList = JSON.parse(result);
                          this.setState({
                            dataList : updatePageList.pages
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
                  this.setState((prevState:PageManageStates) => {
                    newData.targetAccountId = session.account.accountId;
                    let jsonData = {
                      method: 'PUT',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                          
                      },
                      body: JSON.stringify(newData)};
                      fetch('/pageUpdate', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            let updatePageList = JSON.parse(result);
                            this.setState({
                              dataList : updatePageList.pages
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
                  this.setState((prevState:PageManageStates) => {
                    oldData.targetAccountId = session.account.accountId;
                    let jsonData = {
                      method: 'DELETE',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                          
                      },
                      body: JSON.stringify(oldData)};
                      fetch('/pageDelete', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            let deleteAfterPageList = JSON.parse(result);
                            this.setState({
                              dataList : deleteAfterPageList.pages
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
  
  export default PageManage;