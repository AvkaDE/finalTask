import { React, useState } from "react";
import "./select.scss";

const SelectCheckbox = ({ data, str, onChangeValues, name, zTitle = 2, zContent = 1 }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [valueOption, setValueOption] = useState([]);

  function changeOption(value) {
    const index = valueOption.indexOf(value);
    if (index === -1) {
      const newArr = [...valueOption, value]
      onChangeValues(name, newArr);
      return setValueOption(newArr);
    }
    const newArr = [...valueOption];
    newArr.splice(index, 1);
    setValueOption(newArr);
    onChangeValues(name, newArr);
  }

  return (
    <>
      <div className="__select" data-state={showOptions ? "active" : ""}>
        <div
          className={`__select__title ${valueOption.length > 0 && "active"}`}
          style={{zIndex: zTitle}}
          onClick={() => setShowOptions(!showOptions)}
        >
          {(valueOption.length > 0 &&
            valueOption
              .map((n) => data.find((x) => x.value === n).title)
              .join(", ")) ||
            `${str}`}
        </div>
        <div className="__select__content" style={{zIndex: zContent}}>
          {data.map((x) => (
            <div className="checkbox" key={`multipleSelect${x.value}`}>
              <input
                className="custom-checkbox"
                type="checkbox"
                id={`multipleSelect${x.value}`}
                name={`multipleSelect${x.value}`}
                value="indigo"
                // key={`multipleSelect${x.value}`}
              />
              <label
                onClick={() => changeOption(x.value)}
                htmlFor={`multipleSelect${x.value}`}
                // key={`multipleSelectLable${x.value}`}
                className={`checkbox-label ${
                  valueOption.indexOf(x.value) > -1 ? "active" : ""
                }`}
              >
                {x.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default SelectCheckbox;
