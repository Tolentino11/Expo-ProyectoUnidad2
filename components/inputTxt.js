import React from "react"
import styled from "styled-components/native"

const CustomInput = styled.TextInput`
    background-color: #FFFFFF;
    width: 30%;
    width: 200px;
    height: 30px;
    border-color: #686868b8;
`
export default function ProductInput({ onChangeText, refInput }) {
    return (
        <CustomInput onChangeText={onChangeText} ref={refInput} placeholder="Nueva tarea" />
    )
}