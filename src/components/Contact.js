import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

//update 사용을 위함 (immutablility helper)
import update from 'immutability-helper';

export default class Contact extends React.Component{

    constructor(props)//생성자
    {
        super(props);
        this.state={

            selectedKey: -1,

            keyword:'',//공백으로 keyword 설정 

            contactData: [
            {
                name: 'Abet',
                phone: '010-0000-0000'
            },
            {
                name: 'Betty',
                phone: '010-0000-0001'
            },
            {
                name: 'Charlie',
                phone: '010-0000-0002'
            },
            {
                name: 'David',
                phone: '010-0000-0003'
            }]
        };
        //binding을 해줘야 직접 정의한 함수가 동작함
        this.handleChange=this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //전화번호 생성, 수정, 삭제 기능의 함수 바인딩 
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }


    //keyword 입력시 입력에 따른 변화를 주기 위한 함수 
    handleChange (e) {
        this.setState({
            keyword: e.target.value//event값으로 변경한다
        });
    } 

    handleClick (key) {
        this.setState({
            selectedKey : key
        });
        console.log(key,'is selected');//key 값 확인 용도
    }

    //전화번호 추가 함수 
    handleCreate (contact){
        this.setState({
            contactData : update (this.state.contactData, {$push :[contact]})

        });
    }

    //전화번호 삭제 함수 
    handleRemove () {
        if(this.state.selectedKey<0)//선택된 것이 없는 경우 삭제 하지 않도록 설정
            return;
            
        this.setState({
            contactData : update(this.state.contactData,
                {$splice : [[this.state.selectedKey,1]]}//selectedKey번호 부터 한개만 삭제
            ),
            selectedKey: -1
        });
    }
    //전화번호 수정 함수 
    handleEdit(name, phone){
        this.setState({
            contactData : update (this.state.contactData,
                {
                    [this.state.selectedKey] : {
                        name : {$set: name},
                        phone : {$set: phone}
                    }
                }
            )
        });
    }


    render(){
        const mapToComponents = (data)=> {
            data.sort();//data를 오름차순 정렬 -> sort: 기존의 배열에 정렬하여 저장 

            //대소문자 상관 없이 검색이 가능하도록 구성
            //filter: 해당 조건에 만족 되는 값만 골라서 새로운 배열에 저장함
            data= data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase())>-1;
                }
            );

            return data.map((contact,i) =>{//map 형태로 이름과 번호 출력
                return (
                        <ContactInfo 
                        contact={contact} 
                        key={i}
                        onClick={()=> this.handleClick(i)}
                        /> );
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input 
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}//변화를 위해 작동하는 함수 호출
                />
                <div>{mapToComponents (this.state.contactData)}</div>
                <ContactDetails 
                    isSelected = {this.state.selectedKey !=-1 }
                    contact ={this.state.contactData[this.state.selectedKey]}
                    onRemove ={this.handleRemove}
                    onEdit ={this.handleEdit}
                />
                <ContactCreate 
                    onCreate={this.handleCreate}
                /> 
               
            </div>
        );
    }
}