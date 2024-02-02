import styles from "./Home.module.scss";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import { checkOpenSession } from "../services/huertas_server/checkOpenSession";
import { user } from "../data/userData";
import { UserRoleType, useUserRoleContext } from "../context/UserRoleContext";
import PublicationsList from "../components/publicationsList/PublicationsList";
import { getBestPublications } from "../services/huertas_server/getBestPublications";
import { PublicationPreviewType } from "../components/publicationsList/publicationsListTypes";

type PublicationStateType = "loading" | "loaded" | "error";

type UserDataType = {
	userName: string,
	userRole: UserRoleType
}


export default function Home() {
	const { setUserRole } = useUserRoleContext();
	const [publicationsState, setPublicationsState] = useState<PublicationStateType>("loading");

	const bestPublicationsArray = useRef<PublicationPreviewType[]>([]);

	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	useEffect(() => {
		checkOpenSession()
			.then((userData: UserDataType) => {
				user.name = userData.userName;
				setUserRole(userData.userRole);
			})
			.catch(() => {
				user.name = "";
				setUserRole("visitor");
			});

		getBestPublications()
			.then((bestPublicationsList: PublicationPreviewType[]) => {
				bestPublicationsArray.current = bestPublicationsList;
				setPublicationsState("loaded");
			})
			.catch(() => {
				setPublicationsState("error");
			});
	}, []);

	return (
		<>
			<div className={styles.headerCompContainer}>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</div>

			<main>
				{
					publicationsState === "loading" && (
						<div className={styles.pubListLoadingContainer}>
							<img alt="Cargando..." src="icons/loading.gif" className={styles.loadingIcon} />
						</div>
					)
				}

				{
					publicationsState === "error" && (
						<div className={styles.pubListErrorContainer}>
							<p className={styles.pubListErrorFirstParagraph}>No se han podido cargar las publicaciones.</p>
							<p className={styles.pubListErrorSecondParagraph}>Por favor, compruebe su conexión y refresque la página.</p>
						</div>
					)
				}

				{
					publicationsState === "loaded" && (
						<div className={styles.pubListCompContainer}>
							<PublicationsList bestPublicationsArray={bestPublicationsArray.current} />
						</div>
					)
				}
			</main>
		</>
	);
}
