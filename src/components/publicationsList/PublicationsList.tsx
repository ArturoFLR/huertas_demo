import PublicationCard from "./PublicationCard";
import styles from "./PublicationsList.module.scss";
import { PublicationsListProps } from "./publicationsListTypes";
import { generateUniqueId } from "./../../utils/generateUniqueId";


function PublicationsList({ bestPublicationsArray }: PublicationsListProps) {

	return (
		<div className={styles.pubListMainContainer}>
			{
				bestPublicationsArray.map((element) => {
					return (
						<div className={styles.pubCardCompContainer} key={generateUniqueId()}>
							<PublicationCard id={element.id} author={element.author} mainImage={element.mainImage} title={element.title} mainText={element.mainText} />
						</div>
					);
				})
			}
		</div>
	);
}

export default PublicationsList;
