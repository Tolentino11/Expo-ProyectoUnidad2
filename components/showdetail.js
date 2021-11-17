import styled from "styled-components/native";

const Header = styled.Text`
align-self: center;
    color: black;
    font-size: 22px;
`
const InfoContainer = styled.View`
    flex: 1;
    align-content: center;
    justify-content: center;
`
const AccountImage = styled.Image`
    height: 300px;
    width: 300px;
    border-radius: 200px;
    align-self: center;
    margin: 20px;
`
const TrashButtonContainer = styled.View`
    flex: 1;
    align-content: center;
    justify-content: center;
    margin: 70px;
`
const DeleteButton = styled.TouchableOpacity`
    align-self: rigth;
     display: inline-block !important;
     width: 10%;
`
const CompleteItem = styled.TouchableOpacity`
    align-self: rigth;
     display: inline-block !important;
     width: 20%;
`
const DeleteItem = styled.TouchableOpacity`
    align-self: rigth;
     display: inline-block !important;
     width: 16%;
`

const CustomInput = styled.TextInput`
    background-color: #fff;
    width: 30%;
    width: 200px;
    height: 30px;
    border-color: #686868b8;
`
export { InfoContainer, AccountImage, Header, TrashButtonContainer, DeleteButton,CustomInput,CompleteItem,DeleteItem }