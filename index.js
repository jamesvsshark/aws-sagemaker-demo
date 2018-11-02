window.onload = function() {
  console.log("loaded", window);

  var idToken =
    "eyJraWQiOiJEWUZ2QkUwd0wxYWd5bWFIYm80SjJRUFdjZkJ0OUFTdk1cL0hpYTJPMVg1UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzOWFkZDVmOC1lYmMyLTQ3M2ItOWZkMC1mMGQwOTRmOTMwNTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfWFl4ZXVBZVNnIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImphbWVzIiwiYXVkIjoiMWZjcDl2M2Zybm9tbTQ2Z2MxY2hsY2JrZGQiLCJldmVudF9pZCI6IjZhMzg1NzNjLWRlYTQtMTFlOC04YjA2LWZkMGQ4M2M4OTZkYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQxMTY1ODM3LCJwaG9uZV9udW1iZXIiOiIrMTUwODQ5MzA4NjgiLCJleHAiOjE1NDExNzMxNjQsImlhdCI6MTU0MTE2OTU2NCwiZW1haWwiOiJqYW1lc0Bwb2Nvc3R1ZC5pbyJ9.tUKPR0SVE7uk-2SHDE9Utpab087T790NkHtCtaWcAGDcqPxdGYhy-sTwdH81Cy-8vDFCqOW6k6u5mqrdAItFChbXY2dY_12vfCWuDQK-wnRfVWwYiGUSjKiUXmS1c4KguBBZoexujmPiZu144lMFzU3UOT5XAm6yoMt-zRhn_BorythPcR9CPt0b734OoQzIfsm6dBSnR4Aonl60Yh9miSEwgtocG2pvRqvyrScvuNo9VU4EXzZEGbsGE235QBGuJq60TF2QM-eveJTrbo61TSslHpKPgYJW7u1NnCAxwVKi0iN3ESnDXm9OrjpX5HpWzTRH_LER5W_MOectv9UstQ";

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
