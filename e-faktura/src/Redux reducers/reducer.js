//THE STORE = THE RECEIVER
import { combineReducers } from "redux";

function error(state, action) {
  switch (action.type) {
    case "FETCH_DATA_FAILURE":
      return {
        loaded: false,
        data: [],
        error: action.payload,
      };
    default:
      return "";
  }
}

function clientHandler(state, action) {
  switch (action.type) {
    case "ADD_CLIENT":
      return true;
    case "GET_CLIENTS":
      return action.clients;
    case "DELETE_CLIENT":
      return true;
    default:
      return "";
  }
}

function employeeHandler(state, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return true;
    case "GET_EMPLOYEES":
      return action.employees;
    case "DELETE_EMPLOYEE":
      return true;
    default:
      return "";
  }
}

function producersHandler(state, action) {
  switch (action.type) {
    case "ADD_PRODUCER":
      return true;
    case "GET_PRODUCERS":
      return action.producers;
    case "DELETE_PRODUCER":
      return true;
    default:
      return "";
  }
}

function productsHandler(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return true;
    case "GET_PRODUCTS":
      return action.producers;
    case "DELETE_PRODUCT":
      return true;
    default:
      return "";
  }
}

function invoicesHandler(state, action) {
  switch (action.type) {
    case "DELETE_INVOICE":
      return true;
    default:
      return "";
  }
}

function ordersHandler(state, action) {
  switch (action.type) {
    case "DELETE_ORDER":
      return true;
    default:
      return "";
  }
}

const rootReducer = combineReducers({
  error,
  clientHandler,
  employeeHandler,
  producersHandler,
  productsHandler,
  invoicesHandler,
  ordersHandler,
});

export default rootReducer;
