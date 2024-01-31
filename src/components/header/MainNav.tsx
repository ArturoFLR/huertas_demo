import { Link } from "react-router-dom";
import styles from "./MainNav.module.scss";
import { useUserRoleContext } from "../../context/UserRoleContext";

function MainNav() {
	const { userRole } = useUserRoleContext();

	return (
		<nav className={styles.navLabel}>
			<ul className={styles.ulLabel}>
				<li className={styles.liLabel}>
					<Link to="/" className={styles.navLink}>Home</Link>
				</li>

				{
					userRole !== "visitor" && (
						<>
							<li className={styles.liLabel}>
								<Link to="/publications" className={styles.navLink}>Publicaciones</Link>
							</li>
							<li className={styles.liLabel}>
								<Link to="/forums" className={styles.navLink}>Foro</Link>
							</li>
						</>
					)
				}

				{
					userRole === "producer" || userRole === "admin"
						? (
							<li className={styles.liLabel}>
								<Link to="/plantations" className={styles.navLink}>Plantaciones</Link>
							</li>
						)
						: null
				}
			</ul>
		</nav>
	);
}

export default MainNav;
