import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  addClient,
  getClients,
  deleteClient,
  addEmployee,
  getEmployees,
  deleteEmployee,
  addProducer,
  getProducers,
  deleteProducer,
  addProduct,
  getProducts,
  deleteProduct,
  deleteInvoice,
  deleteOrder,
} from "./Redux actions/actions";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./Redux reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: (newClient) => dispatch(addClient({ newClient })),
    addEmployee: (newEmployee) => dispatch(addEmployee({ newEmployee })),
    getClients: () => dispatch(getClients()),
    deleteClient: (id) => dispatch(deleteClient(id)),
    getEmployees: () => dispatch(getEmployees()),
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
    addProducer: (newProducer) => dispatch(addProducer({ newProducer })),
    getProducers: () => dispatch(getProducers()),
    deleteProducer: (id) => dispatch(deleteProducer(id)),
    addProduct: (newProduct) => dispatch(addProduct({ newProduct })),
    getProducts: () => dispatch(getProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    deleteInvoice: (id) => dispatch(deleteInvoice(id)),
    deleteOrder: (id) => dispatch(deleteOrder(id)),
  };
};

const EFaktura = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <EFaktura />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
