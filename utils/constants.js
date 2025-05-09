module.exports = {
    HTTP_STATUS: {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500,
    },
    ERROR_MESSAGES: {
      ROUTE_NOT_FOUND: "Route not found",
      USER_NOT_FOUND: "User not found",
      INVALID_USER_ID: "Invalid user ID format",
      INTERNAL_ERROR: "Internal server error",
      CREATE_ITEM_ERROR: "Error from createItem",
      GET_ITEMS_ERROR: "Error from getItems",
      UPDATE_ITEM_ERROR: "Error from updateItem",
      DELETE_ITEM_ERROR: "Error from deleteItem",
    },
  };