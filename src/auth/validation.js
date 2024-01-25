const registerValidator = (formData) => {
  const errors = { email: [], password: [], auth: [] };

  try {
    if (!formData.email) {
      errors.email.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email.push("Email is invalid.");
    }
    if (!formData.password) {
      errors.password.push("Password is required.");
    } else if (formData.password.length < 6) {
      errors.password.push("Min password length is 6.");
    }
    if (
      !formData.confirmPassword ||
      formData.confirmPassword !== formData.password
    ) {
      errors.password.push("Confirm password doesn't match.");
    }
  } catch (error) {
    console.log(`Error in register validation ${error}`);
  }

  return errors;
};

const loginValidator = (formData) => {
  const errors = { email: [], password: [], auth: [] };
  if (!formData.email) {
    errors.email.push("Email is required.");
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email.push("Email is invalid.");
  }
  if (!formData.password) {
    errors.password.push("Password is required.");
  }
  return errors;
};

export { loginValidator, registerValidator };
