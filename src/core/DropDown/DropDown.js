import React, { Component } from "react";
import Select from "react-select";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./SearchableDropDown.css";

export default class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.customStyles = {
      menu: (provided) => ({
        ...provided,
        maxHeight: props.menuMaxHeight ? props.menuMaxHeight : "170px",
        marginBottom: props.marginBottom ? props.marginBottom : "2px", // controls the gap between the input and dropdown list
        ...(props.menuListZindex && { zIndex: props.menuListZindex }),
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: props.menuMaxHeight ? props.menuMaxHeight : "170px",
        fontSize:
          props.fontSize ||
          (props.commonStyles && props.commonStyles.fontSize) ||
          "18px",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: props.placeholderColor || "#9B9B9B",
        marginLeft: "0px",
        fontSize: props.commonStyles ? props.commonStyles.fontSize : "18px",
      }),
      /**  For drop down container **/
      control: (provided) => ({
        ...provided,
        fontSize:
          props.fontSize ||
          (props.commonStyles && props.commonStyles.fontSize) ||
          "18px",
        minHeight: props.commonStyles ? props.commonStyles.minHeight : "38px",
      }),
      /**  For droparrow **/
      dropdownIndicator: (provided) => ({
        ...provided,
        height: props.commonStyles && props.commonStyles.height,
        minHeight: props.commonStyles && props.commonStyles.minHeight,
        padding: props.commonStyles
          ? props.commonStyles.dropdownPadding
          : "8px 0 8px 8px",
        opacity: props.disabled ? "0.3" : "1",
        display: props.hideArrowAndSeparator ? "none" : "inherit",
      }),
      /**  For seperator **/
      indicatorSeparator: (provided) =>
        props.hideArrowAndSeparator
          ? null
          : {
              ...provided,
              margin:
                props.commonStyles &&
                props.commonStyles.indicatorSeparatormargin,
            },
      /**  For value showing **/
      singleValue: (provided) => ({
        ...provided,
        color:
          props.disabled && props.isSingleValue
            ? props.commonStyles && props.commonStyles.colorSelected
            : "#404040",
        marginLeft: "0",
      }),
      /**  For value outer container **/
      valueContainer: (provided) => ({
        ...provided,
        marginTop:
          props.commonStyles && props.commonStyles.valueContainermarginTop,
        padding: props.commonStyles && props.commonStyles.valueContainerpadding,
      }),
      container: (provided) => ({
        ...provided,
        cursor: "pointer",
      }),
      // selected value box
      multiValue: (provided) => ({
        ...provided,
        marginTop: props.boxProps ? props.boxProps.marginTop : "0px",
      }),
    };
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.object,
  };

  static defaultProps = {
    defaultValue: null,
    placeholder: "Please Select",
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.customStyles = {
        ...this.customStyles,
        dropdownIndicator: (provided) => ({
          ...provided,
          opacity: this.props.disabled ? "0.3" : "1",
        }),
      };
    }
  }
  onSelectChange(item, ticketId) {
    if (item) {
      this.props.optionSelected({ ...item, type: this.props.type }, ticketId);
    } else {
      this.props.optionSelected(item, ticketId);
    }
  }

  render() {
    const {
      isClearable,
      placeholder,
      id,
      isMulti,
      defaultValue,
      disabled,
      options,
      noMargin,
      title,
      value
    } = this.props;
    return (
      <div
        className={
          !disabled
            ? classNames(styles.dropDownStyle, noMargin)
            : classNames(
                styles.dropDownStyle,
                styles.dropDownStyleDisabled,
                noMargin,
                styles.noDrop
              )
        }
        title={title}
      >
        <Select
          isMulti={isMulti}
          id={id}
          isClearable={isClearable}
          styles={this.customStyles}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => this.onSelectChange(e, id)}
          options={options || []}
          isDisabled={disabled}
          placeholder={placeholder}
          key={this.props.key}
          menuPlacement={this.props.menuPlacement || "bottom"}
        />
      </div>
    );
  }
}
