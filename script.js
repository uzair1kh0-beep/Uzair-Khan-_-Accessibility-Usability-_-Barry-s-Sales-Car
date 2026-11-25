const suvLink = document.getElementById("suv-enquiry");

if (suvLink) {
  suvLink.onclick = () => {
    window.location.href = "enquiry.html";
  };
}

const form = document.getElementById("enquiry-form");

if (form) {
  const carSelect = document.getElementById("car");
  const summary = document.getElementById("form-errors");
  const errorList = document.getElementById("error-list");
  const success = document.getElementById("form-success");

  const cars = {
    hatchback: "2019 Hatch 1.0",
    suv: "2020 Trail 1.5",
    audi: "2018 Audi S4",
    electric: "2021 City-e"
  };

  const requestedCar = new URLSearchParams(location.search).get("car");

  if (cars[requestedCar] && carSelect) {
    carSelect.value = cars[requestedCar];
  }
    
messages
  const fields = [
    ["name", "Full name", "Enter your full name."],
    ["email", "Email address", "Enter a valid email address."],
    ["message", "Your message", "Enter a short message."]
  ];

  function validate(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (id === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    return value !== "";
  }

  function clearError(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "-error");

    input.removeAttribute("aria-invalid");
    error.textContent = "";
    error.hidden = true;

    input.setAttribute("aria-describedby", id + "-hint");
  }

  fields.forEach(([id]) => {
    const input = document.getElementById(id);

    input.addEventListener("input", () => {
      if (validate(id)) clearError(id);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    errorList.replaceChildren();
    success.hidden = true;
    let invalid = false;

    fields.forEach(([id, label, message]) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + "-error");

      clearError(id);

      if (!validate(id)) {
        invalid = true;
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", id + "-error");

        error.textContent = message;
        error.hidden = false;

        const item = document.createElement("li");
        const link = document.createElement("a");

        link.href = "#" + id;
        link.textContent = label + ": " + message;

        item.appendChild(link);
        errorList.appendChild(item);
      }
    });

    if (invalid) {
      summary.hidden = false;
      summary.focus();
    } else {
      summary.hidden = true;
      success.hidden = false;
      success.focus();
    }
  });
}
