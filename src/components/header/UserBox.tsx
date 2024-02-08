import { Link } from "react-router-dom";
import styles from "./UserBox.module.scss";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { user } from "../../data/userData";
import { logOutUser } from "../../services/huertas_server/logOutUser";
import { useEffect, useRef } from "react";

type UserBoxProps = {
	userBoxIcon: string
}

function UserBox({ userBoxIcon }: UserBoxProps) {
	const { userRole, setUserRole } = useUserRoleContext();
	const axiosController = useRef<AbortController>();

	function logOut() {
		logOutUser(axiosController.current!)
			.then(() => {
				setUserRole("visitor");
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			axiosController.current?.abort();
		};
	});


	return (
		<div className={styles.userBoxMainContainer}>

			<img alt="" src={userBoxIcon} className={styles.imgLabel} />

			<div className={styles.userNameAndLoginContainer}>
				{
					userRole === "visitor"
						? (
							<>
								<p className={styles.welcomeText}>Bienvenido</p>
								<nav className={styles.logRegisterNavContainer}>
									<Link to="/login" className={styles.navLink}>Identifícate</Link>
									<Link to="/register" className={styles.navLink}>Regístrate</Link>
								</nav>
							</>
						)
						: (
							<>
								<Link to="/userprivatezone" className={styles.userPrivateZoneLink} >Hola <span className={styles.userName}>{user.name}</span></Link>
								<button type="button" onClick={logOut} className={styles.btnLogOut}>Cerrar Sesión</button>
							</>
						)
				}
			</div>

		</div>
	);
}

export default UserBox;
