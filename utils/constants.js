const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  const ERROR_MESSAGES = {
    ROUTE_NOT_FOUND: "Route not found",
    USER_NOT_FOUND: "User not found",
    INVALID_USER_ID: "Invalid user ID format",
    ITEM_NOT_FOUND: "Item not found",
    INVALID_ITEM_ID: "Invalid item ID format",
    INTERNAL_ERROR: "Internal server error",
    CREATE_ITEM_ERROR: "Invalid data when creating item",
    GET_ITEMS_ERROR: "Error retrieving items",
  };
  
  module.exports = {
    HTTP_STATUS,
    ERROR_MESSAGES,
  };