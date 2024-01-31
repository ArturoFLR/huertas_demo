import styles from "./Logo.module.scss";


type LogoProps = {
	imageSRC: string
}

function Logo({ imageSRC }: LogoProps) {
	return (
		<div className={styles.logoMainContainer}>
			<img alt="Logo de la página" src={imageSRC} className={styles.imgLabel} />
		</div>
	);
}

export default Logo;
