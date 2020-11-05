var table = $('#table1').DataTable ( {
  "bFilter": false
} );
const config = {
  apiKey: "AIzaSyCqOdIjUsNL95Uc00JBmhUWgHXtWCtNTLU",
  authDomain: "health-care-iot-534c9.firebaseapp.com",
  databaseURL: "https://health-care-iot-534c9.firebaseio.com",
  projectId: "health-care-iot-534c9",
  storageBucket: "health-care-iot-534c9.appspot.com",
  messagingSenderId: "214130811754",
  appId: "1:214130811754:web:a15dbec4a135da9b3d7b13",
  measurementId: "G-3ZLX17QWM7"
};
firebase.initializeApp(config);

firebase.database().ref('data/test').on('child_added',function(snapshot) {
  var dataSet = [1, snapshot.val()];
  table.rows.add([dataSet]).draw();
  });