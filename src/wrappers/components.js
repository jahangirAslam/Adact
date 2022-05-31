// Layout
// Buttons
import BaseButton from "./buttons/BaseButton";
import BaseCancel from "./buttons/BaseCancel";
import BaseCreate from "./buttons/BaseCreate";
import BaseImport from "./buttons/BaseImport";
import BaseSave from "./buttons/BaseSave";
import BaseUpload from "./buttons/BaseUpload";
// Filters
import BaseFilter from "./filters/BaseFilter";
import BaseAction from "./layout/BaseActions";
import BaseBody from "./layout/BaseBody";
import BaseDropzone from "./layout/BaseDropzone";
import BaseEditor from "./layout/BaseEditor";
import BaseGoogleMap from "./layout/BaseGoogleMap";
import BaseHeader from "./layout/BaseHeader";
import BaseModal from "./layout/BaseModal";
import BaseTab from "./layout/BaseTab";
import BaseTable from "./layout/BaseTable";
import BaseTree from "./layout/BaseTree";
import EditTable from "./layout/EditTable";
import MultiSelectTable from "./layout/MultiSelectTable";

// Layout
export const HeaderComponent = BaseHeader;
export const BodyComponent = BaseBody;
export const TableComponent = BaseTable;
export const SelectionTable = MultiSelectTable;
export const Dropzone = BaseDropzone;
export const Editor = BaseEditor;
export const ActionComponent = BaseAction;
export const ModalComponent = BaseModal;
export const TabComponent = BaseTab;
export const TreeComponent = BaseTree;
export const EditAbleTable = EditTable;
// Filters
export const FilterComponent = BaseFilter;
// Buttons
export const ButtonComponent = BaseButton;
export const CreateButton = BaseCreate;
export const ImportButton = BaseImport;
export const UploadButton = BaseUpload;
export const CancelButton = BaseCancel;
export const SaveButton = BaseSave;
//Components
export const GoogleMap = BaseGoogleMap;