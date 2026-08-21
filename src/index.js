window.onload = () => {
  document.getElementById("button").onclick = () => {
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
        );
        console.log((await response).json());
      })
      .catch((error) => console.log("Обработка ошибки", error));
  };
};
