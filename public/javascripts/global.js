/* global $ */
// userlist data array for filling in info box
var userListData = [];

$(document).ready(function() {
  // populate user table on page load
  populateTable();

  // show user info
  $('#userList').on('click', '.linkshowuser', showUserInfo);

  // add user
  $('#btnAddUser').on('click', addUser);

  // delete user
  $('#userList').on('click', '.linkdeleteuser', deleteUser);
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

function addUser(event) {
  event.preventDefault();
  // basic validation - increase error count if any fields are empty
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if ( $(this).val() === '') {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    var newUser = {
      'username': $('#inputUserName').val(),
      'email': $('#inputUserEmail').val(),
      'fullname': $('#inputUserFullname').val(),
      'age': $('#inputUserAge').val(),
      'location': $('#inputUserLocation').val(),
      'gender': $('#inputUserGender').val()
    }

    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(res) {

      // check for successful (blank) response
      if (res.msg === '') {
        // clear the form inputs
        $('#addUser :input').val('');

        // update the table
        populateTable();
      }
      else {
        alert('Error: ' + res.msg);
      }
    });
  }
  else {
    // if error count > 0
    alert('Please fill in all the fields');
    return false;
  }
}


function deleteUser(event) {
  event.preventDefault();

  var confirmation = confirm('Delete, for realz?');

  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function(res) {
      if (res.msg === '') {
      }
      else {
        alert('Error: ' + res.msg);
      }

      populateTable();
    });
  }
  else {
    // if they said no to the confirm
    return false;
  }


}