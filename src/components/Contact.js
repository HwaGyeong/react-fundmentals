import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

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
                />
               
            </div>
        );
    }
}