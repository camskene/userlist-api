/* global $ */
// userlist data array for filling in info box
var userListData = [];

$(document).ready(function() {
  populateTable();

  $('#userList').on('click', '.linkshowuser', showUserInfo);
});

function populateTable() {
  var tableContent = '';

  $.getJSON('/users/userlist', function(data) {
    userListData = data;
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // add to DOM
    $('#userList table tbody').html(tableContent);
  });
}

function showUserInfo(event) {
  event.preventDefault();

  // retrieve user name from rel attribute
  var thisUserName = $(this).attr('rel');

  // returns array of usernames
  var userNameArray = userListData.map(function(arrayItem) {
    return arrayItem.username;
  });

  // get index of thisUserName
  var userIndex = $.inArray(thisUserName, userNameArray);

  var thisUserObject = userListData[userIndex];

  // populate info box
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
}