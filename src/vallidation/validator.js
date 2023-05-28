const NamePattern = function (name) {
  let namerejex = /^[A-Za-z]+$/;
  return namerejex.test(name);
};

const MobPattern = function (mobile) {
  let mobrejex = /^\d{10}$/;
  return mobrejex.test(mobile);
};

const datePattern = function (date) {
  let daterejex =
    /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-9]|3[01])$/;
  return daterejex.test(date);
};

const emailPattern = function (email) {
  const emailPatterns = /^[a-z0-9]+@[^\s@]+\.[^\s@]+$/;

  return emailPatterns.test(email);
};

const uuidPattern = function (customerId) {
  const uuidPatterns = /^\d{12}$/;
  return uuidPatterns.test(customerId);
};

module.exports.NamePattern = NamePattern;
module.exports.MobPattern = MobPattern;
module.exports.datePattern = datePattern;
module.exports.emailPattern = emailPattern;
module.exports.uuidPattern = uuidPattern;
