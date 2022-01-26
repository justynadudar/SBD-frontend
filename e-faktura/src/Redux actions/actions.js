const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const ADD_CLIENT = "ADD_CLIENT";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const ADD_PRODUCER = "ADD_PRODUCER";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_CLIENTS = "GET_CLIENTS";
const GET_EMPLOYEES = "GET_EMPLOYEES";
const GET_PRODUCERS = "GET_PRODUCERS";
const GET_PRODUCT = "GET_PRODUCT";
const DELETE_CLIENT = "DELETE_CLIENT";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
const DELETE_PRODUCER = "DELETE_PRODUCER";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const DELETE_INVOICE = "DELETE_INVOICE";
const DELETE_ORDER = "DELETE_ORDER";

//THE ACTION = THE COMMAND
export const fetchDataFailure = () => {
  return {
    type: FETCH_DATA_FAILURE,
  };
};

export const addClientAction = () => ({
  type: ADD_CLIENT,
});

export const addEmployeeAction = () => ({
  type: ADD_EMPLOYEE,
});

export const addProducerAction = () => ({
  type: ADD_PRODUCER,
});

export const addProductAction = () => ({
  type: ADD_PRODUCT,
});

export const getClientsAction = (dataClients) => ({
  type: GET_CLIENTS,
  clients: dataClients,
});

export const getEmployeesAction = (dataEmployees) => ({
  type: GET_EMPLOYEES,
  employees: dataEmployees,
});

export const getProducersAction = (dataProducers) => ({
  type: GET_PRODUCERS,
  producers: dataProducers,
});

export const getProductsAction = (dataProducts) => ({
  type: GET_PRODUCT,
  products: dataProducts,
});

export const deleteClientAction = () => ({
  type: DELETE_CLIENT,
});

export const deleteEmployeeAction = () => ({
  type: DELETE_EMPLOYEE,
});

export const deleteProducerAction = () => ({
  type: DELETE_PRODUCER,
});

export const deleteProductAction = () => ({
  type: DELETE_PRODUCT,
});

export const deleteInvoiceAction = () => ({
  type: DELETE_INVOICE,
});

export const deleteOrderAction = () => ({
  type: DELETE_ORDER,
});

//DISPATCH = EXECUTOR
export const addClient =
  ({ newClient }) =>
  (dispatch) => {
    fetch(`http://localhost:8080/klienci`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then(() => dispatch(addClientAction()))
      .catch((err) => dispatch(fetchDataFailure(err.data)));
  };

export const addEmployee =
  ({ newEmployee }) =>
  (dispatch) => {
    fetch(`http://localhost:8080/pracownicy`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then(() => dispatch(addEmployeeAction()))
      .catch((err) => dispatch(fetchDataFailure(err.data)));
  };

export const addProducer =
  ({ newProducer }) =>
  (dispatch) => {
    fetch(`http://localhost:8080/producenci`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newProducer),
    })
      .then(() => dispatch(addProducerAction()))
      .catch((err) => dispatch(fetchDataFailure(err.data)));
  };

export const addProduct =
  ({ newProduct }) =>
  (dispatch) => {
    fetch(`http://localhost:8080/towary`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then(() => dispatch(addProductAction()))
      .catch((err) => dispatch(fetchDataFailure(err.data)));
  };

export const getClients = () => async (dispatch) => {
  const response = await fetch("/klienci", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  dispatch(getClientsAction(data));
};

export const getEmployees = () => async (dispatch) => {
  const response = await fetch("/pracownicy", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  dispatch(getEmployeesAction(data));
};

export const getProducers = () => async (dispatch) => {
  const response = await fetch("/producenci", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  dispatch(getProducersAction(data));
};

export const getProducts = () => async (dispatch) => {
  const response = await fetch("/towary", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  dispatch(getProductsAction(data));
};

export const deleteClient = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/klienci/${id}`, {
    method: "DELETE",
  })
    .then(() => dispatch(deleteClientAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};

export const deleteEmployee = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/pracownicy/${id}`, {
    method: "DELETE",
  })
    .then(() => dispatch(deleteEmployeeAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};

export const deleteProducer = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/producenci/${id}`, { method: "DELETE" })
    .then(() => dispatch(deleteProducerAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};

export const deleteProduct = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/towary/${id}`, { method: "DELETE" })
    .then(() => dispatch(deleteProductAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};

export const deleteInvoice = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/faktury/${id}`, { method: "DELETE" })
    .then(() => dispatch(deleteInvoiceAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};

export const deleteOrder = (id) => async (dispatch) => {
  await fetch(`http://localhost:8080/zamowienia/${id}`, { method: "DELETE" })
    .then(() => dispatch(deleteOrderAction()))
    .catch((err) => dispatch(fetchDataFailure(err.data)));
};
