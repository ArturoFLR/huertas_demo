import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import styles from "./PublicationPage.module.scss";

function PublicationPage() {
	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	const { id } = useParams();

	return (
		<>
			<div className={`${styles.headerCompContainer} bg-yellow-200`}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main>
				<p>Estás viendo la publicación: {id}</p>
			</main>
		</>
	);
}

export default PublicationPage;
