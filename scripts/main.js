function read_display_Quote() {
    db.collection("quotes").doc("tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(tuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + tuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()        //calling the function

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               //method #1:  insert with html only
               //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
               //method #2:  insert using jquery
               $("#name-goes-here").text(user_Name);                         //using jquery
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"S01",
        name: "Brandywine Falls",    //replace with your own city?
        city: "Squamish",
        province: "BC",
        level: "easy",
        length: "1 km",
        details: "I haven't been here in a while, but it's one of my favourites.",
        img: "Brandywine Falls"

    });
    hikesRef.add({
        code:"AM01",
        name: "Lynn Canyon",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "I go here regularly. The suspension bridge is cool!",
        img: "Lynn Canyon"


    });
    hikesRef.add({
        code:"NV01",
        name: "Grouse Mountain",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "The Grouse Grind here is intense, but makes for a good workout.",
        img: "grouseMountain"
    });
}

function displayCards(collection) {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                var image = doc.data().img;
                let newcard = hikeCardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + image + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");