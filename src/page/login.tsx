import * as React from 'react';

interface LoginProps {
  id: string;
}

interface LoginState {
  id: string
}

class login extends React.Component<LoginProps, LoginState>{
  constructor(props: LoginProps){
    super(props);
    this.state = {
      id: 'test',
    }
  }

  componentDidMount() {

  }

  setId = (inputId: string) => {
    this.setState({ id: inputId});
  }

  render() {

    return (
      <div>test</div>
    );
  }
}

export default login;