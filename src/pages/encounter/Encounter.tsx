import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { Character } from "../../models/Character";
import { encList } from "../../models/EncounterDataTemp";
import Textfield from "../../components/textfield/Textfield";

const Encounter: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getCharacter = (character: Character) => {
    return (
      <IonItem className="ion-activatable">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonGrid>
                <IonRow>
                  <IonCol>Int</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Textfield value={character.initiative} />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol>
              <IonGrid>
                <IonRow>
                  <IonCol>Int</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Textfield value={character.name} />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    );
  };

  /*
  *    <IonCol size="1">
              <Textfield value={character.initiative} />
            </IonCol>
            <IonCol size="2">
              <Textfield value={character.name} />
            </IonCol>
            <IonCol size="1">
              <Textfield value={character.maxHealthPoints} />
            </IonCol>
            <IonCol size="1">
              <Textfield value={character.healthPoints} />
            </IonCol>
            <IonCol size="3">
              <Textfield value={character.conditions} />
            </IonCol>
            <IonCol size="3">
              <Textfield value={character.comments} />
            </IonCol>
  * */

  const getHeader = () => {
    return (
      <IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="1">
              <IonLabel>Int</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonLabel>Name</IonLabel>
            </IonCol>
            <IonCol size="1">
              <IonLabel>Max HP</IonLabel>
            </IonCol>
            <IonCol size="1">
              <IonLabel>HP</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonLabel>Cond.</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonLabel>Comment</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonListHeader>
    );
  };

  const getEncounter = () => {
    const encounter = encList.find((value) => value.id === Number(id));
    if (encounter) {
      return encounter.characters;
    }

    return [] as Character[];
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {getHeader()}
          {getEncounter().map((item) => getCharacter(item))}
        </IonList>
        <ExploreContainer name={id} />
      </IonContent>
    </IonPage>
  );
};

export default Encounter;
