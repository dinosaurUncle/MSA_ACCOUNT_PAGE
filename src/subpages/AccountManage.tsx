import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import Modal from '@material-ui/core/Modal';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = (theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    });

interface Row {
  accountId? : string
  accountName? : string
  password? : string
  gender? : string
  email? : string
  phone? : string
  targetAccountId? : string
}

export interface AccountManageProps extends WithStyles<typeof useStyles> {
  session?: any
}
export interface AccountManageStates {
  columns: Array<Column<Row>>
  dataList: Row[]
  open: boolean
  modalStyle : any
  account? : Row
}



function getModalStyle() {
  const top = 30;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class AccountManage extends Component<AccountManageProps>{

  constructor(prop: any){
    super(prop);
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
  componentDidMount(){
    
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
    dataList : [],
    open : false,
    modalStyle : getModalStyle(),
    account : {}
  }
    render() {  
      const {session, classes} = this.props;
      const handleOpen = () => {
        this.setState({
          open : true
        })
      }

      const handleClose = () => {
        this.setState({
          open : false
        })
      }
      

      const tableContent = (
        <MaterialTable
          title="계정관리"
          columns={this.state.columns}
          data={this.state.dataList}
          onRowClick={(event, rowData, toggleDetailPanel) => {
            console.log('event: ', event);
            console.log('rowData: ', rowData);
            console.log('toggleDetailPanel: ', toggleDetailPanel);
            this.setState({
              account : rowData
            })
            handleOpen()
          }}
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
                }, 100);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
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
              }),
          }}
        />
      );
      
      return (
        <div> 
            {tableContent}
            <Modal
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            ><div style={this.state.modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{this.state.account? this.state.account.accountId : "지정된 아이디 없음"}</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </div></Modal>
        </div>
      );
    }
  }
  
  export default withStyles(useStyles)(AccountManage);