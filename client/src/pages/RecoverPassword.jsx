import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendPassword } from "../store/slices/users/thunks";
import jwt from 'jwt-decode';

const validationPasswords = {
  password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
};

function validation(input) {
  let errors = {};
  if (!validationPasswords.password.test(input.nuevaContraseña)) {
    errors.nuevaContraseña = "contraseña no valida, intente denuevo"
  }
  if (!validationPasswords.password.test(input.confirmacionDeContraseña)) {
    errors.confirmacionDeContraseña = "contraseña no valida, intente denuevo"
  }
  if (!input.nuevaContraseña === input.confirmacionDeContraseña) {
    errors.concidencia = "ambas contraseña tiene que se iguales"
  }
  return errors;
}



export default function RecoverPassword() {
	const [input, setInput] = useState({
		nuevaContraseña: "",
		confirmacionDeContraseña: "",
	});
  const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	function handlerChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
	}
  const navigate = useNavigate();
	let { token } = useParams();
	token = token.replaceAll("'", ".");
	const perfil = jwt(token);

	function handlerSubmit(e) {
		e.preventDefault();
		if (input.nuevaContraseña !== input.confirmacionDeContraseña) {
			return alert("la contraseñas no son iguales");
		}
		const contraseña = {
			nuevaContraseña: input.nuevaContraseña,
		};
		dispatch(sendPassword(perfil, contraseña));
		setInput({ nuevaContraseña: "", confirmacionDeContraseña: "" });
    navigate("/")
	}

	return (
		<div>
			<form onSubmit={(e) => handlerSubmit(e)}>
				<div>
					<h4>Nueva contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.nuevaContraseña}
						name="nuevaContraseña"
						onChange={(e) => handlerChange(e)}
					/>
      {errors.nuevaContraseña && <p>{errors.nuevaContraseña}</p>}  
				</div>
				<div>
					<h4>confirmar contraseña</h4>
					<input
						type="password"
						placeholder="Enter your password"
						value={input.confirmacionDeContraseña}
						name="confirmacionDeContraseña"
						onChange={(e) => handlerChange(e)}
					/>
          { errors.confirmacionDeContraseña && <p>{errors.confirmacionDeContraseña}</p>}
				</div>
				<bottom type="submit" onClick={(e) => handlerSubmit(e)}>
					enviar
				</bottom>
			</form>
      <br />
      <p>Minimo 8 caracteres</p>
      <p>Al menos una letra en mayúscula</p>
      <p>al menos una letra minúscula </p>
      <p>Al menos un número</p>
      <p>Puede contener un signo especial</p>
		</div>
	);
}
