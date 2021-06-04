import React from 'react';

export default class ContactDetails extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isEdit: false,
            name: '',
            phone: ''
        };

        //toggle 기능으로 edit 부분 띄우기
        this.handleToggle=this.handleToggle.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleEdit= this.handleEdit.bind(this);
    }

    handleToggle() {
        if(!this.state.isEdit) {//isEdit이 false이면 원래 값 보이기
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {//아니면 수정 
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        });
    }


    //사용자 입력 값에 따라 입력 값이 보이게 출력
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }


    //값 변경이 가능하게 하는 함수
    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }


    render(){

        const details =(
            <div>
                <p>{this.props.contact.name} </p>
                <p>{this.props.contact.phone} </p>
            </div>
        );//기본 출력 값 


        //edit 기능 toggle시 보이게 하는 변수
        const edit = (
            <div>
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
            </div>
        );

        //isEdit 이 true 이면 edit 값이 보이고 그렇지 않으면 바꾸기 전 선택된 값만 보이도록 설정
        const view = this.state.isEdit ? edit : details;


        //아무것도 설정되지 않은경우
        const blank=(<div>Not Selected</div>);


        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank }
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? 'OK' : 'Edit'}
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
            //선택 되어있는 경우 selectedKey값이 -1이 아니기 때문에 selected 출력, 그렇지 않은 경우 Not selected 출력
        );
    }
}

//선택값이 없을 때 error 가 발생하지 않도록 기본값 설정 
ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit not defined'); }
};