import { useEffect } from "react";
import Header from "../components/header/Header";
import { checkOpenSession } from "../services/huertas_server/checkOpenSession";
import { user } from "../data/userData";
import { useUserRoleContext } from "../context/UserRoleContext";
import PublicationsList from "../components/publicationsList/PublicationsList";

type CommentType = {
	id: number,
	author: string,
	content: string,
	publicationDate: string
}

export type BestPublicationsListType = [
	id: number,
	author: string,
	mainImage: string,
	title: string,
	mainText: string,
	publicationDate: string,
	score: number,
	comments: CommentType[]
]

export default function Home() {
	const { setUserRole } = useUserRoleContext();

	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	useEffect(() => {
		checkOpenSession()
			.then((userData) => {
				user.name = userData.userName;
				setUserRole(userData.userRole);
			})
			.catch(() => {
				user.name = "";
				setUserRole("visitor");
			});
	}, []);

	return (
		<>
			<header>
				<Header imageSRC={imageSRC} userBoxIcon={userBoxIcon} />
			</header>

			<main>
				<PublicationsList />
			</main>
		</>
	);
}
