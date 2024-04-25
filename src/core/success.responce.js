const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode")



class SuccessResponse {
    constructor({ message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {}, option = {} }) {
        this.message = !message ? reasonStatusCode : message,
            this.statusCode = statusCode,
            this.metadata = metadata
        this.option = option
    }
    send(res, headers = {}) {
        return res.status(this.statusCode).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, metadata, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, option = {} }) {
        super({ message, metadata, statusCode, reasonStatusCode, option })
    }
}


module.exports = {
    OK,
    CREATED,
    SuccessResponse
}