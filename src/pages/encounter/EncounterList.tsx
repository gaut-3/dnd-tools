import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import {useParams} from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import {EncounterModel} from "../../models/EncounterModel";
import {formatDateToString} from "../../utils/DateUtil";
import {Link} from "react-router-dom";
import {encList} from "../../models/EncounterDataTemp";

const EncounterList: React.FC = () => {
    const {name} = useParams<{ name: string }>();

    const getEncounterItem = (item: EncounterModel) => {
        return <Link to={"/encounter/" + item.id}>
            <IonItem className="ion-activatable">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {item.name}
                        </IonCol>
                        <IonCol>
                            {formatDateToString(item.lastUpdated)}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>
        </Link>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {encList.map(item => (getEncounterItem(item)))}
                </IonList>
                <ExploreContainer name={name}/>
            </IonContent>
        </IonPage>
    );
};

export default EncounterList;
