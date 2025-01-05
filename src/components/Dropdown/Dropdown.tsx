import React, {useRef, useState, useEffect} from 'react'
import cx from "classnames";
import useOnClickOutside from "src/hooks/useOnClickOutside";

import "./Dropdown.css";

export type DropdownProps = {
  options: string[],
  active?: boolean,
  closeOnSelect?: boolean,
  title?: string,
  selected?: string,
  className?:string
  onSelect?: (selected:string) => any
}

export const Dropdown: React.FC<DropdownProps> = ({options, className, onSelect, active, closeOnSelect=true, title}) => {
  const [isActive, setActive] = useState(active||false);
  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => isActive && setActive(false));

  useEffect(() => {
    if (isActive && !active) setActive(false);
    if (!isActive && active) setActive(true);
  }, [active])

  const onOptionClick = (opt:string) => () => {
    if (closeOnSelect) setActive(false);
    if (onSelect) onSelect(opt);
  }
  
  return (
    <div ref={node} className={cx("dropdown", className)}>
      <button className="dropdown-btn" onClick={() => setActive(!isActive)}>{title||options[0]}</button>
      <div className={cx("options-container", {
        block: isActive,
        hidden: !isActive
      })}>
        {options.map((option) => (
          <div className={cx("option", {"selected": title===option})} key={option}  onClick={onOptionClick(option)}>
            {option}
          </div>
        ))}
    </div>
   </div>
  )
}

export default Dropdown;
