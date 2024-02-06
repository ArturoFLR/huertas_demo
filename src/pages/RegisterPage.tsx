import Register from "../components/forms/Register";
import Header from "../components/header/Header";
import styles from "./RegisterPage.module.scss";

function RegisterPage() {
	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	return (
		<div className="overflow-hidden">
			<div className={`${styles.headerCompContainer} bg-yellow-200`}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main className="w-[90%] h-[100%] flex justify-center items-center overflow-hidden">
				<Register />
			</main>
		</div>
	);
}

export default RegisterPage;
