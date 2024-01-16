class BaseController {
    parseError(err){
        return err.errors.map(e => e.message);
    }
}

module.exports = BaseController;