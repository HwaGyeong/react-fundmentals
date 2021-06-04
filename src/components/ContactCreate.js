import React from 'react';

export default class ContactCreate extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            name: '',
            phone: ''
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleClick =this.handleClick.bind(this);
    }


    //입력에 따라 변화하는 값이 적용 되어 출력되도록 만드는 함수
    handleChange(e) {
        let nextState = {}; 
        nextState[e.target.name]= e.target.value;
        this.setState(nextState)
    }

    handleClick(){
        //들어온 값 저장
        const contact ={
            name: this.state.name,
            phone: this.state.phone
        };

        //저장 method 실행 
        this.props.onCreate(contact);

        //input 초기화 
        this.setState({
            name: '',
            phone: ''
        });
    }

    render(){
        return(
        <div>
            <h2>Create Contact</h2>
            <p>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </p>  
            <p>  
                <input
                    type="text"
                    name="phone"
                    placeholder="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                />
                
            </p>
            <button onClick={this.handleClick}>Create</button>
        </div>
        );
    }

}


ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not defined'); }
}