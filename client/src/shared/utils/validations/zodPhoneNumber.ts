import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { string } from "zod";

const zodPhoneNumber = ({
  optional = true,
  message = "Invalid phone number",
} = {}) =>
  (optional
    ? string().optional().nullable()
    : string({
        invalid_type_error: "PHONE_REQUIRED",
        required_error: "PHONE_REQUIRED",
      })
  ).refine(
    (value) => {
      try {
        if (optional && !value) {
          return true;
        }
        if (value) {
          const parsedPhoneNumber = parsePhoneNumber(value);
          const country = parsedPhoneNumber?.country;
          return country && isValidPhoneNumber(value, country);
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    },
    {
      message: message,
    },
  );

export default zodPhoneNumber;
