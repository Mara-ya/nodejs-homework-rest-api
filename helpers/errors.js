class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends BadRequest {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotAuthorizedError extends BadRequest {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

class RegistrationConflictError extends BadRequest {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

module.exports = {
    BadRequest,
    ValidationError,
    NotAuthorizedError,
    RegistrationConflictError,
}