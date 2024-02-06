import Header from "../components/header/Header";
import styles from "./PublicationsPage.module.scss";

function PublicationsPage() {
	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";


	return (
		<>
			<div className={`${styles.headerCompContainer} bg-yellow-200`}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main>
				<p>Estás viendo una lista de publicaciones</p>
			</main>
		</>
	);
}

export default PublicationsPage;
