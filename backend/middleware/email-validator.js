var {
  isEmailValid,
  isEmailFormatValid,
  isMXRecordValid,
  isBlacklisted,
} = require("email-validator-node");

(async () => {
  // isEmailValid includes all other validation methods inside. If you run it, no need to run others.
  await isEmailValid("test@google.com"); // { isValid:true }
  await isEmailValid("asd@asd.asd"); // { isValid:false, message:"not-found" }
  await isEmailValid("test@0-00.usa.cc"); // { isValid:false, message:"blacklist" }

  // checks only email format
  await isEmailFormatValid("test@email.com"); // true
  await isEmailFormatValid("test@.com"); // false

  // checks only MX records for the email
  await isMXRecordValid("test@test.com"); // false
  await isMXRecordValid("test@google.com"); // { isValid:true ,mxRecords:[] }

  // checks if the domain disposable or not
  await isBlacklisted("test@0-00.usa.cc"); // true
  await isBlacklisted("john@gmail.com"); // false
})();
