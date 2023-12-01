import React, { useState } from 'react'

import styles from './dropdown.module.scss';

export interface IDropdownProps {
  items: [],
  itemKey: string,
  itemValue: string,
  validationMessage?: string
  setValue?: (item: any) => void
}

export function Dropdown({items, itemKey, itemValue, setValue, validationMessage}: IDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  function toggleDropdown(): void {
    setIsDropdownVisible(!isDropdownVisible);
  }

  function setDropdownItem(item: any): void {
    if (setValue === undefined) {
      return;
    }

    if ((selectedItem && item) && selectedItem[itemKey] === item[itemKey]) {
      setSelectedItem(null);
      setValue(null);
      toggleDropdown();
      return;
    }
    setSelectedItem(item);
    setValue(item);
    toggleDropdown();
  }

  return (
    <div className={styles.dropdown__container}>
      <div className={styles.dropdown_input} onClick={() => toggleDropdown()}>
        <span style={{
          display: 'block'
        }}>
          {(selectedItem && itemValue) ? selectedItem[itemValue] : 'Select Item'}
        </span>
        <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
          {isDropdownVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </span>
      </div>
      {(validationMessage && typeof validationMessage === 'string') &&
        <span className={styles.forms_validation_message}>
          {validationMessage}
        </span>
      }
      
      { isDropdownVisible && <ul className={styles.dropdown_item_list}>
        {items.map((item) => (
          <li
            className={styles.dropdown_item}
            key={item[itemKey]}
            onClick={() => setDropdownItem(item)}
          >
            <span>{item[itemValue]}</span>
            { ((itemKey && selectedItem) && selectedItem[itemKey] === item[itemKey]) && (
              <span className={`material-icons-outlined`} style={{fontSize: '1rem', color: 'green'}}>
                done
              </span>
            )}
          </li>
        ))}
      </ul>}
    </div>
  )
}
