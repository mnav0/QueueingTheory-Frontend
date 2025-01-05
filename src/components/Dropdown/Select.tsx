import React, {useRef, useState, useEffect} from 'react'

import {Dropdown, DropdownProps} from "./Dropdown";

type SelectPropsP = DropdownProps & {defaultValue: string, placeholder?:string}
type SelectPropsD = DropdownProps & {defaultValue?: string, placeholder:string}
export type SelectProps = SelectPropsP|SelectPropsD

export const Select: React.FC<SelectProps> = ({defaultValue, placeholder, ...props}) => {
  const [value, setValue] = useState(defaultValue);
  const { onSelect, title, children, ...dropdownProps} = props;

  const handleSelect = (val:string) => {
    if (onSelect) onSelect(val);
    setValue(val);
  }

  return <Dropdown title={value||placeholder} onSelect={handleSelect} {...dropdownProps}/>
}

export default Select;
