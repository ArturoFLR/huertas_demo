import Login from "../components/forms/Login";
import Header from "../components/header/Header";
import styles from "./LoginPage.module.scss";

function LoginPage() {
	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	return (
		<>
			<div className={styles.headerCompContainer}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main className="flex items-center justify-center overflow-hidden">
				<Login />
			</main>
		</>
	);
}

export default LoginPage;
