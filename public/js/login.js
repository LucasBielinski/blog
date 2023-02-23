const loginFormHandler = async function (event) {
  event.preventDefault();
// lgoin front end
  const usernameEl = document.querySelector("#username-input-login");
  const passwordEl = document.querySelector("#password-input-login");

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data);
    document.location.replace("/dashboard");
  } else {
    console.log(data);
    alert(data.message);
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
