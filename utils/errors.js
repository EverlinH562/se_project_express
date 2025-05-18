module.exports = {
    HTTP_STATUS: {
      OK: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500,
    },
    ERROR_MESSAGES: {
      ROUTE_NOT_FOUND: "Route not found",
      USER_NOT_FOUND: "User not found",
      INVALID_USER_ID: "Invalid user ID format",
      ITEM_NOT_FOUND: "Item not found",
      INVALID_ITEM_ID: "Invalid item ID format",
      INTERNAL_ERROR: "Internal server error",
      CREATE_ITEM_ERROR: "Invalid data when creating item",
      GET_ITEMS_ERROR: "Error retrieving items",
    },
  };