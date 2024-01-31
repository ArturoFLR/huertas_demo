import styles from "./PublicationCard.module.scss";

type PublicationCardProps = {
	key: number,
	mainImage: string,
	title: string,
	mainText: string,
}

function PublicationCard({ key, mainImage, title, mainText }: PublicationCardProps) {

	function generatePreviewText() {
		const previewText = `${mainText.substring(0, 70)}(...)`;
		return previewText;
	}

	return (
		<div className={styles.publiCardMainContainer} key={key} >
			<div className={styles.publiCardHeader}>
				<img alt="" src={mainImage} className={styles.publiCardMainImage} />
				<h2 className={styles.publiCardTitle}>{title}</h2>
			</div>

			<div className={styles.publiCardContent}>
				<p className={styles.publiCardMainText}>{generatePreviewText()}</p>
			</div>
		</div>
	);
}

export default PublicationCard;
