import {
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import "./Page.css";

const EncounterList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const encList = [
    {id: 1, fields: ["asdf", "asdfs"]},
    {id: 2, fields: ["asdf", "asdfs"]},
    {id: 3, fields: ["asdf", "asdfs"]}
]  ;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
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
        {encList.map(item => (<IonInput></IonInput>))}
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default EncounterList;
