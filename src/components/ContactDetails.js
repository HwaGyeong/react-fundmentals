import React from 'react';

export default class ContactDetails extends React.Component{
    render(){

        const details =(
            <div>
                <p>{this.props.contact.name} </p>
                <p>{this.props.contact.phone} </p>
            </div>
        );
        const blank=(<div>Not Selected</div>);


        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? details: blank }
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
    }
};