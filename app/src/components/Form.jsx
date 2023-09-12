import { useRef, useState } from 'react';
import { initialState } from '../state/initialState';
import { formErrorsState } from '../state/formErrorsState';
import styles from './Form.module.css';

export const Form = () => {
	const [state, setState] = useState(initialState);
	const [formErrors, setFormErrors] = useState(formErrorsState);
	const passwordRef = useRef('');
	const repeatPasswordRef = useRef('');
	const buttonRef = useRef('');
	const isValid =
		!state.email ||
		!state.password ||
		!state.repeatPassword ||
		!!formErrors.email ||
		!!formErrors.password ||
		!!formErrors.repeatPassword;

	const sendFormData = (formData) => {
		console.log('Данные отправлены.', formData);
		console.log('formErrors =>>>', formErrors);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		sendFormData(state);
	};

	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
		let newError = null;

		switch (e.target.name) {
			case 'email':
				if (!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(e.target.value)) {
					newError = 'Введите корректный e-mail';
				}
				setFormErrors({ ...formErrors, [e.target.name]: newError });
				break;

			case 'password':
				if (
					repeatPasswordRef.current.value !== passwordRef.current.value &&
					repeatPasswordRef.current.value.length !==
						passwordRef.current.value.length
				) {
					newError = 'Введённые пароли не совпадают';
					setFormErrors({
						...formErrors,
						[repeatPasswordRef.current.name]: newError,
					});
				} else {
					setFormErrors({
						...formErrors,
						[repeatPasswordRef.current.name]: null,
					});
				}

				if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/.test(e.target.value)) {
					newError = '8-25 символов, Хотя бы одна буква и одна цифра';
					setFormErrors({ ...formErrors, [e.target.name]: newError });
				} else {
					setFormErrors({ ...formErrors, [e.target.name]: null });
				}
				break;

			case 'repeatPassword':
				if (
					repeatPasswordRef.current.value !== passwordRef.current.value &&
					repeatPasswordRef.current.value.length !==
						passwordRef.current.value.length
				) {
					newError = 'Введённые пароли не совпадают';
					setFormErrors({ ...formErrors, [e.target.name]: newError });
				} else {
					setFormErrors({ ...formErrors, [e.target.name]: null });
					buttonRef.current.focus(); //дописать
				}
				break;

			default:
				break;
		}
		// setFormErrors({ ...formErrors, [e.target.name]: newError });
	};
	// console.log('formErrors ====>>', formErrors);
	// console.log('state ',state);
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<h1 className={styles.title}>Регистрация</h1>
			<div className={styles.formFields}>
				<input
					type="text"
					className={styles.input}
					value={state.email}
					name="email"
					placeholder="Email"
					onChange={onChange}
				/>
				{formErrors.email && (
					<div className={styles.errors}>{formErrors.email}</div>
				)}

				<input
					ref={passwordRef}
					type="text"
					className={styles.input}
					value={state.password}
					name="password"
					placeholder="Password"
					onChange={onChange}
				/>
				{formErrors.password && (
					<div className={styles.errors}>{formErrors.password}</div>
				)}

				<input
					ref={repeatPasswordRef}
					type="text"
					className={styles.input}
					value={state.repeatPassword}
					name="repeatPassword"
					placeholder="Repeat password"
					onChange={onChange}
				/>
				{formErrors.repeatPassword && (
					<div className={styles.errors}>{formErrors.repeatPassword}</div>
				)}

				<button
					ref={buttonRef}
					type="submit"
					className={styles.signUp}
					disabled={isValid}
				>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
};
