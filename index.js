window.onload = function() {
  console.log("loaded", window);

  var idToken =
    "eyJraWQiOiI5aWFEbGptUnBKMk1tazBDNDBCU0srclU1K0JHV1Q3czVDNkt4S0FFeVZFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzOWFkZDVmOC1lYmMyLTQ3M2ItOWZkMC1mMGQwOTRmOTMwNTkiLCJldmVudF9pZCI6IjcxMTQ0Y2YyLWRlYjYtMTFlOC04N2E4LTVkOTgxZDU2Zjk0MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NDExNzM1NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1hZeGV1QWVTZyIsImV4cCI6MTU0MTE3NzE3OSwiaWF0IjoxNTQxMTczNTc5LCJqdGkiOiIyN2U4NzIxNS0wYWVkLTQ2ZTItYjkzNC1jZDJmYTdmN2VhOWMiLCJjbGllbnRfaWQiOiIxZmNwOXYzZnJub21tNDZnYzFjaGxjYmtkZCIsInVzZXJuYW1lIjoiamFtZXMifQ.KB6t1raHjsEQVaR05EfarMPLHK9rPGeSwt-LhXUm6abGH5uOgwplaWzZ_J7j6fBx27gDJJrk2nXWQg0h0sDSx4XobFrdosrB_BDcVwKpx2T9k9naM598TLTC3mmnOtYviCgBRoIWo8GTYEA7fe9kQ27mi25LMzXb4rPo2UI_KJ9yCHFqQMCuA0s9OpHoqEpvJN2_gwCbPLdMGdyE-wP9NFh8iyOg2ye-8_mj59fWCgwqoP4e466IMeweNSiJCMJ5I2CHJl6L_Jh65t47ljwXCUBq9K-H0WPDnvfw-t3vCypJ_Ip6pwRmdKG0tsktmArKaAG2fb3c2ebmizG8FtIjzA";

  AWS.config.region = "us-east-2"; // Region
  AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:1ec48939-331f-4580-9214-dd727a340a40",
    Logins: {
      "cognito-idp.us-east-2.amazonaws.com/us-east-2_XYxeuAeSg": idToken
    }
  });

  window.AWS.config.getCredentials(function(credentials, error) {
    console.log(credentials, error);
  });
};

document.getElementById("goBtn").addEventListener("click", function() {
  var sageMaker = new window.AWS.SageMaker();

  sageMaker.listNotebookInstances({}, function(err, data) {
    console.log(err, data);
  });

  sageMaker.createPresignedNotebookInstanceUrl(
    { NotebookInstanceName: "notebook" },
    function(err, data) {
      console.log(err, data);
      window.open(data.AuthorizedUrl);
    }
  );
});
