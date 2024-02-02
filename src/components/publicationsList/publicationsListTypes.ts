export type PublicationPreviewType = {
	id: number,
	author: string,
	mainImage: string,
	title: string,
	mainText: string
}

export type PublicationsListProps = {
	bestPublicationsArray: PublicationPreviewType[]
}