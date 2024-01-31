import styles from "./WrongPath.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function WrongPath() {
	const navigate = useNavigate();

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			navigate("/");
		}, 3000);

		return () => {
			clearTimeout(redirectTimer);
		};
	});

	return (
		<main className={styles.wrongPathMainContainer}>
			<h1 className={styles.wrongPathText}>La página indica no existe. Redirigiendo a Home...</h1>
		</main>
	);
}

export default WrongPath;
