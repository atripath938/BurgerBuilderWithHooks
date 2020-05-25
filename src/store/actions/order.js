import * as actionTypes from "./actionTypes";
import databaseInstance from "../../Axios-Orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        databaseInstance.post("/orders.json?auth=" + token, orderData)
            .then(Response => {
                dispatch(purchaseBurgerSuccess(Response.data.name, orderData))
            })
            .catch(Error => {
                dispatch(purchaseBurgerFail(Error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = "?auth=" + token + "&orderBy=\"userId\"&equalTo=\"" + userId + "\"";
        databaseInstance.get("/orders.json" + queryParams)
            .then(Response => {
                const fetchedOrders = [];
                for (let key in Response.data) {
                    fetchedOrders.push({ ...Response.data[key], id: key });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(Error => { dispatch(fetchOrdersFail(Error)) });
    }
}