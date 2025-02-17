import React from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./FormInputWrapper.module.scss";
import FormLabel from "../FormHelpers/FormLabel";
import FormError from "../FormHelpers/FormError";
import FormInputWrapperType from "../../types/Form/FormInputs/FormInputWrapper";
import FormInputType, { FormActionType } from "../../types/Form/FormInputs";

const cx = classNames.bind(styles);

/**
 * Adds extra props or updates current props to connect an input to be managed
 * by react hook form.
 */
export const FormInputWrapper = ({
  as: Component,
  ...props
}: FormInputWrapperType & FormInputType & FormActionType) => {
  const { name, isRequired, label, validate, className, style, isDisabled } =
    props;

  return (
    <Controller
      name={name}
      rules={{
        validate: validate || undefined,
        required: isRequired && `${label ?? "Input"} is required`,
      }}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, isTouched },
        formState: { isSubmitted },
      }) => {
        const isValidated = isTouched || isSubmitted;
        const errorMessage = error?.message;

        const handleChange = (...args: any[]) => {
          props.onChange?.(...args);
          onChange(...args);
        };

        const handleBlur = () => {
          props.onBlur?.();
          onBlur();
        };

        return (
          <div className={cx("wrapper", className)} style={style}>
            <FormLabel
              name={name}
              label={label}
              isRequired={isRequired}
              isDisabled={isDisabled}
            />

            <Component
              {...props}
              onChange={handleChange}
              onBlur={handleBlur}
              value={value}
              inputRef={ref}
              isValidated={isValidated}
              isError={!!errorMessage}
            />

            <FormError message={!isDisabled ? errorMessage : null} />
          </div>
        );
      }}
    />
  );
};

export default FormInputWrapper;
