const buttonIn = document.getElementById("button-in");
const buttonOut = document.getElementById("button-out");
const logs = document.getElementById("logs");

if(!localStorage.getItem("auth")) {
  buttonIn.style.display = "block";
  buttonOut.style.display = "none";
}

window.onload = () => {
  buttonIn.onclick = () => {
    window.YaAuthSuggest.init(
      {
        client_id: "e9653841daee476d84c008b23c9659a2",
        response_type: "token",
        redirect_uri: "https://oauth-master-class-swart.vercel.app/token.html",
      },
      "https://oauth-master-class-swart.vercel.app",
      {
        view: "button",
        parentId: "buttonContainer",
        buttonSize: "m",
        buttonView: "main",
        buttonTheme: "light",
        buttonBorderRadius: "0",
        buttonIcon: "ya",
      },
    )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const token = data.access_token;
        let response = fetch(
  `https://login.yandex.ru/info?format=json&oauth_token=${token}`,
        ).then(async (data) => {
          const authData = await data.json();
          saveAuth(authData);
          showAuth(authData);
          insertLog(authData);
        });
      })
      .catch((error) => console.log("Обработка ошибки", error));
  };
};

function saveAuth(data) {
  localStorage.setItem("auth", JSON.stringify(data));
  if (!localStorage.getItem("auth")) {
    buttonIn.style.display = "block";
  }
}

function showAuth(data) {
  console.log(localStorage.getItem("auth"));
  document.getElementById("profile").insertAdjacentHTML(
    `afterend`,
    `<div class="profile__item profile__avatar">
      <img src="https://avatars.mds.yandex.net/get-yapic/${data.default_avatar_id}/islands-50" alt="123">
    </div>
    <div class="profile__item profile__display-name">
      <span>Публичное имя:</span><span>&nbsp;${data.display_name}</span>
    </div>
    <div class="profile__login"><span>Логин:</span><span>&nbsp;${data.login}</span></div>
        <div class="profile__item profile__default-email">
      <span>Почта:</span><span>&nbsp;${data.default_email}</span>
    </div>
    <div class="profile__item profile__default-phone">
      <span>Телефон:</span><span>&nbsp;${data.default_phone.number}</span>
    </div>
    <div class="profile__item profile__real-name">
      <span>Полное имя:</span><span>&nbsp;${data.real_name}</span>
    </div>`,
  );
}

function insertLog(log) {
  logs.insertAdjacentHTML(
    "beforeEnd",
    `<p class="log">${JSON.stringify(log)}</p>`,
  );
}

buttonOut.onclick = () => {
  localStorage.removeItem("auth");
  location.reload();
};
