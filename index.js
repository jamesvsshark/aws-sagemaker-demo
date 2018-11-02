window.onload = function() {
  console.log("loaded", window);

  var idToken =
    "eyJraWQiOiJEWUZ2QkUwd0wxYWd5bWFIYm80SjJRUFdjZkJ0OUFTdk1cL0hpYTJPMVg1UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzOWFkZDVmOC1lYmMyLTQ3M2ItOWZkMC1mMGQwOTRmOTMwNTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfWFl4ZXVBZVNnIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImphbWVzIiwiYXVkIjoiMWZjcDl2M2Zybm9tbTQ2Z2MxY2hsY2JrZGQiLCJldmVudF9pZCI6IjcxMTQ0Y2YyLWRlYjYtMTFlOC04N2E4LTVkOTgxZDU2Zjk0MSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQxMTczNTc5LCJwaG9uZV9udW1iZXIiOiIrMTUwODQ5MzA4NjgiLCJleHAiOjE1NDExNzcxNzksImlhdCI6MTU0MTE3MzU3OSwiZW1haWwiOiJqYW1lc0Bwb2Nvc3R1ZC5pbyJ9.jo75cjkWSZRpdgwSB8zAw-gg92JKv9ot3YVXXzMDL3P5rKpESzA_bCcsflLlqHei0ISyDJaFIhJebHHWpx10xOmrHNWQCH8uurG0k_I68ENBO8jq0q53aAgfQN8KBx5eKjCeADwOC-gl_JQD72WCJHVDrdpCiqcUJVyxHbSxOuBdrq0JqRcKIFYmZL10WHAnZRc3eNK97ZrdFrhV3euiO8E63Jtb-wmQNW2BkwmzbtpIaCDD9WY52fGDfAFRgBBARGj5jmgwYmhnITjU0FRYguhlt-H8KWyReK4MAPRuBUJgQdu_i6zh7evSN1zpQzawVTjpTZjaZ0v0fzVBl70xUA";

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
