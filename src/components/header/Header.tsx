import styles from "./Header.module.scss";
import Logo from "./Logo";
import MainNav from "./MainNav";
import UserBox from "./UserBox";

type HeaderProps = {
	imageSRC: string,
	userBoxIcon: string
}

function Header({ imageSRC, userBoxIcon }: HeaderProps) {
	return (
		<header className={styles.headerLabel}>

			<div className={styles.logoCompContainer}>
				<Logo imageSRC={imageSRC} />
			</div>

			<div className={styles.mainNavCompContainer}>
				<MainNav />
			</div>

			<div className={styles.userBoxCompContainer}>
				<UserBox userBoxIcon={userBoxIcon} />
			</div>

		</header>
	);
}

export default Header;
