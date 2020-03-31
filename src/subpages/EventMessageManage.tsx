import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  eventMessageId? : number
  accountId? : string
  eventMessageType? : string
  evetnMessageTitle? : string
  eventMessageDescription? : string
  check? : string
  date? : string
}

interface EventMessageManageStates {
  columns: Array<Column<Row>>
  dataList: Row[];
}

interface EventMessageManageProps {
  session?: any
}

class EventMessageManage extends Component<EventMessageManageProps>{
  componentDidMount () {
    let jsonData = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }};
      fetch('/eventMessageListByAdmin', jsonData)
      .then(res => {
        res.json().then(
          data => {
            let result = JSON.stringify(data);
            console.log(JSON.parse(result));
            let responseEventMessageList = JSON.parse(result);
            this.setState({
              dataList : responseEventMessageList.eventMessages
            })
          }
        )
      })
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }
     
      
  state : EventMessageManageStates = {
    columns : [
      { title: 'EventMessageId', field: 'eventMessageId'},
      { title: 'AccountId', field: 'accountId' },
      { title: 'EventMessageType', field: 'eventMessageType'},
      { title: 'EventMessageTitle', field: 'eventMessageTitle'},
      { title: 'EventMessageDescription', field: 'eventMessageDescription'},
      { title: 'IsCheck', field: 'check'},
      { title: 'Date', field: 'date'},
    ],
    dataList : []
  }
    render() {  
      const tableContent = (
        <MaterialTable
          title="EventMessage Management Page"
          columns={this.state.columns}
          data={this.state.dataList}
        />
      );
      
      return (
        <div> 
            {tableContent}
        </div>
      );
    }
      
  }
  
  export default EventMessageManage;