import moment, { Moment } from "moment";
import { Reducer } from "react";
import { nanoid } from "nanoid";
import LocalStorageUtil from "../../Util/localStorageUtil";

// models
export type WorkEntry = {
  id?: string;
  client: Client;
  startTime: moment.Moment;
  duration: number;
  color: string;
  description: string;
};
export type Client = {
  id: number;
  name: string;
};
export type ModalState = {
  showModal: boolean;
  activeEntryId: string | null;
  startTime: moment.Moment;
  duration: number;
  description: string;
  clientId: number;
};
type FieldData = {
  name: string;
  value: any;
};

// state
export type calendarState = {
  entries: WorkEntry[];
  modalState: ModalState;
};

// actions
export enum ReducerActionType {
  ADD_NEW_ENTRY,
  EDIT_ENTRY,
  CANCEL_ENTRY,
  SUBMIT_ENTRY,
  SUBMIT_EDIT_ENTRY,
  DELETE_ENTRY,
  UPDATE_FIELD,
  RESET_DATA
}

export type AddNewEntryAction = {
  type: ReducerActionType.ADD_NEW_ENTRY;
  payload: Moment;
};

export type EditEntryAction = {
  type: ReducerActionType.EDIT_ENTRY;
  payload: string;
};

export type CancelEntryAction = {
  type: ReducerActionType.CANCEL_ENTRY;
};

export type SubmitEntryAction = {
  type: ReducerActionType.SUBMIT_ENTRY;
};

export type DeleteEntryAction = {
  type: ReducerActionType.DELETE_ENTRY;
  payload: string;
};

export type UpdateFieldAction = {
  type: ReducerActionType.UPDATE_FIELD;
  payload: FieldData;
};

export type ResetDataAction = {
  type: ReducerActionType.RESET_DATA;
  payload: WorkEntry[]
};

export type ReducerAction =
  | AddNewEntryAction
  | EditEntryAction
  | CancelEntryAction
  | SubmitEntryAction
  | DeleteEntryAction
  | UpdateFieldAction
  | ResetDataAction;

// reducer
export const calendarReducer: Reducer<calendarState, ReducerAction> = (
  state,
  action
) => {

  // setup localstorage

  switch (action.type) {
    case ReducerActionType.ADD_NEW_ENTRY:
      return {
        ...state,
        modalState: {
          ...state.modalState,
          showModal: true,
          activeEntryId: null,
          startTime: action.payload,
          duration: 1,
          description: "",
          clientId: 1,
        },
      };
    case ReducerActionType.EDIT_ENTRY: {
      const editEntry = state.entries.find((e) => e.id === action.payload);
      return editEntry
        ? {
            ...state,
            modalState: {
              ...state.modalState,
              showModal: true,
              activeEntryId: editEntry.id ? editEntry.id : null,
              startTime: editEntry.startTime,
              duration: editEntry.duration,
              description: editEntry.description,
              clientId: editEntry.client.id,
            },
          }
        : { ...state };
    }
    case ReducerActionType.CANCEL_ENTRY:
      return {
        ...state,
        modalState: {
          ...state.modalState,
          showModal: false,
        },
      };
    case ReducerActionType.SUBMIT_ENTRY: {
      const id = state.modalState.activeEntryId
        ? state.modalState.activeEntryId
        : nanoid();

      const entry: WorkEntry = {
        id: id,
        client: {
          id: state.modalState.clientId,
          name: `Client ${state.modalState.clientId}`,
        },
        color: "primary.main",
        description: state.modalState.description,
        duration: state.modalState.duration,
        startTime: state.modalState.startTime,
      };
      const updatedEntries = [
        ...state.entries.filter((i) => i.id !== id),
        entry,
      ];
      LocalStorageUtil.storeEntries(updatedEntries);

      return {
        ...state,
        entries: updatedEntries,
        modalState: {
          ...state.modalState,
          showModal: false,
        },
      };
    }
    case ReducerActionType.DELETE_ENTRY:
      const updatedEntries = [
        ...state.entries.filter((e) => e.id !== action.payload),
      ];
      LocalStorageUtil.storeEntries(updatedEntries);
      return {
        ...state,
        entries: updatedEntries,
        modalState: {
          ...state.modalState,
          showModal: false,
        },
      };
    case ReducerActionType.UPDATE_FIELD: {
      return {
        ...state,
        modalState: {
          ...state.modalState,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case ReducerActionType.RESET_DATA: {
      LocalStorageUtil.storeEntries(action.payload);

      return {
        ...state,
        entries: action.payload
      }
    }
    default:
      throw new Error();
  }
};
