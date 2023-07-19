document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".js--form");
  const inputs = form.querySelectorAll("input");
  const firstName = document.querySelector(".js--first-name");
  const secondName = document.querySelector(".js--second-name");
  const formSelect = document.querySelector(".js--countries");
  const number = document.querySelector(".js--phone");
  const password = document.querySelector(".js--password");
  const confirmPassword = document.querySelector(".js--confirm-password");
  const email = document.querySelector(".js--email");
  const checkbox = document.querySelector(".js--checkbox");

  async function fetchCountries() {
    try {
      const res = await fetch("../data.json");

      if (!res.ok) throw new Error("Error fetch countries!");

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  (function createOption() {
    fetchCountries().then((data) => {
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.country;
        option.innerHTML = item.country;
        formSelect.append(option);
      });
    });
  })();

  function searchPhone() {
    const selectValue = formSelect.value;
    fetchCountries().then((data) => {
      data.forEach((item) => {
        if (item.country === selectValue) {
          number.value = item.tel;
        }
      });
    });
  }

  function validateForm(e) {
    e.preventDefault();

    let isValid = true;

    if (firstName.value === "" || secondName.value === "") {
      firstName.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      firstName.nextElementSibling.classList.add("input-error__none");
    }

    if (formSelect.value === "") {
      formSelect.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      formSelect.nextElementSibling.classList.add("input-error__none");
    }

    if (!number.value.match(/^\+?\d+$/)) {
      number.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      number.nextElementSibling.classList.add("input-error__none");
    }

    if (!password.value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/g)) {
      password.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      password.nextElementSibling.classList.add("input-error__none");
    }

    if (confirmPassword.value !== password.value) {
      confirmPassword.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      confirmPassword.nextElementSibling.classList.add("input-error__none");
    }

    if (email.value === "" || !email.value.includes("@")) {
      email.nextElementSibling.classList.remove("input-error__none");
      isValid = false;
    } else {
      email.nextElementSibling.classList.add("input-error__none");
    }

    if (checkbox.checked) {
      checkbox.nextElementSibling.classList.remove("error-checkbox");
    } else {
      checkbox.nextElementSibling.classList.add("error-checkbox");
      checkbox.nextElementSibling.classList.remove("b-checkbox");
      isValid = false;
    }

    if (isValid) {
      console.log("Data sent to server :-)))");
      form.reset();
    }
  }

  (function activeLabelElements() {
    function addInputsActiveLabel(event) {
      const inputElement = event.target;
      if (event.target.value !== "") {
        inputElement.nextElementSibling.nextElementSibling.classList.add(
          "form-input_label--active"
        );
      } else {
        inputElement.nextElementSibling.nextElementSibling.classList.remove(
          "form-input_label--active"
        );
      }
    }

    formSelect.addEventListener("input", () => {
      if (formSelect.value.length > 2) {
        formSelect.nextElementSibling.nextElementSibling.classList.add(
          "form-input_label--active"
        );
      }
    });

    inputs.forEach((input) => {
      if (input.type !== "checkbox") {
        input.addEventListener("input", addInputsActiveLabel);
      }
    });
  })();

  formSelect.addEventListener("change", searchPhone);
  form.addEventListener("submit", validateForm);
});
