import styles from "./Home.module.scss";
import { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import { checkOpenSession } from "../services/huertas_server/checkOpenSession";
import { user } from "../data/userData";
import { UserRoleType, useUserRoleContext } from "../context/UserRoleContext";
import PublicationsList from "../components/publicationsList/PublicationsList";
import { getBestPublications } from "../services/huertas_server/getBestPublications";
import { PublicationPreviewType } from "../components/publicationsList/publicationsListTypes";
import ChartBar from "../components/charts/ChartBar";
import { BarChartDataType, LineChartDataType, MapChartDataType } from "../components/charts/ChartBarTypes";
import ChartLine from "../components/charts/ChartLine";
import { getChartsData } from "../services/huertas_server/getChartsData";
import ChartMap from "../components/charts/ChartMap";


type LoadingStateType = "loading" | "loaded" | "error";

type UserDataType = {
	userName: string,
	userRole: UserRoleType
}

type ChartsDataType = {
	barChartData: BarChartDataType,
	lineChartData: LineChartDataType,
	mapChartData: MapChartDataType,
}

export default function Home() {
	const { setUserRole } = useUserRoleContext();
	const [publicationsState, setPublicationsState] = useState<LoadingStateType>("loading");
	const [dashboardState, setDashboardState] = useState<LoadingStateType>("loading");

	const bestPublicationsArray = useRef<PublicationPreviewType[]>([]);
	const chartsData = useRef<ChartsDataType>();

	const imageSRC = "images/huertas-logo.png";
	const userBoxIcon = "icons/user.png";

	useEffect(() => {
		const axiosController = new AbortController();

		checkOpenSession(axiosController)
			.then((userData: UserDataType) => {
				user.name = userData.userName;
				setUserRole(userData.userRole);
			})
			.catch(() => {
				user.name = "";
				setUserRole("visitor");
			});

		getBestPublications(axiosController)
			.then((bestPublicationsList: PublicationPreviewType[]) => {
				bestPublicationsArray.current = bestPublicationsList;
				setPublicationsState("loaded");
			})
			.catch(() => {
				setPublicationsState("error");
			});

		getChartsData(axiosController)
			.then((chartsDataResponse: ChartsDataType) => {
				chartsData.current = chartsDataResponse;
				setDashboardState("loaded");
			})
			.catch(() => {
				setDashboardState("error");
			});

		return () => {
			axiosController.abort();
		};
	}, []);

	return (
		<>
			<div className={`${styles.headerCompContainer} bg-yellow-200`}>
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

				<div className={styles.dashboardContainer}>
					{
						dashboardState === "loading" && (
							<div className={styles.dashboardLoadingContainer}>
								<img alt="Cargando..." src="icons/loading.gif" className={styles.loadingIcon} />
							</div>
						)
					}

					{
						dashboardState === "error" && (
							<div className={styles.dashboardErrorContainer}>
								<p className={styles.dashboardErrorFirstParagraph}>No se ha podido cargar el dashboard.</p>
								<p className={styles.dashboardErrorSecondParagraph}>Por favor, compruebe su conexión y refresque la página.</p>
							</div>
						)
					}

					{
						dashboardState === "loaded" && (
							<>
								<div className={styles.barChartDataCompContainer}>
									<ChartBar barChartData={chartsData.current?.barChartData!} />
								</div>

								<div className={styles.lineChartDataCompContainer}>
									<ChartLine lineChartData={chartsData.current?.lineChartData!} />
								</div>

								<div className={styles.mapChartDataCompContainer}>
									<ChartMap mapChartData={chartsData.current?.mapChartData!} />
								</div>
							</>
						)
					}
				</div>

			</main>
		</>
	);
}
