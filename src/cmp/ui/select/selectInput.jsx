import React, { useState } from "react";
import "./select.scss";

const SelectInput = ({ name, params, str, onChange, value }) => {
  const [showOptions, setShowOptions] = useState(false);

  function changeOption(item) {
    setShowOptions(false);
    onChange(name, item.value);
  }

  const currentValue = params.find((n) => n.value === value);

  return (
    <div className="__select" data-state={showOptions ? "active" : ""}>
      <div
        className={`__select__title ${currentValue && "active"}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {(currentValue && currentValue.title) || `${str}`}
      </div>
      <div className="__select__content">
        {params.map((x) => (
          <div
            key={`${name}${x.value}`}
            className={`__select__label ${value === x.value ? "active" : ""}`}
            onClick={() => changeOption(x)}
          >
            {x.title}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SelectInput;
