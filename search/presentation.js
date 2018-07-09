/*
    Global objects usable by forms, and things that operate as the page loads
*/
var P;   // Pandas
var G;   // Lineage graph

/*
    Once page has loaded, add new event listeners for search processing
*/
$(function() {
  P = Pandas.init();
  G = Dagoba.graph();
  // Hack to give time for P to load
  setTimeout(function() { 
    P.db.vertices.forEach(G.addVertex.bind(G));
    P.db.edges   .forEach(G.addEdge  .bind(G));
  }, 3000);

  $('#searchForm').submit(function() {
    $('#searchEntry').blur();   // Make iOS keyboard disappear after submitting
    var query = $('#searchEntry').val().trim();
    var results = [];
    // TODO: Remove or escape any search processing characters here like commas
    // Allow searches using special characters like #. The escape function doesn't
    // support unicode, so use encodeURI instead.
    query = encodeURI(query);
    results = Pandas.searchPandaName(query);
  });
});

/*
    Presentation logic
*/
var Show = {};   // Namespace

Show.S = {};     // Prototype

Show.init = function() {
  var show = Object.create(Show.S);
  return show;
}

/*
    Presentation-level data, separated out from output and formatting
*/
// Given an animal and a language, obtain the immediate information that would
// be displayed in an information card about the panda, including its zoo and
// its relatives.
Show.acquirePandaInfo = function(animal, language) {
  var name_field = language + ".name";
  var zoo = Pandas.location(animal, "zoo", language);

  // TODO: Mother, Father, Siblings
  return {
    "age": Pandas.age(animal),
    "birthday": Pandas.birthday(animal, language),
    "birthplace": Pandas.location(animal, "birthplace", language),
    "death": Pandas.date(animal, "death", language),
    "dad": Pandas.searchPandaDad(animal["_id"]),
    "mom": Pandas.searchPandaMom(animal["_id"]),
    "name": animal[name_field],
    "photos": null,     // TODO
    "siblings": null,   // TODO
    "zoo_name": Pandas.zoo_name(zoo, language),
    "zoo_website": Pandas.zoo_field(zoo, "website")
  }
}


/*
    Displayed output in the webpage
*/
/****** TODO: STYLESHEETS AND STYLE REFERENCES ******/
// Construct a link for a panda given lookup information 
// on the relationship to the panda in the current results
Show.constructLink = function(my_id, their_id, their_relation) {
  // Look up the other panda
  // Create the link to them based on ID
  // Name the link based on the relationship information
  var them = Pandas.searchPandaId(their_id);
  // TODO: UI URL structure for query params for inset JSON
  return null;  // TODO
}

// If the media exists for a panda, display it. If it's missing,
// display a placeholder empty frame that takes up the same amount
// of space on the page.
Show.displayMedia = function(frame_type, media_type, index) {
  // Empty condition here ---
  // Display condition here ---
  return null;  // TODO
}

// If the index'th photo in the panda or zoo data is missing,
// create a placeholder frame with style "frame_type".
Show.emptyMedia = function(frame_type, media_type, index) {
  var missing_field = media_type + "." + index;
  var missing_uri = Pandas.def.animal[missing_field];
  var alt_text = missing_field + " not found";
  var contents = document.createElement('img');
  contents.src = missing_uri;
  contents.alt = alt_text;
  var result = document.createElement('div');
  result.className = frame_type;
  result.appendChild(contents);
  return result;
}

// If the panda search result returned nothing, output a card
// with special "no results" formatting.
Show.emptyPandaResult = function() {
  var message = document.createElement('p');
  message.textContent = Pandas.def.animal['en.name'];
  var result = document.createElement('div');
  result.class = "emptyPanda";
  result.appendChild(message);
  return result;
}

// Display a text dossier of information for a panda. Most missing
// elements should not be displayed, but a few should be printed 
// regardless, such as birthday / time of death.
Show.pandaInformation = function(id, language) {
  var animal = Pandas.searchPandaId(id);
  var name_field = language + ".name";
  var name = animal[name_field];
  var birthday = Pandas.birthday(animal, language);
  var age = Pandas.age(animal, language);
  // TODO: mother and father
  return null;   // TODO
}

// Format the results for a single panda as a div.
Show.pandaResult = function(panda) {
  // No results? Display a specially-formatted empty card
  if (!('_id' in panda)) {
    return Show.emptyPandaResult();
  }

  // Get nodes for any parents, children, and siblings. TODO

  // Validate images. Choose a profile image at random from the ones available

  // Display any avilable data about the panda
  // Its names in different languages, its gender and age
  // Links to its parents and children, which are listed by name
  // Hide a section where more media can be displayed, but pre-compute what it all looks like

  var message = document.createElement('p');
  message.textContent = panda['en.name'];

  var result = document.createElement('div');
  result.appendChild(message);
  return result; 
}