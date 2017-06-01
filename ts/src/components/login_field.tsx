import * as React from 'react';

export interface ILoginFieldProps {
  label: string;
  error: string;
  value: string;
  password?: boolean;
  placeholder: string;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const LoginField = ({label, error, value, password,
  handleChange, placeholder }: ILoginFieldProps) => (
  <div className="login_field__container" >
    <h3>{label}</h3>
    <input
      className="login__input"
      name={label.toLowerCase()}
      type={password ? 'password' : 'text'}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
    <div className="login__error">
      {error}
    </div>
  </div>
);

export default LoginField;
