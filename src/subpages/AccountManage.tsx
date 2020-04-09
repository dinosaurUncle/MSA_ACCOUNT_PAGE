import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import Modal from '@material-ui/core/Modal';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = (theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      formControl: {
        margin: theme.spacing(1),
        width: "20%",
        marginRight : 10
      }, modal: {
        position:'absolute',
        overflowY:"scroll",
        height:'100%',
      }
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

interface Row2 {
  accountId? : string
  roleId? : string
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
  columns2: Array<Column<Row2>>
  dataList2: Row2[]
}



function getModalStyle() {
  const top = 20;
  const left = 30;

  return {
    top: `${top}%`,
    left: `${left}%`,
    
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
    account : {},
    columns2 : [
      { title: 'Id', field: 'accountId', editable: "never" },
      { title: 'RoleId', field: 'roleId' }
    ],
    dataList2 : [],
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

      const detailInfoSetting = (accountId:string) => {
        console.log('detailInfoSetting: ', accountId)
        let convertJson : Row = {
          accountId : accountId,
          targetAccountId : accountId
        };
        
        let jsonData = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(convertJson)};
          fetch('/getAccountList', jsonData)
          .then(res => {
            res.json().then(
              data => {
                let result = JSON.stringify(data);
                console.log(JSON.parse(result));
                let responseAccountList = JSON.parse(result);
                
              }
            )
          })
          .then(json => console.log(json))
          .catch(err => console.log(err));
          
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
            if (rowData){
              if (rowData.accountId){
                detailInfoSetting(rowData.accountId);
              }
            }
            
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
            className={classes.modal}
            ><div style={this.state.modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">상세정보</h2>
            <div>
              <TextField required id="accountId" label="AccountId" variant="outlined" defaultValue={this.state.account? this.state.account.accountId : "지정된 아이디 없음"} style={{marginRight : 10}} disabled />
              <TextField required id="accountName" label="AccountName" variant="outlined" defaultValue={this.state.account? this.state.account.accountName : "지정된 AccountName 없음"} style={{marginRight : 10}} disabled />
            </div>
            
            <div style={{marginTop: 20}}>
              <TextField required id="email" label="email" variant="outlined" defaultValue={this.state.account? this.state.account.email : "입력된 이메일 주소가 없습니다"} style={{marginRight : 10}} disabled />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="gender"
                  fullWidth
                  value={this.state.account? this.state.account.gender : "성별이 지정되지 않았습니다"}
                  name="gender"
                  disabled
                  >
                  <MenuItem value={'MALE'}>남</MenuItem>
                  <MenuItem value={'FEMALE'}>여</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{marginTop: 20, marginBottom: 20}}>
              <TextField required id="phone" label="Phone" variant="outlined" defaultValue={this.state.account? this.state.account.phone : "지정된 전화번호 없음"} style={{marginRight : 10}} disabled />
            </div>
            <MaterialTable
          title="계정 - 역할 맵핑정보관리"
          columns={this.state.columns2}
          data={this.state.dataList2}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {                
                resolve();
                if (oldData) {
                  this.setState((prevState:AccountManageStates) => {
                  });
                }
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                  resolve();
                  this.setState((prevState:AccountManageStates) => {
                  });
              }),
          }}
        />
            
          </div></Modal>
        </div>
      );
    }
  }
  
  export default withStyles(useStyles)(AccountManage);