import "./Textfield.scss";
import { IonInput, IonItem } from "@ionic/react";

interface TextfieldProps {
  value: string | number | undefined;
  cssClass?: string;
}

const Textfield: React.FC<TextfieldProps> = ({ value, cssClass }) => {
  return (
    <IonItem lines="none" className={cssClass + " text-field color-grey"}>
      <IonInput
        className=""
        /*placeholder={t("placeholderEmail")}*/
        name="email"
        value={value}
        type="email"
        /* onIonInput={(e) => setEmail(checkIfValueNotEmpty(e.target.value))}*/
      />
    </IonItem>
  );
};

export default Textfield;
