import Register from "../components/forms/Register";
import Header from "../components/header/Header";
import styles from "./RegisterPage.module.scss";

function RegisterPage() {
	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	return (
		<>
			<div className={`${styles.headerCompContainer} bg-yellow-200`}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main className={styles.registerCompContainer}>
				<Register />
			</main>
		</>
	);
}

export default RegisterPage;
