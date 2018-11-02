window.onload = function() {
  console.log("loaded", window);

  var idToken =
    "eyJraWQiOiJEWUZ2QkUwd0wxYWd5bWFIYm80SjJRUFdjZkJ0OUFTdk1cL0hpYTJPMVg1UT0iLCJhbGciOiJSUzI1NiJ9";

  AWS.config.region = "us-east-2"; // Region
  AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:1ec48939-331f-4580-9214-dd727a340a40"
  });

  //   window.AWS.config.update({
  //     region: "us-east-2",
  //     credentials: new window.AWS.CognitoIdentityCredentials({
  //       IdentityPoolId: "us-east-2:1ec48939-331f-4580-9214-dd727a340a40",
  //       Logins: {
  //         "cognito-idp.us-east-2.amazonaws.com/us-east-2_XYxeuAeSg": idToken
  //       }
  //     })
  //   });

//   window.AWS.config.getCredentials(function(credentials, error) {
//     console.log(credentials, error);
//   });

  var sageMaker = new window.AWS.SageMaker();

  sageMaker.listNotebookInstances({}, function(err, data){
    console.log(err, data);
  });

  sageMaker.createPresignedNotebookInstanceUrl(
    { NotebookInstanceName: "notebook" },
    function(err, data) {
      console.log(err, data);
    }
  );
};
