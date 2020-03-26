export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

  export const checkValidity = (value, rules) => {
    const isValid = [];

    if (rules.required) {
      isValid.push(value.trim() !== '');
    }

    if (rules.minLength) {
      isValid.push(value.length >= rules.minLength);
    }

    if (rules.maxLength) {
      isValid.push(value.length <= rules.maxLength);
    }

    // Evaluation of expression below
    // console.log(isValid, isValid.indexOf(false), isValid.indexOf(false) <= -1);
    return isValid.indexOf(false) <= -1;
  };
