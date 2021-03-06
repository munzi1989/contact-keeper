import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const Reducer = (state, action) => {
  switch (action.type) {
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        // set contacts array to old contacts + new contact info
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        // set contacts array to all contacts except the one with matching id/effectively deleteing it
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        // if existing id, update with payload
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          // init regex to match payload text with global/insensitive params
          const regex = new RegExp(`${action.payload}`, 'gi');
          // return contacts matching regex
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.type.match(regex) ||
            contact.phone.match(regex)
          );
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
      case CLEAR_CONTACTS:
        return {
          ...state,
          contacts: null,
          filtered: null,
          error: null,
          current: null
        }

    default:
      return state;
  }
};

export default Reducer;
