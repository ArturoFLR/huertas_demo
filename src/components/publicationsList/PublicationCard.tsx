import { useEffect, useRef, useState } from "react";
import styles from "./PublicationCard.module.scss";
import { Link } from "react-router-dom";

type PublicationCardProps = {
	id: number,
	mainImage: string,
	title: string,
	author: string,
	mainText: string,
}

function PublicationCard({ id, mainImage, title, author, mainText }: PublicationCardProps) {
	const [maxChars, setMaxChars] = useState(0);
	const cardContainer = useRef<HTMLDivElement>(null);

	const linkUrl = `/publications/${id}`;


	function calcMaxChars() {
		const cardWidth = cardContainer.current?.clientWidth;
		const newMaxCharsValue = (cardWidth as number * 65) / 190;
		setMaxChars(newMaxCharsValue);
	}

	function generatePreviewText() {
		const fixedText = mainText.substring(0, maxChars);					// The minimun number of characters we´re going to show
		let finalPreviewText = fixedText;

		if (fixedText[maxChars] !== " " && fixedText[maxChars] !== ".") {			// We don't want the text to end in the middle of a word, so if "fixedText" does not end in a space " " or a period ".", we save a part of the text that comes next to look for a space (the end of a word or a phrase)
			const restOfText = mainText.substring(maxChars + 1, 100);
			const indexOfNextSpace = restOfText.indexOf(" ");
			const endingText = restOfText.substring(0, indexOfNextSpace);
			finalPreviewText += endingText;
		}

		return finalPreviewText;
	}

	useEffect(() => {
		calcMaxChars();

		window.addEventListener("resize", calcMaxChars);

		return () => {
			removeEventListener("resize", calcMaxChars);
		};
	});

	return (
		<Link to={linkUrl}>
			<div className={styles.publiCardMainContainer} ref={cardContainer} key={id} >

				<div className={styles.publiCardImageContainer}>
					<img alt="Publication Main Image" src={mainImage} className={styles.publiCardMainImage} />
				</div>

				<div className={styles.publiCardContent}>
					<h3 className={styles.publiCardTitle}>{title}</h3>
					<p className={styles.publiCardAuthor}>{author}</p>
					<p className={styles.publiCardMainText}>{generatePreviewText()} <span> (...)</span></p>
				</div>
			</div>
		</Link>
	);
}

export default PublicationCard;
