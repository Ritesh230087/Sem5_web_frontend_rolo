import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./OrderForm.css";

const AutocompleteInput = ({
  placeholder,
  suggestions,
  onSelect,
  value,
  onChange,
  error,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onChange(item.name);
    onSelect(item);
    setShowSuggestions(false);
  };

  const filtered = suggestions.filter((s) =>
    s.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{error}</span>}

      {showSuggestions && value && (
        <ul className="suggestions-list">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li key={item._id} onClick={() => handleSelect(item)}>
                {item.name}
              </li>
            ))
          ) : (
            <li className="no-suggestions">No suggestions</li>
          )}
        </ul>
      )}
    </div>
  );
};

AutocompleteInput.propTypes = {
  placeholder: PropTypes.string,
  suggestions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AutocompleteInput;
