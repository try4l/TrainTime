// Initialize Firebase (YOUR OWN APP)
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)

// Initialize Firebase
// This is the code we copied and pasted from our app page
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjhzlwU-VFj6K8QW1JahJ0l0DVrZbiryk",
    authDomain: "train-time-318fa.firebaseapp.com",
    databaseURL: "https://train-time-318fa.firebaseio.com",
    projectId: "train-time-318fa",
    storageBucket: "train-time-318fa.appspot.com",
    messagingSenderId: "1058895433958"
};


firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  console.log("click");
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  var destination = $("#dest").val().trim();
  var firstTime = $("#first-time").val().trim();

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  var expTime = moment($("#first-time").val().trim(), "HH:mm").format("X");

  //moment($("#first-time").val().trim(), "hh:mm").subtract(1, "years");

  console.log("moment()" , moment());
  console.log("firstTime: ", firstTime);
  console.log("moment(firstTime, 'HH:mm') : ", moment(firstTime, 'HH:mm'));
  console.log("firstTimeConverted: ", firstTimeConverted);
  console.log("expTime: ", expTime);

  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: name,
    destination: destination,
    firstTime: firstTime,
    //firstTimeConverted: firstTimeConverted,
    frequency: frequency
  };

  console.log("newTrain: ", newTrain);


  // Save the new values in Firebase
  //database.ref().push({newTrain});
  database.ref().push(newTrain);
  // database.ref().push(newTrain.name);
  // database.ref().push(newTrain.destination);
  // database.ref().push(newTrain.firstTimeConverted);
  // database.ref().push(newTrain.frequency);


  // Logs everything to console
  console.log("-name: ", newTrain.name);
  console.log("-destination: ", newTrain.destination);
  console.log("-firstTime: ", newTrain.firstTime);
  console.log("-frequency: ", newTrain.frequency);

    // Alert
  alert("Train added.");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#dest").val("");
  $("#first-time").val("");
  $("#frequency").val("");

});  


  // Whenever a user clicks the submit-bid button
  // $("#submit").on("click", function(event) {
  // // Prevent form from submitting
  // event.preventDefault();

  // // Get the input values
  // var name = $("#name").val().trim();
  // var destination = $("#destination").val().trim();
  // var firstTime = $("first-time").val().trim();
  // var frequency = $("#frequency").val().trim();

// 3. Create Firebase event for adding train to the database and a row in the html when the user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  // Log the new info
  console.log("name: ", name);  
  console.log("destination: ", destination);
  console.log("firstTime: ", firstTime);
  //console.log("firstTimeConverted: ", firstTimeConverted)
  console.log("frequency: ", frequency);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log("firstTimeConverted", firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var remainder = diffTime % frequency;
  console.log("REMAINING TIME: ", remainder);

  // Minute Until Train
  var minutesTillTrain = frequency - remainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  // Next Train
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log("ARRIVAL TIME: " + nextArrival);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesTillTrain + "</td></tr>");
});
