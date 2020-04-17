import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import Modal from '@material-ui/core/Modal';
import { createStyles, WithStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      }, 
      modal: {
        position:'absolute',
        overflowY:"scroll",
        height:'100%',
      },
      formControl2: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      expansionPanelRoot: {
        width: '100%',
      },
      expansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(1),
      },
      submit: {
        marginLeft: 10,
        marginTop: 20,
        minWidth: 120,
        maxWidth: 300,
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
  roleId? : string
  roleName? : string
}
interface MappingSubmitData {
  accountId? : string
  roleIds : string[]
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
  hignLightData: Row2[],
  roleIds: string[],
  roleNames: string[],
}



function getModalStyle() {
  const top = 20;
  const left = 30;

  return {
    top: `${top}%`,
    left: `${left}%`,
    
  };
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      { title: 'RoleId', field: 'roleId' },
      { title: 'RoleName', field: 'roleName' }
    ],
    dataList2 : [],
    hignLightData: [],
    roleIds: [],
    roleNames: [],
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
      const setRoleId = (roleIds:string[]) => {
        this.setState({
          roleIds : roleIds
        })
      }
      const setRoleName = (roleIds:string[]) => {
        let roles: Row2[] = this.state.hignLightData;
        let roleNames:string[] = [];
        let isRoleNamePush:boolean = false;
        roles.forEach(role=>{
          roleIds.forEach(selectRoleId => {
            if ((role.roleId === selectRoleId) && typeof role.roleName === "string"){
              roleNames.push(role.roleName);
              isRoleNamePush = true;
            }
          })
        })
        if (isRoleNamePush){
          this.setState({
            roleNames : roleNames
          })
        } else {
          this.setState({
            roleNames : []
          })
        }
        
      }

      const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRoleId(event.target.value as string[]);
        setRoleName(event.target.value as string[]);
      };

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
          fetch('/getAccountAndRoleList', jsonData)
          .then(res => {
            res.json().then(
              data => {
                let result = JSON.stringify(data);
                console.log(JSON.parse(result));
                let responseDetailInfoList = JSON.parse(result);
                this.setState({
                  dataList2 : responseDetailInfoList.roleList,
                  hignLightData : responseDetailInfoList.hignLightData
                })
              }
            )
          })
          .then(json => console.log(json))
          .catch(err => console.log(err));
          
      }

      const onSubmit =
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const account:Row | undefined = this.state.account;
      let convertJson : MappingSubmitData = {
        accountId : account? account.accountId : '',
        roleIds : this.state.roleIds
      };
      console.log('convertJson: ', convertJson);
      
      let jsonData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(convertJson)};
        console.log(jsonData);
        fetch('/accountAndRoleInfoSave', jsonData)
        .then(res => {
          res.json().then(
            data => {
              let result = JSON.stringify(data);
              console.log(JSON.parse(result));
              window.location.replace("/admin");
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
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                  resolve();
                  this.setState((prevState:AccountManageStates) => {
                    console.log('oldData: ', oldData);
                    console.log('account: ', this.state.account?this.state.account.accountId:'');
                    const account:Row | undefined = this.state.account;
                    let roleIds:string[] | undefined = [];
                    let oldRoleId:string = '';
                    if (oldData.roleId){
                      oldRoleId = oldData.roleId;
                    }
                    
                    roleIds.push(oldRoleId);
                    let convertJson : MappingSubmitData = {
                      accountId : account? account.accountId : '',
                      roleIds : roleIds
                    };
                    console.log('convertJson: ', convertJson);
                    
                    let jsonData = {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(convertJson)};
                      console.log(jsonData);
                      fetch('/accountAndRoleInfoDelete', jsonData)
                      .then(res => {
                        res.json().then(
                          data => {
                            let result = JSON.stringify(data);
                            console.log(JSON.parse(result));
                            window.location.replace("/admin");
                          }
                        )
                      })
                      .then(json => console.log(json))
                      .catch(err => console.log(err));
                  });
              }),
          }}
        />
        {this.state.hignLightData[0] != "null" && <div style={{marginTop: 20, marginBottom: 20}}>
        <div className={classes.expansionPanelRoot}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.expansionPanelHeading}>계정 - 역할 맵핑정보 추가</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form className={classes.form} name="addAccountAndRoleInfo" noValidate action={"/addAccountAndRoleInfo"} method="POST" onSubmit={onSubmit}>
                <FormControl className={classes.formControl2}>
                <InputLabel id="select-roleId-label">RoleId</InputLabel>
                <Select
                  labelId="select-roleId-label"
                  id="roleId"
                  multiple
                  value={this.state.roleIds}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {this.state.hignLightData.map(({roleId, roleName}) => (
                    <MenuItem key={roleId} value={roleId} >
                      {roleId}
                      
                    </MenuItem>
                    
                  ))}
                </Select>  
                </FormControl>
                <FormControl className={classes.formControl2}>
                    <InputLabel id="select-roleName-label">RoleName</InputLabel>
                    <Select
                      labelId="select-roleName-label"
                      id="demo-mutiple-name"
                      multiple
                      value={this.state.roleNames}
                      onChange={handleChange}
                      input={<Input />}
                      MenuProps={MenuProps}
                      disabled
                    >
                      {this.state.hignLightData.map(({roleId, roleName}) => (
                        <MenuItem key={roleName} value={roleName} >
                          {roleName}
                        </MenuItem>
                        
                      ))}
                    </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  권한추가
                </Button>
              </form>
              
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        
        </div> }
          </div></Modal>
        </div>
      );
    }
  }
  
  export default withStyles(useStyles)(AccountManage);