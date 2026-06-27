interface Props {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  type?: string;
}

const Input = (props: Props) => {
  const {
    value,
    onChange,
    placeholder = "Enter value",
    inputClassName,
    inputRef,
    onKeyDown,
    onFocus,
    autoFocus,
    type,
  } = props;
  return (
    <input
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        onChange?.(value);
      }}
      placeholder={placeholder}
      className={`w-full px-2 py-1 duration-300 text-md font-semibold text-[color:var(--color-text-primary)] border border-solid rounded-md ${inputClassName}`}
      onKeyDown={(e) => onKeyDown?.(e)}
      onFocus={(e) => onFocus?.(e)}
      ref={inputRef}
      autoFocus={autoFocus}
      type={type}
    />
  );
};

export default Input;
