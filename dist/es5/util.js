"use strict";
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
}
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=util.js.map