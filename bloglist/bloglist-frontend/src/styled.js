import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

export const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`
export const StyledLink = styled(Link)`
  font-size: 1em;
  margin: 2em;
  padding: 0.2em 1em;
  border: 2px solid slategrey;
  border-radius: 3px;
  color: black;
  background: bisque;
  font-weight: bold;
`
export const Button = styled.button`
  display: inline-block;
  color: seagreen;
  margin: 1em;
  font-size: 0.8em;
  border: 2px solid #slategrey;
  border-radius: 2px;
  background: bisque;
  display: block;
`
export const RedButton = styled(Button)`
  color: indianred;
`

export const InputField = styled.input`
  padding: 3px;
  border: 2px solid;
  outline: none;
  transition: border-color 0.3s;

  ${({ isInvalid }) =>
    isInvalid ? 'border-color: red;' : 'border-color: green;'}
`
